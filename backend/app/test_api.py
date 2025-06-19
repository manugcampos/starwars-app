import pytest
from fastapi.testclient import TestClient
from .main import app

client = TestClient(app)

def test_get_people():
    response = client.get("/people?page=1")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)
    assert data["count"] >= 0

def test_get_planets():
    response = client.get("/planets?page=1")
    assert response.status_code == 200
    data = response.json()
    assert "results" in data
    assert isinstance(data["results"], list)
    assert data["count"] >= 0

def test_people_search_and_sort():
    response = client.get("/people?search=sky&sort_by=name&order=asc")
    assert response.status_code == 200
    data = response.json()
    assert any("sky" in p["name"].lower() for p in data["results"])

def test_simulate_ai_insight():
    response = client.post("/simulate-ai-insight", json={"name": "Luke Skywalker"})
    assert response.status_code == 200
    data = response.json()
    assert "insight" in data
    assert "Luke Skywalker" in data["insight"]

def test_simulate_ai_insight_error():
    response = client.post("/simulate-ai-insight", json={})
    assert response.status_code == 400
    data = response.json()
    assert "error" in data 