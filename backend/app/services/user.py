from sqlalchemy.orm import Session
from app.model.model import User, UserCreate
# from app.schemas.user import UserBase
# from app.db.session import setup_db

def create_user(db: Session , username: str, password: str, email: str) -> User:
    """
    Register a new user in the database
    """
    user = User(username=username, password=password, email=email )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
