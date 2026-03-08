use super::DomainError;
use sea_orm::entity::prelude::*;
use serde::Serialize;

#[derive(Clone, Debug, PartialEq, Eq, DeriveValueType, Serialize)]
pub struct Email(String);

impl Email {
    pub const MAX_LEN: usize = 32;

    pub fn parse(s: String) -> Result<Self, DomainError> {
        if s.len() > Self::MAX_LEN {
            return Err(DomainError::InvalidEmail);
        } else if s.trim().is_empty() {
            return Err(DomainError::InvalidEmail);
        }
        Ok(Self(s))
    }
}

impl AsRef<str> for Email {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
