from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

MODEL_PATH = "./stayora-sentiment-model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)

model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_PATH
)

class ReviewRequest(BaseModel):
    review: str


@app.post("/predict")
def predict(request: ReviewRequest):

    inputs = tokenizer(
        request.review,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=128
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probabilities = torch.softmax(outputs.logits, dim=1)

    prediction = torch.argmax(probabilities, dim=1).item()

    confidence = probabilities[0][prediction].item()

    sentiment = "positive" if prediction == 1 else "negative"

    return {
        "sentiment": sentiment,
        "confidence": confidence
    }