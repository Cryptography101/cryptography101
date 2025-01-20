# Salt and Pepper
## Understanding Salt

### Salt Basics
- Always use unique salts for each hash
- Generate cryptographically secure random salts
- Use appropriate salt length (at least 16 bytes)
- Store salt alongside hash value

### Salt Implementation
```python
import os
import hashlib

def generate_salt(length=16):
    return os.urandom(length)

def hash_password(password, salt):
    return hashlib.pbkdf2_hmac(
        'sha256',
        password.encode(),
        salt,
        100000  # iterations
    )
```

## Using Pepper

### Pepper Implementation
- Store pepper separately from salt and hash
- Use environment variables or secure key management
- Rotate pepper periodically
- Implement pepper rotation strategy

