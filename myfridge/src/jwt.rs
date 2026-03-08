use base64::prelude::*;
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize, de::DeserializeOwned};

pub const KEY_LEN: usize = 32;

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    id: i32,
    exp: usize,
}

#[derive(Clone)]
pub struct Keys {
    decoding: DecodingKey,
    encoding: EncodingKey,
}

impl Keys {
    pub fn new(key: &str) -> Self {
        let key = BASE64_STANDARD.decode(key).unwrap();
        Self {
            decoding: DecodingKey::from_secret(&key),
            encoding: EncodingKey::from_secret(&key),
        }
    }

    pub fn encode<T: Serialize>(&self, claims: T) -> Result<String, jsonwebtoken::errors::Error> {
        jsonwebtoken::encode(&Header::default(), &claims, &self.encoding)
    }

    pub fn decode<T: DeserializeOwned>(
        &self,
        token: &str,
        validation: Validation,
    ) -> Result<T, jsonwebtoken::errors::Error> {
        let token = jsonwebtoken::decode::<T>(&token, &self.decoding, &validation)?;
        Ok(token.claims)
    }

    pub fn encode_id(&self, id: i32) -> Result<String, jsonwebtoken::errors::Error> {
        let claims = TokenClaims { id, exp: 0 };
        self.encode(claims)
    }

    pub fn decode_id(&self, token: &str) -> Result<i32, jsonwebtoken::errors::Error> {
        let mut valid = Validation::default();
        valid.validate_exp = false;
        let token = self.decode::<TokenClaims>(token, valid)?;
        Ok(token.id)
    }
}
