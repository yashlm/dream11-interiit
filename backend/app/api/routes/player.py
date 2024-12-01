from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.pydantic_schema import PlayerStatsInput,PlayersInput
from app.services.player import get_player_stats_by_name_from_db,get_player_lifetime_stats_from_db,get_all_players_stats_from_db,get_player_stats_from_db,get_teams_player_stats_from_db,get_match_player_stats_from_db

router = APIRouter()

@router.get("/")
def main_function():
    return "Player Route is running......🥳!!"


@router.get("/match/{match_id}")
async def get_all_players(match_id : str , db: Session = Depends(get_db)):
    try:
        players = get_all_players_stats_from_db(db,match_id)
        return {"status": "ok", "message": "Players retrieved successfully", "data": players}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/player_stats")
async def get_player_stats(playerInput: PlayerStatsInput, db: Session = Depends(get_db)):
    try:
        player = get_player_stats_from_db(db,playerInput.match_id, playerInput.player_id)
        return {"status": "ok", "message": "Player retrieved successfully", "data": player}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cricketers_lifetime_stats/{player_id}")  
async def get_all_players(player_id: str, db: Session = Depends(get_db)):
    try:
        player = get_player_lifetime_stats_from_db(db,player_id)
        return {"status": "ok", "message": "Player retrieved successfully", "data": player}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.post("/player_stats/all")
async def get_player_stats(playerInput: PlayersInput, db: Session = Depends(get_db)):
    try:
        player = get_teams_player_stats_from_db(db,playerInput.match_id, playerInput.player_ids)
        return {"status": "ok", "message": "Player retrieved successfully", "data": player}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/player_stats/{match_id}")
async def get_all_players(match_id : str , db: Session = Depends(get_db)):
    try:
        players = get_match_player_stats_from_db(db,match_id)
        return {"status": "ok", "message": "Players retrieved successfully", "data": players}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/player_stats/{match_id}/{player_name}")
async def get_all_players(match_id : int , player_name : str, db: Session = Depends(get_db)):
    try:
        players = get_player_stats_by_name_from_db(db,player_name,match_id)
        return {"status": "ok", "message": "Players retrieved successfully", "data": players}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))