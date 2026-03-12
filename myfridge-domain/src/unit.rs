use sea_orm::{self, entity::prelude::*, sea_query, DeriveActiveEnum, EnumIter};
use serde::{Deserialize, Serialize};

#[derive(
    Debug, Clone, Copy, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize, Iden,
)]
#[serde(rename_all = "kebab-case")]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "unit_type")]
pub enum Unit {
    #[sea_orm(string_value = "gr")]
    Gr,
    #[sea_orm(string_value = "unit")]
    Unit,
    #[sea_orm(string_value = "cl")]
    Cl,
}
