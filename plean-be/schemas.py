from typing import Set
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

    def __hash__(self):
        return hash((self.name, self.link, self.type, self.owner, self.owner_photo, self.description, self.modified_date))

    def __eq__(self, other):
        if not isinstance(other, FileResponse):
            return False
        return (
            self.name == other.name and
            self.link == other.link and
            self.type == other.type and
            self.owner == other.owner and
            self.owner_photo == other.owner_photo and
            self.description == other.description and
            self.modified_date == other.modified_date
        )

class FilesResponse(BaseModel):
    files: Set[FileResponse]
    new_auth_token: str = None