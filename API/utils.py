import base64

def check_base64(base64_string):
    try:
        decoded = base64.b64decode(base64_string, validate=True)
        if base64.b64encode(decoded).decode('utf-8') == base64_string:
            return True
    except (ValueError, binascii.Error):
        return False
    return False

def get_mime_type(file_extension):
    mime_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
    }
    return mime_types.get(file_extension.lower(), 'application/octet-stream')
