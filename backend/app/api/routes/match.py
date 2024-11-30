from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.team import TeamInput
from app.services.match import get_match_details_from_db,get_all_featured_matches_for_date_from_db,get_all_matches_for_date_from_db,get_all_matches_from_db,get_all_team_matches_from_db,get_all_teams_matches_from_db,match_to_dict
from app.services.team import get_teams_by_name_from_db
from app.services.player import get_all_match_players_profile_from_db,get_player_ids_for_match, get_player_profile_for_ids
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
    
@router.get("/date/all")
async def get_matches_by_date(date: str, db: Session = Depends(get_db)):
    try:
        matches = get_all_matches_for_date_from_db(db,date)
        return {"status": "ok", "message": "Teams retrieved successfully", "data": matches}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/date/featured")
async def get_matches_by_date(date: str, db: Session = Depends(get_db)):
    try:
        matches = get_all_featured_matches_for_date_from_db(db,date)
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
        if teams.team_name1 == teams.team_name2:
            raise HTTPException(status_code=400, detail="Both teams cannot be same")
        matches = get_all_teams_matches_from_db(db,teams.team_name1, teams.team_name2)
        team_info = get_teams_by_name_from_db(db,teams.team_name1, teams.team_name2)
        match_dicts = [match_to_dict(match) for match in matches]
        return {"status": "ok", "message": "Teams retrieved successfully", "data": match_dicts, "team_info": team_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/matchdetails/{match_id}")
async def get_match_details(match_id: str, db: Session = Depends(get_db)):
    try:
        rows = get_player_ids_for_match(db, match_id)
        player_ids = [row[0] for row in rows]
        # players = get_all_match_players_profile_from_db(db,match_id)
        players = get_player_profile_for_ids(db, player_ids)
        matchdetails = get_match_details_from_db(db,match_id)
        return {"status": "ok", "message": "Data retrieved successfully","matchdetails":matchdetails, "players": players, "player_count": len(players), "player_ids": player_ids}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/dreamTeam/{match_id}")
async def dreamScores(match_id: str, db: Session = Depends(get_db)):
    try:
        rows = get_player_ids_for_match(db, match_id)
        player_ids = [row[0] for row in rows]
        # print(player_ids)
        players = get_player_profile_for_ids(db, player_ids)

        # Mock data (replace this with actual dynamic data if available)
        DreamData = [
    {
        "Catboost regressor_predicted_score": 88.37,
        "match_id": 2374651,
        "fantasy_score_total": 190,
        "match_type": "ODI",
        "player_id": "17608a6f"
    },
    {
        "Catboost regressor_predicted_score": 74.29,
        "match_id": 4938172,
        "fantasy_score_total": 250,
        "match_type": "T20",
        "player_id": "201fef33"
    },
    {
        "Catboost regressor_predicted_score": 62.54,
        "match_id": 1843275,
        "fantasy_score_total": 210,
        "match_type": "Test",
        "player_id": "2e81be88"
    },
    {
        "Catboost regressor_predicted_score": 59.87,
        "match_id": 8153726,
        "fantasy_score_total": 180,
        "match_type": "ODI",
        "player_id": "33946d69"
    },
    {
        "Catboost regressor_predicted_score": 96.12,
        "match_id": 9273618,
        "fantasy_score_total": 275,
        "match_type": "T20",
        "player_id": "4e6ef14f"
    },
    {
        "Catboost regressor_predicted_score": 79.33,
        "match_id": 7381945,
        "fantasy_score_total": 220,
        "match_type": "Test",
        "player_id": "52d1dbc8"
    },
    {
        "Catboost regressor_predicted_score": 65.48,
        "match_id": 5937218,
        "fantasy_score_total": 195,
        "match_type": "ODI",
        "player_id": "53cd8da6"
    },
    {
        "Catboost regressor_predicted_score": 91.24,
        "match_id": 4831927,
        "fantasy_score_total": 260,
        "match_type": "T20",
        "player_id": "5d2eda89"
    },
    {
        "Catboost regressor_predicted_score": 78.92,
        "match_id": 6948237,
        "fantasy_score_total": 215,
        "match_type": "Test",
        "player_id": "65d9b6b6"
    },
    {
        "Catboost regressor_predicted_score": 83.42,
        "match_id": 2746813,
        "fantasy_score_total": 240,
        "match_type": "ODI",
        "player_id": "6c3aef71"
    },
    {
        "Catboost regressor_predicted_score": 60.88,
        "match_id": 9823745,
        "fantasy_score_total": 200,
        "match_type": "T20",
        "player_id": "72166006"
    },
    {
        "Catboost regressor_predicted_score": 95.76,
        "match_id": 3874912,
        "fantasy_score_total": 270,
        "match_type": "Test",
        "player_id": "721e0199"
    },
    {
        "Catboost regressor_predicted_score": 70.61,
        "match_id": 7431806,
        "fantasy_score_total": 230,
        "match_type": "ODI",
        "player_id": "7298db76"
    },
    {
        "Catboost regressor_predicted_score": 77.49,
        "match_id": 5196824,
        "fantasy_score_total": 210,
        "match_type": "T20",
        "player_id": "8026ea72"
    },
    {
        "Catboost regressor_predicted_score": 64.22,
        "match_id": 1739207,
        "fantasy_score_total": 180,
        "match_type": "Test",
        "player_id": "99e23670"
    },
    {
        "Catboost regressor_predicted_score": 85.51,
        "match_id": 8041372,
        "fantasy_score_total": 250,
        "match_type": "ODI",
        "player_id": "bc969efb"
    },
    {
        "Catboost regressor_predicted_score": 92.38,
        "match_id": 5482011,
        "fantasy_score_total": 270,
        "match_type": "T20",
        "player_id": "be150fc8"
    },
    {
        "Catboost regressor_predicted_score": 61.74,
        "match_id": 9621403,
        "fantasy_score_total": 220,
        "match_type": "Test",
        "player_id": "ca5acfa4"
    },
    {
        "Catboost regressor_predicted_score": 80.11,
        "match_id": 5317268,
        "fantasy_score_total": 240,
        "match_type": "ODI",
        "player_id": "cb08b611"
    },
    {
        "Catboost regressor_predicted_score": 57.92,
        "match_id": 6049381,
        "fantasy_score_total": 210,
        "match_type": "T20",
        "player_id": "d8f59089"
    },
    {
        "Catboost regressor_predicted_score": 93.61,
        "match_id": 7914735,
        "fantasy_score_total": 265,
        "match_type": "Test",
        "player_id": "eadc8924"
    },
    {
        "Catboost regressor_predicted_score": 68.43,
        "match_id": 4518390,
        "fantasy_score_total": 215,
        "match_type": "ODI",
        "player_id": "f0b4e47d"
    }
]
        mapped_data = []
        player_dict = {player.player_id: player for player in players}

        for data_entry in DreamData:
            player_id = data_entry.get("player_id")
            if player_id in player_dict:
                player_profile = player_dict[player_id]
                mapped_data.append({**data_entry, **player_profile.__dict__})

        return {
            "status": "ok",
            "message": "Teams retrieved successfully",
            "data": mapped_data,
        }

    except Exception as e:
        logging.error(f"Error fetching dream scores: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching dream scores.")

    
# @router.post("/dreamTeam")
# async def dreamScores(match_id: int, db: Session = Depends(get_db)):
#     try:
#         return {"status": "ok", "message": "Teams retrieved successfully", "data": [DreamTeam,DreamTeam,DreamTeam]}
        
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))