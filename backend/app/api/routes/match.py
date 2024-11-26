from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.team import TeamInput
from app.services.match import get_all_matches_from_db,get_all_team_matches_from_db,get_all_teams_matches_from_db,match_to_dict

router = APIRouter()

@router.get("/")
def main_function():
    return "Match Route is running......🥳!!"


@router.get("/all")
async def get_all_matches(db: Session = Depends(get_db)):
    try:
        matches = get_all_matches_from_db(db)
        return {"status": "ok", "message": "Teams retrieved successfully", "data": matches}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/team/{team_name}")
async def get_matches_by_team_id(team_name: str, db: Session = Depends(get_db)):
    try:
        matches = get_all_team_matches_from_db(db,team_name)
        return {"status": "ok", "message": "Teams retrieved successfully", "data": matches}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/team")
async def get_matches_by_team_id(teams: TeamInput, db: Session = Depends(get_db)):
    try:
        db.expunge_all()
        matches = get_all_teams_matches_from_db(db,teams.team_name1, teams.team_name2)
        match_dicts = [match_to_dict(match) for match in matches]
        print(matches)
        return {"status": "ok", "message": "Teams retrieved successfully", "data": match_dicts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))