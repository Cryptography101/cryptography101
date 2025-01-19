# Rust Cryptography

## Introduction

Rust's strong type system, memory safety guarantees, and zero-cost abstractions make it an excellent choice for cryptographic implementations. This guide covers how to implement secure cryptographic operations in Rust using popular libraries and best practices.

## Core Libraries

### RustCrypto

[RustCrypto](https://github.com/RustCrypto) is a collection of cryptographic algorithms written in pure Rust. It provides modular and efficient implementations of various cryptographic primitives.

Key components include:
- `crypto-traits`: Generic interfaces for cryptographic algorithms
- `hashes`: Various hash functions (SHA2, SHA3, Blake2, etc.)
- `block-ciphers`: Block cipher implementations
- `stream-ciphers`: Stream cipher implementations
- `signatures`: Digital signature algorithms
- `elliptic-curves`: Elliptic curve implementations

### ring

The `ring` crate provides a safe, high-level interface to common cryptographic operations. It's based on BoringSSL and focuses on modern cryptographic primitives.

```rust
use ring::{digest, rand};

fn generate_hash() {
    let message = b"Hello, Cryptography!";
    let digest = digest::digest(&digest::SHA256, message);
    println!("SHA-256 digest: {:?}", digest);
}
```

## Common Cryptographic Operations

### Symmetric Encryption

Using AES-GCM from RustCrypto:

```rust
use aes_gcm::{
    aead::{Aead, KeyInit, OsRng},
    Aes256Gcm, Nonce
};

fn encrypt_data(plaintext: &[u8], key: &[u8; 32]) -> Result<Vec<u8>, Error> {
    let cipher = Aes256Gcm::new_from_slice(key)?;
    let nonce = Nonce::from_slice(b"unique nonce"); // Use proper nonce generation in production
    
    cipher.encrypt(nonce, plaintext)
}
```

### Hashing

Using the SHA-256 implementation from RustCrypto:

```rust
use sha2::{Sha256, Digest};

fn calculate_hash(data: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(data);
    hasher.finalize().into()
}
```

### Digital Signatures

Using Ed25519 from `ring`:

```rust
use ring::{
    signature::{self, KeyPair},
    rand::SystemRandom,
};

fn generate_and_sign() -> Result<(), Error> {
    let rng = SystemRandom::new();
    let pkcs8_bytes = signature::Ed25519KeyPair::generate_pkcs8(&rng)?;
    let key_pair = signature::Ed25519KeyPair::from_pkcs8(pkcs8_bytes.as_ref())?;
    
    let msg = b"Message to sign";
    let signature = key_pair.sign(msg);
    
    Ok(())
}
```

## Best Practices

### 1. Secure Random Number Generation

Always use cryptographically secure random number generators:

```rust
use rand::{rngs::OsRng, RngCore};

fn generate_random_bytes(length: usize) -> Vec<u8> {
    let mut bytes = vec![0u8; length];
    OsRng.fill_bytes(&mut bytes);
    bytes
}
```

### 2. Constant-Time Operations

Use constant-time comparison for sensitive data:

```rust
use subtle::ConstantTimeEq;

fn constant_time_compare(a: &[u8], b: &[u8]) -> bool {
    if a.len() != b.len() {
        return false;
    }
    a.ct_eq(b).into()
}
```

### 3. Memory Safety

Utilize Rust's `zeroize` trait for secure memory cleanup:

```rust
use zeroize::Zeroize;

#[derive(Zeroize)]
#[zeroize(drop)]
struct SensitiveData {
    key: Vec<u8>,
    password: String,
}
```

## Error Handling

Implement proper error handling for cryptographic operations:

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum CryptoError {
    #[error("encryption failed")]
    EncryptionError(#[from] aes_gcm::Error),
    #[error("invalid key length")]
    InvalidKeyLength,
    #[error("verification failed")]
    VerificationError,
}
```

## Testing Cryptographic Code

Example of testing encryption/decryption:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encryption_decryption() {
        let key = generate_random_bytes(32);
        let plaintext = b"Test message";
        
        let ciphertext = encrypt_data(plaintext, &key).unwrap();
        let decrypted = decrypt_data(&ciphertext, &key).unwrap();
        
        assert_eq!(plaintext, &decrypted[..]);
    }
}
```

## Security Considerations

1. **Key Management**
   - Never hardcode encryption keys
   - Use proper key derivation functions (KDF) for password-based keys
   - Implement secure key rotation mechanisms

2. **Nonce/IV Management**
   - Never reuse nonces with the same key
   - Use cryptographically secure random nonces
   - Implement proper nonce management systems

3. **Error Handling**
   - Don't expose sensitive information in error messages
   - Implement proper cleanup in error cases
   - Use constant-time operations for comparisons

## Resources and Further Reading

- [RustCrypto Documentation](https://github.com/RustCrypto)
- [ring Documentation](https://briansmith.org/rustdoc/ring/)
- [Rust Crypto Guide](https://github.com/rust-secure-code/rust-crypto-guide)
- [The Rust Programming Language Security Policy](https://www.rust-lang.org/policies/security)

## Community and Support

Join the Rust cryptography community:
- [Rust Crypto Discord](https://discord.gg/rust-lang)
- [Rust Security Working Group](https://github.com/rust-secure-code/wg)
- [RustCrypto GitHub Organization](https://github.com/RustCrypto)# Rust Cryptography

## Introduction

Rust's strong type system, memory safety guarantees, and zero-cost abstractions make it an excellent choice for cryptographic implementations. This guide covers how to implement secure cryptographic operations in Rust using popular libraries and best practices.

## Core Libraries

### RustCrypto

[RustCrypto](https://github.com/RustCrypto) is a collection of cryptographic algorithms written in pure Rust. It provides modular and efficient implementations of various cryptographic primitives.

Key components include:
- `crypto-traits`: Generic interfaces for cryptographic algorithms
- `hashes`: Various hash functions (SHA2, SHA3, Blake2, etc.)
- `block-ciphers`: Block cipher implementations
- `stream-ciphers`: Stream cipher implementations
- `signatures`: Digital signature algorithms
- `elliptic-curves`: Elliptic curve implementations

### ring

The `ring` crate provides a safe, high-level interface to common cryptographic operations. It's based on BoringSSL and focuses on modern cryptographic primitives.

```rust
use ring::{digest, rand};

fn generate_hash() {
    let message = b"Hello, Cryptography!";
    let digest = digest::digest(&digest::SHA256, message);
    println!("SHA-256 digest: {:?}", digest);
}
```

## Common Cryptographic Operations

### Symmetric Encryption

Using AES-GCM from RustCrypto:

```rust
use aes_gcm::{
    aead::{Aead, KeyInit, OsRng},
    Aes256Gcm, Nonce
};

fn encrypt_data(plaintext: &[u8], key: &[u8; 32]) -> Result<Vec<u8>, Error> {
    let cipher = Aes256Gcm::new_from_slice(key)?;
    let nonce = Nonce::from_slice(b"unique nonce"); // Use proper nonce generation in production
    
    cipher.encrypt(nonce, plaintext)
}
```

### Hashing

Using the SHA-256 implementation from RustCrypto:

```rust
use sha2::{Sha256, Digest};

fn calculate_hash(data: &[u8]) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(data);
    hasher.finalize().into()
}
```

### Digital Signatures

Using Ed25519 from `ring`:

```rust
use ring::{
    signature::{self, KeyPair},
    rand::SystemRandom,
};

fn generate_and_sign() -> Result<(), Error> {
    let rng = SystemRandom::new();
    let pkcs8_bytes = signature::Ed25519KeyPair::generate_pkcs8(&rng)?;
    let key_pair = signature::Ed25519KeyPair::from_pkcs8(pkcs8_bytes.as_ref())?;
    
    let msg = b"Message to sign";
    let signature = key_pair.sign(msg);
    
    Ok(())
}
```

## Best Practices

### 1. Secure Random Number Generation

Always use cryptographically secure random number generators:

```rust
use rand::{rngs::OsRng, RngCore};

fn generate_random_bytes(length: usize) -> Vec<u8> {
    let mut bytes = vec![0u8; length];
    OsRng.fill_bytes(&mut bytes);
    bytes
}
```

### 2. Constant-Time Operations

Use constant-time comparison for sensitive data:

```rust
use subtle::ConstantTimeEq;

fn constant_time_compare(a: &[u8], b: &[u8]) -> bool {
    if a.len() != b.len() {
        return false;
    }
    a.ct_eq(b).into()
}
```

### 3. Memory Safety

Utilize Rust's `zeroize` trait for secure memory cleanup:

```rust
use zeroize::Zeroize;

#[derive(Zeroize)]
#[zeroize(drop)]
struct SensitiveData {
    key: Vec<u8>,
    password: String,
}
```

## Error Handling

Implement proper error handling for cryptographic operations:

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum CryptoError {
    #[error("encryption failed")]
    EncryptionError(#[from] aes_gcm::Error),
    #[error("invalid key length")]
    InvalidKeyLength,
    #[error("verification failed")]
    VerificationError,
}
```

## Testing Cryptographic Code

Example of testing encryption/decryption:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_encryption_decryption() {
        let key = generate_random_bytes(32);
        let plaintext = b"Test message";
        
        let ciphertext = encrypt_data(plaintext, &key).unwrap();
        let decrypted = decrypt_data(&ciphertext, &key).unwrap();
        
        assert_eq!(plaintext, &decrypted[..]);
    }
}
```

## Security Considerations

1. **Key Management**
   - Never hardcode encryption keys
   - Use proper key derivation functions (KDF) for password-based keys
   - Implement secure key rotation mechanisms

2. **Nonce/IV Management**
   - Never reuse nonces with the same key
   - Use cryptographically secure random nonces
   - Implement proper nonce management systems

3. **Error Handling**
   - Don't expose sensitive information in error messages
   - Implement proper cleanup in error cases
   - Use constant-time operations for comparisons

## Resources and Further Reading

- [RustCrypto Documentation](https://github.com/RustCrypto)
- [ring Documentation](https://briansmith.org/rustdoc/ring/)
- [Rust Crypto Guide](https://github.com/rust-secure-code/rust-crypto-guide)
- [The Rust Programming Language Security Policy](https://www.rust-lang.org/policies/security)

## Community and Support

Join the Rust cryptography community:
- [Rust Crypto Discord](https://discord.gg/rust-lang)
- [Rust Security Working Group](https://github.com/rust-secure-code/wg)
- [RustCrypto GitHub Organization](https://github.com/RustCrypto)