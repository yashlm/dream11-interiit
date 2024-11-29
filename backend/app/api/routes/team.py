from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
# from app.schemas.team import TeamInput
from app.services.team import get_all_teams_from_db

router = APIRouter()

@router.get("/")
def main_function():
    return "Team Route is running......🥳!!"


@router.get("/teams")
async def get_all_teams(db: Session = Depends(get_db)):
    try:
        get_all_teams_from_db(db)
        return {"status": "ok", "message": "Teams retrieved successfully", "data": get_all_teams_from_db(db)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# @router.get("/team/{team_id}")
# async def get_team_by_id(team_id: int, db: Session = Depends(get_db)):
#     try:
#         team = get_team_by_id_from_db(db, team_id)
#         return {"status": "ok", "message": "Team retrieved successfully", "data": team}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
    
