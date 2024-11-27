def check_base64(base64_string):
    try:
        base64_string.encode('utf-8')
    except UnicodeDecodeError:
        return False
    return True

def get_mime_type(file_extension):
    mime_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
    }
    return mime_types.get(file_extension.lower(), 'application/octet-stream')
