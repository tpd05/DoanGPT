from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from google import genai
import os


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("Không tìm thấy GEMINI_API_KEY trong file .env")


client = genai.Client(api_key=api_key)


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "ChatLGPT API is running"}


@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=req.message,
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        print("Gemini Error:", e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )