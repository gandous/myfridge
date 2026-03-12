use crate::{api::error::ApiError, auth_user::AuthUser};
use actix_web::{get, web};
use myfridge_model::{prelude::VirtualFridgeItem, virtual_fridge_item};
use sea_orm::DatabaseConnection;
use serde::Serialize;

#[derive(Serialize)]
pub struct GetResponse {
    items: Vec<virtual_fridge_item::Model>,
}

#[get("/virtual-fridge/items")]
pub async fn get(
    db: web::Data<DatabaseConnection>,
    user: AuthUser,
) -> Result<web::Json<GetResponse>, ApiError> {
    let items = VirtualFridgeItem::get_from_user_id(&**db, user.id()).await?;
    return Ok(web::Json(GetResponse { items }));
}
