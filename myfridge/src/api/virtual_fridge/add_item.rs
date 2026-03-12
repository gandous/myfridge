use crate::{api::error::ApiError, auth_user::AuthUser};
use actix_web::{post, web};
use myfridge_domain::{Ingredient, Unit};
use myfridge_model::{prelude::VirtualFridgeItem, virtual_fridge_item};
use sea_orm::{ActiveValue, DatabaseConnection, EntityTrait};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct PostParam {
    item_name: String,
    quantity: i32,
    unit: Unit,
}

#[derive(Serialize)]
pub struct PostResponse {
    id: i32,
}

#[post("/virtual-fridge/items")]
pub async fn post(
    param: web::Json<PostParam>,
    db: web::Data<DatabaseConnection>,
    user: AuthUser,
) -> Result<web::Json<PostResponse>, ApiError> {
    let active_virtual_frige_item = virtual_fridge_item::ActiveModel {
        id: ActiveValue::NotSet,
        user_id: ActiveValue::Set(user.id()),
        item_name: ActiveValue::Set(Ingredient::parse(param.item_name.clone())?),
        quantity: ActiveValue::Set(param.quantity),
        unit: ActiveValue::Set(param.unit),
    };
    let new_item = VirtualFridgeItem::insert(active_virtual_frige_item)
        .exec(&**db)
        .await?;
    return Ok(web::Json(PostResponse {
        id: new_item.last_insert_id,
    }));
}
