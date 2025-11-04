---
description: Create, edit, and manipulate Word documents with JavaScript library and XML manipulation
argument-hint: <operation> <document>
---

**Available Operations:**
- `create` - Generate new Word document
- `edit` - Modify existing document  
- `comments` - Add/manage document comments
- `track-changes` - Implement tracked changes
- `extract` - Extract content from document
- `convert` - Convert between formats

## JavaScript/Node.js Library (Recommended)

### Setup
```javascript
const { Document, Packer, Paragraph, TextRun, Table, ImageRun, 
        Header, Footer, AlignmentType, PageOrientation } = require('docx');

// Create & Save
const doc = new Document({ sections: [{ children: [] }] });
Packer.toBuffer(doc).then(buffer => fs.writeFileSync("output.docx", buffer));
```

### Text & Formatting
**CRITICAL:** Never use `\n` for line breaks - always use separate Paragraph elements
```javascript
// ✅ CORRECT
new Paragraph({ children: [new TextRun("Line 1")] }),
new Paragraph({ children: [new TextRun("Line 2")] })

// Basic formatting
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 200 },
  children: [
    new TextRun({ text: "Bold", bold: true }),
    new TextRun({ text: "Italic", italics: true }),
    new TextRun({ text: "Underlined", underline: { type: "double" } }),
    new TextRun({ text: "Colored", color: "FF0000", size: 28 }),
    new TextRun({ text: "Highlighted", highlight: "yellow" }),
    new TextRun({ text: "Strikethrough", strike: true })
  ]
})
```

### Tables
```javascript
const table = new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE
  },
  rows: [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Header 1")] }),
        new TableCell({ children: [new Paragraph("Header 2")] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Cell 1")] }),
        new TableCell({ children: [new Paragraph("Cell 2")] })
      ]
    })
  ]
});
```

### Headers & Footers
```javascript
const doc = new Document({
  sections: [{
    headers: {
      default: new Header({
        children: [new Paragraph("Document Title")]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph("Page ")]
      })
    },
    children: []
  }]
});
```

### Images
```javascript
const image = fs.readFileSync("image.jpg");
const doc = new Document({
  sections: [{
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            data: image,
            transformation: {
              width: 300,
              height: 200
            }
          })
        ]
      })
    ]
  }]
});
```

## Raw XML Manipulation

### Basic Structure
```xml
<w:p>
  <w:r><w:t>Text content</w:t></w:r>
</w:p>
```

### Headings & Styles
```xml
<w:p>
  <w:pPr>
    <w:pStyle w:val="Title"/>
    <w:jc w:val="center"/>
  </w:pPr>
  <w:r><w:t>Document Title</w:t></w:r>
</w:p>

<w:p>
  <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
  <w:r><w:t>Section Heading</w:t></w:r>
</w:p>
```

### Text Formatting (XML)
```xml
<!-- Bold -->
<w:r><w:rPr><w:b/><w:bCs/></w:rPr><w:t>Bold</w:t></w:r>

<!-- Italic -->
<w:r><w:rPr><w:i/><w:iCs/></w:rPr><w:t>Italic</w:t></w:r>

<!-- Colors -->
<w:r><w:rPr><w:color w:val="FF0000"/></w:rPr><w:t>Red Text</w:t></w:r>

<!-- Multiple formatting -->
<w:r>
  <w:rPr>
    <w:b/><w:i/><w:color w:val="0000FF"/>
    <w:sz w:val="28"/><w:szCs w:val="28"/>
  </w:rPr>
  <w:t>Bold, italic, blue text</w:t>
</w:r>
```

## Python Document Library

### Basic Document Operations
```python
from skills.docx.scripts.document import Document

# Initialize
doc = Document('workspace/unpacked')
doc = Document('workspace/unpacked', author="John Doe", initials="JD")

# Find nodes
node = doc["word/document.xml"].get_node(tag="w:del", attrs={"w:id": "1"})
node = doc["word/document.xml"].get_node(tag="w:p", line_number=10)

# Add comments
doc.add_comment(start=node, end=node, text="Comment text")
doc.reply_to_comment(parent_comment_id=0, text="Reply text")

# Track changes
doc["word/document.xml"].suggest_deletion(node)  # Delete content
doc["word/document.xml"].revert_insertion(ins_node)  # Reject insertion
doc["word/document.xml"].revert_deletion(del_node)  # Reject deletion

# Save
doc.save()
```

## Document Comments

### XML Pattern
```xml
<w:commentRangeStart w:id="0"/>
<w:r><w:t>Commented text</w:t></w:r>
<w:commentRangeEnd w:id="0"/>

<w:comment w:id="0" w:author="Author" w:date="2024-01-01T10:00:00Z">
  <w:p>
    <w:r><w:t>Comment text</w:t></w:r>
  </w:p>
</w:comment>
```

## Tracked Changes (Redlining)

### Insertions
```xml
<w:ins w:author="Author" w:date="2024-01-01T10:00:00Z" w:id="1">
  <w:r><w:t>Inserted text</w:t></w:r>
</w:ins>
```

### Deletions
```xml
<w:del w:author="Author" w:date="2024-01-01T10:00:00Z" w:id="1">
  <w:r><w:t>Deleted text</w:t></w:r>
</w:del>
```

## Best Practices

### Character Encoding
- Escape special characters: `"` → `“`, `'` → `’`
- Use `xml:space='preserve'` for leading/trailing spaces
- RSIDs must be 8-digit hex values

### Schema Compliance
- Element ordering: `<w:pStyle>`, `<w:numPr>`, `<w:spacing>`, `<w:ind>`, `<w:jc>`
- Track revisions placement: Add `<w:trackRevisions/>` after `<w:proofState>`

### Images
- Add to `word/media/` directory
- Reference in `document.xml`
- Set dimensions to prevent overflow

## Usage Examples

**Create simple document:**
`/docx create report.docx`

**Add comments to existing:**
`/docx comments document.docx`

**Implement tracked changes:**
`/docx track-changes draft.docx`

**Extract content:**
`/docx extract source.docx output.txt`

**Convert between formats:**
`/docx convert input.html output.docx`

## Validation

For production documents, validate against Office Open XML schemas:
- Use the OOXML validation scripts in the ooxml/ directory
- Check for schema compliance and redlining patterns
- Verify character encoding and XML structure
