from sqlalchemy.orm import Session
from app import model
from sqlalchemy import func
from sqlalchemy.sql import text
from sqlalchemy import or_
from fastapi import File, UploadFile
import pandas as pd
from io import StringIO
from sqlalchemy import text


def get_all_matches_from_db(db: Session):
    return db.query(model.Match).all()

def get_all_team_matches_from_db(db: Session, team_name: str):
    return db.query(model.Match).filter(model.Match.batting_team == team_name).all()


def get_all_teams_matches_from_db(db: Session, team1_name: str, team2_name: str):
    return db.query(model.Match).filter(
        text("teams @> ARRAY[:team1_name, :team2_name]::TEXT[]")
    ).params(team1_name=team1_name, team2_name=team2_name).all()
# def get_all_teams_matches_from_db(db: Session, team1_name: str, team2_name: str):
#     return db.query(model.Match).filter(
#         model.Match.teams.op('@>')([team1_name, team2_name])  # Checks for array overlap
#     ).all()
# Assuming model.Match is your SQLAlchemy model

def get_all_matches_for_date_from_db(db: Session, date: str):
    return db.query(model.Match).filter(model.Match.dates.any(date)).all()

def get_all_featured_matches_for_date_from_db(db: Session, date: str):
    return db.query(model.Match).filter(
        model.Match.dates.any(date), model.Match.isfeatured == 'yes'
    ).all()
def match_to_dict(match):
    """
    Converts a SQLAlchemy Match object to a dictionary.
    """
    return {
        "match_id": match.match_id,
        "innings": match.innings,
        "batting_team": match.batting_team,
        "city": match.city,
        "dates": match.dates,
        "event_name": match.event_name,
        "match_number": match.match_number,
        "gender": match.gender,
        "match_type": match.match_type,
        "match_referees": match.match_referees,
        "tv_umpires": match.tv_umpires,
        "umpires": match.umpires,
        "team_type": match.team_type,
        "teams": match.teams,
        "venue": match.venue,
        "players": match.players,
        "season": match.season,
    }


def get_match_details_from_db(db: Session, match_id: str):
    return db.query(model.Match).filter(model.Match.match_id == match_id).first()


async def get_data_from_csv(file: UploadFile = File(...)):
    # Read the uploaded file content
    contents = await file.read()
    # Convert bytes to string (assuming the file is UTF-8 encoded)
    csv_content = contents.decode("utf-8")
    
    # Using StringIO to simulate a file object for pandas to read the CSV
    csv_file = StringIO(csv_content)
    
    # Read CSV data into a pandas DataFrame
    df_input = pd.read_csv(csv_file)
    
    return df_input

def get_match_weather_from_db(db: Session, match_id: str):
    return db.query(model.WeatherData).filter(model.WeatherData.match_id == match_id).first().weather