use super::QueryResult;
use myfridge_domain::{Ingredient, Unit};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize)]
#[sea_orm(table_name = "virtual_fridge_item")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub user_id: i32,
    pub item_name: Ingredient,
    pub unit: Unit,
    pub quantity: i32,
}

impl Entity {
    pub async fn get_from_user_id(
        db: &DatabaseConnection,
        user_id: i32,
    ) -> QueryResult<Vec<Model>> {
        Self::find()
            .filter(Column::UserId.eq(user_id))
            .all(db)
            .await
    }
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::user::Entity",
        from = "Column::UserId",
        to = "super::user::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    User,
}

impl Related<super::user::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::User.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
