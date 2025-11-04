---
description: Build elaborate multi-component HTML artifacts using React, TypeScript, Tailwind CSS, and shadcn/ui
argument-hint: <artifact-concept> <project-name>
---

Build powerful frontend artifacts using modern web technologies for complex interactive experiences.

## Technology Stack

**Core Stack:**
- React 18 + TypeScript
- Vite for development
- Parcel for bundling
- Tailwind CSS 3.4.1
- shadcn/ui component library
- 40+ pre-installed components

## Development Workflow

### Step 1: Initialize Project
```bash
bash scripts/init-artifact.sh <project-name>
cd <project-name>
```

**Creates fully configured project with:**
- ✅ React + TypeScript (via Vite)
- ✅ Tailwind CSS with shadcn/ui theming
- ✅ Path aliases (`@/`) configured
- ✅ 40+ shadcn/ui components
- ✅ Radix UI dependencies
- ✅ Parcel bundling configured
- ✅ Node 18+ compatibility

### Step 2: Develop Artifact
Edit the generated files to build your artifact:

**Component Structure:**
```typescript
// Example component structure
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function MyArtifact() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold">Artifact Title</h1>
      <Button className="mt-4">Action</Button>
    </Card>
  )
}
```

**State Management:**
```typescript
import { useState } from "react"

export function InteractiveArtifact() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  )
}
```

### Step 3: Bundle to Single HTML
```bash
bash scripts/bundle-artifact.sh
```

**Requirements:** Project must have `index.html` in root directory

**What it does:**
- Installs bundling dependencies
- Creates `.parcelrc` config with path aliases
- Builds with Parcel (no source maps)
- Inlines all assets into single HTML
- Creates `bundle.html` - self-contained artifact

### Step 4: Share Artifact
Share the bundled HTML file in conversation as a claude.ai artifact.

### Step 5: Testing (Optional)
Use tools like Playwright or Puppeteer to test the artifact if issues arise.

## Design Guidelines

### Avoid "AI Slop"
**Don't use:**
- Excessive centered layouts
- Purple gradients
- Uniform rounded corners
- Inter font (overused)

**Instead use:**
- Varied layouts and compositions
- Diverse color palettes
- Creative typography choices
- Original design patterns

### Component Usage
**shadcn/ui Components:**
- Button, Card, Dialog, Input
- Table, Tabs, Badge, Avatar
- Dropdown, Select, Checkbox
- Accordion, Alert, Avatar

**Example usage:**
```typescript
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader 
} from "@/components/ui"

export function ComplexComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Title</h2>
      </CardHeader>
      <CardContent>
        <p>Content</p>
        <Button variant="outline">Action</Button>
      </CardContent>
    </Card>
  )
}
```

## Common Development Tasks

### Creating Interactive Elements
```typescript
// Interactive toggle
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <div>
      <label className="flex items-center space-x-2">
        <Switch 
          checked={darkMode} 
          onCheckedChange={setDarkMode} 
        />
        <span>Dark Mode</span>
      </label>
    </div>
  )
}
```

### Data Display
```typescript
// Table with data
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DataTable({ data }: { data: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <Button size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### Form Handling
```typescript
// Form with validation
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email })
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <Input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

## Performance Considerations

### Bundle Optimization
- Use React.memo for expensive components
- Implement code splitting for large artifacts
- Optimize images and assets
- Minimize re-renders with proper state management

### Component Patterns
```typescript
// Optimized component
import { memo } from "react"

const ExpensiveComponent = memo(({ data }) => {
  return (
    <div className="complex-visualization">
      {/* Complex rendering logic */}
    </div>
  )
})

// Lazy loading
import { lazy, Suspense } from "react"

const HeavyComponent = lazy(() => import("./HeavyComponent"))

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Usage Examples

**Create interactive dashboard:**
`/artifacts-builder "data visualization dashboard" "analytics-app"`

**Build form-heavy interface:**
`/artifacts-builder "contact form system" "forms-app"`

**Develop game interface:**
`/artifacts-builder "puzzle game UI" "game-interface"`

**Create design tool:**
`/artifacts-builder "canvas design tool" "design-studio"`

Remember: Use this for complex artifacts requiring state management, routing, or rich interactions - not simple single-file HTML.
