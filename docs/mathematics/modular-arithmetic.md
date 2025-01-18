# Modular Arithmetic

## Introduction to Modular Arithmetic
Modular arithmetic is a system of arithmetic for integers where numbers "wrap around" after reaching a certain value - the modulus.

## Basic Concepts

### The Modulo Operation
When we divide an integer a by a positive integer n, we get:
a = qn + r
where:
- q is the quotient
- r is the remainder (0 ≤ r < n)

We write: a ≡ r (mod n)

Example:
17 ≡ 5 (mod 12) because 17 = 1 × 12 + 5

### Basic Operations

#### Addition Modulo n
(a + b) mod n = ((a mod n) + (b mod n)) mod n

Example:
(14 + 15) mod 12 = 5
Because:
14 ≡ 2 (mod 12)
15 ≡ 3 (mod 12)
2 + 3 = 5

#### Multiplication Modulo n
(a × b) mod n = ((a mod n) × (b mod n)) mod n

Example:
(7 × 8) mod 12 = 8
Because:
7 ≡ 7 (mod 12)
8 ≡ 8 (mod 12)
7 × 8 = 56 ≡ 8 (mod 12)

## Properties

### Congruence Relations
a ≡ b (mod n) if n divides (a - b)

Properties:
1. Reflexive: a ≡ a (mod n)
2. Symmetric: If a ≡ b (mod n), then b ≡ a (mod n)
3. Transitive: If a ≡ b (mod n) and b ≡ c (mod n), then a ≡ c (mod n)

### Multiplicative Inverse
An integer a has a multiplicative inverse modulo n if:
- a and n are coprime (gcd(a,n) = 1)
- There exists a number b such that: ab ≡ 1 (mod n)

## Applications in Cryptography

### RSA Encryption
- Key generation using modular arithmetic
- Encryption: c ≡ m^e (mod n)
- Decryption: m ≡ c^d (mod n)

### Diffie-Hellman Key Exchange
- Public parameters: prime p and generator g
- Private keys: a, b
- Public keys: g^a mod p, g^b mod p
- Shared secret: (g^a)^b mod p = (g^b)^a mod p

## Practice Problems

1. Calculate: (23 + 17) mod 10
2. Find the multiplicative inverse of 7 modulo 11
3. Verify that 3 × 5 ≡ 1 (mod 7)
4. Solve the congruence: 3x ≡ 4 (mod 11)

## Implementation Tips
```python
def mod_add(a, b, n):
    return ((a % n) + (b % n)) % n

def mod_mul(a, b, n):
    return ((a % n) * (b % n)) % n

def mod_pow(base, exponent, modulus):
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent & 1:
            result = (result * base) % modulus
        base = (base * base) % modulus
        exponent >>= 1
    return result
```

## Further Reading
- A Course in Number Theory and Cryptography (Neal Koblitz)
- Handbook of Applied Cryptography (Menezes et al.)
