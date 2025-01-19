# Number Theory in Cryptography

Number theory forms the mathematical foundation of modern cryptography. This guide will introduce you to the essential concepts of number theory that are crucial for understanding cryptographic systems.

## Introduction

Number theory is the study of integers and their properties. In cryptography, we particularly focus on properties that help us create secure systems and protocols. The main concepts we'll cover include:

- Divisibility and prime numbers
- Modular arithmetic
- Greatest Common Divisors (GCD)
- Multiplicative inverses
- The Fundamental Theorem of Arithmetic

## Basic Definitions and Properties

### Divisibility

We say that an integer a divides an integer b (written as a|b) if there exists some integer k such that:

b = a × k

For example:
- 3|12 because 12 = 3 × 4
- 7|0 because 0 = 7 × 0
- 4∤14 because there is no integer k where 14 = 4 × k

### Properties of Division

1. If a|b and b|c, then a|c (transitivity)
2. If a|b and a|c, then a|(bx + cy) for any integers x, y
3. If a|b, then ac|bc for any integer c

## The Division Algorithm

For any integers a and b (b > 0), there exist unique integers q (quotient) and r (remainder) such that:

a = bq + r, where 0 ≤ r < b

This is fundamental to understanding modular arithmetic, which is crucial in cryptography.

### Example:
When dividing 17 by 5:
- 17 = 5 × 3 + 2
- Here, q = 3 and r = 2

## Prime Numbers

A prime number is a natural number greater than 1 that has exactly two factors: 1 and itself.

### Properties of Prime Numbers

1. There are infinitely many prime numbers
2. Every integer greater than 1 can be uniquely factored into prime numbers
3. The first few prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29

### The Fundamental Theorem of Arithmetic

Every positive integer greater than 1 can be represented uniquely as a product of prime powers:

n = p₁ᵃ¹ × p₂ᵃ² × ... × pₖᵃᵏ

where p₁, p₂, ..., pₖ are distinct primes and a₁, a₂, ..., aₖ are positive integers.

### Example:
84 = 2² × 3 × 7

## Applications in Cryptography

Number theory concepts are used extensively in cryptography:

1. **Prime Factorization**
   - RSA encryption relies on the difficulty of factoring large composite numbers
   - The security of many cryptographic systems depends on the computational hardness of prime factorization

2. **Modular Arithmetic**
   - Used in most public-key cryptography systems
   - Forms the basis for operations in finite fields

3. **Greatest Common Divisor**
   - Used in key generation algorithms
   - Essential for finding multiplicative inverses in modular arithmetic

## Practice Problems

1. Find all divisors of 48
2. Express 120 as a product of prime powers
3. Find the GCD of 56 and 48 using the Euclidean algorithm
4. Is there a multiplicative inverse of 15 modulo 28?

### Solutions:

1. Divisors of 48: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48

2. 120 = 2³ × 3 × 5

3. GCD(56, 48):
   ```
   56 = 1 × 48 + 8
   48 = 6 × 8 + 0
   Therefore, GCD(56, 48) = 8
   ```

4. Since GCD(15, 28) = 1, 15 has a multiplicative inverse modulo 28.
   The inverse is 17 because 15 × 17 ≡ 1 (mod 28)

## Next Steps

After mastering these fundamental concepts, you'll be ready to move on to:
- Modular arithmetic
- Group theory
- Fields and finite fields
- Advanced number theoretic algorithms

These topics form the foundation for understanding modern cryptographic systems like RSA, Diffie-Hellman, and elliptic curve cryptography.

## Resources for Further Study

1. A Course in Number Theory and Cryptography by Neal Koblitz
2. An Introduction to Mathematical Cryptography by Hoffstein, Pipher, and Silverman
3. Elementary Number Theory by David M. Burton

Remember that mastery of number theory comes with practice. Work through the practice problems and try to prove the theoretical results yourself.