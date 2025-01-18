# Prime Numbers

## Introduction to Prime Numbers
Prime numbers are natural numbers greater than 1 that have exactly two factors: 1 and themselves. They are crucial in cryptography, particularly in public-key systems.

## Fundamental Concepts

### Definition and Properties
A number p > 1 is prime if its only factors are 1 and p.

Properties:
1. Every number > 1 is either prime or can be factored into primes
2. There are infinitely many primes
3. 2 is the only even prime number

### Prime Factorization
Every positive integer can be uniquely expressed as a product of prime numbers.

Example:
84 = 2² × 3 × 7

## Testing for Primality

### Basic Methods

#### Trial Division
The simplest (but inefficient) method:
```python
def is_prime_simple(n):
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True
```

### Advanced Methods

#### Miller-Rabin Test
A probabilistic primality test used in practice:
```python
def miller_rabin(n, k=5):
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    r, s = 0, n - 1
    while s % 2 == 0:
        r += 1
        s //= 2
    
    for _ in range(k):
        a = random.randrange(2, n - 1)
        x = pow(a, s, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True
```

## Large Prime Numbers

### Generation of Large Primes
Steps to generate large primes:
1. Generate random odd number of desired size
2. Test for primality
3. If not prime, try next odd number
4. Repeat until prime is found

### Safe Primes
A prime p is safe if (p-1)/2 is also prime.
- Important for some cryptographic applications
- Harder to find than regular primes

## Applications in Cryptography

### RSA
- Requires two large prime numbers
- Security depends on difficulty of factoring their product

### Diffie-Hellman
- Requires a large prime modulus
- Often uses safe primes

### ElGamal
- Based on discrete logarithm problem
- Uses large prime numbers for the modulus

## Common Prime Numbers in Cryptography

### Mersenne Primes
Primes of the form 2^n - 1
- M2 = 3
- M3 = 7
- M5 = 31
- M7 = 127

### Other Special Primes
- Sophie Germain primes
- Strong primes
- Twin primes

## Practice Problems

1. Write a program to find the first 10 prime numbers
2. Implement the Sieve of Eratosthenes
3. Test if a given number is a Mersenne prime
4. Generate a 1024-bit prime number

## Further Reading
- Prime Numbers: A Computational Perspective
- The Prime Numbers and Their Distribution
- Algorithmic Number Theory: Efficient Algorithms
