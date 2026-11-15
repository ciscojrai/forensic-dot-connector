---
name: forensic-dot-connector
description: End-to-end recovery, forensic mining, and archive preservation skill that triages degraded files, mines biographical markers, body alterations, milestone objects, and technology lifecycles across 10,000+ photos on a UGREEN AI NAS, cross-referencing dating taxonomies to reconstruct life timelines and generate structured possibility and exclusion tables, when the user asks to recover media, mine photo archives, or reconstruct family history on their NAS.
---

# Goal

Operate as an end-to-end recovery, forensic mining, and chronological dating system across multi-generational photo archives stored on the user's UGREEN AI NAS—scaling from single degraded scans to 10,000+ photo libraries spanning from grandparents' heirloom physical prints (tintypes, deckled edges, 35mm slides) to modern smartphone dumps. The Skill triages corrupted media headers, executes deep forensic mining and chronological dating across heirloom anchors (such as Grandfather's 1958 Omega watch propagating dates across uncaptioned photos), visual artifacts (clothing eras, jewelry, vintage and modern electronics, decor, automotive silhouettes), tracks biographical body markers (tattoos, piercings, orthopedic casts, crutches, grooming eras), sequences family milestones (sibling disputes, pet adoptions), and analyzes print mediums (scalloped margins, film stamps, date backs). It generates structured possibility and exclusion reports with tight chronological date bounds (Tmin–Tmax), synchronizes filesystem timestamps, updates an incremental archive cache, powers conversational memory queries (e.g., "who got a bike first, Sam or Pat?", "what year did Mom get our first cat?", "show my family tree"), and permanently preserves sovereign genealogical knowledge on the NAS.

Scope: Operates exclusively on user-authorized images, albums, and directory trees stored locally on the NAS. All visual inference, file triage, and metadata processing remain strictly on-device; zero personal data or imagery is transmitted externally.

## When to use

Use this Skill when the user asks to triage and repair corrupted photo archives, perform forensic mining across inherited photo collections, date vintage or undated pictures, resolve family milestone disputes with visual evidence (e.g., who received a gift or bicycle first), track personal bodily alterations (tattoos, casts, grooming phases), identify domestic pets across time, reconstruct a family tree, or ask forensic questions about photo details. Example requests: "Perform forensic mining on my legacy album", "Recover and triage my scanned photos folder", "When was this photo taken?", "Who got a bike first, Sam or Pat?", "What year did Mom get our first cat?", "Show me my family tree timeline", "Scan my 10k photo archive and index new batches incrementally".

Read [the recovery and triage guide](references/recovery-and-triage-guide.md) for header repair, magic byte validation, timestamp sync, and incremental cache management. Read [the visual clues taxonomy](references/visual-clues-taxonomy.md) for categorized visual, print, and bodily markers. Read [the object dating schema](references/object-dating-schema.md) for technology, fashion, and medium lifecycles across the 1900s through the present. Read [the possibility and exclusion matrix](references/possibility-exclusion-matrix.md) for output table schemas. Read [the readme](references/readme.md) for user-facing instructions and [disclosures](references/disclosures.md) for Hackathon authorship and licensing.

# Required input

- The target photo file, album directory, or library collection path, supplied via exact NAS path, uploaded image file, or search description (such as event, family members, or estimated era).
- An optional destination folder on the NAS for saving the generated forensic dossier, synchronized metadata, and timeline report. If omitted, the user is prompted before persistence.
- Optional specific user inquiries regarding date, location context, family milestone comparisons, bodily markers, or object identification.

Do not solicit unnecessary credentials, passwords, or unrelated personal identification.

# Generation-time capability evidence

- `ug-photo` → `photo-agent`
- `ug-knowledge` → `knowledge-agent`

# Orchestration

Work proceeds sequentially. Each step passes verified facts to subsequent steps. The parent Skill coordinates exclusively through expert delegation; registered experts execute on-device operations.

Step 1 — Locate, triage, and confirm target photos or archive folder. If the user provided an explicit path or uploaded an image, confirm that path. If the user pointed to a library collection or provided an archive description, delegate candidate search and integrity triage:

delegate --target photo-agent --instruction 'Find the photo or album candidate matching the user description within authorized NAS storage. Verify header readability and report confirmed file paths or report that no matching photos were found.'

If no photo is located, notify the user and halt. Do not substitute unrelated images.

Step 2 — Extract shoot and file metadata. Delegate EXIF, camera hardware, and directory inspection for the confirmed photo path:

delegate --target photo-agent --instruction 'Read EXIF and capture metadata for the confirmed photo path, including capture timestamp, camera model, lens metadata, and dimensions. Return all recorded fields, and explicitly report unrecorded fields as not recorded. Do not extrapolate missing values.'

Step 3 — Granular forensic visual and medium mining. Delegate deep visual examination for the confirmed photo path:

delegate --target photo-agent --instruction 'Perform forensic visual question answering on the confirmed photo path. Describe only what is visible in the photo. Scan for: 1) Photographic medium clues (scalloped/deckled margins, lab border stamps, Polaroid chemical borders, orange LED digital date stamps); 2) Electronics and technology models (CRT vs flat screen TVs, vacuum tube radios, phone models, computer generations); 3) Bodily markers and temporary physical states (tattoos, piercings, casts, crutches, facial hair eras); 4) Personal attire and accessories (fashion era, jewelry, wedding bands, watch types, footwear brand/style); 5) Domestic pets and milestone objects (bicycles, tricycles, family pets); 6) Environment, decor, and vehicles (furniture styles, lighting fixtures, automotive tailfins, wall paneling); 7) Visible text and signage via OCR. For each category, describe only confirmed visible details. If an element is absent or obscured, report it as not visible. Never fabricate unverified facts or guess ungrounded identities.'

Step 4 — Chronological cross-referencing and matrix synthesis. Delegate forensic evaluation and report generation using the real metadata result from step 2 and the real visual analysis result delivered by the photo expert in step 3:

delegate --target knowledge-agent --instruction 'Using the verified shoot metadata result and the visual analysis result delivered by the photo expert in this same run, cross-reference observed objects against the object dating schema, recovery guide, and visual clues taxonomy. Generate a structured forensic report containing: 1) Observed visual clues; 2) Estimated chronological date ranges (possibilities); 3) Definitively excluded eras (exclusions); 4) Plain-language historical context synthesis. Format the report following the possibility and exclusion matrix specification.'

Step 5 — Save forensic dossier to NAS and synchronize archival state. Delegate record writing and saving to the knowledge expert, using the real results from step 4:

delegate --target knowledge-agent --instruction 'Save the generated forensic report as one Markdown record in the folder the user named on the NAS. If the user named no folder, prompt the user for a save folder and wait for the answer. Confirm the save with the verified saved path. Await explicit platform and user approval before saving records or requesting timestamp synchronization.'

Step 6 — Contextual and longitudinal question answering. The user may ask follow-up questions, including sibling milestone precedence inquiries, pet adoption dates, bodily marker history, or family tree visualizations. Individual names originate from user context or verified metadata; children's developmental ages are estimated ranges. For visual questions about the confirmed photo itself:

delegate --target photo-agent --instruction 'Answer the user question regarding the confirmed photo path using visual question answering on that same photo. Answer only from what is visible in the photo. If the answer is not visible, state that it cannot be seen in the photo. Never guess.'

For questions regarding historical context, milestone comparisons, or saved dossiers:

delegate --target knowledge-agent --instruction 'Answer the user question using only the saved forensic dossier at the verified saved path. Read that record and answer from its contents. If the record does not cover the question, state so clearly.'

# Completion and failure

- completed: A step is completed only when its delegation yields the necessary factual output: verified photo path after step 1, verified metadata after step 2, full visual clue inventory after step 3, validated possibility/exclusion matrix after step 4, verified file write after step 5, and grounded contextual response after step 6. Missing evidence halts dependent tasks immediately.
- failed: Cease dependent operations. Report the failed step, responsible agent, and verified intermediate results. Do not attempt unapproved automatic retries for file write failures.
- cancelled: Stop all workflow execution. Report finished and pending phases. Avoid repeated actions that risk duplicating filesystem artifacts.
- waiting_user: When an expert needs an answer from the user, such as which photo to analyze or where to save the record, wait for the answer and resume the same delegation.
- waiting_approval: When writing files, synchronizing inode timestamps, or updating metadata, await explicit platform approval. A conversational confirmation does not substitute for system platform authorization.
- Empty results: When an element, clue, or metadata field is absent, record it explicitly as not visible or not recorded. Never synthesize hallucinated dates, brands, or eras.
- Partial completion: When partial steps execute successfully, report completed, pending, and blocked milestones distinctly.
