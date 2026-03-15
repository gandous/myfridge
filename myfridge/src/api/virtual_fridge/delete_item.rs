use crate::{api::error::ApiError, auth_user::AuthUser};
use actix_web::{HttpResponse, Responder, delete, web};
use myfridge_model::{prelude::VirtualFridgeItem, virtual_fridge_item};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
    TryIntoModel,
};
use serde::Deserialize;

#[delete("/virtual-fridge/items/{id}")]
pub async fn delete(
    path: web::Path<i32>,
    db: web::Data<DatabaseConnection>,
    user: AuthUser,
) -> Result<impl Responder, ApiError> {
    let result = VirtualFridgeItem::delete(&**db, user.id(), *path).await?;
    if !result {
        return Err(ApiError::NotFound);
    }

    return Ok(HttpResponse::Ok());
}
