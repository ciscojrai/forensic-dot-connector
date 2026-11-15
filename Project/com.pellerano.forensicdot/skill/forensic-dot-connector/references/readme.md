# Forensic Dot Connector

Forensic Dot Connector is an End-to-End Recovery, Forensic Mining, and Archive Preservation System for UGREEN AI NAS. It resurrects degraded family media, mines biographical markers and generational clues across 10,000+ photo collections, and establishes verifiable, privacy-first genealogical lineages across generations.

## The Three Pillars

1. **End-to-End Recovery & Triage**:
   * Validates file containers via magic byte signatures (JPEG, TIFF, PNG, HEIC) to prevent corrupted stream exceptions.
   * Repairs missing capture timestamps on disk via `ug-filesystem chtimes` once verified historical anchors are discovered.
   * Deduplicates multi-generational dumps via `ug-filemgr scan-dedupe`.

2. **Deep Forensic Mining**:
   * Scans physical print indicators (deckled edges, margin developer stamps, Kodachrome shifts, 35mm date backs).
   * Mines biographical body markers (tattoos, piercings, orthopedic casts, crutches, facial hair eras) and tracks developmental stages.
   * Sequences family milestone objects (first bicycles, tricycles, musical instruments, pet adoptions).
   * Correlates manufactured electronics, furniture styles, and automotive silhouettes against century-spanning historical release lifecycles.
   * Formulates structured Possibility & Exclusion matrices, treating chronological dating as merely one mined attribute.

3. **Archive Preservation & Genealogical Knowledge**:
   * Indexes 10,000+ photo archives into persistent `@appdata/chronology.db` with an incremental cache queue.
   * Ingests weekly expansions (+1k to +4k photos) via cheap mtime+size stat filtering, skipping unchanged baseline media without re-reading or re-computing existing archives.
   * Powers conversational memory intelligence ("Who got a bike first, Sam or Pat?", "What year did Mom get our first cat?").
   * Generates dynamic family tree graphs with verified photographic evidence.

## Getting Started on UGOS

1. Mount your archive storage volume on your UGREEN AI NAS.
2. Launch the companion desktop application (`com.pellerano.forensicdot`) or converse with the AI Assistant:
   *"Perform forensic mining on my legacy album and reconstruct our family timeline."*
3. Review the identified clues, confirm the save location, and explore the interactive possibility/exclusion matrix and family tree.

## Data Privacy & Sovereign Execution

All computer vision inference and knowledge management execute entirely on your local UGREEN AI NAS hardware (`ug-photo` and `ug-knowledge`). No personal photos or extracted forensic attributes are sent to external cloud platforms.
