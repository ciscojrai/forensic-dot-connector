# Pre-Ingestion Media Recovery & Archive Triage Guide

This guide establishes the technical protocols for Phase 0: Pre-Ingestion Recovery & Archive Triage within Forensic Dot Connector. Inherited photo collections often suffer from bit rot, corrupt file containers, extension spoofing, duplicate imports, and stripped capture timestamps.

## 1. Magic Byte Validation & Container Triage

Legacy files migrating from unorganized hard drives or optical media frequently have corrupt or mismatched extensions. The triage layer validates file headers against known magic signatures before passing streams to on-device vision models:

* **JPEG / JFIF / Exif**: `FF D8 FF E0` / `FF D8 FF E1` (terminates with `FF D9`). Trailing truncated streams are padded or re-indexed.
* **TIFF (Little Endian / Big Endian)**: `49 49 2A 00` (II) or `4D 4D 00 2A` (MM). Scanned high-resolution negatives and flatbed archival TIFFs.
* **PNG**: `89 50 4E 47 0D 0A 1A 0A`. Common in digital screenshots or photo restoration exports.
* **HEIC / HEIF**: `00 00 00 ... 66 74 79 70 68 65 69 63` (`ftypheic` container). Modern smartphone imports.

Files failing magic byte checks are routed to the repair pipeline to salvage readable raster blocks rather than causing inference exceptions.

## 2. Hardware Timestamp Synchronization (`ug-filesystem chtimes`)

Scanned photos and transferred files often carry file system modified/created dates reflecting the day they were scanned or copied (e.g., November 2024) rather than their authentic capture date.
* Once the mining engine establishes a verified chronological anchor ($T_{anchor}$) or EXIF original date, the system presents an explicit platform approval gate before mutating filesystem metadata.
* Upon explicit user confirmation, `ug-filesystem chtimes` syncs filesystem inode access and modification timestamps to match historical reality.
* This ensures native UGOS file browsers, timeline views, and OS file managers sort archival media chronologically across decades.

## 3. Storage Deduplication (`ug-filemgr scan-dedupe`)

Multi-generational archives frequently contain duplicate scans, multiple resolutions, and redundant backup copies:
* `ug-filemgr scan-dedupe` generates perceptual and cryptographic SHA-256 hashes to group exact duplicates.
* Merges metadata across duplicates, preserving the highest-resolution master scan and pruning redundant disk consumption in `@appcache`.

## 4. Incremental Batch Ingestion Architecture

Large libraries (10,000+ photos) cannot be re-scanned from scratch every time new photos are added:
* **Initial Archive Run**: Full 10k library indexed into `@appdata/chronology.db` with feature vectors and metadata caches.
* **Subsequent Ingestion Runs (+1k to +4k photos)**:
  * `ug-filesystem find` detects newly created inodes using `$LastRunTimestamp`.
  * Two-tier filter: Compares `mtime` and file size via `ug-filesystem stat`; skips untouched files immediately without reading disk blocks or re-hashing, computing SHA-256 hashes only for modified or novel files.
  * Passes only novel delta files (~9% of total library in a 1,000-item batch) to `ug-photo (vision-vlm)` for forensic mining.
  * Cross-references newly mined individuals, tattoos, and milestones against the existing genealogical knowledge graph.
