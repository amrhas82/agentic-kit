---
description: Create, edit, and analyze PowerPoint presentations with HTML conversion, XML manipulation, and design principles
argument-hint: <operation> <presentation-file>
---

**Available Operations:**
- `create` - Generate new presentation from scratch
- `edit` - Modify existing presentation content  
- `analyze` - Extract and analyze content
- `convert` - Transform between formats
- `extract` - Get raw text or metadata

## Text Extraction and Analysis

### Convert to Markdown
```bash
# Convert presentation to markdown for text analysis
python -m markitdown path-to-file.pptx
```

### Raw XML Access
For comments, speaker notes, layouts, animations, and complex formatting:

```bash
# Unpack presentation to access raw XML
python ooxml/scripts/unpack.py <presentation.pptx> <output_dir>
```

**Key XML Structure:**
- `ppt/presentation.xml` - Main metadata and slide references
- `ppt/slides/slide{N}.xml` - Individual slide contents
- `ppt/notesSlides/notesSlide{N}.xml` - Speaker notes
- `ppt/comments/modernComment_*.xml` - Slide comments
- `ppt/slideLayouts/` - Layout templates
- `ppt/slideMasters/` - Master slide templates
- `ppt/theme/theme1.xml` - Theme and styling
- `ppt/media/` - Images and media files

## Creating New Presentations

### Design-First Approach
**CRITICAL:** Before creating any presentation:

1. **Analyze content purpose** - What is this presentation about?
2. **Check for branding** - Company/organization colors and identity
3. **Match palette to content** - Select colors reflecting the subject
4. **State your approach** - Explain design choices before implementation

### Color Palette Selection

**Creative color strategies:**
- Think beyond defaults - match specific topic and mood
- Consider industry, energy level, target audience
- Try unexpected combinations - be adventurous
- Build 3-5 color palettes (dominant + supporting + accent)
- Ensure strong contrast for readability

**Example Palettes:**
1. **Classic Blue**: Deep navy (#1C2833), slate gray (#2E4053), silver (#AAB7B8), off-white (#F4F6F6)
2. **Teal & Coral**: Teal (#5EA8A7), deep teal (#277884), coral (#FE4447), white (#FFFFFF)
3. **Bold Red**: Red (#C0392B), bright red (#E74C3C), orange (#F39C12), yellow (#F1C40F), green (#2ECC71)
4. **Warm Blush**: Mauve (#A49393), blush (#EED6D3), rose (#E8B4B8), cream (#FAF7F2)
5. **Burgundy Luxury**: Burgundy (#5D1D2E), crimson (#951233), rust (#C15937), gold (#997929)

### Typography Standards

**Web-safe fonts only:**
- Arial, Helvetica, Times New Roman, Georgia
- Courier New, Verdana, Tahoma, Trebuchet MS, Impact

**Visual hierarchy principles:**
- Clear size, weight, and color differentiation
- Strong contrast for readability
- Consistent spacing and alignment
- Clean, professional appearance

### HTML-to-PPTX Workflow

For creating presentations from scratch, use html2pptx conversion:

```python
# Convert HTML slides to PowerPoint with accurate positioning
from scripts.html2pptx import HTML2PPTX

converter = HTML2PPTX()
presentation = converter.convert_from_html('slides.html')
presentation.save('output.pptx')
```

**HTML slide structure:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .slide {
            width: 1920px;
            height: 1080px;
            padding: 60px;
            font-family: Arial, sans-serif;
        }
        .title-slide { background: #1C2833; color: white; }
        .content-slide { background: white; color: #2E4053; }
        h1 { font-size: 48px; font-weight: bold; }
        h2 { font-size: 36px; margin-bottom: 30px; }
        p { font-size: 24px; line-height: 1.4; }
    </style>
</head>
<body>
    <div class="slide title-slide">
        <h1>Presentation Title</h1>
        <p>Subtitle</p>
    </div>
    <div class="slide content-slide">
        <h2>Section Title</h2>
        <p>Content paragraph</p>
    </div>
</body>
</html>
```

## Editing Existing Presentations

### Adding Content
```python
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor

# Load existing presentation
prs = Presentation('existing.pptx')

# Add new slide
slide_layout = prs.slide_layouts[1]  # Title and content layout
slide = prs.slides.add_slide(slide_layout)

# Add title
title = slide.shapes.title
title.text = "New Slide Title"

# Add content
content = slide.placeholders[1]
content.text = "New slide content here"

# Format text
for paragraph in content.text_frame.paragraphs:
    for run in paragraph.runs:
        run.font.size = Pt(24)
        run.font.color.rgb = RGBColor(46, 64, 83)  # Slate gray

prs.save('updated.pptx')
```

### Modifying Layouts
```python
# Access slide layouts
for layout in prs.slide_layouts:
    print(f"Layout: {layout.name}")

# Use specific layout
bullet_slide_layout = prs.slide_layouts[1]
slide = prs.slides.add_slide(bullet_slide_layout)
```

### Working with Images
```python
# Add image to slide
slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank layout

# Add image with specific position and size
left = Inches(2)
top = Inches(2)
width = Inches(6)
height = Inches(4)

pic = slide.shapes.add_picture('image.jpg', left, top, width, height)
```

## Analyzing Presentation Content

### Extract Theme Information
```python
import xml.etree.ElementTree as ET

# Read theme file for colors and fonts
tree = ET.parse('unpacked_ppt/ppt/theme/theme1.xml')
root = tree.getroot()

# Extract color scheme
for color_scheme in root.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}clrScheme'):
    colors = {}
    for color in color_scheme:
        print(f"Color: {color.tag}")
```

### Typography Analysis
```python
# Analyze font usage across slides
for slide_num in range(1, len(prs.slides) + 1):
    slide_path = f'unpacked_ppt/ppt/slides/slide{slide_num}.xml'
    if os.path.exists(slide_path):
        tree = ET.parse(slide_path)
        root = tree.getroot()
        
        # Find font references
        for font_ref in root.findall('.//{http://schemas.openxmlformats.org/drawingml/2006/main}rPr'):
            font = font_ref.get('{http://schemas.openxmlformats.org/drawingml/2006/main}latin')
            if font:
                print(f"Slide {slide_num} font: {font.get('{http://schemas.openxmlformats.org/drawingml/2006/main}typeface')}")
```

## Advanced Features

### Adding Speaker Notes
```python
# Access speaker notes
notes_slide = prs.notes_slide
text_frame = notes_slide.notes_text_frame
text_frame.text = "Speaker notes for this slide"
```

### Comments and Annotations
```python
# Comments are stored in XML
# Access via unpacked XML structure
comments_path = 'unpacked_ppt/ppt/comments/modernComment_1.xml'
# Process comment XML structure
```

### Working with Animations
```python
# Animations are complex XML structures
# Access via unpacked presentation
animation_path = 'unpacked_ppt/ppt/slides/slide1.xml'
# Parse animation elements
```

## Quality Standards

### Design Requirements
- [ ] State content-informed design approach before coding
- [ ] Use only web-safe fonts
- [ ] Create clear visual hierarchy
- [ ] Ensure strong contrast and readability
- [ ] Maintain consistency across slides
- [ ] Match colors to content and purpose

### Content Structure
- [ ] Clear slide titles and flow
- [ ] Appropriate amount of text per slide
- [ ] Logical information hierarchy
- [ ] Consistent formatting throughout
- [ ] Professional appearance

## Usage Examples

**Create new presentation:**
`/pptx create "project-proposal.pptx"`

**Analyze existing slide deck:**
`/pptx analyze "quarterly-review.pptx"`

**Extract text content:**
`/pptx extract "presentation.pptx"`

**Edit and modify:**
`/pptx edit "template.pptx"`

**Convert HTML to PowerPoint:**
`/pptx convert "slides.html" "output.pptx"`

Remember: Focus on content-driven design that enhances the message while maintaining professional appearance.
