use crate::api_route::api_route;
use crate::config::Config;
use crate::jwt::Keys;
use crate::logger;
use actix_web::{App, HttpServer, middleware, web};
use myfridge_migration::{Migrator, MigratorTrait};
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
use std::time::Duration;
use tracing::info;

pub async fn spawn(config: Config) {
    let db = init_db(&config).await;

    let jwt_data = web::Data::new(Keys::new(&config.jwt_key));
    let config_data = web::Data::new(config);

    HttpServer::new(move || {
        let mut default_header = middleware::DefaultHeaders::new();
        if cfg!(debug_assertions) {
            default_header = default_header
                .add(("Access-Control-Allow-Origin", "*"))
                .add(("Access-Control-Allow-Methods", "POST, PATCH, DELETE"))
                .add(("Access-Control-Allow-Headers", "authorization,content-type"));
        }
        App::new().service(
            web::scope("")
                .app_data(web::Data::new(db.clone()))
                .app_data(config_data.clone())
                .app_data(jwt_data.clone())
                .wrap(logger::Logger)
                .wrap(default_header)
                .configure(api_route),
        )
    })
    .workers(4)
    .bind(("127.0.0.1", 5000))
    .unwrap()
    .run()
    .await
    .unwrap();
}

async fn init_db(config: &Config) -> DatabaseConnection {
    let opt = ConnectOptions::new(format!(
        "postgres://{}:{}@{}/myfridge",
        config.postgres_user, config.postgres_password, config.postgres_host
    ))
    .sqlx_logging(false)
    .connect_timeout(Duration::new(5, 0))
    .acquire_timeout(Duration::new(5, 0))
    .min_connections(5)
    .max_connections(20)
    .to_owned();
    let database = Database::connect(opt).await.unwrap();

    match Migrator::up(&database, None).await {
        Ok(_) => info!("Successfully migrate database"),
        Err(e) => panic!("Failed to migrate database {:?}", e),
    };

    database
}
