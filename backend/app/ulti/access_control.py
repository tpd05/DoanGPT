# backend/app/ulti/access_control.py

import unicodedata

PRIVATE_USERS = {
    "Bùi Thị Thanh Huệ",
    "Nguyễn Sơn Bắc",
    "Vũ Thành Long",
    "Nguyễn Kế Lương",
    "Phan Như Quỳnh",
    "Nguyễn Tuấn Anh"
}


def normalize_text(text: str) -> str:

    text = unicodedata.normalize("NFC", text)
    text = " ".join(text.strip().split())
    return text.lower()


def get_name_parts(full_name: str) -> list[str]:

    return normalize_text(full_name).split()


def can_access_private(username: str) -> bool:


    normalized_input = normalize_text(username)
    input_parts = normalized_input.split()

    for full_name in PRIVATE_USERS:
        normalized_full_name = normalize_text(full_name)
        full_parts = normalized_full_name.split()

        # 1. Khớp toàn bộ họ tên
        if normalized_input == normalized_full_name:
            return True

        # 2. Khớp tên cuối
        if len(input_parts) == 1 and input_parts[0] == full_parts[-1]:
            return True

        # 3. Khớp các từ cuối

        if len(input_parts) <= len(full_parts):
            if input_parts == full_parts[-len(input_parts):]:
                return True

    return False