use envy::from_env;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct Config {
    pub postgres_host: String,
    pub postgres_user: String,
    pub postgres_password: String,
    pub jwt_key: String,
}

impl Config {
    pub fn from_env() -> Self {
        if cfg!(debug_assertions) {
            // TODO switch dotenvy to dev only deps
            dotenvy::from_filename(".env.dev").unwrap();
        }
        from_env().unwrap()
    }
}
