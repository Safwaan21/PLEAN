import os

SCOPES = [
    'https://www.googleapis.com/auth/drive',
    "openid", 
    "https://www.googleapis.com/auth/userinfo.email",  
    "https://www.googleapis.com/auth/userinfo.profile",  
]
REDIRECT_URI = "http://localhost:8000/auth/google/callback"
CLIENT_SECRETS_FILE = "client_id.json"
ALLOWED_ORIGINS = ["http://localhost:3000"]

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./user_data.db")