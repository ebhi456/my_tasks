import random
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Two-Sided Dice API",
    version="1.0.0",
    description="API that generates only 1 or 2."
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
        "service": "two-sided-dice-api",
        "version": "1.0.0",
        "status": "running",
        "possible_results": [1, 2],
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "service": "two-sided-dice-api",
    }


@app.post("/api/spin", response_model=SpinResponse)
def spin():
    # IMPORTANT: this is deliberately a two-sided dice.
    # The only possible values are 1 and 2.
    result = random.choice([1, 2])

    return SpinResponse(
        result=result,
        message="Dice result generated successfully",
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
