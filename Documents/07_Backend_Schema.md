# BharatSign Bridge - Backend Schema Document

## 1. Overview

This document defines the backend schema for BharatSign Bridge, covering both the database schema (tables, relationships, constraints) and the API schemas (Pydantic models for request/response validation). The schema supports core functionality: user management, communication sessions, message handling, preferences, settings, and audit logging.

## 2. Database Schema

### 2.1 Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||::o{ USER_ROLE : ""
    USER_ROLE }|..|| ROLE : ""
    USER ||::o{ USER_SESSION : ""
    USER ||::o{ CONVERSATION : ""
    CONVERSATION ||..|| MESSAGE : ""
    MESSAGE ||..|| MESSAGE_TYPE : ""
    USER ||::o{ USER_PREFERENCE : ""
    USER ||::o{ USER_CONTEXT : ""
    USER ||::o{ USER_LANGUAGE : ""
    USER ||::o{ AUDIT_LOG : ""
    
    USER {
        uuid id PK
        string username
        string email
        string password_hash
        boolean is_active
        boolean is_verified
        datetime created_at
        datetime updated_at
        datetime last_login_at
    }
    
    ROLE {
        uuid id PK
        string name
        string description
    }
    
    USER_ROLE {
        uuid id PK
        uuid user_id FK
        uuid role_id FK
        datetime assigned_at
    }
    
    USER_SESSION {
        uuid id PK
        uuid user_id FK
        string refresh_token_hash
        string user_agent
        string ip_address
        datetime expires_at
        datetime created_at
    }
    
    CONVERSATION {
        uuid id PK
        uuid user_id FK
        string title
        datetime started_at
        datetime ended_at
        boolean is_archived
    }
    
    MESSAGE {
        uuid id PK
        uuid conversation_id FK
        uuid sender_user_id FK
        enum message_type (text, isl_video, system)
        jsonb content
        datetime timestamp
        boolean is_edited
        datetime edited_at
    }
    
    MESSAGE_TYPE {
        enum type PK
        string description
    }
    
    USER_PREFERENCE {
        uuid id PK
        uuid user_id FK
        string preference_key
        jsonb preference_value
        datetime updated_at
    }
    
    USER_CONTEXT {
        uuid id PK
        uuid user_id FK
        string context_name
        boolean is_default
        datetime updated_at
    }
    
    USER_LANGUAGE {
        uuid id PK
        uuid user_id FK
        string language_code
        enum language_type (interface, output_primary, output_secondary)
        boolean is_default
        datetime updated_at
    }
    
    AUDIT_LOG {
        uuid id PK
        uuid user_id FK
        string action
        string resource_type
        uuid resource_id
        jsonb changes
        datetime occurred_at
        string ip_address
        string user_agent
    }
```

### 2.2 Table Definitions

#### 2.2.1 `users`
Stores user account information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique user identifier |
| `username` | VARCHAR(50) | NOT NULL, UNIQUE | Unique username |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE | Email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hash of password |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Account active status |
| `is_verified` | BOOLEAN | NOT NULL, DEFAULT FALSE | Email verification status |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Last update timestamp |
| `last_login_at` | TIMESTAMPTZ | NULLABLE | Last login timestamp |

#### 2.2.2 `roles`
Defines role-based access control roles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique role identifier |
| `name` | VARCHAR(30) | NOT NULL, UNIQUE | Role name (e.g., `user`, `moderator`, `admin`) |
| `description` | TEXT | NULLABLE | Role description |

#### 2.2.3 `user_roles`
Many-to-many relationship between users and roles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique assignment identifier |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | User identifier |
| `role_id` | UUID | NOT NULL, FOREIGN KEY (`roles.id`) | Role identifier |
| `assigned_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Timestamp when role was assigned |

#### 2.2.4 `user_sessions`
Tracks active user sessions (for refresh token rotation).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique session identifier |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | Associated user |
| `refresh_token_hash` | VARCHAR(255) | NOT NULL | Hashed refresh token |
| `user_agent` | TEXT | NULLABLE | Client user agent string |
| `ip_address` | INET | NULLABLE | Client IP address |
| `expires_at` | TIMESTAMPTZ | NOT NULL | Session expiration timestamp |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Session creation timestamp |

#### 2.2.5 `conversations`
Groups messages into conversation threads.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique conversation identifier |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | Owning user |
| `title` | VARCHAR(200) | NULLABLE | Conversation title (optional) |
| `started_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Conversation start timestamp |
| `ended_at` | TIMESTAMPTZ | NULLABLE | Conversation end timestamp |
| `is_archived` | BOOLEAN | NOT NULL, DEFAULT FALSE | Archival flag |

#### 2.2.6 `messages`
Individual messages within a conversation.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique message identifier |
| `conversation_id` | UUID | NOT NULL, FOREIGN KEY (`conversations.id`) | Parent conversation |
| `sender_user_id` | UUID | NULLABLE, FOREIGN KEY (`users.id`) | Sender (NULL for system messages) |
| `message_type` | VARCHAR(20) | NOT NULL, CHECK (`message_type` IN ('text', 'isl_video', 'system')) | Type of message |
| `content` | JSONB | NOT NULL | Message payload (varies by type) |
| `timestamp` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Message creation timestamp |
| `is_edited` | BOOLEAN | NOT NULL, DEFAULT FALSE | Edit flag |
| `edited_at` | TIMESTAMPTZ | NULLABLE | Last edit timestamp |

**Content JSON structure by `message_type`:**
- `text`: `{ "text": string }`
- `isl_video`: `{ "url": string, "duration_seconds": number, "preview_url": string }`
- `system`: `{ "text": string, "code": string (optional) }`

#### 2.2.7 `message_types`
Lookup table for message types (enum-like).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `type` | VARCHAR(20) | PRIMARY KEY | Message type value |
| `description` | TEXT | NULLABLE | Human-readable description |

#### 2.2.8 `user_preferences`
Key-value store for user-specific settings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique preference entry |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | Owning user |
| `preference_key` | VARCHAR(100) | NOT NULL | Preference key (e.g., `theme`, `auto_play_speech`) |
| `preference_value` | JSONB | NOT NULL | Preference value (typed per key) |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Last update timestamp |
| **Unique Constraint**: `(user_id, preference_key)` |

#### 2.2.9 `user_contexts`
Tracks user-selected communication contexts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique context entry |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | Owning user |
| `context_name` | VARCHAR(50) | NOT NULL | Context name (e.g., `general`, `healthcare`, `education`) |
| `is_default` | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether this is the user's default context |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Last update timestamp |
| **Unique Constraint**: `(user_id, context_name)` |

#### 2.2.10 `user_languages`
Tracks user language preferences for interface and output.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique language entry |
| `user_id` | UUID | NOT NULL, FOREIGN KEY (`users.id`) | Owning user |
| `language_code` | VARCHAR(10) | NOT NULL | ISO 639-1 code (e.g., `en`, `hi`, `gu`) |
| `language_type` | VARCHAR(20) | NOT NULL, CHECK (`language_type` IN ('interface', 'output_primary', 'output_secondary')) | Purpose of language |
| `is_default` | BOOLEAN | NOT NULL, DEFAULT FALSE | Default for this type |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Last update timestamp |
| **Unique Constraint**: `(user_id, language_type)` |

#### 2.2.11 `audit_logs`
Records security- and privacy-relevant actions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique log entry |
| `user_id` | UUID | NULLABLE, FOREIGN KEY (`users.id`) | Associated user (if applicable) |
| `action` | VARCHAR(100) | NOT NULL | Action performed (e.g., `login`, `message_send`, `data_export`) |
| `resource_type` | VARCHAR(50) | NOT NULL | Type of resource affected (e.g., `user`, `conversation`, `message`) |
| `resource_id` | UUID | NULLABLE | Identifier of the resource |
| `changes` | JSONB | NULLABLE | Before/after changes (for updates/deletes) |
| `occurred_at` | TIMESTAMPTZ | NOT NULL, DEFAULT `now()` | Timestamp of action |
| `ip_address` | INET | NULLABLE | Client IP address |
| `user_agent` | TEXT | NULLABLE | Client user agent |

### 2.3 Indexes
- `users`: unique on `username`, `email`
- `user_sessions`: index on `expires_at` (for cleanup)
- `conversations`: index on `(user_id, started_at DESC)`
- `messages`: index on `(conversation_id, timestamp DESC)`
- `message`: index on `message_type`
- `user_preferences`: index on `(user_id, preference_key)`
- `user_contexts`: index on `(user_id, context_name)`
- `user_languages`: index on `(user_id, language_type)`
- `audit_logs`: index on `(occurred_at DESC)`, index on `(user_id, occurred_at DESC)`

### 2.4 Constraints & Triggers
- `updated_at` columns automatically set via `BEFORE UPDATE` trigger to `now()`
- Passwords must meet complexity policy (enforced at application layer)
- Refresh tokens are hashed with bcrypt before storage
- CASCADE deletions: removing a user removes their sessions, preferences, contexts, languages, conversations (and messages via FK), audit logs (set user_id NULL)
- Soft delete not used; hard delete with retention policies (archive after X days)

## 3. API Schemas (Pydantic Models)

All API requests and responses are validated using Pydantic v2 models. Below are representative models grouped by functional area.

### 3.1 Authentication Models

```python
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional, Literal

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: Literal["bearer"] = "bearer"
    expires_in: int  # seconds

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)

class UserRegisterResponse(BaseModel):
    id: str
    username: str
    email: str
    is_active: bool
    is_verified: bool
    created_at: datetime

class LoginRequest(BaseModel):
    username: str  # accepts username or email
    password: str

class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)
```

### 3.2 User Management Models

```python
class UserProfile(BaseModel):
    id: str
    username: str
    email: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime
    last_login_at: Optional[datetime] = None

class UserUpdateRequest(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None

class PreferenceItem(BaseModel):
    key: str
    value: dict  # or Any; specific validation per key in service layer

class PreferencesUpdateRequest(BaseModel):
    preferences: list[PreferenceItem]

class ContextItem(BaseModel):
    name: str
    is_default: bool = False

class ContextsUpdateRequest(BaseModel):
    contexts: list[ContextItem]

class LanguageItem(BaseModel):
    code: str  # ISO 639-1
    type: Literal["interface", "output_primary", "output_secondary"]
    is_default: bool = False

class LanguagesUpdateRequest(BaseModel):
    languages: list[LanguageItem]
```

### 3.3 Sign Processing Models

```python
class SignProcessRequest(BaseModel):
    video_base64: str = Field(..., description="Base64-encoded video segment (MP4/WebM)")
    context: str = Field(..., description="Communication context (e.g., general, healthcare)")
    # Optional metadata for sequential mode
    is_sequential: bool = Field(False, description="Whether this is a sequential component")
    component_index: Optional[Literal[1, 2]] = Field(None, description="1 for component A, 2 for component B")
    component_data: Optional[dict] = Field(None, description="Stored features from previous component (for index=2)")

class SignProcessResponse(BaseModel):
    recognized_meaning: str
    candidate_meanings: list[str] = Field(default_factory=list)
    confidence: Literal["high", "medium", "low"]
    needs_clarification: bool
    needs_second_component: bool
    processing_time_ms: int
    model_version: str

class SequentialComponentData(BaseModel):
    hand_shape: str
    orientation: list[float]  # 3-vector
    trajectory: list[list[float]]  # array of [x,y,z] points
    position: list[float]  # 3-vector
    timing: dict
    movement_direction: list[float]  # 3-vector
```

### 3.4 Reverse Communication (ISL Generation) Models

```python
class IslGenerateRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=500)
    language: str = Field(..., description="Target language code for ISL semantics (e.g., en, hi)")

class IslGenerateResponse(BaseModel):
    isl_video_url: str
    duration_seconds: float
    preview_url: Optional[str] = None  # thumbnail or first frame
    processing_time_ms: int
```

### 3.5 Conversation & Messaging Models

```python
class MessageBase(BaseModel):
    id: str
    conversation_id: str
    sender_user_id: Optional[str] = None
    message_type: Literal["text", "isl_video", "system"]
    content: dict
    timestamp: datetime
    is_edited: bool = False
    edited_at: Optional[datetime] = None

class TextMessageContent(BaseModel):
    text: str

class IslVideoMessageContent(BaseModel):
    url: str
    duration_seconds: float
    preview_url: Optional[str] = None

class SystemMessageContent(BaseModel):
    text: str
    code: Optional[str] = None

class MessageResponse(MessageBase):
    pass  # Union of content types handled in service layer

class ConversationSummary(BaseModel):
    id: str
    title: Optional[str] = None
    started_at: datetime
    ended_at: Optional[datetime] = None
    is_archived: bool
    message_count: int
    last_message_at: Optional[datetime] = None

class ConversationDetail(ConversationSummary):
    messages: list[MessageResponse]

class SendMessageRequest(BaseModel):
    message_type: Literal["text", "isl_video"]
    content: dict  # validated per type in endpoint

class SendMessageResponse(BaseModel):
    message: MessageResponse
```

### 3.6 Common Response Models

```python
class PaginatedResponse(BaseModel):
    items: list[dict]
    total: int
    page: int
    page_size: int
    pages: int

class ErrorResponse(BaseModel):
    error: str
    details: Optional[dict] = None
    request_id: Optional[str] = None

class SuccessResponse(BaseModel):
    success: bool = True
    message: Optional[str] = None
```

### 3.7 WebSocket Models (if implemented for real-time features)

```python
class WsMessage(BaseModel):
    type: Literal["typing_indicator", "read_receipt", "presence", "system_notification"]
    payload: dict

class TypingIndicator(WsMessage):
    type: Literal["typing_indicator"]
    conversation_id: str
    user_id: str
    is_typing: bool
```

## 4. Schema Evolution Guidelines

### 4.1 Database Changes
- Use Alembic for all schema migrations
- migrations must be backward-compatible where possible (additive changes)
- Breaking changes require feature flags and dual-write periods
- All migrations tested against production-copy dataset
- Downgrade scripts provided for critical changes

### 4.2 API Versioning
- API versioned via URL prefix: `/api/v1/...`
- Backward compatibility maintained within minor versions
- Deprecation notices in API responses (headers: `Deprecation`, `Sunset`)
- Major version changes require client-side updates

### 4.3 Pydantic Model Updates
- Prefer optional fields with defaults for new attributes
- Mark deprecated fields with `Field(..., deprecated=True)` and remove in next major version
- Use `model_config = {"extra": "forbid"}` to prevent unexpected fields
- Validate business logic in service layer, not just schema

## 5. Security & Privacy Considerations

### 5.1 Data Minimization
- Raw video not stored by default; only processed features and results retained
- IP addresses in `audit_logs` may be truncated to /24 for IPv4 or /48 for IPv6 after 30 days
- User-agent strings stored truncated to 255 characters

### 5.2 Consent Tracking
- Consent flags stored in `user_preferences` (e.g., `analytics_consent`, `improvement_consent`)
- Changes to consent logged in `audit_logs`

### 5.3 Encryption at Rest
- Sensitive fields (PII) considered for column-level encryption in future phases
- Currently relies on filesystem and disk encryption provided by cloud provider
- Backups encrypted with KMS-managed keys

### 5.4 Access Controls
- Row-level security not implemented; enforced via service layer
- All queries must include user_id filters for user-scoped resources
- Admin/bypass roles restricted to minimal set of users

## 6. Conclusion

This schema provides a solid foundation for BharatSign Bridge's backend, supporting:
- Secure user authentication and role-based access
- Flexible communication sessions with rich messaging
- Extensible preference and context system
- Comprehensive auditability for compliance
- Clear API contracts enabling safe evolution

By adhering to these schemas, the system ensures data integrity, scalability, and maintainability while meeting the functional requirements outlined in the PRD and SRS.

---
*Document Version: 1.0*
*Last Updated: 2026-09-26*
*Product: BharatSign Bridge*
*Target Release: Production*