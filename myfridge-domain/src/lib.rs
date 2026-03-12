mod email;
mod ingredient;
mod unit;

pub use email::Email;
pub use ingredient::Ingredient;
pub use unit::*;

#[derive(Debug, PartialEq, thiserror::Error)]
pub enum DomainError {
    InvalidEmail,
    InvalidIngredient,
}

impl std::fmt::Display for DomainError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}
