from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """
    Dependency to get a database session for FastAPI routes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def setup_db():
    """
    Function to create all tables in the database.
    """
    Base.metadata.create_all(bind=engine)
    print("Database setup complete!")
