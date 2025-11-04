---
description: Create algorithmic art using p5.js with seeded randomness and interactive parameter exploration
argument-hint: <art-concept-or-theme>
---

Create original algorithmic art through computational processes, not static images. Output includes philosophy (.md), interactive viewer (.html), and generative algorithm (.js).

## Step 1: Create Algorithmic Philosophy

**Name your movement** (1-2 words): Focus concept for $ARGUMENTS

**Articulate the philosophy** (4-6 paragraphs):

Express how this philosophy manifests through:
- Computational processes and mathematical relationships
- Noise functions and randomness patterns  
- Particle behaviors and field dynamics
- Temporal evolution and system states
- Parametric variation and emergent complexity

**CRITICAL PRINCIPLES:**
- **Emphasize craftsmanship** - Stress that the algorithm appears meticulously crafted, refined through countless iterations by a computational aesthetics master
- **Algorithmic expression** - Beauty emerges from process, not final frame
- **Parametric control** - Mathematical relationships, forces, behaviors
- **Creative freedom** - Leave interpretive implementation space

## Step 2: Express Philosophy Through Code

**Conceptual Seed:** Identify the subtle conceptual thread from your request - a sophisticated, niche reference that enhances depth without announcing itself.

**Implementation Structure:**

```javascript
// 1. PARAMETER ORGANIZATION
let params = {
    seed: 12345,
    // Define YOUR parameters:
    // - Counts: elements (particles, circles, branches)
    // - Scales: size, speed, spacing  
    // - Probabilities: event likelihood
    // - Angles: rotation, direction
    // - Colors: palette arrays
    colorPalette: ['#d97757', '#6a9bcc', '#788c5d', '#b0aea5']
};

// 2. SEEDED RANDOMNESS (Critical for reproducibility)
function initializeSeed(seed) {
    randomSeed(seed);
    noiseSeed(seed);
}

// 3. P5.JS LIFECYCLE
function setup() {
    createCanvas(800, 800);
    initializeSeed(params.seed);
    // Initialize your generative system
    
    // For static art: call noLoop() at end of setup
    // For animated art: let draw() keep running
}

function draw() {
    // Option 1: Static generation (runs once, stops)
    // Option 2: Animated (continuous updates)
    // Option 3: User-triggered (noLoop() + redraw())
}

// 4. CLASSES FOR ENTITIES
class Entity {
    constructor() {
        // Initialize with seeded randomness
    }
    
    update() {
        // Physics, behavior, interactions
    }
    
    display() {
        // Rendering logic
    }
}
```

## Step 3: Best Practices

**Performance Optimization:**
- Pre-calculate what you can
- Use spatial hashing for collision detection
- Limit expensive operations (sqrt, trig)
- Target 60fps for animation

**Color & Visual:**
```javascript
// Color utilities
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function colorFromPalette(index) {
    return params.colorPalette[index % params.colorPalette.length];
}

// Organic variation
function getNoiseValue(x, y, scale = 0.01) {
    return noise(x * scale, y * scale);
}
```

**Common Patterns:**
```javascript
// Fading trails
function fadeBackground(opacity) {
    fill(250, 249, 245, opacity);
    noStroke();
    rect(0, 0, width, height);
}

// Vector utilities
function vectorFromAngle(angle, magnitude = 1) {
    return createVector(cos(angle), sin(angle)).mult(magnitude);
}
```

## Step 4: Create Interactive Viewer

**Viewer Template Structure:**
- Anthropic branding (colors, fonts, layout)
- Seed navigation section
- Parameter controls
- Self-contained HTML with embedded p5.js

**Key Features:**
- Real-time parameter adjustment
- Seed-based regeneration
- Export functionality
- Responsive design

## Examples

**"Organic Turbulence"**
Philosophy: Chaos constrained by natural law, order emerging from disorder.
Algorithm: Flow fields driven by layered Perlin noise. Thousands of particles following vector forces, their trails accumulating into organic density maps. Multiple noise octaves create turbulent regions and calm zones. Color emerges from velocity and density - fast particles burn bright, slow ones fade to shadow. The algorithm runs until equilibrium - a meticulously tuned balance where every parameter was refined through countless iterations by a master of computational aesthetics.

**"Quantum Harmonics"**  
Philosophy: Discrete entities exhibiting wave-like interference patterns.
Algorithm: Particles initialized on a grid, each carrying a phase value that evolves through sine waves. When particles are near, their phases interfere - constructive interference creates bright nodes, destructive creates voids. Simple harmonic motion generates complex emergent mandalas. The result of painstaking frequency calibration where every ratio was carefully chosen to produce resonant beauty.

## Usage

**Generate art for theme:** `/algorithmic-art quantum-harmonics`
**Create custom concept:** `/algorithmic-art organic-turbulence`
**Focus on concept:** `/algorithmic-art recursive-whispers`

Remember: Focus on creating LIVING ALGORITHMS that express computational beauty through process, not static images with randomness.
