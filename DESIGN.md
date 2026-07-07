---
name: FPT Design System
description: A modern dark-theme design system with neon gradients and glassmorphism effects, built for creative tools and visual applications.
version: 2.0.0

colors:
  - name: Deep Background
    value: "#0B0B14"
    description: Darkest background color for main viewport areas
  - name: Dark Background
    value: "#10101A"
    description: Primary dark background, used in gradients
  - name: Card Background
    value: "#181827"
    description: Background for cards, panels, and elevated surfaces
  - name: Input Background
    value: "#11111B"
    description: Background for input fields and form elements
  - name: Purple Primary
    value: "#7C3AED"
    description: Primary purple for gradients and interactive elements
  - name: Purple Accent
    value: "#A855F7"
    description: Secondary purple for UI accents and icons
  - name: Hot Pink
    value: "#FF2E9A"
    description: Brand accent color for highlights and active states
  - name: Orange
    value: "#FF8A34"
    description: Warm accent for secondary actions and alerts
  - name: Primary Blue
    value: "#3B82F6"
    description: Blue for primary actions and focus states
  - name: Success Green
    value: "#10B981"
    description: Green for success messages and positive feedback
  - name: Warning Orange
    value: "#F59E0B"
    description: Orange for warnings and attention-needed states
  - name: Error Red
    value: "#FF3D71"
    description: Red for errors and destructive actions
  - name: Light Text
    value: "#F5F3FF"
    description: Primary text color for headings and emphasis
  - name: White
    value: "#FFFFFF"
    description: Pure white for contrast and highlights
  - name: Secondary Text
    value: "#AAB2D5"
    description: Secondary text for descriptions and metadata
  - name: Muted Text
    value: "#7E86A4"
    description: Muted text for disabled or less important content
  - name: Border Color
    value: "#2A2A40"
    description: Primary border color for dark surfaces

typography:
  - name: Heading 1
    fontFamily: "'Inter', sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "1.2"
    description: Page titles and major headings
  - name: Heading 2
    fontFamily: "'Inter', sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "1.3"
    description: Section headings
  - name: Heading 3
    fontFamily: "'Inter', sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "1.4"
    description: Subheadings and panel titles
  - name: Body Large
    fontFamily: "'Inter', sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "1.5"
    description: Primary body text and labels
  - name: Body Regular
    fontFamily: "'Inter', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.6"
    description: Standard body text and descriptions
  - name: Body Small
    fontFamily: "'Inter', sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.5"
    description: Secondary text and metadata
  - name: Caption
    fontFamily: "'Inter', sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: "1.4"
    description: Captions and helper text
  - name: Monospace
    fontFamily: "'Courier New', monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "1.6"
    description: Code and technical content

components:
  - name: Button Primary
    description: Main call-to-action button
    backgroundColor: "linear-gradient(135deg, #7C3AED, #FF2E9A)"
    textColor: "#FFFFFF"
    padding: "8px 16px"
    borderRadius: "8px"
    fontSize: "14px"
    fontWeight: 600
    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.3)"
  - name: Button Secondary
    description: Secondary action button
    backgroundColor: "#181827"
    textColor: "#FF2E9A"
    border: "1.5px solid #FF2E9A"
    padding: "8px 16px"
    borderRadius: "8px"
    fontSize: "14px"
    fontWeight: 500
  - name: Button Tertiary
    description: Minimal button variant
    backgroundColor: "transparent"
    textColor: "#AAB2D5"
    border: "1px solid #2A2A40"
    padding: "8px 16px"
    borderRadius: "8px"
    fontSize: "14px"
    fontWeight: 500
  - name: Card
    description: Container for grouped content
    backgroundColor: "#181827"
    border: "1px solid #2A2A40"
    borderRadius: "12px"
    padding: "16px"
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  - name: Input Field
    description: Text input for forms
    backgroundColor: "#11111B"
    borderColor: "#2A2A40"
    border: "1px solid #2A2A40"
    borderRadius: "8px"
    padding: "10px 12px"
    fontSize: "14px"
    textColor: "#F5F3FF"
    focusBorder: "1.5px solid #A855F7"
  - name: Badge
    description: Small label or status indicator
    backgroundColor: "rgba(168, 85, 247, 0.15)"
    textColor: "#A855F7"
    border: "1px solid rgba(168, 85, 247, 0.3)"
    padding: "4px 8px"
    borderRadius: "4px"
    fontSize: "11px"
    fontWeight: 600

spacing:
  - xs: "4px"
  - sm: "8px"
  - md: "12px"
  - lg: "16px"
  - xl: "24px"
  - xxl: "32px"

borderRadius:
  - sm: "4px"
  - md: "8px"
  - lg: "12px"
  - xl: "16px"

shadows:
  - sm: "0 1px 2px rgba(0, 0, 0, 0.05)"
  - md: "0 4px 6px rgba(0, 0, 0, 0.1)"
  - lg: "0 10px 15px rgba(0, 0, 0, 0.15)"
  - xl: "0 20px 25px rgba(0, 0, 0, 0.2)"

---

# FPT Design System v2.0

## Overview

The FPT Design System is a comprehensive design language built for modern creative tools and visual applications. It features a sophisticated dark theme with vibrant neon gradients, glassmorphism effects, and carefully curated color palettes designed for prolonged visual comfort and brand recognition.

This design system emphasizes:
- **Dark Theme Optimization** - Reduces eye strain for creative professionals
- **Neon Gradients** - Modern aesthetic with purple and pink brand colors
- **Glassmorphism** - Layered transparency effects for depth and hierarchy
- **Accessibility** - High contrast ratios and semantic color usage
- **Performance** - Optimized for interactive applications and real-time feedback

---

## Color Palette

### Primary Brand Colors

The brand is anchored by a vibrant gradient ranging from purple (#7C3AED) through pink (#A855F7) to hot pink (#FF2E9A). These colors are used for primary actions, highlights, and brand moments.

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | #7C3AED | Gradient start, primary UI elements |
| Purple Accent | #A855F7 | Icons, accents, secondary highlights |
| Hot Pink | #FF2E9A | Active states, CTAs, brand emphasis |
| Orange | #FF8A34 | Warm accents, tertiary actions |

### Semantic Colors

Semantic colors convey meaning and user feedback through established conventions:

| Color | Hex | Usage |
|-------|-----|-------|
| Success | #10B981 | Success messages, positive feedback |
| Warning | #F59E0B | Warnings and attention-needed states |
| Error | #FF3D71 | Errors, destructive actions |
| Info | #3B82F6 | Information, primary actions |

### Background & Neutral

The dark theme uses carefully selected neutrals for readability and hierarchy:

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Background | #0B0B14 | Viewport and full-screen backgrounds |
| Dark Background | #10101A | Gradient components and panel backgrounds |
| Card Background | #181827 | Elevated surfaces and cards |
| Input Background | #11111B | Form inputs and text areas |
| Border | #2A2A40 | Dividers and subtle borders |

### Text Colors

Text colors are optimized for the dark theme with high contrast for accessibility:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Text | #F5F3FF | Headings, primary copy |
| Secondary Text | #AAB2D5 | Descriptions, metadata |
| Muted Text | #7E86A4 | Disabled states, helper text |
| White | #FFFFFF | High contrast, emphasis |

---

## Typography

### Font Stack

All typography uses **Inter** as the primary font family, a modern humanist sans-serif designed for clarity and legibility on screens.

```
Font Family: 'Inter', sans-serif
Fallback: System font stack
Monospace: 'Courier New', monospace
```

### Type Scale

The type scale follows a modular progression designed for visual hierarchy and readability:

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Heading 1 | 32px | 700 | 1.2 | Page titles |
| Heading 2 | 24px | 700 | 1.3 | Section headings |
| Heading 3 | 20px | 600 | 1.4 | Subheadings, panels |
| Body Large | 16px | 500 | 1.5 | Labels, emphasis |
| Body Regular | 14px | 400 | 1.6 | Primary copy |
| Body Small | 12px | 400 | 1.5 | Secondary text |
| Caption | 10px | 500 | 1.4 | Helper text |
| Monospace | 12px | 400 | 1.6 | Code, technical content |

### Font Weights

- **400** (Regular) - Body text, standard content
- **500** (Medium) - Labels, emphasis within body
- **600** (Semibold) - Subheadings, strong emphasis
- **700** (Bold) - Headings, primary emphasis

---

## Components

### Button

Buttons are the primary interactive elements. Three variants provide clear hierarchy:

#### Primary Button
- **Background**: Linear gradient from purple to pink (`linear-gradient(135deg, #7C3AED, #FF2E9A)`)
- **Text Color**: White
- **Padding**: 8px 16px
- **Border Radius**: 8px
- **Font Size**: 14px, weight 600
- **Shadow**: `0 4px 12px rgba(168, 85, 247, 0.3)`
- **Usage**: Main calls-to-action and primary interactions

#### Secondary Button
- **Background**: Dark (#181827)
- **Border**: 1.5px solid hot pink (#FF2E9A)
- **Text Color**: Hot pink
- **Padding**: 8px 16px
- **Border Radius**: 8px
- **Font Size**: 14px, weight 500
- **Usage**: Alternative actions and destructive operations

#### Tertiary Button
- **Background**: Transparent
- **Border**: 1px solid border color (#2A2A40)
- **Text Color**: Secondary text (#AAB2D5)
- **Padding**: 8px 16px
- **Border Radius**: 8px
- **Font Size**: 14px, weight 500
- **Usage**: Low-emphasis actions and optional interactions

### Card

Cards are elevated containers for grouped content:

- **Background**: Card background (#181827)
- **Border**: 1px solid border color (#2A2A40)
- **Border Radius**: 12px
- **Padding**: 16px
- **Shadow**: `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Usage**: Content containers, panels, section grouping

### Input Field

Input fields are used for text capture and data entry:

- **Background**: Input background (#11111B)
- **Border**: 1px solid border color (#2A2A40)
- **Border Radius**: 8px
- **Padding**: 10px 12px
- **Font Size**: 14px
- **Text Color**: Primary text (#F5F3FF)
- **Focus State**: 1.5px solid purple (#A855F7)
- **Usage**: Forms, search, text input

### Badge

Badges are small inline labels for status or categorization:

- **Background**: Semi-transparent purple (`rgba(168, 85, 247, 0.15)`)
- **Text Color**: Purple accent (#A855F7)
- **Border**: 1px solid `rgba(168, 85, 247, 0.3)`
- **Padding**: 4px 8px
- **Border Radius**: 4px
- **Font Size**: 11px, weight 600
- **Usage**: Status indicators, tags, labels

---

## Spacing & Layout

### Spacing Scale

A consistent spacing scale ensures visual harmony and alignment:

| Token | Size | Usage |
|-------|------|-------|
| xs | 4px | Micro spacing, icon alignment |
| sm | 8px | Small gaps, compact layouts |
| md | 12px | Standard spacing, default gap |
| lg | 16px | Paragraph spacing, section padding |
| xl | 24px | Major section spacing |
| xxl | 32px | Large section dividers |

### Border Radius Scale

Consistent radius values create a cohesive visual appearance:

| Token | Size | Usage |
|-------|------|-------|
| sm | 4px | Badge, small elements |
| md | 8px | Button, input fields |
| lg | 12px | Cards, panels |
| xl | 16px | Large containers, modals |

---

## Effects & Shadows

### Box Shadows

Layered shadows create depth and visual hierarchy:

| Shadow | Value | Usage |
|--------|-------|-------|
| Small | `0 1px 2px rgba(0, 0, 0, 0.05)` | Subtle elevation, lines |
| Medium | `0 4px 6px rgba(0, 0, 0, 0.1)` | Cards, panels |
| Large | `0 10px 15px rgba(0, 0, 0, 0.15)` | Floating elements, modals |
| Extra Large | `0 20px 25px rgba(0, 0, 0, 0.2)` | Dropdowns, popovers |

### Glassmorphism

Glass effects use semi-transparent overlays with subtle blur:

```css
background: rgba(22, 22, 34, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

### Transitions

Smooth transitions enhance interactivity:

- **Standard**: `all 0.2s ease-in-out`
- **Fast**: `all 0.1s ease-out`
- **Slow**: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

---

## Dark Theme Guidelines

### Contrast & Accessibility

All color combinations meet WCAG AA standards for contrast ratios:

- **Text on Background**: 7:1+ contrast ratio
- **Interactive Elements**: 4.5:1+ contrast ratio
- **UI Components**: 3:1+ contrast ratio

### Eye Comfort

The dark theme is optimized for reduced eye strain:

- Avoids pure white (#FFFFFF) for large text areas
- Uses warm, muted backgrounds for primary surfaces
- Limits high-saturation colors to interactive elements
- Provides optional reduced motion alternatives

---

## Usage Examples

### Primary CTA with Gradient
```html
<button class="btn-primary">Launch Project</button>
```

### Card with Content
```html
<div class="card">
  <h3>Dashboard</h3>
  <p>Manage your projects and settings</p>
</div>
```

### Form with Inputs
```html
<form>
  <input type="text" placeholder="Enter name" class="input-field" />
  <button class="btn-primary">Submit</button>
</form>
```

---

## Best Practices

1. **Color Usage**: Use brand colors (#A855F7, #FF2E9A) for primary interactive elements
2. **Typography**: Maintain hierarchy with consistent font weights and sizes
3. **Spacing**: Use the spacing scale for consistent padding and margins
4. **Accessibility**: Always ensure sufficient color contrast and provide text alternatives
5. **Performance**: Optimize gradient usage and limit shadow layers for performance
6. **Dark Theme**: Avoid pure white backgrounds; use Card Background (#181827) instead

---

## Design Tokens Export

Design tokens are automatically exported for implementation in code:

```json
{
  "colors": {
    "primary": "#A855F7",
    "accent": "#FF2E9A",
    "background": "#181827",
    "text": "#F5F3FF"
  },
  "typography": {
    "fontFamily": "'Inter', sans-serif",
    "fontSize": { "lg": "16px", "md": "14px", "sm": "12px" }
  },
  "spacing": { "sm": "8px", "md": "12px", "lg": "16px" }
}
```

---

**Last Updated**: June 2026  
**Version**: 2.0.0  
**Maintainer**: FPT Design Team