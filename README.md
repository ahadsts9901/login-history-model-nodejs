# Login History Module (Node.js + MongoDB)

## Overview

This module handles:

- User authentication using JWT
- Login session tracking
- Login history management
- Session expiration
- Logout from current device
- Global signout from all devices

---

# Postman Collection

https://documenter.getpostman.com/view/42538377/2sBXwmQYdR

---

# Test Credentials

| Field | Value |
|---|---|
| Email | user@gmail.com |
| Password | User@1234 |

---

# Available Routes

| Method | Route | Description |
|---|---|---|
| POST | `/email-login` | Login user |
| POST | `/logout` | Logout current session |
| GET | `/profile` | Get logged-in user profile |
| GET | `/login-history` | Get login history |
| POST | `/global-signout` | Logout from all devices |

---

# Core Concept

Every successful login creates a new document inside:

```txt
login-histories
```

collection.

Each document represents:

# One Active Session

---

# Important Field

## sessionDurationInMs

Initially:

```txt
0
```

Meaning:

# Session is still ACTIVE

because user has not logged out yet.

When logout/global-signout happens:

```txt
sessionDurationInMs = logoutTime - loginTime
```

Example:

```txt
3600000
```

Means:

```txt
1 hour session
```

---

# Login Flow

## 1. User hits `/email-login`

System validates:

- email
- password
- account status

---

## 2. Login History Created

A new login-history record is created with:

- loginStatus
- userId
- session
- source
- isExpired = false
- sessionDurationInMs = 0

Meaning:

# Active Session

---

## 3. JWT Token Generated

JWT contains:

```txt
loginHistoryId
```

This connects JWT with MongoDB session record.

---

## 4. Cookies Stored

System stores:

- hart
- hartRef

inside cookies.

---

# Authentication Flow

Protected APIs use:

```txt
authenticationMiddleware
```

Middleware performs:

1. Read token
2. Verify JWT
3. Extract loginHistoryId
4. Find login-history record
5. Check if session expired

If session is expired:

```txt
401 Unauthorized
```

returned.

---

# Logout Flow

Route:

```txt
POST /logout
```

Steps:

1. Find current session
2. Mark session expired
3. Calculate session duration
4. Clear cookies

After logout:

```txt
isExpired = true
```

and token stops working.

---

# Global Signout Flow

Route:

```txt
POST /global-signout
```

Purpose:

# Logout user from ALL devices

Steps:

1. Find all active sessions
2. Mark all sessions expired
3. Calculate session duration
4. Clear current cookies

After this:

- all JWTs become invalid
- all devices get logged out

---

# Example Scenarios

## Successful Login

Result:

- JWT token generated
- login-history document created
- active session started

---

## Wrong Password

Result:

```txt
Invalid credentials
```

No active session created.

---

## Access Protected Route Without Token

Result:

```txt
401 Unauthorized
```

---

## Access Profile With Valid Token

Result:

- user profile returned successfully

---

## Logout Test

After logout:

- session expires
- token stops working

---

## Global Signout Test

If user is logged in on multiple devices:

- all sessions become expired
- all devices logout instantly

---

# Recommended Improvements

- Store IP address
- Store browser/device info
- Track failed login attempts
- Add refresh token rotation
- Add last activity tracking

---

# Summary

This system combines:

# JWT + MongoDB Session Records

to provide:

- secure authentication
- active session management
- login history tracking
- device logout
- global signout support
- session duration tracking
