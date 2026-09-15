# MOVE — Final Submission Slide Deck Script (1:1 with PowerPoint)

> **Event:** AI Hackathon for People with Disabilities 2026 (هـاكـاثـون الذكاء الاصطناعي للأشخاص ذوي الإعاقة)
> **Organizer:** King Salman Center for Disability Research (مركز الملك سلمان لأبحاث الإعاقة)
> **Track:** 2 — Health & Rehabilitation (الصحة والتأهيل - أنظمة تحليل الحركة)
> **Category:** Individuals (أفراد) · **Project #:** 142
> **Synchronized Files:** `KSCDR_Hackathon_142_MOVE.pptx` and `KSCDR-Hackathon-Final-Submission Final-.pptx`
> **Live Prototype URL:** https://moveai.ahammouch.me

---

## Slide 1 — Cover / Title Artwork

---

## Slide 2 — Submission Details (Project & Team Identifiers)

**Text 2:**
AI HACKATHON FOR PEOPLE WITH DISABILITIES  ·  KSCDR  ·  RIYADH 2026

**Text 3:**
Final Submission

**Text 4:**
Presentation Template

**Text 7:**
SUBMISSION DETAILS

**Text 8:**
PROJECT NAME

**Text 9:**
MOVE (حركة) — Gamified & Occlusion-Robust Rehabilitation Coaching

**Text 10:**
TEAM NAME

**Text 11:**
MOVE Team (فريق حركة) · 2 Members

**Text 12:**
TRACK

**Text 13:**
Track 2: Health & Rehabilitation (الصحة والتأهيل - أنظمة تحليل الحركة)

**Text 14:**
CATEGORY

**Text 15:**
Individuals (أفراد)

**Text 16:**
PROJECT NUMBER

**Text 17:**
KSCDR_Hackathon_142

---

## Slide 3 — Section 1: Team & Project Snapshot

**Text 0:**
SECTION 1

**Text 1:**
Team and project snapshot

**Text 3:**
PROJECT AT A GLANCE

**Text 4:**
One-line pitch

**Text 5:**
We aim to help Saudi rehabilitation patients exercise correctly at home using standard smartphones and gamified coaching adapted for traditional clothing.

**Text 6:**
Track

**Text 7:**
Health & Rehabilitation (Motion Analysis Systems) — Designed for smartphone-camera motion tracking, real-time exercise form validation, and telerehabilitation for Saudi patients.

**Text 8:**
Category

**Text 9:**
Individuals (أفراد)

**Text 10:**
Current stage

**Text 11:**
Concept & Working Web Prototype · TRL 4 (Interactive concept prototype deployed at https://moveai.ahammouch.me; pose engine & clinical trials are planned future work)

**Text 13:**
TEAM  —  2 TO 5 MEMBERS

**Text 16:**
Ammar Hammouch

**Text 17:**
Team Lead · AI Systems Architecture & Full-Stack Engineering · Hackathon Lead
Responsible for technical architecture, software engineering, and the web platform prototype.

**Text 20:**
Saleh Alrashidi

**Text 21:**
Co-Lead · Biomedical & Clinical Research · Motion Analysis & Clinical Alignment
Focuses on physiotherapy protocol integration, clinical outcome measures, and literature validation.

---

## Slide 4 — Section 2: The Problem (30% Weight)

**Text 0:**
SECTION 2  ·  IMPACT

**Text 1:**
The problem

**Text 3:**
30% OF SCORE

**Text 5:**
PROBLEM STATEMENT

**Text 6:**
Over 33.6% of older Saudi adults suffer from mobility disability requiring ongoing physical therapy (Alhwoaimel et al., 2024), yet up to 65% of patients abandon home rehabilitation programmes within 3 months due to lack of objective feedback, boredom, and zero adherence tracking (Simmich et al., 2024). In Saudi Arabia, fewer than 47% of healthcare providers currently utilize telerehabilitation tools (Albasheer et al., 2025), and 38% of physiotherapists report they cannot consistently administer standardized functional assessments due to severe clinic time constraints. Crucially, existing international motion-analysis AI systems fail in Saudi homes because traditional loose attire (thobe and abaya) occludes the hip and knee joints, introducing up to 11.36° angular errors (Viswakumar et al., 2022). MOVE is designed to address this fundamental gap.

**Text 19:**
Key Evidence & Sources: Alhwoaimel et al. (Medicina, KSCDR-funded, 2024); Albasheer et al. (KSCDR J. Disabil. Res., 2025); Viswakumar et al. (IEEE Access, 2022); Jleli et al. (KSCDR J. Disabil. Res., 2024); Simmich et al. (2024).

---

## Slide 5 — Section 3: Who We Serve (Primary Persona & Needs)

**Text 0:**
SECTION 3  ·  IMPACT

**Text 1:**
Who we serve

**Text 5:**
PRIMARY USER

**Text 7:**
Disability & context

**Text 8:**
Older Saudi adults with mobility limitations, post-stroke motor deficits, and post-MVA rehabilitation patients. Exercising at home, wearing daily traditional attire (thobe/abaya), assisted by family caregivers.

**Text 9:**
A day today

**Text 10:**
Relying on static paper exercise sheets without feedback or missing clinic appointments due to transportation and caregiver burden. Incorrect unsupervised form causes pain, compensatory injury, and abandonment.

**Text 11:**
What success feels like

**Text 12:**
"What success will feel like: 'I can complete my daily physiotherapy in 5 minutes as an enjoyable game right in my living room, while my doctor and children track my progress without hospital trips.'"

**Text 14:**
Needs

**Text 15:**
1. Zero dedicated hardware or sensors (standard smartphone camera only)
2. Accurate joint tracking under normal traditional attire (thobe/abaya)
3. Spoken Arabic encouragement and clear gamified motivation
4. Automatic visibility for family caregivers and physiotherapists

**Text 17:**
Barriers

**Text 18:**
• Physical travel barriers & caregiver dependency for hospital visits
• Loose clothing occluding joint visibility for standard AI models
• Complex English-only fitness applications
• Cultural privacy concerns regarding home video recording

**Text 20:**
Alternatives

**Text 21:**
• In-person clinic visits: High financial/time cost, 38% therapist time bottleneck
• Wearable sensors (IMU/EMG): Cumbersome, costly, high abandonment
• Generic AI apps (MoveAI/FormAI): Assume gym wear/exposed limbs, English-only, zero occlusion handling

---

## Slide 6 — Section 4: Our Solution (25% Weight)

**Text 0:**
SECTION 4  ·  INNOVATION

**Text 1:**
Our solution

**Text 3:**
25% OF SCORE

**Text 5:**
WHAT IT IS AND WHAT IT DOES

**Text 6:**
MOVE is a proposed markerless smartphone telerehabilitation app designed to turn physical therapy into culturally-themed mini-games while accurately tracking joints beneath traditional Saudi attire (thobe/abaya). Our platform is designed so patients will exercise naturally at home with spoken Arabic coaching, while therapists will receive objective adherence telemetry and caregivers will receive peace-of-mind alerts.

**Text 9:**
Occlusion-Robust Pose Estimation (Core Innovation)

**Text 10:**
Adapting Google MediaPipe BlazePose with confidence-weighted relative landmark geometry, designed to eliminate false joint estimation under loose thobes and abayas (Addresses Needs 1 & 2).

**Text 13:**
KSAA-Themed Gamified Rehab (Planned)

**Text 14:**
We will map exercise regimens to mini-games structured after King Salman Global Academy for Arabic Language tiers (Gentle, Standard, Challenge) to eliminate patient boredom (Addresses Need 3).

**Text 17:**
Connected Care Network (Planned)

**Text 18:**
We will provide automatic adherence tracking and privacy-preserving status alerts to caregivers and therapists, flagging sustained regressions without sharing raw video (Addresses Need 4).

---

## Slide 7 — Section 5: How It Works (Technical Edge Pipeline)

**Text 0:**
SECTION 5  ·  INNOVATION

**Text 1:**
How it works

**Text 4:**
STEP 1

**Text 5:**
INPUT

**Text 6:**
Smartphone RGB Camera: Designed to capture movement using a propped phone in natural home lighting with the patient in daily thobe or abaya (~30 fps).

**Text 10:**
STEP 2

**Text 11:**
AI CORE

**Text 12:**
On-device MediaPipe BlazePose (33 keypoints): Evaluated with loose-garment occlusion confidence re-weighting and relative landmark distance kinematics.

**Text 16:**
STEP 3

**Text 17:**
PROCESSING

**Text 18:**
100% On-Device State Machine: Planned deterministic edge processing (ROM, rep count, tempo; <30ms latency; zero raw video leaves phone; Arabic voice synthesis).

**Text 22:**
STEP 4

**Text 23:**
OUTPUT

**Text 24:**
Real-Time Guidance: Will deliver Arabic spoken coaching ("ارفع ركبتك للأعلى"), dynamic game feedback, and encrypted numeric-only session summaries.

**Text 28:**
STEP 5

**Text 29:**
USER

**Text 30:**
User Empowerment: Patient stays in control; family caregiver will receive simple status summaries; physiotherapist will review clinical dashboard and unlock tiers.

**Text 40:**
Architecture Principle: Privacy-by-design edge pipeline — raw video never leaves the device; only derived numeric metrics are transmitted.

---

## Slide 8 — Section 6: What Makes It Different (Comparison Table & Claims)

**Text 0:**
SECTION 6  ·  INNOVATION

**Text 1:**
What makes it different

**Competitive Comparison Table:**

| Comparison point | MOVE (Our Proposed Solution) | Generic Fitness/Rehab AI | Clinical Motion Systems |
| --- | --- | --- | --- |
| Approach | Phone camera + occlusion re-weighting + gamification | Webcam/phone assuming exposed athletic wear | Multi-camera optical markers or wearable IMU/EMG |
| Accessibility | Zero hardware; propped smartphone anywhere at home | Requires laptop/webcam, rigid framing, bare limbs | Mandatory clinic visits, complex sensor attachment |
| Arabic & local context | Native Arabic voice, KSAA game taxonomy, thobe/abaya robust | English only, gym workout models, Western clothes | English clinical software, sterile lab environment |
| Cost to the user | Free / subsidized through planned MoH partnerships | $15–30/month consumer subscription | >50,000 SAR clinic system or costly sensor sets |
| Availability in KSA | Engineered for KSA Vision 2030 & Seha Virtual Hospital | Generic international web apps; unadapted | Limited to major tertiary hospitals in main cities |

**Text 3:**
OUR THREE CLAIMS

**Text 6:**
The first motion analysis system specifically designed to track rehabilitation kinematics through traditional Saudi attire (thobe/abaya) without external hardware.

**Text 9:**
A privacy-first edge architecture designed to combine on-device pose estimation with deterministic rule-based scoring, transmitting only numeric metrics to clinicians.

**Text 12:**
Culturally-adapted gamification inspired by the King Salman Global Academy for Arabic Language taxonomy, targeting the 65% patient abandonment crisis.

---

## Slide 9 — Section 7: Prototype & Demo (10% Weight)

**Text 0:**
SECTION 7  ·  PROTOTYPE

**Text 1:**
Prototype and demo

**Text 3:**
10% OF SCORE

**Text 27:**
DEMO VIDEO

**Text 28:**
https://moveai.ahammouch.me

**Text 29:**
CODE REPOSITORY

**Text 30:**
https://github.com/AHammouch/Move-Hackathon-Project

**Text 31:**
LIVE BUILD / APK

**Text 32:**
https://moveai.ahammouch.me (Live Web App / PWA)

**Text 33:**
MATURITY

**Text 34:**
TRL 4 (Concept & Working Web Prototype)

**Text 35:**
Live interactive web prototype deployed and accessible via mobile/desktop. Pose pipeline and clinical trials will be executed in post-hackathon phases.

---

## Slide 10 — Section 8: Feasibility & Results (20% Weight)

**Text 0:**
SECTION 8  ·  FEASIBILITY

**Text 1:**
RESULTS

**Text 3:**
20% OF SCORE

**Rounded Rectangle 36:**
1. Technical Feasibility & Edge Performance (Target)
Target: 30+ FPS · <30ms Latency · 0% Video Exfiltration
• Google MediaPipe BlazePose is proven to run at 30+ FPS on mobile hardware.
• A deterministic rule-based state machine will require <5% CPU overhead, ensuring zero inference lag, full offline capability, and high battery efficiency.
• Compact numeric transport (~2 KB per session) will replace bandwidth-heavy video streams.

**Rounded Rectangle 37:**
2. Garment Occlusion Validation (Literature Evidence)
Literature Benchmark: ~11.4° Baseline Error (Viswakumar et al.)
• Academic literature proves loose robes cause ~11.36° angular errors on baseline pose models (Viswakumar et al., Ray et al.).
• MOVE is designed to mitigate this using relative-distance landmark geometry and confidence-gating.
• Planned Safe Fallback: The system will pause scoring gracefully on low visibility instead of guessing false postures.

**Rounded Rectangle 38:**
3. Adherence & Gamification Evidence (Clinical Precedent)
+8–9 Point Attendance Gain in Telerehab Trials (Simmich et al.)
• Published telerehab clinical trials demonstrate significant adherence gains (+8–9 pts) with interactive feedback (Simmich et al., 2024).
• thera_pixel proved gamified mini-game mechanics for rehabilitation (Hacklytics 2025).
• In future development, MOVE will expand this proof into a full per-exercise library.

**Rounded Rectangle 39:**
4. Honest Status & Planned Clinical Trial Roadmap
Current Status: Idea / Design / Web Prototype (No Patient Trials Yet)
• Honest Status: MOVE is at the concept and prototype stage; no clinical patient trials have been conducted yet.
• Planned Milestone 1: Benchmarking occlusion accuracy on healthy volunteers in thobe/abaya.
• Planned Milestone 2: We will conduct a clinical validation study (n=20 patients) with partnering physiotherapy clinics to compare automated scores against manual goniometry.

---

## Slide 11 — Section 9: Expected Impact (30% Weight)

**Text 0:**
SECTION 9  ·  IMPACT

**Text 1:**
Expected impact

**Text 3:**
30% OF SCORE

**Text 6:**
OUTPUT

**Text 7:**
What we deliver

**Text 8:**
Planned Year 1 Pilot Roadmap (Post-Hackathon Targets):
• We will seek to partner with 2–3 accredited Saudi rehabilitation centers (e.g., KFMC / SBAHC).
• We plan to enroll an initial validation cohort of 50–100 patients for home adherence tracking.
• We aim to deliver 2,500+ supervised home therapy sessions with objective adherence logging.

**Text 12:**
OUTCOME

**Text 13:**
What changes for the user

**Text 14:**
Target Clinical Outcomes (Projected):
• We aim to increase 3-month exercise completion from 35% baseline up to 75% in enrolled cohorts.
• We target a 15–20% average improvement in functional range of motion through guided regular practice.
• We will seek to eliminate up to 12 unnecessary hospital transit trips per patient annually.

**Text 18:**
IMPACT

**Text 19:**
What changes at scale

**Text 20:**
Long-Term Vision 2030 Impact:
• Directly aligns with the Health Sector Transformation and Quality of Life programs.
• Will help reduce public healthcare expenditure per rehabilitation episode.
• Will empower rural and homebound PWD across Saudi Arabia with continuous dignified care.

**Text 22:**
HOW WE WILL MEASURE IT

**Text 23:**
Indicator

**Text 24:**
Primary Metric: 3-Month Rehabilitation Completion & Adherence Rate (percentage of prescribed sessions completed).

**Text 25:**
Baseline → target

**Text 26:**
Baseline: 35% completion (typical home drop-off)
Projected Target: We aim to reach 75% completion in pilot cohorts.

**Text 27:**
Method

**Text 28:**
Future Measurement: We will collect automated on-device session telemetry and compare against therapist clinical logs.

---

## Slide 12 — Section 10: Sustainability & Scalability (10% Weight)

**Text 0:**
SECTION 10

**Text 1:**
Sustainability and scalability

**Text 3:**
10% OF SCORE

**Text 5:**
HOW IT SUSTAINS ITSELF

**Text 6:**
Who pays

**Text 7:**
Proposed Funding Model: We plan to adopt a B2B / B2G model partnering with rehabilitation centers, hospital networks, and Ministry of Health / Seha Virtual Hospital; free for patients.

**Text 8:**
Revenue or funding model

**Text 9:**
Target Revenue Model: We will explore tiered clinic subscriptions (projected SAR 250/therapist/month) alongside research grants from KSCDR and KACST Innovation Valley.

**Text 10:**
Cost per unit / per user

**Text 11:**
Projected Cost Structure: SAR 0 incremental hardware cost (BYOD smartphone); estimated software telemetry and server hosting ~SAR 4/user/month at volume.

**Text 12:**
Path to break-even

**Text 13:**
Financial Target: We project operational break-even upon onboarding 20–25 partnering clinics (approx. 1,500 active patients) within 18–24 months.

**Text 16:**
PATH TO SCALE

**Text 20:**
PHASE 1

**Text 21:**
Phase 1 (Months 1–6): We will run an initial pilot with 2 rehabilitation centers in Riyadh (50–100 patients) to validate the Saudi garment dataset.

**Text 25:**
PHASE 2

**Text 26:**
Phase 2 (Months 7–18): We will expand regionally to 15–20 clinics across Saudi Arabia and explore integration with Seha Virtual Hospital APIs.

**Text 30:**
PHASE 3

**Text 31:**
Phase 3 (Months 19–36): We will scale Kingdom-wide via MoH primary healthcare centers and explore expansion into neighboring GCC countries.

---

## Slide 13 — Section 11: Safety, Reliability & Accessibility (5% Weight)

**Text 0:**
SECTION 11

**Text 1:**
Safety, reliability and accessibility

**Text 3:**
5% OF SCORE

**Text 6:**
Safety

**Text 17:**
Reliability

**Text 28:**
Accessibility & ethics

**TextBox_S13_Safety:**
• Planned Safe Fallback:
When garment occlusion causes landmark confidence to drop below threshold, the system will pause scoring rather than hallucinating wrong postures or false corrections.

• Human-in-the-Loop Authority:
Physiotherapists will retain 100% control over exercise prescriptions and difficulty tier unlocking; MOVE will never auto-diagnose.

• Fall-Risk Safeguards:
We will limit exercise velocity and prompt patients to stabilize near sturdy household furniture during balance exercises.

**TextBox_S13_Rel:**
• Deterministic Rule State Machine:
Rep counting and ROM will use verifiable geometric rules and phase thresholds, not unexplainable black-box neural classifiers.

• Cross-Device Adaptability:
We will support iOS and Android (720p/1080p, 30fps) with dynamic resolution scaling across low-to-high-end phone hardware.

• 100% Offline Resilience:
Core pose tracking, gamification, and audio coaching will operate entirely on-device without requiring continuous internet.

**TextBox_S13_Acc:**
• 100% Privacy by Design (PDPL):
Raw camera frames will never leave the smartphone; only derived numeric metrics will be stored, ensuring full cultural privacy in Saudi homes.

• Arabic-First Accessible UI:
Spoken Arabic audio feedback, high-contrast visual indicators, and large touch targets designed for older adults and low digital literacy.

• Person-First Inclusive Ethos:
Engineered specifically to empower people with motor disabilities and their care networks.

---

## Slide 14 — What We Need Next & Thank You (Closing Asks & Contact)

**Text 2:**
What we need next

**Text 18:**
Thank you!

**Text 19:**
"MOVE makes rehabilitation accessible, enjoyable, and culturally respectful for every Saudi home — because healing should fit into your life, not make you change your clothes."

**Text 21:**
CONTACT

**Text 22:**
Team lead

**Text 23:**
Ammar Hammouch

**Text 24:**
Email

**Text 25:**
ahlan@ahammouch.me

**Text 26:**
Phone

**Text 27:**
+966 55 498 4459

**Text 28:**
AI Hackathon for People with Disabilities 2026  ·  King Salman Center for Disability Research  ·  hackathon.kscdr.org

**TextBox_S14_Ask_0:**
Clinical Pilot Partnership
We are seeking collaboration with KSCDR-affiliated hospitals (KFMC, SBAHC) to validate MOVE with an initial cohort of patients.

**TextBox_S14_Ask_1:**
Saudi Attire Benchmark Dataset
We are seeking institutional support to establish the first open, culturally-stratified motion dataset (thobe/abaya) for Saudi health AI.

**TextBox_S14_Ask_2:**
Regulatory Mentorship
We are seeking guidance from the Saudi Food and Drug Authority (SFDA) to establish our Software as a Medical Device (SaMD) roadmap.

**TextBox_S14_Web:**
Live Prototype: https://moveai.ahammouch.me
Project Number: KSCDR_Hackathon_142  ·  Track 2

---
