use crate::{api::error::ApiError, jwt::Keys};
use actix_web::{post, web};
use anyhow::Context;
use myfridge_domain::Email;
use myfridge_model::{prelude::User, user};
use pbkdf2::{
    Pbkdf2,
    password_hash::{PasswordHash, PasswordVerifier},
};
use sea_orm::DatabaseConnection;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PostParam {
    email: String,
    password: String,
}

#[derive(Serialize)]
pub struct PostResponse {
    token: String,
}

#[post("/auth/login")]
pub async fn post(
    param: web::Json<PostParam>,
    keys: web::Data<Keys>,
    db: web::Data<DatabaseConnection>,
) -> Result<web::Json<PostResponse>, ApiError> {
    let user = User::get_from_email(&**db, &Email::parse(param.email.clone())?)
        .await
        .context("Failed to get user from database")?
        .ok_or(ApiError::InvalidCredential)?;
    verify_password(&user, &param.password)?;
    Ok(web::Json(PostResponse {
        token: keys.encode_id(user.id).context("Failed to create token")?,
    }))
}

pub fn verify_password(user: &user::Model, attempted_password: &str) -> Result<(), ApiError> {
    match Pbkdf2.verify_password(
        attempted_password.as_bytes(),
        &PasswordHash::new(&user.password).unwrap(),
    ) {
        Ok(_) => Ok(()),
        Err(pbkdf2::password_hash::Error::Password) => Err(ApiError::InvalidCredential),
        Err(e) => Err(ApiError::Context(
            anyhow::format_err!("{:?}", e).context("Failed to verify password"),
        )),
    }
}
