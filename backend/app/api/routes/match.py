from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.team import TeamInput
from app.schemas.pydantic_schema import ModelInput
from app.services.match import get_all_matches_for_date_from_db,get_match_weather_from_db,get_data_from_csv,get_match_details_from_db,get_all_featured_matches_for_date_from_db,get_all_matches_from_db,get_all_team_matches_from_db,get_all_teams_matches_from_db,match_to_dict
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


        return {"status": "ok", "message": "Data retrieved successfully","matchdetails":matchdetails, "player_count": len(teamA)+len(teamB), "player_ids": player_ids, "teamA": teamA, "teamB": teamB, "pitch": "Grass"}
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
            "count": len(mapped_data)
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

@router.post("/dreamTeam")
async def dreamScores(modelInput: ModelInput, db: Session = Depends(get_db)):
    modulOutput = {
        "13c35c9e": 100.55634319218704,
        "21e5f325": 87.17585733448124,
        "2f49c897": 72.00954285338004,
        "462411b3": 93.62300411370316,
        "495d42a5": 132.09295517607978,
        "6c19c6e5": 97.96542444280506,
        "740742ef": 78.78837143431772,
        "8afe73e2": 76.93286397858712,
        "8d2c70ad": 93.46000246872988,
        "919a3be2": 110.96721181511865,
        "9a46c4e5": 104.82554099843752,
        "b17e2f24": 80.75461188866599,
        "ba5e1069": 116.70623794132668,
        "ba607b88": 102.35442442893832,
        "cb9b8664": 84.72428983178646,
        "df5a6881": 91.5380033869391,
        "e824e6ee": 95.4223177249687,
        "e84ac20c": 132.50066442016148,
        "eade4650": 119.33194580708863,
        "f088b960": 76.93057990710558,
        "fbd4f01f": 98.16267907703993,
        "fe93fd9d": 116.2944171880359
    },

     # Access the dictionary inside the tuple
    player_ids = list(modulOutput[0].keys())  # Access the dictionary (first element of the tuple)
    players = get_player_profile_for_ids(db, player_ids)
    mapped_data = []
    player_dict = {player.player_id: player for player in players}

    for player_id, score in modulOutput[0].items():  # Access the dictionary again for iteration
        if player_id in player_dict:
            player_profile = player_dict[player_id]
            mapped_data.append({**player_profile.__dict__, "predicted_score": score})

    # return {
    #     "status": "ok",
    #     "message": "Teams retrieved successfully",
    #     "data": mapped_data,
    #     "count": len(mapped_data)
    # }
    return dreamTeamForCustomData

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
        match_date = data['Match Date'].iloc[0]
        match_type = data['Format'].iloc[0]
        teamA_players = [player for player in players_with_team if player["player_team"] == unique_teams[0]]
        teamB_players = [player for player in players_with_team if player["player_team"] == unique_teams[1]]
        team_info = {}
        team_info["teamA"] = get_team_info_by_name_from_db(db, unique_teams[0])
        team_info["teamB"] = get_team_info_by_name_from_db(db, unique_teams[1])
        
        # Step 8: Return the response with players divided into teamA and teamB arrays, and team info
        return {
            "status": "ok",
            "message": "Data retrieved successfully",
            "match_date": match_date,
            "match_type": match_type,
            "teamA": teamA_players,  # Players for Team A
            "teamB": teamB_players,  # Players for Team B
            "player_count": len(players_with_team),
            "team_info": team_info
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/weather/{match_id}")
async def get_weather(match_id: str, db: Session = Depends(get_db)):
    try:
        match = get_match_weather_from_db(db, match_id)
        return {"status": "ok", "message": "Weather retrieved successfully", "data": match}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
dreamTeamForCustomData = {
    "status": "ok",
    "message": "Teams retrieved successfully",
    "data": [
        {
            "unique_name": "TG Southee",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/206300/206313.jpg",
            "key_cricinfo": 232364.0,
            "player_id": "13c35c9e",
            "full_name": "Timothy Grant Southee",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383184.1.png",
            "predicted_score": 100.55634319218704
        },
        {
            "unique_name": "TA Blundell",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/389800/389844.jpg",
            "key_cricinfo": 440516.0,
            "player_id": "21e5f325",
            "full_name": "Thomas Ackland Blundell",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/321300/321315.1.png",
            "predicted_score": 87.17585733448124
        },
        {
            "unique_name": "Mohammed Siraj",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391600/391662.jpg",
            "key_cricinfo": 940973.0,
            "player_id": "2f49c897",
            "full_name": "Mohammed Siraj",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/322600/322611.1.png",
            "predicted_score": 72.00954285338004
        },
        {
            "unique_name": "JJ Bumrah",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/232500/232565.jpg",
            "key_cricinfo": 625383.0,
            "player_id": "462411b3",
            "full_name": "Jasprit Jasbirsingh Bumrah",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319940.2.png",
            "predicted_score": 93.62300411370316
        },
        {
            "unique_name": "R Ashwin",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/219800/219835.jpg",
            "key_cricinfo": 26421.0,
            "player_id": "495d42a5",
            "full_name": "Ravichandran Ashwin",
            "playing_role": "Bowling Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316500/316521.2.png",
            "predicted_score": 132.09295517607978
        },
        {
            "unique_name": "YBK Jaiswal",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391600/391660.jpg",
            "key_cricinfo": 1151278.0,
            "player_id": "6c19c6e5",
            "full_name": "Yashasvi Bhupendra Kumar Jaiswal",
            "playing_role": "Opening Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/340300/340309.1.png",
            "predicted_score": 97.96542444280506
        },
        {
            "unique_name": "RG Sharma",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/237400/237453.jpg",
            "key_cricinfo": 34102.0,
            "player_id": "740742ef",
            "full_name": "Rohit Gurunath Sharma",
            "playing_role": "Top order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/385800/385819.2.png",
            "predicted_score": 78.78837143431772
        },
        {
            "unique_name": "WA Young",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391700/391749.jpg",
            "key_cricinfo": 547749.0,
            "player_id": "8afe73e2",
            "full_name": "William Alexander Young",
            "playing_role": "Top order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/346200/346246.1.png",
            "predicted_score": 76.93286397858712
        },
        {
            "unique_name": "Kuldeep Yadav",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/194300/194379.jpg",
            "key_cricinfo": 559235.0,
            "player_id": "8d2c70ad",
            "full_name": "Kuldeep Yadav",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319943.2.png",
            "predicted_score": 93.46000246872988
        },
        {
            "unique_name": "RR Pant",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/241100/241167.jpg",
            "key_cricinfo": 931581.0,
            "player_id": "919a3be2",
            "full_name": "Rishabh Rajendra Pant",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/323000/323036.1.png",
            "predicted_score": 110.96721181511865
        },
        {
            "unique_name": "GD Phillips",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391800/391855.jpg",
            "key_cricinfo": 823509.0,
            "player_id": "9a46c4e5",
            "full_name": "Glenn Dominic Phillips",
            "playing_role": "Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383167.1.png",
            "predicted_score": 104.82554099843752
        },
        {
            "unique_name": "KL Rahul",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/220400/220491.jpg",
            "key_cricinfo": 422108.0,
            "player_id": "b17e2f24",
            "full_name": "Kannaur Lokesh Rahul",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/319900/319942.3.png",
            "predicted_score": 80.75461188866599
        },
        {
            "unique_name": "R Ravindra",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391800/391806.jpg",
            "key_cricinfo": 959767.0,
            "player_id": "ba5e1069",
            "full_name": "Rachin Ravindra",
            "playing_role": "Batting Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383182.1.png",
            "predicted_score": 116.70623794132668
        },
        {
            "unique_name": "V Kohli",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/240800/240853.jpg",
            "key_cricinfo": 253802.0,
            "player_id": "ba607b88",
            "full_name": "Virat Kohli",
            "playing_role": "Top order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316605.3.png",
            "predicted_score": 102.35442442893832
        },
        {
            "unique_name": "W O'Rourke",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/389400/389417.jpg",
            "key_cricinfo": 1211825.0,
            "player_id": "cb9b8664",
            "full_name": "William Peter O'Rourke",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/387600/387602.4.png",
            "predicted_score": 84.72428983178646
        },
        {
            "unique_name": "DP Conway",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/389600/389692.jpg",
            "key_cricinfo": 379140.0,
            "player_id": "df5a6881",
            "full_name": "Devon Philip Conway",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383148.1.png",
            "predicted_score": 91.5380033869391
        },
        {
            "unique_name": "TWM Latham",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/186800/186843.jpg",
            "key_cricinfo": 388802.0,
            "player_id": "e824e6ee",
            "full_name": "Thomas William Maxwell Latham",
            "playing_role": "Wicketkeeper Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316672.1.png",
            "predicted_score": 95.4223177249687
        },
        {
            "unique_name": "MJ Henry",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/209600/209603.jpg",
            "key_cricinfo": 506612.0,
            "player_id": "e84ac20c",
            "full_name": "Matthew James Henry",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383178.1.png",
            "predicted_score": 132.50066442016148
        },
        {
            "unique_name": "DJ Mitchell",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/391800/391810.jpg",
            "key_cricinfo": 381743.0,
            "player_id": "eade4650",
            "full_name": "Daryl Joseph Mitchell",
            "playing_role": "Batting Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/383100/383147.2.png",
            "predicted_score": 119.33194580708863
        },
        {
            "unique_name": "SN Khan",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/178800/178885.jpg",
            "key_cricinfo": 642525.0,
            "player_id": "f088b960",
            "full_name": "Sarfaraz Naushad Khan",
            "playing_role": "Middle order Batter",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/386300/386338.16.png",
            "predicted_score": 76.93057990710558
        },
        {
            "unique_name": "AY Patel",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/390300/390306.jpg",
            "key_cricinfo": 595783.0,
            "player_id": "fbd4f01f",
            "full_name": "Ajaz Yunus Patel",
            "playing_role": "Bowler",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/390100/390169.5.png",
            "predicted_score": 98.16267907703993
        },
        {
            "unique_name": "RA Jadeja",
            "gender": "male",
            "bg_image_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_960/lsci/db/PICTURES/CMS/189600/189659.jpg",
            "key_cricinfo": 234675.0,
            "player_id": "fe93fd9d",
            "full_name": "Ravindrasinh Anirudhsinh Jadeja",
            "playing_role": "Allrounder",
            "img_src_url": "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/316600/316600.2.png",
            "predicted_score": 116.2944171880359
        }
    ],
    "count": 22
}