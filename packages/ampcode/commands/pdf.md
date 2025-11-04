---
description: Comprehensive PDF processing toolkit - extract text/tables, create PDFs, merge/split, handle forms
argument-hint: <operation> <input-file>
---

**Available Operations:**
- `extract` - Extract text from PDF
- `merge` - Merge multiple PDFs
- `split` - Split PDF into individual pages
- `form-check` - Check if PDF has fillable fields
- `form-extract` - Extract form field information
- `form-fill` - Fill PDF form fields
- `convert-images` - Convert PDF pages to images
- `create` - Create new PDF from text

## Basic Operations

### Extract Text
```python
from pypdf import PdfReader

reader = PdfReader("document.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text()
print(f"Extracted {len(text)} characters")
```

### Merge PDFs
```python
from pypdf import PdfWriter, PdfReader

writer = PdfWriter()
for pdf_file in ["doc1.pdf", "doc2.pdf"]:
    reader = PdfReader(pdf_file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as output:
    writer.write(output)
```

### Split PDF
```python
reader = PdfReader("input.pdf")
for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)
    with open(f"page_{i+1}.pdf", "wb") as output:
        writer.write(output)
```

## Form Operations

### Check Fillable Fields
**CRITICAL:** First check if PDF has fillable form fields:
```bash
python scripts/check_fillable_fields.py <file.pdf>
```

### Extract Form Information
If PDF has fillable fields, extract field data:
```bash
python scripts/extract_form_field_info.py <input.pdf> <field_info.json>
```

**Field Information Format:**
```json
[
  {
    "field_id": "unique-id",
    "page": 1,
    "rect": [left, bottom, right, top],
    "type": "text|checkbox|radio_group|choice"
  }
]
```

### Fill Forms
Use the extracted field information to programmatically fill the form:
```python
from pypdf import PdfReader, PdfWriter

reader = PdfReader("form.pdf")
writer = PdfWriter()

# Copy all pages
for page in reader.pages:
    writer.add_page(page)

# Update form fields
field_data = {
    "field_name": "value",
    "checkbox_field": "Yes",
    "dropdown": "Option 1"
}

writer.update_page_form_field_values(writer.pages[0], field_data)

with open("filled_form.pdf", "wb") as output:
    writer.write(output)
```

## Image Conversion

### Convert to Images
```python
from pypdfium2 import PdfDocument
from PIL import Image

pdf = PdfDocument("document.pdf")
for i, page in enumerate(pdf):
    bitmap = page.render(scale=2.0)  # High resolution
    img = bitmap.to_pil()
    img.save(f"page_{i+1}.png")
```

## Advanced Features

### PDFium2 for Fast Processing
```python
import pypdfium2 as pdfium

pdf = pdfium.PdfDocument("document.pdf")
for i, page in enumerate(pdf):
    text = page.get_text()
    bitmap = page.render(scale=1.5)
    img = bitmap.to_pil()
    img.save(f"page_{i+1}.jpg", quality=90)
```

### JavaScript with pdf-lib
```javascript
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

async function manipulatePDF() {
    const pdfDoc = await PDFDocument.load(fs.readFileSync('input.pdf'));
    const pageCount = pdfDoc.getPageCount();
    
    const newPage = pdfDoc.addPage([600, 400]);
    newPage.drawText('Added content', { x: 100, y: 300, size: 16 });
    
    fs.writeFileSync('modified.pdf', await pdfDoc.save());
}
```

## Common Patterns

### Bounding Box Extraction
For non-fillable forms, extract coordinates:
```python
# Scripts available for analyzing PDF structure
# check_bounding_boxes.py - Visual analysis tool
# create_validation_image.py - Generate preview with field locations
```

### Table Extraction
```python
# Use pdfplumber for structured table extraction
import pdfplumber

with pdfplumber.open("document.pdf") as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            print(table)
```

### Error Handling
```python
try:
    reader = PdfReader("file.pdf")
    text = page.extract_text()
except Exception as e:
    print(f"Error processing PDF: {e}")
```

## Usage Examples

**Extract text from report:**
`/pdf extract monthly-report.pdf`

**Merge multiple invoices:**
`/pdf merge invoice1.pdf invoice2.pdf invoice3.pdf`

**Check form fields:**
`/pdf form-check application-form.pdf`

**Convert to images for analysis:**
`/pdf convert-images document.pdf`

**Create simple PDF:**
`/pdf create "Hello World" output.pdf`
