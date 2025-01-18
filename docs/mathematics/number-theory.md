# Number Theory

## Introduction to Number Theory in Cryptography
Number theory is fundamental to modern cryptography. This chapter covers the essential concepts that form the foundation of many cryptographic algorithms.

## Basic Number Theory Concepts

### Natural Numbers and Integers
Natural numbers (ℕ) are the counting numbers {1, 2, 3, ...}. Integers (ℤ) include natural numbers, zero, and negative numbers {..., -2, -1, 0, 1, 2, ...}.

### Divisibility
We say that a number a divides b (written as a|b) if there exists an integer k such that:
b = a × k

Example:
- 3|6 because 6 = 3 × 2
- 4|12 because 12 = 4 × 3

### Factors and Multiples
- A factor of a number divides it without leaving a remainder
- A multiple of a number is the product of that number and an integer

Example:
Factors of 12: 1, 2, 3, 4, 6, 12
Multiples of 3: 3, 6, 9, 12, 15, ...

## Properties of Numbers

### Even and Odd Numbers
- Even numbers: {..., -2, 0, 2, 4, ...}
- Odd numbers: {..., -3, -1, 1, 3, ...}

Properties:
- even ± even = even
- odd ± odd = even
- even × even = even
- odd × odd = odd

### Perfect Numbers
A perfect number equals the sum of its proper divisors.
Example: 6 = 1 + 2 + 3

## Applications in Cryptography

### RSA Algorithm Dependencies
- Prime factorization
- Euler's totient function
- Modular arithmetic

### ElGamal Dependencies
- Discrete logarithm problem
- Group theory
- Prime number properties

## Practice Problems

1. Find all factors of 28
2. Determine if 2^31 - 1 is prime
3. List the first five perfect numbers
4. Find the greatest common divisor of 48 and 36

## Further Reading
- Introduction to Number Theory (Hardy & Wright)
- A Classical Introduction to Modern Number Theory (Ireland & Rosen)
- Number Theory for Computing (Song Y. Yan)