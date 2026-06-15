from pydantic import BaseModel, ConfigDict
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    body: str

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: str | None = None
    body: str | None = None

class NoteResponse(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
