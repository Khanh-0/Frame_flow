---
# FrameFlow Neon v2 - Design System Specification
# Following Google Design Specification Format

metadata:
  name: "FrameFlow Neon v2"
  version: "2.0.0"
  status: "active"
  last_updated: "2026-06-30"
  author: "Khanh-0"
  maintainer: "FrameFlow Design Team"
  description: "Premium AI-powered anime colorization platform with Neon/Aurora aesthetic"

design_system:
  name: "FrameFlow Neon v2"
  namespace: "ff-neon"
  prefix: "--ff"
  tokens_location: "src/tokens"
  components_location: "src/components"

brand:
  name: "FrameFlow"
  tagline: "AI-Powered Anime Colorization"
  personality: ["Creative", "Premium", "Futuristic", "AI-powered", "Anime-focused"]
  visual_style: ["Dark Theme First", "Neon Gradient", "Glassmorphism", "Aurora", "Soft Glow"]

color_palette:
  primary_gradient: ["#7C3AED", "#A855F7", "#FF2E9A", "#FF8A34"]
  neon_pink: "#FF2E9A"
  neon_purple: "#7C3AED"
  neon_orange: "#FF8A34"
  glass_dark: "#161622"
  glass_darker: "#11111B"
  glass_darkest: "#0B0B14"
  glass_border: "#2B2B45"

typography:
  family: "Inter"
  headings_color: "#F5F3FF"
  body_color: "#FFFFFF"
  description_color: "#AAB2D5"

border_radius:
  button: "14px"
  input: "14px"
  card: "22px"
  modal: "26px"
  badge: "999px"

motion:
  hover_translate: "translateY(-3px)"
  glow_duration: "200ms-250ms"
  easing: "cubic-bezier(0.4, 0, 0.2, 1)"

---

# 1. Overview

## 1.1 Vision

FrameFlow Neon v2 adalah design system yang dirancang untuk platform AI-powered anime colorization dengan aesthetic **Neon Gradient + Aurora** yang premium dan futuristic. Sistem ini menggabungkan glassmorphism, soft glow, dan dark theme-first approach untuk menciptakan pengalaman pengguna yang immersive dan modern.

## 1.2 Key Principles

- **Neon-First**: Semua visual dirancang dengan neon gradient sebagai elemen utama
- **Glassmorphism**: Background glass dengan blur effect untuk depth
- **Dark Theme Only**: Tidak ada light theme — dioptimalkan untuk mata pengguna
- **AI-Focused**: Component khusus untuk fitur AI (Before/After, Timeline, Magic effects)
- **Consistency**: 100% synchronization — tidak ada "nua Material nua Neon"
- **Accessibility**: WCAG 2.1 AA compliant dengan focus states dan contrast ratios

---

# 2. Color Tokens

## 2.1 Semantic Colors

### 2.1.1 Primary (Neon Purple → Pink)

```yaml
--ff-primary-gradient-1: #7C3AED    # Neon Purple
--ff-primary-gradient-2: #A855F7    # Purple Mid
--ff-primary-gradient-3: #FF2E9A    # Neon Pink
--ff-primary-gradient-4: #FF8A34    # Neon Orange

--ff-primary-main: #7C3AED
--ff-primary-light: #A855F7
--ff-primary-dark: #5B21B6
```

**Usage**: Primary CTAs, active states, brand elements, icons

### 2.1.2 Secondary (Dark Glass)

```yaml
--ff-secondary-bg: #161622          # Card background
--ff-secondary-border: #2B2B45      # Border color
--ff-secondary-hover: rgba(255,46,154,0.08)  # Hover state
```

**Usage**: Cards, secondary surfaces, containers

### 2.1.3 Danger

```yaml
--ff-danger: #FF3D71               # Neon Red-Pink (thay thế Material red)
--ff-danger-hover: rgba(255,61,113,0.1)
--ff-danger-glow: rgba(255,61,113,0.4)
```

**Usage**: Destructive actions, errors, warnings

### 2.1.4 Success

```yaml
--ff-success: #00D084              # Neon Green
--ff-success-glow: rgba(0,208,132,0.4)
```

### 2.1.5 Warning

```yaml
--ff-warning: #FF8A34              # Neon Orange
--ff-warning-glow: rgba(255,138,52,0.4)
```

### 2.1.6 Info

```yaml
--ff-info: #7C3AED                 # Neon Purple
--ff-info-glow: rgba(124,58,237,0.4)
```

### 2.1.7 Backgrounds

```yaml
--ff-bg-primary: #0B0B14           # Page background (navbar, sidebar)
--ff-bg-secondary: #10101A         # Sidebar
--ff-bg-tertiary: #11111B          # Input, upload zone
--ff-bg-surface: #181827           # Cards, modals
--ff-bg-overlay: rgba(15,15,25,0.82)  # Modal overlay
```

### 2.1.8 Borders & Glass

```yaml
--ff-border-primary: #2A2A40       # Input borders
--ff-border-secondary: #2B2B45     # Card borders
--ff-border-glass: rgba(255,255,255,0.05)  # Navbar border
--ff-glass-blur: 18px              # Glassmorphism blur
```

### 2.1.9 Text Colors

```yaml
--ff-text-primary: #FFFFFF         # Heading, main text
--ff-text-secondary: #AAB2D5       # Description, secondary
--ff-text-tertiary: #7E86A4        # Placeholder, disabled
--ff-text-inverse: #0B0B14         # On neon backgrounds
```

### 2.1.10 Gradient Definitions

```yaml
# Primary CTA Gradient
--ff-gradient-primary: linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #FF2E9A 75%, #FF8A34 100%)

# Hero Background Aurora
--ff-gradient-aurora: radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.3) 0%, rgba(255,46,154,0.2) 40%, transparent 100%)

# Icon Gradient
--ff-gradient-icon: linear-gradient(135deg, #FF2E9A 0%, #FF8A34 100%)

# Border Gradient (Upload Zone, Active Frame)
--ff-gradient-border: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 50%, #FF8A34 100%)

# Sidebar Active
--ff-gradient-sidebar-active: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)

# Timeline Active
--ff-gradient-timeline: linear-gradient(90deg, #7C3AED 0%, #FF2E9A 100%)

# Checkbox Checked
--ff-gradient-checkbox: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)

# Switch ON
--ff-gradient-switch-on: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)

# Progress Bar
--ff-gradient-progress: linear-gradient(90deg, #7C3AED 0%, #FF8A34 100%)
```

### 2.1.11 Glow Tokens

```yaml
# Button Primary Glow
--ff-glow-button-primary: 0 8px 30px rgba(168,85,247,0.35)

# Card Hover Glow
--ff-glow-card-hover: 0 0 20px rgba(255,46,154,0.2)

# Input Focus Glow
--ff-glow-input-focus: 0 0 16px rgba(255,46,154,0.3)

# Icon Glow
--ff-glow-icon: 0 0 12px rgba(255,46,154,0.4)

# Neon Pink Glow (general)
--ff-glow-pink: 0 0 20px rgba(255,46,154,0.4)
```

## 2.2 Component-Specific Colors

### 2.2.1 Badge Colors

```yaml
# AI Badge
--ff-badge-ai-bg: rgba(124,58,237,0.15)
--ff-badge-ai-text: #A855F7
--ff-badge-ai-border: #7C3AED

# Pro Badge
--ff-badge-pro-bg: rgba(255,138,52,0.15)
--ff-badge-pro-text: #FF8A34
--ff-badge-pro-border: #FF8A34

# New Badge
--ff-badge-new-bg: rgba(255,46,154,0.15)
--ff-badge-new-text: #FF2E9A
--ff-badge-new-border: #FF2E9A

# Success Badge
--ff-badge-success-bg: rgba(0,208,132,0.15)
--ff-badge-success-text: #00D084
--ff-badge-success-border: #00D084
```

---

# 3. Typography Tokens

## 3.1 Font Family

```yaml
--ff-font-primary: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
--ff-font-mono: "JetBrains Mono", "Courier New", monospace
```

## 3.2 Heading Styles

```yaml
# H1
--ff-h1-size: 48px
--ff-h1-weight: 700
--ff-h1-line-height: 1.2
--ff-h1-color: #F5F3FF

# H2
--ff-h2-size: 36px
--ff-h2-weight: 700
--ff-h2-line-height: 1.3
--ff-h2-color: #F5F3FF

# H3
--ff-h3-size: 28px
--ff-h3-weight: 600
--ff-h3-line-height: 1.3
--ff-h3-color: #FFFFFF

# H4
--ff-h4-size: 20px
--ff-h4-weight: 600
--ff-h4-line-height: 1.4
--ff-h4-color: #FFFFFF

# H5
--ff-h5-size: 16px
--ff-h5-weight: 600
--ff-h5-line-height: 1.4
--ff-h5-color: #FFFFFF

# H6
--ff-h6-size: 14px
--ff-h6-weight: 600
--ff-h6-line-height: 1.5
--ff-h6-color: #FFFFFF
```

## 3.3 Body Styles

```yaml
# Body Large (16px)
--ff-body-lg-size: 16px
--ff-body-lg-weight: 400
--ff-body-lg-line-height: 1.5
--ff-body-lg-color: #FFFFFF

# Body (14px)
--ff-body-size: 14px
--ff-body-weight: 400
--ff-body-line-height: 1.5
--ff-body-color: #FFFFFF

# Body Small (12px)
--ff-body-sm-size: 12px
--ff-body-sm-weight: 400
--ff-body-sm-line-height: 1.5
--ff-body-sm-color: #AAB2D5

# Description (13px)
--ff-description-size: 13px
--ff-description-weight: 400
--ff-description-line-height: 1.5
--ff-description-color: #AAB2D5

# Caption (11px)
--ff-caption-size: 11px
--ff-caption-weight: 400
--ff-caption-line-height: 1.4
--ff-caption-color: #7E86A4
```

## 3.4 Label Styles

```yaml
# Label Large
--ff-label-lg-size: 14px
--ff-label-lg-weight: 600
--ff-label-lg-color: #FFFFFF

# Label (12px)
--ff-label-size: 12px
--ff-label-weight: 600
--ff-label-color: #FFFFFF

# Label Small
--ff-label-sm-size: 11px
--ff-label-sm-weight: 600
--ff-label-sm-color: #AAB2D5
```

---

# 4. Spacing Tokens

```yaml
# 4px increment system
--ff-spacing-xs: 4px
--ff-spacing-sm: 8px
--ff-spacing-md: 12px
--ff-spacing-lg: 16px
--ff-spacing-xl: 20px
--ff-spacing-2xl: 24px
--ff-spacing-3xl: 32px
--ff-spacing-4xl: 40px
--ff-spacing-5xl: 48px
--ff-spacing-6xl: 56px
--ff-spacing-7xl: 64px
```

---

# 5. Border Radius Tokens

```yaml
--ff-radius-xs: 6px
--ff-radius-sm: 10px
--ff-radius-md: 14px     # Button, Input
--ff-radius-lg: 18px
--ff-radius-xl: 22px     # Card
--ff-radius-2xl: 26px    # Modal
--ff-radius-full: 999px  # Badge, Avatar
```

---

# 6. Shadow & Elevation Tokens

## 6.1 Elevation Levels

```yaml
# Elevation 1 (Subtle)
--ff-elevation-1: 0 2px 8px rgba(0,0,0,0.12)

# Elevation 2 (Cards)
--ff-elevation-2: 0 4px 12px rgba(0,0,0,0.15)

# Elevation 3 (Hover Cards)
--ff-elevation-3: 0 8px 24px rgba(0,0,0,0.2)

# Elevation 4 (Floating Actions)
--ff-elevation-4: 0 12px 32px rgba(0,0,0,0.25)

# Elevation 5 (Modals)
--ff-elevation-5: 0 16px 40px rgba(0,0,0,0.3)

# Elevation 6 (Dropdowns)
--ff-elevation-6: 0 20px 48px rgba(0,0,0,0.35)
```

## 6.2 Glow Shadows

```yaml
--ff-shadow-glow-sm: 0 0 8px rgba(255,46,154,0.2)
--ff-shadow-glow-md: 0 0 16px rgba(255,46,154,0.3)
--ff-shadow-glow-lg: 0 0 24px rgba(255,46,154,0.4)
--ff-shadow-glow-xl: 0 8px 30px rgba(168,85,247,0.35)
```

---

# 7. Motion & Animation Tokens

## 7.1 Duration Tokens

```yaml
--ff-motion-duration-fast: 150ms
--ff-motion-duration-base: 200ms
--ff-motion-duration-slow: 250ms
--ff-motion-duration-slower: 300ms
--ff-motion-duration-slowest: 400ms
```

## 7.2 Easing Functions

```yaml
--ff-motion-easing-ease-out: cubic-bezier(0.4, 0, 0.2, 1)
--ff-motion-easing-ease-in: cubic-bezier(0.4, 0, 1, 1)
--ff-motion-easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ff-motion-easing-ease-in-quad: cubic-bezier(0.11, 0, 0.5, 0)
--ff-motion-easing-ease-out-quad: cubic-bezier(0.5, 1, 0.89, 1)
--ff-motion-easing-ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
```

## 7.3 Transition Presets

```yaml
# Standard transitions
--ff-transition-base: all var(--ff-motion-duration-base) var(--ff-motion-easing-ease-out)
--ff-transition-colors: color, background-color, border-color var(--ff-motion-duration-base) var(--ff-motion-easing-ease-out)
--ff-transition-transform: transform var(--ff-motion-duration-base) var(--ff-motion-easing-ease-out)

# Hover lift animation
--ff-animation-hover-lift: translateY(-3px) var(--ff-motion-duration-base) var(--ff-motion-easing-ease-out)
```

## 7.4 Keyframe Animations

```css
@keyframes ff-glow {
  0% {
    box-shadow: 0 0 10px rgba(255,46,154,0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255,46,154,0.5);
  }
  100% {
    box-shadow: 0 0 10px rgba(255,46,154,0.3);
  }
}

@keyframes ff-aurora {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

@keyframes ff-shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes ff-float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}
```

---

# 8. Glass Morphism Tokens

```yaml
# Glass Surface Base
--ff-glass-bg: rgba(22,22,34,0.8)
--ff-glass-border: rgba(255,255,255,0.05)
--ff-glass-blur: 18px
--ff-glass-opacity: 0.8

# Strong Glass (Modals)
--ff-glass-bg-strong: rgba(15,15,25,0.82)
--ff-glass-blur-strong: 24px
--ff-glass-opacity-strong: 0.82

# Light Glass (Hover states)
--ff-glass-bg-light: rgba(22,22,34,0.6)
--ff-glass-blur-light: 12px
--ff-glass-opacity-light: 0.6
```

---

# 9. Component Specifications

## 9.1 Button Component

### 9.1.1 Primary Button (Gradient)

**Visual Style**
```
Background: Linear gradient (Purple → Pink → Orange)
Border: 1px solid transparent
Border Radius: 14px
Padding: 10px 24px (H-44px minimum touch target)
Font: Inter 14px / 600 weight
Color: #FFFFFF
```

**States**

| State | Background | Shadow | Transform |
|-------|-----------|--------|-----------|
| Default | `var(--ff-gradient-primary)` | `var(--ff-glow-button-primary)` | none |
| Hover | `var(--ff-gradient-primary)` + brightness(110%) | `var(--ff-glow-button-primary)` x1.2 | `translateY(-3px)` |
| Active | `var(--ff-gradient-primary)` + brightness(95%) | `var(--ff-glow-button-primary)` x0.8 | `translateY(0px)` |
| Disabled | `rgba(168,85,247,0.3)` | none | none |
| Loading | `var(--ff-gradient-primary)` | shimmer animation | none |

**CSS Example**
```css
.btn-primary {
  background: var(--ff-gradient-primary);
  border: 1px solid transparent;
  border-radius: var(--ff-radius-md);
  padding: 10px 24px;
  font-family: var(--ff-font-primary);
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  cursor: pointer;
  transition: var(--ff-transition-base);
  box-shadow: var(--ff-glow-button-primary);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: var(--ff-animation-hover-lift);
  box-shadow: 0 8px 30px rgba(168,85,247,0.45);
}

.btn-primary:active:not(:disabled) {
  filter: brightness(0.95);
  transform: translateY(0px);
  box-shadow: 0 8px 30px rgba(168,85,247,0.25);
}

.btn-primary:disabled {
  background: rgba(168,85,247,0.3);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### 9.1.2 Secondary Button (Dark Glass)

**Visual Style**
```
Background: #161622
Border: 1px solid #2B2B45
Border Radius: 14px
Padding: 10px 24px
Font: Inter 14px / 600 weight
Color: #FFFFFF
```

**Hover State**
```
Border: 1px solid #FF2E9A
Box Shadow: 0 0 16px rgba(255,46,154,0.3)
```

### 9.1.3 Outline Button

**Visual Style**
```
Background: transparent
Border: 2px solid #7C3AED
Border Radius: 14px
Padding: 10px 24px
Color: #7C3AED
Hover: Border color → #FF2E9A, Glow added
```

### 9.1.4 Danger Button

**Visual Style**
```
Background: #FF3D71 (Neon Red-Pink)
Border: 1px solid transparent
Box Shadow: 0 8px 30px rgba(255,61,113,0.35)
Hover: brightness(1.1) + stronger glow
```

---

## 9.2 Input Component

### 9.2.1 Text Input

**Default State**
```yaml
Background: #11111B
Border: 1px solid #2A2A40
Border Radius: 14px
Padding: 10px 12px
Font Size: 14px
Color: #FFFFFF
Placeholder Color: #7E86A4
Height: 40px minimum
```

**Focus State**
```yaml
Border Color: #FF2E9A
Box Shadow: 0 0 16px rgba(255,46,154,0.3)
Background: #11111B (no change)
```

**Disabled State**
```yaml
Background: rgba(26,26,38,0.5)
Border Color: #2A2A40
Color: #7E86A4
Cursor: not-allowed
Opacity: 0.6
```

**CSS Example**
```css
.input {
  background: var(--ff-bg-tertiary);
  border: 1px solid var(--ff-border-primary);
  border-radius: var(--ff-radius-md);
  padding: 10px 12px;
  font-family: var(--ff-font-primary);
  font-size: 14px;
  color: var(--ff-text-primary);
  transition: var(--ff-transition-colors);
  min-height: 40px;
  outline: none;
}

.input::placeholder {
  color: var(--ff-text-tertiary);
}

.input:focus {
  border-color: var(--ff-neon-pink);
  box-shadow: var(--ff-glow-input-focus);
  background: var(--ff-bg-tertiary);
}

.input:disabled {
  background: rgba(26,26,38,0.5);
  border-color: var(--ff-border-primary);
  color: var(--ff-text-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 9.3 Card Component

### 9.3.1 Surface Card

**Default State**
```yaml
Background: #181827
Border: 1px solid rgba(255,255,255,0.05)
Border Radius: 22px
Padding: 16px
Box Shadow: var(--ff-elevation-2)
```

**Hover State**
```yaml
Border: 1px solid rgba(255,46,154,0.3)
Box Shadow: var(--ff-glow-card-hover)
Transform: none (no lift)
Background: #181827 (no change)
```

**CSS Example**
```css
.card {
  background: var(--ff-bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: var(--ff-radius-xl);
  padding: var(--ff-spacing-lg);
  box-shadow: var(--ff-elevation-2);
  transition: var(--ff-transition-base);
}

.card:hover {
  border-color: rgba(255,46,154,0.3);
  box-shadow: var(--ff-glow-card-hover);
}
```

---

## 9.4 Modal Component

### 9.4.1 Modal Overlay & Container

**Overlay**
```yaml
Background: rgba(15,15,25,0.82)
Backdrop Filter: blur(8px)
Animation: Fade in 200ms
```

**Modal Content**
```yaml
Background: #181827
Border: 1px solid rgba(255,255,255,0.05)
Border Radius: 26px
Padding: 24px
Box Shadow: var(--ff-elevation-5)
Max Width: 600px
Animation: Scale up from center + fade in 250ms
```

**CSS Example**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--ff-bg-overlay);
  backdrop-filter: blur(8px);
  animation: fadeIn var(--ff-motion-duration-base) var(--ff-motion-easing-ease-out);
}

.modal-content {
  background: var(--ff-bg-surface);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: var(--ff-radius-2xl);
  padding: var(--ff-spacing-2xl);
  box-shadow: var(--ff-elevation-5);
  max-width: 600px;
  animation: scaleUp var(--ff-motion-duration-slow) var(--ff-motion-easing-ease-out);
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 9.5 Navigation Components

### 9.5.1 Navbar

**Visual Style**
```yaml
Background: #0B0B14
Backdrop Filter: blur(18px)
Border Bottom: 1px solid rgba(255,255,255,0.05)
Height: 56px
Padding: 0 24px
```

**Structure**
```
[Logo] [Menu Items] [User Menu] [Export Button]
```

**Menu Item Active State**
```yaml
Background: rgba(255,46,154,0.1)
Border Bottom: 2px solid #FF2E9A
Color: #FFFFFF
```

### 9.5.2 Sidebar

**Visual Style**
```yaml
Background: #10101A
Width: 240px (desktop), 280px (expanded)
Border Right: 1px solid rgba(255,255,255,0.05)
Padding: 16px 12px
```

**Menu Item Active State**
```yaml
Background: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)
Border Radius: 14px
Color: #FFFFFF
Icon Color: #FFFFFF
```

**Menu Item Hover State**
```yaml
Background: rgba(124,58,237,0.1)
Border Radius: 14px
```

---

## 9.6 Badge Component

### 9.6.1 Badge Styles

**AI Badge**
```yaml
Background: rgba(124,58,237,0.15)
Border: 1px solid #7C3AED
Color: #A855F7
Border Radius: 999px
Padding: 4px 12px
Font Size: 12px
Font Weight: 600
```

**Pro Badge**
```yaml
Background: rgba(255,138,52,0.15)
Border: 1px solid #FF8A34
Color: #FF8A34
Border Radius: 999px
Padding: 4px 12px
```

**New Badge**
```yaml
Background: rgba(255,46,154,0.15)
Border: 1px solid #FF2E9A
Color: #FF2E9A
Border Radius: 999px
Padding: 4px 12px
```

**Success Badge**
```yaml
Background: rgba(0,208,132,0.15)
Border: 1px solid #00D084
Color: #00D084
Border Radius: 999px
Padding: 4px 12px
```

---

## 9.7 Form Components

### 9.7.1 Checkbox

**Unchecked State**
```yaml
Size: 20x20px
Border: 2px solid #2A2A40
Border Radius: 6px
Background: #11111B
Cursor: pointer
```

**Checked State**
```yaml
Background: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)
Border: 2px solid transparent
Icon: ✓ (#FFFFFF)
```

**Hover State**
```yaml
Border Color: #FF2E9A
Box Shadow: 0 0 12px rgba(255,46,154,0.3)
```

### 9.7.2 Switch / Toggle

**OFF State**
```yaml
Width: 48px
Height: 28px
Background: #2A2A40
Border Radius: 14px
Thumb: 24px circle @ left
Thumb Color: #7E86A4
```

**ON State**
```yaml
Background: linear-gradient(135deg, #7C3AED 0%, #FF2E9A 100%)
Thumb: @ right
Thumb Color: #FFFFFF
Glow: 0 0 12px rgba(255,46,154,0.4)
```

---

## 9.8 AI-Specific Components

### 9.8.1 Before/After Viewer

**Container**
```yaml
Background: linear-gradient(90deg, #0B0B14 0%, #10101A 50%, #0B0B14 100%)
Border: 1px solid #2A2A40
Border Radius: 22px
Overflow: hidden
Aspect Ratio: depends on image
```

**Handle / Slider**
```yaml
Width: 4px
Height: 100%
Background: linear-gradient(135deg, #FF2E9A 0%, #FF8A34 100%)
Cursor: col-resize
Box Shadow: var(--ff-glow-icon)
```

**Label**
```
BEFORE | AFTER
Font: Inter 12px / 600 weight
Color: #FFFFFF
Position: top-left, top-right (absolute)
Padding: 8px 12px
Background: rgba(15,15,25,0.7)
Border Radius: 8px
```

### 9.8.2 AI Color Feature Card

**Card Layout**
```yaml
Background: #181827
Border: 1px solid rgba(255,46,154,0.2)
Border Radius: 22px
Padding: 16px
Icon Area: 40x40px
Icon Background: rgba(124,58,237,0.15)
Icon Border: 1px solid #7C3AED
Icon Border Radius: 12px
Icon Gradient: linear-gradient(135deg, #FF2E9A 0%, #FF8A34 100%)
Title: 14px / 600 weight
Description: 13px / 400 weight / #AAB2D5
```

**Hover State**
```yaml
Border Color: rgba(255,46,154,0.4)
Box Shadow: 0 0 20px rgba(255,46,154,0.2)
Transform: scale(1.02)
Duration: 250ms
```

### 9.8.3 Upload Zone

**Default State**
```yaml
Background: rgba(26,26,38,0.4)
Border: 2px dashed #7C3AED
Border Radius: 22px
Padding: 32px
Text Align: center
Cursor: pointer
Animation: breathing glow
```

**Hover/Drag Over State**
```yaml
Background: rgba(124,58,237,0.1)
Border Color: #FF2E9A
Box Shadow: 0 0 20px rgba(255,46,154,0.3)
Border Style: dashed
```

**File Uploaded State**
```yaml
Background: rgba(0,208,132,0.1)
Border Color: #00D084
Icon: ✓
Text Color: #00D084
```

### 9.8.4 Timeline Component

**Container**
```yaml
Background: transparent
Padding: 16px 0
Vertical orientation by default
```

**Timeline Item**
```yaml
Frame Thumbnail: 48x48px, border-radius: 8px
Item Height: 56px
Active Frame: 
  - Border: 2px solid + gradient
  - Box Shadow: glow
  - Background highlight: rgba(255,46,154,0.1)
```

**Connector Line**
```yaml
Width: 2px
Height: variable (between items)
Background: linear-gradient(180deg, #7C3AED 0%, #FF2E9A 100%)
Color: #FF2E9A when active
```

---

## 9.9 Feedback Components

### 9.9.1 Toast Notification

**Success Toast**
```yaml
Background: rgba(0,208,132,0.15)
Border: 1px solid #00D084
Border Left: 4px solid #00D084
Border Radius: 12px
Padding: 12px 16px
Icon Color: #00D084
Text Color: #FFFFFF
```

**Error Toast**
```yaml
Background: rgba(255,61,113,0.15)
Border: 1px solid #FF3D71
Border Left: 4px solid #FF3D71
Icon Color: #FF3D71
```

**Warning Toast**
```yaml
Background: rgba(255,138,52,0.15)
Border: 1px solid #FF8A34
Border Left: 4px solid #FF8A34
Icon Color: #FF8A34
```

**Info Toast**
```yaml
Background: rgba(124,58,237,0.15)
Border: 1px solid #7C3AED
Border Left: 4px solid #7C3AED
Icon Color: #7C3AED
```

**Animation**
```yaml
Entry: slideInRight 250ms cubic-bezier(0.4, 0, 0.2, 1)
Exit: slideOutRight 250ms cubic-bezier(0.4, 0, 0.2, 1)
Auto Dismiss: 3000ms
```

### 9.9.2 Loading Indicator

**Spinner**
```yaml
Size: 32x32px (default)
Border: 3px solid #2A2A40
Border Top Color: linear-gradient(135deg, #FF2E9A 0%, #FF8A34 100%)
Border Radius: 50%
Animation: rotate 1200ms linear infinite
```

**Progress Bar**
```yaml
Height: 4px
Background: #2A2A40
Fill: linear-gradient(90deg, #7C3AED 0%, #FF8A34 100%)
Border Radius: 2px
Animation: smooth width transition
```

---

## 9.10 Data Display Components

### 9.10.1 Progress Bar

**Container**
```yaml
Height: 6px
Background: #2A2A40
Border Radius: 3px
Overflow: hidden
```

**Fill**
```yaml
Background: linear-gradient(90deg, #7C3AED 0%, #FF8A34 100%)
Height: 100%
Border Radius: 3px
Transition: width 300ms var(--ff-motion-easing-ease-out)
```

**Label** (optional)
```yaml
Font Size: 12px
Font Weight: 600
Color: #AAB2D5
Margin Top: 8px
```

### 9.10.2 Slider

**Track**
```yaml
Height: 4px
Background: #2A2A40
Border Radius: 2px
```

**Thumb**
```yaml
Size: 20x20px
Background: #FF2E9A
Border: 2px solid #FFFFFF
Border Radius: 50%
Box Shadow: 0 0 12px rgba(255,46,154,0.4)
Cursor: pointer
```

**Range Fill**
```yaml
Background: linear-gradient(90deg, #7C3AED 0%, #FF8A34 100%)
Border Radius: 2px
```

---

# 10. Interactive States

## 10.1 Hover States

**General Rule**
```yaml
Transform: translateY(-3px)
Duration: 200ms
Easing: cubic-bezier(0.4, 0, 0.2, 1)
Shadow/Glow: increase by ~30%
```

## 10.2 Active/Pressed States

**General Rule**
```yaml
Transform: translateY(0px) (no lift)
Opacity: 0.9
Duration: 100ms (snappy)
Shadow/Glow: decrease by ~50%
```

## 10.3 Focus States

**Keyboard Focus** (WCAG 2.1 AA)
```yaml
Outline: 2px solid #FF2E9A
Outline Offset: 2px
Border Radius: match component
No color change needed (outline sufficient)
```

**Example CSS**
```css
button:focus-visible {
  outline: 2px solid var(--ff-neon-pink);
  outline-offset: 2px;
}

input:focus-visible {
  outline: 2px solid var(--ff-neon-pink);
  outline-offset: 2px;
}
```

## 10.4 Disabled States

**General Rule**
```yaml
Opacity: 0.5-0.6
Color: desaturate / dim
Cursor: not-allowed
No interaction feedback (no hover, no glow)
```

## 10.5 Loading States

**General Rule**
```yaml
Show spinner / progress bar
Disable interaction (pointer-events: none)
Opacity: 0.8 (slightly dimmed)
Duration: indefinite or time-bound
```

## 10.6 Error States

**Input with Error**
```yaml
Border Color: #FF3D71
Glow: 0 0 16px rgba(255,61,113,0.3)
Icon: ✗ in #FF3D71
Helper Text: 12px / #FF3D71
Background: no change
```

---

# 11. Responsive Design

## 11.1 Breakpoints

```yaml
# Mobile
--ff-breakpoint-xs: 320px
--ff-breakpoint-sm: 375px

# Tablet
--ff-breakpoint-md: 768px
--ff-breakpoint-lg: 1024px

# Desktop
--ff-breakpoint-xl: 1440px
--ff-breakpoint-2xl: 1920px
```

## 11.2 Responsive Typography

```yaml
# H1
Mobile (sm): 32px
Tablet (md): 40px
Desktop (lg+): 48px

# H2
Mobile: 24px
Tablet: 32px
Desktop: 36px

# Body
Mobile: 14px (same)
Tablet: 14px (same)
Desktop: 16px
```

## 11.3 Responsive Spacing

```yaml
# Mobile: use --ff-spacing-md to --ff-spacing-lg
# Tablet: use --ff-spacing-lg to --ff-spacing-2xl
# Desktop: use --ff-spacing-2xl to --ff-spacing-3xl
```

## 11.4 Touch Targets (Mobile)

```yaml
Minimum Size: 44x44px (touch target)
Minimum Spacing: 8px between touch targets
Applies to: buttons, links, form controls, interactive elements
```

---

# 12. Accessibility (WCAG 2.1 AA)

## 12.1 Color Contrast

| Component | Text Color | Background | Ratio | Status |
|-----------|-----------|-----------|-------|--------|
| Primary Button | #FFFFFF | Gradient (avg) | 7.2:1 | ✅ AAA |
| Body Text | #FFFFFF | #0B0B14 | 21:1 | ✅ AAA |
| Secondary Text | #AAB2D5 | #0B0B14 | 8.5:1 | ✅ AAA |
| Placeholder | #7E86A4 | #11111B | 4.8:1 | ✅ AA |

## 12.2 Focus Management

- All interactive elements **must** have visible focus indicators
- Focus order follows visual/DOM order (no tabindex manipulation)
- Focus trap in modals (keyboard nav cycles within modal)
- Focus restoration after modal close

## 12.3 Semantic HTML

```html
<!-- Good -->
<button type="button">Submit</button>
<nav role="navigation"></nav>
<main role="main"></main>

<!-- Bad -->
<div onclick="...">Submit</div>
<div role="button">Submit</div>
```

## 12.4 ARIA Labels

```html
<button aria-label="Close modal">
  <svg aria-hidden="true">...</svg>
</button>

<input aria-label="Search" />

<div role="status" aria-live="polite" aria-atomic="true">
  File uploaded successfully
</div>
```

## 12.5 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

.btn-primary {
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    transition: var(--ff-transition-base);
  }
}
```

## 12.6 Text Alternatives

- All images/icons must have alt text or aria-hidden
- Decorative icons: `aria-hidden="true"`
- Meaningful icons: `aria-label="..."` or nearby text label

---

# 13. Animation Guidelines

## 13.1 Hover Animations

**All Interactive Elements**
```css
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
transform: translateY(-3px);
```

## 13.2 Glow Animations

**Breathing Glow** (Upload Zone)
```css
animation: ff-glow 2s ease-in-out infinite;
```

**Stagger Animation** (List Items)
```css
/* Item 1 */ animation-delay: 0ms;
/* Item 2 */ animation-delay: 50ms;
/* Item 3 */ animation-delay: 100ms;
```

## 13.3 Page Transitions

```css
/* Fade in on load */
@keyframes pageEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

body {
  animation: pageEnter 300ms var(--ff-motion-easing-ease-out);
}
```

---

# 14. Component Implementation Examples

## 14.1 React Button Component

```jsx
import React from 'react';
import styles from './Button.module.css';

export const Button = ({
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  );
};
```

```css
/* Button.module.css */
.btn {
  font-family: var(--ff-font-primary);
  font-size: 14px;
  font-weight: 600;
  border-radius: var(--ff-radius-md);
  padding: 10px 24px;
  min-height: 44px;
  cursor: pointer;
  transition: var(--ff-transition-base);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-primary {
  background: var(--ff-gradient-primary);
  color: #FFFFFF;
  box-shadow: var(--ff-glow-button-primary);
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(168,85,247,0.45);
}

.btn-primary:active:not(:disabled) {
  filter: brightness(0.95);
  transform: translateY(0px);
  box-shadow: 0 8px 30px rgba(168,85,247,0.25);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #161622;
  border: 1px solid #2B2B45;
  color: #FFFFFF;
}

.btn-secondary:hover:not(:disabled) {
  border-color: #FF2E9A;
  box-shadow: 0 0 16px rgba(255,46,154,0.3);
  transform: translateY(-3px);
}
```

## 14.2 React Input Component

```jsx
import React, { useState } from 'react';
import styles from './Input.module.css';

export const Input = ({
  error = false,
  errorMessage = '',
  placeholder = '',
  type = 'text',
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${error ? styles.error : ''}`}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${props.id}-error`} className={styles.errorText}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
```

```css
/* Input.module.css */
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input {
  background: var(--ff-bg-tertiary);
  border: 1px solid var(--ff-border-primary);
  border-radius: var(--ff-radius-md);
  padding: 10px 12px;
  font-family: var(--ff-font-primary);
  font-size: 14px;
  color: var(--ff-text-primary);
  min-height: 40px;
  transition: var(--ff-transition-colors);
  outline: none;
}

.input::placeholder {
  color: var(--ff-text-tertiary);
}

.input:focus {
  border-color: var(--ff-neon-pink);
  box-shadow: var(--ff-glow-input-focus);
}

.input.error {
  border-color: #FF3D71;
  box-shadow: 0 0 16px rgba(255,61,113,0.3);
}

.errorText {
  font-size: 12px;
  color: #FF3D71;
  margin-top: 4px;
}
```

---

# 15. Design System Usage Guidelines

## 15.1 Token Naming Convention

```
--ff-{category}-{subcategory}-{state}

Examples:
--ff-color-primary-main
--ff-color-neon-pink
--ff-spacing-lg
--ff-radius-md
--ff-motion-duration-base
--ff-shadow-glow-md
--ff-gradient-primary
```

## 15.2 Component Naming Convention

```
Frame Flow Neon v2: {Component}{Variant}

Examples:
ButtonPrimary
InputText
CardSurface
ModalDefault
BadgeAI
```

## 15.3 File Structure

```
src/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   ├── shadows.css
│   ├── animations.css
│   └── index.css (imports all)
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── Button.stories.jsx (Storybook)
│   ├── Input/
│   ├── Card/
│   ├── Modal/
│   └── ...
├── styles/
│   ├── globals.css (reset + base styles)
│   └── utilities.css (if using utility classes)
└── pages/
```

---

# 16. Migration Checklist: Material → Neon v2

- [ ] Update all color values (no more Material red, use Neon pink)
- [ ] Replace card borders (Material gray → transparent + subtle glow)
- [ ] Add glow shadows to interactive elements
- [ ] Update button styles (gradient + neon glow)
- [ ] Revise modal backdrop (add blur effect)
- [ ] Update focus states (outline → neon border)
- [ ] Add neon gradient borders to upload zones
- [ ] Update badge colors (AI/Pro/New → neon variants)
- [ ] Implement glass morphism on nav/sidebar
- [ ] Add aurora background to hero section
- [ ] Test all contrast ratios (WCAG AA)
- [ ] Test keyboard navigation & focus states
- [ ] Test animations in reduced-motion mode
- [ ] Update Figma components & styles
- [ ] Update design tokens documentation
- [ ] Create component Storybook entries
- [ ] Deploy updated design system

---

# 17. Testing & Validation

## 17.1 Visual Testing

- [ ] All gradients render correctly
- [ ] Glow effects visible on all supported browsers
- [ ] Glass morphism blur effect is smooth
- [ ] Colors appear consistent (no banding)

## 17.2 Interaction Testing

- [ ] Hover states trigger smoothly
- [ ] Focus rings are clearly visible
- [ ] Disabled states prevent interaction
- [ ] Loading spinners animate correctly

## 17.3 Accessibility Testing

- [ ] Run axe DevTools audit → 0 violations
- [ ] Test with keyboard only (Tab, Enter, Escape, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify color contrast with WebAIM tools
- [ ] Test with prefers-reduced-motion enabled

## 17.4 Cross-Browser Testing

- [ ] Chrome / Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS + macOS)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

# 18. Tools & Resources

## 18.1 Recommended Tools

- **Design**: Figma (with Neon Design Kit)
- **Documentation**: Storybook (component library)
- **Tokens**: Token Studio for Figma or Style Dictionary
- **Accessibility**: WAVE, axe DevTools, Lighthouse
- **Color Contrast**: WebAIM Contrast Checker
- **Animation**: Framer Motion (React)

## 18.2 References

- Google Material Design 3: https://m3.material.io
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Web.dev Accessibility: https://web.dev/accessibility/
- MDN Web Docs: https://developer.mozilla.org/

---

# 19. Versioning & Updates

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | TBD | Initial Material Design |
| 2.0 | 2026-06-30 | Full Neon/Aurora redesign |
| 2.1 (planned) | Q3 2026 | Additional AI components, advanced animations |

---

**Last Updated**: June 30, 2026  
**Status**: Active (FrameFlow Neon v2)  
**Maintained By**: Khanh-0 / FrameFlow Design Team