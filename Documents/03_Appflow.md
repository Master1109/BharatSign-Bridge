# BharatSign Bridge - Application Flowcharts

## 1. Overview

This document outlines the application flowcharts for BharatSign Bridge, illustrating the technical processes and user interactions for all major scenarios. Each flowchart includes both success paths and error handling mechanisms.

## 2. Standard ISL Communication Flowchart

### 2.1 Success Path

```mermaid
flowchart TD
    A[Start: User grants camera/mic access] --> B[Frontend: Initialize camera preview]
    B --> C[User signs with both hands visible]
    C --> D[Frontend: Capture video segment (2-5 sec)]
    D --> E[Frontend: Send video to backend API]
    E --> F[Backend: Validate request]
    F --> G[Backend: Select AI provider adapter]
    G --> H[Backend: Format request for external AI]
    H --> I[External AI: Process video]
    I --> J[External AI: Return structured response]
    J --> K[Backend: Normalize response]
    K --> L[Backend: Apply context & confidence logic]
    L --> M{Confidence Level?}
    M -->|High| N[Backend: Return translation]
    M -->|Medium| O[Backend: Return translation + confirmation option]
    M -->|Low| P[Backend: Request clarification]
    N --> Q[Frontend: Display text/speech output]
    O --> Q
    P --> R[Frontend: Show clarification request]
    R --> S[User: Repeat sign or provide alternative]
    S --> C
    Q --> T[Non-ISL User: Respond via speech/text]
    T --> U[Frontend: Process speech/text input]
    U --> V[Backend: Generate ISL representation]
    V --> W[Frontend: Display ISL visual output]
    W --> X[End: Conversation continues]
```

### 2.2 Error Handling Flows

```mermaid
flowchart TD
    A[Start: User grants camera/mic access] --> B[Frontend: Initialize camera preview]
    B --> C{Camera Access?}
    C -->|Denied| D[Frontend: Show permission request]
    D --> E[User: Grant or deny permission]
    E -->|Granted| C
    E -->|Denied| F[Frontend: Show alternative input options]
    F --> G[End: Limited functionality available]
    
    C -->|Granted| H[Frontend: Start video capture]
    H --> I{Capture Successful?}
    I -->|Failed| J[Frontend: Show retry/cancel options]
    J --> K[User: Retry or cancel]
    K -->|Retry| H
    K -->|Cancel| L[End: Operation cancelled]
    
    I -->|Successful| M[Frontend: Send video to backend]
    M --> N[Backend: Validate request]
    N --> O{Request Valid?}
    O -->|Invalid| P[Backend: Return 400 error]
    P --> Q[Frontend: Show validation error]
    Q --> R[User: Correct and resend]
    R --> M
    
    O -->|Valid| S[Backend: Call AI provider]
    S --> T{AI Provider Response?}
    T -->|Timeout| U[Backend: Return 504 error]
    U --> V[Frontend: Show timeout error]
    V --> W[User: Retry or use alternative]
    W -->|Retry| S
    W -->|Alternative| X[End: Fallback to manual communication]
    
    T -->|Error (5xx)| Y[Backend: Return 503 error]
    Y --> Z[Frontend: Show service unavailable]
    Z --> AA[User: Retry later or contact support]
    AA -->|Retry| S
    AA -->|Support| AB[End: Contact support]
    
    T -->|Success| AC[Backend: Normalize response]
    AC --> AD{Response Valid?}
    AD -->|Invalid| AE[Backend: Log error]
    AE --> AF[Backend: Return 502 error]
    AF --> AG[Frontend: Show processing error]
    AG --> AH[User: Retry or simplify input]
    AH -->|Retry| M
    AH -->|Simplify| AI[End: User adjusts signing]
    
    AD -->|Valid| AJ[Continue to confidence evaluation]
```

## 3. Personal Mode Flowchart

### 3.1 Mode Detection & Initialization

```mermaid
flowchart TD
    A[Start: Video stream active] --> B[Frontend: Analyze video for hand visibility]
    B --> C{Hands Visible?}
    C -->|Both hands| D[Standard mode: Continue normal processing]
    D --> E[Process as standard ISL communication]
    
    C -->|One hand| F[Frontend: Detect device hold scenario]
    F --> G{Device hold detected?}
    G -->|No| H[Prompt user: "Are you holding device?"]
    H --> I[User: Confirm or deny]
    I -->|Confirm| J[Activate Personal Mode]
    I -->|Deny| K[Continue standard mode analysis]
    K --> B
    
    G -->|Yes| J[Activate Personal Mode]
    J --> L[Frontend: Show personal mode UI]
    L --> M[Frontend: Guide user through interaction options]
    M --> N{Sign Type Detection}
```

### 3.2 Natural One-Handed Sign Path

```mermaid
flowchart TD
    N -->|Natural one-handed| O[Frontend: Process as standard sign]
    O --> P[Frontend: Capture video segment]
    P --> Q[Frontend: Send to backend]
    Q --> R[Backend: Process with AI provider]
    R --> S[Backend: Return result]
    S --> T{Frontend: Valid response?}
    T -->|Yes| U[Display output to user]
    T -->|No| V[Show error: Try again or simplify]
    V --> W[User: Retry or adjust sign]
    W --> O
    
    U --> X[Non-ISL User responds]
    X --> Y[Process response as standard]
    Y --> Z[End: Continue conversation]
```

### 3.3 Partial Reconstruction Path

```mermaid
flowchart TD
    N -->|Potentially two-handed| AA[Frontend: Attempt partial inference]
    AA --> AB[Frontend: Analyze visible hand + context]
    AB --> AC{Sufficient data for inference?}
    AC -->|Yes| AD[Frontend: Generate candidate meanings]
    AC -->|No| AE[Offer sequential reconstruction]
    
    AD --> AF[Backend: Evaluate confidence]
    AF --> AG{Confidence sufficient?}
    AG -->|Yes| AH[Return interpretation]
    AG -->|No| AI[Offer sequential reconstruction]
    
    AH --> AJ[Frontend: Display result + confirmation option]
    AJ --> AK[User: Confirm or request alternative]
    AK -->|Confirm| AL[End: Use interpretation]
    AK -->|Alternative| AM[Offer sequential reconstruction]
    
    AM --> AN[Frontend: Initiate sequential workflow]
```

### 3.4 Sequential Articulation Reconstruction Path

```mermaid
flowchart TD
    N -->|Requires sequential| AO[Frontend: Initiate sequential capture]
    AO --> AP[Frontend: Prompt for Component A]
    AP --> AQ[Frontend: Capture Component A video]
    AQ --> AR{Capture successful?}
    AR -->|No| AS[Show retry/cancel]
    AS --> AT[User: Retry or cancel]
    AT -->|Retry| AQ
    AT -->|Cancel| AU[End: Abort sequential]
    
    AR -->|Yes| AV[Frontend: Store Component A data]
    AV --> AW[Frontend: Display ghost/anchor for A]
    AW --> AX[Frontend: Prompt for Component B]
    AX --> AY[Frontend: Capture Component B video]
    AY --> AZ{Capture successful?}
    AZ -->|No| BA[Show retry/cancel for B]
    BA --> BB[User: Retry B or restart]
    BB -->|Retry B| AX
    BB -->|Restart| AO
    
    AZ -->|Yes| BC[Frontend: Store Component B data]
    BC --> BD[Frontend: Combine A + B + metadata]
    BD --> BE[Frontend: Send to backend]
    BE --> BF[Backend: Process sequential data]
    BF --> BG[Backend: Return reconstruction result]
    BG --> BH{Frontend: Valid response?}
    BH -->|Yes| BI[Display reconstructed meaning]
    BH -->|No| BJ[Show error: Retry sequence]
    BJ --> BK[User: Retry sequence or simplify]
    BK -->|Retry| AO
    BK -->|Simplify| BL[End: User adjusts approach]
    
    BI --> BM[Non-ISL User responds]
    BM --> BN[Process response]
    BN --> BO[End: Continue conversation]
```

### 3.5 Virtual Anchor / Ghost-Hand Mechanism

```mermaid
flowchart TD
    AV[Store Component A data] --> AW[Display ghost/anchor]
    AW --> AX{Show ghost component?}
    AX -->|Yes| AY[Render translucent Component A]
    AY --> AZ[Maintain position/orientation from capture]
    AZ --> BA[Update in real-time as needed]
    BA --> BB[User signs Component B relative to ghost]
    BB --> BC[Capture spatial relationship data]
    BC --> BD[Include spatial data in backend request]
    
    AX -->|No| BE[Proceed without visual aid]
    BE --> BF[User signs Component B from memory]
    BF --> BG[Capture Component B data]
    BG --> BH[Include available data in request]
    BH --> BI[Backend notes reduced confidence due to no spatial aid]
```

## 4. Reverse Communication Flowchart

### 4.1 Speech-to-ISL Path

```mermaid
flowchart TD
    A[Start: Non-ISL user initiates communication] --> B[Frontend: Show input options]
    B --> C{Input type?}
    C -->|Speech| D[Frontend: Activate microphone]
    D --> E[Frontend: Capture speech input]
    E --> F{Speech captured?}
    F -->|No| G[Show timeout/error]
    G --> H[User: Retry or switch to text]
    H -->|Retry| E
    H -->|Text| I[Switch to text input]
    I --> J[Frontend: Process text input]
    
    F -->|Yes| K[Frontend: Send to speech-to-text]
    K --> L{Speech-to-text success?}
    L -->|No| M[Show transcription error]
    M --> N[User: Retry or use text]
    N -->|Retry| K
    N -->|Text| I
    
    L -->|Yes| O[Frontend: Send text to backend]
    O --> P[Backend: Process text for ISL representation]
    P --> Q[Backend: Generate sign-video/sign-clip]
    Q --> R[Frontend: Display ISL visual output]
    R --> S[ISL User: View and respond]
    S --> T[Process ISL response as standard]
    T --> U[End: Continue conversation]
```

### 4.2 Text-to-ISL Path

```mermaid
flowchart TD
    B -->|Text| I[Frontend: Process text input]
    I --> J{Frontend: Validate text?}
    J -->|No| K[Show validation error]
    K --> L[User: Correct text]
    L --> J
    
    J -->|Yes| M[Frontend: Send to backend]
    M --> N[Backend: Process text for ISL]
    N --> O{Backend: Valid processing?}
    O -->|No| P[Show processing error]
    P --> Q[User: Simplify or retry]
    Q -->|Retry| M
    Q -->|Simplify| R[End: User adjusts input]
    
    O -->|Yes| S[Backend: Generate ISL representation]
    S --> T[Frontend: Display sign-video/sign-clip]
    T --> U[ISL User: View and respond]
    U --> V[Process ISL response]
    V --> W[End: Continue conversation]
```

### 4.3 Error Handling for Reverse Communication

```mermaid
flowchart TD
    E --> F{Speech captured?}
    F -->|No| G[Show timeout/error]
    G --> H[User: Retry or switch to text]
    H -->|Retry| E
    H -->|Text| I
    
    K --> L{Speech-to-text success?}
    L -->|No| M[Show transcription error]
    M --> N[User: Retry or use text]
    N -->|Retry| K
    N -->|Text| I
    
    J -->|No| K[Show validation error]
    K --> L[User: Correct text]
    L --> J
    
    N -->|No| P[Show processing error]
    P --> Q[User: Simplify or retry]
    Q -->|Retry| M
    Q -->|Simplify| R[End: User adjusts input]
```

## 5. Error Handling & Recovery Patterns

### 5.1 Common Error Categories

```mermaid
flowchart TD
    A[Error Occurs] --> B{Error Type}
    B -->|Network/Connectivity| C[Show connection error]
    C --> D[User: Check internet or retry]
    D --> E{Connection restored?}
    E -->|Yes| F[Retry operation]
    E -->|No| G[Show offline queue option]
    G --> H[User: Queue for later or use alternative]
    
    B -->|Authentication| I[Show auth error]
    I --> J[User: Refresh session or login]
    J --> K{Auth successful?}
    K -->|Yes| L[Retry operation]
    K -->|No| M[Show support contact]
    
    B -->|Validation/Input| N[Show input error]
    N --> O[User: Correct input per guidance]
    O --> P{Retry successful?}
    P -->|Yes| Q[Continue operation]
    P -->|No| R[Show alternative approach]
    
    B -->|Processing/Timeout| S[Show processing error]
    S --> T[User: Retry or simplify]
    T --> U{Retry successful?}
    U -->|Yes| V[Continue operation]
    U -->|No| W[Show guided simplification]
    
    B -->|Service Unavailable| X[Show service error]
    X --> Y[User: Retry later or contact support]
    Y --> Z{Service restored?}
    Z -->|Yes| AA[Retry operation]
    Z -->|No| AB[Provide estimated restoration time]
```

### 5.2 Confidence Handling Flow

```mermaid
flowchart TD
    A[AI Response Received] --> B{Evaluate confidence}
    B -->|High confidence| C[Auto-translate & display]
    B -->|Medium confidence| D[Show translation + confirmation]
    D --> E{User action?}
    E -->|Confirm| F[Accept translation]
    E -->|Request clarification| G[Ask for repetition/alternative]
    E -->|Ignore/timeout| H[Auto-reject after timeout]
    H --> I[Show: "Not understood, please try again"]
    I --> J[User: Repeat or adjust]
    
    B -->|Low confidence| K[Do not guess]
    K --> L[Show clarification request]
    L --> M[Options: Repeat, alternative component, choose from candidates]
    M --> N{User selected option}
    N -->|Repeat| O[Request same sign again]
    N -->|Alternative component| P[Request different signing approach]
    N -->|Choose candidate| Q[Present candidate meanings]
    Q --> R[User selects meaning]
    R --> S[Use selected meaning]
    S --> T[Continue conversation]
    
    O --> A
    P --> A
```

## 6. State Management Flow

```mermaid
flowchart TD
    A[Application Load] --> B{User authenticated?}
    B -->|Yes| C[Load user preferences]
    B -->|No| D[Show guest mode notice]
    D --> E[Continue as guest user]
    
    C --> F{Has context preference?}
    F -->|Yes| G[Set default context]
    F -->|No| H[Show context selection]
    H --> I[User selects context]
    I --> J[Save context preference]
    
    J --> K{Has language preference?}
    K -->|Yes| L[Set default languages]
    K -->|No| M[Show language selection]
    M --> N[User selects languages]
    N --> O[Save language preferences]
    
    O --> P[Ready for communication]
    P --> Q[Monitor session state]
    Q --> R{Session active?}
    R -->|Yes| S[Continue communication flows]
    R -->|No| T[Show session expired]
    T --> U[User: Refresh or login]
    U --> B
    
    S --> V{Communication ended?}
    V -->|Yes| W[Save conversation history]
    W --> X[Clear temporary data]
    X --> Y[End session or continue]
    Y -->|Continue| Q
    Y -->|End| Z[Show goodbye/thank you]
```

## 7. Data Flow Summary

### 7.1 Video Processing Data Flow
```
Camera → MediaRecorder → Blob/ArrayBuffer → Base64/URL → HTTPS POST → 
Backend Validation → AI Provider Adapter → External AI API → 
Structured JSON Response → Response Normalization → Business Logic → 
HTTPS Response → Frontend Update → UI Display
```

### 7.2 Sequential Component Data Flow
```
Component A Capture → Feature Extraction (shape, orientation, etc.) → 
Temporary Storage → Ghost/Anchor Display → Component B Capture → 
Feature Extraction → Spatial Relationship Calculation → 
Combined Data Package → HTTPS POST → Backend Processing → 
Reconstruction Engine → Candidate Generation → Confidence Evaluation → 
Response → Frontend Display
```

### 7.3 Reverse Communication Data Flow
```
Speech Input → Web Speech API/Text Processing → Text Validation → 
HTTPS POST → Backend Processing → ISL Representation Generation → 
Sign-video/sign-clip Selection/Generation → HTTPS Response → 
Frontend Display → ISL User Consumption
```

## 8. Flowchart Implementation Notes

### 8.1 Technical Implementation
- All flowcharts represent logical processes; actual implementation may combine or split steps
- Error handling flows are designed to be resilient and provide clear user guidance
- Timeout values should be configurable based on network conditions
- Retry mechanisms should implement exponential backoff where appropriate
- User guidance should be context-aware and actionable

### 8.2 User Experience Considerations
- Flowcharts prioritize clear error recovery paths over preventing all errors
- Users should always have an "out" or alternative path when encountering difficulties
- Confirmation steps prevent unintended actions in medium-confidence scenarios
- Progressive disclosure keeps interfaces simple while providing advanced options

### 8.3 Monitoring and Analytics
- Key decision points in flowcharts should be instrumented for analytics
- Error paths should be tracked to identify common failure modes
- Success metrics should be measured at major flowchart endpoints
- User journey completion rates should be monitored for optimization

---
*Document Version: 1.0*
*Last Updated: 2026-09-26*
*Product: BharatSign Bridge*
*Target Release: Production*