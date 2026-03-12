use myfridge_domain::Email;
use sea_orm::entity::prelude::*;
use sea_orm::ColumnTrait;
use serde::Serialize;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize)]
#[sea_orm(table_name = "user")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i32,
    pub email: Email,
    #[serde(skip_serializing)]
    pub password: String,
}

impl Entity {
    pub async fn get_from_email(
        db: &DatabaseConnection,
        email: &Email,
    ) -> Result<Option<Model>, sea_orm::DbErr> {
        Entity::find()
            .filter(Column::Email.eq(email.as_ref()))
            .one(db)
            .await
    }
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(has_many = "super::virtual_fridge_item::Entity")]
    VirtualFridgeItem,
}

impl Related<super::virtual_fridge_item::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::VirtualFridgeItem.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
