# Elliptic Curve Cryptography (ECC)

## Introduction

Elliptic Curve Cryptography (ECC) is a modern approach to public-key cryptography based on the algebraic structure of elliptic curves over finite fields. Compared to traditional cryptographic systems like RSA, ECC can provide the same level of security with significantly smaller key sizes, making it particularly suitable for constrained environments.

## Mathematical Foundations

### Basic Definition

An elliptic curve over a field K is defined by the Weierstrass equation:
y² = x³ + ax + b

where a, b ∈ K and 4a³ + 27b² ≠ 0 (to ensure no singular points)

### Point Operations

1. **Point Addition**:
   - Let P = (x₁, y₁) and Q = (x₂, y₂) be points on the curve
   - The sum R = P + Q = (x₃, y₃) is defined by:
     ```
     λ = (y₂ - y₁)/(x₂ - x₁)
     x₃ = λ² - x₁ - x₂
     y₃ = λ(x₁ - x₃) - y₁
     ```

2. **Point Doubling**:
   - For P = (x, y), 2P = (x', y') is defined by:
     ```
     λ = (3x² + a)/(2y)
     x' = λ² - 2x
     y' = λ(x - x') - y
     ```

### Finite Field Operations

1. **Prime Field (Fp)**:
   - Elements are integers modulo p
   - Operations performed modulo p
   - Used in curves like P-256, P-384

2. **Binary Field (F2m)**:
   - Elements are polynomials over F2
   - Used in curves like B-233, K-283

## Standard Curves

### NIST Curves

1. **P-256 (secp256r1)**:
   - Prime field: p = 2²⁵⁶ - 2²²⁴ + 2¹⁹² + 2⁹⁶ - 1
   - Most widely used NIST curve
   - Suitable for general-purpose cryptography

2. **P-384 (secp384r1)**:
   - Higher security level
   - Used in applications requiring extra security

### Other Popular Curves

1. **Curve25519**:
   - Designed by Daniel J. Bernstein
   - Efficient and secure implementation
   - Used in modern protocols like Signal

2. **secp256k1**:
   - Used in Bitcoin and other cryptocurrencies
   - Special parameters for efficient computation

## Implementation

### Basic ECC Operations in Python

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class Point:
    x: int
    y: int
    
class EllipticCurve:
    def __init__(self, a: int, b: int, p: int):
        self.a = a
        self.b = b
        self.p = p
        
    def add_points(self, P: Point, Q: Point) -> Point:
        if P.x == Q.x and P.y == Q.y:
            return self.double_point(P)
            
        # Point addition formula
        s = ((Q.y - P.y) * pow(Q.x - P.x, -1, self.p)) % self.p
        x3 = (s*s - P.x - Q.x) % self.p
        y3 = (s*(P.x - x3) - P.y) % self.p
        
        return Point(x3, y3)
    
    def double_point(self, P: Point) -> Point:
        # Point doubling formula
        s = ((3*P.x*P.x + self.a) * pow(2*P.y, -1, self.p)) % self.p
        x3 = (s*s - 2*P.x) % self.p
        y3 = (s*(P.x - x3) - P.y) % self.p
        
        return Point(x3, y3)
```

### Scalar Multiplication

```python
def scalar_multiply(self, k: int, P: Point) -> Point:
    """Double-and-add algorithm for scalar multiplication"""
    result = None
    current = P
    
    while k:
        if k & 1:
            if result is None:
                result = current
            else:
                result = self.add_points(result, current)
        current = self.double_point(current)
        k >>= 1
        
    return result
```

## Cryptographic Protocols

### ECDH (Elliptic Curve Diffie-Hellman)

1. **Key Generation**:
   ```python
   def generate_keypair(curve, G: Point):
       private_key = random.randrange(1, curve.p)
       public_key = curve.scalar_multiply(private_key, G)
       return private_key, public_key
   ```

2. **Shared Secret Computation**:
   ```python
   def compute_shared_secret(curve, private_key: int, 
                           other_public: Point) -> Point:
       return curve.scalar_multiply(private_key, other_public)
   ```

### ECDSA (Elliptic Curve Digital Signature Algorithm)

1. **Signature Generation**:
   - Generate random k
   - Compute R = kG
   - Compute s = k⁻¹(hash(m) + dᴀR.x) mod n

2. **Signature Verification**:
   - Compute u₁ = s⁻¹hash(m) mod n
   - Compute u₂ = s⁻¹R.x mod n
   - Verify u₁G + u₂Qᴀ = R

## Security Considerations

### Key Size Recommendations

1. **Minimum Key Sizes**:
   - 256 bits for general use
   - 384 bits for high-security applications
   - 521 bits for long-term security

2. **Security Level Comparison**:
   | ECC Key Size | RSA Key Size | Security Level |
   |--------------|--------------|----------------|
   | 256 bits     | 3072 bits    | 128 bits      |
   | 384 bits     | 7680 bits    | 192 bits      |
   | 521 bits     | 15360 bits   | 256 bits      |

### Known Attacks

1. **Small Subgroup Attacks**:
   - Verify curve points are in the main subgroup
   - Use curves with prime order

2. **Invalid Curve Attacks**:
   - Validate points lie on the curve
   - Check point coordinates are in valid range

3. **Timing Attacks**:
   - Use constant-time implementations
   - Avoid branching based on secret data

## Best Practices

1. **Implementation Guidelines**:
   - Use validated libraries
   - Follow constant-time practices
   - Proper random number generation

2. **Parameter Selection**:
   - Use standardized curves
   - Avoid custom curves unless necessary
   - Verify all parameters

3. **Key Management**:
   - Secure key generation
   - Safe key storage
   - Regular key rotation

## Real-World Applications

1. **TLS/SSL**:
   - Used in modern HTTPS
   - Supported curves in TLS 1.3
   - Efficient handshake process

2. **Cryptocurrency**:
   - Bitcoin's secp256k1
   - Ethereum's secp256k1
   - Digital signatures and key generation

3. **IoT Security**:
   - Resource-constrained devices
   - Efficient key exchange
   - Low power consumption

## Common Implementation Pitfalls

1. **Point Validation**:
   - Not checking if points are on curve
   - Missing infinity point handling
   - Incorrect modular arithmetic

2. **Random Number Generation**:
   - Weak RNG usage
   - Reusing random values
   - Insufficient entropy

3. **Timing Leaks**:
   - Variable-time operations
   - Secret-dependent branches
   - Cache timing attacks

## Practice Problems

1. Implement point addition and doubling
2. Create ECDH key exchange
3. Verify points on curve
4. Implement scalar multiplication
5. Create simple ECDSA implementation

## Further Reading

1. Standards:
   - SEC 1: Elliptic Curve Cryptography
   - NIST SP 800-56A
   - RFC 6090 (ECC Basics)

2. Research Papers:
   - Original Miller paper on ECC
   - Bernstein's Curve25519 paper
   - Recent developments in ECC