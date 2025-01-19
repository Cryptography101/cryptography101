# C/C++ Cryptography

## Introduction

C and C++ are powerful languages for implementing cryptographic algorithms due to their low-level memory access, high performance, and direct hardware control. This guide covers essential concepts, implementations, and best practices for cryptographic programming in C/C++.

## Prerequisites

- Solid understanding of C/C++ programming
- Knowledge of memory management and pointer operations
- Basic understanding of cryptographic concepts
- Familiarity with standard libraries

## Standard Libraries and Tools

### OpenSSL
OpenSSL is the most widely used cryptographic library for C/C++. It provides:
- Comprehensive cryptographic functions
- SSL/TLS protocol implementation
- Various utilities for certificate handling

```cpp
#include <openssl/aes.h>
#include <openssl/evp.h>
#include <openssl/err.h>

// Initialize OpenSSL
void init_openssl() {
    OpenSSL_add_all_algorithms();
    ERR_load_crypto_strings();
}

// Clean up OpenSSL
void cleanup_openssl() {
    EVP_cleanup();
    ERR_free_strings();
}
```

### Crypto++
Crypto++ is a free C++ class library of cryptographic algorithms:
```cpp
#include <cryptopp/aes.h>
#include <cryptopp/modes.h>
#include <cryptopp/filters.h>

using namespace CryptoPP;

void aes_example() {
    byte key[AES::DEFAULT_KEYLENGTH];
    byte iv[AES::BLOCKSIZE];
    
    // Generate random key and IV
    AutoSeededRandomPool prng;
    prng.GenerateBlock(key, sizeof(key));
    prng.GenerateBlock(iv, sizeof(iv));
}
```

## Basic Cryptographic Operations

### Random Number Generation

Secure random number generation is crucial for cryptographic operations:

```cpp
#include <random>
#include <cstring>

void generate_random_bytes(unsigned char* buffer, size_t length) {
    std::random_device rd;
    std::mt19937_64 gen(rd());
    std::uniform_int_distribution<unsigned short> dis(0, 255);
    
    for (size_t i = 0; i < length; i++) {
        buffer[i] = static_cast<unsigned char>(dis(gen));
    }
}
```

### Hash Functions

Implementation of basic hash functions using OpenSSL:

```cpp
#include <openssl/sha.h>

std::string calculate_sha256(const std::string& input) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, input.c_str(), input.length());
    SHA256_Final(hash, &sha256);
    
    std::stringstream ss;
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        ss << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(hash[i]);
    }
    return ss.str();
}
```

## Symmetric Encryption

### AES Implementation

Example of AES encryption using OpenSSL:

```cpp
bool aes_encrypt(const unsigned char* plaintext, int plaintext_len,
                 const unsigned char* key, const unsigned char* iv,
                 unsigned char* ciphertext, int* ciphertext_len) {
    EVP_CIPHER_CTX* ctx = EVP_CIPHER_CTX_new();
    if (!ctx) return false;

    if (EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv) != 1) {
        EVP_CIPHER_CTX_free(ctx);
        return false;
    }

    int len;
    if (EVP_EncryptUpdate(ctx, ciphertext, &len, plaintext, plaintext_len) != 1) {
        EVP_CIPHER_CTX_free(ctx);
        return false;
    }
    *ciphertext_len = len;

    if (EVP_EncryptFinal_ex(ctx, ciphertext + len, &len) != 1) {
        EVP_CIPHER_CTX_free(ctx);
        return false;
    }
    *ciphertext_len += len;

    EVP_CIPHER_CTX_free(ctx);
    return true;
}
```

## Memory Security

### Secure Memory Handling

Critical considerations for handling sensitive data:

```cpp
void secure_memory_handling() {
    // Allocate secure memory
    unsigned char* sensitive_data = static_cast<unsigned char*>(
        OPENSSL_malloc(SENSITIVE_DATA_LENGTH));
    
    // Use the memory...
    
    // Securely clean and free
    OPENSSL_cleanse(sensitive_data, SENSITIVE_DATA_LENGTH);
    OPENSSL_free(sensitive_data);
}
```

## Best Practices

1. Memory Management
   - Always use secure memory wiping functions
   - Avoid storing sensitive data in string objects
   - Use smart pointers for automatic cleanup

2. Error Handling
   - Implement comprehensive error checking
   - Use exception handling for cryptographic operations
   - Log errors without exposing sensitive information

```cpp
class SecureString {
private:
    std::vector<char> data;

public:
    ~SecureString() {
        OPENSSL_cleanse(data.data(), data.size());
    }
    
    void assign(const char* str) {
        data.assign(str, str + strlen(str));
    }
};
```

## Common Pitfalls

1. Insufficient Randomness
   - Don't use rand() for cryptographic operations
   - Always use cryptographically secure random number generators

2. Padding Oracle Vulnerabilities
   - Implement proper padding validation
   - Use authenticated encryption modes

```cpp
// BAD - Don't do this
srand(time(NULL));  // Predictable seed
int random_key = rand();  // Not cryptographically secure

// GOOD - Do this instead
std::random_device rd;
std::mt19937_64 gen(rd());
std::uniform_int_distribution<unsigned long long> dis;
unsigned long long random_key = dis(gen);
```

## Security Considerations

### Buffer Overflow Prevention

```cpp
// Secure buffer handling
void secure_copy(char* dest, size_t dest_size, const char* src) {
    if (dest && src && dest_size > 0) {
        strncpy(dest, src, dest_size - 1);
        dest[dest_size - 1] = '\0';
    }
}
```

### Input Validation

```cpp
bool validate_input(const std::vector<unsigned char>& input) {
    // Check input length
    if (input.size() < MIN_INPUT_LENGTH || input.size() > MAX_INPUT_LENGTH) {
        return false;
    }
    
    // Validate input characters
    return std::all_of(input.begin(), input.end(), 
        [](unsigned char c) { return isValidChar(c); });
}
```

## Testing and Verification

```cpp
void test_encryption() {
    // Test vectors
    const unsigned char key[32] = {/* known key */};
    const unsigned char iv[16] = {/* known iv */};
    const unsigned char plaintext[] = "Test Message";
    unsigned char ciphertext[1024];
    int ciphertext_len;
    
    // Perform encryption
    bool success = aes_encrypt(plaintext, strlen((char*)plaintext),
                             key, iv, ciphertext, &ciphertext_len);
    
    // Verify results
    assert(success);
    assert(ciphertext_len > 0);
}
```

## Resources and Further Reading

1. Official Documentation
   - [OpenSSL Documentation](https://www.openssl.org/docs/)
   - [Crypto++ Documentation](https://www.cryptopp.com/docs/)

2. Security Standards
   - NIST Cryptographic Standards
   - FIPS 140-2 Requirements
   - Common Criteria Guidelines

3. Additional Tools
   - Static Analysis Tools
   - Memory Leak Detectors
   - Fuzzing Tools