## ADDED Requirements

### Requirement: Contacts page within a league
The system SHALL display a contacts page at `/leagues/[slug]/contacts` showing: contact name(s), phone number(s), email address(es), social media links (VK, Telegram, Instagram), and physical address if available.

#### Scenario: Contacts page renders
- **WHEN** user navigates to `/leagues/[slug]/contacts`
- **THEN** system displays at least one contact method (phone, email, or social link)

#### Scenario: Phone number is clickable
- **WHEN** a phone number is displayed
- **THEN** it renders as a `tel:` link

#### Scenario: Email is clickable
- **WHEN** an email address is displayed
- **THEN** it renders as a `mailto:` link

#### Scenario: No contacts state
- **WHEN** a league has no contacts in fixtures
- **THEN** system displays "Контактная информация не указана"
