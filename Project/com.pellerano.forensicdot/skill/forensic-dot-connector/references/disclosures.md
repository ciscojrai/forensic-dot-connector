# Disclosures

## Authorship and Hackathon Development

Forensic Dot Connector was originally conceived and designed by Francisco Pellerano as a deep image forensic mining and chronological reconstruction architecture. The full Skill workflow, structured taxonomy, forensic mining reference schemas, and UGOS integration packages were developed specifically for the UGREEN Hackathon 2026 on AI NAS.

## Third-Party Components and Open Source Libraries

The Uliya Skill package contains strictly Markdown documents authored for this Hackathon. At runtime, the Skill delegates exclusively to registered UGOS NAS agents:
- `ug-photo` → `photo-agent` (for image search, EXIF reading, VLM, and OCR)
- `ug-knowledge` → `knowledge-agent` (for knowledge processing, schema synthesis, and NAS text persistence)

The companion UGOS desktop visualization application (`com.pellerano.forensicdot`) incorporates:
- React 18 (MIT License)
- Vite (MIT License)
- `@ugreen-nas/builder-open` (UGREEN Developer Platform API)

## AI Assistance Disclosure

AI tools were utilized as developer co-pilots for schema formatting, technical documentation synthesis, and code validation against the official UGREEN Developer SDK standards. All core architectural concepts, domain taxonomy structures, and dating heuristics originated from Francisco Pellerano.
