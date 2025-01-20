# Storage Guidelines
## Best Practices

### Hash Storage
- Store hashes in fixed-length fields
- Use appropriate encoding (base64, hex)
- Include algorithm identifier
- Store metadata separately

### Database Considerations
- Use appropriate column types and lengths
- Index hash values if needed for lookups
- Implement access controls
- Regular backup and recovery testing

### Example Storage Format
```sql
CREATE TABLE user_credentials (
    id BIGINT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password_hash CHAR(64),  -- SHA-256 hex output
    salt CHAR(32),          -- 16 bytes in hex
    algorithm VARCHAR(50),   -- Algorithm identifier
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```
