from sqlalchemy.orm import Session
from app import model


def get_all_teams_from_db(db: Session):
    return db.query(model.Team).all()