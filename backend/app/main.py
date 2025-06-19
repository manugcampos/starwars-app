from fastapi import FastAPI
from .api import router

app = FastAPI(title="Star Wars API Proxy")

app.include_router(router) 