// ============================================
// SCREEN 14: TRANSACTION TIMELINE EDITOR
// ============================================
const TimelineEditor = ({ onBack }) => {
  const [showTC, setShowTC] = React.useState(true);

  // Contract reference: 04/08/26 · Acceptance 04/12/26 · Closing 05/12/26 (30 days)
  // Source: Hawai'i Association of REALTORS Purchase Contract RR201 Rev. 2/25
  // Each row: [term, description, anchor('acceptance'|'closing'), offsetDays, basis('calendar'|'business'), done, note]
  // Offset is signed: +N from acceptance = after, +N from closing = before (we negate below)
  const sections = [
    {
      title: 'Deposits & Funds Verification',
      tc: 'B-1 Initial Earnest Money Deposit must reach escrow within 2 business days of Acceptance. Verify wire received before closing B-1. H-1a cash verification was attached with the Purchase Contract — confirm on file.',
      rows: [
        ['B-1',  'Initial Earnest Money Deposit',           'acceptance', 2,  'business', false, '2 Business Days from Acceptance'],
        ['H-1a', 'Verification of Cash Funds',              'attached',   0,  'calendar', true,  '*Attached w/ Purchase Contract'],
        ['H-4a', 'Pre-qual Letter to Seller',               'attached',   0,  'calendar', true,  '*Attached w/ Purchase Contract'],
      ],
      color: 'critical',
    },
    {
      title: 'Seller Disclosures (SRPDS)',
      tc: 'Per HI Revised Statutes Ch. 508D, SRPDS delivered within 10 days of Acceptance (contract uses 3 days). Buyer acknowledges within 2 days of receipt (I-3a), then has 7 days from I-1 to review/accept (I-3b).',
      rows: [
        ['I-1b', "Seller's Real Property Disclosure Statement Delivered to Buyer", 'acceptance', 3,  'calendar', false, '3 Days from Acceptance'],
        ['I-3a', "Buyer's Acknowledgement of SRPDS",                               'acceptance', 5,  'calendar', false, '2 Days from Contingency I-1'],
        ['I-3b', "Buyer's Review/Acceptance of SRPDS",                             'acceptance', 10, 'calendar', false, '7 Days from Contingency I-1'],
      ],
    },
    {
      title: 'Title & Vesting',
      tc: 'Escrow orders Preliminary Title Report immediately. Buyer reviews for easements, CC&Rs, and encumbrances. Vesting (tenancy) per §G-3 must be confirmed within 15 days of Acceptance.',
      rows: [
        ['G-1', 'Title Commitment (Prelim) Delivered',          'acceptance', 5,  'calendar', false, '5 Days from Acceptance'],
        ['G-3', "Buyer's Tenancy & Vesting to be Determined",   'acceptance', 15, 'calendar', false, '15 Days from Acceptance'],
      ],
    },
    {
      title: 'Inspection & Termite',
      tc: 'Property inspection contingency per §J-1 is 10 days from Acceptance. Termite vendor must be selected within 5 days (L-2.1); report due to buyer 12 days prior to closing (L-2.3).',
      rows: [
        ['L-2.1', 'Termite Inspection Company Selected',         'acceptance', 5,  'calendar', false, '5 Days from Acceptance'],
        ['J-1',   'Property Inspection Release / Waived',        'acceptance', 10, 'calendar', false, '10 Days from Acceptance'],
        ['L-2.3', 'Termite Inspection Report Due to Buyer',      'closing',    12, 'calendar', false, '12 Days prior to Closing'],
      ],
    },
    {
      title: 'HOA / Condo Documents',
      tc: 'Seller delivers HOA/Community/Condo docs within 12 days of Acceptance (M-1.1). Buyer acknowledges receipt within 2 days (M-1.2), then has 7 days from I-1 to review and approve (M-1.3).',
      rows: [
        ['M-1.1', 'Homeowner / Community Association / Condo Documents Delivered to Buyer', 'acceptance', 12, 'calendar', false, '12 Days from Acceptance'],
        ['M-1.2', "Buyer's Receipt / Acknowledgment of HOA Documents",                      'acceptance', 14, 'calendar', false, '2 Days from Contingency M-1.1'],
        ['M-1.3', "Buyer's Review / Approval of HOA Documents",                             'acceptance', 19, 'calendar', false, '7 Days from Contingency M-1.1'],
      ],
    },
    {
      title: 'Loan & Financing',
      tc: 'Per §H-4: Conditional Loan Commitment letter due 15 days prior to Closing (H-4b). Satisfaction of all lender conditions due 10 days prior to Closing (H-4c). Kyle at GEM drives this timeline.',
      rows: [
        ['H-4b', 'Conditional Loan Commitment Letter Delivered to Seller', 'closing', 15, 'calendar', false, '15 Days prior to Closing'],
        ['H-4c', 'Satisfaction of Conditional Loan Commitment Letter',     'closing', 10, 'calendar', false, '10 Days prior to Closing'],
      ],
      color: 'critical',
    },
    {
      title: 'Final Walk-Through & Closing',
      tc: 'Removal of personal property from Property 7 days prior to closing (J-8). Final walk-through 5 days prior (J-3). Closing on Scheduled Closing Date (F-2).',
      rows: [
        ['J-8', 'Removal of Items from Property',  'closing',    7,  'calendar', false, '7 Days prior to Closing'],
        ['J-3', 'Final Walk-Thru',                 'closing',    5,  'calendar', false, '5 Days prior to Closing'],
        ['F-2', 'Scheduled Closing Date',          'closing',    0,  'calendar', false, 'Scheduled Closing Date'],
      ],
      color: 'critical',
    },
  ];

  const [side, setSide] = React.useState('buyer'); // 'buyer' | 'seller'
  const isSeller = side === 'seller';
  const p1 = isSeller ? 'Seller' : 'Buyer';
  const p2 = isSeller ? 'Buyer' : 'Seller';

  // --- Date computation -------------------------------------------------
  const [acceptanceDate, setAcceptanceDate] = React.useState('2026-04-12');
  const [daysToClose, setDaysToClose] = React.useState(30);
  const [dayBasis, setDayBasis] = React.useState('calendar'); // 'calendar' | 'business'

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const formatMD = (d) => `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2,'0')}, ${d.getFullYear()}`;

  const parseISO = (iso) => {
    if (!iso) return null;
    const parts = iso.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  };

  // Add days (calendar or business), then roll weekends (Sat→Fri, Sun→Mon).
  // Direction: +1 = forward (from acceptance), -1 = backward (from closing).
  const addDays = (start, n, basis, direction = 1) => {
    const d = new Date(start);
    const N = Math.abs(parseInt(n) || 0);
    if (basis === 'calendar') {
      d.setDate(d.getDate() + direction * N);
    } else {
      let added = 0;
      while (added < N) {
        d.setDate(d.getDate() + direction);
        const dow = d.getDay();
        if (dow !== 0 && dow !== 6) added++;
      }
    }
    return d;
  };
  const rollWeekend = (d) => {
    const nd = new Date(d);
    const dow = nd.getDay();
    if (dow === 6) { nd.setDate(nd.getDate() - 1); return { date: nd, rolled: true, from: formatMD(d) }; }
    if (dow === 0) { nd.setDate(nd.getDate() + 1); return { date: nd, rolled: true, from: formatMD(d) }; }
    return { date: nd, rolled: false, from: null };
  };

  const computeClosing = () => {
    const start = parseISO(acceptanceDate);
    if (!start) return { date: null, display: '—', rolled: false, rolledFrom: null };
    const raw = addDays(start, daysToClose, dayBasis, 1);
    const r = rollWeekend(raw);
    return { date: r.date, display: formatMD(r.date), rolled: r.rolled, rolledFrom: r.from };
  };
  const closing = computeClosing();

  // Per-row computed due date: anchor + offset (before/after), then weekend roll.
  const computeRowDate = (anchor, offset, basis) => {
    if (anchor === 'attached') return { display: 'Attached', rolled: false, from: null };
    const base = anchor === 'closing' ? closing.date : parseISO(acceptanceDate);
    if (!base) return { display: '—', rolled: false, from: null };
    const direction = anchor === 'closing' ? -1 : 1;
    const raw = addDays(base, offset, basis, direction);
    const r = rollWeekend(raw);
    return { display: formatMD(r.date), rolled: r.rolled, from: r.from };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Red header */}
      <div style={{ background: 'var(--ulu-red)', color: '#fff', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <UluLogo variant="white" size="sm" />
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.3)' }} />
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700 }}>Transaction Timeline</div>
            <div style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>ULU-TX-CHECKLIST-v2</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Side toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.18)', borderRadius: 3, padding: 3 }}>
            {['buyer', 'seller'].map(s => (
              <button
                key={s}
                onClick={() => setSide(s)}
                style={{
                  padding: '6px 14px', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: side === s ? '#fff' : 'transparent',
                  color: side === s ? 'var(--ulu-red)' : 'rgba(255,255,255,0.85)',
                  border: 'none', borderRadius: 2, cursor: 'pointer',
                }}
              >{s === 'buyer' ? 'Buyer-side' : 'Seller-side'}</button>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} onClick={onBack}>← Back to Dashboard</button>
        </div>
      </div>

      {/* Date bar */}
      <div style={{ background: 'var(--ulu-black)', color: '#fff', padding: '18px 32px', display: 'flex', alignItems: 'center', gap: 32 }}>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Acceptance Date</div>
          <input
            type="date"
            value={acceptanceDate}
            onChange={(e) => setAcceptanceDate(e.target.value)}
            style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '8px 12px', borderRadius: 2, marginTop: 6, fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600, width: 170, colorScheme: 'dark' }}
          />
        </div>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Days to Close</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, alignItems: 'center' }}>
            <input
              type="number"
              min="0"
              value={daysToClose}
              onChange={(e) => setDaysToClose(e.target.value)}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'var(--ulu-red)', padding: '8px 10px', borderRadius: 2, fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, width: 64, textAlign: 'center' }}
            />
            <select
              value={dayBasis}
              onChange={(e) => setDayBasis(e.target.value)}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '8px 10px', borderRadius: 2, fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 500 }}
            >
              <option value="calendar" style={{ color: '#111' }}>calendar</option>
              <option value="business" style={{ color: '#111' }}>business</option>
            </select>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.55)' }}>Closing Date (computed)</div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: '#fff', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2, background: 'rgba(255,255,255,0.04)', minWidth: 170 }}>
              {closing.display}
            </div>
            {closing.rolled && (
              <div style={{ fontSize: 10.5, color: 'var(--ulu-red)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }} title={`Originally ${closing.rolledFrom} — rolled to next business day`}>
                Rolled
              </div>
            )}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost btn-sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)' }} onClick={() => { setAcceptanceDate('2026-04-12'); setDaysToClose(30); setDayBasis('calendar'); }}>Reset</button>
      </div>

      {/* Property & parties */}
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--n-200)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 14 }}>
          <div className="field"><label className="field-label">Property Address</label><input className="field-input" defaultValue="94-1004 Kaukahi Pl. #K11, Waipahu, HI 96797" /></div>
          <div className="field"><label className="field-label">Escrow #</label><input className="field-input" defaultValue="TG-4471128-KM" /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 10 }}>
          <div className="field"><label className="field-label">{p1} #1 Name</label><input className="field-input" defaultValue={isSeller ? 'Seller of Record' : 'Jordan Micah Yoshimoto'} /></div>
          <div className="field"><label className="field-label">{p1} #1 Email</label><input className="field-input" defaultValue={isSeller ? 'seller@example.com' : 'jordan.yoshimoto@example.com'} /></div>
          <div className="field"><label className="field-label">{p1} #1 Phone</label><input className="field-input" defaultValue="(808) 555-0142" /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 10 }}>
          <div className="field"><label className="field-label">{p1} #2 Name</label><input className="field-input" defaultValue={isSeller ? '' : 'Kaulanakai Correa'} placeholder="Optional" /></div>
          <div className="field"><label className="field-label">{p1} #2 Email</label><input className="field-input" defaultValue={isSeller ? '' : 'kaulanakai.correa@example.com'} placeholder="Optional" /></div>
          <div className="field"><label className="field-label">{p1} #2 Phone</label><input className="field-input" placeholder="Optional" /></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 10 }}>
          <div className="field"><label className="field-label">{p2}</label><input className="field-input" defaultValue={isSeller ? 'Jordan Yoshimoto / Kaulanakai Correa' : 'Seller of Record'} /></div>
          <div className="field"><label className="field-label">{isSeller ? 'Seller Agent' : 'Buyer Agent'}</label><input className="field-input" defaultValue={isSeller ? 'Stacy L. Paris · stacy.paris@remaxhawaii.com · 808-387-8189' : 'Daniel Ulu · daniel@uluteam.com · 808-295-8157'} /></div>
          <div className="field"><label className="field-label">Conditional Loan Approval Due</label><input className="field-input" defaultValue="Apr 27, 2026" /></div>
        </div>
      </div>

      {/* Key legend */}
      <div style={{ padding: '14px 32px', background: 'var(--n-50)', display: 'flex', alignItems: 'center', gap: 18, borderBottom: '1px solid var(--n-200)' }}>
        <span className="eyebrow">Key</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11 }}><span style={{ width: 12, height: 12, background: 'var(--ulu-red)', borderRadius: 2 }} /> Critical</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11 }}><span style={{ width: 12, height: 12, background: 'var(--status-amber-bg)', border: '1px solid var(--status-amber)', borderRadius: 2 }} /> Time-Sensitive</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11 }}><span style={{ width: 12, height: 12, background: 'var(--n-200)', borderRadius: 2 }} /> Standard</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em' }}><span className="chip chip-black chip-plain" style={{ padding: '2px 6px', fontSize: 9 }}>AUTO</span> Auto-calculated</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.12em' }}><span className="chip chip-grey chip-plain" style={{ padding: '2px 6px', fontSize: 9 }}>MANUAL</span> Manual entry</span>
        <div style={{ flex: 1 }} />
        <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={showTC} onChange={e => setShowTC(e.target.checked)} style={{ accentColor: 'var(--ulu-red)' }} />
          📋 Show TC Directions
        </label>
      </div>

      {/* Sections */}
      <div style={{ padding: '20px 32px' }}>
        {sections.map((s, si) => (
          <div key={si} style={{ marginBottom: 24, border: '1px solid var(--n-200)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: 'var(--ulu-black)', color: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'Raleway, sans-serif', fontSize: 15, fontWeight: 700, letterSpacing: '0.02em' }}>
                {s.title}
              </div>
              <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em' }}>{s.rows.length} items</span>
            </div>
            {showTC && (
              <div style={{ background: 'var(--gold-bg)', borderLeft: '3px solid var(--gold)', padding: '12px 18px', fontSize: 12.5, color: '#5a4a1a', lineHeight: 1.55 }}>
                <strong>📋 TC Directions:</strong> {s.tc}
              </div>
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr style={{ background: 'var(--n-50)' }}>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)', width: 70 }}>Term</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)', width: 130 }}>Due Date</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)' }}>Description</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)', width: 260 }}>Anchor · Offset · Basis</th>
                  <th style={{ textAlign: 'center', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)', width: 70 }}>Done</th>
                  <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n-500)', width: 220 }}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r, ri) => {
                  const [term, desc, anchor, offset, basis, done, note] = r;
                  const computed = computeRowDate(anchor, offset, basis);
                  const isAttached = anchor === 'attached';
                  return (
                  <tr key={ri} style={{ borderTop: '1px solid var(--n-150)' }}>
                    <td style={{ padding: '12px 14px', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 13, color: s.color === 'critical' ? 'var(--ulu-red)' : 'var(--ulu-ink)' }}>{term}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 13.5, fontWeight: 600, color: isAttached ? 'var(--n-500)' : 'var(--ulu-ink)' }}>
                          {computed.display}
                        </div>
                        {computed.rolled && (
                          <span title={`Originally ${computed.from} — rolled`} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ulu-red)', textTransform: 'uppercase' }}>↻</span>
                        )}
                      </div>
                      {!isAttached && (
                        <div style={{ fontSize: 10, color: 'var(--n-500)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                          auto · {anchor === 'closing' ? `−${offset}` : `+${offset}`}d
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: 13.5, fontWeight: 600 }}>{desc}</td>
                    <td style={{ padding: '12px 14px' }}>
                      {isAttached ? (
                        <div style={{ fontSize: 11.5, color: 'var(--n-500)', fontStyle: 'italic' }}>Attached w/ contract — no date calc</div>
                      ) : (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <select defaultValue={anchor} style={{ border: '1px solid var(--n-200)', padding: '6px 8px', fontSize: 12, borderRadius: 2, background: anchor === 'closing' ? 'var(--paper)' : '#fff', fontWeight: 600, color: anchor === 'closing' ? 'var(--ulu-red)' : 'var(--ulu-ink)' }}>
                            <option value="acceptance">from Acceptance</option>
                            <option value="closing">before Closing</option>
                          </select>
                          <input type="number" defaultValue={offset} min="0" style={{ border: '1px solid var(--n-200)', padding: '6px 8px', fontSize: 12.5, borderRadius: 2, width: 52, textAlign: 'center', fontWeight: 600 }} />
                          <select defaultValue={basis} style={{ border: '1px solid var(--n-200)', padding: '6px 8px', fontSize: 11.5, borderRadius: 2, flex: 1, minWidth: 82 }}>
                            <option value="calendar">cal. days</option>
                            <option value="business">biz. days</option>
                          </select>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                      <input type="checkbox" defaultChecked={done} style={{ width: 18, height: 18, accentColor: 'var(--ulu-red)' }} />
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div contentEditable suppressContentEditableWarning style={{ border: '1px solid var(--n-200)', padding: '6px 8px', fontSize: 12.5, borderRadius: 2, minHeight: 28, outline: 'none', color: note ? 'var(--ulu-ink)' : 'var(--n-400)' }}>
                        {note || 'Add note…'}
                      </div>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Action bar */}
      <div style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '2px solid var(--ulu-black)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 -6px 20px rgba(0,0,0,0.06)' }}>
        <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginRight: 8 }}>
          <input type="checkbox" checked={showTC} onChange={e => setShowTC(e.target.checked)} style={{ accentColor: 'var(--ulu-red)' }} />
          📋 TC Directions
        </label>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>Dashboard</button>
        <button className="btn btn-ghost btn-sm">{Ic.print} Print</button>
        <button className="btn btn-ghost btn-sm">{Ic.pdf} Save as PDF</button>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: 'var(--n-500)' }}>Last saved 2 min ago · Auto-save on</span>
        <button className="btn btn-red">Save Timeline</button>
      </div>

      <div style={{ padding: '20px 32px', fontSize: 10.5, color: 'var(--n-500)', lineHeight: 1.5, background: 'var(--n-50)' }}>
        <strong>Disclaimer:</strong> This checklist is a working document for The Ulu Team transaction coordinator and is not a contract. Dates are calculated from the stated acceptance date using business or calendar days per Hawaii Association of Realtors standard contract language. Always refer to the executed purchase contract for binding deadlines.
      </div>
    </div>
  );
};

Object.assign(window, { TimelineEditor });
