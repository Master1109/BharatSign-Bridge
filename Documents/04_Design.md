# BharatSign Bridge - Design Document

## 1. Introduction

This document outlines the User Interface (UI) and User Experience (UX) design for BharatSign Bridge, including detailed component specifications, design system elements, interaction patterns, and accessibility considerations. The design aims to create an intuitive, accessible, and inclusive communication platform for ISL and non-ISL users.

## 2. Design Principles

### 2.1 Core Principles
- **Accessibility First**: WCAG 2.1 AA compliance as minimum standard
- **Clarity over Creativity**: Prioritize understandable interfaces
- **Consistency**: Predictable interactions across the platform
- **Feedback**: Immediate and clear response to user actions
- **Error Prevention**: Help users avoid mistakes before they happen
- **Inclusivity**: Design for diverse abilities, ages, and cultural contexts
- **Privacy-Forward**: Clear indicators when video/audio is being captured
- **Context-Aware**: Adapt interface based on usage context

### 2.2 User-Centered Approach
- Design for ISL users who may be holding device with one hand
- Accommodate varying levels of ISL proficiency
- Support non-ISL users with no prior sign language knowledge
- Consider environmental factors (lighting, noise, distractions)
- Provide multiple input/output modalities

## 3. Design System

### 3.1 Color Palette
Primary colors chosen for accessibility and cultural resonance:

| Color | Hex | Usage | WCAG Contrast Ratio |
|-------|-----|-------|---------------------|
| **Primary Blue** | #2563EB | Main actions, links, active states | 4.5:1 on white |
| **Secondary Green** | #10B981 | Success states, confirmation buttons | 4.5:1 on white |
| **Warning Amber** | #F59E0B | Caution, medium confidence states | 4.5:1 on white |
| **Error Red** | #EF4444 | Error states, destructive actions | 4.5:1 on white |
| **Info Indigo** | #6366F1 | Informational elements, secondary actions | 4.5:1 on white |
| **Background** | #F8FAFC | Main background | N/A |
| **Surface** | #FFFFFF | Cards, modals, elevated elements | N/A |
| **Text Primary** | #1E293B | Main text, icons | 4.5:1 on background |
| **Text Secondary** | #64748B | Secondary text, disabled elements | 4.5:1 on background |
| **Border** | #E2E8F0 | Dividers, input borders | 3:1 on background |
| **Ghost/Anchor** | #3B82F680 | Translucent sequential component aid (40% opacity) | N/A |

### 3.2 Typography
Using system fonts for performance and familiarity, with accessible scales:

| Type | Font Weight | Size (rem) | Size (px) | Line Height | Usage |
|------|-------------|------------|-----------|-------------|-------|
| **Display Large** | 600 | 2.25 | 36 | 1.2 | Page headers, major section titles |
| **Display Medium** | 600 | 1.875 | 30 | 1.3 | Section headers, dialog titles |
| **Display Small** | 600 | 1.5 | 24 | 1.4 | Card titles, moderate emphasis |
| **Headline Large** | 500 | 1.375 | 22 | 1.4 | Subsection headers, important labels |
| **Headline Medium** | 500 | 1.25 | 20 | 1.5 | Form labels, navigation items |
| **Headline Small** | 500 | 1.125 | 18 | 1.5 | Input labels, secondary headers |
| **Body Large** | 400 | 1.125 | 18 | 1.6 | Body text, paragraph content |
| **Body Medium** | 400 | 1 | 16 | 1.5 | Standard body text, form helper text |
| **Body Small** | 400 | 0.875 | 14 | 1.4 | Captions, auxiliary information |
| **Label Large** | 500 | 1 | 16 | 1.5 | Form field labels, button text |
| **Label Medium** | 500 | 0.875 | 14 | 1.4 | Secondary labels, tag text |
| **Label Small** | 500 | 0.75 | 12 | 1.3 | Footnotes, very small text |

All text scales up to 200% without loss of functionality or content.

### 3.3 Spacing and Grid
Based on 4px baseline grid for consistency:

| Token | Pixels | REM | Usage |
|-------|--------|-----|-------|
| **spacing-0** | 0 | 0 | No spacing |
| **spacing-1** | 4 | 0.25 | Dense compact spacing |
| **spacing-2** | 8 | 0.5 | Compact spacing |
| **spacing-3** | 12 | 0.75 | Default spacing |
| **spacing-4** | 16 | 1 | Standard spacing (base unit) |
| **spacing-5** | 20 | 1.25 | Comfortable spacing |
| **spacing-6** | 24 | 1.5 | Spacious spacing |
| **spacing-8** | 32 | 2 | Section spacing |
| **spacing-10** | 40 | 2.5 | Large section spacing |
| **spacing-12** | 48 | 3 | Major section spacing |
| **spacing-16** | 64 | 4 | Page margins |

#### Layout Grid
- **Container Width**: 1200px max width with fluid scaling
- **Columns**: 12-column grid (60px column width, 20px gutter)
- **Breakpoints**:
  - Mobile: <640px
  - Tablet: 640px - 1024px
  - Desktop: >1024px
  - Large Desktop: >1440px

### 3.4 Elevation and Shadows
Subtle depth for layering:

| Level | Shadow | Usage |
|-------|--------|-------|
| **level-0** | none | Inline elements, backgrounds |
| **level-1** | 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1) | Cards, buttons, inputs |
| **level-2** | 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.06) | Elevated cards, dropdowns |
| **level-3** | 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.05) | Modals, drawers |
| **level-4** | 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04) | Large modals, full-screen overlays |

### 3.5 Border Radius
Consistent rounding for softness:

| Radius | Pixels | REM | Usage |
|--------|--------|-----|-------|
| **none** | 0 | 0 | Hairlines, dividers |
| **sm** | 4 | 0.25 | Inputs, small buttons |
| **md** | 8 | 0.5 | Default cards, buttons |
| **lg** | 12 | 0.75 | Larger containers, modals |
| **full** | 9999 | 625 | Circular avatars, badges |

### 3.6 Iconography
- **Style**: Outline style with 2px stroke for consistency
- **Size**: 
  - Small: 16px (for inline with text)
  - Medium: 20px (buttons, controls)
  - Large: 24px (navigation, prominent actions)
- **Set**: Custom ISL-friendly icons supplemented with open-source sets (Heroicons, Material Symbols)
- **Meaning**: Icons paired with text labels for accessibility

### 3.7 Interaction States
All interactive elements have defined states:

| State | Properties |
|-------|------------|
| **Default** | Base styling |
| **Hover** | +spacing-1 elevation change, 10% opacity overlay (pointer devices only) |
| **Focus** | 2px solid outline (Primary Blue), 2px offset from element |
| **Pressed/Active** | 20% opacity overlay, slight scale reduction (98%) |
| **Disabled** | 50% opacity, cursor: not-allowed, no hover/focus states |
| **Loading** | Show spinner overlay, disable interaction |
| **Error** | Border/Text in Error Red, with optional icon |

## 4. UI Layouts

### 4.1 Main Application Layout
Responsive layout adapting to screen size:

```
+------------------------------------------------------------------+
| Header (sticky)                                                  |
|  [Logo]       [Title]        [Spacer]   [User Menu]   [Context]  |
+------------------------------------------------------------------+
| Main Content Area                                                |
|  +------------------------+  +------------------------+          |
|  | Video Preview Panel    |  | Communication Panel    |          |
|  | - Camera feed          |  | - ISL → Text/Speech    |          |
|  | - Controls overlay     |  | - Text/Speech → ISL    |          |
|  | - Mode indicators      |  | - Confidence indicators|          |
|  +------------------------+  +------------------------+          |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | Conversation History                                       |  |
|  | - Timestamps                                               |  |
|  | - Message bubbles (ISL/text/speech)                       |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
| Footer (optional)                                                |
|  [Help]   [Privacy]   [Terms]   [Language]                      |
+------------------------------------------------------------------+
```

### 4.2 Breakpoint Adaptations

#### Mobile (<640px)
- Single column layout
- Video preview full width above communication panel
- Bottom navigation for core actions
- Collapsible conversation history
- Larger touch targets (minimum 48x48px)

#### Tablet (640px-1024px)
- Two-column layout with video preview taking 60% width
- Communication panel 40% width
- Side navigation optionally collapsible
- Conversation history as expandable section

#### Desktop (>1024px)
- Three-panel layout: Video (40%) | Communication (35%) | History (25%)
- Fixed side navigation for settings/context
- Resizable panels with splitter bars
- Persistent conversation history

### 4.3 Key Screens

#### 4.3.1 Onboarding / Permission Screen
- Clear explanation of camera/microphone necessity
- Visual guide showing proper device positioning
- One-tap permission requests with rationale
- Alternative input methods shown if permissions denied
- Skip option for guest usage

#### 4.3.2 Main Communication Interface
**Video Preview Panel**:
- Live camera feed with 16:9 aspect ratio
- Semi-transparent overlay showing hand detection zones
- Record button (circular, primary color) with pulse animation
- Switch camera button (top corner)
- Microphone mute/unmute toggle
- Mini-preview of last captured component in sequential mode
- Ghost/anchor display area (center of feed)
- Mode indicator badge (Standard/Personal)
- Context selector dropdown (top corner)

**Communication Panel**:
- ISL → Text/Speech section:
  - Large text display area (minimum 48px height)
  - Confidence indicator (color-coded dot + label)
  - Speaker button for text-to-speech output
  - Copy text button
  - "Needs clarification?" button (appears for medium confidence)
- Text/Speech → ISL section:
  - Input field with speech-to-text button
  - Language selector for output
  - Speed control for ISL representation playback
  - Repeat button (1x, 2x, 3x)
- Conversation controls:
  - New conversation button
  - Save/export conversation
  - Clear history

**Conversation History Panel**:
- Chronological list of exchanges
- Alternating background colors for readability
- Avatar/user identification (initials or photo)
- Timestamp formatting (relative then absolute)
- Expand/collapse for long messages
- Menu for sharing, copying, deleting individual messages
- Loading indicator for older messages
- Empty state illustration with guidance

#### 4.3.3 Sequential Mode Interface
- Prominent instructional banner at top
- Step indicator (1/2, 2/2)
- Large "Sign Component A" or "Sign Component B" prompt
- Countdown timer before capture (3-2-1-GO)
- Visual feedback during capture (recording dot, timer)
- Ghost component display (after Component A):
  - Translucent rendering of first component
  - Position locked to where it was signed
  - Fade-out animation after Component B capture
- Spatial guidance hints ("Move your hand relative to the ghost")
- Error states with specific guidance (too fast, unclear, etc.)
- Success animation when both components captured
- Confidence display with clarification options

#### 4.3.4 Settings Interface
Organized into logical sections:

**Account & Privacy**:
- Toggle: Save conversation history
- Toggle: Allow use of recordings for improvement (requires explicit consent)
- Button: Download my data
- Button: Delete account
- Section: Privacy policy link

**Accessibility**:
- Toggle: High contrast mode
- Slider: Text scaling (100%-200%)
- Toggle: Reduced motion
- Toggle: Screen reader optimizations
- Toggle: Captions for speech output
- Toggle: Vibration feedback (if device supports)

**Communication**:
- Dropdown: Default context (General, Healthcare, Education, etc.)
- Dropdown: Primary language (English, Hindi, Gujarati, etc.)
- Dropdown: Secondary language
- Slider: Message auto-clear delay (None, 30s, 1min, 5min)
- Toggle: Show confidence indicators
- Toggle: Auto-play speech output

**Advanced**:
- Toggle: Developer mode (shows technical details)
- Dropdown: AI provider selection (when multiple configured)
- Button: Clear cached data
- Section: Version information
- Button: Check for updates

#### 4.3.5 Error and Empty States
Consistent pattern for all error/empty states:

**Structure**:
- Illustrative icon or animation (64px-96px)
- Primary message (Header Large, clear and actionable)
- Secondary message (Body Medium, explanatory)
- Primary action button (if applicable)
- Secondary action/link (if applicable)

**Types**:
- **Permissions Missing**: Guide to enable camera/microphone
- **No Camera Detected**: Instructions for external webcams or mobile alternatives
- **Network Error**: Retry button, offline queue explanation
- **Service Unavailable**: Estimated restoration time, contact support
- **Processing Error**: Simplify input suggestion, retry option
- **Empty History**: Illustration + "Start your first conversation" prompt
- **No Matches Found**: Suggestion to try different signing or context
- **Low Confidence**: Guidance on how to improve signing clarity

## 5. Component Specifications

### 5.1 Atomic Components

#### 5.1.1 Button
**Variants**:
- **Primary**: Primary Blue background, white text
- **Secondary**: Transparent, Primary Blue text, border on hover
- **Success**: Secondary Green background, white text
- **Warning**: Warning Amber background, white text
- **Error**: Error Red background, white text
- **Ghost**: Transparent, no border, text color only (for text links)

**Sizes**:
- **xs**: 24px height, 16px horizontal padding, Label Small
- **sm**: 28px height, 20px horizontal padding, Label Medium
- **md**: 36px height, 24px horizontal padding, Label Base (default)
- **lg**: 44px height, 32px horizontal padding, Label Large
- **xl**: 52px height, 40px horizontal padding, Label Large+

**States**: All standard interaction states with appropriate transitions
**Icons**: Optional leading/trailing icons (8px-20px based on button size)
**Loading**: Spinner replaces text content, maintains button dimensions

#### 5.1.2 Input Field
**Types**: Text, password, email, tel, url, search, textarea
**Variants**:
- **Outlined**: Default 1px Border color, transparent background
- **Filled**: Background color Surface Variant, 1px border
- **Underlined**: 1px bottom border only, transparent background

**Sizes**:
- **xs**: 28px height, Label Small, spacing-1 internal padding
- **sm**: 32px height, Label Medium, spacing-2 internal padding
- **md**: 36px height, Label Base, spacing-3 internal padding (default)
- **lg**: 44px height, Label Large, spacing-4 internal padding
- **xl**: 52px height, Label Large+, spacing-5 internal padding

**Features**:
- Label with required indicator (*)
- Helper text (below input)
- Error message (below helper text, Error Red)
- Prefix/suffix icons or text
- Clearable input (x button in suffix when not empty)
- Password toggle visibility
- Character counter (for textarea/limited inputs)
- Autocomplete/autosuggest dropdown

#### 5.1.3 Toggle / Switch
**Dimensions**: 40px width × 20px height
**States**:
- **Off**: Background Border color, circle at left (spacing-1 from edge)
- **On**: Background Primary Blue, circle at right (spacing-1 from edge)
- **Disabled**: 50% opacity, no hover/focus
- **Hover**: +spacing-1 elevation (pointer devices)
- **Focus**: 2px solid outline (Primary Blue)

**Label**: Positioned to right with spacing-3 gap, Label Medium

#### 5.1.4 Badge
**Variants**:
- **Primary**: Primary Blue background, white text
- **Secondary**: Transparent, Primary Blue text, 1px border
- **Success**: Secondary Green background, white text
- **Warning**: Warning Amber background, white text
- **Error**: Error Red background, white text
- **Info**: Info Indigo background, white text

**Sizes**:
- **sm**: 16px height, Label Small, spacing-1 horizontal padding
- **md**: 20px height, Label Base, spacing-2 horizontal padding
- **lg**: 24px height, Label Large, spacing-3 horizontal padding

**Shapes**:
- **Rectangle**: Default sm radius (4px)
- **Rounded**: Full radius (pill shape)
- **Dot**: 8px×8px circle (for status indicators)

#### 5.1.5 Avatar
**Sizes**:
- **xs**: 24px×24px
- **sm**: 32px×32px
- **md**: 40px×40px (default)
- **lg**: 48px×48px
- **xl**: 64px×64px

**Variants**:
- **Image**: Circular crop with fallback to initials
- **Initials**: 2-character display on colored background (based on name hash)
- **Icon**: Custom icon or letter inside circle
- **Status Indicator**: Small dot (8px) in bottom-right corner:
  - Green: Online/Active
  - Yellow: Idle/Away
  - Red: Offline/Busy
  - Gray: Unknown/Offline

#### 5.1.6 Loading Indicators
**Types**:
- **Spinner**: Circular, 2px stroke, Primary Blue
  - **xs**: 20px×20px
  - **sm**: 24px×24px
  - **md**: 32px×32px (default)
  - **lg**: 48px×48px
  - **xl**: 64px×64px
- **Bar**: Horizontal progress bar, 4px height, Primary Blue
- **Skeleton**: Placeholder blocks matching expected content shape
  - Text: Rectangular blocks with shimmer animation
  - Image: Gray rectangles with shimmer
  - Avatar: Circular placeholder with shimmer

#### 5.1.7 Toast / Snackbar
**Position**: Bottom-center (mobile), bottom-right (desktop)
**Dimensions**: Minimum height 48px, max-width 80% of viewport
**Background**: Surface color with level-2 elevation
**Border**: Left accent bar (4px width) indicating type:
- Primary Blue: Info
- Secondary Green: Success
- Warning Amber: Warning
- Error Red: Error
**Content**:
- Leading icon (optional)
- Message (Body Medium)
- Dismiss action (Text Secondary, right-aligned)
**Behavior**:
- Auto-dismiss after 5000ms (configurable)
- Pause timer on hover/focus
- Swipe to dismiss (touch devices)
- Stack multiple toasts (max 3 visible)
- Accessible aria-live region

### 5.2 Molecular Components

#### 5.2.1 VideoPreview
**Props**:
- `videoStream`: MediaStream | null
- `isRecording`: boolean
- `recordingTime`: number (seconds)
- `mode`: 'standard' | 'personal'
- `step`: 1 | 2 (for sequential mode)
- `ghostData`: ComponentData | null
- `onToggleCamera`: () => void
- **onToggleMicrophone**: () => void
- `onStartRecording`: () => void
- `onStopRecording`: () => void
- `onSwitchMode`: () => void

**Structure**:
```
<div class="video-preview-container relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden bg-gray-50">
  <video class="w-full h-full object-cover" autoplay playsinline muted></video>
  
  {/* Detection overlay */}
  <div class="absolute inset-0 pointer-events-none">
    {/* Hand detection zones (semi-transparent grids) */}
  </div>
  
  {/* Controls overlay */}
  <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
    <button class="btn btn-primary btn-circle w-12 h-12" onClick={onToggleMicrophone}>
      <MicIcon class="w-5 h-5" />
    </button>
    
    <div class="flex-1 flex justify-center">
      <button 
        class={`btn btn-${isRecording ? 'error' : 'primary'} btn-circle w-14 h-14 pulse-animate`}
        onClick={isRecording ? onStopRecording : onStartRecording}
      >
        {isRecording ? <StopIcon class="w-6 h-6" /> : <RecordIcon class="w-5 h-5" />}
      </button>
      
      {!isRecording && (
        <span class="text-xs text-secondary mx-2">
          {recordingTime}s
        </span>
      )}
    </span>
    
    <button class="btn btn-secondary btn-circle w-10 h-10" onClick={onToggleCamera}>
      <CameraSwitchIcon class="w-4 h-4" />
    </button>
    
    <button class="btn btn-secondary btn-circle w-10 h-10" onClick={onSwitchMode}>
      <ModeIcon class="w-4 h-4" />
    </button>
  </div>
  
  {/* Mode indicator badge */}
  <div class="absolute top-4 left-4 flex items-center gap-2 bg-primary/90 rounded-full px-3 py-1 text-xs text-white">
    <ModeBadgeIcon class="w-3 h-3" />
    <span class="font-medium">{mode}</span>
  </div>
  
  {/* Ghost/Anchor display */}
  {ghostData && (
    <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
      <GhostHandDisplay 
        data={ghostData} 
        opacity={0.4} 
        class="animate-pulse-slow"
      />
    </div>
  )}
  
  {/* Sequential mode prompts */}
  {!isRecording && mode === 'personal' && (
    <div class="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
      <div class="space-y-2">
        <span class="text-base font-medium">Sign Component {step}</span>
        <span class="text-sm">Hold still for 3 seconds...</span>
      </div>
    </div>
  )}
  
  {/* Error/state overlays */}
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    {/* Recording failed, no signal, etc. */}
  </div>
</div>
```

#### 5.2.2 CommunicationDisplay
**Props**:
- `isLToText`: { meaning: string, confidence: 'high'\|'medium'\|'low', needsClarification: boolean }
- `textToIsl`: { url: string \| null, playbackRate: number, isPlaying: boolean }
- `onPlaySpeech`: () => void
- `onCopyText`: () => void
- `onRequestClarification`: () => void
- `onRepeatIsl`: (rate: number) => void
- `onChangePlaybackRate`: (rate: number) => void

**Structure**:
```
<div class="communication-display space-y-6">
  {/* ISL to Text/Speech Section */}
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">ISL → Text/Speech</h3>
      <button class="btn btn-icon btn-secondary p-2" title="Help" onClick={showHelp}>
        <QuestionIcon class="w-4 h-4" />
      </button>
    </div>
    
    <div class="bg-surface/50 rounded-lg p-4 min-h-[80px] flex items-center justify-center text-center">
      {isLToText.meaning ? (
        <div class="text-xl font-medium break-words">
          {isLToText.meaning}
        </div>
      ) : (
        <div class="text-secondary italic">
          Waiting for sign...
        </div>
      )}
    </div>
    
    <div class="flex items-center gap-3">
      <span class="px-3 py-1 rounded-full text-xs font-medium 
        {isLToText.confidence === 'high' ? 'bg-success/20 text-success' 
         : isLToText.confidence === 'medium' ? 'bg-warning/20 text-warning' 
         : 'bg-error/20 text-error'}"
      >
        {isLToText.confidence} confidence
      </span>
      
      {isLToText.needsClarification && (
        <button 
          class="btn btn-outline btn-warning px-3 py-1 rounded text-sm"
          onClick={onRequestClarification}
        >
          Needs clarification
        </button>
      )}
    </div>
    
    <div class="flex items-center gap-3">
      <button 
        class="btn btn-icon btn-secondary p-2"
        title="Play audio"
        onClick={onPlaySpeech}
        disabled={!isLToText.meaning}
      >
        <VolumeUpIcon class="w-4 h-4" />
      </button>
      
      <button 
        class="btn btn-icon btn-secondary p-2"
        title="Copy text"
        onClick={onCopyText}
        disabled={!isLToText.meaning}
      >
        <CopyIcon class="w-4 h-4" />
      </button>
    </div>
  </section>
  
  {/* Divider */}
  <div class="h-px bg-border my-6"></div>
  
  {/* Text/Speech to ISL Section */}
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">Text/Speech → ISL</h3>
      <button class="btn btn-icon btn-secondary p-2" title="Help" onClick={showHelp}>
        <QuestionIcon class="w-4 h-4" />
      </button>
    </div>
    
    <div class="flex gap-3">
      <input
        type="text"
        class="flex-1 input input-md placeholder-secondary focus:outline-primary"
        placeholder="Type or speak your message..."
        aria-label="Message input"
      />
      <button 
        class="btn btn-icon btn-primary p-2"
        title="Speak"
        onClick={toggleSpeechInput}
        aria-label="Toggle speech input"
      >
        <MicIcon class="w-4 h-4" />
      </button>
    </div>
    
    <div class="flex items-center gap-3 mt-2">
      <label class="text-sm text-secondary">Speed:</label>
      <select 
        class="select select-sm border border-border rounded"
        value={playbackRate}
        onChange={onChangePlaybackRate}
        aria-label="Playback speed"
      >
        <option value="0.75">0.75x</option>
        <option value="1.0" selected>1.0x</option>
        <option value="1.25">1.25x</option>
        <option value="1.5">1.5x</option>
        <option value="2.0">2.0x</option>
      </select>
      
      <button 
        class="btn btn-icon btn-secondary p-2"
        title="Play ISL"
        onClick={onRepeatIsl}
        disabled={!textToIsl.url}
      >
        <PlayIcon class="w-4 h-4" />
        {textToIsl.isPlaying && <PauseIcon class="w-4 h-4 ml-2" />}
      </button>
      
      <button 
        class="btn btn-icon btn-secondary p-2"
        title="Repeat 2x"
        onClick={() => onRepeatIsl(2)}
        disabled={!textToIsl.url}
      >
        <Repeat2Icon class="w-4 h-4" />
      </button>
    </div>
    
    {textToIsl.url && (
      <div class="mt-4">
        <div class="w-full h-[200px] bg-surface/50 rounded-lg flex items-center justify-center relative">
          <video 
            class="w-full h-full object-contain"
            src={textToIsl.url}
            muted
            loop
            playsInline
          />
          <div class="absolute inset-0 flex items-end justify-center pb-2">
            <ProgressBar 
              value={playbackProgress} 
              height="2" 
              color="primary" 
              class="w-[80%]"
            />
          </div>
        </div>
        
        <div class="flex items-center gap-2 mt-2 text-sm text-secondary">
          <span class="whitespace-nowrap">
            {currentTime} / {duration}
          </span>
        </div>
      </div>
    )}
  </section>
</div>
```

#### 5.2.3 ConversationHistory
**Props**:
- `messages`: Array<Message>
- `onLoadMore`: () => void
- `onMessageAction`: (messageId: string, action: 'copy'\|'delete'\|'share') => void
- `isLoading`: boolean
- `hasMore`: boolean

**Structure**:
```
<div class="conversation-history space-y-4">
  {/* Header */}
  <div class="flex items-center justify-between pb-2 border-b border-border">
    <h3 class="text-lg font-semibold">Conversation</h3>
    <div class="flex items-center gap-2 text-sm text-secondary">
      <button 
        class="btn btn-icon btn-secondary p-1"
        title="Clear conversation"
        onClick={clearConversation}
      >
        <TrashIcon class="w-3 h-3" />
      </button>
      <button 
        class="btn btn-icon btn-secondary p-1"
        title="Export conversation"
        onClick={exportConversation}
      >
        <DownloadIcon class="w-3 h-3" />
      </button>
    </div>
  </div>
  
  {/* Messages List */}
  <div class="space-y-4 max-h-[400px] overflow-y-auto">
    {messages.map(message => (
      <MessageBubble 
        key={message.id}
        message={message}
        onAction={onMessageAction}
      />
    ))}
    
    {/* Loading indicator */}
    {isLoading && !messages.length && (
      <div class="flex items-center justify-center py-8">
        <Spinner class="w-8 h-8" />
        <span class="ml-2 text-sm">Loading conversation...</span>
      </div>
    )}
    
    {/* Empty state */}
    {messages.length === 0 && !isLoading && (
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <Illustration name="empty-conversation" class="w-24 h-24 text-secondary/50" />
        <p class="mt-4 text-center text-sm text-secondary">
          Start your first conversation by signing or typing a message.
        </p>
        <button 
          class="btn btn-outline btn-primary mt-4"
          onClick={focusInput}
        >
          Begin conversation
        </button>
      </div>
    )}
    
    {/* Load more indicator */}
    {hasMore && !isLoading && (
      <button 
        class="btn btn-block btn-outline btn-secondary mt-4"
        onClick={onLoadMore}
      >
        Load older messages
      </button>
    )}
    
    {/* Loading more */}
    {isLoading && hasMore && (
      <div class="flex items-center justify-center py-4">
        <Spinner class="w-6 h-6" />
        <span class="ml-2 text-sm">Loading more messages...</span>
      </div>
    )}
  </div>
</div>
```

#### 5.2.4 MessageBubble
**Props**:
- `message`: Message (with id, type, content, timestamp, isUser)
- `onAction`: (messageId: string, action: 'copy'\|'delete'\|'share') => void

**Structure**:
```
<div 
  class={`flex ${
    message.isUser ? 'justify-end' : 'justify-start'
  } mb-4`}
>
  <div 
    class={`${[
      'max-w-[70%]',
      'rounded-lg',
      'px-4',
      'py-2',
      message.isUser ? 'bg-primary/10 text-primary' : 'bg-surface/50 text-primary',
      'break-words'
    ].join(' ')}`
  }
    style={{ 
      position: 'relative'
    }}
  >
    {/* Message content based on type */}
    {message.type === 'text' && (
      <p class="whitespace-pre-wrap break-words">{message.content}</p>
    )}
    
    {message.type === 'isl-video' && (
      <div class="relative w-[200px] h-[150px]">
        <video 
          class="w-full h-full object-contain rounded"
          src={message.content.url}
          muted
          loop
          playsInline
        />
        <button 
          class="absolute top-2 right-2 p-1 bg-white/70 rounded-full hover:bg-white/90"
          onClick={() => playVideo(message.content.url)}
          aria-label="Play video"
        >
          <PlayIcon class="w-3 h-3" />
        </button>
        <div class="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
          <ProgressBar 
            value={playbackProgress} 
            height="2" 
            color="primary" 
            class="w-[80%]"
          />
        </div>
      </div>
    )}
    
    {message.type === 'system' && (
      <p class="text-xs text-secondary/60 text-center italic">
        {message.content}
      </p>
    )}
    
    {/* Timestamp */}
    <div class="absolute bottom-0 right-0 -mb-1 text-xs text-secondary/50">
      {formatTimestamp(message.timestamp)}
    </div>
    
    {/* Action menu (on hover/focus) */}
    <div 
      class={`absolute top-0 right-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity 
        pointer-events-none`}
    >
      <div class="flex space-x-1">
        <button 
          class="btn btn-icon btn-secondary p-1 hover:bg-primary/10"
          title="Copy"
          onAction={() => onAction(message.id, 'copy')}
        >
          <CopyIcon class="w-3 h-3" />
        </button>
        <button 
          class="btn btn-icon btn-secondary p-1 hover:bg-primary/10"
          title="Delete"
          onAction={() => onAction(message.id, 'delete')}
        >
          <TrashIcon class="w-3 h-3" />
        </button>
        <button 
          class="btn btn-icon btn-secondary p-1 hover:bg-primary/10"
          title="Share"
          onAction={() => onAction(message.id, 'share')}
        >
          <ShareIcon class="w-3 h-3" />
        </button>
      </div>
    </div>
  </div>
  
  {/* Avatar for non-user messages */}
  {!message.isUser && (
    <div 
      class={`flex-shrink-0 mt-1 ${
        message.isUser ? 'ml-3' : 'mr-3'
      }`}
    >
      <Avatar 
        size="md" 
        initials={getInitials(message.senderName)} 
        fallbackIcon={getFallbackIcon(message.type)}
        status={message.senderStatus}
      />
    </div>
  )}
</div>
```

#### 5.2.5 SequentialGuidance
**Props**:
- `step`: 1 \| 2
- `componentData`: ComponentData \| null
- `isCapturing`: boolean
- `onRetry`: () => void
- `onAbort`: () => void

**Structure**:
```
<div class="sequential-guidance space-y-4 text-center">
  {/* Step indicator */}
  <div class="flex items-center justify-center gap-3">
    <div class="w-2 h-2 rounded-full 
      {step === 1 ? 'bg-primary' : 'bg-border'}"
    ></div>
    <div class="w-px h-4 bg-border" />
    <div class="w-2 h-2 rounded-full 
      {step === 2 ? 'bg-primary' : 'bg-border'}"
    ></div>
  </div>
  
  {/* Main instruction */}
  <h3 class="text-xl font-medium">
    Sign Component {step}
  </h3>
  
  {/* Detailed guidance */}
  <p class="text-sm text-secondary max-w-xl">
    {step === 1 ? (
      'Perform the first part of the sign clearly. Hold steady for the countdown.'
    ) : (
      'Now perform the second part, moving your hand relative to the ghost image.'
    )}
  </p>
  
  {/* Ghost/Anchor visualization */}
  {step === 2 && componentData && (
    <div class="relative w-[200px] h-[200px] mx-auto mb-4">
      {/* Ghost component */}
      <div 
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <GhostHandDisplay 
          data={componentData} 
          opacity={0.3} 
          class="animate-pulse"
        />
      </div>
      
      {/* Guidance hints */}
      <div class="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-2">
        <div class="w-[60px] h-[60px] bg-border/50 rounded-full flex items-center justify-center">
          <ArrowIcon class="w-4 h-4 text-primary" />
        </div>
        <span class="mt-1 text-xs text-secondary">
          Move hand here
        </span>
      </div>
    </div>
  )}
  
  {/* Countdown / Recording status */}
  {isCapturing && (
    <div class="space-y-2">
      <div class="text-2xl font-bold text-primary">
        {countdownSeconds}
      </div>
      <p class="text-sm text-secondary">
        Holding steady...
      </p>
    </div>
  )}
  
  {/* Action buttons */}
  <div class="flex items-center justify-center gap-3 mt-4">
    <button 
      class="btn btn-outline btn-secondary px-4 py-2"
      onClick={onRetry}
      disabled={isCapturing}
    >
      Retry
    </button>
    <button 
      class="btn btn-error px-4 py-2"
      onClick={onAbort}
      disabled={isCapturing}
    >
      Abort
    </button>
  </div>
  
  {/* Error state */}
  {error && (
    <div class="mt-4 p-3 bg-error/10 rounded border border-error/20">
      <div class="flex items-center gap-2">
        <WarningIcon class="w-4 h-4 text-error" />
        <span class="text-sm text-error">
          {error}
        </span>
      </div>
    </div>
  )}
  
  {/* Success state */}
  {isSuccess && (
    <div class="mt-4 p-3 bg-success/10 rounded border border-success/20">
      <div class="flex items-center gap-2">
        <CheckIcon class="w-4 h-4 text-success" />
        <span class="text-sm text-success">
          Components captured! Processing...
        </span>
      </div>
    </div>
  )}
</div>
```

### 5.3 Template Components

#### 5.3.1 PageLayout
**Props**:
- `children`: ReactNode
- `showHeader`: boolean (default: true)
- `showFooter`: boolean (default: false)
- `className`: string (default: '')
- `title`: string (optional)

**Structure**:
```
<div class={`${className} min-h-screen flex flex-col bg-background`}>
  {showHeader && (
    <Header 
      title={title} 
      className="border-b border-border"
    />
  )}
  
  <main className="flex-1 flex flex-col overflow-hidden">
    {/* Main content area with optional sidebar */}
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      {children}
    </div>
  </div>
  
  {showFooter && (
    <Footer className="border-t border-border" />
  )}
</div>
```

#### 5.3.2 Header
**Props**:
- `title`: string (optional)
- `showUserMenu`: boolean (default: true)
- `showContextSelector`: boolean (default: true)
- `className`: string (default: '')
- `onContextChange`: (context: string) => void
- `onUserAction`: (action: 'profile'\|'settings'\|'logout') => void

**Structure**:
```
<header className={`${className} flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-surface/50 backdrop-blur-sm`}>
  <div className="flex items-center gap-3">
    <Logo className="w-8 h-8" />
    {title && (
      <h1 className="text-xl font-semibold text-primary hidden sm:block">
        {title}
      </h1>
    )}
  </div>
  
  <div className="hidden sm:flex items-center gap-4">
    {showContextSelector && (
      <div className="relative">
        <label className="sr-only">Communication context</label>
        <select 
          className="select select-sm border border-border rounded px-2 py-1"
          value={currentContext}
          onChange={onContextChange}
          aria-label="Communication context"
        >
          {contexts.map(ctx => (
            <option key={ctx.value} value={ctx.value}>
              {ctx.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ContextIcon className="w-4 h-4 text-secondary" />
        </div>
      </div>
    )}
    
    {showUserMenu && (
      <div className="relative">
        <button 
          className="btn btn-icon btn-secondary p-2 hover:bg-primary/10"
          aria-label="User menu"
          onClick={toggleUserMenu}
        >
          <Avatar 
            size="sm" 
            initials="US" 
            status="online"
          />
        </button>
        
        {/* User menu dropdown */}
        <Menu 
          anchor="top-right"
          className="w-48 mt-1 z-50"
          show={isUserMenuOpen}
          onClose={toggleUserMenu}
        >
          <MenuItem 
            onClick={() => onUserAction('profile')}
            className="flex items-center gap-2 px-3 py-2"
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-sm">Profile</span>
          </MenuItem>
          <MenuItem 
            onClick={() => onUserAction('settings')}
            className="flex items-center gap-2 px-3 py-2"
          >
            <SettingsIcon className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </MenuItem>
          <MenuItem 
            onClick={() => onUserAction('logout')}
            className="flex items-center gap-2 px-3 py-2 text-error"
          >
            <LogoutIcon className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </MenuItem>
          <MenuDivider />
          <MenuItem 
            onClick={switchTheme}
            className="flex items-center gap-2 px-3 py-2"
          >
            <MoonIcon className="w-4 h-4" />
            <span className="text-sm">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
          </MenuItem>
        </Menu>
      </div>
    )}
  </div>
  
  {/* Mobile menu button */}
  <button 
    className="lg:hidden btn btn-icon btn-secondary p-2"
    aria-label="Open menu"
    onClick={toggleMobileMenu}
  >
    <MenuIcon className="w-4 h-4" />
  </button>
</header>
```

## 6. Interaction Patterns

### 6.1 Navigation Patterns
- **Primary Navigation**: Persistent header with contextual actions
- **Secondary Navigation**: Collapsible sidebar (desktop) or bottom navigation (mobile)
- **Breadcrumbs**: Used in multi-step processes (settings, onboarding)
- **Tabs**: Horizontal scrolling tabs for categorization (languages, contexts)
- **Stepper**: Linear progress indicator for multi-step flows (sequential mode)

### 6.2 Input Patterns
- **Form Validation**: Inline validation with clear error messages
- **Progressive Disclosure**: Show advanced options only when needed
- **Input Masks**: For phone numbers, dates, etc.
- **Autocomplete**: For language selection, context selection
- **Voice Input**: Speech-to-text with visual feedback
- **Camera Input**: Visual guides for positioning and lighting

### 6.3 Feedback Patterns
- **Immediate**: Button presses, toggle changes (<100ms)
- **Near-immediate**: Video processing feedback (1-3 seconds)
- **Delayed**: AI processing results (3-5 seconds)
- **Loading States**: Spinners, skeleton loaders, progress bars
- **Success/Error**: Toasts, inline validation, modal confirmations
- **Hover/Focus**: Visual indicators for interactive elements
- **Accessibility**: ARIA live regions for dynamic content updates

### 6.4 Error Handling Patterns
- **Prevention**: Disable invalid options, provide constraints
- **Inline Validation**: Real-time feedback as user types
- **Modal Confirmation**: For destructive actions
- **Toast Notifications**: Non-intrusive feedback for transient states
- **Error Pages**: Dedicated pages for 404, 500, etc. with recovery options
- **Empty States**: Illustrative guidance for zero-data scenarios
- **Retry Mechanisms**: Exponential backoff for failed requests
- **Fallback Options**: Alternative input methods when primary fails

### 6.5 Accessibility Patterns
- **Keyboard Navigation**: Tab order follows visual/logical flow
- **Focus Management**: Trap focus in modals, return focus after dismissal
- **Skip Links**: Hidden "Skip to main content" link
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Live Regions**: For dynamic content like confidence indicators
- **Color Contrast**: All text/meets WCAG 2.1 AA
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Reduced Motion**: Respect prefers-reduced-motion media query
- **Screen Reader Optimization**: Semantic HTML, landmark roles
- **Text Scaling**: Support up to 200% without breaking layout
- **Focus Indicators**: Visible 2px outline on keyboard focus

## 7. Platform-Specific Considerations

### 7.1 Web Browser Support
- **Supported**: Chrome (latest-2), Firefox (latest-2), Safari (latest-2), Edge (latest-2)
- **Features**: 
  - getUserMedia API for camera/microphone
  - MediaRecorder API for video capture
  - Web Speech API for speech recognition/synthesis
  - IndexedDB/Cache API for temporary storage
  - Service Workers for offline capability
  - CSS Grid/Flexbox for layouts
  - CSS Custom Properties for design tokens
  - ES6+ JavaScript features
  - WebAssembly for potential future compute-intensive tasks

### 7.2 Mobile Considerations
- **Touch-First Design**: All controls optimized for touch
- **Viewport Meta Tag**: width=device-width, initial-scale=1.0
- **Safe Area Handling**: Respect device notches, home indicators
- **Orientation Changes**: Adapt layout for portrait/landscape
- **Performance**: Optimize for limited memory and CPU
- **Battery Efficiency**: Minimize unnecessary camera/sensor usage
- **Network Awareness**: Adapt quality based on connection type
- **Progressive Web App**: Installable, offline-capable, background sync

### 7.3 Desktop Considerations
- **Keyboard Shortcuts**: 
  - Cmd/Ctrl + M: Toggle microphone
  - Cmd/Ctrl + K: Toggle camera
  - Cmd/Ctrl + .: Open settings
  - Cmd/Ctrl + Enter: Send message
  - Escape: Close modals/dropdowns
  - Tab/Shift+Tab: Navigate focus
- **Mouse Interactions**: Hover states, right-click context menus
- **Window Management**: Resizable panels, split-screen support
- **Multi-Monitor**: Support for dragging video preview to second monitor
- **Performance**: Leverage additional desktop resources

### 7.4 Accessibility Device Support
- **Screen Readers**: Full support via semantic HTML and ARIA
- **Switch Control**: Navigable via switch devices
- **Voice Control**: Operable via voice commands
- **Eye Tracking**: Compatible with gaze-based interaction
- **Switch Access**: All functions reachable via sequential access
- **Alternative Input Devices**: Support for joysticks, sip-and-puff, etc.

## 8. Implementation Guidelines

### 8.1 Component Development
- **Atomic First**: Build smallest reusable components first
- **Composition**: Combine atoms into molecules, molecules into organisms
- **Consistency**: Use design tokens for all values (no hard-coded pixels/colors)
- **Accessibility**: Build a11y in from the start, not as afterthought
- **Performance**: Lazy load non-critical components, minimize re-renders
- **Testing**: Unit test each component, integration test composed components
- **Documentation**: Storybook entries for each component with variants
- **Theming**: Support dark/light mode via CSS variables
- **Internationalization**: Externalize all strings, support RTL languages

### 8.2 Styling Approach
- **CSS-in-JS**: Using Tailwind CSS for utility-first styling with custom plugin for design tokens
- **CSS Variables**: Define design tokens as CSS properties on :root
- **Modular CSS**: BEM-like naming for component-specific styles
- **Critical CSS**: Extract above-the-fold styles for faster initial paint
- **Dark Mode**: Automatic preference detection with manual override
- **High Contrast Mode**: Media query prefers-contrast: more
- **Reduced Motion**: Media query prefers-reduced-motion: reduce
- **Print Styles**: Optimized print layouts for conversation history

### 8.3 Asset Guidelines
- **Icons**: SVG sprites for performance, accessible with title/desc
- **Illustrations**: Simple line drawings with limited color palette
- **Animations**: 
  - Purposeful (feedback, attention, transitions)
  - Performance-conscious (use transform/opacity)
  - Respect reduced motion preference
  - Maximum 500ms duration for non-essential animations
- **Images**: 
  - WebP format with fallback
  - Optimized for web (<100KB typical)
  - Responsive with srcset
  - Decorative images have empty alt text
- **Fonts**: System fonts primary, fallback to woff2 for specific needs

### 8.4 Performance Budget
- **First Contentful Paint**: <1.5s on 3G
- **Time to Interactive**: <3.5s on 3G
- **Largest Contentful Paint**: <2.5s on 3G
- **Cumulative Layout Shift**: <0.1
- **Total Blocking Time**: <150ms
- **Page Weight**: <1.5MB (HTML+CSS+JS+images)
- **Request Count**: <50 requests
- **JavaScript Bundle**: <100KB gzipped
- **CSS Bundle**: <50KB gzipped

### 8.5 Testing Strategy
- **Unit Testing**: Jest + React Testing Library for components
- **Integration Testing**: Cypress for user flows
- **Accessibility Testing**: axe-core for automated a11y checks
- **Visual Testing**: Storybook + Chromatic for regression detection
- **Performance Testing**: Lighthouse CI for performance budgets
- **Cross-Browser Testing**: BrowserStack for compatibility
- **Device Testing**: Real device lab for touch/performance
- **User Testing**: Regular sessions with ISL and non-ISL users

## 9. Accessibility Compliance Checklist

### 9.1 WCAG 2.1 AA Requirements
| Guideline | Status | Implementation Notes |
|-----------|--------|----------------------|
| **1.1.1 Non-text Content** | ✅ | All icons have aria-label, decorative images have alt="" |
| **1.2.1 Audio-only/Video-only (Prerecorded)** | ⚠️ | Provide transcripts for pre-recorded video content |
| **1.2.2 Captions (Prerecorded)** | ⚠️ | Captions for any pre-recorded audio/video |
| **1.2.3 Audio Description or Media Alternative (Prerecorded)** | ⚠️ | Alternative for time-based media |
| **1.2.4 Captions (Live)** | ⚠️ | Live captions for speech output (if implemented) |
| **1.2.5 Audio Description (Prerecorded)** | ⚠️ | Audio description for video content |
| **1.3.1 Info and Relationships** | ✅ | Proper semantic structure, labels associated with controls |
| **1.3.2 Meaningful Sequence** | ✅ | Logical DOM order matches visual order |
| **1.3.3 Sensory Characteristics** | ✅ | Instructions don't rely solely on shape/sound/position |
| **1.4.1 Use of Color** | ✅ | Color never used as sole visual means of conveying information |
| **1.4.2 Audio Control** | ✅ | No audio plays automatically >3s without mechanism to pause/stop |
| **1.4.3 Contrast (Minimum)** | ✅ | Text and images of text have contrast ratio ≥4.5:1 |
| **1.4.4 Resize text** | ✅ | Text resizable up to 200% without loss of content/function |
| **1.4.5 Images of Text** | ✅ | Images of text only used for decorative/logos where essential |
| **1.4.10 Reflow** | ✅ | Content displays correctly at 320px width |
| **1.4.11 Non-text Contrast** | ✅ | UI components have contrast ratio ≥3:1 against adjacent colors |
| **1.4.12 Text Spacing** | ✅ | Line height/spacing adjustable without loss of content/function |
| **1.4.13 Content on Hover or Focus** | ✅ | Additional content on hover/focus is dismissible, not obstructive |
| **2.1.1 Keyboard** | ✅ | All functionality available via keyboard |
| **2.1.2 No Keyboard Trap** | ✅ | Focus can be moved away using only keyboard |
| **2.1.4 Character Key Shortcuts** | ⚠️ | If implemented, allow remapping/disabling |
| **2.2.1 Timing Adjustable** | ✅ | Time limits adjustable or user can request more time |
| **2.2.2 Pause, Stop, Hide** | ✅ | Moving/blinking/scrolling content can be paused |
| **2.3.1 Three Flashes or Below Threshold** | ✅ | No content flashes more than 3 times per second |
| **2.4.1 Bypass Blocks** | ✅ | Skip link to main content |
| **2.4.2 Page Titled** | ✅ | Descriptive page titles |
| **2.4.3 Focus Order** | ✅ | Focus order logical and sequential |
| **2.4.4 Link Purpose (In Context)** | ✅ | Link purpose clear from surrounding context |
| **2.4.5 Multiple Ways** | ✅ | Multiple ways to locate pages (navigation, search, sitemap) |
| **2.4.6 Headings and Labels** | ✅ | Headings and labels descriptive |
| **2.4.7 Focus Visible** | ✅ | Keyboard focus indicator visible |
| **2.5.1 Pointer Gestures** | ✅ | All functionality usable with single point |
| **2.5.2 Pointer Cancellation** | ✅ | Down-event not essential; up-event can undo |
| **2.5.3 Label in Name** | ✅ | Accessible name contains visible label |
| **2.5.4 Motion Actuation** | ⚠️ | Functionality operable via user motion also available via UI |
| **3.1.1 Language of Page** | ✅ | Language attribute set on html element |
| **3.1.2 Language of Parts** | ⚠️ | Language changes indicated for multilingual content |
| **3.2.1 On Focus** | ✅ | No context change on focus |
| **3.2.2 On Input** | ✅ | No context change on input |
| **3.2.3 Consistent Navigation** | ✅ | Navigational mechanisms consistent across pages |
| **3.2.4 Consistent Identification** | ✅ | Components with same functionality identified consistently |
| **3.3.1 Error Identification** | ✅ | Errors identified in text |
| **3.3.2 Error Suggestion** | ✅ | Suggestions provided for fixing errors |
| **3.3.3 Error Labelling** | ✅ | Error fields clearly identified |
| **3.3.4 Error Prevention (Legal, Financial, Data)** | ✅ | Confirmation for high-stakes actions |
| **4.1.1 Parsing** | ✅ | Complete start/end tags, nested correctly per spec |
| **4.1.2 Name, Role, Value** | ✅ | Name, role, value programmatically determinable |

### 9.2 Testing Procedures
- **Automated**: axe-core integrated into CI/CD pipeline
- **Manual**: Quarterly audits by accessibility specialists
- **User Testing**: Bi-monthly sessions with users of diverse abilities
- **Screen Reader Testing**: Weekly tests with NVDA, JAWS, VoiceOver
- **Keyboard Only**: Daily developer testing with mouse unplugged
- **High Contrast**: Weekly testing with system high contrast modes
- **Color Blind**: Monthly testing with color blindness simulators
- **Zoom Testing**: Weekly testing at 200% zoom

## 10. Localization and Internationalization

### 10.1 Supported Languages
- **Interface**: English (en), Hindi (hi), Gujarati (gu)
- **Future**: Bengali (bn), Tamil (ta), Telugu (te), Marathi (mr), Kannada (kn), Malayalam (ml), Punjabi (pa), Urdu (ur)
- **ISL**: Remains constant as the sign language layer

### 10.2 Implementation Approach
- **Message Format**: JSON files per language in `locales/` directory
- **Fallback**: English as fallback for missing translations
- **Format Functions**: Handle plurals, numbers, dates, currency
- **Directionality**: LTR only (all supported languages are LTR)
- **Date/Time**: Locale-specific formatting
- **Numbers**: Locale-specific decimal/separator handling
- **RTL Preparation**: Code structured to support RTL if needed later

### 10.3 Localization Workflow
1. Extract strings using i18n parser
2. Send to translation team
3. Review translations with native speakers
4. Implement and test in development
5. QA verification in staging
6. Release to production

### 10.4 Special Considerations for ISL Context
- **Cultural Sensitivity**: Avoid gestures/signs that may be offensive
- **Regional Variations**: Allow for ISL dialectal differences
- **Fingerspelling**: Support for regional name/sign variations
- **Classifier Predicates**: Handle ISL-specific grammatical constructs
- **Non-Manual Signals**: Ensure facial expressions are visible in video

## 11. Conclusion

This design document establishes a comprehensive foundation for BharatSign Bridge's user interface and experience. By following these guidelines, the platform will be:

- **Accessible**: Meeting WCAG 2.1 AA standards ensuring usability for people with diverse abilities
- **Usable**: Intuitive interfaces that minimize learning curve and cognitive load
- **Consistent**: Predictable interactions built on a solid design system
- **Inclusive**: Designed for ISL users, non-ISL users, and diverse cultural contexts
- **Performant**: Optimized for speed and responsiveness across devices
- **Maintainable**: Modular, well-documented components that facilitate updates
- **Culturally Responsive**: Respectful of ISL grammar, culture, and communication norms

The design emphasizes clarity, feedback, and error prevention while providing rich communication capabilities. Future iterations can build upon this foundation to add advanced features while maintaining the core usability principles established here.

---
*Document Version: 1.0*
*Last Updated: 2026-09-26*
*Product: BharatSign Bridge*
*Target Release: Production*