use crate::api;
use actix_web::web;

pub fn api_route(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/v1")
            .service(api::index)
            .service(api::option)
            .service(api::auth::register::post)
            .service(api::auth::login::post)
            .default_service(web::route().to(api::error::not_found)),
    );
}
