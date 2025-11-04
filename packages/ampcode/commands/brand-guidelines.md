---
description: Apply Anthropic's official brand colors and typography to any artifact
argument-hint: <artifact-type>
---

Apply Anthropic's official brand identity and style resources to your work.

## Brand Colors

**Main Colors:**
- **Dark**: `#141413` - Primary text and dark backgrounds
- **Light**: `#faf9f5` - Light backgrounds and text on dark
- **Mid Gray**: `#b0aea5` - Secondary elements
- **Light Gray**: `#e8e6dc` - Subtle backgrounds

**Accent Colors:**
- **Orange**: `#d97757` - Primary accent
- **Blue**: `#6a9bcc` - Secondary accent  
- **Green**: `#788c5d` - Tertiary accent

## Typography

**Font Selection:**
- **Headings**: Poppins (with Arial fallback)
- **Body Text**: Lora (with Georgia fallback)

**Font Application Rules:**
- Headings (24pt+): Poppins font
- Body text: Lora font
- Smart color selection based on background
- Preserves text hierarchy and formatting

## Usage Guidelines

### Smart Font Application
- Automatically applies Poppins to headings
- Applies Lora to body text
- Provides fallback fonts if custom fonts unavailable
- Maintains readability across all systems

### Color Application
- Main colors for backgrounds and text
- Accent colors for highlights, buttons, and callouts
- Cycles through accent palette for visual interest
- Maintains brand consistency

### Visual Hierarchy
- Large text (24pt+): Poppins
- Regular text: Lora
- Consistent color application
- Proper contrast ratios

## Implementation

### CSS Example
```css
:root {
  --anthropic-dark: #141413;
  --anthropic-light: #faf9f5;
  --anthropic-mid-gray: #b0aea5;
  --anthropic-light-gray: #e8e6dc;
  --anthropic-orange: #d97757;
  --anthropic-blue: #6a9bcc;
  --anthropic-green: #788c5d;
}

.heading {
  font-family: 'Poppins', Arial, sans-serif;
  color: var(--anthropic-dark);
}

.body {
  font-family: 'Lora', Georgia, serif;
  color: var(--anthropic-dark);
}

.accent {
  color: var(--anthropic-orange);
}
```

### Python Example (python-pptx)
```python
from pptx.util import RGBColor

# Brand colors as RGB
ANTHROPIC_COLORS = {
    'dark': RGBColor(20, 20, 19),
    'light': RGBColor(250, 249, 245),
    'mid_gray': RGBColor(176, 174, 165),
    'orange': RGBColor(217, 119, 87),
    'blue': RGBColor(106, 155, 204),
    'green': RGBColor(120, 140, 93)
}

# Apply to shapes and text
shape.fill.solid()
shape.fill.fore_color.rgb = ANTHROPIC_COLORS['orange']
```

## Best Practices

- Use dark/light colors for text and backgrounds
- Apply accent colors sparingly for emphasis
- Maintain proper contrast ratios
- Use typography hierarchy consistently
- Consider accessibility in color choices

## Usage Examples

**Apply brand to presentation:**
`/brand-guidelines presentation slides`

**Apply brand to document:**
`/brand-guidelines technical document`

**Apply brand to web page:**
`/brand-guidelines landing page`

**Apply brand to report:**
`/brand-guidelines quarterly report`

Remember: Brand consistency builds trust and recognition. Apply these guidelines consistently across all materials.
