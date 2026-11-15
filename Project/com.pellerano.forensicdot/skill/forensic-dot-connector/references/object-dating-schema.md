# Object & Photographic Medium Forensic Mining Schema

The Object & Photographic Medium Forensic Mining Schema provides a century-spanning chronological reference index. It correlates physical print mediums, laboratory processing artifacts, manufactured electronics, automotive styling, and domestic interiors with documented historical eras from the 1900s through the present day.

## 1. Photographic Print Mediums & Physical Artifacts

* **1900s–1920s (Early Photographic Formats)**:
  * Daguerreotypes, ambrotypes, and tintypes on metal plates.
  * Heavy cardboard cabinet cards and albumen prints with studio embossing.
* **1930s–1950s (Scalloped Edges & Margin Stamps)**:
  * Scalloped / deckled edge borders: Die-cut decorative borders applied by commercial photo finishing labs (peak popularity 1938–1956).
  * Black & white silver gelatin prints with hand-written pencil/fountain pen annotations on reverse.
* **1950s–1970s (Mid-Century Color & Margin Processing Dates)**:
  * White margin prints with photo lab ink stamps indicating development month and year (e.g., "OCT 58", "JUL 66") on the white border or reverse.
  * Square-format prints from 120 or 126 Instamatic cartridges (introduced 1963).
  * Early Kodachrome and Ektachrome slide mounts (cardboard mounts with stamped date codes).
* **1970s–1980s (Instant Film & Early 35mm)**:
  * Polaroid SX-70 / 600 integral film: Square image with distinctive thick bottom chemical pod margin (introduced 1972).
  * Kodacolor II prints displaying characteristic dye-stability color shifts (cyan/magenta tint shift).
* **1980s–2000s (Date-Back Timestamps & Disposable Cameras)**:
  * Quartz Date Backs: Orange or red 7-segment digital LED timestamps burned directly into the bottom-right corner of the film frame (common on 35mm point-and-shoots from 1984 through early 2000s).
  * Single-use disposable cameras: Fixed-focus plastic lens vignetting, harsh direct flash falloff (introduced 1986).
* **2000s–Present (Digital Sensor & Smartphone Eras)**:
  * Early digital cameras (2000–2006): 1.3MP–4MP CCD sensors, visible Bayer interpolation noise, 4:3 native aspect ratio.
  * Smartphone photography (2007–present): Computational HDR, wide dynamic range, HEIC/DNG formats.

## 2. Consumer Electronics & Communications

* **Display Hardware**:
  * Black & white vacuum tube TV consoles: 1940s–1960s.
  * CRT Color Televisions (curved glass faceplate, heavy chassis): 1960s–early 2000s.
  * Flat panel LCD / Plasma (first generation, thick bezel, CCFL backlight): 2001–2010.
  * Ultra-thin LED / OLED edge-to-edge displays: 2012–present.
* **Telecommunications**:
  * Rotary dial desk and wall phones: Mainstream 1930s–1970s.
  * Push-button tone phones: 1970s–1990s.
  * Cellular "brick" and flip phones: 1990s–mid-2000s.
  * 3.5-inch compact capacitive touchscreen smartphones (30-pin dock connector): 2007–2012.
  * Modern multi-camera smartphones (dual/triple rear lenses, glass back): 2017–present.
* **Computing & Media Hardware**:
  * Desktop beige tower cases, 5.25" and 3.5" floppy drives, CRT monitors: 1980s–1990s.
  * Cassette tapes (1970s–1990s), CD jewel cases (1985–2010), MP3 players with mechanical scroll wheels (2001–2009).

## 3. Automotive & Transportation Silhouettes

* **1920s–1930s**: Upright grilles, external running boards, freestanding headlamp pods, wooden/wire-spoke wheels.
* **1940s–1950s**: Integrated ponton fenders, prominent chrome horizontal grilles, aeronautical tailfins (peak 1957–1959).
* **1960s–1970s**: Coke-bottle side profiles, muscle car fastbacks, vinyl roofs, massive station wagons with faux wood-grain paneling.
* **1980s–1990s**: Rectangular sealed-beam headlamps, boxy wedge designs, transition to aerodynamic "jellybean" curves, rise of the family minivan.
* **2000s–Present**: High beltline crossover SUVs, projector headlamps, integrated LED daytime running light (DRL) light signatures (post-2010).

## 4. Domestic Interiors, Decor & Architecture

* **1960s–1970s**: Vertical dark wood paneling, deep shag carpeting, avocado green / harvest gold / burnt orange kitchen appliances.
* **1980s–1990s**: Country blue and dusty rose pastel wallpaper, brass-trimmed polished lighting, oak kitchen cabinetry with cathedral arches.
* **2000s–Present**: Open-concept floor plans, granite and quartz countertops, stainless steel appliances, neutral greige wall colors, recessed LED wafer pot lights.

## 5. Mathematical Chronological Inference Engine

* **Heirloom Anchor Cross-Photo Propagation Rule**:
  $$T_{photo} \ge \text{AcquisitionDate}(\text{HeirloomAnchor})$$
  When a specific known heirloom is identified—such as Grandfather's 1958 Omega watch, a 1968 college class ring, or an ancestral family automobile—its verified acquisition date establishes an unyielding lower bound ($T_{min}$) across every uncaptioned, undated photo in which it appears. As Forensic Dot Connector links recurring individuals and heirlooms, date bounds propagate automatically across the entire 10,000+ photo archive.

* **Lower Bound Rule ($T_{min}$)**:
  $$T_{min} = \max_{i} \left( \text{IntroductionYear}(\text{Clue}_i) \right)$$
  The presence of any identifiable manufactured artifact, film medium, or technological format establishes an absolute non-negotiable lower bound.
* **Upper Bound Rule ($T_{max}$)**:
  Upper bounds are established by:
  1. *Physical lab processing and timestamp markers*: e.g., an ink-stamped development date ("AUG 64") or a quartz date stamp (`'96 4 18`).
  2. *Hardware standard discontinuations*: e.g., the elimination of the 30-pin smartphone dock connector in late 2012; nationwide termination of analog NTSC broadcasts in 2009.
  3. *Photographic medium retirement*: e.g., Kodachrome chemical processing termination (2010); Polaroid original integral film factory shutdown (2008).
