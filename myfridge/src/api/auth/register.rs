use crate::{api::error::ApiError, jwt::Keys};
use actix_web::{post, web};
use anyhow::Context;
use myfridge_domain::Email;
use myfridge_model::{prelude::User, user};
use pbkdf2::{
    Pbkdf2,
    password_hash::{PasswordHasher, SaltString, rand_core::OsRng},
};
use sea_orm::{ActiveValue, DatabaseConnection, EntityTrait};
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

#[post("/auth/register")]
pub async fn post(
    param: web::Json<PostParam>,
    keys: web::Data<Keys>,
    db: web::Data<DatabaseConnection>,
) -> Result<web::Json<PostResponse>, ApiError> {
    let active_user = user::ActiveModel {
        id: ActiveValue::NotSet,
        email: ActiveValue::Set(Email::parse(param.email.clone())?),
        password: ActiveValue::Set(hash_password(&param.password)?),
    };

    let user = User::insert(active_user).exec(&**db).await?;

    Ok(web::Json(PostResponse {
        token: keys
            .encode_id(user.last_insert_id)
            .context("Failed to create token")?,
    }))
}

pub fn hash_password(password: &str) -> Result<String, ApiError> {
    let salt = SaltString::generate(&mut OsRng);
    match Pbkdf2.hash_password(password.as_bytes(), &salt) {
        Ok(s) => Ok(s.to_string()),
        Err(pbkdf2::password_hash::Error::Password) => Err(ApiError::InvalidCredential),
        Err(e) => Err(ApiError::Context(
            anyhow::format_err!("{:?}", e).context("Failed to hash password"),
        )),
    }
}
