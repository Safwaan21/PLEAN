from typing import List
from pydantic import BaseModel

class FileOwner(BaseModel):
    displayName: str
    photoLink: str

class FileResponse(BaseModel):
    name: str
    link: str
    type: str
    owner: str
    owner_photo: str
    description: str
    modified_date: str

class FilesResponse(BaseModel):
    files: List[FileResponse]