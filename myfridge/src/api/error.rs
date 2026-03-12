use actix_web::{
    HttpResponse, error,
    http::{StatusCode, header::ContentType},
    web,
};
use std::fmt;
use std::fmt::Debug;

#[derive(Debug, thiserror::Error)]
pub enum ApiError {
    InvalidToken,
    InvalidCredential,
    NotFound,
    InternalServerError,
    DomainError(#[from] myfridge_domain::DomainError),
    DbError(#[from] sea_orm::DbErr),
    Context(#[from] anyhow::Error),
}

impl ApiError {
    pub fn status_code(&self) -> StatusCode {
        match self {
            Self::InvalidToken => StatusCode::UNAUTHORIZED,
            Self::InvalidCredential => StatusCode::BAD_REQUEST,
            Self::NotFound => StatusCode::NOT_FOUND,
            Self::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
            Self::DomainError(_) => StatusCode::BAD_REQUEST,
            Self::DbError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            Self::Context(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl fmt::Display for ApiError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Context(_) => write!(f, "Context"),
            Self::DbError(_) => write!(f, "DbError"),
            _ => write!(f, "{:?}", self),
        }
    }
}

impl error::ResponseError for ApiError {
    fn error_response(&self) -> HttpResponse<actix_web::body::BoxBody> {
        let code = self.status_code();
        HttpResponse::build(code)
            .insert_header(ContentType::json())
            .json(web::Json(ErrorResponse::new(self)))
    }

    fn status_code(&self) -> StatusCode {
        self.status_code()
    }
}

#[derive(serde::Serialize)]
struct ErrorResponse {
    pub err_code: String,
    pub description: String,
}

impl ErrorResponse {
    pub fn new(error: &ApiError) -> Self {
        Self {
            err_code: error.to_string(),
            description: "".to_string(),
        }
    }
}

pub async fn not_found() -> HttpResponse {
    HttpResponse::build(StatusCode::NOT_FOUND)
        .insert_header(ContentType::json())
        .json(web::Json(ErrorResponse::new(&ApiError::NotFound)))
}
