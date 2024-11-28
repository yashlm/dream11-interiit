from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
# from app.schemas.team import TeamInput
from app.services.player import get_all_players_from_db

router = APIRouter()

@router.get("/")
def main_function():
    return "Player Route is running......🥳!!"


@router.get("/match/{match_id}")
async def get_all_players(match_id : str , db: Session = Depends(get_db)):
    try:
        players = get_all_players_from_db(db,match_id)
        return {"status": "ok", "message": "Players retrieved successfully", "data": players}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))