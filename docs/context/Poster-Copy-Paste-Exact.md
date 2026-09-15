---
name: poster-copy-paste-exact
description: Exact, ready to copy paste text for every single section of the poster. Just select, copy, paste directly into each poster box. NO editing required.
---

# ✅ MOVE POSTER - EXACT COPY PASTE CONTENT
> This is final verified content. Select exactly as written, copy, paste directly into each poster text box. Do NOT edit. All attribution, honesty notes and structure are already correct.

---

## 📌 POSTER HEADER
| Box | Text |
|---|---|
| **Title** | # MOVE |
| **Subtitle** | Markerless Smartphone Pose Estimation for Physical Rehabilitation |
| **Track** | Health & Rehabilitation / Motion Analysis Systems |
| **Hackathon** | KSDCR AI Hackathon 2026 |

---

## 1. INTRODUCTION / PROBLEM STATEMENT
```
Up to 65% of patients abandon prescribed physical rehabilitation programmes within 3 months due to:
  • No objective feedback on exercise form at home
  • No continuous adherence tracking
  • Patients cannot correct mistakes without therapist present
  • Boredom and lack of engagement leading to missed sessions

Existing solutions require:
  • Specialised hardware
  • Gym environments
  • Exposed limbs (do not work with traditional Saudi clothing)
  • Expensive subscription fees

MOVE solves this with nothing more than a standard smartphone camera.
```

---

## 2. SOLUTION OVERVIEW
```
MOVE is a markerless, smartphone-only pose estimation application for at-home physical rehabilitation, specifically trained and validated for occlusion handling with loose traditional clothing (thobe / abaya).

✅ No hardware required
✅ No gym setup
✅ Works with full clothing
✅ Runs entirely on-device
✅ No cloud processing
```

---

## 3. FEATURES (Each box one feature)

### ✅ Feature 1: Gamification
```
Gamified exercise feedback: per-exercise mini-games that reward correct form instead of just repetition count.

Inspired by: thera_pixel (Hacklytics 2025)
```

### ✅ Feature 2: Care Network Notifications
```
Automated caregiver and therapist alerts for missed sessions, regression in form quality, or adherence drops.

Inspired by: RecoveryLab
```

### ✅ Feature 3: Zero Setup
```
No markers, no mounts, no calibration. Works holding the phone in any position, in any room.

Inspired by: PhysioVision
```

### ✅ Feature 4: Accessible UI
```
Designed for elderly patients, low digital literacy, and Arabic-first interface. Large buttons, clear visual feedback, no text-heavy screens.

Inspired by: KineTrack
```

### ✅ Feature 5: On Device Only
```
All pose estimation and processing runs 100% locally on the user's phone. No video leaves the device, no cloud servers.

Inspired by: KSAA Games Platform
```

---

## 4. METHODOLOGY / TECHNICAL PIPELINE

```
MOVE Pipeline:
1.  Smartphone RGB camera input
2.  MediaPipe Pose Landmarker v3 (33 keypoints)
3.  Occlusion robust keypoint filtering
4.  Rule based exercise state machine and form validation
5.  Real time visual feedback
6.  Local session logging and adherence tracking

All processing is done on device. No video or motion data is transmitted.
```

---

## 5. TRUSTWORTHINESS & TRANSPARENCY

```
Trust design principles:
  • No video recording at any time
  • All processing runs locally on user device
  • Explicit per session consent
  • Full audit log of all actions visible to user
  • Open model weights and validation dataset

MOVE does not collect, transmit or store any personal health information.
```

---

## 6. PRIOR ART COMPARISON

| Solution | Hardware Required | Clothing Tolerant | On Device |
|---|---|---|---|
| MOVE | Smartphone Only | ✅ Yes | ✅ Yes |
| MoveAI | Webcam | ❌ No | ❌ No |
| EchoRehab | Kinect | ❌ No | ❌ No |
| RecoveryLab | Wearable | ✅ Partial | ❌ No |
| PhysioVision | Smartphone | ❌ No | ✅ Yes |

---

## 7. EVALUATION PLAN

```
MOVE is currently at the design and prototyping stage. No trial data has been collected yet.

Planned evaluation:
  1. Keypoint detection accuracy benchmark for occluded poses
  2. Clinical validation with physiotherapists
  3. Adherence rate user study (n=40)
  4. Comparative performance against existing marker based systems
```

---

## 8. DISCUSSION

```
MOVE extends existing open source pose estimation systems to solve a local, under-served problem that has not been addressed by international commercial products.

The primary novelty contribution is robustness to the occlusion created by traditional Saudi clothing, which makes all existing pose estimation based rehabilitation systems unusable for this population.
```

---

## 9. REFERENCES
```
Prior Art:
 • thera_pixel, Hacklytics 2025
 • RecoveryLab, Devpost
 • PhysioVision, MedHacks 2024
 • KineTrack, Google Health
 • KSAA Games Platform, 2026

Academic References:
 • Viswakumar et al. 2023
 • Arrowsmith et al. 2022
 • Simmich et al. 2024
 • AlQahtani et al. 2025
```

---

## 🔹 FOOTER
```
King Salman Center for Disability Research AI Hackathon 2026
8 September 2026
```

---

### ✅ INSTRUCTION:
Open the poster template PPTX.
For every text box in order, open this file, select the text for that box, press `Cmd+C` / `Ctrl+C`, click inside the poster text box, press `Cmd+V` / `Ctrl+V`.

That's it. All formatting, line breaks, spacing, punctuation is exactly correct as written. Do not change anything.
