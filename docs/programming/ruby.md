# Ruby for Cryptography

## Introduction
Ruby provides several built-in libraries and gems for cryptographic operations. This guide covers essential cryptographic implementations in Ruby, focusing on both built-in features and popular gems.

## Setting Up Ruby for Cryptography

### Required Gems
```ruby
# Add to your Gemfile
source 'https://rubygems.org'

gem 'openssl'      # Built-in, but explicitly required
gem 'rbnacl'       # For modern cryptography
gem 'bcrypt'       # For password hashing
gem 'digest'       # Built-in for hashing functions
```

Installation:
```bash
# Install gems
gem install openssl
gem install rbnacl
gem install bcrypt
```

## Basic Cryptographic Operations

### Hashing
```ruby
require 'digest'

class Hasher
  def self.sha256(data)
    Digest::SHA256.hexdigest(data)
  end

  def self.sha512(data)
    Digest::SHA512.hexdigest(data)
  end

  def self.md5(data)
    Digest::MD5.hexdigest(data)
  end
end

# Usage
hash = Hasher.sha256("secret message")
puts hash
```

### Password Hashing with BCrypt
```ruby
require 'bcrypt'

class PasswordManager
  def self.hash_password(password)
    BCrypt::Password.create(password)
  end

  def self.verify_password(password, hash)
    BCrypt::Password.new(hash) == password
  end
end

# Usage
password = "my_secure_password"
hashed = PasswordManager.hash_password(password)
is_valid = PasswordManager.verify_password(password, hashed)
```

## Symmetric Encryption

### AES Encryption using OpenSSL
```ruby
require 'openssl'
require 'base64'

class AESCipher
  def self.encrypt(data, key)
    cipher = OpenSSL::Cipher.new('AES-256-CBC')
    cipher.encrypt
    cipher.key = Digest::SHA256.digest(key)
    iv = cipher.random_iv
    encrypted = cipher.update(data) + cipher.final
    
    {
      encrypted_data: Base64.strict_encode64(encrypted),
      iv: Base64.strict_encode64(iv)
    }
  end

  def self.decrypt(encrypted_data, iv, key)
    cipher = OpenSSL::Cipher.new('AES-256-CBC')
    cipher.decrypt
    cipher.key = Digest::SHA256.digest(key)
    cipher.iv = Base64.strict_decode64(iv)
    
    decrypted = cipher.update(Base64.strict_decode64(encrypted_data))
    decrypted + cipher.final
  end
end

# Usage
message = "Secret message"
key = "your_secret_key"

# Encrypt
result = AESCipher.encrypt(message, key)

# Decrypt
decrypted = AESCipher.decrypt(result[:encrypted_data], result[:iv], key)
```

### RbNaCl (Modern Cryptography)
```ruby
require 'rbnacl'

class ModernCrypto
  def self.generate_key
    RbNaCl::Random.random_bytes(RbNaCl::SecretBox.key_bytes)
  end

  def self.encrypt(message, key)
    box = RbNaCl::SecretBox.new(key)
    nonce = RbNaCl::Random.random_bytes(box.nonce_bytes)
    
    encrypted = box.encrypt(nonce, message)
    {
      ciphertext: Base64.strict_encode64(encrypted),
      nonce: Base64.strict_encode64(nonce)
    }
  end

  def self.decrypt(encrypted_data, nonce, key)
    box = RbNaCl::SecretBox.new(key)
    box.decrypt(
      Base64.strict_decode64(nonce),
      Base64.strict_decode64(encrypted_data)
    )
  end
end
```

## Asymmetric Encryption

### RSA Implementation
```ruby
require 'openssl'

class RSACrypto
  def self.generate_key_pair(bits = 2048)
    key = OpenSSL::PKey::RSA.new(bits)
    {
      private_key: key.to_pem,
      public_key: key.public_key.to_pem
    }
  end

  def self.encrypt(message, public_key)
    key = OpenSSL::PKey::RSA.new(public_key)
    Base64.strict_encode64(key.public_encrypt(message))
  end

  def self.decrypt(encrypted_message, private_key)
    key = OpenSSL::PKey::RSA.new(private_key)
    key.private_decrypt(Base64.strict_decode64(encrypted_message))
  end
end

# Usage
keys = RSACrypto.generate_key_pair
encrypted = RSACrypto.encrypt("Secret message", keys[:public_key])
decrypted = RSACrypto.decrypt(encrypted, keys[:private_key])
```

## Digital Signatures

### Creating and Verifying Signatures
```ruby
require 'openssl'

class DigitalSignature
  def self.sign(data, private_key)
    key = OpenSSL::PKey::RSA.new(private_key)
    signature = key.sign(OpenSSL::Digest::SHA256.new, data)
    Base64.strict_encode64(signature)
  end

  def self.verify(data, signature, public_key)
    key = OpenSSL::PKey::RSA.new(public_key)
    key.verify(
      OpenSSL::Digest::SHA256.new,
      Base64.strict_decode64(signature),
      data
    )
  end
end
```

## Random Number Generation

### Secure Random Numbers
```ruby
require 'securerandom'

class RandomGenerator
  def self.random_bytes(length)
    SecureRandom.random_bytes(length)
  end

  def self.random_hex(length)
    SecureRandom.hex(length)
  end

  def self.random_base64(length)
    SecureRandom.base64(length)
  end
end
```

## CTF Helpers

### Simple XOR Implementation
```ruby
class XORCipher
  def self.encrypt(message, key)
    message.bytes.zip(key.bytes.cycle).map { |m, k| m ^ k }.pack('C*')
  end

  def self.decrypt(ciphertext, key)
    encrypt(ciphertext, key) # XOR is its own inverse
  end
end
```

### Base Encoding/Decoding
```ruby
require 'base64'

class BaseEncoder
  def self.to_base64(data)
    Base64.strict_encode64(data)
  end

  def self.from_base64(data)
    Base64.strict_decode64(data)
  end

  def self.to_hex(data)
    data.unpack('H*').first
  end

  def self.from_hex(data)
    [data].pack('H*')
  end
end
```

## Best Practices

### Key Management
```ruby
class KeyManager
  def self.save_key(key, filename)
    File.write(filename, key)
  end

  def self.load_key(filename)
    File.read(filename)
  end

  def self.generate_key(length = 32)
    SecureRandom.random_bytes(length)
  end
end
```

### Error Handling
```ruby
class CryptoError < StandardError; end

def secure_operation
  # Your crypto operation here
rescue OpenSSL::Cipher::CipherError => e
  raise CryptoError, "Encryption failed: #{e.message}"
rescue OpenSSL::PKey::RSAError => e
  raise CryptoError, "RSA operation failed: #{e.message}"
rescue StandardError => e
  raise CryptoError, "Unexpected error: #{e.message}"
end
```

## Resources and Further Reading
- [Ruby OpenSSL Documentation](https://ruby-doc.org/stdlib-2.7.0/libdoc/openssl/rdoc/OpenSSL.html)
- [RbNaCl Documentation](https://github.com/RubyCrypto/rbnacl)
- [Ruby BCrypt Documentation](https://github.com/bcrypt-ruby/bcrypt-ruby)
- [Ruby Crypto Guide](https://www.ruby-lang.org/en/security/)
- CTF Practice Platforms and Resources

