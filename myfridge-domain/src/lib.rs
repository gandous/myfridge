mod email;

pub use email::Email;

#[derive(Debug, PartialEq, thiserror::Error)]
pub enum DomainError {
    InvalidEmail,
}

impl std::fmt::Display for DomainError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{:?}", self)
    }
}
