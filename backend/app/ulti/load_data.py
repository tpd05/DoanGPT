import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

PUBLIC_DATA_PATH = BASE_DIR / "data" / "public.json"
PRIVATE_DATA_PATH = BASE_DIR / "data" / "private.json"


def load_json_data(file_path: Path) -> dict | None:
    """
    Đọc dữ liệu từ một file JSON.

    Args:
        file_path (Path): Đường dẫn tới file JSON.

    Returns:
        dict | None: Dữ liệu đọc được hoặc None nếu có lỗi.
    """
    if not file_path.exists():
        print(f"File {file_path} không tồn tại.")
        return None

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        print(f"Đã tải dữ liệu từ {file_path}.")
        return data

    except json.JSONDecodeError:
        print(f"File {file_path} không phải là JSON hợp lệ.")
        return None

    except Exception as e:
        print(f"Lỗi khi đọc file {file_path}: {e}")
        return None


def load_public_data() -> dict | None:
    """
    Đọc dữ liệu công khai từ public.json.
    """
    return load_json_data(PUBLIC_DATA_PATH)


def load_private_data() -> dict | None:
    """
    Đọc dữ liệu riêng tư từ private.json.
    """
    return load_json_data(PRIVATE_DATA_PATH)


def merge_data(
    public_data: dict | None,
    private_data: dict | None = None
) -> dict:
    """
    Gộp dữ liệu public và private.

    Quy tắc:
    - Nếu key chưa tồn tại -> thêm mới.
    - dict + dict -> gộp dict.
    - list + list -> nối list.
    - Kiểu khác -> private ghi đè public.
    """
    if public_data is None:
        public_data = {}

    if private_data is None:
        private_data = {}

    merged = public_data.copy()

    for key, value in private_data.items():
        # Nếu key chưa tồn tại
        if key not in merged:
            merged[key] = value
            continue

        # Nếu cả hai đều là dict
        if isinstance(merged[key], dict) and isinstance(value, dict):
            merged[key] = {
                **merged[key],
                **value
            }

        # Nếu cả hai đều là list
        elif isinstance(merged[key], list) and isinstance(value, list):
            merged[key].extend(value)

        # Các kiểu khác -> ghi đè
        else:
            merged[key] = value

    return merged


def load_personal_data(
    include_private: bool = False
) -> dict | None:
    """
    Đọc dữ liệu cá nhân.

    Args:
        include_private (bool):
            - False: chỉ đọc public.json
            - True: đọc public.json + private.json

    Returns:
        dict | None
    """
    # Đọc dữ liệu public
    public_data = load_public_data()

    if public_data is None:
        print("Không thể tải dữ liệu công khai.")
        return None

    # Nếu không cần dữ liệu private
    if not include_private:
        return public_data

    # Đọc dữ liệu private
    private_data = load_private_data()

    if private_data is None:
        print("Không thể tải dữ liệu riêng tư.")
        return None

    # Gộp public + private
    return merge_data(public_data, private_data)