from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from fastapi import HTTPException
from session_manager import SessionManager

session_manager = SessionManager()

def search_google_drive(user_id: str, query: str, limit: int = 20):
    creds_data = session_manager.get_user_credentials(user_id)
    if not creds_data:
        raise HTTPException(status_code=401, detail="User is not authenticated")

    creds = Credentials(
        creds_data['access_token'],
        refresh_token=creds_data['refresh_token'],
        token_uri=creds_data['token_uri'],
        client_id=creds_data['client_id'],
        client_secret=creds_data['client_secret']
    )

    try:
        service = build('drive', 'v3', credentials=creds)
        results = service.files().list(
            q=f"fullText contains '{query}' or name contains '{query}'",
            fields="files(id, name, modifiedTime, mimeType, owners(me, displayName, photoLink))",
            orderBy="modifiedTime desc"
        ).execute()

        files = results.get('files', [])
        return {
            "num_results": len(files),
            "results": [
                {
                    "name": file["name"],
                    "link": f"https://drive.google.com/file/d/{file['id']}",
                    "type": file["mimeType"],
                    "owner": file["owners"][0]["displayName"],
                    "owner_photo": file["owners"][0]["photoLink"],
                    "description": "Description: N/A",
                    "modified_date": file["modifiedTime"],
                }
                for file in files if file["mimeType"] != "application/vnd.google-apps.folder"
            ][:limit]
        }

    except HttpError as error:
        raise HTTPException(status_code=500, detail=f"An error occurred: {error}")
