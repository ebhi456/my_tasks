import random
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


POSSIBLE_RESULTS = [1, 2, 3, 4, 5]


app = FastAPI(
    title="Dice Selection API",
    version="1.0.0",
    description="API that generates a random value from 1 to 5."
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SpinResponse(BaseModel):
    result: int
    message: str
    timestamp: str


@app.get("/")
def root():
    return {
        "service": "dice-selection-api",
        "version": "1.0.0",
        "status": "running",
        "possible_results": POSSIBLE_RESULTS,
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "dice-selection-api",
    }


@app.post("/api/spin", response_model=SpinResponse)
def spin():
    # Generate a random value from 1 to 5.
    result = random.choice(POSSIBLE_RESULTS)

    return SpinResponse(
        result=result,
        message="Dice result generated successfully",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )