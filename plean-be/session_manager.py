from sqlalchemy.orm import Session
from database import SessionLocal, UserCredentials
from google.oauth2.credentials import Credentials
class SessionManager:
    def __init__(self):
        self.db = SessionLocal()

    def get_google_drive_credentials(self, user_id: str):
        user = self.db.query(UserCredentials).filter(UserCredentials.user_id == user_id).first()
        if "refresh_token" not in user.google_drive_credentials:
            return None
        return user.google_drive_credentials

    def store_google_drive_credentials(self, user_id: str, credentials: Credentials):
        existing_user = self.db.query(UserCredentials).filter(UserCredentials.user_id == user_id).first()
        google_drive_data = {
            "refresh_token": credentials.refresh_token,
        }
        if not existing_user:
            new_user = UserCredentials(
                user_id=user_id,
                google_drive_credentials=google_drive_data,
            )
            self.db.add(new_user)
        self.db.commit()
