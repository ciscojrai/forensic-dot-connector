# Forensic Dot Connector (`com.pellerano.forensicdot`)

**UGREEN Hackathon 2026 on AI NAS Entry**  
*Track: Bring Memories to Life*  
*Entrant: Francisco Pellerano*  
*Project: "A dream come true, a legacy lives on."*  
*Executive Formula: Forensic Dot Connector = Recover, Mine, Archive, Answer.*

---

## System Vision: The Three Pillars

Forensic Dot Connector is an **End-to-End Recovery, Forensic Mining, and Archive Preservation System** engineered specifically for the UGREEN AI NAS (UGOS / UGOS Pro) ecosystem. It transforms fragmented, corrupted, century-spanning photo collections into verifiable genealogical provenance.

### Pillar 1: Pre-Ingestion Media Recovery & File Triage
* **Magic Byte Validation**: Validates raw byte headers (JPEG `FF D8 FF`, TIFF `49 49 2A 00` / `4D 4D 00 2A`, PNG, HEIC) to triage corrupted scans and prevent model inference exceptions.
* **Storage Deduplication**: Groups duplicate scans and redundant backup dumps via `ug-filemgr scan-dedupe`.
* **Hardware Inode Synchronization**: Once chronological anchors are verified, `ug-filesystem chtimes` syncs file modified/created timestamps so native UGOS file browsers reflect authentic historical capture dates across decades.

### Pillar 2: Deep Forensic Mining (Dating as a Sub-Attribute)
* **Chronological dating is merely one mined attribute** alongside rich biographical and physical markers.
* **Biographical Markers**: Mined tattoos (persistent lower bounds $T_{min}$), piercings, orthopedic casts and crutches (healing micro-windows of 4–10 weeks), and facial hair eras (Dad's mustache 1976–1984).
* **Family Milestones & Life Objects**: Automatically detects and sequences children's bicycles, tricycles, pet adoptions, and graduation regalia to settle family milestone questions.
* **Physical Print Forensics**: Mined scalloped/deckled edges (1938–1956), photo lab margin developer stamps, Polaroid chemical pods, and orange 35mm date backs.
* **Manufactured Lifecycles**: Technology and automotive silhouettes cross-referenced against historical release indices (1900s through present).

### Pillar 3: Archive Preservation & Conversational Memory Oracle
* **Incremental Cache Architecture**: Indexes 10,000+ photo libraries into persistent `@appdata/chronology.db`, while `@appcache` manages $O(1)$ delta hashes. Ingests subsequent weekly batches (+1k to +4k photos) without costly re-computation.
* **Conversational Memory Oracle**: Resolves emotional family inquiries with side-by-side photographic evidence:
  * *"Who got a bike first, Sam or Pat?"*
  * *"What year did Mom get our first cat?"*
  * *"Show me my family tree timeline."*
* **Sovereign Privacy**: 100% on-device inference via local UGOS agents (`ug-photo`, `ug-knowledge`, `ug-filesystem`, `ug-filemgr`). Zero cloud transmission.

---

## Dual-Engine Architecture

1. **Native UGOS Application (`com.pellerano.forensicdot`)**:
   - Packaged with official `ugcli` CLI tool.
   - Configured via `project.yaml` (`spec_version: 2.1`) supporting `nasync` and `homeagent` product series.
   - Frontend in `rootfs_common/www/` built with React 18, Vite, TypeScript, and `@ugreen-nas/builder-open` (`UgosViteBuilder`).
   - Multi-architecture daemons in `rootfs_amd64/bin/` and `rootfs_arm64/bin/`.
   - Packages to official **`.upk`** bundles:
     - `build_dir/pkgs/upk/com.pellerano.forensicdot_nasync_1.0.0.0001.upk`
     - `build_dir/pkgs/upk/com.pellerano.forensicdot_homeagent_1.0.0.0001.upk`

2. **Conversational Uliya AI Skill (`skill/forensic-dot-connector/`)**:
   - Fully compliant with the official Uliya Skill Standard (passes `check-skill.mjs` with 0 errors and 0 warnings).
   - Orchestrates on-device `photo-agent` (`ug-photo`) and `knowledge-agent` (`ug-knowledge`).
   - Packaged as `forensic-dot-connector.zip` for Round 1 Devpost submission.

---

## Build & Validation Commands

```bash
# Validate Uliya Skill Standard
node "UGREEN DOCS - IDEAS/uliya-skill-kit/scripts/check-skill.mjs" skill/forensic-dot-connector

# Build Frontend Web Assets
cd rootfs_common/www && npm install && npm run build && cd ../..

# Validate Project Configuration with ugcli
ugcli check

# Build Official UPK Packages for all Product Series
ugcli pack --arch all --build 1 --product-series all
```
