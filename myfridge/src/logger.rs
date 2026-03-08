use actix_web::{
    Error,
    dev::{Service, ServiceRequest, ServiceResponse, Transform, forward_ready},
};
use std::time::Instant;
use std::{
    future::{Future, Ready, ready},
    pin::Pin,
};
use tracing::{error, info, warn};

pub struct Logger;

impl<S, B> Transform<S, ServiceRequest> for Logger
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = LoggerMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(LoggerMiddleware { service }))
    }
}

pub struct LoggerMiddleware<S> {
    service: S,
}

type LocalBoxFuture<T> = Pin<Box<dyn Future<Output = T> + 'static>>;

impl<S, B> Service<ServiceRequest> for LoggerMiddleware<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let fut = self.service.call(req);
        let duration = Instant::now();

        Box::pin(async move {
            let res = fut.await?;

            let peer_addr = match res.request().peer_addr() {
                Some(a) => a.to_string(),
                None => "-".to_owned(),
            };
            let user_agent = match res.request().headers().get("User-Agent") {
                Some(user) => match user.to_str() {
                    Ok(s) => s,
                    Err(_) => "-",
                },
                None => "-",
            };
            let s = format!(
                "{} \"{} {} {:?}\" {} \"{}\" {:.06}",
                peer_addr,
                res.request().method(),
                res.request().path(),
                res.request().version(),
                res.response().status(),
                user_agent,
                duration.elapsed().as_secs_f32()
            );
            if let Some(e) = res.response().error() {
                if res.response().status().is_server_error() {
                    error!("{} {:?}", s, e);
                } else {
                    warn!("{} {:?}", s, e);
                }
            } else {
                info!("{}", s);
            }
            Ok(res)
        })
    }
}
