use myfridge::app;
use myfridge::config::Config;
use tracing::subscriber::set_global_default;
use tracing_log::LogTracer;
use tracing_subscriber::{EnvFilter, FmtSubscriber};

#[actix_web::main]
async fn main() {
    LogTracer::init().expect("Failed to init log tracer");
    let env_filter = EnvFilter::try_from_default_env()
        .unwrap_or_else(|_| EnvFilter::new("info"))
        .add_directive("hyper=warn".parse().unwrap());
    let subscriber = FmtSubscriber::builder()
        .with_env_filter(env_filter)
        .finish();
    set_global_default(subscriber).unwrap();

    let config = Config::from_env();

    app::spawn(config).await;
}
