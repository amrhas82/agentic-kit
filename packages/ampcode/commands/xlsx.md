---
description: Create, edit, and analyze spreadsheets with formulas, formatting, data analysis, and visualization
argument-hint: <operation> <spreadsheet-file>
---

**Available Operations:**
- `create` - Generate new spreadsheet with formulas
- `read` - Analyze existing data
- `edit` - Modify while preserving formulas
- `analyze` - Data analysis and visualization
- `recalc` - Recalculate all formulas

## Core Requirements

### Zero Formula Errors
Every Excel file MUST be delivered with ZERO formula errors (#REF!, #DIV/0!, #VALUE!, #N/A, #NAME?)

### Always Use Formulas, Not Hardcoded Values
**❌ WRONG:** Calculate in Python and hardcode results
```python
# Bad: Hardcoding calculated values
total = df['Sales'].sum()
sheet['B10'] = total  # Hardcodes 5000

# Bad: Computing in Python
growth = (df.iloc[-1]['Revenue'] - df.iloc[0]['Revenue']) / df.iloc[0]['Revenue']  
sheet['C5'] = growth  # Hardcodes 0.15
```

**✅ CORRECT:** Use Excel formulas
```python
# Good: Let Excel calculate the sum
sheet['B10'] = '=SUM(B2:B9)'

# Good: Growth rate as Excel formula
sheet['C5'] = '=(C4-C2)/C2'
```

## Library Selection

**pandas:** Best for data analysis, bulk operations, and simple export
**openpyxl:** Best for complex formatting, formulas, and Excel-specific features

## Reading and Analyzing Data

### Data Analysis with pandas
```python
import pandas as pd

# Read Excel
df = pd.read_excel('file.xlsx')  # Default: first sheet
all_sheets = pd.read_excel('file.xlsx', sheet_name=None)  # All sheets as dict

# Analyze
df.head()      # Preview data
df.info()      # Column info  
df.describe()  # Statistics
df.isnull().sum()  # Missing values

# Write Excel
df.to_excel('output.xlsx', index=False)
```

### Advanced Data Operations
```python
# Specific columns and data types
df = pd.read_excel('file.xlsx', usecols=['A', 'C', 'E'], dtype={'id': str})

# Parse dates
df = pd.read_excel('file.xlsx', parse_dates=['date_column'])

# Handle large files
df = pd.read_excel('large_file.xlsx', read_only=True)
```

## Creating New Excel Files

### With openpyxl (Recommended for formulas)
```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

wb = Workbook()
sheet = wb.active

# Add data
sheet['A1'] = 'Hello'
sheet['B1'] = 'World'
sheet.append(['Row', 'of', 'data'])

# Add formula
sheet['B2'] = '=SUM(A1:A10)'

# Formatting
sheet['A1'].font = Font(bold=True, color='FF0000')
sheet['A1'].fill = PatternFill('solid', start_color='FFFF00')
sheet['A1'].alignment = Alignment(horizontal='center')

# Column width
sheet.column_dimensions['A'].width = 20

wb.save('output.xlsx')
```

## Editing Existing Files

### Preserve Formulas and Formatting
```python
from openpyxl import load_workbook

# Load existing file
wb = load_workbook('existing.xlsx')
sheet = wb.active  # or wb['SheetName']

# Working with multiple sheets
for sheet_name in wb.sheetnames:
    sheet = wb[sheet_name]
    print(f"Sheet: {sheet_name}")

# Modify cells
sheet['A1'] = 'New Value'
sheet.insert_rows(2)  # Insert row at position 2
sheet.delete_cols(3)  # Delete column 3

# Add new sheet
new_sheet = wb.create_sheet('NewSheet')
new_sheet['A1'] = 'Data'

wb.save('modified.xlsx')
```

## Financial Model Standards

### Color Coding (Industry Standard)
- **Blue text (RGB: 0,0,255)**: Hardcoded inputs
- **Black text (RGB: 0,0,0)**: All formulas and calculations
- **Green text (RGB: 0,128,0)**: Links to other worksheets
- **Red text (RGB: 255,0,0)**: External links to other files
- **Yellow background (RGB: 255,255,0)**: Key assumptions

### Number Formatting
- **Years**: Format as text strings ("2024" not "2,024")
- **Currency**: Use $#,##0 format with units in headers
- **Zeros**: Use number formatting to display as "-"
- **Percentages**: Default to 0.0% format
- **Multiples**: Format as 0.0x for ratios (EV/EBITDA, P/E)
- **Negative numbers**: Use parentheses (123) not minus -123

### Formula Construction
```python
# Place assumptions in separate cells
sheet['B6'] = 0.05  # Growth rate assumption
sheet['B5'] = 1000  # Base value

# Use cell references in formulas
sheet['B7'] = '=B5*(1+$B$6)'  # Calculates with assumption

# Comment hardcoded values
sheet['B8'] = 5000  # Revenue
sheet['B8'].comment = 'Source: Company 10-K, FY2024, Page 45'
```

## Recalculating Formulas

### Using recalc.py Script
**MANDATORY:** Recalculate formulas after creating/modifying Excel files
```bash
python recalc.py output.xlsx
```

**With timeout:**
```bash
python recalc.py output.xlsx 30
```

### Understanding Output
```json
{
  "status": "success",           // or "errors_found"
  "total_errors": 0,              // Total error count
  "total_formulas": 42,           // Number of formulas in file
  "error_summary": {              // Only if errors found
    "#REF!": {
      "count": 2,
      "locations": ["Sheet1!B5", "Sheet1!C10"]
    }
  }
}
```

### Common Errors to Fix
- **#REF!**: Invalid cell references
- **#DIV/0!**: Division by zero  
- **#VALUE!**: Wrong data type in formula
- **#NAME?**: Unrecognized formula name

## Formula Verification Checklist

### Essential Checks
- [ ] Test 2-3 sample references before building full model
- [ ] Verify Excel columns match (column 64 = BL, not BK)
- [ ] Remember Excel rows are 1-indexed (DataFrame row 5 = Excel row 6)
- [ ] Check denominators before division operations
- [ ] Test formulas with edge cases (zero, negative, large values)

### Formula Testing Strategy
```python
# Test on sample data first
sheet['A1'] = 100
sheet['A2'] = 50
sheet['A3'] = '=A1+A2'  # Should equal 150

# Verify formula works before applying broadly
for row in range(2, 100):
    sheet[f'C{row}'] = f'=A{row}+B{row}'
```

## Best Practices

### Library Usage
**pandas:**
- Specify data types: `dtype={'id': str}`
- Read specific columns: `usecols=['A', 'C', 'E']`
- For large files, use `read_only=True`

**openpyxl:**
- Use `data_only=True` to read calculated values
- **Warning**: If opened with `data_only=True` and saved, formulas are replaced with values
- Cell indices are 1-based (row=1, column=1 = cell A1)

### Error Prevention
- Check for NaN values with `pd.notna()`
- Verify all cell references exist before using in formulas
- Use correct cross-sheet reference format (Sheet1!A1)
- Add comments for complex formulas and assumptions

## Usage Examples

**Create financial model:**
`/xlsx create financial-model.xlsx`

**Analyze existing data:**
`/xlsx read sales-data.xlsx`

**Edit while preserving formulas:**
`/xlsx edit budget-template.xlsx`

**Data analysis and visualization:**
`/xlsx analyze quarterly-results.xlsx`

**Recalculate formulas:**
`/xlsx recalc updated-model.xlsx`

Remember: The spreadsheet should be dynamic and recalculable when source data changes.
