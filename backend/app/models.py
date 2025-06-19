from pydantic import BaseModel
from typing import List, Optional

class Person(BaseModel):
    name: str
    created: str
    url: str

class Planet(BaseModel):
    name: str
    created: str
    url: str

class PaginatedResponse(BaseModel):
    count: int
    next: Optional[str]
    previous: Optional[str]
    results: List[dict] 