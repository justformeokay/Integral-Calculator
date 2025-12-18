# 🎯 ARCHITECTURE & FLOW DIAGRAM

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                           │
│              (http://localhost:3000)                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  User Input Form    │
                    │                     │
                    │ Function: x**2      │
                    │ Lower: 0            │
                    │ Upper: 2            │
                    │ Axis: x-axis        │
                    └─────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  Validation &       │
                    │  Error Handling     │
                    └─────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  API Request        │
                    │  (POST)             │
                    └─────────────────────┘
                              ↓
     ┌────────────────────────────────────────────────────┐
     │                BACKEND API                         │
     │    (http://103.127.139.243:8000/api/volume)       │
     │                                                    │
     │  1. Parse function                                │
     │  2. Calculate integral                            │
     │  3. Generate 2D plot                              │
     │  4. Generate 3D visualization                     │
     │  5. Return JSON response                          │
     └────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────────┐
                    │  API Response       │
                    │  (JSON)             │
                    │                     │
                    │ - volume_numerical  │
                    │ - plot_2d           │
                    │ - plot_3d           │
                    └─────────────────────┘
                              ↓
        ┌─────────────────────────────────────┐
        │     Display Results Component        │
        │                                     │
        │  - Volume (Numerik & Simbolik)     │
        │  - Integral Expression              │
        │  - Visualization Tabs (2D/3D)      │
        │  - Formula Information              │
        └─────────────────────────────────────┘
```

---

## Component Tree Structure

```
App
├── Header
│   ├── Title (h1)
│   └── Subtitle (p)
│
├── Main Content (Grid)
│   ├── Calculator (Left Column)
│   │   ├── Form
│   │   │   ├── Function Input
│   │   │   ├── Bounds Inputs (Lower/Upper)
│   │   │   ├── Axis Select
│   │   │   └── Submit Button
│   │   └── Examples
│   │
│   └── Results (Right Column) [Conditional]
│       ├── Info Display
│       │   ├── Function Info
│       │   ├── Bounds Info
│       │   └── Axis Info
│       │
│       ├── Volume Cards
│       │   ├── Numerical Volume
│       │   └── Symbolic Volume
│       │
│       ├── Integral Expression Box
│       │
│       ├── Visualization Tabs
│       │   ├── Plot2D
│       │   │   └── Plotly 2D Graph
│       │   └── Plot3D
│       │       └── Plotly 3D Graph
│       │
│       └── Formula Information
│           ├── Formula (Disk Method)
│           └── Formula (Shell Method)
│
└── Footer
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        App State                            │
│  ┌─────────────┬──────────────┬─────────────────────┐       │
│  │ results     │ loading      │ error               │       │
│  │ (null/obj)  │ (bool)       │ (null/string)       │       │
│  └─────────────┴──────────────┴─────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                         ↑
                         │ setState
                         │
        ┌────────────────┴────────────────┐
        │                                 │
    ┌───────────┐                   ┌──────────┐
    │ Calculator│                   │ Results  │
    │ Component │                   │Component │
    └───────────┘                   └──────────┘
        ↓                                ↑
    handleSubmit()                   Conditional
        ↓                           (if results)
    Fetch API
        ↓
    Backend Response
        ↓
    setResults()
```

---

## API Request/Response

### Request
```
POST /api/volume HTTP/1.1
Host: 103.127.139.243:8000
Content-Type: application/json
Content-Length: 68

{
  "function": "x**2",
  "lower_bound": 0,
  "upper_bound": 2,
  "axis": "x-axis"
}
```

### Response
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 5000

{
  "success": true,
  "volume_numerical": 4.188790,
  "volume_symbolic": "4*pi/3",
  "integral_expression": "\\int \\pi (x^{2})^{2}\\, dx",
  "function": "x**2",
  "bounds": {
    "lower": 0,
    "upper": 2
  },
  "axis": "x-axis",
  "plot_2d": "{\"data\": [...], \"layout\": {...}}",
  "plot_3d": "{\"data\": [...], \"layout\": {...}}"
}
```

---

## Folder Structure Hierarchy

```
integral_app/
│
├── frontend/                    # React Application
│   │
│   ├── public/                  # Static assets
│   │   └── index.html           # Root HTML
│   │
│   ├── src/                     # Source code
│   │   ├── components/          # React components
│   │   │   ├── Calculator.js    # Form component
│   │   │   ├── Calculator.css
│   │   │   ├── Results.js       # Results display
│   │   │   ├── Results.css
│   │   │   ├── Plot2D.js        # 2D visualization
│   │   │   ├── Plot2D.css
│   │   │   ├── Plot3D.js        # 3D visualization
│   │   │   └── Plot3D.css
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # App styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   │
│   ├── package.json             # NPM configuration
│   ├── tsconfig.json            # TypeScript config
│   ├── .gitignore
│   ├── .env.example
│   ├── setup.sh
│   └── README.md
│
├── backend/                     # Python Backend
│   ├── main.py                  # FastAPI app
│   ├── services/
│   │   ├── math_service.py      # Calculation logic
│   │   └── visualization_service.py
│   └── requirements.txt
│
└── Documentation/               # Setup docs
    ├── QUICK_START.md
    ├── INSTALLATION_GUIDE.md
    ├── FRONTEND_SETUP.md
    ├── FRONTEND_COMPLETE_DOCS.md
    ├── PROJECT_OVERVIEW.md
    ├── SETUP_COMPLETE.md
    └── ARCHITECTURE_DIAGRAM.md (this file)
```

---

## Component Interaction Diagram

```
                    ┌──────────────────┐
                    │   App Component  │
                    │  (Main Logic)    │
                    └──────────────────┘
                          ↓     ↑
                    state & props
                          │     │
         ┌────────────────┴─────┴─────────────────┐
         │                                         │
         ↓                                         ↓
    ┌─────────────┐                         ┌──────────────┐
    │ Calculator  │                         │  Results     │
    │ Component   │                         │  Component   │
    │             │                         │              │
    │ - Form      │  ──onCalculate()──→     │ - Display    │
    │ - Input     │                         │ - Tabs       │
    │ - Validation│←──setResults()───       │ - Graphs     │
    └─────────────┘                         └──────────────┘
                                                  ↓
                                           ┌─────────────────┐
                                           │  Plot2D / Plot3D│
                                           │   (Visualizers) │
                                           └─────────────────┘
```

---

## Styling Architecture

```
┌─────────────────────────────────────┐
│         Global Styles               │
│         (index.css)                 │
│                                     │
│ - Body background (gradient)        │
│ - Font families                     │
│ - Basic resets                      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│       App-level Styles              │
│         (App.css)                   │
│                                     │
│ - Layout (grid)                     │
│ - Container styling                 │
│ - Header & footer                   │
│ - Main animations                   │
└─────────────────────────────────────┘
              ↓
    ┌─────────┬──────────┬───────────┐
    ↓         ↓          ↓           ↓
┌────────┐┌────────┐┌────────┐┌──────────┐
│Calc CSS││Plot CSS││Plot CSS│Results CSS│
│        ││ 2D    ││ 3D     │          │
│Component││       ││       │Component  │
│Styles   ││Styles ││Styles │Styles    │
└────────┘└────────┘└────────┘└──────────┘
```

---

## State Management Flow

```
┌────────────────────────────────────────────┐
│              React Hook State              │
│  (using useState in App component)         │
└────────────────────────────────────────────┘
            │              │              │
            ↓              ↓              ↓
     ┌───────────┐  ┌──────────┐  ┌─────────┐
     │ results   │  │ loading  │  │  error  │
     │ (null)    │  │ (false)  │  │ (null)  │
     └───────────┘  └──────────┘  └─────────┘
            │              │              │
            ↓              ↓              ↓
     API Response    Loading UI      Error UI
     Stored here     Control        Display
```

---

## User Journey Map

```
User Opens App
    ↓
Sees Calculator Form
    ↓
Enters Function Data
    ├─ Function: x**2
    ├─ Lower: 0
    ├─ Upper: 2
    └─ Axis: x-axis
    ↓
Clicks "Hitung Volume"
    ↓
Loading State
    ├─ Button disabled
    ├─ Spinner shows
    └─ Form disabled
    ↓
API Request Sent
    ├─ POST to backend
    ├─ Wait for response
    └─ Check for errors
    ↓
Results Received
    ├─ Volume: 4.188790
    ├─ Plots: 2D & 3D
    └─ Formula info
    ↓
Results Displayed
    ├─ Cards show volume
    ├─ Tabs for graphs
    ├─ Can switch 2D/3D
    └─ Can scroll down
    ↓
User Can:
    ├─ View 2D graph
    ├─ View 3D graph
    ├─ Read formula
    ├─ Try new input
    └─ Copy values
```

---

## File Dependencies

```
App.js
├── import Calculator (components/Calculator.js)
├── import Results (components/Results.js)
├── import App.css
└── Uses Fetch API (built-in)

Calculator.js
└── import Calculator.css

Results.js
├── import Plot2D (components/Plot2D.js)
├── import Plot3D (components/Plot3D.js)
└── import Results.css

Plot2D.js
├── import Plot2D.css
└── Uses window.Plotly (from CDN)

Plot3D.js
├── import Plot3D.css
└── Uses window.Plotly (from CDN)

index.js
├── import App (from App.js)
├── import index.css
└── Renders to #root element
```

---

## Responsive Design Breakpoints

```
┌──────────────────────────────────┐
│     Desktop (> 768px)            │
│                                  │
│  ┌────────────┐  ┌────────────┐  │
│  │ Calculator │  │  Results   │  │
│  │   (Left)   │  │  (Right)   │  │
│  └────────────┘  └────────────┘  │
└──────────────────────────────────┘

┌──────────────┐
│  Mobile      │
│  (≤ 768px)   │
│              │
│ ┌──────────┐ │
│ │Calculator│ │
│ └──────────┘ │
│ ┌──────────┐ │
│ │ Results  │ │
│ └──────────┘ │
└──────────────┘
```

---

## Tech Stack Layers

```
┌─────────────────────────────────────┐
│  Browser / User Interface           │ ← Plotly.js (CDN)
├─────────────────────────────────────┤
│  React Components                   │ ← React 18
├─────────────────────────────────────┤
│  Styling & Animations               │ ← CSS3
├─────────────────────────────────────┤
│  HTTP Communication                 │ ← Fetch API
├─────────────────────────────────────┤
│  Backend API                        │ ← FastAPI (Python)
├─────────────────────────────────────┤
│  Business Logic                     │ ← Math Service
└─────────────────────────────────────┘
```

---

**Diagram Updated:** December 18, 2025
