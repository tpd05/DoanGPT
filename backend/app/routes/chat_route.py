from fastapi import APIRouter
from app.schemas.chat_schemas import ChatRequest, ChatResponse
from app.services.chat_service import chat_with_doangpt

router = APIRouter()


@router.get("/chat/welcome", response_model=ChatResponse)
def welcome():
    return ChatResponse(
        reply=(
            "Hey bro! Em là DoanGPT — trợ lý ảo siêu thân thiện, biết tất tần tật mọi thứ về anh Trần Phương Đoàn.\n\n "
            "Trước khi bắt đầu buôn chuyện, bro cho em xin tên được không ạ? "
            "Để em tiện xưng hô và xem bro có mối quan hệ đặc biệt nào với anh Đoàn nhà em không nhé! 😄"
        ),
        username=None,
        is_name_detected=False
    )


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    result = chat_with_doangpt(
        question=req.message,
        username=req.username,

    )

    return ChatResponse(
        reply=result["reply"],
        username=result["username"],
        is_name_detected=result["is_name_detected"]
    )