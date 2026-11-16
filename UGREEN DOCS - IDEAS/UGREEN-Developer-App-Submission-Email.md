# UGREEN NAS Developer Platform: App Listing Application

**Recipient:** `developers_bd@ugreen.com`  
**Subject:** `UGREEN NAS Developer Application Forensic Dot Connector_Francisco Pellerano`

---

### Email Body

**Dear UGREEN NAS Developer & Business Development Team,**

I am submitting a formal developer listing application to publish our native UGOS application, **Forensic Dot Connector**, to the UGREEN App Center for the UGREEN AI NAS (`nasync` and `homeagent` product lines).

Below are the package specifications and developer details as per the UGREEN NAS Developer Platform guidelines:

---

#### 1. Application Details
* **App Name:** Forensic Dot Connector
* **Package Name:** `com.pellerano.forensicdot`
* **Developer Type:** Enterprise
* **Entity Name:** All Forward LLC
* **Target Product Series:** `nasync` (NASync Series) & `homeagent` (HomeAgent Series)
* **Specification Version:** UGOS Package Spec Version 2.1
* **Architecture Support:** `amd64` (x86_64) & `arm64` (aarch64)
* **Default Port:** 28080
* **Open Type:** `inner` (Native desktop window: 1280x800)

---

#### 2. Main Functions
* **Function 1: Pre-Ingestion Media Recovery & File Triage**  
  Direct disk validation of magic byte signatures (JPEG `FF D8 FF`, TIFF `49 49` / `4D 4D`, PNG, HEIC) to quarantine corrupted scans and zero-byte transfers before model inference, with integrated deduplication via `ug-filemgr scan-dedupe`.
* **Function 2: Deep Forensic Mining & Heirloom Anchoring**  
  Multi-modal object dating using known family anchors (e.g. heirloom watches establishing $T_{photo} \ge T_{acquisition}$), physical print chemistry (deckled edges 1938–1956, lab margin stamps, Polaroid chemical pods, quartz date backs), and manufactured lifecycles.
* **Function 3: Two-Tier Incremental Ingestion Cache Pipeline**  
  Tier 1 low-overhead inode `mtime + size` stat filter bypassing ~90% of untouched baseline files without disk byte reads, paired with Tier 2 SHA-256 delta hashing and persistent chronology SQLite storage in `@appdata/com.pellerano.forensicdot`.
* **Function 4: Sovereign Conversational Family Heritage Oracle**  
  Natural-language conversational memory engine running 100% on-device via local UGOS agents (`ug-photo`, `ug-knowledge`), resolving genealogical milestone inquiries with side-by-side photographic evidence.
* **Function 5: Hardware Inode Synchronization with Human Gate**  
  Synchronizes verified chronological dates directly to filesystem modified/created timestamps via `ug-filesystem chtimes` behind an explicit user confirmation gate (`waiting_approval`).

---

#### 3. Verification & Open Source Repositories
* **GitHub Repository:** https://github.com/ciscojrai/forensic-dot-connector
* **Hackathon Submission:** https://devpost.com/software/a-pellerano-dream-come-true-our-legacy-lives-on
* **Uliya Skill Standard Status:** `static-pass` (0 errors, 0 warnings via `check-skill.mjs`)

---

#### 4. Developer Contacts
* **Contact Person:** Francisco Pellerano
* **Email Address:** franciscojpelleranojr@gmail.com
* **Business Email:** info@allforwardllc.com
* **GitHub:** https://github.com/ciscojrai
* **Entity / Business:** All Forward LLC
* **Phone:** +1-504-571-9320

---

We have completed the developer self-test and packaged the initial builds in accordance with the `@ugreen-nas/builder-open` and `project.yaml` standards. We look forward to cooperating with the UGREEN technical and BD teams to bring this capability to UGREEN NAS users worldwide.

Sincerely,  
**Francisco Pellerano**  
*Lead Architect & Developer, Forensic Dot Connector*
