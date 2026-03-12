use crate::api::error::ApiError;
use crate::jwt::Keys;
use actix_web::{FromRequest, HttpRequest, dev, web};
use std::future::Future;
use std::pin::Pin;

pub struct AuthUser {
    user_id: i32,
}

impl AuthUser {
    pub fn id(&self) -> i32 {
        self.user_id
    }
}

impl FromRequest for AuthUser {
    type Error = ApiError;
    type Future = Pin<Box<dyn Future<Output = Result<Self, Self::Error>>>>;

    fn from_request(req: &HttpRequest, _: &mut dev::Payload) -> Self::Future {
        let auth_header = match req.headers().get("Authorization") {
            None => return Box::pin(async move { Err(ApiError::InvalidToken) }),
            Some(header) => header.clone(),
        };
        let mut token = match auth_header.to_str() {
            Ok(t) => t,
            Err(_) => return Box::pin(async move { Err(ApiError::InternalServerError) }),
        };
        if token.starts_with("Bearer ") {
            token = match token.strip_prefix("Bearer ") {
                Some(t) => t,
                None => return Box::pin(async move { Err(ApiError::InternalServerError) }),
            }
        }
        let keys: &web::Data<Keys> = match req.app_data() {
            Some(k) => k,
            None => return Box::pin(async move { Err(ApiError::InternalServerError) }),
        };
        let id = match keys.decode_id(token) {
            Ok(id) => id,
            Err(_) => return Box::pin(async move { Err(ApiError::InvalidToken) }),
        };
        Box::pin(async move { Ok(AuthUser { user_id: id }) })
    }
}

// impl Into<user::Model> for AuthUser {
//     fn into(self) -> user::Model {
//         self.0
//     }
// }

// impl AsRef<user::Model> for AuthUser {
//     fn as_ref(&self) -> &user::Model {
//         &self.0
//     }
// }
