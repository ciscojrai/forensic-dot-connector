import { useState } from 'react';
import { Camera, ShieldCheck, CheckCircle2, XCircle, Layers, Image as ImageIcon, FolderInput, ArrowRight, RefreshCw, MessageSquare, Cat, Bike, UserCheck, Sparkles, Wrench } from 'lucide-react';

interface ClueItem {
  category: string;
  name: string;
  observed: string;
  lowerBound: number;
  upperBound: number;
  confidence: 'High' | 'Medium' | 'Low';
}

const heirloomClues: ClueItem[] = [
  { category: 'Heirloom Anchor', name: "Grandfather's 1958 Omega Watch", observed: '18k yellow gold Omega Seamaster automatic (verified 1958 acquisition)', lowerBound: 1958, upperBound: 2026, confidence: 'High' },
  { category: 'Print Medium', name: 'Lab Border Finishing', observed: 'Die-cut scalloped / deckled edges (Commercial lab cut)', lowerBound: 1938, upperBound: 1956, confidence: 'High' },
  { category: 'Automotive', name: 'Vehicle Styling', observed: 'Prominent aeronautical chrome tailfin silhouette in driveway', lowerBound: 1955, upperBound: 1961, confidence: 'High' },
  { category: 'Interior Decor', name: 'Furniture / Living Space', observed: 'Mid-century modern teak credenza and hairpin-leg coffee table', lowerBound: 1950, upperBound: 1968, confidence: 'High' },
  { category: 'Attire & Jewelry', name: 'Women’s Fashion', observed: 'Full-skirted shirtwaist dress with petticoat & pearl choker', lowerBound: 1952, upperBound: 1959, confidence: 'High' },
  { category: 'Photographic Stock', name: 'Film Emulsion', observed: 'Black & white silver gelatin print with Kodak Velox backstamp', lowerBound: 1940, upperBound: 1965, confidence: 'Medium' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'recovery' | 'matrix' | 'oracle' | 'taxonomy' | 'cache' | 'telemetry'>('matrix');
  const selectedPhoto = '/volume1/photos/grandparents_archive_box1/heirloom_scan_014.tif';

  return (
    <div style={{ padding: '24px', maxWidth: '1240px', margin: '0 auto', fontFamily: 'inherit' }}>
      {/* Top Navigation / UGOS Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1F2937', paddingBottom: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#0284C7', padding: '10px', borderRadius: '10px', display: 'flex' }}>
              <Camera size={24} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>Forensic Dot Connector</h1>
                <span style={{ fontSize: '11px', backgroundColor: '#0369A1', color: '#E0F2FE', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>v1.0.0 UPK</span>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>
                End-to-End Recovery, Forensic Mining & Archive Preservation &bull; <code>com.pellerano.forensicdot</code> (nasync / homeagent)
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#111827', padding: '6px 14px', borderRadius: '20px', border: '1px solid #374151' }}>
            <Layers size={14} color="#38BDF8" />
            <span style={{ fontSize: '11px', color: '#E0F2FE', fontWeight: 600 }}>10,482 Archive Photos Indexed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#111827', padding: '6px 14px', borderRadius: '20px', border: '1px solid #065F46' }}>
            <ShieldCheck size={14} color="#10B981" />
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>100% Local Sovereign Privacy</span>
          </div>
        </div>
      </header>

      {/* Archive Breadcrumb & Active Photo Banner */}
      <section style={{ backgroundColor: '#111827', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #1F2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ImageIcon size={18} color="#9CA3AF" />
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Active Heirloom Print:</span>
          <code style={{ backgroundColor: '#1F2937', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#38BDF8' }}>{selectedPhoto}</code>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '12px', backgroundColor: '#0284C7', color: '#FFFFFF', padding: '6px 14px', borderRadius: '6px', fontWeight: 600 }}>
            Estimated Era: 1955 – 1958
          </span>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #1F2937', paddingBottom: '10px', overflowX: 'auto' }}>
        <button
          onClick={() => setActiveTab('recovery')}
          style={{
            background: activeTab === 'recovery' ? '#0284C7' : 'transparent',
            color: activeTab === 'recovery' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Wrench size={14} /> Recovery & Triage
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          style={{
            background: activeTab === 'matrix' ? '#0284C7' : 'transparent',
            color: activeTab === 'matrix' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          Forensic Mining Matrix
        </button>
        <button
          onClick={() => setActiveTab('oracle')}
          style={{
            background: activeTab === 'oracle' ? '#0284C7' : 'transparent',
            color: activeTab === 'oracle' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={14} /> Family Heritage Oracle
        </button>
        <button
          onClick={() => setActiveTab('taxonomy')}
          style={{
            background: activeTab === 'taxonomy' ? '#0284C7' : 'transparent',
            color: activeTab === 'taxonomy' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          Century-Spanning Clue Taxonomy
        </button>
        <button
          onClick={() => setActiveTab('cache')}
          style={{
            background: activeTab === 'cache' ? '#0284C7' : 'transparent',
            color: activeTab === 'cache' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          Incremental Cache & Placement
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          style={{
            background: activeTab === 'telemetry' ? '#0284C7' : 'transparent',
            color: activeTab === 'telemetry' ? '#FFFFFF' : '#9CA3AF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}
        >
          NAS Agent Telemetry
        </button>
      </div>

      {/* Tab: Media Recovery & Triage */}
      {activeTab === 'recovery' && (
        <section style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1F2937' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '16px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench size={18} color="#0284C7" /> Pre-Ingestion Media Recovery & File Triage
              </h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
                Validates legacy headers, repairs corrupted containers, deduplicates multi-generational imports, and restores filesystem timestamps.
              </p>
            </div>
            <span style={{ fontSize: '11px', backgroundColor: '#064E3B', color: '#6EE7B7', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
              Triage Engine: Active
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Magic Byte Validated</span>
              <h3 style={{ fontSize: '20px', color: '#10B981', margin: '6px 0 0 0' }}>10,394</h3>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>JPEG, TIFF, PNG, HEIC</span>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Repaired Headers</span>
              <h3 style={{ fontSize: '20px', color: '#38BDF8', margin: '6px 0 0 0' }}>88 files</h3>
              <span style={{ fontSize: '11px', color: '#38BDF8' }}>Bit rot & container salvage</span>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Duplicates Pruned</span>
              <h3 style={{ fontSize: '20px', color: '#F59E0B', margin: '6px 0 0 0' }}>412 copies</h3>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>via ug-filemgr scan-dedupe</span>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>chtimes Synced</span>
              <h3 style={{ fontSize: '20px', color: '#A855F7', margin: '6px 0 0 0' }}>9,840</h3>
              <span style={{ fontSize: '11px', color: '#A855F7' }}>Historical capture inode sync</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#F3F4F6' }}>Recovery Triage Audit Log</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#111827', borderRadius: '4px' }}>
                <span style={{ color: '#D1D5DB' }}>/volume1/photos/scans/box4/scan_corrupt_header_09.tif</span>
                <span style={{ color: '#10B981' }}>[Fixed TIFF II Magic Byte &bull; Restored 48MB Strip]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#111827', borderRadius: '4px' }}>
                <span style={{ color: '#D1D5DB' }}>/volume1/photos/scans/uncle_ed/wedding_1961.jpg</span>
                <span style={{ color: '#38BDF8' }}>[ug-filesystem chtimes: Synced inode from 2024-10-12 to 1961-06-18]</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#111827', borderRadius: '4px' }}>
                <span style={{ color: '#D1D5DB' }}>/volume1/photos/backup_dump/IMG_0029_copy(1).jpg</span>
                <span style={{ color: '#F59E0B' }}>[Deduplicated: Identical SHA-256 hash to master scan &bull; Pruned]</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: Forensic Mining Matrix */}
      {activeTab === 'matrix' && (
        <main>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #065F46' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <h3 style={{ margin: 0, fontSize: '15px', color: '#10B981' }}>Triangulated Possibilities (Grandparents&rsquo; Era)</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: '1.6' }}>
                <strong>Estimated Timeframe: 1955 &ndash; 1958</strong><br />
                Anchor Evidence: The commercial lab scalloped-edge border was in peak circulation between 1938&ndash;1956. The automotive chrome tailfin establishes a hard lower bound of <strong>1955</strong>, while the shirtwaist dress silhouette and Kodak Velox backstamp converge precisely on the late 1950s.
              </p>
            </div>

            <div style={{ backgroundColor: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #991B1B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <XCircle size={18} color="#EF4444" />
                <h3 style={{ margin: 0, fontSize: '15px', color: '#EF4444' }}>Definitive Exclusions (Impossible Eras)</h3>
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#D1D5DB', lineHeight: '1.7' }}>
                <li><strong>Pre-1955 Excluded:</strong> Impossible due to automotive chrome tailfin styling in driveway.</li>
                <li><strong>Post-1962 Excluded:</strong> Impossible due to lab die-cut deckled edges and pre-Instamatic print chemistry.</li>
                <li><strong>1970s+ Excluded:</strong> Total absence of synthetic shag, wood-grain paneling, or full-bleed color print papers.</li>
              </ul>
            </div>
          </div>

          {/* Clues Table */}
          <div style={{ backgroundColor: '#111827', borderRadius: '12px', border: '1px solid #1F2937', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #1F2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Identified Multigenerational Clue Vectors</h3>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{heirloomClues.length} anchors cross-referenced</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>
                  <th style={{ padding: '12px 20px' }}>Category</th>
                  <th style={{ padding: '12px 20px' }}>Indicator Item</th>
                  <th style={{ padding: '12px 20px' }}>Observed Detail</th>
                  <th style={{ padding: '12px 20px' }}>Historical Range</th>
                  <th style={{ padding: '12px 20px' }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {heirloomClues.map((clue, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1F2937', color: '#F3F4F6' }}>
                    <td style={{ padding: '12px 20px', color: '#38BDF8', fontWeight: 500 }}>{clue.category}</td>
                    <td style={{ padding: '12px 20px', fontWeight: 600 }}>{clue.name}</td>
                    <td style={{ padding: '12px 20px', color: '#D1D5DB' }}>{clue.observed}</td>
                    <td style={{ padding: '12px 20px', fontFamily: 'monospace' }}>{clue.lowerBound} &ndash; {clue.upperBound}</td>
                    <td style={{ padding: '12px 20px' }}>
                      <span style={{ backgroundColor: '#064E3B', color: '#6EE7B7', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                        {clue.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}

      {/* Tab: Family Heritage Oracle */}
      {activeTab === 'oracle' && (
        <section style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1F2937' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} color="#0284C7" /> Family Heritage Oracle & Biometric Memory Engine
            </h2>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
              Interactive conversational scenarios powered by <code>ug-knowledge</code> and <code>ug-photo</code> across 10k+ indexed family photos.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Scenario 1: Sibling Bike Dispute */}
            <div style={{ backgroundColor: '#1F2937', padding: '16px 20px', borderRadius: '8px', border: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <Bike size={16} /> Sibling Dispute: &ldquo;Who got a bicycle first, Sam or Pat?&rdquo;
              </div>
              <div style={{ fontSize: '13px', color: '#E5E7EB', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Oracle Verdict:</strong> Sam received his first bicycle in <strong>June 1984</strong> (age 7), exactly 3 years and 6 months before Pat, who received her first bicycle in <strong>December 1987</strong> (age 6).
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontFamily: 'monospace' }}>
                <span style={{ backgroundColor: '#111827', padding: '6px 12px', borderRadius: '6px', color: '#10B981' }}>
                  ✓ Evidence 1: /photos/1984/scan_sam_schwinn_summer.tif (dated June 1984)
                </span>
                <span style={{ backgroundColor: '#111827', padding: '6px 12px', borderRadius: '6px', color: '#9CA3AF' }}>
                  ✓ Evidence 2: /photos/1987/xmas_pat_pink_bike.jpg (dated Dec 1987)
                </span>
              </div>
            </div>

            {/* Scenario 2: Family Pet Chronology */}
            <div style={{ backgroundColor: '#1F2937', padding: '16px 20px', borderRadius: '8px', border: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <Cat size={16} /> Nostalgic Inquiry: &ldquo;What year did Mom get our first cat?&rdquo;
              </div>
              <div style={{ fontSize: '13px', color: '#E5E7EB', lineHeight: '1.6', marginBottom: '10px' }}>
                <strong>Oracle Verdict:</strong> Your mother adopted your family&rsquo;s first cat (tabby named &ldquo;Mitten&rdquo;) in <strong>December 1991</strong>. First visual appearance is cataloged as an 8-week-old kitten on Christmas morning.
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#10B981' }}>
                <span style={{ backgroundColor: '#111827', padding: '6px 12px', borderRadius: '6px' }}>
                  ✓ Corroborated by orange 35mm date stamp: &rsquo;91 12 25 (/photos/1991/scan_xmas_mitten.jpg)
                </span>
              </div>
            </div>

            {/* Scenario 3: Biometric Markers, Tattoos & Crutches */}
            <div style={{ backgroundColor: '#1F2937', padding: '16px 20px', borderRadius: '8px', border: '1px solid #374151' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A855F7', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                <UserCheck size={16} /> Biometric Clue Triangulation (Tattoos, Crutches, Mustache Eras)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px' }}>
                <div style={{ backgroundColor: '#111827', padding: '10px', borderRadius: '6px' }}>
                  <span style={{ color: '#A855F7', fontWeight: 600 }}>Dad&rsquo;s Mustache Era</span>
                  <p style={{ margin: '4px 0 0 0', color: '#9CA3AF' }}>Active 1976 &ndash; 1984. Photos with clean-shaven Dad are conclusively pre-1976 or post-1985.</p>
                </div>
                <div style={{ backgroundColor: '#111827', padding: '10px', borderRadius: '6px' }}>
                  <span style={{ color: '#A855F7', fontWeight: 600 }}>Uncle Mark&rsquo;s Eagle Tattoo</span>
                  <p style={{ margin: '4px 0 0 0', color: '#9CA3AF' }}>Acquired July 1988 (Navy enlistment). Establishes an absolute lower bound (Tmin &ge; 1988).</p>
                </div>
                <div style={{ backgroundColor: '#111827', padding: '10px', borderRadius: '6px' }}>
                  <span style={{ color: '#A855F7', fontWeight: 600 }}>Cousin Leo on Crutches</span>
                  <p style={{ margin: '4px 0 0 0', color: '#9CA3AF' }}>Broken fibula micro-window: Pinned precisely to June &ndash; August 1996 healing recovery.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: Visual Clues Taxonomy */}
      {activeTab === 'taxonomy' && (
        <section style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1F2937' }}>
          <h2 style={{ fontSize: '16px', marginTop: 0, marginBottom: '16px' }}>Century-Spanning Photographic Taxonomy (1900s &ndash; Present)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ color: '#38BDF8', margin: '0 0 8px 0' }}>1. Physical Print Artifacts</h4>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: '1.5' }}>
                Tintypes, cabinet cards, deckled/scalloped edges (1938&ndash;1956), lab margin ink date stamps, Polaroid chemical pods, orange LED 7-segment timestamps.
              </p>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ color: '#38BDF8', margin: '0 0 8px 0' }}>2. Multigenerational Fashion</h4>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: '1.5' }}>
                Victorian high collars, 1920s cloche hats, 1950s poodle skirts, 1970s wide lapels & bell-bottoms, 1980s shoulder pads, 1990s grunge flannels.
              </p>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ color: '#38BDF8', margin: '0 0 8px 0' }}>3. Consumer Tech & Vehicles</h4>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0, lineHeight: '1.5' }}>
                Wood cabinet tube TVs, automotive chrome tailfins, rotary phones, beige desktop computer CRTs, 30-pin smartphones, modern OLED & DRL signatures.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Tab: Incremental Cache & Placement Queue */}
      {activeTab === 'cache' && (
        <section style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1F2937' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '16px', margin: 0 }}>Incremental Cache & Delta Ingestion Pipeline</h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0 0 0' }}>
                Two-tier filter: <code>mtime + size</code> stat check skips untouched files &bull; <code>@appdata</code> persists chronology graph
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ backgroundColor: '#1F2937', color: '#E5E7EB', border: '1px solid #374151', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <RefreshCw size={13} /> Rescan Delta
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Baseline Ingested Library</span>
              <h3 style={{ fontSize: '20px', color: '#F9FAFB', margin: '6px 0 0 0' }}>10,482</h3>
              <span style={{ fontSize: '11px', color: '#10B981' }}>Cached in @appdata/chronology.db</span>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Pending Batch Delta (Week 2)</span>
              <h3 style={{ fontSize: '20px', color: '#38BDF8', margin: '6px 0 0 0' }}>+1,250</h3>
              <span style={{ fontSize: '11px', color: '#38BDF8' }}>Detected via ug-filesystem stat</span>
            </div>
            <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Already Indexed Ratio</span>
              <h3 style={{ fontSize: '20px', color: '#10B981', margin: '6px 0 0 0' }}>89.3%</h3>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>10,482 / 11,732 total photos</span>
            </div>
          </div>

          <div style={{ backgroundColor: '#1F2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FolderInput size={18} color="#38BDF8" />
              <h4 style={{ margin: 0, fontSize: '14px', color: '#F3F4F6' }}>Automated Sorting & Placement Queue (file-workflow)</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 12px 0', lineHeight: '1.5' }}>
              Once delta batch is dated via NPU, <code>file-workflow start</code> generates a non-destructive move plan. After user approval, files are organized into dedicated timeline directories.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#111827', borderRadius: '4px' }}>
                <span style={{ color: '#D1D5DB' }}>/incoming/uncle_carlos_box/*.tif (420 items)</span>
                <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={12} /> /photos/Timeline/1950s/1958_Summer/
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#111827', borderRadius: '4px' }}>
                <span style={{ color: '#D1D5DB' }}>/incoming/family_reunion_scans/*.jpg (830 items)</span>
                <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowRight size={12} /> /photos/Timeline/1970s/1974_August/
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab: UGOS Agent Telemetry */}
      {activeTab === 'telemetry' && (
        <section style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #1F2937' }}>
          <h2 style={{ fontSize: '16px', marginTop: 0, marginBottom: '16px' }}>10,000+ Photo Library Batch Telemetry</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <span>Pre-Ingestion Triage (Magic Bytes & Inode Restoration)</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Active (100% Integrity Validated)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <span>Archive Scanner (via <code>ug-photo search-picture & timeline-summary</code>)</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>10,482 files indexed across /volume1/photos</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <span>Incremental Delta Scanner (<code>ug-filesystem find & stat</code>)</span>
              <span style={{ color: '#38BDF8', fontWeight: 600 }}>Active (tracks mtime & SHA256 in @appcache)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <span>On-Device Multimodal Inference (<code>ug-photo vision-vlm & vision-ocr</code>)</span>
              <span style={{ color: '#38BDF8', fontWeight: 600 }}>Local NPU Hardware Acceleration Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#1F2937', borderRadius: '6px' }}>
              <span>Dossier Persistence (<code>ug-knowledge save-text</code>)</span>
              <span style={{ color: '#F3F4F6', fontFamily: 'monospace' }}>/volume1/@appdata/com.pellerano.forensicdot/dossiers/</span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
