use actix_web::{get, options};

pub mod error;

pub mod auth;
pub mod virtual_fridge;

#[get("")]
pub async fn index() -> &'static str {
    "MyFridge"
}

#[options("/{tail:.*}")]
pub async fn option() -> &'static str {
    ""
}
