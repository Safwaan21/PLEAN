from sqlalchemy.orm import Session
from database import SessionLocal, UserCredentials
from google.oauth2.credentials import Credentials
class SessionManager:
    def __init__(self):
        self.db = SessionLocal()

    def get_google_drive_credentials(self, user_id: str):
        user = self.db.query(UserCredentials).filter(UserCredentials == user_id).first()
        return user.auth_token, user.refresh_token

    def store_google_drive_credentials(self, user_id: str, auth_token: str, refresh_token: str):
        existing_user = self.db.query(UserCredentials).filter(UserCredentials.user_id == user_id).first()
        if not existing_user:
            new_user = UserCredentials(
                user_id=user_id,
                auth_token=auth_token,
                refresh_token=refresh_token,
            )
            self.db.add(new_user)
        else:
            existing_user.auth_token = auth_token
            existing_user.refresh_token = refresh_token
        self.db.commit()
