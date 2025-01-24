from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from fastapi import HTTPException
from session_manager import SessionManager
from schemas import FileResponse
session_manager = SessionManager()

def search_google_drive(query: str, auth_token, limit: int = 20):

    creds = Credentials(
        token=auth_token,
    )

    try:
        service = build('drive', 'v3', credentials=creds)
        results = service.files().list(
            q=f"fullText contains '{query}' or name contains '{query}'",
            fields="files(id, name, modifiedTime, mimeType, owners(me, displayName, photoLink))",
            orderBy="modifiedTime desc"
        ).execute()

        result_files = results.get('files', [])
        response = [  # <--- This line should be fixed
                FileResponse(
                    name=file["name"],
                    link=f"https://drive.google.com/file/d/{file['id']}",
                    type=file["mimeType"],
                    owner=file["owners"][0]["displayName"],
                    owner_photo=file["owners"][0]["photoLink"],
                    description="Description: N/A",
                    modified_date=file["modifiedTime"],
                )
                for file in result_files if file["mimeType"] != "application/vnd.google-apps.folder"
            ][:limit]
        
        return {
            'files': response
        }
    except HttpError as error:
        raise HTTPException(status_code=500, detail=f"An error occurred: {error}")
