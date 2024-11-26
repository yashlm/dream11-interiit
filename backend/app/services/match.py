from sqlalchemy.orm import Session
from app import model
from sqlalchemy import func

def get_all_matches_from_db(db: Session):
    return db.query(model.Match).all()

def get_all_team_matches_from_db(db: Session, team_name: str):
    return db.query(model.Match).filter(model.Match.batting_team == team_name).all()

from sqlalchemy import text

from sqlalchemy import func


def get_all_teams_matches_from_db(db: Session, team1_name: str, team2_name: str):
    return db.query(model.Match).filter(
        model.Match.teams.op('@>')([team1_name, team2_name])  # Checks for array overlap
    ).all()
# Assuming model.Match is your SQLAlchemy model

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
