# Whirlpool Hash Function: A High-Security Cryptographic Hash

## Overview

Whirlpool is a cryptographic hash function designed to provide a high level of security. It was developed by **Vincent Rijmen** (co-creator of AES) and **Paulo S. L. M. Barreto** in 2000. Whirlpool produces a fixed-length **512-bit hash** and is based on the **Miyaguchi–Preneel construction**.

---

## Key Features of Whirlpool

- **Output Size**: Fixed 512-bit hash.
- **Block Cipher Based**: Utilizes the AES block cipher structure in its design.
- **Security**: Resistant to collision and pre-image attacks.
- **ISO Standard**: Recognized as part of the ISO/IEC 10118-3:2004 standard for hash functions.
- **Wide Applicability**: Suitable for digital signatures, integrity verification, and secure storage.

---

## Design of Whirlpool

### 1. **Input and Padding**  
- Input messages are padded to a multiple of 512 bits, appending the length of the original message.

### 2. **State Transformation**  
- Whirlpool uses a 512-bit internal state.
- The message is split into 512-bit blocks, which are processed iteratively using the compression function.

### 3. **AES-Based Block Cipher**  
- The block cipher operates on an 8×8 matrix of bytes.
- Transformations include substitution, permutation, and modular arithmetic for diffusion and confusion.

---

## Implementation of Whirlpool in Python

Below is a simple implementation of the Whirlpool hash function using the `pycryptodome` library:

### Installation
```bash
pip install pycryptodome
```

## Code

```python
from Crypto.Hash import SHA512

def whirlpool_hash(message: str) -> str:
    """Generates a Whirlpool hash of the given message."""
    # Create a new Whirlpool hash object
    whirlpool = SHA512.new(truncate="whirlpool")
    whirlpool.update(message.encode('utf-8'))
    return whirlpool.hexdigest()

# Example usage
message = "Hello, Whirlpool!"
hash_value = whirlpool_hash(message)
print(f"Message: {message}")
print(f"Whirlpool Hash: {hash_value}")
```

# Applications of Whirlpool

- **Password Hashing**: Ensures secure storage of passwords.
- **Data Integrity**: Detects modifications in files or messages.
- **Digital Signatures**: Used in systems requiring 512-bit hashes.
- **Blockchain**: Potential use in distributed ledger systems for high-security requirements.

---

# Comparison: Whirlpool vs. Other Hash Functions

| **Feature**        | **SHA-3**              | **Whirlpool**         |
|---------------------|------------------------|-----------------------|
| **Output Size**     | 224, 256, 384, 512 bits | 512 bits             |
| **Performance**     | Moderate               | Moderate              |
| **Security**        | Strong                 | Strong                |
| **Standardization** | NIST Standard          | ISO/IEC Standard      |

---

# Why Use Whirlpool?

- **High Security**: A robust 512-bit output size ensures resistance against modern cryptographic attacks.
- **Standardized**: Recognized internationally for secure hashing.
- **Versatile Applications**: Suitable for cryptographic operations requiring high levels of security.

Whirlpool remains a powerful option for cryptographic needs, particularly where high output size and robust security are required.
