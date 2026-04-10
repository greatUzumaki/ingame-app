## MODIFIED Requirements

### Requirement: Contacts page within a league
The system SHALL display a contacts page at `/leagues/[slug]/contacts` showing: contact name(s), phone number(s), email address(es), social media links (VK, Telegram, Instagram, YouTube, and any other platforms present in `socials[]`), and physical address if available. Social links SHALL be rendered from the `socials[]` array already present in the `/clients/{id}` payload — no additional API call is required.

#### Scenario: Contacts page renders
- **WHEN** user navigates to `/leagues/[slug]/contacts`
- **THEN** system displays at least one contact method (phone, email, or social link)

#### Scenario: Phone number is clickable
- **WHEN** a phone number is displayed
- **THEN** it renders as a `tel:` link

#### Scenario: Email is clickable
- **WHEN** an email address is displayed
- **THEN** it renders as a `mailto:` link

#### Scenario: Social links rendered
- **WHEN** the league payload contains a non-empty `socials[]` array
- **THEN** each social entry renders as a clickable icon/link with the platform name and URL

#### Scenario: Social links absent
- **WHEN** `socials[]` is empty or absent
- **THEN** no social links section is shown

#### Scenario: No contacts state
- **WHEN** a league has no contacts in fixtures
- **THEN** system displays "Контактная информация не указана"
