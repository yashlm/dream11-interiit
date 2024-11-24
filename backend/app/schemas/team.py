from pydantic import BaseModel

class TeamSchema(BaseModel):
    name: str
    url: str

    class Config:
        orm_mode = True
