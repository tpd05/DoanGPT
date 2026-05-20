def is_probably_name(text: str) -> bool:

    if not text:
        return False

    text = text.strip()

    if len(text) < 2 or len(text) > 50:
        return False

    words = text.split()
    if len(words) > 6:
        return False

    if any(char.isdigit() for char in text):
        return False

    invalid_chars = set("!@#$%^&*()_+=[]{}|\\:;\"'<>,.?/~`")
    if any(char in invalid_chars for char in text):
        return False

    return True