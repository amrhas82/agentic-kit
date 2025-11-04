---
description: Create animated GIFs optimized for Slack with size validation and composable animation primitives
argument-hint: <gif-type> <animation-concept>
---

Create animated GIFs optimized for Slack using composable animation primitives and strict size validators.

## Slack Requirements

### Message GIFs
- Max size: ~2MB
- Optimal dimensions: 480x480
- Typical FPS: 15-20
- Color limit: 128-256
- Duration: 2-5s

### Emoji GIFs (Challenging)
- Max size: 64KB (strict limit)
- Optimal dimensions: 128x128
- Typical FPS: 10-12
- Color limit: 32-48
- Duration: 1-2s

**Emoji optimization strategies:**
- Limit to 10-15 frames total
- Use 32-48 colors maximum
- Keep designs simple
- Avoid gradients
- Validate file size frequently

## Core Validation Tools

### File Size Validation
```python
from core.validators import check_slack_size

# Check if GIF meets size limits
passes, info = check_slack_size('emoji.gif', is_emoji=True)
# Returns: (True/False, dict with size details)
```

### Dimension Validation
```python
from core.validators import validate_dimensions

# Check dimensions
passes, info = validate_dimensions(128, 128, is_emoji=True)
# Returns: (True/False, dict with dimension details)
```

### Complete Validation
```python
from core.validators import validate_gif, is_slack_ready

# Run all validations
all_pass, results = validate_gif('emoji.gif', is_emoji=True)

# Quick readiness check
if is_slack_ready('emoji.gif', is_emoji=True):
    print("Ready to upload!")
```

## Animation Primitives

Composable building blocks for motion that can be combined:

### Shake Animation
```python
from templates.shake import create_shake_animation

# Create shaking motion
frames = create_shake_animation(
    object_type='circle',
    object_data={'radius': 30, 'color': (255, 0, 0)},
    num_frames=20,
    shake_intensity=10,
    start_x=240,
    start_y=240
)
```

### Bounce Animation
```python
from templates.bounce import create_bounce_animation

# Create bouncing motion
frames = create_bounce_animation(
    object_type='circle',
    object_data={'radius': 30, 'color': (0, 255, 0)},
    num_frames=30,
    bounce_height=150,
    ground_y=350,
    start_x=240
)
```

### Move Animation
```python
from templates.move import create_move_animation

# Create linear movement
frames = create_move_animation(
    object_type='emoji',
    object_data={'emoji': '🚀', 'size': 60},
    num_frames=25,
    start_x=100,
    start_y=240,
    end_x=380,
    end_y=240
)
```

### Fade Animation
```python
from templates.fade import create_fade_animation

# Create fade in/out effect
frames = create_fade_animation(
    object_type='text',
    object_data={'text': 'Hello', 'font_size': 48, 'color': (0, 0, 255)},
    num_frames=20,
    fade_type='in'  # 'in', 'out', 'in_out'
)
```

### Spin Animation
```python
from templates.spin import create_spin_animation

# Create rotational motion
frames = create_spin_animation(
    object_type='shape',
    object_data={'shape': 'square', 'size': 80, 'color': (255, 165, 0)},
    num_frames=24,
    rotation_speed=360,  # degrees per second
    center_x=240,
    center_y=240
)
```

### Kaleidoscope Animation
```python
from templates.kaleidoscope import create_kaleidoscope_animation

# Create kaleidoscope effect
frames = create_kaleidoscope_animation(
    num_frames=30,
    segments=6,
    base_colors=[(255, 0, 0), (0, 255, 0), (0, 0, 255)],
    center_x=240,
    center_y=240
)
```

### Zoom Animation
```python
from templates.zoom import create_zoom_animation

# Create zoom in/out effect
frames = create_zoom_animation(
    object_type='image',
    object_data={'image_path': 'logo.png'},
    num_frames=20,
    start_scale=0.5,
    end_scale=2.0,
    center_x=240,
    center_y=240
)
```

### Pulse Animation
```python
from templates.pulse import create_pulse_animation

# Create pulsing size effect
frames = create_pulse_animation(
    object_type='circle',
    object_data={'radius': 50, 'color': (255, 0, 255)},
    num_frames=15,
    pulse_intensity=0.3,
    center_x=240,
    center_y=240
)
```

## GIF Builder Usage

### Basic Construction
```python
from core.gif_builder import GIFBuilder

# Create builder for emoji
builder = GIFBuilder(width=128, height=128, fps=10)

# Add frames using any method
# ... add your frames ...

# Save with emoji optimization
info = builder.save('emoji.gif', num_colors=48, optimize_for_emoji=True)

# Check results
print(f"Size: {info['size_kb']}KB")
print(f"Frames: {info['frame_count']}")
print(f"Duration: {info['duration_seconds']}s")
```

### Advanced Frame Creation
```python
from core.frame_composer import create_blank_frame, draw_circle, draw_emoji, draw_text

# Create frame
frame = create_blank_frame(128, 128, (255, 255, 255))  # White background

# Add elements
frame = draw_circle(frame, 64, 64, 30, (255, 0, 0))  # Red circle center
frame = draw_emoji(frame, 64, 64, '😀', 40)  # Emoji at center
frame = draw_text(frame, 10, 10, 'Hello', (0, 0, 0), 20)  # Text

# Add to builder
builder.add_frame(frame)
```

## Color Utilities

### Color Palettes
```python
from core.color_palettes import get_slack_emoji_palette, get_vibrant_palette

# Get optimized emoji colors (32-48 colors)
emoji_colors = get_slack_emoji_palette()
print(f"Emoji palette: {emoji_colors}")

# Get vibrant colors for message GIFs
vibrant_colors = get_vibrant_palette()
print(f"Vibrant palette: {vibrant_colors}")
```

### Color Creation
```python
from core.typography import hex_to_rgb, rgb_to_hex

# Convert color formats
rgb_color = hex_to_rgb('#FF0000')  # (255, 0, 0)
hex_color = rgb_to_hex((0, 255, 0))  # '#00FF00'
```

## Visual Effects

### Typography
```python
from core.typography import create_text_frame, apply_text_effects

# Create text with effects
text_frame = create_text_frame('GIF Text', 24, 'Arial')
enhanced_frame = apply_text_effects(text_frame, shadow=True, outline=True)
```

### Visual Effects
```python
from core.visual_effects import add_glow, add_shadow, create_gradient

# Add visual effects
enhanced_frame = add_glow(frame, color=(255, 255, 0), intensity=5)
shadowed_frame = add_shadow(frame, offset_x=3, offset_y=3, blur=5)

# Create gradient
gradient_frame = create_gradient(128, 128, (255, 0, 0), (0, 0, 255))
```

## Animation Templates

### Emoji Animations (64KB limit)
```python
# Create simple emoji bounce
frames = create_bounce_animation(
    object_type='emoji',
    object_data={'emoji': '🚀', 'size': 60},
    num_frames=12,  # Keep frame count low
    bounce_height=50,
    ground_y=64,
    start_x=64
)

# Optimize for emoji size
builder = GIFBuilder(128, 128, fps=8)  # Lower FPS
for frame in frames:
    builder.add_frame(frame)

info = builder.save('rocket.gif', num_colors=32, optimize_for_emoji=True)
```

### Message GIF Animations (2MB limit)
```python
# Create complex multi-element animation
builder = GIFBuilder(480, 480, fps=15)

# Add multiple animated elements
for i in range(30):  # 2 seconds at 15fps
    frame = create_blank_frame(480, 480, (255, 255, 255))
    
    # Multiple moving elements
    frame = draw_circle(frame, 100 + i*2, 240, 30, (255, 0, 0))
    frame = draw_circle(frame, 380 - i*2, 240, 30, (0, 255, 0))
    frame = draw_text(frame, 200, 230, f'Frame {i}', (0, 0, 0), 24)
    
    builder.add_frame(frame)

info = builder.save('complex.gif', num_colors=128)
```

## Best Practices

### Optimization Guidelines
- **Test frequently** - Check file size after each change
- **Simplify designs** - Less detail = smaller files
- **Limit colors** - Use color palettes, not arbitrary colors
- **Optimize frames** - Remove unnecessary frames
- **Compress effectively** - Use appropriate compression settings

### Performance Tips
- Reuse frames when possible
- Use lower FPS for static elements
- Combine simple animations rather than complex ones
- Pre-calculate positions for predictable animations

## Usage Examples

**Create emoji GIF:**
`/slack-gif-creator "emoji" "rocket bouncing"`

**Create message GIF:**
`/slack-gif-creator "message" "company logo spinning"`

**Create reaction GIF:**
`/slack-gif-creator "reaction" "thumbs up with glow"`

**Create complex animation:**
`/slack-gif-creator "message" "kaleidoscope pattern with text"`

Remember: Emoji GIFs are size-constrained - prioritize simplicity and frequent validation.
