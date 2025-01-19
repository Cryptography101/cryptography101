# Greatest Common Divisor and Least Common Multiple

The Greatest Common Divisor (GCD) and Least Common Multiple (LCM) are fundamental concepts in number theory that play crucial roles in cryptography, particularly in key generation and modular arithmetic operations.

## Greatest Common Divisor (GCD)

### Definition

The Greatest Common Divisor (also called Greatest Common Factor) of two integers a and b is the largest positive integer that divides both a and b.

Notation: GCD(a,b) or (a,b)

### Properties of GCD

1. For any integer n, GCD(n,0) = |n|
2. GCD(a,b) = GCD(|a|,|b|)
3. GCD(a,b) = GCD(b,a)
4. GCD(a,b) = GCD(a-b,b) when a > b
5. If m is any integer, then GCD(a,b) = GCD(a+mb,b)

### The Euclidean Algorithm

The most efficient way to compute the GCD of two numbers is using the Euclidean algorithm.

**Algorithm:**
1. Let a and b be the two numbers
2. Divide a by b to get quotient q and remainder r
3. If r = 0, b is the GCD
4. Otherwise, set a = b and b = r, and repeat from step 2

#### Example:
Find GCD(48,18)
```
48 = 2 × 18 + 12
18 = 1 × 12 + 6
12 = 2 × 6 + 0
Therefore, GCD(48,18) = 6
```

### Extended Euclidean Algorithm

The Extended Euclidean Algorithm finds integers x and y such that:

ax + by = GCD(a,b)

This is particularly important in cryptography for finding multiplicative inverses in modular arithmetic.

#### Example:
Find x and y such that 48x + 18y = GCD(48,18)
```
48 = 2 × 18 + 12
18 = 1 × 12 + 6
12 = 2 × 6 + 0

Working backwards:
6 = 18 - 1(12)
6 = 18 - 1(48 - 2(18))
6 = 3(18) - 1(48)

Therefore, x = -1 and y = 3
```

## Least Common Multiple (LCM)

### Definition

The Least Common Multiple of two integers a and b is the smallest positive integer that is divisible by both a and b.

Notation: LCM(a,b) or [a,b]

### Properties of LCM

1. LCM(a,b) = |a × b| ÷ GCD(a,b)
2. LCM(a,b) = LCM(|a|,|b|)
3. LCM(a,b) = LCM(b,a)
4. For any integers a and b, GCD(a,b) × LCM(a,b) = |a × b|

### Computing LCM

The most efficient way to compute LCM is:
1. First find GCD using the Euclidean algorithm
2. Then use the formula: LCM(a,b) = |a × b| ÷ GCD(a,b)

#### Example:
Find LCM(48,18)
```
We found earlier that GCD(48,18) = 6
LCM(48,18) = |48 × 18| ÷ 6
           = 864 ÷ 6
           = 144
```

## Applications in Cryptography

### 1. Key Generation
- GCD is used to verify coprimality in RSA key generation
- Extended Euclidean Algorithm is used to find private keys

### 2. Modular Arithmetic
- Finding multiplicative inverses modulo n
- Chinese Remainder Theorem applications

### 3. RSA Cryptosystem
- Checking if chosen values are suitable for keys
- Computing Euler's totient function φ(n)

## Practice Problems

1. Find GCD(56,42) using the Euclidean algorithm
2. Find x and y such that 56x + 42y = GCD(56,42)
3. Calculate LCM(56,42)
4. Show that GCD(56,42) × LCM(56,42) = 56 × 42

### Solutions:

1. GCD(56,42):
   ```
   56 = 1 × 42 + 14
   42 = 3 × 14 + 0
   Therefore, GCD(56,42) = 14
   ```

2. Extended Euclidean Algorithm:
   ```
   56 = 1 × 42 + 14
   42 = 3 × 14 + 0
   
   14 = 56 - 1(42)
   Therefore, x = 1 and y = -1
   ```

3. LCM(56,42):
   ```
   LCM = (56 × 42) ÷ GCD(56,42)
       = 2352 ÷ 14
       = 168
   ```

4. Verification:
   ```
   GCD × LCM = 14 × 168 = 2352
   56 × 42 = 2352
   ```

## Next Steps

After mastering GCD and LCM, you should study:
- Modular multiplicative inverses
- Chinese Remainder Theorem
- Euler's totient function
- RSA key generation

These concepts build directly on your understanding of GCD and LCM.

## Common Pitfalls

1. Forgetting that GCD(a,0) = |a|
2. Not considering negative numbers
3. Not verifying coprimality in cryptographic applications
4. Inefficient computation methods for large numbers

Remember that efficient GCD computation is crucial in cryptographic applications where large numbers are involved.
