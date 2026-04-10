## ADDED Requirements

### Requirement: User can register with email and password
The system SHALL provide a registration page at `/auth/register` with fields: name, email, password, confirm password. On successful submission the system SHALL create a session and redirect to `/`.

#### Scenario: Successful registration
- **WHEN** user fills all fields correctly and submits the registration form
- **THEN** system creates a session, stores user in localStorage, and redirects to homepage

#### Scenario: Passwords do not match
- **WHEN** user submits with mismatching password and confirm password
- **THEN** system displays an inline error "Пароли не совпадают"

#### Scenario: Duplicate email
- **WHEN** user submits with an email already in mock user store
- **THEN** system displays an inline error "Email уже зарегистрирован"

---

### Requirement: User can log in with email and password
The system SHALL provide a login page at `/auth/login` with email and password fields. On success the system SHALL create a session and redirect to the previous page or `/`.

#### Scenario: Successful login
- **WHEN** user enters valid credentials and submits
- **THEN** system stores session in localStorage and redirects to `/`

#### Scenario: Invalid credentials
- **WHEN** user enters wrong email or password
- **THEN** system displays "Неверный email или пароль" error message

---

### Requirement: Authenticated user can log out
The system SHALL display a logout button in the navigation when a user is logged in. Clicking it SHALL clear the session and redirect to `/`.

#### Scenario: Logout clears session
- **WHEN** authenticated user clicks logout
- **THEN** system removes session from localStorage and updates navbar to show login/register buttons

---

### Requirement: Navbar reflects auth state
The navigation bar SHALL show "Вход" and "Регистрация" buttons when no session exists, and the user's name with a logout option when a session exists.

#### Scenario: Unauthenticated navbar
- **WHEN** user has no active session
- **THEN** navbar shows "Вход" and "Регистрация" buttons

#### Scenario: Authenticated navbar
- **WHEN** user has an active session
- **THEN** navbar shows user's name and a logout control
