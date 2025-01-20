# Basic Cryptography Terms and Concepts

## Core Concepts

### Cryptography
The science and practice of securing communication and information through encoding messages or information in such a way that only authorized parties can access it.

### Encryption
The process of converting plaintext (readable data) into ciphertext (scrambled data) using an algorithm and key.
- Example: Converting "HELLO" to "KHOOR" using a simple shift cipher

### Decryption
The reverse process of encryption, converting ciphertext back into plaintext using the appropriate key.
- Example: Converting "KHOOR" back to "HELLO"

### Cipher
An algorithm for performing encryption or decryption.
- Classical ciphers: Caesar, Vigenère, Substitution
- Modern ciphers: AES, RSA, ChaCha20

### Key
A piece of information (usually a string of bits or a number) that determines the output of a cryptographic algorithm.
- Symmetric key: Same key for encryption and decryption
- Public/private key pairs: Different keys for encryption and decryption

## Types of Cryptography

### Symmetric Cryptography
Uses the same key for both encryption and decryption.
- Advantages: Fast, efficient
- Disadvantages: Key distribution challenge
- Examples: AES, DES, ChaCha20

### Asymmetric Cryptography
Uses different keys for encryption (public key) and decryption (private key).
- Advantages: Secure key exchange, digital signatures
- Disadvantages: Slower than symmetric
- Examples: RSA, ECC, DSA

### Hash Functions
One-way functions that generate a fixed-size output from variable-size input.
- Properties: Deterministic, preimage resistance
- Uses: Password storage, data integrity
- Examples: SHA-256, SHA-3, BLAKE2

## Basic Terms

### Plaintext
The original, readable message before encryption.
- Also called: Cleartext
- Example: "Meet me at noon"

### Ciphertext
The encrypted, scrambled version of the plaintext.
- Result of encryption process
- Should appear random
- Example: "Zrrg zr ng abba"

### Protocol
A defined set of rules and procedures for cryptographic operations.
- Example: TLS, SSH, Signal Protocol

### Nonce
A number used only once in cryptographic operations.
- Purpose: Prevent replay attacks
- Also called: Initialization Vector (IV)
- Should be unique for each encryption

### Salt
Random data added to input before hashing.
- Used in password hashing
- Prevents rainbow table attacks
- Unique per password

## Security Concepts

### Authentication
Verifying the identity of a user or system.
- Methods: Passwords, certificates, biometrics
- Protocols: OAuth, SAML
- Multi-factor authentication (MFA)

### Authorization
Determining what actions an authenticated user can perform.
- Access control lists (ACL)
- Role-based access control (RBAC)
- Principle of least privilege

### Integrity
Ensuring data hasn't been modified.
- Message Authentication Codes (MAC)
- Digital signatures
- Hash functions

### Non-repudiation
Preventing denial of having performed an action.
- Digital signatures
- Audit logs
- Timestamps

## Attack Types

### Brute Force Attack
Trying every possible key or password.
- Countermeasure: Long keys
- Example: Trying all possible AES keys

### Man-in-the-Middle (MITM)
Intercepting communication between two parties.
- Attack vector: Unsecured networks
- Prevention: Authentication, encryption
- Example: Fake Wi-Fi hotspots

### Dictionary Attack
Using a list of likely passwords.
- Target: Password systems
- Prevention: Strong passwords, salting
- Example: Common password lists

## Cryptographic Primitives

### Random Number Generator (RNG)
Generates random numbers for cryptographic use.
- Types: True Random, Pseudorandom
- Uses: Key generation, nonces
- Example: /dev/urandom

### Key Derivation Function (KDF)
Derives one or more keys from a master key.
- Uses: Password hashing
- Examples: PBKDF2, Argon2
- Properties: Slow, memory-hard

### Message Authentication Code (MAC)
Provides message integrity and authentication.
- Types: HMAC, CMAC
- Uses: Verify message integrity
- Example: HMAC-SHA256

## Standards and Protocols

### Transport Layer Security (TLS)
Secures internet communications.
- Previously: SSL
- Uses: HTTPS, secure email
- Components: Handshake, record protocol

### Digital Certificates
Electronic documents to prove identity.
- Format: X.509
- Contains: Public key, identity info
- Issued by: Certificate Authorities (CA)

### Zero-Knowledge Proof
Proves knowledge without revealing it.
- Properties: Completeness, soundness
- Uses: Authentication, privacy
- Example: Password verification

## Best Practices

### Key Management
- Regular key rotation
- Secure key storage
- Key backup procedures
- Access control

### Password Security
- Minimum length requirements
- Complexity rules
- Regular changes
- Secure storage (hashing)

### Algorithm Selection
- Use standard algorithms
- Avoid outdated ciphers
- Follow security recommendations
- Regular updates

## Common Tools

### OpenSSL
- Certificate management
- Encryption/decryption
- Key generation
- Command-line interface

### GPG (GNU Privacy Guard)
- Email encryption
- File encryption
- Digital signatures
- Key management

### Password Managers
- Secure password storage
- Password generation
- Encrypted vaults
- Cross-platform sync

## Resources for Learning

### Documentation
- RFCs (Request for Comments)
- NIST publications
- Academic papers
- Vendor documentation

### Practice Platforms
- Cryptopals challenges
- CTF competitions
- Online coding platforms
- Security labs

### Communities
- Security forums
- Academic groups
- Professional organizations
- Online communities