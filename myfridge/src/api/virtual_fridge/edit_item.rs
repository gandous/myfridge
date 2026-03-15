use crate::{api::error::ApiError, auth_user::AuthUser};
use actix_web::{patch, web};
use myfridge_model::{prelude::VirtualFridgeItem, virtual_fridge_item};
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, IntoActiveModel, QueryFilter,
    TryIntoModel,
};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct PatchParam {
    quantity: Option<i32>,
}

#[patch("/virtual-fridge/items/{id}")]
pub async fn patch(
    path: web::Path<i32>,
    param: web::Json<PatchParam>,
    db: web::Data<DatabaseConnection>,
    user: AuthUser,
) -> Result<web::Json<virtual_fridge_item::Model>, ApiError> {
    let mut active_virtual_fridge_item = VirtualFridgeItem::find_by_id(*path)
        .filter(virtual_fridge_item::Column::UserId.eq(user.id()))
        .one(&**db)
        .await?
        .ok_or(ApiError::NotFound)?
        .into_active_model();

    if let Some(quantity) = param.quantity {
        active_virtual_fridge_item
            .quantity
            .set_if_not_equals(quantity);
    }
    let item = active_virtual_fridge_item
        .save(&**db)
        .await?
        .try_into_model()?;

    return Ok(web::Json(item));
}
