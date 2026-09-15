# MOVE — Research References & Case Studies

*Consolidated reference document — all studies, papers, prior-art projects, and evidence supporting the MOVE concept.*

---

## How to Use This Document

This is the evidence base behind MOVE. Each entry includes: what the study/project found, why it matters to MOVE, where it fits in the pitch, and a verification status. Use this as the source-of-truth when writing the full report or answering judge questions on evidence.

> **Note on verification:** The Devpost and KSAA links in this document were checked and resolve, with their claimed features confirmed against the live pages. The academic papers could NOT be re-verified this pass (web search returned server errors; Google Scholar was unavailable). Academic findings below reflect the paper excerpts and summaries shared during idea development and are tagged accordingly. Before final submission, verify full citations (year, volume, DOI/URL) directly against the original KSCDR Journal of Disability Research entries and the named publishers.

---

## 1. The Core Gap Paper (Closest Prior Work)

### Jleli et al. (2024) — AI-Based Rehabilitation Exercise Scoring
**System:** YOLOv5 + ShuffleNet V2 + Bi-LSTM framework for scoring physical rehabilitation exercises from video.
**Validation dataset:** KiMoRe — a Western dataset, Western participants, tight athletic clothing, lab setting.
**Key result:** Outperforms prior benchmarks on KiMoRe for automated exercise scoring.
**Critical admission (direct quote basis for our opportunity statement):**
> "Inadequate validation of AI-driven models across heterogeneous patient populations encompassing various age cohorts, cultural contexts, and medical conditions."

**Why it matters to MOVE:**
- This is the closest existing published system to what we're proposing.
- Published in KSCDR's own Journal of Disability Research — meaning the funding body itself has identified this exact gap.
- MOVE directly extends this framework's scoring logic (Bi-LSTM exercise scoring) but replaces the KiMoRe-trained pose backbone with one adapted for Saudi attire and context.
- **Use in pitch:** "KSCDR's own published research shows that the only AI rehab monitoring system validated in Saudi Arabia was trained on Western participants in athletic clothing — MOVE closes that gap."

**Supports:** Core opportunity statement; MOVE's Bi-LSTM exercise-scoring extension; Saudi-context adaptation thesis.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; full citation not independently re-verified this pass (Google Scholar unavailable; server errors).

---

## 2. The Cultural/Population Gap Paper

### Alghadier et al. (2024) — Saudi Cerebral Palsy Growth & Motor Profiles
**Finding:** Saudi children with cerebral palsy show meaningfully different growth and motor profiles compared to UK/US pediatric populations.
**Explicit call to action:** Authors call for "region-specific" tools rather than importing Western-validated models as-is.

**Why it matters to MOVE:**
- Provides direct clinical evidence that Western-trained AI models (like the KiMoRe-based Jleli et al. system) may not generalize to Saudi patients — not just due to clothing/vision issues, but due to underlying motor/biomechanical differences.
- Strengthens the "Cultural Data Gap" argument as a clinical fact, not just a technical inconvenience.
- Supports cerebral palsy as a secondary target population for future MOVE expansion.

**Supports:** Cultural Data Gap pillar; region-specific-model justification; secondary target population.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

---

## 3. Sensor-Based Alternatives (Confirming the Vision-Based Gap)

### AlQahtani et al. (2024) — fNIRS + EMG for Prosthetic Knee Control
**System:** Hybrid functional near-infrared spectroscopy (fNIRS) + electromyography (EMG) system for controlling prosthetic knees.
**Scope:** Entirely sensor/brain-signal based. No camera-based or vision alternative explored.

**Why it matters to MOVE:**
- Confirms that KSCDR-funded research in this space has focused on invasive/wearable sensor approaches, not accessible camera-based ones.
- Reinforces MOVE's key differentiator: **zero specialized hardware, only a smartphone camera.**
- Useful contrast point when discussing feasibility and accessibility versus sensor-heavy alternatives.

**Supports:** "Camera-based is an unexplored path in the KSCDR portfolio"; MOVE's zero-hardware differentiator.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

### Rao et al. (2024) — EMG + IMU Sensor Fusion for Trunk Movement Detection
**System:** Wearable EMG + IMU (inertial measurement unit) sensor fusion for detecting trunk movement.
**Result:** 87% cascaded accuracy.
**Scope:** Wearable sensors only — no vision-based alternative.

**Why it matters to MOVE:**
- Second confirmation that the KSCDR research portfolio has not explored camera-based/vision alternatives for movement analysis.
- Supports the claim that "camera-based pose estimation is an unexplored path in the KSCDR research portfolio."

**Supports:** Vision-based gap in KSCDR portfolio (second confirmation).
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

---

## 4. The Access Gap Paper (Telemedicine Barriers)

### Albasheer et al. (2025) — Telemedicine Use and Usability for People with Disabilities in Saudi Arabia
**Full title:** *Telemedicine Use and Usability for People with Disabilities in Saudi Arabia: Barriers and Enablers from Healthcare Providers' Perspectives*
**Authors:** Osama Albasheer, Siddig Ibrahim Abdelwahab, Ibrahim Gosadi, Yahia Solan, Renju Ravi, Omar Ahmed Alsun, et al.
**Published in:** KSCDR's Journal of Disability Research.

**Key findings:**
- Only **46.84%** of Saudi healthcare providers use telemedicine with disabled patients.
- Top three barriers identified:
  1. Poor internet/connectivity tools
  2. Inadequate provider training
  3. Lack of appropriate infrastructure
- Findings are explicitly linked to Vision 2030's digital health transformation goals.

**Why it matters to MOVE:**
- This is the **Access Gap** pillar of the problem statement — direct evidence that people with disabilities in Saudi Arabia cannot reliably access remote rehabilitation care today.
- Justifies the telerehabilitation / care-network dashboard component as a direct response to a documented, KSCDR-funded barrier.
- Ties MOVE explicitly to Vision 2030 health policy — a strong impact-criterion talking point.

**Supports:** Access Gap pillar; care-network dashboard justification; Vision 2030 alignment.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

---

## 5. The Measurement Gap Paper (Clinical Bottleneck)

### Alhwoaimel et al. (2024) — Functional Mobility and Balance Confidence Measures and Disability in Older Adults
**Full title:** *Functional Mobility and Balance Confidence Measures Are Associated with Disability among Community-Dwelling Older Adults*
**Authors:** Norah A. Alhwoaimel, Mohammed M. Alshehri, Ahmed S. Alhowimel, Aqeel M. Alenazi, Bader A. Alqahtani.
**Published in:** KSCDR-funded research (Journal of Disability Research).

**Key findings:**
- Saudi physiotherapists want to use standardized outcome measures — specifically the **30-Second Chair Stand Test (30s-CST)** and **balance confidence scales (ABC scale)**.
- They are blocked from consistent use by **time constraints** and **resource limitations**.
- Current clinical practice: therapists manually count repetitions, visually estimate range of motion, and record findings on paper.
- Demographic context: older adults are projected to reach **18% of the Saudi population by 2050**; mobility disability prevalence is currently **33.6%** among community-dwelling older adults.

**Why it matters to MOVE:**
- This is the **Measurement Gap** pillar — direct clinical evidence that Saudi physiotherapists want standardized, quantitative outcome measures but cannot administer them consistently due to time/resource constraints.
- Directly validates the choice of the **30-Second Chair Stand Test** as the primary exercise for the hackathon prototype (sit-to-stand scoring).
- Provides the scale-of-impact statistics (18% by 2050, 33.6% current prevalence) used in the Impact section of the pitch.
- Confirms the target population (older adults, mobility-impaired, community-dwelling) as clinically well-evidenced and judge-legible.

**Supports:** Measurement Gap pillar; 30s-CST prototype choice; impact-scale statistics; target population.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

---

## 6. Supporting Prior Computer Vision Work by KSCDR

### Alabdulkreem et al. (2023) — Computer Vision with Optimal Deep Stacked Autoencoder-based Fall Activity Recognition for Disabled Persons in the IoT Environment
**Authors:** Eatedal Alabdulkreem, Radwa Marzouk, Mesfer Alduhayyem, Mohammed Abdullah Al-Hagery, Abdelwahed Motwakel, et al.
**System:** Computer vision + deep stacked autoencoder model for fall detection in disabled persons within an IoT environment.

**Why it matters to MOVE:**
- This is direct evidence that **KSCDR funds and publishes computer-vision-based systems for disabled persons** — MOVE is not introducing an unfamiliar methodology to this funding body, it is extending an established direction (vision-based monitoring) into a new application (rehabilitation exercise scoring rather than fall detection).
- Strengthens the innovation narrative: "We are extending KSCDR's own computer vision research direction into rehabilitation."

**Supports:** CV-research precedent at KSCDR; innovation-narrative framing.
**Verification:** VERIFICATION PENDING — findings originally sourced from paper excerpts during idea development; not re-verified this pass.

---

## 7. Prior-Art Projects (Devpost) — MOVE Feature Inspiration

These are hackathon prior-art projects reviewed during MOVE's direction-setting. They are NOT academic literature; they are shipped/demoed software. The Devpost links were checked and resolve this pass.

### thera_pixel — Hacklytics 2025 (2nd place)
**Link:** https://devpost.com/software/rehab-fv6j1l
**What it is:** At-home rehab exercises using MediaPipe 3D Pose, paired with a pixel-art mini-game ("Pizza Pursuit") plus a practice-studio mode.
**MOVE feature inspired:** Gamification.

**Honest note (what is and is NOT thera_pixel's contribution):**
- thera_pixel proved the gamified-rehab concept with a *single* game.
- MOVE's "different mini-game per prescribed exercise / growing game library" is MOVE's *extension* of that concept, not a thera_pixel feature.
- thera_pixel did **not** address clothing occlusion (the Saudi-attire gap MOVE targets).

**Supports:** Gamification feasibility precedent (concept proof); MOVE's game-library extension is the novel delta.
**Verification:** PARTIALLY VERIFIED — link resolves; single-game structure confirmed on the page; "different game per exercise / growing library" NOT confirmed as a thera_pixel feature (that is MOVE's delta, correctly attributed).

### RecoveryLab — TreeHacks 2026
**Link:** https://devpost.com/software/recoverylab
**What it is:** Physical-therapy adherence platform with AI schedule extraction, movement analysis, and caregiver notifications (SMS/email).
**MOVE feature inspired:** Notifications & care-network support.

**Honest note (what is and is NOT RecoveryLab's contribution):**
- RecoveryLab confirms adherence tracking + caregiver alerts on missed sessions.
- MOVE's "regression-trend check-in flag" and "session history → tier/game unlock" are MOVE's own design extensions, NOT features RecoveryLab documents.
- RecoveryLab inspires the *care-network shape* only.

**Supports:** Care-network + notifications shape (adherence tracking + caregiver alerts); regression-flag and tier-unlock are MOVE's deltas.
**Verification:** PARTIALLY VERIFIED — link resolves; adherence + caregiver alerts confirmed on the page; regression-flag and tier-unlock NOT confirmed on the page (MOVE's design, correctly attributed).

### MoveAI (echorehab) — WEHack 2026
**Link:** https://devpost.com/software/echorehab
**What it is:** Rehab monitoring using a standard webcam for exercise rep-counting (squats, sit-ups, jumping jacks); data sent to doctors.
**MOVE feature inspired:** Contrast case for MOVE's "no assumed gym setup" design constraint.

**Honest note (what is and is NOT MoveAI's contribution):**
- Webcam rep-counting is confirmed on the page.
- The "assumes gym-style setup with exposed limbs" framing is MOVE's *inference / counter-position*, not a documented MoveAI claim. Do not present it as an MoveAI admission.

**Supports:** MOVE's no-assumed-gym-setup constraint; counter-positioning (MOVE targets Saudi attire / domestic setting, not gym attire).
**Verification:** PARTIALLY VERIFIED — link resolves; webcam rep-counting confirmed; gym-setup assumption is MOVE's inference, not a documented MoveAI claim.

### KineTrack — HackTX 2025
**Link:** https://devpost.com/software/kinetrack
**What it is:** iOS app with live iPhone camera movement analysis + spoken/voice coaching, end-of-session summary, saved session history, and user-adjustable camera resolution/frame rate.
**MOVE feature inspired:** UI/UX — live-camera-first design, spoken coaching, session summary, history, adjustable capture.

**Supports:** MOVE's UX surface (live camera, voice coaching, summary, history, capture controls).
**Verification:** DIRECTLY VERIFIED — link resolves; all listed features confirmed on the page.

### PhysioVision — Code for Change 2026
**Link:** https://devpost.com/software/physiovision
**What it is:** Webcam-based AI PT coach using MediaPipe Pose Landmarker (33 landmarks), rep counting, ROM scoring. Notable technical details:
- Per-exercise analyzers using **relative landmark distances** (not raw joint angles).
- Custom rep-counting state machine: normalized 0–1 signal, up/down-phase thresholds, multi-frame stability, min inter-rep time.
- Percentage-based tempo tolerance + ROM scoring.
- **Frontend:** React/TypeScript + Vite + Tailwind + shadcn/ui.
- **Backend:** Node.js/Express + MongoDB + JWT.
- Explicitly lists "mobile-friendly version" as **unbuilt** future work.

**MOVE feature inspired:** Technology stack — Pose Landmarker engine, relative-distance exercise logic, rep-count state machine, percentage scoring. MOVE rebuilds the frontend phone-first, since PhysioVision's mobile version is unbuilt.

**Supports:** MOVE's pose engine choice; relative-distance exercise logic; rep-count state-machine design; percentage scoring; phone-first rebuild rationale.
**Verification:** DIRECTLY VERIFIED — link resolves; all listed technical details confirmed on the page.

---

## 8. KSAA Games Platform — Gamification Content-Structure Reference

### King Salman Global Academy for Arabic Language (KSAA) — Games Platform
**Link:** https://games.ksaa.gov.sa
**What it is:** Arabic-language learning games platform. Referenced for MOVE's gamification **content structure** (taxonomy only — it is a language-learning product, not rehab content).
**Confirmed structure (referenced for MOVE's design):**
- 50+ games.
- Three audience/difficulty tiers.
- Individual vs. group modes.
- Leagues competitive structure.
- Web + mobile apps.
- ~3,000+ questions.

**Why it matters to MOVE:**
- MOVE borrows the *structural taxonomy* (tiered difficulty, individual/group modes, league competition, growing content library) as a template for its rehab-gamification content structure — not the language-learning content itself.

**Supports:** MOVE's gamification content-structure taxonomy (tiers, modes, leagues, library).
**Verification:** DIRECTLY VERIFIED — link resolves; all structure claims (50+ games, three tiers, individual/group modes, leagues, web+mobile, ~3,000+ questions) confirmed on the live site.

---

## 9. Additional Academic References (from Project Direction)

These were referenced in the MOVE project direction but were not in the original idea-development excerpts, and could NOT be re-verified this pass (Google Scholar returned server errors). They are added here as placeholders / pending entries. **No findings, DOIs, or MOVE performance numbers are invented** — where specifics are stated, they carry the attribution given in the project direction and are tagged VERIFICATION PENDING.

### Hsu et al.
**Referenced in:** the project's literature set.
**What we know:** Referenced in the project direction as part of the literature set; specifics not confirmed from the existing file.
**Supports:** TBD pending full citation.
**Verification:** VERIFICATION PENDING — full citation needed. Do not cite a specific finding until confirmed against the original source.

### Arrowsmith et al. (2023)
**Claim (from project direction):** Accuracy drop with unseen camera angle in pose estimation; stated as up to ~50% accuracy drop.
**Supports:** MOVE's camera-angle robustness consideration.
**Verification:** VERIFICATION PENDING — claim carried from project direction; not independently re-verified this pass. Confirm magnitude ("~50%") against the original source before stating it in the pitch.

### Yang & Park
**Referenced in:** the project's literature set.
**What we know:** Referenced in the project direction as part of the literature set; specifics not confirmed from the existing file.
**Supports:** TBD pending full citation.
**Verification:** VERIFICATION PENDING — full citation needed. Do not cite a specific finding until confirmed against the original source.

### Viswakumar et al. (2022)
**Claim (from project direction):** Loose / robe-like garment effect on pose estimation; hip error ~11.36° vs baseline; depth sensor failed entirely.
**Supports:** MOVE's garment-stratified evaluation commitment (evaluation question Q3) — direct technical motivation for stratifying evaluation by attire.
**Verification:** VERIFICATION PENDING — claim carried from project direction; not independently re-verified this pass. Confirm the specific numbers (hip error ~11.36°, depth-sensor failure) against the original source before stating in the pitch.

### Ray et al.
**Claim (from project direction):** Synthetic loose-garment MPJPE evaluation for pose estimation.
**Supports:** MOVE's garment-stratified evaluation commitment (evaluation question Q3) — second technical anchor for attire-stratified evaluation.
**Verification:** VERIFICATION PENDING — claim carried from project direction; not independently re-verified this pass. Confirm the evaluation setup and MPJPE figures against the original source before stating in the pitch.

### Simmich et al. (2024)
**Claim (from project direction):** Real-time video telerehabilitation; +8–9 points attendance/adherence vs in-person.
**Supports:** MOVE's telerehabilitation / adherence-improvement thesis (real-time video improves adherence).
**Verification:** VERIFICATION PENDING — claim carried from project direction; not independently re-verified this pass. Confirm the "+8–9 pts" magnitude against the original source before stating in the pitch.

---

## 10. Referenced but Not Yet Fully Sourced (Action Items)

These are mentioned in the idea development process but full text/citation was not available at time of writing. Recommended to locate and verify before final submission:

| Reference | What we know | What's needed |
|---|---|---|
| **Alhwoaimel — Barriers paper** (referenced separately from the 2024 functional mobility paper above, re: physiotherapists and standardized outcome measures) | Physiotherapists want standardized outcome measures but face implementation barriers | Confirm whether this is the same paper as the Functional Mobility study above, or a separate barriers-specific publication. If separate, source verbatim quotes for the report — this is described as the "strongest policy evidence." |
| **Hussein et al.** — CP studies (Saudi) | Referenced as source for cerebral palsy manual goniometry practices, used to justify the "knee extension in seated position" exercise | Locate full citation and key findings |
| **Alkathiry et al.** | Referenced alongside Alhwoaimel as evidence for Saudi stroke rehabilitation population | Locate full citation and key findings |
| **Abaya/thobe occlusion effects on pose estimation** | No published study found. This is currently framed as a first-principles/acknowledged gap, not a cited finding. | Either (a) find any technical literature on fabric occlusion in human pose estimation generally (non-Saudi-specific is acceptable as supporting technical evidence — Viswakumar et al. 2022 and Ray et al. in §9 are candidate anchors, pending verification), or (b) clearly state in the report/pitch that this is an identified gap based on domain knowledge, not a cited study. Do not present as a sourced claim without verification. |

---

## 11. Evidence-to-Pitch-Section Mapping (Quick Reference Table)

| Pitch Section | Primary Evidence |
|---|---|
| Problem — Access Gap | Albasheer et al. (2025) |
| Problem — Measurement Gap | Alhwoaimel et al. (2024) |
| Problem — Cultural Data Gap | Alghadier et al. (2024); Jleli et al. (2024) limitation statement |
| Closest Prior Work / Core Opportunity Statement | Jleli et al. (2024) |
| Confirming Vision-Based Gap in KSCDR Portfolio | AlQahtani et al. (2024); Rao et al. (2024) |
| Precedent for CV Research at KSCDR | Alabdulkreem et al. (2023) |
| Target Population Justification | Alhwoaimel et al. (2024); [Hussein et al., Alkathiry et al. — pending verification] |
| Impact Scale Statistics | Alhwoaimel et al. (2024) — 18% by 2050, 33.6% prevalence |
| Vision 2030 Policy Alignment | Albasheer et al. (2025) |
| Gamification (concept proof) | thera_pixel (Hacklytics 2025) — single-game proof; MOVE's per-exercise game library is the delta |
| Gamification (content-structure taxonomy) | KSAA Games Platform (games.ksaa.gov.sa) — tiers, modes, leagues, library |
| Notifications & care-network shape | RecoveryLab (TreeHacks 2026); regression-flag + tier-unlock are MOVE deltas |
| "No assumed gym setup" constraint / counter-position | MoveAI / echorehab (WEHack 2026) — gym-setup framing is MOVE's inference |
| UI/UX (live camera, voice coaching, summary, history, capture controls) | KineTrack (HackTX 2025) |
| Technology stack (Pose Landmarker, relative-distance logic, rep-count state machine, % scoring) | PhysioVision (Code for Change 2026); phone-first rebuild since its mobile version is unbuilt |
| Adherence improvement via real-time video telerehab | Simmich et al. (2024) [pending verification] |
| Garment-stratified evaluation (Q3) | Viswakumar et al. (2022) + Ray et al. [pending verification] |
| Camera-angle robustness | Arrowsmith et al. (2023) [pending verification] |

---

## 12. One-Line Master Gap Statement

> "KSCDR's own published research shows that the only AI rehab monitoring system validated in Saudi Arabia was trained on Western participants in athletic clothing — MOVE closes that gap."

---

*Document prepared as a reference source for the MOVE report and presentation. Devpost and KSAA links were checked and resolve this pass; academic citations could not be re-verified this pass (Google Scholar unavailable) — verify all academic citation details against original sources before final submission.*
