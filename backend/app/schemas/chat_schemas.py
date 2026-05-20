from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str
    username: str | None = None


class ChatResponse(BaseModel):
    reply: str
    username: str | None = None
    is_name_detected: bool = False