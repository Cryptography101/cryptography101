# ElGamal Encryption System

## Overview

The ElGamal encryption system is an asymmetric key encryption algorithm based on the Diffie-Hellman key exchange. It was described by Taher ElGamal in 1985 and is used in various cryptographic protocols, including OpenPGP.

## Mathematical Foundation

### Discrete Logarithm Problem (DLP)
ElGamal's security is based on the difficulty of solving the discrete logarithm problem in cyclic groups. Given elements g and h in a cyclic group G, finding x such that g^x = h is computationally infeasible for large groups.

### Mathematical Components
- A large prime number p (typically 2048-3072 bits)
- A generator g of the multiplicative group Z*p
- Private key x (random number: 1 < x < p-1)
- Public key y = g^x mod p

## Algorithm Details

### Key Generation
1. Choose a large prime p and generator g
2. Select private key x randomly
3. Compute public key y = g^x mod p
4. Public parameters: (p, g, y)
5. Private parameter: x

```python
def generate_keys(bits):
    # Generate prime p
    p = generate_safe_prime(bits)
    
    # Find generator g
    g = find_generator(p)
    
    # Private key x
    x = random.randrange(2, p-1)
    
    # Public key y = g^x mod p
    y = pow(g, x, p)
    
    return {
        'public': {'p': p, 'g': g, 'y': y},
        'private': {'x': x}
    }
```

### Encryption
To encrypt a message M:
1. Choose random k (1 < k < p-1)
2. Compute c1 = g^k mod p
3. Compute s = y^k mod p
4. Compute c2 = M * s mod p
5. Ciphertext: (c1, c2)

```python
def encrypt(public_key, message):
    p, g, y = public_key['p'], public_key['g'], public_key['y']
    
    # Random ephemeral key
    k = random.randrange(2, p-1)
    
    # First component c1 = g^k mod p
    c1 = pow(g, k, p)
    
    # Compute shared secret s = y^k mod p
    s = pow(y, k, p)
    
    # Second component c2 = M * s mod p
    c2 = (message * s) % p
    
    return {'c1': c1, 'c2': c2}
```

### Decryption
To decrypt ciphertext (c1, c2):
1. Compute s = c1^x mod p
2. Compute M = c2 * s^(-1) mod p

```python
def decrypt(private_key, public_key, ciphertext):
    p, x = public_key['p'], private_key['x']
    c1, c2 = ciphertext['c1'], ciphertext['c2']
    
    # Compute shared secret s = c1^x mod p
    s = pow(c1, x, p)
    
    # Compute modular multiplicative inverse of s
    s_inv = pow(s, -1, p)
    
    # Recover message M = c2 * s^(-1) mod p
    message = (c2 * s_inv) % p
    
    return message
```

## Security Considerations

### Key Size Requirements
- Prime p should be at least 2048 bits
- Private key x should be randomly generated using a cryptographically secure random number generator
- Ephemeral key k must be unique for each encryption

### Known Attacks

1. **Small Subgroup Attacks**
```python
def validate_parameters(p, g):
    # Check if p is prime
    if not is_prime(p):
        raise ValueError("p must be prime")
        
    # Ensure g generates a large subgroup
    if pow(g, (p-1)//2, p) == 1:
        raise ValueError("g generates small subgroup")
```

2. **Malleability**
The basic ElGamal encryption is malleable. To prevent this, use authenticated encryption:

```python
def authenticated_encrypt(public_key, message):
    # Encrypt message
    ciphertext = encrypt(public_key, message)
    
    # Generate MAC
    mac_key = generate_mac_key()
    mac = hmac.new(mac_key, 
                   str(ciphertext['c1'] + ciphertext['c2']).encode(),
                   hashlib.sha256).digest()
    
    return {
        'c1': ciphertext['c1'],
        'c2': ciphertext['c2'],
        'mac': mac
    }
```

3. **Semantic Security**
ElGamal is semantically secure under the Decisional Diffie-Hellman assumption.

## Implementation Best Practices

### Parameter Generation

```python
def generate_safe_parameters(bits):
    while True:
        # Generate prime p where (p-1)/2 is also prime
        q = generate_prime(bits - 1)
        p = 2 * q + 1
        if is_prime(p):
            # Find suitable generator
            g = find_generator(p)
            if g != 1 and pow(g, q, p) != 1:
                return p, g
```

### Secure Random Number Generation

```python
def generate_secure_random(p):
    # Use cryptographically secure random number generator
    return secrets.randbelow(p - 2) + 1
```

### Message Encoding

```python
def encode_message(message):
    # Convert message to integer
    message_bytes = message.encode()
    return int.from_bytes(message_bytes, 'big')

def decode_message(number, length):
    # Convert integer back to message
    return number.to_bytes(length, 'big').decode()
```

## Complete Example Implementation

```python
class ElGamal:
    def __init__(self, key_size=2048):
        self.key_size = key_size
        self.keys = None
    
    def generate_keypair(self):
        self.keys = generate_keys(self.key_size)
        return self.keys
    
    def encrypt_message(self, message, public_key=None):
        if public_key is None:
            public_key = self.keys['public']
            
        # Encode message
        m = encode_message(message)
        
        # Encrypt
        return encrypt(public_key, m)
    
    def decrypt_message(self, ciphertext, private_key=None):
        if private_key is None:
            private_key = self.keys['private']
            
        # Decrypt
        m = decrypt(private_key, self.keys['public'], ciphertext)
        
        # Decode message
        return decode_message(m)
```

## Performance Considerations

1. **Modular Exponentiation**
Use efficient algorithms for modular exponentiation:

```python
def fast_modular_exp(base, exponent, modulus):
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent & 1:
            result = (result * base) % modulus
        base = (base * base) % modulus
        exponent >>= 1
    return result
```

2. **Parameter Caching**
Cache frequently used parameters:

```python
class CachedElGamal:
    def __init__(self):
        self.cached_params = {}
    
    def get_params(self, bits):
        if bits not in self.cached_params:
            self.cached_params[bits] = generate_safe_parameters(bits)
        return self.cached_params[bits]
```

## Testing and Validation

```python
def test_elgamal():
    # Create instance
    el = ElGamal(key_size=2048)
    
    # Generate keys
    keys = el.generate_keypair()
    
    # Test message
    original = "Secret message"
    
    # Encrypt
    ciphertext = el.encrypt_message(original)
    
    # Decrypt
    decrypted = el.decrypt_message(ciphertext)
    
    # Verify
    assert original == decrypted
    print("ElGamal encryption test passed!")
```

## Security Recommendations

1. Always use strong parameters (2048+ bits)
2. Use authenticated encryption
3. Never reuse ephemeral keys
4. Implement proper parameter validation
5. Use secure random number generation
6. Properly handle key storage and distribution
7. Regularly update keys and parameters

## References

1. T. ElGamal, "A Public Key Cryptosystem and a Signature Scheme Based on Discrete Logarithms"
2. NIST Special Publication 800-56A: Recommendation for Pair-Wise Key Establishment Schemes
3. Handbook of Applied Cryptography, Chapter 8: ElGamal Encryption