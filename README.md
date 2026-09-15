# MOVE (حَـرَكَـة) — Culturally-Adapted AI Motion Analysis & Gamified Rehabilitation

<div align="center">

![MOVE AI Banner](src/landing/public/images/logo.png)

**A markerless, smartphone-first physical therapy and motion analysis platform adapted specifically for Saudi cultural attire (Thobe, Abaya, Hijab).**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MediaPipe](https://img.shields.io/badge/MediaPipe-0097A7?style=flat-square&logo=google&logoColor=white)](https://developers.google.com/mediapipe)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Production Demo](https://moveai.ahammouch.me) • [Pizza Game Showcase](https://moveai.ahammouch.me/?view=pizza-demo) • [Clinical Angle Showcase](https://moveai.ahammouch.me/?view=movement-demo)

</div>

---

## 🎯 Executive Overview

Physical therapy in Saudi Arabia faces three critical bottlenecks:
1. **Cultural Attire Occlusion**: Standard computer vision models experience severe joint degradation when limbs are concealed by traditional flowing garments (Saudi Thobe, Abaya, or Hijab).
2. **Clinical Time Constraints**: 38% of Saudi physical therapists report insufficient session time to conduct repetitive goniometry measurements manually (*Alhwoaimel et al., 2024*).
3. **Patient Non-Adherence**: Up to 65% of rehabilitation patients abandon paper-based home exercise programs within the first three weeks due to lack of engagement.

**MOVE** solves this by converting ordinary smartphone or laptop webcams into a clinical-grade motion analysis laboratory and gamified therapy companion:
- **100% On-Device Processing**: Runs client-side via WebAssembly/WebGL—zero cloud latency, zero video uploads, and 100% Saudi PDPL healthcare privacy compliance.
- **Cultural Attire Occlusion Compensation**: Dynamically re-weights occluded joint confidence and applies temporal kinematic priors for patients wearing loose garments.
- **Pizza Pursuit Adherence Game**: 8 progressive rehabilitation stages driven entirely by upper-extremity movement thresholds.
- **Silma AI Native Arabic Voice Coach**: Integrated speech synthesis providing clear verbal exercise instructions with authentic Arabic diacritics (*تَشْكِيل*).

---

## 🌟 Core System Architecture

```
                                  +---------------------------------------+
                                  |     Patient Home Device (Browser)     |
                                  |     No App Store Install Required     |
                                  +-------------------+-------------------+
                                                      |
                                       Webcam Video Frame Stream (30-60 FPS)
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |   MediaPipe 3D Landmark Extraction    |
                                  |   33 Skeletal Keypoints (Local WASM)  |
                                  +-------------------+-------------------+
                                                      |
                                                      v
                                  +---------------------------------------+
                                  |  MOVE Attire Occlusion Engine (HUD)   |
                                  |  Dynamic Confidence & Drape Filtering |
                                  +-------------------+-------------------+
                                                      |
                         +----------------------------+----------------------------+
                         |                                                         |
                         v                                                         v
    +------------------------------------+                    +------------------------------------+
    |      Pizza Pursuit Rehab Quest     |                    |      Clinical Practice Studio      |
    |  - 8-Stage Pixel Art Progression   |                    |  - IntelliRehabDS Goniometry       |
    |  - Strict Kinematic Rep Validation |                    |  - Active Range of Motion (AROM)   |
    |  - Audio Chimes & Confetti FX      |                    |  - Instant Tempo & Form Scoring    |
    +-----------------+------------------+                    +-----------------+------------------+
                      |                                                         |
                      +----------------------------+----------------------------+
                                                   |
                                                   v
                                  +---------------------------------------+
                                  |      Silma AI Arabic Voice Coach      |
                                  |   9 Native 24kHz Spoken Guidance      |
                                  |   Repeatable Audio Without Reading    |
                                  +---------------------------------------+
```

---

## 🎮 1. The Pizza Pursuit Therapy Quest

Each therapeutic exercise is wrapped in a high-engagement, retro-styled culinary journey:

| Stage | Exercise | Target Musculature | Biomechanical Threshold |
| :---: | :--- | :--- | :--- |
| **1** | **Knead the Dough** | Bilateral Band Pulls | Elbow-to-wrist expansion $>0.45$ distance |
| **2** | **Toss & Roll** | Lateral Arm Raises | Shoulder abduction $>75^\circ$ elevation |
| **3** | **Spread the Sauce** | Bilateral Stirring Circles | Continuous circular hand traversal |
| **4** | **Sprinkle Cheese** | Left Bicep Curls | Elbow flexion $<45^\circ$, extension $>150^\circ$ |
| **5** | **Place Toppings** | Right Bicep Curls | Elbow flexion $<45^\circ$, extension $>150^\circ$ |
| **6** | **Brick Oven Bake** | Forward Reach Punches | Bilateral wrist displacement beyond chest plane |
| **7** | **Slice Portions** | Overhead Downward Slices | High vertical reach transitioning downward |
| **8** | **Feast & Celebrate** | Celebratory Arm Flexions | Full elbow flexion hold + Confetti fireworks |

---

## 🧕 2. Saudi Attire Occlusion Engine

Standard pose models lose tracking accuracy by up to 65% when clothing conceals body contours. MOVE implements continuous attire-aware compensation:

- **Saudi Thobe Preset (الـثـوب)**: Applies geometric bone-length constraints to infer hip and knee joint locations beneath vertical fabric drape.
- **Flowing Abaya Preset (الـعـبـاءة)**: Activates temporal joint smoothing across wide fabric contours.
- **Hijab Preset (الحجاب)**: Re-weights cervical spine and shoulder landmark distributions.
- **Dynamic Occlusion Meter**: Live confidence score fluctuates in real time on every video frame to reflect body pose and garment movement.

---

## 🎙️ 3. Silma AI Spoken Arabic Guidance

Powered by the state-of-the-art **Silma TTS** Arabic speech model, MOVE features 9 high-fidelity audio tracks:
- Spoken in native, clear Arabic with complete tashkeel (*تَشْكِيل*).
- Integrated with an accessible speaker button allowing patients to listen and repeat exercise instructions at any time without reading text.

---

## 📂 Repository Layout

```
├── src/landing/                 # Production Web Platform (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/          # UI Components
│   │   │   ├── PizzaGame.tsx           # 8-Level Pizza Pursuit Game
│   │   │   ├── PizzaDemoShowcase.tsx   # Synchronized Pizza Video Showcase
│   │   │   ├── MovementDemoShowcase.tsx# Clinical Angle Video Showcase
│   │   │   ├── PracticeStudioView.tsx  # IntelliRehabDS Trajectory Graph
│   │   │   ├── AttireOcclusionHUD.tsx  # Saudi Attire Confidence Meter
│   │   │   ├── VisionCanvas.tsx        # Canvas Skeletal & Angle Overlays
│   │   │   └── RehabStudio.tsx         # Unified Multi-Mode Studio
│   │   ├── lib/                 # Core CV & Biomechanics
│   │   │   ├── poseEngine.ts           # Browser MediaPipe WASM Loader
│   │   │   ├── exercises.ts            # Kinematic State Machines & Rep Logic
│   │   │   ├── audioCoach.ts           # Web Audio & Speech Synthesis
│   │   │   └── types.ts                # TypeScript Interfaces & Metrics
│   │   ├── App.tsx              # Application Root & Showcase Router
│   │   └── main.tsx             # DOM Entrypoint
│   ├── public/
│   │   ├── audio/               # 9 Silma AI Arabic Voice Guidance Tracks
│   │   ├── images/              # 60+ Authentic Pixel Art Sprites
│   │   └── videos/              # Showcase Demo Video Recordings
│   ├── deploy.sh                # Automated VPS Deployment Pipeline
│   └── package.json
│
├── PTplay/                      # Python Computer Vision Engine & Practice Studio
│   ├── app.py                   # Flask Application & Video Streaming Routes
│   ├── capture.py               # Native OpenCV Pose Tracking & Rep Counting
│   ├── PracticeStudio.py        # Clinical Joint Angle & AROM Analyzer
│   ├── templates/               # Retro HTML5 UI Views with Silma Audio
│   │   ├── pizzastart.html      # Pizza Game Overview
│   │   ├── knead.html           # Level 1 View
│   │   ├── demo_pizza.html      # Automated Pizza Video Showcase
│   │   ├── demo_movement.html   # Automated Angle Video Showcase
│   │   └── ...                  # Remaining Level Views
│   ├── static/                  # Static Assets (Images, Audio, CSS)
│   └── requirements.txt         # Python Dependencies
│
├── docs/                        # Architecture & Clinical Specifications
└── README.md                    # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0+ or v20.0+
- **Python**: v3.10+ (for Python CV backend)
- **Modern Web Browser**: Chrome, Safari, Edge, or Firefox with webcam permissions

---

### Option A: Modern Web Platform (Recommended)

```bash
# 1. Navigate to the landing application directory
cd src/landing

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open **`http://localhost:5173`** in your browser.

#### Direct Demo Showcase URLs:
- **Pizza Game Video Demo**: `http://localhost:5173/?view=pizza-demo`
- **Clinical Angle Video Demo**: `http://localhost:5173/?view=movement-demo`

---

### Option B: Python Flask Server

```bash
# 1. Navigate to PTplay directory
cd PTplay

# 2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Start the Flask server
python app.py
```

Open **`http://localhost:5001/pizzagame`** or **`http://localhost:5001/demo_pizza`**.

---

## 🌐 Production VPS Deployment

The web platform is pre-configured for automated live deployment to **`https://moveai.ahammouch.me`**:

```bash
cd src/landing
chmod +x deploy.sh
./deploy.sh
```

---

## 👥 Contributors & Attribution

- **Project Lead**: Ammar Hammouch ([@AmmarsGeeks](https://github.com/AmmarsGeeks))
- **Clinical Dataset Benchmark**: IntelliRehabDS Motion Trajectory Dataset
- **Arabic Speech Model**: Silma AI (`silma-tts`)
- **Computer Vision Core**: Google MediaPipe Pose 3D

---

<div align="center">
  <sub>Developed for the King Salman Disability Research Center (KSDCR) Hackathon 2026.</sub>
</div>
