# Go Cryptography

## Introduction

Go (Golang) provides robust cryptographic support through its standard library `crypto` and related packages. This guide covers essential concepts, implementations, and best practices for cryptographic programming in Go.

## Standard Library Packages

Go's crypto packages provide comprehensive cryptographic functionality:

```go
import (
    "crypto/aes"
    "crypto/cipher"
    "crypto/rand"
    "crypto/rsa"
    "crypto/sha256"
    "crypto/tls"
    "encoding/base64"
)
```

## Generating Random Numbers

Go provides cryptographically secure random number generation:

```go
func generateRandomBytes(n int) ([]byte, error) {
    b := make([]byte, n)
    _, err := rand.Read(b)
    if err != nil {
        return nil, err
    }
    return b, nil
}

// Generate a random key
func generateKey(keySize int) ([]byte, error) {
    key, err := generateRandomBytes(keySize)
    if err != nil {
        return nil, fmt.Errorf("failed to generate key: %v", err)
    }
    return key, nil
}
```

## Symmetric Encryption

### AES Implementation

Example of AES-GCM encryption and decryption:

```go
// Encrypt data using AES-GCM
func encrypt(plaintext []byte, key []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil {
        return nil, err
    }

    nonce := make([]byte, 12)
    if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
        return nil, err
    }

    aesgcm, err := cipher.NewGCM(block)
    if err != nil {
        return nil, err
    }

    ciphertext := aesgcm.Seal(nonce, nonce, plaintext, nil)
    return ciphertext, nil
}

// Decrypt data using AES-GCM
func decrypt(ciphertext []byte, key []byte) ([]byte, error) {
    block, err := aes.NewCipher(key)
    if err != nil {
        return nil, err
    }

    aesgcm, err := cipher.NewGCM(block)
    if err != nil {
        return nil, err
    }

    nonceSize := aesgcm.NonceSize()
    if len(ciphertext) < nonceSize {
        return nil, errors.New("ciphertext too short")
    }

    nonce, ciphertext := ciphertext[:nonceSize], ciphertext[nonceSize:]
    plaintext, err := aesgcm.Open(nil, nonce, ciphertext, nil)
    if err != nil {
        return nil, err
    }

    return plaintext, nil
}
```

## Hash Functions

Implementation of various hash functions:

```go
// Calculate SHA-256 hash
func calculateSHA256(data []byte) []byte {
    hash := sha256.Sum256(data)
    return hash[:]
}

// Create HMAC
func createHMAC(key, data []byte) []byte {
    h := hmac.New(sha256.New, key)
    h.Write(data)
    return h.Sum(nil)
}
```

## Public Key Cryptography

### RSA Implementation

```go
// Generate RSA key pair
func generateRSAKeyPair(bits int) (*rsa.PrivateKey, *rsa.PublicKey, error) {
    privateKey, err := rsa.GenerateKey(rand.Reader, bits)
    if err != nil {
        return nil, nil, err
    }
    
    publicKey := &privateKey.PublicKey
    return privateKey, publicKey, nil
}

// RSA encryption
func rsaEncrypt(publicKey *rsa.PublicKey, plaintext []byte) ([]byte, error) {
    ciphertext, err := rsa.EncryptOAEP(
        sha256.New(),
        rand.Reader,
        publicKey,
        plaintext,
        nil,
    )
    if err != nil {
        return nil, err
    }
    return ciphertext, nil
}

// RSA decryption
func rsaDecrypt(privateKey *rsa.PrivateKey, ciphertext []byte) ([]byte, error) {
    plaintext, err := rsa.DecryptOAEP(
        sha256.New(),
        rand.Reader,
        privateKey,
        ciphertext,
        nil,
    )
    if err != nil {
        return nil, err
    }
    return plaintext, nil
}
```

## Digital Signatures

```go
// Sign data using RSA
func signData(privateKey *rsa.PrivateKey, data []byte) ([]byte, error) {
    hashed := sha256.Sum256(data)
    signature, err := rsa.SignPSS(
        rand.Reader,
        privateKey,
        crypto.SHA256,
        hashed[:],
        nil,
    )
    if err != nil {
        return nil, err
    }
    return signature, nil
}

// Verify signature
func verifySignature(publicKey *rsa.PublicKey, data, signature []byte) error {
    hashed := sha256.Sum256(data)
    return rsa.VerifyPSS(
        publicKey,
        crypto.SHA256,
        hashed[:],
        signature,
        nil,
    )
}
```

## TLS/SSL Implementation

```go
// Create TLS configuration
func createTLSConfig() *tls.Config {
    return &tls.Config{
        MinVersion:               tls.VersionTLS12,
        CurvePreferences:        []tls.CurveID{tls.X25519, tls.CurveP256},
        PreferServerCipherSuites: true,
        CipherSuites: []uint16{
            tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
            tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
            tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305,
            tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,
        },
    }
}
```

## Best Practices

### Secure Key Management

```go
type KeyManager struct {
    keys map[string][]byte
    mu   sync.RWMutex
}

func NewKeyManager() *KeyManager {
    return &KeyManager{
        keys: make(map[string][]byte),
    }
}

func (km *KeyManager) StoreKey(id string, key []byte) {
    km.mu.Lock()
    defer km.mu.Unlock()
    
    // Create a copy of the key to store
    keyCopy := make([]byte, len(key))
    copy(keyCopy, key)
    km.keys[id] = keyCopy
}

func (km *KeyManager) GetKey(id string) ([]byte, error) {
    km.mu.RLock()
    defer km.mu.RUnlock()
    
    key, exists := km.keys[id]
    if !exists {
        return nil, errors.New("key not found")
    }
    
    // Return a copy of the key
    keyCopy := make([]byte, len(key))
    copy(keyCopy, key)
    return keyCopy, nil
}
```

### Error Handling

```go
func secureOperation() error {
    // Always use specific error types
    if err := validateInput(); err != nil {
        return fmt.Errorf("input validation failed: %w", err)
    }
    
    // Don't expose sensitive information in errors
    if err := processSecretData(); err != nil {
        return errors.New("processing failed")
    }
    
    return nil
}
```

## Security Considerations

1. Use Constant-Time Comparisons
```go
func compareHashes(hash1, hash2 []byte) bool {
    return subtle.ConstantTimeCompare(hash1, hash2) == 1
}
```

2. Secure Memory Handling
```go
func secureMemoryHandling(sensitiveData []byte) {
    defer func() {
        // Clear sensitive data from memory
        for i := range sensitiveData {
            sensitiveData[i] = 0
        }
    }()
    
    // Process sensitive data...
}
```

## Testing

```go
func TestEncryption(t *testing.T) {
    // Generate a test key
    key, err := generateKey(32)
    if err != nil {
        t.Fatalf("Failed to generate key: %v", err)
    }

    // Test data
    plaintext := []byte("secret message")

    // Encrypt
    ciphertext, err := encrypt(plaintext, key)
    if err != nil {
        t.Fatalf("Encryption failed: %v", err)
    }

    // Decrypt
    decrypted, err := decrypt(ciphertext, key)
    if err != nil {
        t.Fatalf("Decryption failed: %v", err)
    }

    // Verify
    if !bytes.Equal(plaintext, decrypted) {
        t.Error("Decrypted data doesn't match original plaintext")
    }
}
```

## Additional Resources

1. Official Documentation
   - [Go Cryptography Packages](https://golang.org/pkg/crypto/)
   - [Go Security Best Practices](https://golang.org/security)

2. Security Standards
   - NIST Cryptographic Standards
   - OWASP Go Security Guidelines
   - Common Cryptographic Protocols

3. Tools and Libraries
   - go-crypto
   - golang.org/x/crypto
   - Various security analysis tools