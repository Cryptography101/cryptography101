# Password Hashing Overview

Password hashing is a fundamental security practice that transforms plaintext passwords into fixed-length strings of characters, making it extremely difficult to reverse-engineer the original password. Unlike regular cryptographic hashes, password hashing algorithms are specifically designed to be computationally intensive and memory-hard to resist various forms of attacks.

## Why Password Hashing Matters

Imagine a scenario where a company stores user passwords in plaintext or with simple hashing algorithms like MD5. If their database is breached, attackers would have immediate access to user credentials. Password hashing provides multiple layers of protection:

1. **One-way Transformation**: Even if attackers access the hash, they can't easily reverse it to get the original password
2. **Avalanche Effect**: Small changes in the input create dramatically different hashes
3. **Computational Cost**: Modern algorithms are designed to be slow and resource-intensive, making large-scale attacks impractical

## Core Concepts in Password Hashing

### Work Factors

Work factors determine how computationally intensive the hashing process will be. Higher work factors mean:
- More CPU cycles required per hash
- Increased memory usage
- Longer processing time

While this might seem counterintuitive, the goal is to make the hashing process slow enough to deter attackers but fast enough for legitimate authentication.

### Salt

A salt is a random string added to each password before hashing. Salting provides several critical benefits:
- Prevents rainbow table attacks
- Ensures unique hashes even for identical passwords
- Makes parallel attacks more difficult

### Pepper

A pepper is a server-side secret value added to passwords before hashing. Unlike salts:
- It's the same for all passwords
- It's not stored with the hash
- Adds an extra layer of security if the database is compromised

## Choosing the Right Algorithm

When selecting a password hashing algorithm, consider:

### Security Factors
- Algorithm strength and track record
- Memory hardness
- Resistance to hardware acceleration
- Academic analysis and industry adoption

### Implementation Factors
- Available computing resources
- User experience impact
- Scalability requirements
- Compliance requirements

### Common Mistakes to Avoid
- Using cryptographic hashes (SHA-256, MD5) for password hashing
- Implementing custom hashing algorithms
- Using insufficient work factors
- Not implementing proper key stretching

## Modern Password Hashing Algorithms

Here's a quick comparison of modern password hashing algorithms:

| Algorithm | Key Features | Best Use Case |
|-----------|-------------|---------------|
| PBKDF2 | NIST approved, highly configurable | Legacy systems, FIPS compliance |
| bcrypt | Built-in salt, fixed memory cost | General-purpose password hashing |
| scrypt | Memory-hard, CPU and RAM intensive | High-security systems |
| Argon2 | Password hashing competition winner | Modern applications, best overall choice |

## Implementation Best Practices

1. **Always Use Library Functions**
   ```python
   # Good: Using established library
   from passlib.hash import argon2
   hash = argon2.hash("user_password")
   
   # Bad: Rolling your own
   import hashlib
   hash = hashlib.sha256(password.encode()).hexdigest()
   ```

2. **Configure Work Factors Appropriately**
   ```python
   # Adjust time_cost based on your server's capabilities
   from argon2 import PasswordHasher
   ph = PasswordHasher(
       time_cost=3,
       memory_cost=65536,
       parallelism=4
   )
   ```

3. **Handle Errors Gracefully**
   ```python
   try:
       is_valid = ph.verify(hash, password)
   except Exception as e:
       # Log error, but don't expose details to user
       return False
   ```

## Upgrade Strategy

As computing power increases, you'll need to periodically upgrade your hashing strategy:

1. When a user logs in successfully:
   - Check if their password hash uses the current algorithm and parameters
   - If not, rehash their password with the new configuration
   - Update the stored hash

```python
def verify_and_upgrade(stored_hash, password, old_params, new_params):
    if verify_password(stored_hash, password, old_params):
        if needs_rehash(stored_hash, new_params):
            new_hash = hash_password(password, new_params)
            update_stored_hash(user_id, new_hash)
        return True
    return False
```

## Security Monitoring

Monitor your password hashing system for:
- Unusual patterns in hash computation timing
- Failed authentication attempts
- Resource usage spikes
- Database performance impacts

## Future Considerations

Stay informed about:
- Quantum computing developments
- New attack vectors
- Industry standard changes
- Regulatory requirements

Remember: Password hashing is just one part of a comprehensive security strategy. Combine it with:
- Multi-factor authentication
- Rate limiting
- Account lockout policies
- Regular security audits

## Additional Resources

For deeper understanding:
- [OWASP Password Storage Cheat Sheet](https://owasp.org/)
- [NIST Digital Identity Guidelines](https://pages.nist.gov/)
- [Password Hashing Competition](https://password-hashing.net/)