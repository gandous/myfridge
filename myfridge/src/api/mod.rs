use actix_web::{get, options};

pub mod error;

pub mod auth;

#[get("")]
pub async fn index() -> &'static str {
    "MyFridge"
}

#[options("/{tail:.*}")]
pub async fn option() -> &'static str {
    ""
}
