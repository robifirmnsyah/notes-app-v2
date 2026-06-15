from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/notes", tags=["notes"])

@router.get("", response_model=List[schemas.NoteResponse])
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(models.Note).all()
    return notes

@router.get("/{id}", response_model=schemas.NoteResponse)
def get_note(id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@router.post("", response_model=schemas.NoteResponse)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    new_note = models.Note(title=note.title, body=note.body)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note

@router.put("/{id}", response_model=schemas.NoteResponse)
def update_note(id: int, note_update: schemas.NoteUpdate, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    if note_update.title is not None:
        note.title = note_update.title
    if note_update.body is not None:
        note.body = note_update.body
        
    db.commit()
    db.refresh(note)
    return note

@router.delete("/{id}")
def delete_note(id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    db.delete(note)
    db.commit()
    return {"message": "deleted"}
