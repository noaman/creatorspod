Creators Pod — UX Design System
The Creative Intelligence Interface

Document Overview
Version: 2.0
Last Updated: March 2026
Purpose: Define the complete visual and interaction design system for Creators Pod—a platform that operates as a creative operating system, not a generic SaaS tool.
Core Philosophy:
Creators Pod is not another dashboard. It's a living intelligence layer that thinks, remembers, and acts. The interface must reflect this: expressive, purposeful, and deeply considered.

Table of Contents

Design Principles
Typography System
Color System
Spacing & Layout
Component Library
Motion & Animation
Iconography
Data Visualization
Interaction Patterns
Theme System
Responsive Behavior
Accessibility Standards
Implementation Guidelines


Design Principles
1. Intelligence Made Visible
The interface should make the AI's reasoning transparent without overwhelming the user. Every agent action, recommendation, and insight has a visible trail.
In Practice:

Surface reasoning paths in expandable cards
Use visual indicators for agent confidence levels
Show data sources inline with generated content
Provide "Why did the agent do this?" links at decision points


2. Reduction Through Iteration
Start with complexity, then remove everything non-essential. What remains should be powerful but simple.
In Practice:

Default view shows only critical information
Progressive disclosure for advanced features
No tooltips explaining obvious actions
Every element earns its place through user value


3. Expressive Minimalism
Minimal doesn't mean boring. The interface uses bold choices—distinctive typography, confident color, intentional white space—to create personality without clutter.
In Practice:

Large type for headings (48-72px)
Generous margins (40-80px between sections)
Bold accent colors used sparingly (5-10% of screen)
Dramatic contrast in light mode, subtle sophistication in dark


4. Direct Manipulation Over Wizards
Users should feel they're working with content, not clicking through forms.
In Practice:

Inline editing everywhere
Drag-and-drop for organization
Click-to-expand for details
No "Step 1 of 5" flows unless absolutely necessary


5. Contextual Adaptation
The interface adapts to user role, task, and history. A creator sees trending opportunities. An executive sees calendar-triggered content. An agency sees campaign performance.
In Practice:

Dashboard layout changes based on persona
Agent suggestions contextualized to current goal
Content templates learned from user's past work
Terminology matches industry (e.g., "campaigns" for agencies, "posts" for creators)


6. Performance as Design
Speed is a feature. Every interaction should feel instant.
In Practice:

Skeleton screens during load (never spinners)
Optimistic UI updates
Streaming responses for agent outputs
<100ms interaction feedback


Typography System
Font Selection
Primary Typeface: Söhne
A contemporary grotesque with warm character. Used for all UI text, body copy, and data.

Rationale: Combines Swiss precision with subtle personality. Readable at small sizes, commanding at large. Avoids the sterility of Inter/Roboto while maintaining professional clarity.
Weights Used: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)

Display Typeface: Satoshi
Geometric sans with distinctive letterforms. Used for headlines, hero text, and key callouts.

Rationale: Creates visual contrast against Söhne. Strong personality without sacrificing legibility. Pairs well with data-heavy interfaces.
Weights Used: Medium (500), Bold (700), Black (900)

Monospace: JetBrains Mono
For code snippets, API keys, technical data, and agent execution logs.

Rationale: Developer-loved, highly readable, includes ligatures. Signals "technical intelligence" without feeling cold.
Weights Used: Regular (400), Medium (500)


Type Scale
Based on a 1.250 (Major Third) ratio for harmonic progression.
LevelSizeWeightUsageDisplay 172pxSatoshi BlackLanding page hero onlyDisplay 256pxSatoshi BoldSection heroes, key statsH148pxSatoshi BoldPage titlesH236pxSöhne SemiboldSection headersH328pxSöhne SemiboldSubsection headersH422pxSöhne MediumCard titles, widget headersBody Large18pxSöhne RegularIntro paragraphs, key contentBody16pxSöhne RegularStandard body textBody Small14pxSöhne RegularSecondary text, captionsLabel13pxSöhne MediumForm labels, UI labelsCaption12pxSöhne RegularMetadata, timestampsOverline11pxSöhne SemiboldCategory tags, uppercase labels

Line Height Rules

Headings (Display, H1-H4): 1.1-1.2 (tight, for impact)
Body text: 1.6 (comfortable reading)
UI labels: 1.4 (compact but clear)
Long-form content: 1.7 (reading ease)


Letter Spacing

Display/Headlines: -0.02em (optical tightening)
Body text: 0 (default)
All-caps labels: 0.05em (improved readability)
Button text: 0.01em (subtle expansion)


Responsive Typography
css/* Mobile (320-767px) */
--display-1: 48px;
--h1: 36px;
--h2: 28px;
--body: 16px;

/* Tablet (768-1023px) */
--display-1: 56px;
--h1: 42px;
--h2: 32px;
--body: 16px;

/* Desktop (1024px+) */
--display-1: 72px;
--h1: 48px;
--h2: 36px;
--body: 16px;
```

---

### Typographic Hierarchy Example
```
┌─────────────────────────────────────────────────────┐
│  GROWTH SCOUT                              [Label]  │
│  Your Daily Brief                             [H4]  │
│                                                     │
│  +2,847 followers this week                   [H2]  │
│  12% increase vs. last week          [Body Small]  │
│                                                     │
│  Trending Now: "productivity hacks"     [Body Lg]  │
│  Act within 6 hours for maximum reach     [Body]  │
│                                                     │
│  📅 Generated at 7:04 AM              [Caption]  │
└─────────────────────────────────────────────────────┘

Color System
Philosophy
Colors in Creators Pod are purposeful, not decorative. The palette is dominated by neutrals with bold, strategic accent use. We avoid gradients, pastel AI aesthetics, and evenly distributed rainbow palettes.

Light Mode Palette
Neutrals (Foundation)
css--color-white: #FFFFFF;
--color-gray-50: #FAFAFA;   /* Page backgrounds */
--color-gray-100: #F5F5F5;  /* Card backgrounds */
--color-gray-200: #E5E5E5;  /* Borders, dividers */
--color-gray-300: #D4D4D4;  /* Disabled states */
--color-gray-400: #A3A3A3;  /* Placeholder text */
--color-gray-500: #737373;  /* Secondary text */
--color-gray-600: #525252;  /* Body text */
--color-gray-700: #404040;  /* Headings */
--color-gray-900: #171717;  /* High-emphasis text */
Brand Accent (Primary)
css--color-brand-primary: #0066FF;      /* Pure, saturated blue */
--color-brand-primary-hover: #0052CC;
--color-brand-primary-active: #003D99;
--color-brand-primary-light: #E6F0FF; /* Subtle backgrounds */
Usage: Primary CTAs, active states, key data points, agent status indicators
Rationale: Blue signals intelligence, trust, and depth. Saturated (not pastel) to convey confidence.
Accent Colors (Strategic Use Only)
css--color-accent-green: #00C853;       /* Success, growth, positive trends */
--color-accent-green-light: #E8F5E9;

--color-accent-orange: #FF6B00;      /* Warnings, time-sensitive actions */
--color-accent-orange-light: #FFF3E0;

--color-accent-red: #E53935;         /* Errors, critical alerts */
--color-accent-red-light: #FFEBEE;

--color-accent-purple: #7C4DFF;      /* Premium features, AI agent indicators */
--color-accent-purple-light: #F3E5F5;

--color-accent-yellow: #FFD600;      /* Highlights, trending indicators */
--color-accent-yellow-light: #FFFDE7;
Usage Rules:

Maximum 2 accent colors per screen
Accent colors occupy <10% of viewport
Never use accents for purely decorative purposes


Dark Mode Palette
Neutrals (Foundation)
css--color-dark-bg: #0A0A0A;           /* Page background */
--color-dark-surface: #151515;      /* Card backgrounds */
--color-dark-surface-elevated: #1F1F1F; /* Modals, popovers */
--color-dark-border: #2A2A2A;       /* Dividers */
--color-dark-text-primary: #F5F5F5; /* Headings */
--color-dark-text-secondary: #A3A3A3; /* Body text */
--color-dark-text-tertiary: #737373;  /* Captions */
Brand Accent (Dark Mode)
css--color-brand-primary-dark: #4D94FF;      /* Slightly lighter for contrast */
--color-brand-primary-dark-hover: #6BA3FF;
--color-brand-primary-dark-active: #3380FF;
--color-brand-primary-dark-bg: #001A40;   /* Subtle backgrounds */
Accent Colors (Dark Mode)
css--color-accent-green-dark: #00E676;
--color-accent-orange-dark: #FF8A50;
--color-accent-red-dark: #FF5252;
--color-accent-purple-dark: #9575FF;
--color-accent-yellow-dark: #FFE500;

Semantic Colors
css/* Success */
--color-success: var(--color-accent-green);
--color-success-bg: var(--color-accent-green-light);

/* Warning */
--color-warning: var(--color-accent-orange);
--color-warning-bg: var(--color-accent-orange-light);

/* Error */
--color-error: var(--color-accent-red);
--color-error-bg: var(--color-accent-red-light);

/* Info */
--color-info: var(--color-brand-primary);
--color-info-bg: var(--color-brand-primary-light);

Color Usage Guidelines
Text on Backgrounds:

Light mode: Gray-900 on White/Gray-50
Dark mode: Gray-50 on Dark-bg/Dark-surface
Minimum contrast ratio: 4.5:1 (AA standard)

Interactive Elements:

Default: Brand Primary
Hover: Brand Primary Hover (+5% brightness shift)
Active: Brand Primary Active (-10% brightness)
Disabled: Gray-300 (light) / Gray-600 (dark)

Data Visualization:

Use accent colors only
Never use more than 5 colors in one chart
Ensure colorblind-safe palettes (use patterns as backup)


Anti-Patterns to Avoid
❌ Gradients as primary backgrounds
❌ Rainbow color schemes (e.g., 7+ colors distributed evenly)
❌ Pastel AI aesthetics (light purples, soft pinks)
❌ Overuse of accent colors (>15% of screen)
❌ Pure black (#000000) in dark mode—always use #0A0A0A or warmer

Spacing & Layout
Spacing Scale
Based on 8px base unit for perfect pixel alignment and mathematical harmony.
css--space-1: 4px;    /* Tight grouping (icon + label) */
--space-2: 8px;    /* Default internal padding */
--space-3: 12px;   /* Small gaps */
--space-4: 16px;   /* Standard element spacing */
--space-5: 24px;   /* Section internal spacing */
--space-6: 32px;   /* Component separation */
--space-7: 40px;   /* Subsection breaks */
--space-8: 48px;   /* Major section breaks */
--space-9: 64px;   /* Page section spacing */
--space-10: 80px;  /* Hero spacing */
--space-12: 120px; /* Extra-large spacing (landing page) */
```

---

### Grid System

**Desktop (1024px+):**
- 12-column grid
- Gutter: 24px
- Margin: 40px
- Max content width: 1440px

**Tablet (768-1023px):**
- 8-column grid
- Gutter: 20px
- Margin: 32px

**Mobile (320-767px):**
- 4-column grid
- Gutter: 16px
- Margin: 20px

---

### Layout Principles

#### 1. **Dominant Visual Hierarchy**

Every screen has **one primary focus**—a hero metric, key action, or critical insight. Everything else is subordinate.

**Example: Creator Dashboard**
```
┌─────────────────────────────────────────────────┐
│                                                 │
│  GROWTH SCOUT           ← H4, Gray-500         │
│  +2,847 followers       ← Display-2, Gray-900  │ ← PRIMARY FOCUS
│  this week                                      │
│  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░ 72%   ← Visual progress      │
│                                                 │
├─────────────────────────────────────────────────┤
│  Content Opportunities  ← H3, subordinate      │
│  [3 cards below]                               │
└─────────────────────────────────────────────────┘

2. Breathing Room Philosophy
Information density is high, but never cramped. Elements have space to breathe.
Minimum spacing rules:

Between unrelated elements: 32px
Between related groups: 16px
Internal card padding: 24px (desktop), 16px (mobile)
Between text blocks: 12px


3. Edge-to-Edge Content (Strategic)
Most content lives within safe margins, but key elements extend edge-to-edge for visual impact:

Hero sections (landing page)
Data visualizations (charts)
Full-width imagery


4. Z-Axis Layering
Use elevation to create spatial hierarchy, not just flat color.
Elevation Scale:
css--shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
--shadow-md: 0 4px 8px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 16px rgba(0,0,0,0.12);
--shadow-xl: 0 16px 32px rgba(0,0,0,0.16);
Usage:

Cards: shadow-md
Modals/Popovers: shadow-lg
Dropdowns: shadow-xl
Sticky headers: shadow-sm


Breakpoints
css--breakpoint-mobile: 320px;
--breakpoint-mobile-lg: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-desktop-lg: 1440px;
--breakpoint-desktop-xl: 1920px;

Responsive Layout Strategy
Mobile-First Approach:

Design for 375px viewport (iPhone SE/13 Mini baseline)
Scale up to tablet (768px)
Optimize for desktop (1024px+)

Layout Transformations:

Mobile: Single column, stacked cards
Tablet: 2-column grid for cards, side-by-side layouts
Desktop: 3-4 column grid, sidebar navigation


Component Library
1. Buttons
Primary Button
Purpose: Main call-to-action, highest emphasis
Visual Specs:
cssbackground: var(--color-brand-primary);
color: white;
padding: 12px 24px;
border-radius: 8px;
font: 16px Söhne Medium;
letter-spacing: 0.01em;
box-shadow: 0 2px 4px rgba(0,102,255,0.2);
transition: all 150ms ease;

/* Hover */
background: var(--color-brand-primary-hover);
transform: translateY(-1px);
box-shadow: 0 4px 8px rgba(0,102,255,0.3);

/* Active */
background: var(--color-brand-primary-active);
transform: translateY(0);
box-shadow: 0 1px 2px rgba(0,102,255,0.2);

/* Disabled */
background: var(--color-gray-300);
cursor: not-allowed;
opacity: 0.6;
Sizes:

Small: 10px 16px, 14px text
Medium: 12px 24px, 16px text (default)
Large: 16px 32px, 18px text


Secondary Button
Purpose: Alternative actions, medium emphasis
Visual Specs:
cssbackground: white;
color: var(--color-brand-primary);
border: 1.5px solid var(--color-brand-primary);
padding: 12px 24px;
border-radius: 8px;

/* Hover */
background: var(--color-brand-primary-light);

Ghost Button
Purpose: Tertiary actions, low emphasis
Visual Specs:
cssbackground: transparent;
color: var(--color-gray-700);
padding: 12px 24px;
border-radius: 8px;

/* Hover */
background: var(--color-gray-100);

2. Input Fields
Visual Specs:
cssbackground: white;
border: 1.5px solid var(--color-gray-200);
padding: 12px 16px;
border-radius: 8px;
font: 16px Söhne Regular;
color: var(--color-gray-900);

/* Focus */
border-color: var(--color-brand-primary);
box-shadow: 0 0 0 3px var(--color-brand-primary-light);
outline: none;

/* Error */
border-color: var(--color-error);
box-shadow: 0 0 0 3px var(--color-error-bg);
Label Above Field:
cssfont: 13px Söhne Medium;
color: var(--color-gray-700);
margin-bottom: 6px;
Helper Text Below:
cssfont: 12px Söhne Regular;
color: var(--color-gray-500);
margin-top: 4px;

3. Cards
Purpose: Container for related content, elevated from background
Visual Specs:
cssbackground: white;
border: 1px solid var(--color-gray-200);
border-radius: 12px;
padding: 24px;
box-shadow: var(--shadow-sm);

/* Hover (if interactive) */
box-shadow: var(--shadow-md);
border-color: var(--color-gray-300);
transition: all 200ms ease;
Card Header:
cssmargin-bottom: 16px;
padding-bottom: 12px;
border-bottom: 1px solid var(--color-gray-200);

/* Title */
font: 22px Söhne Semibold;
color: var(--color-gray-900);

/* Subtitle/Meta */
font: 14px Söhne Regular;
color: var(--color-gray-500);
margin-top: 4px;

4. Badges & Tags
Purpose: Labels, status indicators, categories
Visual Specs (Default):
cssbackground: var(--color-gray-100);
color: var(--color-gray-700);
padding: 4px 12px;
border-radius: 6px;
font: 12px Söhne Medium;
display: inline-flex;
align-items: center;
gap: 4px;
Semantic Variants:

Success: Green background, white text
Warning: Orange background, white text
Error: Red background, white text
Info: Blue background, white text

Sizes:

Small: 3px 8px, 11px text
Medium: 4px 12px, 12px text (default)
Large: 6px 16px, 13px text


5. Dropdown Menus
Visual Specs:
cssbackground: white;
border: 1px solid var(--color-gray-200);
border-radius: 8px;
box-shadow: var(--shadow-xl);
padding: 8px 0;
min-width: 200px;
Menu Item:
csspadding: 10px 16px;
font: 14px Söhne Regular;
color: var(--color-gray-700);

/* Hover */
background: var(--color-gray-50);
color: var(--color-gray-900);

/* Active/Selected */
background: var(--color-brand-primary-light);
color: var(--color-brand-primary);
Divider:
cssheight: 1px;
background: var(--color-gray-200);
margin: 8px 0;

6. Modals
Purpose: Focus user attention on critical task or decision
Visual Specs:
css/* Overlay */
background: rgba(0,0,0,0.5);
backdrop-filter: blur(4px);

/* Modal Container */
background: white;
border-radius: 16px;
box-shadow: var(--shadow-xl);
max-width: 600px;
padding: 32px;
margin: 80px auto;
Modal Header:
cssfont: 28px Söhne Semibold;
color: var(--color-gray-900);
margin-bottom: 16px;
Modal Footer:
cssdisplay: flex;
justify-content: flex-end;
gap: 12px;
margin-top: 32px;
padding-top: 24px;
border-top: 1px solid var(--color-gray-200);

7. Progress Bars
Purpose: Show completion, goal progress, loading states
Visual Specs:
css/* Track */
background: var(--color-gray-200);
height: 8px;
border-radius: 100px;
overflow: hidden;

/* Fill */
background: linear-gradient(90deg, 
  var(--color-brand-primary) 0%, 
  var(--color-accent-purple) 100%);
height: 100%;
border-radius: 100px;
transition: width 400ms ease;
Variants:

Success: Green fill
Warning: Orange fill
Multi-segment: Stacked fills with different colors

Labels:
cssfont: 14px Söhne Medium;
color: var(--color-gray-700);
margin-bottom: 8px;
display: flex;
justify-content: space-between;

8. Tabs
Purpose: Navigate between related views
Visual Specs (Underline Style):
css/* Tab Container */
border-bottom: 1px solid var(--color-gray-200);
display: flex;
gap: 32px;

/* Tab Item */
padding: 12px 0;
font: 16px Söhne Medium;
color: var(--color-gray-500);
border-bottom: 2px solid transparent;
cursor: pointer;
transition: all 150ms ease;

/* Tab Hover */
color: var(--color-gray-700);

/* Tab Active */
color: var(--color-brand-primary);
border-bottom-color: var(--color-brand-primary);

9. Tooltips
Purpose: Contextual help, additional information on hover
Visual Specs:
cssbackground: var(--color-gray-900);
color: white;
padding: 8px 12px;
border-radius: 6px;
font: 13px Söhne Regular;
box-shadow: var(--shadow-lg);
max-width: 240px;
Arrow (using CSS triangle):
cssborder: 6px solid transparent;
border-top-color: var(--color-gray-900);

10. Toast Notifications
Purpose: Temporary feedback for actions
Visual Specs:
cssbackground: white;
border-left: 4px solid var(--color-brand-primary);
box-shadow: var(--shadow-lg);
border-radius: 8px;
padding: 16px 20px;
min-width: 320px;
display: flex;
align-items: start;
gap: 12px;
Variants:

Success: Green left border
Error: Red left border
Warning: Orange left border

Animation:
css/* Enter */
transform: translateY(20px);
opacity: 0;
animation: toast-enter 200ms ease forwards;

/* Exit */
animation: toast-exit 200ms ease forwards;

Motion & Animation
Philosophy
Motion in Creators Pod serves three purposes only:

Feedback — Confirm user actions
Guidance — Direct attention to important changes
Delight — Create memorable moments (sparingly)

Avoid:

Decorative animations
Parallax effects (except hero sections)
Spinning loaders (use skeleton screens)
Auto-playing animations (except micro-interactions)


Timing Functions
css--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

Duration Scale
css--duration-instant: 100ms;   /* Micro-interactions */
--duration-fast: 150ms;      /* Hover states */
--duration-base: 200ms;      /* Default transitions */
--duration-slow: 300ms;      /* Modal open/close */
--duration-slower: 500ms;    /* Page transitions */

Animation Catalog
1. Page Load (Staggered Reveal)
Use Case: Dashboard loads, content appears in sequence
css.dashboard-card {
  opacity: 0;
  transform: translateY(20px);
  animation: reveal 400ms var(--ease-out) forwards;
}

.dashboard-card:nth-child(1) { animation-delay: 0ms; }
.dashboard-card:nth-child(2) { animation-delay: 100ms; }
.dashboard-card:nth-child(3) { animation-delay: 200ms; }

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

2. Button Press
css.button:active {
  transform: scale(0.98);
  transition: transform 100ms var(--ease-in-out);
}

3. Skeleton Screen (Loading State)
Use Case: Content loading, avoids spinners
css.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 0%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

4. Modal Open
css.modal-overlay {
  animation: fade-in 200ms var(--ease-out);
}

.modal-content {
  animation: slide-up 300ms var(--ease-out);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

5. Accordion Expand
css.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms var(--ease-in-out);
}

.accordion-content.open {
  max-height: 500px; /* Adjust to content */
}

6. Success Checkmark
Use Case: Form submission confirmation
css.checkmark {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 500ms var(--ease-out) forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

Performance Guidelines
Always:

Animate opacity and transform only (GPU-accelerated)
Use will-change sparingly (only during animation)
Test on 60fps monitors and mobile devices
Provide reduced-motion alternatives

Never:

Animate width, height, top, left (causes reflow)
Chain multiple animations without purpose
Use animations longer than 500ms (feels sluggish)


Reduced Motion Support
css@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

Iconography
Icon Library: Lucide Icons
Rationale: Open-source, consistent stroke width, extensive library (1000+ icons), optimized SVGs.
Specs:

Stroke width: 2px
Size: 16px (small), 20px (medium), 24px (large)
Color: Inherit from parent text color


Icon Usage Rules
With Text (Labels):
cssdisplay: flex;
align-items: center;
gap: 8px;
Icon-Only Buttons:

Must have accessible label (aria-label)
Minimum touch target: 44x44px
Icon size: 20px

Status Indicators:

Success: Checkmark (green)
Error: X Circle (red)
Warning: Alert Triangle (orange)
Info: Info Circle (blue)


Custom Icons (When Needed)
Brand Icons:

Agent avatars (unique per agent type)
Platform logos (YouTube, TikTok, etc.)
Feature icons (when Lucide doesn't have match)

Design Specs:

Export as SVG
24x24px artboard
2px stroke
No fills (stroke-based)
Optimize with SVGO


Data Visualization
Chart Library: Recharts
Rationale: React-native, composable, responsive, accessible.

Chart Color Palette
Primary Data Series:
css--chart-primary: var(--color-brand-primary);
--chart-secondary: var(--color-accent-purple);
--chart-tertiary: var(--color-accent-green);
Multi-Series (up to 5):
css--chart-1: #0066FF; /* Blue */
--chart-2: #7C4DFF; /* Purple */
--chart-3: #00C853; /* Green */
--chart-4: #FF6B00; /* Orange */
--chart-5: #E53935; /* Red */
Ensure colorblind-safe combinations (tested with Coblis simulator)

Chart Types & Usage
Line Chart
Use Case: Trends over time (follower growth, engagement rate)
Specs:

Stroke width: 2px
Grid: Subtle (Gray-200)
Axis labels: 12px Söhne Regular
Data points: 4px radius circles on hover


Bar Chart
Use Case: Comparisons (platform performance, content type engagement)
Specs:

Bar radius: 4px (top corners)
Bar spacing: 8px
Axis labels: 12px Söhne Regular


Donut Chart
Use Case: Proportions (audience demographics, traffic sources)
Specs:

Stroke width: 20px
Center label: 28px Söhne Semibold (value) + 14px Regular (label)
Hover: Expand segment by 4px


Chart Best Practices
Always:

Label axes clearly
Show data values on hover
Use legend for multi-series (position top-right)
Animate chart entrance (fade + scale)
Provide table view alternative

Never:

3D charts (visual distortion)
More than 5 data series in one chart
Pie charts (use donut instead for center label space)


Interaction Patterns
1. Inline Editing
Pattern: Click to edit, blur to save
Use Case: Post captions, campaign names, content titles
Visual Feedback:
css/* Read Mode */
cursor: pointer;
border-bottom: 1px dashed var(--color-gray-300);

/* Hover */
background: var(--color-gray-50);

/* Edit Mode */
border: 1.5px solid var(--color-brand-primary);
background: white;
box-shadow: 0 0 0 3px var(--color-brand-primary-light);

2. Drag & Drop
Pattern: Reorder items, organize content calendar
Visual Feedback:
css/* Draggable Item */
cursor: grab;

/* While Dragging */
cursor: grabbing;
opacity: 0.6;
transform: rotate(-2deg) scale(1.02);

/* Drop Target */
border: 2px dashed var(--color-brand-primary);
background: var(--color-brand-primary-light);

3. Command Palette (⌘K)
Pattern: Keyboard-first navigation and actions
Trigger: Cmd+K (Mac) / Ctrl+K (Windows)
Visual Specs:
css/* Overlay */
background: rgba(0,0,0,0.6);
backdrop-filter: blur(8px);

/* Command Palette */
background: white;
border-radius: 12px;
box-shadow: var(--shadow-xl);
max-width: 600px;
margin: 20vh auto;

/* Search Input */
font: 18px Söhne Regular;
padding: 16px 20px;
border-bottom: 1px solid var(--color-gray-200);

/* Results */
max-height: 400px;
overflow-y: auto;
Result Item:
csspadding: 12px 20px;
display: flex;
align-items: center;
gap: 12px;

/* Hover/Selected */
background: var(--color-gray-50);

/* Icon */
color: var(--color-gray-500);
```

---

### 4. Empty States

**Pattern:** Guide users when no content exists

**Visual Approach:**
- Simple illustration (monochrome, line-based)
- Heading: "No content yet"
- Body: Helpful explanation
- Primary CTA: Action to resolve empty state

**Example:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Simple Icon/Illustration]  │
│                                     │
│         No Posts Published Yet      │
│                                     │
│   Your Growth Scout will suggest    │
│   content ideas once you connect    │
│   your platforms.                   │
│                                     │
│   [Connect Platforms]               │
│                                     │
└─────────────────────────────────────┘
```

---

### 5. Loading States

**Avoid:** Spinners (unless absolutely necessary)

**Prefer:**
1. **Skeleton screens** (for predictable layouts)
2. **Progress bars** (for known duration tasks)
3. **Streaming text** (for AI generation)

**Streaming Text Pattern:**
```
The agent is analyzing your content...

███████░░░ 67% complete

Currently evaluating 847 data points across 
3 platforms...
```

---

### 6. Confirmation Patterns

**Destructive Actions (delete, archive):**
- Show modal confirmation
- Require typing "DELETE" for high-stakes actions
- Provide undo within 5 seconds (toast notification)

**Non-Destructive Actions:**
- Inline confirmation (checkmark icon)
- Toast notification: "Draft saved"

---

### 7. Progressive Disclosure

**Approach:** Show summary → reveal details on click

**Example: Content Opportunity Card**
```
┌─────────────────────────────────────┐
│ 🔥 TRENDING NOW                     │
│                                     │
│ "Productivity hacks"                │
│ 92% fit | 6 hours remaining         │
│                                     │
│ [Generate Script] [Show Details ▼] │
└─────────────────────────────────────┘

[User clicks "Show Details ▼"]

┌─────────────────────────────────────┐
│ 🔥 TRENDING NOW                     │
│                                     │
│ "Productivity hacks"                │
│ 92% fit | 6 hours remaining         │
│                                     │
│ ▼ DETAILS                           │
│ • Trending on TikTok (2.4M views)   │
│ • Your audience overlap: 68%        │
│ • Similar content performed +45%    │
│   better than avg this month        │
│                                     │
│ [Generate Script] [Hide Details ▲] │
└─────────────────────────────────────┘

Theme System
Light Mode (Default)
Background: Clean, bright, minimal
css--bg-primary: #FFFFFF;
--bg-secondary: #FAFAFA;
--text-primary: #171717;
--text-secondary: #737373;
--border: #E5E5E5;
Usage:

Default for all users
Best for daylight use
High contrast for readability


Dark Mode
Background: Deep, sophisticated, reduced eye strain
css--bg-primary: #0A0A0A;
--bg-secondary: #151515;
--text-primary: #F5F5F5;
--text-secondary: #A3A3A3;
--border: #2A2A2A;
Design Considerations:

Not just inverted light mode
Reduce pure white to #F5F5F5 (less harsh)
Elevate surfaces with lighter grays, not shadows
Adjust accent colors for better contrast


Theme Toggle
Location: Top-right navigation bar
Visual: Icon button (sun/moon)
Implementation:
javascript// Persist preference in localStorage
// Respect system preference on first load
const savedTheme = localStorage.getItem('theme');
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const theme = savedTheme || systemPreference;

Responsive Behavior
Breakpoint Strategy
Mobile (320-767px):

Single-column layouts
Hamburger navigation
Bottom tab bar (on mobile app)
Touch-optimized (min 44px tap targets)
Simplified data tables (cards instead)

Tablet (768-1023px):

Two-column layouts
Side drawer navigation
Mixed card/table views
Optimize for portrait and landscape

Desktop (1024px+):

Multi-column layouts
Persistent sidebar navigation
Full data tables
Keyboard shortcuts enabled


Component Responsiveness
Navigation:

Desktop: Sidebar (240px width)
Tablet: Collapsible sidebar (icon mode)
Mobile: Bottom tab bar + hamburger menu

Cards:

Desktop: 3-4 column grid
Tablet: 2 column grid
Mobile: Single column stack

Data Tables:

Desktop: Full table
Tablet: Horizontal scroll
Mobile: Card view with key columns only

Modals:

Desktop: Centered (600px max-width)
Mobile: Full-screen takeover


Accessibility Standards
WCAG 2.1 AA Compliance
Color Contrast:

Text: Minimum 4.5:1 ratio
Large text (18px+): Minimum 3:1 ratio
UI components: Minimum 3:1 ratio

Keyboard Navigation:

All interactive elements must be keyboard-accessible
Logical tab order (left-to-right, top-to-bottom)
Visible focus states (outline ring)
Skip to main content link

Screen Reader Support:

Semantic HTML (nav, main, article, aside)
ARIA labels for icon-only buttons
ARIA live regions for dynamic content
Alt text for all images (descriptive, not decorative)

Focus States:
css*:focus-visible {
  outline: 2px solid var(--color-brand-primary);
  outline-offset: 2px;
}
Motion Preferences:
css@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Guidelines

### CSS Architecture

**Methodology:** CSS Variables + Utility Classes

**File Structure:**
```
/styles
  /tokens
    _colors.css
    _typography.css
    _spacing.css
    _shadows.css
  /components
    _buttons.css
    _cards.css
    _inputs.css
  /layouts
    _grid.css
    _dashboard.css
  /utilities
    _spacing.css
    _text.css
  theme.css (imports all)

Component Development (React)
Pattern: Styled Components + CSS Variables
Example:
jsximport styled from 'styled-components';

const Button = styled.button`
  background: var(--color-brand-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: 8px;
  font: 16px var(--font-primary);
  transition: all var(--duration-fast) var(--ease-in-out);

  &:hover {
    background: var(--color-brand-primary-hover);
  }

  &:disabled {
    background: var(--color-gray-300);
    cursor: not-allowed;
  }
`;

export default Button;

Design Tokens Export
For Design → Dev Handoff:
Export tokens as JSON for consumption in code:
json{
  "colors": {
    "brand": {
      "primary": "#0066FF",
      "primary-hover": "#0052CC"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px"
  },
  "typography": {
    "h1": {
      "size": "48px",
      "weight": "700",
      "lineHeight": "1.2"
    }
  }
}

Design QA Checklist
Before shipping any feature:

 All text meets contrast ratios (use WebAIM checker)
 Keyboard navigation works (Tab through entire flow)
 Screen reader announces all interactive elements
 Mobile touch targets are 44x44px minimum
 Animations respect prefers-reduced-motion
 Components render correctly in light + dark mode
 Responsive breakpoints tested (375px, 768px, 1024px)
 Loading states implemented (no blank screens)
 Error states implemented (with clear recovery paths)
 Focus states visible on all interactive elements


Final Notes
What Makes This System Distinctive

Bold Typography Choices — Söhne + Satoshi create instant visual differentiation from generic SaaS tools
Restrained Color Use — Dominated by neutrals with strategic accent pops (not rainbow chaos)
Confident Spacing — Generous white space signals premium quality
Expressive Motion — Purposeful animations at key moments, not decorative fluff
Intelligent Adaptation — Interface changes based on persona, task, and context


Anti-Patterns We Avoid
❌ Template SaaS Dashboards — Generic grid layouts with card spam
❌ AI Aesthetic Clichés — Purple gradients, holographic effects, futuristic sans
❌ Overuse of Automation — UI that makes users feel helpless
❌ Data Vomit — Charts and metrics without hierarchy or story
❌ Modal Hell — Multi-step wizards for simple tasks

This System Enables
✅ Category-Defining Product Identity
✅ Speed & Clarity for Daily Use
✅ Trust Through Transparency
✅ Delight in Key Moments
✅ Scalable Design Language (consistent as we add features)

Creators Pod is not just another tool. It's a creative operating system. The design system must reflect that ambition.

End of UX Design System Document