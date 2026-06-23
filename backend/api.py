from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

class TransactionPayload(BaseModel):
    type: str
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float
    balanceDiffOrig: float
    balanceDiffDest: float

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        'https://fraud-detection-model-ay51.onrender.com',
        'https://fraud-detection-model-opal.vercel.app',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

MODEL_PATH = Path(__file__).resolve().parent / "fraud_model.pkl"
if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Model artifact not found at {MODEL_PATH}. Make sure fraud_model.pkl is in the backend folder."
    )

model = joblib.load(MODEL_PATH)

@app.get("/")
def home():
    return {"message": "FraudGuard AI API"}

@app.post("/predict")
def predict(data: TransactionPayload):
    df = pd.DataFrame([data.dict()])

    pred = model.predict(df)[0]
    prob = float(model.predict_proba(df)[0][1])

    return {
        "prediction": int(pred),
        "fraud_probability": prob
    }