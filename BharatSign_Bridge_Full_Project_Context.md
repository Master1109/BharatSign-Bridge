# BharatSign Bridge --- Full Project Context

**Project Type:** SIH 2026 Student Innovation\
**Platform Direction:** Web-first\
**Project Stage:** Concept validation / MVP planning\
**Primary Domain:** Assistive technology, accessibility and inclusive
communication\
**Core Language:** Indian Sign Language (ISL)

------------------------------------------------------------------------

## 1. Project Overview

**BharatSign Bridge** is a web-based, bidirectional communication
platform intended to reduce the communication barrier between Indian
Sign Language (ISL) users and people who do not understand ISL.

The project is not intended to remain merely an "ISL-to-text
translator." Its broader goal is to provide a practical communication
bridge that can be used in everyday conversations as well as contexts
such as hospitals, educational institutions, government offices, banks,
service counters and emergencies.

The system has two clearly separated parts:

1.  **Core Communication Platform** --- conventional bidirectional ISL
    communication capabilities.
2.  **Innovative Personal Mode** --- a proposed method for dealing with
    a fundamental mobile-use problem: an ISL user may need to hold the
    phone with one hand while many signs require both hands.

The second part is the principal innovation hypothesis of the project.

------------------------------------------------------------------------

## 2. Problem Statement

Most camera-based sign-language systems assume that the signer can keep
both hands, the face and the upper body visible to the camera. This
assumption is reasonable when the camera is fixed on a desk, tripod,
kiosk or institutional counter.

It becomes problematic during personal mobile use.

If the user must hold the phone:

-   one hand becomes occupied;
-   inherently two-handed signs may become impossible to perform
    normally;
-   simultaneous hand relationships may be lost;
-   the user may have to depend on another person or an external stand;
-   the accessibility technology itself creates a new accessibility
    constraint.

BharatSign Bridge aims to make the communication system adapt to this
physical reality rather than requiring the signer to adapt to the
device.

------------------------------------------------------------------------

# PART A --- CORE BHARATSIGN BRIDGE

## 3. Core Objective

Enable an ISL user and a non-ISL user to communicate through a web
application even when they do not share a common communication method.

The basic communication directions are:

### 3.1 ISL → Text / Speech

``` text
ISL User
   ↓
Camera
   ↓
Video / Visual Input
   ↓
Multimodal Interpretation
   ↓
Semantic Meaning
   ↓
Text
   ↓
Optional Speech Output
   ↓
Non-ISL User
```

### 3.2 Speech / Text → ISL

``` text
Non-ISL User
   ↓
Speech or Text
   ↓
Speech-to-Text / Text Processing
   ↓
Semantic Interpretation
   ↓
ISL-Oriented Representation
   ↓
Visual Sign Output
   ↓
ISL User
```

The reverse direction may initially use a validated sign-video/sign-clip
representation. A 3D signing avatar can be investigated later but is not
required for the first MVP.

------------------------------------------------------------------------

## 4. Operating Modes

### 4.1 Institution Mode

Designed for environments where a fixed camera is available.

Examples:

-   hospitals;
-   banks;
-   government offices;
-   universities;
-   railway/service counters;
-   help desks.

A webcam, tablet or mounted device can capture the signer while both
hands remain free.

Institution Mode can therefore use normal two-handed ISL input.

### 4.2 Personal Mode

Designed for spontaneous communication using the user's own phone.

In this mode:

-   the user may be holding the phone with one hand;
-   only one hand may be available for signing;
-   BharatSign must determine how to interpret signs despite the
    unavailable hand.

Personal Mode contains the main innovative component of the project.

------------------------------------------------------------------------

## 5. Context-Aware Communication

The platform may support selectable communication contexts such as:

-   General
-   Healthcare
-   Emergency
-   Education
-   Banking
-   Government Services

Context should be used to **rank possible interpretations**, not to
override visual evidence.

For example, an ambiguous expression during a medical conversation may
have a different likely interpretation from the same ambiguous input
during a classroom conversation.

------------------------------------------------------------------------

## 6. Confidence-Aware Translation

BharatSign should never silently present an uncertain interpretation as
a reliable translation.

Possible confidence states:

### High Confidence

Translate automatically.

### Moderate Confidence

Show the likely interpretation and, where appropriate, request
confirmation.

### Low Confidence

Do not guess. Ask the user to:

-   repeat the sign;
-   provide another component;
-   choose from candidate meanings; or
-   use an alternate input method.

This becomes especially important in healthcare, financial, legal and
emergency communication.

------------------------------------------------------------------------

## 7. Multimodal Sign Information

The project should not treat sign language as simple hand-shape
recognition.

Relevant visual information can include:

-   hand shape;
-   hand orientation;
-   hand trajectory;
-   relative hand position;
-   body-relative hand location;
-   interaction between both hands;
-   upper-body posture;
-   head movement;
-   facial/non-manual expressions;
-   temporal movement across frames.

------------------------------------------------------------------------

## 8. Multilingual Output

ISL should remain the sign-language communication layer.

The interpreted semantic meaning can eventually be rendered into
multiple spoken/written languages such as:

-   English;
-   Hindi;
-   Gujarati;
-   other Indian languages.

Conceptually:

``` text
ISL
 ↓
Semantic Meaning
 ↓
 ├── English
 ├── Hindi
 ├── Gujarati
 └── Other supported languages
```

This avoids treating English as the only destination language.

------------------------------------------------------------------------

# PART B --- PRINCIPAL INNOVATION

## 9. Innovation Trigger

The innovation originated from a practical question:

> If the ISL user is holding the phone in one hand, how will the user
> perform signs that require both hands?

Simply asking the user to place the phone somewhere is not always
practical.

Simply ignoring the missing hand can also destroy essential linguistic
information.

Therefore BharatSign explores a hybrid **one-free-hand communication
mechanism**.

------------------------------------------------------------------------

## 10. Personal One-Hand Communication Strategy

Not every sign should be processed in the same way.

BharatSign Personal Mode proposes three primary cases.

### Case 1 --- Naturally One-Handed Sign

The sign is recognized normally.

``` text
One visible hand
      ↓
Normal Recognition
      ↓
Meaning
```

### Case 2 --- Two-Handed Sign Inferable from Partial Information

Some two-handed signs may contain sufficiently distinctive information
in the visible/dominant hand.

BharatSign may attempt reconstruction using:

-   visible hand shape;
-   trajectory;
-   orientation;
-   body-relative position;
-   facial/body information;
-   previous signs;
-   conversation context.

``` text
Partial Sign
   +
Non-Manual Cues
   +
Context
   ↓
Candidate Two-Handed Signs
   ↓
Confidence Evaluation
```

If confidence is sufficiently high, the interpretation can proceed.

### Case 3 --- Missing-Hand Information Is Essential

If the system cannot safely infer the sign, it activates **Sequential
Articulation Reconstruction**.

------------------------------------------------------------------------

# 11. Sequential Articulation Reconstruction

This is the central innovation hypothesis.

A normal two-handed sign may encode information simultaneously:

``` text
Hand A ──┐
         ├── Complete Sign
Hand B ──┘
```

When Hand A is occupied holding the phone, the user may supply the
components sequentially using the same free hand.

``` text
Free Hand
   ↓
Component A
   ↓
Transition / Separator
   ↓
Component B
   ↓
Reconstruction
```

The system stores information from both observations and attempts to
reconstruct the original intended two-handed sign.

Possible stored information includes:

-   hand shape;
-   orientation;
-   trajectory;
-   position;
-   timing;
-   movement direction;
-   body-relative location.

The reconstruction process can then use:

``` text
Component A
   +
Component B
   +
Spatial Information
   +
Body / Face Information
   +
Conversation Context
   ↓
Candidate Original Signs
   ↓
Confidence Evaluation
   ↓
Interpretation
```

This is different from simply removing one hand from the input and
asking a model to guess.

------------------------------------------------------------------------

## 12. Virtual Anchor / Ghost-Hand Mechanism

Sequential signing introduces another problem.

A two-handed sign may depend on the **simultaneous spatial relationship
between both hands**.

If the user performs:

``` text
Component A → Component B
```

the system may know both components but not where they were supposed to
be relative to one another.

BharatSign therefore proposes a **Virtual Anchor / Ghost-Hand
interface**.

### Proposed Interaction

1.  User performs the first component.
2.  BharatSign records its location, orientation and movement.
3.  The first component is frozen or represented as a translucent visual
    anchor.
4.  The user performs the second component using the same free hand.
5.  The live hand is positioned relative to the stored virtual
    component.
6.  BharatSign captures their spatial relationship.
7.  The reconstruction engine generates candidate original signs.

Conceptually:

``` text
Camera Preview

+-----------------------------+
|                             |
|      Ghost Component A      |
|             +               |
|                             |
|       Live Component B      |
|                             |
+-----------------------------+
```

This mechanism attempts to preserve information that would otherwise be
lost when simultaneous two-handed articulation is converted into
sequential input.

------------------------------------------------------------------------

## 13. Hybrid Reconstruction Strategy

Sequential input should **not** be forced for every two-handed sign.

The desired routing logic is:

``` text
Sign Observation
       ↓
Naturally one-handed?
   ┌───┴───┐
  Yes      No
   ↓        ↓
Normal    Two-handed candidate
             ↓
     Can missing information
        be inferred safely?
          ┌──┴──┐
         Yes    No
          ↓      ↓
       Partial  Sequential
     Reconstruction Reconstruction
          └──┬───┘
             ↓
       Candidate Meaning
             ↓
       Confidence Check
          ┌──┴──┐
        High    Low
          ↓      ↓
      Translate  Ask for
                 clarification
```

This minimizes unnecessary user effort.

------------------------------------------------------------------------

## 14. Proposed Research Question

> **Can inherently two-handed Indian Sign Language expressions be
> reconstructed from partial or sequential single-hand articulations
> using spatial, temporal, non-manual and conversational context when
> one hand is unavailable?**

This should be treated as a research hypothesis until validated
experimentally.

------------------------------------------------------------------------

## 15. Innovation Boundary

BharatSign should **not** claim that the following are individually
novel:

-   ISL-to-text translation;
-   ISL-to-speech translation;
-   speech/text-to-sign representation;
-   continuous sign recognition;
-   smartphone-based signing;
-   missing-landmark recovery;
-   general video understanding;
-   generic multimodal AI.

These areas already have prior work.

The proposed differentiator is narrower:

> **A mobile interaction and reconstruction framework that deliberately
> captures suitable two-handed ISL information through partial and/or
> sequential one-free-hand articulations and reconstructs the intended
> expression using temporal, spatial, non-manual and contextual
> information.**

This novelty claim must still be validated through a full literature and
patent review before formal submission.

------------------------------------------------------------------------

# PART C --- CURRENT MVP ARCHITECTURE

## 16. Platform Decision

BharatSign Bridge will initially be developed as a **web application**.

Reasons include:

-   rapid development;
-   easy demonstration;
-   no installation requirement;
-   access from phones, tablets and computers;
-   easier SIH deployment and iteration.

------------------------------------------------------------------------

## 17. Immediate MVP AI Strategy

The team does **not** currently have sufficient time to collect a large
ISL dataset and train a reliable custom model before the initial
prototype.

Therefore the first MVP will use an external **multimodal video-capable
AI API**.

A candidate is a Gemini Flash-family multimodal model, but the final
provider must be selected through actual ISL benchmark testing.

The external model is temporary infrastructure, not the long-term
technical core.

Future direction:

``` text
CURRENT MVP

BharatSign
   ↓
AI Provider Interface
   ↓
External Multimodal API


FUTURE

BharatSign
   ↓
AI Provider Interface
   ↓
BharatSign Custom ISL Model
```

A provider abstraction should be implemented so that replacing the
external API does not require redesigning the application.

------------------------------------------------------------------------

## 18. MVP Video Processing Flow

``` text
User Signs
   ↓
Browser Camera
   ↓
Short Video Capture
   ↓
React Frontend
   ↓
HTTPS
   ↓
FastAPI Backend
   ↓
AI Provider Adapter
   ↓
Multimodal AI API
   ↓
Structured Response
   ↓
Validation / Reconstruction Logic
   ↓
Frontend
   ↓
Text / Speech
```

The external API key must **never be placed in frontend code**.

API credentials remain on the backend.

------------------------------------------------------------------------

## 19. Structured AI Output

The backend should request machine-readable output rather than
unrestricted natural-language prose.

Illustrative structure:

``` json
{
  "recognized_meaning": "I need medical assistance",
  "candidate_meanings": [],
  "confidence": "medium",
  "needs_clarification": false,
  "needs_second_component": false
}
```

The exact schema will be finalized during implementation.

The application should validate all model output before using it.

------------------------------------------------------------------------

## 20. Personal Mode with External AI

For sequential reconstruction:

``` text
Capture Component A
        ↓
Temporary Storage

Capture Component B
        ↓

A + B + Capture Metadata
        ↓
FastAPI
        ↓
Reconstruction Prompt
        ↓
Multimodal AI Model
        ↓
Candidate Reconstructed Sign
        ↓
Confidence / Confirmation Logic
        ↓
Meaning
```

The prompt should explicitly explain that the videos are sequential
articulations intended to represent components of an expression that may
normally require simultaneous two-hand articulation.

------------------------------------------------------------------------

## 21. Important Limitation of the API Approach

A general multimodal model being capable of video understanding does
**not** guarantee reliable Indian Sign Language translation.

Therefore the selected model must be benchmarked before the application
depends heavily on it.

The project must distinguish:

``` text
General Video Understanding
          ≠
Reliable ISL Understanding
```

------------------------------------------------------------------------

# PART D --- MODEL BENCHMARK PLAN

## 22. Initial Benchmark Dataset

Before choosing the external AI provider, create a small verified
benchmark.

Suggested composition:

  Category                                 Approx. Samples
  --------------------------------- ----------------------
  One-handed ISL signs                                  10
  Two-handed ISL signs                                  10
  Short ISL expressions/sentences                    5--10
  Similar/confusable signs                               5
  Sequential reconstruction tests     Added after baseline

Every sample must have a reliable ground-truth meaning.

------------------------------------------------------------------------

## 23. Benchmark Rules

Every model should receive:

-   the same videos;
-   the same prompt;
-   the same contextual information;
-   the same requested output schema;
-   comparable inference settings where possible.

Do not manually tune the prompt separately for individual videos after
observing results.

------------------------------------------------------------------------

## 24. Evaluation Categories

Results should distinguish:

-   exact correctness;
-   semantic correctness;
-   incorrect translation;
-   uncertain but safely handled;
-   confident hallucination;
-   failure to interpret.

Example:

``` text
Ground Truth:
"I need water"

Model:
"I want water"

Result:
SEMANTICALLY CORRECT
```

But:

``` text
Ground Truth:
"I need water"

Model:
"I need medicine"

Result:
INCORRECT
```

Confidently incorrect translations should receive special attention
because they are dangerous in sensitive domains.

------------------------------------------------------------------------

## 25. Innovation Benchmark

After establishing normal ISL performance, test selected two-handed
signs under controlled conditions:

1.  Normal two-handed sign.
2.  Dominant/visible hand only.
3.  Other hand component only.
4.  Component A followed by Component B.
5.  Sequential A+B with the BharatSign protocol explained.
6.  Sequential A+B with virtual-anchor/spatial metadata where available.
7.  Sequential input plus conversation context.

Compare:

-   normal recognition accuracy;
-   partial recognition accuracy;
-   sequential reconstruction accuracy;
-   context-assisted reconstruction accuracy;
-   confirmation rate;
-   false-confident output rate.

------------------------------------------------------------------------

# PART E --- TECH STACK

## 26. Immediate Web MVP Stack

### Frontend

-   **React**
-   **TypeScript**
-   **Vite**
-   **Tailwind CSS**

### Browser Capabilities

-   MediaDevices / `getUserMedia()` for camera access
-   MediaRecorder for short video capture
-   Canvas where visual overlays are required
-   Web Speech APIs where suitable for prototype speech interaction

### Backend

-   **Python**
-   **FastAPI**
-   Pydantic-based request/response validation
-   REST APIs
-   WebSocket only where genuinely required

### AI

-   External multimodal video-capable model through a backend provider
    adapter
-   Initial candidate: Gemini Flash-family model
-   Final provider selected through benchmark testing

### Database

-   **PostgreSQL**

### Python Database Layer

-   **SQLAlchemy 2**
-   **Alembic**

### Storage

-   S3-compatible object storage if persistent media/model assets become
    necessary

Raw conversation videos should not be permanently stored by default.

### Testing

-   **Vitest** --- frontend unit testing
-   **Playwright** --- browser/end-to-end testing
-   **Pytest** --- backend testing

### Infrastructure

-   **Docker**
-   **GitHub Actions**
-   Git/GitHub

------------------------------------------------------------------------

## 27. Future Custom ML Stack

Once the project progresses beyond the SIH prototype:

-   Python
-   PyTorch
-   OpenCV
-   NumPy
-   Pandas
-   MediaPipe for structured visual feature extraction where appropriate
-   ONNX export
-   ONNX Runtime Web for browser inference
-   WebGPU acceleration with WASM fallback
-   MLflow for experiment tracking
-   DVC for dataset/model versioning

The long-term objective is to progressively move recognition and
reconstruction toward BharatSign-owned models and on-device/browser
inference.

------------------------------------------------------------------------

# PART F --- DATA MODEL CONCEPTS

## 28. Sign Metadata

A future structured sign vocabulary may contain:

``` text
Sign
├── sign_id
├── meaning
├── domain
├── handedness
├── one_handed
├── two_handed_symmetric
├── two_handed_asymmetric
├── two_handed_interactive
├── partially_inferable
├── sequentially_decomposable
├── dominant_component
├── secondary_component
├── reconstruction_strategy
├── known_variants
└── validation_status
```

This metadata can become important when BharatSign moves from a general
multimodal API to its own specialized models.

------------------------------------------------------------------------

# PART G --- PRIVACY AND SAFETY

## 29. Privacy Principles

Sign-language video may contain:

-   the user's face;
-   surroundings;
-   conversations;
-   health information;
-   financial information;
-   personal information.

Therefore:

-   do not store raw videos by default;
-   transmit only when required for the selected AI provider;
-   use HTTPS;
-   keep API credentials server-side;
-   clearly inform users when video is processed by an external
    provider;
-   obtain explicit consent before using recordings as training data;
-   provide a future path toward local/browser inference.

------------------------------------------------------------------------

## 30. Safety Principles

BharatSign must avoid overconfident translation.

Especially in:

-   healthcare;
-   emergency situations;
-   banking;
-   legal/public-service interactions.

When uncertain:

> **Ask --- do not invent.**

The confidence and clarification system is therefore a functional
requirement, not merely a UI enhancement.

------------------------------------------------------------------------

# PART H --- SIH PROTOTYPE SCOPE

## 31. What the SIH Prototype Should Demonstrate

The prototype should demonstrate a coherent communication workflow
rather than claim universal ISL translation.

### Demonstration 1 --- Standard ISL Communication

Both hands available → sign captured → external model interprets →
text/speech displayed.

### Demonstration 2 --- Personal Mode

User holds the phone → one hand unavailable → BharatSign recognizes that
the interaction differs from standard two-hand capture.

### Demonstration 3 --- Partial Reconstruction

A suitable sign is interpreted from the available hand plus context.

### Demonstration 4 --- Sequential Reconstruction

The system requests another component → first component is stored →
second component is captured → observations are combined → candidate
meaning is reconstructed.

### Demonstration 5 --- Virtual Anchor

The first component is visually preserved so that the second component
can be positioned relative to it.

### Demonstration 6 --- Confidence Handling

Ambiguous input causes BharatSign to request clarification instead of
confidently outputting an unsupported translation.

### Demonstration 7 --- Reverse Communication

A non-ISL user speaks/types → BharatSign presents an ISL-oriented visual
response.

------------------------------------------------------------------------

## 32. What the SIH Prototype Should NOT Claim

Do not claim:

-   complete ISL coverage;
-   perfect real-time translation;
-   replacement for professional interpreters in every high-stakes
    situation;
-   universal reconstruction of every two-handed sign;
-   that Gemini or another general multimodal model is an
    ISL-specialized model;
-   that all two-handed signs can be decomposed sequentially;
-   that the innovation has been proven before experimental validation.

------------------------------------------------------------------------

# PART I --- FEASIBILITY

## 33. High-Feasibility Components

-   web camera capture;
-   short-video recording;
-   backend API integration;
-   text/speech output;
-   contextual modes;
-   structured AI responses;
-   confirmation workflow;
-   ghost/anchor UI;
-   provider abstraction;
-   normal one-handed interaction workflow.

## 34. Moderate-Feasibility Components

-   partial two-handed sign inference;
-   sequential articulation reconstruction;
-   preservation of spatial relationships;
-   reliable context-assisted reconstruction.

These require experimentation.

## 35. Long-Term / Research-Heavy Components

-   unrestricted continuous ISL translation;
-   very large vocabulary;
-   robust regional variation handling;
-   highly accurate custom ISL models;
-   production-grade real-time browser inference;
-   natural 3D avatar signing.

------------------------------------------------------------------------

# PART J --- DEVELOPMENT PRIORITIES

## 36. Recommended Order

### Phase 1 --- Validate the External Model

Build the benchmark and determine whether the selected API can interpret
enough ISL for the MVP.

### Phase 2 --- Build Standard Communication

Implement camera → backend → AI → structured interpretation → frontend.

### Phase 3 --- Build Personal Mode

Implement the one-hand interaction workflow.

### Phase 4 --- Build Sequential Capture

Capture and associate multiple components.

### Phase 5 --- Build Virtual Anchor

Add spatial guidance for sequential articulation.

### Phase 6 --- Add Confidence and Context

Prevent unsafe guesses and improve candidate ranking.

### Phase 7 --- Add Reverse Communication

Speech/text → ISL-oriented visual representation.

### Phase 8 --- Evaluate

Measure performance and document limitations.

### Phase 9 --- Custom Model Research

After the MVP, begin collecting/curating data and developing
BharatSign-owned recognition and reconstruction models.

------------------------------------------------------------------------

# PART K --- CORE PROJECT IDENTITY

## 37. Working Name

**BharatSign Bridge**

## 38. One-Line Description

> **A web-based bidirectional Indian Sign Language communication
> platform that explores partial and sequential one-hand reconstruction
> to enable mobile signing when one hand is occupied holding the
> device.**

## 39. Core Value Proposition

BharatSign does not merely ask:

> "Can AI translate Indian Sign Language?"

It asks:

> **"How can an ISL user communicate naturally through a personal device
> when the physical act of holding that device removes one of the hands
> required for signing?"**

The project attempts to solve that problem through an adaptive
combination of normal recognition, partial-sign inference, sequential
articulation reconstruction, virtual spatial anchoring, conversational
context and confidence-aware clarification.

------------------------------------------------------------------------

# PART L --- VALIDATION REQUIREMENTS

Before making strong technical or novelty claims, the team must:

-   consult ISL users, interpreters or qualified experts;
-   verify the linguistic structure of selected two-handed signs;
-   determine which signs can genuinely be decomposed;
-   validate whether sequential articulation remains understandable;
-   benchmark candidate multimodal APIs;
-   conduct a fresh academic prior-art review;
-   conduct a fresh patent search;
-   document datasets and licenses;
-   measure reconstruction accuracy;
-   measure false-confident translations;
-   test actual phone-holding positions;
-   test different lighting/background conditions;
-   document privacy and consent procedures;
-   verify the final official SIH 2026 Student Innovation theme/category
    at submission time.

------------------------------------------------------------------------

# 40. Final Project Principle

> **The strongest version of BharatSign Bridge is not the one that
> claims to understand every sign. It is the one that identifies a real
> accessibility constraint, introduces a defensible method for
> addressing it, measures where that method works and fails, and
> provides a practical communication experience around those
> limitations.**
