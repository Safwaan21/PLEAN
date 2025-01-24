from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from drive_service import search_google_drive
from auth import get_google_auth_url, handle_google_callback
from config import ALLOWED_ORIGINS
from schemas import FilesResponse

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search", response_model=FilesResponse)
def search(q: str):
    return search_google_drive("test_user", q)

@app.get("/auth/google")
async def google_login():
    return {"auth_uri": get_google_auth_url()}

@app.get("/auth/google/callback")
async def google_callback(code: str, state: str = None):
    return handle_google_callback(code)
