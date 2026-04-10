## ADDED Requirements

### Requirement: Stadium info in match cards
The system SHALL display the stadium name in match cards when `stadium_id` is present in the match payload. The stadium name SHALL be fetched lazily via `GET /stadiums/{id}`, wrapped in `try/catch` — if the fetch fails only the name is omitted, the card still renders. Stadium data SHALL be cached by ISR.

#### Scenario: Stadium name displayed
- **WHEN** a match card has a non-null `stadium_id`
- **THEN** the stadium name is shown below the match score/teams row

#### Scenario: Stadium fetch fails gracefully
- **WHEN** `GET /stadiums/{stadium_id}` returns an error
- **THEN** the match card renders without stadium info, no error is thrown

#### Scenario: No stadium id
- **WHEN** `stadium_id` is null or absent in the match payload
- **THEN** no stadium row is shown in the match card

### Requirement: Referee info in match cards
The system SHALL display the referee name in match cards when `judje_id` is present in the match payload. The referee name SHALL be resolved from the existing `/clients/{id}` payload data without an additional API call, if referee data is available there; otherwise a separate fetch MAY be used.

#### Scenario: Referee name displayed
- **WHEN** a match card has a non-null `judje_id` and the referee name can be resolved
- **THEN** the referee name is shown in the match card

#### Scenario: No referee id
- **WHEN** `judje_id` is null or absent
- **THEN** no referee row is shown in the match card
