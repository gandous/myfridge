use sea_orm::DbErr;

pub type QueryResult<T> = Result<T, DbErr>;

pub mod prelude;

pub mod user;
pub mod virtual_fridge_item;
