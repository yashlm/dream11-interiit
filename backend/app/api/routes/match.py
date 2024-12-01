from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.team import TeamInput
from app.services.match import get_data_from_csv,get_match_details_from_db,get_all_featured_matches_for_date_from_db,get_all_matches_for_date_from_db,get_all_matches_from_db,get_all_team_matches_from_db,get_all_teams_matches_from_db,match_to_dict
from app.services.team import get_teams_by_name_from_db,get_team_info_by_name_from_db
from app.services.player import get_all_match_players_profile_from_db,get_player_ids_for_match, get_player_profile_for_ids
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
from app.utils.players_map import runner_main

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
        for match in matches:
            teamA=match.teams[0]
            teamB=match.teams[1]
            teamA_info = get_team_info_by_name_from_db(db, teamA)
            teamB_info = get_team_info_by_name_from_db(db, teamB)
            match.team_info = {
                "teamA": teamA,
                "teamAinfo": teamA_info,
                "teamB": teamB,
                "teamBinfo": teamB_info,
            }


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
        teamA = []
        teamB = []
        for player in players:
            if player.unique_name in matchdetails.players:
                teamA.append(player)
            else:
                teamB.append(player)


        return {"status": "ok", "message": "Data retrieved successfully","matchdetails":matchdetails, "player_count": len(teamA)+len(teamB), "player_ids": player_ids, "teamA": teamA, "teamB": teamB}
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

csv_data = [
        {
            "key_cricinfo": 267192.0,
            "gender": "male",
            "player_id": "30a45b23",
            "full_name": "Steven Peter Devereux Smith",
            "playing_role": "Top order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/385700/385794.1.png",
            "unique_name": "SPD Smith",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/226800/226897.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 311592.0,
            "gender": "male",
            "player_id": "3fb19989",
            "full_name": "Mitchell Aaron Starc",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/390900/390978.5.png",
            "unique_name": "MA Starc",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/209900/209915.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 272279.0,
            "gender": "male",
            "player_id": "96a6a7ad",
            "full_name": "Nathan Michael Lyon",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/385700/385796.1.png",
            "unique_name": "NM Lyon",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/200700/200753.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 398666.0,
            "gender": "male",
            "player_id": "1a2676c5",
            "full_name": "Sean Anthony Abbott",
            "playing_role": "Bowling Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321600/321601.2.png",
            "unique_name": "SA Abbott",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/189700/189779.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 5961.0,
            "gender": "male",
            "player_id": "32198ae0",
            "full_name": "Moises Constantino Henriques",
            "playing_role": "Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321500/321588.2.png",
            "unique_name": "MC Henriques",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/213400/213475.3.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 434813.0,
            "gender": "male",
            "player_id": "9e85455c",
            "full_name": "Marcus Sinclair Harris",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/390600/390642.2.png",
            "unique_name": "MS Harris",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/195700/195773.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 772361.0,
            "gender": "male",
            "player_id": "a756e61a",
            "full_name": "Samuel Bryan Harper",
            "playing_role": "Top order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/391200/391242.2.png",
            "unique_name": "SB Harper",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/373600/373629.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 333780.0,
            "gender": "male",
            "player_id": "44afbf2d",
            "full_name": "Nicolas James Maddinson",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321500/321599.2.png",
            "unique_name": "NJ Maddinson",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/201200/201261.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 215152.0,
            "gender": "male",
            "player_id": "bc773eeb",
            "full_name": "Jackson Munro Bird",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/157200/157259.1.jpg",
            "unique_name": "JM Bird",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/202200/202271.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 334337.0,
            "gender": "male",
            "player_id": "ada15e88",
            "full_name": "Peter Stephen Patrick Handscomb",
            "playing_role": "Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321600/321688.2.png",
            "unique_name": "PSP Handscomb",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/204000/204093.jpg",
            "squad": "India"
        },
        {
            "key_cricinfo": 446548.0,
            "gender": "male",
            "player_id": "d167edd3",
            "full_name": "Scott Michael Boland",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321500/321592.2.png",
            "unique_name": "SM Boland",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/231200/231211.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 1124282.0,
            "gender": "male",
            "player_id": "39086549",
            "full_name": "Joshua Ryan Philippe",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321600/321602.2.png",
            "unique_name": "JR Philippe",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/200600/200668.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 388503.0,
            "gender": "male",
            "player_id": "fe5be60a",
            "full_name": "James Jason Pattinson",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/391000/391056.2.png",
            "unique_name": "JJ Pattinson",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/181200/181287.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 1195525.0,
            "gender": "male",
            "player_id": "af2d3fc3",
            "full_name": "Daniel Mark Hughes",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321700/321703.2.png",
            "unique_name": "DM Hughes",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/177200/177241.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 1117010.0,
            "gender": "male",
            "player_id": "bd59bb3f",
            "full_name": "Mark Edward Steketee",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/380300/380351.3.png",
            "unique_name": "ME Steketee",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/196800/196828.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 270152.0,
            "gender": "male",
            "player_id": "5e401637",
            "full_name": "William Robert Sutherland",
            "playing_role": "Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321600/321610.2.png",
            "unique_name": "WR Sutherland",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/233100/233187.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 1122368.0,
            "gender": "male",
            "player_id": "134bbc72",
            "full_name": "Aaron Christopher Finch",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/398400/398468.2.png",
            "unique_name": "AC Finch",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/193600/193695.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 200310.0,
            "gender": "male",
            "player_id": "a7420c85",
            "full_name": "Matthew John Renshaw",
            "playing_role": "Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/391000/391044.2.png",
            "unique_name": "MJ Renshaw",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/160400/160419.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 799053.0,
            "gender": "male",
            "player_id": "7f83f408",
            "full_name": "James Sutherland Faulkner",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321500/321597.2.png",
            "unique_name": "JS Faulkner",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/177200/177265.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 1122368.0,
            "gender": "male",
            "player_id": "134bbc72",
            "full_name": "Aaron Christopher Finch",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/398400/398468.2.png",
            "unique_name": "AC Finch",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/193600/193695.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 200310.0,
            "gender": "male",
            "player_id": "a7420c85",
            "full_name": "Matthew John Renshaw",
            "playing_role": "Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/391000/391044.2.png",
            "unique_name": "MJ Renshaw",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/160400/160419.jpg",
            "squad": "South Africa"
        },
        {
            "key_cricinfo": 799053.0,
            "gender": "male",
            "player_id": "7f83f408",
            "full_name": "James Sutherland Faulkner",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321500/321597.2.png",
            "unique_name": "JS Faulkner",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/177200/177265.jpg",
            "squad": "South Africa"
        }
    ]

@router.post("/upload_csv/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        # Step 1: Read and process the uploaded CSV
        data = await get_data_from_csv(file)
        result_df = runner_main(data)  # Assuming this returns a DataFrame with player_id and player_team
        
        # Step 2: Get the list of player_ids from result_df
        player_ids = result_df['player_id'].to_list()
        
        # Step 3: Get player profiles from the database
        players = get_player_profile_for_ids(db, player_ids)
        
        # Step 4: Create a mapping of player_id to player_team
        player_team_map = dict(zip(result_df['player_id'], result_df['player_team']))

        # Step 5: Add player_team to each player object and convert them to dictionaries
        players_with_team = []
        for player in players:
            player_dict = player.__dict__  # Convert the object to a dictionary
            player_dict["player_team"] = player_team_map.get(player.player_id, None)
            players_with_team.append(player_dict)

        # Step 6: Divide players into teamA and teamB arrays based on player_team
        

        # Step 7: Get unique teams and fetch team information from the database
        unique_teams = result_df['player_team'].unique()
        teamA_players = [player for player in players_with_team if player["player_team"] == unique_teams[0]]
        teamB_players = [player for player in players_with_team if player["player_team"] == unique_teams[1]]
        team_info = {}
        team_info["teamA"] = get_team_info_by_name_from_db(db, unique_teams[0])
        team_info["teamB"] = get_team_info_by_name_from_db(db, unique_teams[1])
        
        # Step 8: Return the response with players divided into teamA and teamB arrays, and team info
        return {
            "status": "ok",
            "message": "Data retrieved successfully",
            "teamA": teamA_players,  # Players for Team A
            "teamB": teamB_players,  # Players for Team B
            "player_count": len(players_with_team),
            "team_info": team_info
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
