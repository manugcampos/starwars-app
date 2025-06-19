import httpx
from typing import Dict, Any
import os

BASE_URL = os.getenv("SWAPI_BASE_URL", "https://swapi.dev/api")

async def fetch_people(page: int = 1) -> Dict[str, Any]:
    url = f"{BASE_URL.rstrip('/')}/people/?page={page}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json()

async def fetch_planets(page: int = 1) -> Dict[str, Any]:
    url = f"{BASE_URL.rstrip('/')}/planets/?page={page}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        return resp.json() 