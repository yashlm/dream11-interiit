from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.team import TeamInput
from app.services.match import get_all_matches_from_db,get_all_team_matches_from_db,get_all_teams_matches_from_db,match_to_dict
from app.services.team import get_teams_by_name_from_db

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
        if teams.team_name1 == teams.team_name2:
            raise HTTPException(status_code=400, detail="Both teams cannot be same")
        matches = get_all_teams_matches_from_db(db,teams.team_name1, teams.team_name2)
        team_info = get_teams_by_name_from_db(db,teams.team_name1, teams.team_name2)
        match_dicts = [match_to_dict(match) for match in matches]
        return {"status": "ok", "message": "Teams retrieved successfully", "data": match_dicts, "team_info": team_info}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

DummpyDreamTeamData = {
    "player_id": 1,
    "match_id": 101,
    "name": "Virat Sharma",
    "player_type": "Batter",
    "predicted_dream_points": 75,
    "description": "An aggressive top-order batter known for his consistency and ability to chase big targets.",
    "odi_bat": {
        "SR": 92.5,
        "4s": 240,
        "6s": 50,
        "centuries": 15,
        "50s": 30,
        "total_runs": 5400,
        "experience": 120,
        "avg_of_last_10_matches_runs": 65,
        "avg_of_last_10_matches_SR": 95.0,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    },
    "odi_ball": {
        "economy": 4.5,
        "wickets": 140,
        "five_wicket_hauls": 8,
        "best_figures": "6/23",
        "experience": 100,
        "avg_of_last_10_matches_wickets": 2,
        "avg_of_last_10_matcheseconomy": 4.3,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    },
    "test_bat": {
        "SR": 56.0,
        "4s": 400,
        "6s": 20,
        "centuries": 18,
        "50s": 25,
        "total_runs": 7200,
        "experience": 80,
        "avg_of_last_10_matches_wickets": 2,
        "avg_of_last_10_matcheseconomy": 4.3,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    },
    "test_ball": {
        "economy": 2.8,
        "wickets": 200,
        "five_wicket_hauls": 15,
        "best_figures": "7/50",
        "experience": 60,
        "avg_of_last_10_matches_wickets": 2,
        "avg_of_last_10_matcheseconomy": 4.3,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    },
    "t20_bat": {
        "SR": 145.0,
        "4s": 150,
        "6s": 85,
        "centuries": 2,
        "50s": 12,
        "total_runs": 2200,
        "experience": 60,
        "avg_of_last_10_matches_runs": 65,
        "avg_of_last_10_matches_SR": 95.0,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    },
    "t20_ball": {
        "economy": 6.8,
        "wickets": 65,
        "five_wicket_hauls": 2,
        "best_figures": "5/12",
        "experience": 45,
        "avg_of_last_10_matches_wickets": 2,
        "avg_of_last_10_matcheseconomy": 4.3,
        "chart": {
            "consistency": 85,
            "form": 90,
            "adaptability": 88,
            "influence": 92,
            "game_reading": 87,
            "conversion_rate": 75
        }
    }
}

@router.get("/dreamTeam/{match_id}")
async def dreamScores(match_id: int, db: Session = Depends(get_db)):
    try:

        return {"status": "ok", "message": "Teams retrieved successfully", "data": [DummpyDreamTeamData,DummpyDreamTeamData,DummpyDreamTeamData]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/dreamTeam")
async def dreamScores(match_id: int, db: Session = Depends(get_db)):
    try:
        return {"status": "ok", "message": "Teams retrieved successfully", "data": [DummpyDreamTeamData,DummpyDreamTeamData,DummpyDreamTeamData]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))