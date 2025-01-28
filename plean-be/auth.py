from google_auth_oauthlib.flow import Flow
from fastapi.responses import RedirectResponse
from config import CLIENT_SECRETS_FILE, SCOPES, REDIRECT_URI
from session_manager import SessionManager
import google.auth.transport.requests
from google.oauth2 import id_token
from constants import FE_URL
session_manager = SessionManager()

def get_google_auth_url():
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
    )
    flow.redirect_uri = REDIRECT_URI
    auth_uri, _ = flow.authorization_url(prompt="consent", access_type="offline")
    return auth_uri

def handle_google_callback(code: str):
    request = google.auth.transport.requests.Request()
    flow = Flow.from_client_secrets_file(
        client_secrets_file=CLIENT_SECRETS_FILE,
        scopes=SCOPES,
    )
    flow.redirect_uri = REDIRECT_URI
    flow.fetch_token(code=code)
    credentials = flow.credentials
    # Get and store the credentials to the relevant user id
    id_info = id_token.verify_oauth2_token(
        credentials.id_token, 
        request, 
        credentials.client_id
    )
    session_manager.store_google_drive_credentials(id_info["sub"], credentials.token, credentials.refresh_token)
    return RedirectResponse(f"{FE_URL}/auth?token={credentials.token}&user_id={id_info['sub']}")