use super::DomainError;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveValueType, Serialize, Deserialize)]
pub struct Ingredient(String);

impl Ingredient {
    pub const MAX_LEN: usize = 32;

    pub fn parse(s: String) -> Result<Self, DomainError> {
        if s.len() > Self::MAX_LEN {
            return Err(DomainError::InvalidIngredient);
        } else if s.trim().is_empty() {
            return Err(DomainError::InvalidIngredient);
        }
        Ok(Self(s))
    }
}

impl AsRef<str> for Ingredient {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
