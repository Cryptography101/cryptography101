# Python for Cryptography

## Introduction
Python is one of the most popular languages for cryptography due to its clear syntax, extensive libraries, and strong community support.

## Setting Up Python for Cryptography

### Required Tools
```bash
# Install Python and pip
python -m pip install --upgrade pip

# Install essential libraries
pip install pycryptodome
pip install cryptography
pip install hashlib
pip install secrets
```

## Essential Libraries

### pycryptodome
A self-contained Python package of low-level cryptographic primitives.

```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

# Generate a random key
key = get_random_bytes(32)  # 256-bit key

# Create cipher
cipher = AES.new(key, AES.MODE_GCM)

# Encrypt data
data = b"Secret message"
ciphertext, tag = cipher.encrypt_and_digest(data)
```

### cryptography
High-level recipes and low-level interfaces to common cryptographic algorithms.

```python
from cryptography.fernet import Fernet

# Generate key
key = Fernet.generate_key()
f = Fernet(key)

# Encrypt
token = f.encrypt(b"Secret message")

# Decrypt
plaintext = f.decrypt(token)
```

## Common Cryptographic Operations

### Hashing
```python
import hashlib
import hmac

# Simple hashing
def hash_string(data):
    return hashlib.sha256(data.encode()).hexdigest()

# HMAC
def create_hmac(key, message):
    return hmac.new(key.encode(), 
                   message.encode(), 
                   hashlib.sha256).hexdigest()
```

### Symmetric Encryption
```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

def encrypt_aes(data, key):
    cipher = AES.new(key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(data.encode(), AES.block_size))
    return cipher.iv, ct_bytes

def decrypt_aes(iv, ct_bytes, key):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    pt = unpad(cipher.decrypt(ct_bytes), AES.block_size)
    return pt.decode()
```

### Asymmetric Encryption
```python
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

def generate_rsa_keys():
    key = RSA.generate(2048)
    private_key = key.export_key()
    public_key = key.publickey().export_key()
    return private_key, public_key

def rsa_encrypt(message, public_key):
    key = RSA.import_key(public_key)
    cipher = PKCS1_OAEP.new(key)
    return cipher.encrypt(message.encode())
```

## Security Best Practices

### Secure Random Numbers
```python
import secrets

# Generate secure random numbers
secure_random = secrets.randbelow(100)

# Generate secure tokens
secure_token = secrets.token_hex(16)
```

### Key Management
```python
from cryptography.fernet import Fernet
import base64
import os

def generate_key():
    return base64.urlsafe_b64encode(os.urandom(32))

def save_key(key, filename):
    with open(filename, 'wb') as key_file:
        key_file.write(key)

def load_key(filename):
    with open(filename, 'rb') as key_file:
        return key_file.read()
```

## CTF Examples

### Simple XOR Cipher
```python
def xor_encrypt(message, key):
    return bytes(a ^ b for a, b in zip(message.encode(), 
                                     key.encode() * len(message)))

def xor_decrypt(ciphertext, key):
    return xor_encrypt(ciphertext, key)  # XOR is its own inverse
```

### Frequency Analysis
```python
from collections import Counter

def frequency_analysis(ciphertext):
    return Counter(ciphertext.lower())
```

## Projects and Exercises

### Exercise 1: Implement Caesar Cipher
```python
def caesar_encrypt(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            ascii_offset = ord('A') if char.isupper() else ord('a')
            result += chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
        else:
            result += char
    return result
```

### Exercise 2: Hash Cracking
```python
def brute_force_md5(hash_to_crack, wordlist):
    for word in wordlist:
        if hashlib.md5(word.encode()).hexdigest() == hash_to_crack:
            return word
    return None
```

## Further Resources
- [Python Cryptography Documentation](https://cryptography.io/en/latest/)
- [PyCryptodome Documentation](https://pycryptodome.readthedocs.io/)
- [Python Security Guide](https://python-security.readthedocs.io/)
- Practice CTF platforms
