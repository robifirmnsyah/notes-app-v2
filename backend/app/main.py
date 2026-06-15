import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import notes

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Notes App")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://frontend:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes.router)

@app.get("/")
def health_check():
    return {"status": "ok"}
