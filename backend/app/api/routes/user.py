from typing import List
from fastapi import APIRouter, Depends,  HTTPException
from app.services import user
from app.schemas.user import UserBase
from app.model.model import UserCreate
from app.services.user import create_user
from sqlalchemy.orm import Session

from app.db.session import get_db


router = APIRouter()

@router.get("/")
def main_function():
    return "User Route is running......🥳!!"


@router.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        create_user( 
            db,
            username=user.username, 
            password=user.password, 
            email=user.email
            )
        return {"status": "ok", "message": "User registered successfully", "data": user}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
