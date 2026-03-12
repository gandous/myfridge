use myfridge_domain::{Ingredient, Unit, UnitEnum};
use sea_orm_migration::{
    prelude::{extension::postgres::TypeCreateStatement, *},
    schema::*,
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_type(
                TypeCreateStatement::new()
                    .as_enum(UnitEnum)
                    .values([Unit::Gr, Unit::Unit, Unit::Cl])
                    .to_owned(),
            )
            .await?;
        manager
            .create_table(
                Table::create()
                    .table("virtual_fridge_item")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(integer("user_id"))
                    .col(string_len("item_name", Ingredient::MAX_LEN as u32))
                    .col(custom("unit", UnitEnum))
                    .col(integer("quantity"))
                    .foreign_key(
                        ForeignKey::create()
                            .name("FK_virtual_fridge_item_user")
                            .from("virtual_fridge_item", "user_id")
                            .to("user", "id")
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await?;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("virtual_fridge_item").to_owned())
            .await
    }
}
