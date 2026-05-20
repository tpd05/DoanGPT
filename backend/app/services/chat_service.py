# backend/app/services/chat_service.py

from app.ulti.load_data import load_personal_data
from app.ulti.access_control import can_access_private
from app.ulti.name_detector import is_probably_name

from app.services.prompt_builder import build_prompt
from app.services.gemini_service import generate_response


def find_relationship(personal_data: dict, username: str) -> dict | None:
    """
    Tìm thông tin mối quan hệ của username trong personal_data.
    """
    relationships = personal_data.get("relationships", [])

    for relationship in relationships:
        name = relationship.get("name", "").strip().lower()

        if name == username.strip().lower():
            return relationship

    return None


def build_relationship_intro(username: str, relationship: dict) -> str:
    """
    Tạo lời chào khi người dùng nằm trong dữ liệu relationships.
    """

    addressing = relationship.get("addressing", "").strip()
    description = relationship.get("description", "").strip()

    if addressing:
        intro = (
            f"À {username}! Em nhận ra rồi 😊 "
            f"Anh Đoàn đã từng kể với em rằng anh là {addressing} của anh ấy. "
        )
    else:
        intro = (
            f"À {username}! Em nhận ra rồi 😊 "
            f"Anh Đoàn đã từng nhắc đến anh với em. "
        )

    if description:
        detail = (
            f"Theo những gì anh Đoàn chia sẻ, {description}. "
        )
    else:
        detail = ""

    closing = (
        "Em rất vui được trò chuyện với anh. "
        "Anh cứ thoải mái hỏi em bất cứ điều gì nhé!"
    )

    return intro + detail + closing


def chat_with_doangpt(
    question: str,
    username: str | None = None
) -> dict:
    """
    Xử lý toàn bộ logic trò chuyện với DoanGPT.

    Returns:
        {
            "reply": str,
            "username": str | None,
            "is_name_detected": bool
        }
    """

    if username is None:
        if not is_probably_name(question):
            return {
                "reply": (
                    "Oops, em chưa nhận ra đây là tên hợp lệ.\n\n"
                    "Bro cho em xin lại họ và tên để em tiện xưng hô nhé!"
                ),
                "username": None,
                "is_name_detected": False
            }

        username = question.strip()

        include_private = can_access_private(username)

        personal_data = load_personal_data(
            include_private=include_private
        )

        if personal_data is None:
            return {
                "reply": "Xin lỗi bro, em chưa tải được dữ liệu.",
                "username": username,
                "is_name_detected": True
            }

        relationship = find_relationship(
            personal_data,
            username
        )

        if relationship:
            reply = build_relationship_intro(
                username,
                relationship
            )

            return {
                "reply": reply,
                "username": username,
                "is_name_detected": True
            }

        prompt = build_prompt(
            question=f"Tôi tên là {username}",
            personal_data=personal_data,
            username=username
        )

        reply = generate_response(prompt)

        return {
            "reply": reply,
            "username": username,
            "is_name_detected": True
        }

    include_private = can_access_private(username)

    personal_data = load_personal_data(
        include_private=include_private
    )

    if personal_data is None:
        return {
            "reply": "Xin lỗi bro, em chưa tải được dữ liệu.",
            "username": username,
            "is_name_detected": True
        }

    prompt = build_prompt(
        question=question,
        personal_data=personal_data,
        username=username
    )

    reply = generate_response(prompt)

    return {
        "reply": reply,
        "username": username,
        "is_name_detected": True
    }