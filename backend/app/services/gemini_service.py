# backend/app/services/gemini_service.py

import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai.errors import ClientError

BASE_DIR = Path(__file__).resolve().parents[3]
ENV_PATH = BASE_DIR / ".env"

load_dotenv(ENV_PATH)

keys_string = (
    os.getenv("GEMINI_API_KEYS")
    or os.getenv("GEMINI_API_KEY")
    or ""
)

api_keys = [
    key.strip()
    for key in keys_string.split(",")
    if key.strip()
]

if not api_keys:
    raise RuntimeError(
        f"Không tìm thấy GEMINI_API_KEY hoặc GEMINI_API_KEYS trong file: {ENV_PATH}"
    )

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

current_key_index = 0


def is_retryable_error(error: Exception) -> bool:
    """
    Các lỗi cần thử sang API key khác.
    """
    if isinstance(error, ClientError):
        message = str(error).lower()

        retry_keywords = [
            "resource_exhausted",   # 429
            "api key not valid",    # key sai
            "invalid_argument",     # 400
            "unauthenticated",      # 401
            "permission_denied",    # 403
            "quota",
            "rate limit",
            "unavailable",          # 503 model quá tải
            "high demand",
        ]

        return any(keyword in message for keyword in retry_keywords)

    return False


def get_api_keys_in_order() -> list[str]:
    """
    Trả về danh sách API key theo thứ tự ưu tiên.
    Nếu current_key_index = 2:
    [key3, key1, key2]
    """
    if not api_keys:
        return []

    return (
        api_keys[current_key_index:]
        + api_keys[:current_key_index]
    )


def generate_response(prompt: str) -> str:
    global current_key_index

    last_error = None
    ordered_keys = get_api_keys_in_order()

    for offset, api_key in enumerate(ordered_keys):
        # Tính index thực trong danh sách gốc
        real_index = (current_key_index + offset) % len(api_keys)

        try:
            print(f"Đang thử API key #{real_index + 1}")

            client = genai.Client(api_key=api_key)

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt
            )

            if response.text:
                print(f"Thành công với API key #{real_index + 1}")

                # Ghi nhớ key hoạt động tốt nhất
                current_key_index = real_index

                return response.text

        except Exception as e:
            last_error = e
            print(f"API key #{real_index + 1} lỗi: {e}")

            if is_retryable_error(e):
                print("Chuyển sang API key tiếp theo...")
                continue
            else:
                break

    print(f"Tất cả API key đều thất bại. Lỗi cuối: {last_error}")

    return (
        "Xin lỗi, hiện tại hệ thống đang quá tải hoặc tất cả API key đều "
        "đã hết quota. Vui lòng thử lại sau ít phút."
    )