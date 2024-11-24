from fastapi import APIRouter
from app.api.routes import team, user 

api_router = APIRouter()

@api_router.get("/")
def main_function():
    return "Server is running......🥳!!"

# api_router.include_router(team.router, tags=["login"])
api_router.include_router(team.router, prefix="/team", tags=["teams"])
api_router.include_router(user.router, prefix="/user", tags=["users"])
