// ============================================
// LENDER PIPELINE — Kyle's pipeline view
// ============================================
const LenderPipeline = ({ onOpenFile }) => {
  const [filter, setFilter] = React.useState('all');

  const files = [
    { name: 'Yoshimoto / Correa', addr: '94-1004 Kaukahi Pl. #K11', stage: 'Docs In', pct: 90, amt: '$620,000', ltv: '80%', rate: '6.875%', waiting: 'Bank statement (Dec)', updated: '2h ago', critical: false, ulu: true },
    { name: 'Jessie & Kai Kealoha', addr: '87-432 Moi Moi St', stage: 'Underwriting', pct: 70, amt: '$640,000', ltv: '85%', rate: '6.750%', waiting: 'Awaiting conditions', updated: 'Yesterday', critical: false, ulu: true },
    { name: 'R. Tanaka', addr: '4521 Aukai Ave', stage: 'Clear to Close', pct: 100, amt: '$1,920,000', ltv: '70%', rate: '6.625%', waiting: '—', updated: '3h ago', critical: true, ulu: true },
    { name: 'M. Silva', addr: '321 Lewers #2104', stage: 'App Received', pct: 30, amt: '$520,000', ltv: '80%', rate: '7.000%', waiting: 'Tax returns (2 yrs)', updated: '4h ago', critical: false, ulu: true },
    { name: 'K. Nakamura', addr: 'Pre-approval only', stage: 'Pre-Approval', pct: 45, amt: 'Est. $900k', ltv: '—', rate: '—', waiting: 'Pay stubs', updated: 'Yesterday', critical: false, ulu: false },
    { name: 'L. Morimoto', addr: 'Pre-approval only', stage: 'Pre-Approval', pct: 80, amt: 'Est. $1.45M', ltv: '—', rate: '—', waiting: 'Gift letter', updated: '2d ago', critical: false, ulu: true },
    { name: 'P. & R. Wong', addr: '—', stage: 'Issued', pct: 100, amt: 'Est. $1.2M', ltv: '—', rate: '—', waiting: 'House hunting', updated: 'Apr 10', critical: false, ulu: false },
    { name: 'J. Fontaine', addr: '—', stage: 'Issued', pct: 100, amt: 'Est. $780k', ltv: '—', rate: '—', waiting: 'House hunting', updated: 'Apr 08', critical: false, ulu: true },
  ];

  const stages = [
    { key: 'Pre-Approval', label: 'Pre-Approval', desc: 'Discovery + income/asset' },
    { key: 'Issued', label: 'Issued', desc: 'PA letter out, house-hunting' },
    { key: 'App Received', label: 'App Received', desc: 'Under contract, collecting docs' },
    { key: 'Docs In', label: 'Docs In', desc: 'Package complete, pre-UW' },
    { key: 'Underwriting', label: 'Underwriting', desc: 'With UW, conditions out' },
    { key: 'Clear to Close', label: 'Clear to Close', desc: 'Ready for closing disclosure' },
  ];

  const visible = filter === 'all' ? files : filter === 'ulu' ? files.filter(f => f.ulu) : files.filter(f => f.stage === filter);

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ color: 'var(--gem-blue)' }}>Lender Pipeline</div>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 34, letterSpacing: '-0.02em', margin: '4px 0 6px' }}>
          All Files
        </h1>
        <div style={{ fontSize: 13.5, color: 'var(--n-500)' }}>
          {files.length} active · {files.filter(f => f.ulu).length} from Ulu Team · {files.filter(f => f.critical).length} clear to close
        </div>
      </div>

      {/* Stage funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, 1fr)`, gap: 4, marginBottom: 20 }}>
        {stages.map((s, i) => {
          const count = files.filter(f => f.stage === s.key).length;
          return (
            <div key={s.key} onClick={() => setFilter(s.key)} style={{
              background: filter === s.key ? 'var(--gem-blue)' : '#fff',
              color: filter === s.key ? '#fff' : 'var(--ulu-ink)',
              border: `1px solid ${filter === s.key ? 'var(--gem-blue)' : 'var(--n-200)'}`,
              padding: '14px 16px', borderRadius: 2, cursor: 'pointer',
              position: 'relative',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: filter === s.key ? 'rgba(255,255,255,0.7)' : 'var(--n-500)' }}>
                Stage {i + 1}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{count}</div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
              </div>
              <div style={{ fontSize: 11, color: filter === s.key ? 'rgba(255,255,255,0.75)' : 'var(--n-500)', marginTop: 2 }}>{s.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <button onClick={() => setFilter('all')} className="btn btn-sm" style={{
          background: filter === 'all' ? 'var(--ulu-black)' : '#fff',
          color: filter === 'all' ? '#fff' : 'var(--ulu-ink)',
          border: '1px solid var(--n-300)',
        }}>All files ({files.length})</button>
        <button onClick={() => setFilter('ulu')} className="btn btn-sm" style={{
          background: filter === 'ulu' ? 'var(--ulu-red)' : '#fff',
          color: filter === 'ulu' ? '#fff' : 'var(--ulu-red)',
          border: `1px solid ${filter === 'ulu' ? 'var(--ulu-red)' : 'var(--ulu-red)'}`,
        }}>Ulu Team only ({files.filter(f => f.ulu).length})</button>
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', width: 260 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--n-500)', display: 'inline-flex' }}>{Ic.search}</span>
          <input className="field-input" placeholder="Search borrower…" style={{ paddingLeft: 32, fontSize: 13 }} />
        </div>
        <button className="btn btn-gem btn-sm">{Ic.plus} New App</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 1.4fr auto',
          gap: 18, padding: '14px 22px',
          background: 'var(--paper)',
          borderBottom: '1px solid var(--n-200)',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--n-500)',
        }}>
          <div>Borrower · Property</div>
          <div>Stage</div>
          <div>Loan Amount</div>
          <div>LTV · Rate</div>
          <div>Waiting on</div>
          <div></div>
        </div>
        {visible.map((f, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 1.4fr auto',
            gap: 18, padding: '16px 22px',
            borderBottom: i < visible.length - 1 ? '1px solid var(--n-150)' : 'none',
            alignItems: 'center',
            borderLeft: f.critical ? '3px solid var(--status-green)' : '3px solid transparent',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600 }}>{f.name}</div>
                {f.ulu && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ulu-red)', padding: '2px 6px', background: 'var(--ulu-red-soft)', borderRadius: 2 }}>ULU</span>
                )}
              </div>
              <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>{f.addr}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{f.stage}</div>
              <div style={{ height: 4, background: 'var(--n-150)', borderRadius: 10, marginTop: 6, overflow: 'hidden' }}>
                <div style={{ width: `${f.pct}%`, height: '100%', background: f.critical ? 'var(--status-green)' : 'var(--gem-blue)' }} />
              </div>
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 15, fontWeight: 600 }}>{f.amt}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{f.ltv}</div>
              <div style={{ fontSize: 11, color: 'var(--n-500)' }}>{f.rate}</div>
            </div>
            <div style={{ fontSize: 12.5, color: f.waiting === '—' ? 'var(--status-green)' : 'var(--ulu-ink)' }}>
              {f.waiting}
              <div style={{ fontSize: 10.5, color: 'var(--n-500)', marginTop: 2 }}>{f.updated}</div>
            </div>
            <button className="btn btn-ghost-gem btn-sm" onClick={() => onOpenFile(f)}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// LENDER CHECKLIST — Per-borrower doc checklist
// ============================================
const DEFAULT_SECTIONS = [
  {
    title: 'Identity & Authorization',
    items: [
      { doc: "Driver's license / photo ID", status: 'received', date: 'Mar 28', notes: '' },
      { doc: "Borrower authorization (1003 signed)", status: 'received', date: 'Mar 28', notes: '' },
      { doc: "Credit auth & soft pull consent", status: 'received', date: 'Mar 28', notes: '' },
    ],
  },
  {
    title: 'Income',
    items: [
      { doc: "W-2s — last 2 years", status: 'received', date: 'Mar 29', notes: '2024 + 2023' },
      { doc: "Pay stubs — last 30 days", status: 'received', date: 'Apr 02', notes: '' },
      { doc: "Tax returns — last 2 years (w/ schedules)", status: 'received', date: 'Apr 03', notes: '' },
      { doc: "Year-to-date P&L (self-employed)", status: 'na', date: '', notes: 'W-2 borrower, N/A' },
    ],
  },
  {
    title: 'Assets',
    items: [
      { doc: "Bank statements — last 2 months (all accounts)", status: 'partial', date: 'Apr 04', notes: 'Missing December — requested Apr 18' },
      { doc: "401(k) / retirement statement (if used)", status: 'received', date: 'Apr 04', notes: '' },
      { doc: "Gift letter (if applicable)", status: 'na', date: '', notes: 'No gift funds' },
      { doc: "Earnest money deposit confirmation", status: 'received', date: 'Apr 02', notes: 'Title Guaranty receipt' },
    ],
  },
  {
    title: 'Property & Transaction',
    items: [
      { doc: "Fully executed purchase contract", status: 'received', date: 'Mar 28', notes: '' },
      { doc: "Addendums + counter-offers", status: 'received', date: 'Mar 28', notes: '' },
      { doc: "Preliminary title report", status: 'received', date: 'Apr 09', notes: 'Clean — no issues' },
      { doc: "Home inspection report", status: 'received', date: 'Apr 14', notes: 'Bishop & Co.' },
      { doc: "Appraisal (lender-ordered)", status: 'pending', date: '', notes: 'Scheduled Apr 18' },
      { doc: "HOI / hazard insurance quote", status: 'pending', date: '', notes: 'Awaiting quote' },
    ],
  },
  {
    title: 'Closing',
    items: [
      { doc: "Clear-to-close letter", status: 'pending', date: '', notes: 'Target May 1' },
      { doc: "Closing Disclosure (CD) signed", status: 'pending', date: '', notes: '3-day window' },
      { doc: "Final HUD / settlement statement", status: 'pending', date: '', notes: '' },
    ],
  },
];

// Built-in templates Kyle can apply to a file in one click
const LOAN_TEMPLATES = {
  'conventional': { label: 'Conventional 30-yr', adds: [], removes: [] },
  'fha': {
    label: 'FHA',
    adds: [{ section: 'Identity & Authorization', items: [
      { doc: 'FHA Amendatory Clause (signed)', status: 'pending', date: '', notes: 'Required for FHA' },
      { doc: 'FHA Informed Consumer Choice Disclosure', status: 'pending', date: '', notes: '' },
    ]}],
  },
  'va': {
    label: 'VA',
    adds: [{ section: 'Identity & Authorization', items: [
      { doc: 'Certificate of Eligibility (COE)', status: 'pending', date: '', notes: 'DD-214 if not on file' },
      { doc: 'VA Amendment to Contract', status: 'pending', date: '', notes: '' },
    ]}],
  },
  'jumbo': {
    label: 'Jumbo',
    adds: [{ section: 'Assets', items: [
      { doc: 'Liquid reserves — 12 months PITI', status: 'pending', date: '', notes: 'Jumbo requirement' },
      { doc: 'Investment account statements', status: 'pending', date: '', notes: 'Last 2 months' },
    ]}],
  },
  'self-employed': {
    label: 'Self-Employed',
    adds: [{ section: 'Income', items: [
      { doc: 'Business tax returns — last 2 years', status: 'pending', date: '', notes: '1120, 1120-S, or 1065' },
      { doc: 'Profit & Loss (YTD, CPA-prepared)', status: 'pending', date: '', notes: '' },
      { doc: 'CPA letter — business existence', status: 'pending', date: '', notes: '' },
      { doc: 'Business bank statements (2 mo)', status: 'pending', date: '', notes: '' },
    ]}],
  },
};

const LenderChecklist = ({ file, onBack }) => {
  const borrower = file || { name: 'Yoshimoto / Correa', addr: '94-1004 Kaukahi Pl. #K11, Waipahu' };

  const [sections, setSections] = React.useState(DEFAULT_SECTIONS);
  const [editMode, setEditMode] = React.useState(false);
  const [activeTemplate, setActiveTemplate] = React.useState('conventional');
  const [showTplMenu, setShowTplMenu] = React.useState(false);
  const [showSaveToast, setShowSaveToast] = React.useState(false);

  const applyTemplate = (key) => {
    const tpl = LOAN_TEMPLATES[key];
    setActiveTemplate(key);
    setShowTplMenu(false);
    if (!tpl || !tpl.adds.length) { setSections(DEFAULT_SECTIONS); return; }
    const next = DEFAULT_SECTIONS.map(s => ({ ...s, items: [...s.items] }));
    tpl.adds.forEach(add => {
      const sec = next.find(s => s.title === add.section);
      if (sec) {
        add.items.forEach(it => {
          if (!sec.items.some(x => x.doc === it.doc)) sec.items.push({ ...it, added: true });
        });
      }
    });
    setSections(next);
  };

  const updateItem = (si, ii, field, val) => {
    setSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, items: s.items.map((it, j) => j !== ii ? it : { ...it, [field]: val })
    }));
  };
  const removeItem = (si, ii) => {
    setSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, items: s.items.filter((_, j) => j !== ii)
    }));
  };
  const addItem = (si) => {
    setSections(prev => prev.map((s, i) => i !== si ? s : {
      ...s, items: [...s.items, { doc: 'New document', status: 'pending', date: '', notes: '', added: true }]
    }));
  };
  const updateSectionTitle = (si, val) => {
    setSections(prev => prev.map((s, i) => i !== si ? s : { ...s, title: val }));
  };
  const removeSection = (si) => {
    setSections(prev => prev.filter((_, i) => i !== si));
  };
  const addSection = () => {
    setSections(prev => [...prev, { title: 'New Section', items: [], added: true }]);
  };
  const saveAsTemplate = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2400);
  };

  const allItems = sections.flatMap(s => s.items);
  const received = allItems.filter(i => i.status === 'received').length;
  const pending = allItems.filter(i => i.status === 'pending' || i.status === 'partial').length;
  const na = allItems.filter(i => i.status === 'na').length;
  const pct = Math.round((received / (allItems.length - na)) * 100);

  const statusChip = (s) => {
    const map = {
      received: { bg: 'var(--status-green-bg)', c: 'var(--status-green)', label: 'Received' },
      partial: { bg: 'var(--status-amber-bg)', c: 'var(--status-amber)', label: 'Partial' },
      pending: { bg: 'var(--n-150)', c: 'var(--n-600)', label: 'Awaiting' },
      na: { bg: 'var(--n-150)', c: 'var(--n-400)', label: 'N/A' },
    };
    const m = map[s];
    return <span style={{ background: m.bg, color: m.c, padding: '3px 9px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2 }}>{m.label}</span>;
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
      <button onClick={onBack} style={{ fontSize: 11.5, color: 'var(--gem-blue)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>← Back to pipeline</button>

      <div style={{
        background: 'linear-gradient(135deg, #fff 0%, var(--gem-blue-light) 100%)',
        border: '2px solid var(--gem-blue)', borderRadius: 8,
        padding: '28px 32px', marginBottom: 20,
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--gem-blue)' }}>GEM Mortgage · Loan File</div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 32, letterSpacing: '-0.02em', margin: '4px 0 6px' }}>
            {borrower.name}
          </h1>
          <div style={{ fontSize: 14, color: 'var(--n-600)' }}>{borrower.addr} · Loan #DU-3849201 · Conventional 30-yr</div>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12 }}>
            <div><span style={{ color: 'var(--n-500)' }}>Loan Officer:</span> <strong>Kyle Murata</strong></div>
            <div><span style={{ color: 'var(--n-500)' }}>Processor:</span> <strong>Amy Tanaka</strong></div>
            <div><span style={{ color: 'var(--n-500)' }}>NMLS:</span> <strong>229811</strong></div>
          </div>
        </div>
        <div style={{ textAlign: 'center', minWidth: 140 }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 52, fontWeight: 500, color: 'var(--gem-blue)', lineHeight: 1, letterSpacing: '-0.02em' }}>{pct}%</div>
          <div className="eyebrow" style={{ color: 'var(--gem-blue)', marginTop: 6 }}>Docs received</div>
          <div style={{ fontSize: 11, color: 'var(--n-500)', marginTop: 6 }}>{received} of {allItems.length - na} · {pending} pending</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', position: 'relative' }}>
        <button className="btn btn-gem btn-sm">{Ic.send} Request missing docs</button>
        <button className="btn btn-ghost-gem btn-sm">{Ic.mail} Message borrower</button>
        <button className="btn btn-ghost-gem btn-sm">{Ic.doc} Send pre-approval letter</button>
        <div style={{ flex: 1 }} />

        {/* Template picker */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowTplMenu(v => !v)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--n-500)', textTransform: 'uppercase', fontWeight: 700 }}>Template</span>
            <strong>{LOAN_TEMPLATES[activeTemplate].label}</strong>
            <span style={{ fontSize: 9 }}>▾</span>
          </button>
          {showTplMenu && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 10,
              background: '#fff', border: '1px solid var(--n-200)', borderRadius: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)', minWidth: 220, padding: '6px 0',
            }}>
              <div style={{ padding: '8px 14px 6px', fontSize: 10, letterSpacing: '0.14em', color: 'var(--n-500)', textTransform: 'uppercase', fontWeight: 700 }}>Apply template</div>
              {Object.entries(LOAN_TEMPLATES).map(([k, t]) => (
                <button
                  key={k}
                  onClick={() => applyTemplate(k)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '9px 14px', fontSize: 13,
                    background: k === activeTemplate ? 'var(--gem-blue-light)' : 'transparent',
                    color: k === activeTemplate ? 'var(--gem-blue)' : 'var(--ulu-ink)',
                    fontWeight: k === activeTemplate ? 600 : 400,
                    border: 'none', textAlign: 'left', cursor: 'pointer',
                  }}
                >
                  <span>{t.label}</span>
                  {k === activeTemplate && <span style={{ fontSize: 11 }}>✓</span>}
                </button>
              ))}
              <div style={{ borderTop: '1px solid var(--n-150)', marginTop: 4, padding: '8px 14px' }}>
                <button
                  onClick={() => { saveAsTemplate(); setShowTplMenu(false); }}
                  style={{ fontSize: 12, color: 'var(--gem-blue)', fontWeight: 600, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  + Save current as template…
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className={editMode ? 'btn btn-gem btn-sm' : 'btn btn-ghost btn-sm'}
          onClick={() => setEditMode(v => !v)}
        >
          {editMode ? '✓ Done editing' : '✎ Customize'}
        </button>
      </div>

      {/* Edit-mode banner */}
      {editMode && (
        <div style={{
          background: 'var(--gem-blue-light)', border: '1px dashed var(--gem-blue)',
          padding: '10px 16px', borderRadius: 4, marginBottom: 14,
          fontSize: 12.5, color: 'var(--gem-blue)', display: 'flex', gap: 10, alignItems: 'center',
        }}>
          <strong>Editing checklist for {borrower.name}.</strong>
          <span style={{ color: 'var(--n-600)' }}>Rename sections, add/remove items, or save the final list as a reusable template.</span>
        </div>
      )}

      {/* Save-toast */}
      {showSaveToast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 400,
          background: 'var(--ulu-ink)', color: '#fff', padding: '14px 20px',
          borderRadius: 4, fontSize: 13, boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ color: 'var(--status-green)' }}>✓</span>
          Checklist saved as new template.
        </div>
      )}

      {/* Checklist sections */}
      {sections.map((s, si) => {
        const rec = s.items.filter(i => i.status === 'received').length;
        const total = s.items.filter(i => i.status !== 'na').length;
        return (
          <div key={si} style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 4, marginBottom: 12, overflow: 'hidden' }}>
            <div style={{
              padding: '14px 22px', borderBottom: '1px solid var(--n-150)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: 'var(--paper)', gap: 12,
            }}>
              {editMode ? (
                <input
                  value={s.title}
                  onChange={(e) => updateSectionTitle(si, e.target.value)}
                  style={{
                    fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600,
                    background: '#fff', border: '1px solid var(--gem-blue)',
                    padding: '4px 10px', borderRadius: 2, flex: 1, maxWidth: 400,
                  }}
                />
              ) : (
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 17, fontWeight: 600 }}>{s.title}</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--n-500)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {rec} / {total} received
                </div>
                {editMode && (
                  <button
                    onClick={() => removeSection(si)}
                    title="Remove section"
                    style={{ background: 'none', border: 'none', color: 'var(--ulu-red)', fontSize: 16, cursor: 'pointer', padding: '4px 8px' }}
                  >✕</button>
                )}
              </div>
            </div>
            {s.items.map((it, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: editMode ? '24px 2.2fr 110px 1.4fr 100px 32px' : '24px 2.2fr 110px 1.4fr 100px',
                gap: 16, padding: '12px 22px',
                borderBottom: i < s.items.length - 1 ? '1px solid var(--n-150)' : 'none',
                alignItems: 'center',
                opacity: it.status === 'na' ? 0.55 : 1,
                background: it.added ? 'rgba(29, 79, 145, 0.03)' : 'transparent',
              }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 3,
                  border: `2px solid ${it.status === 'received' ? 'var(--status-green)' : it.status === 'partial' ? 'var(--status-amber)' : 'var(--n-300)'}`,
                  background: it.status === 'received' ? 'var(--status-green)' : '#fff',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>{it.status === 'received' && '✓'}</div>

                {editMode ? (
                  <input
                    value={it.doc}
                    onChange={(e) => updateItem(si, i, 'doc', e.target.value)}
                    style={{ fontSize: 13.5, fontWeight: 500, border: '1px solid var(--n-200)', padding: '6px 10px', borderRadius: 2, width: '100%' }}
                  />
                ) : (
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: it.status === 'na' ? 'var(--n-400)' : 'var(--ulu-ink)' }}>
                    {it.doc}
                    {it.added && <span style={{ marginLeft: 8, fontSize: 9.5, color: 'var(--gem-blue)', fontWeight: 700, letterSpacing: '0.12em' }}>+ CUSTOM</span>}
                  </div>
                )}

                {editMode ? (
                  <select
                    value={it.status}
                    onChange={(e) => updateItem(si, i, 'status', e.target.value)}
                    style={{ fontSize: 11, padding: '5px 8px', border: '1px solid var(--n-200)', borderRadius: 2 }}
                  >
                    <option value="pending">Awaiting</option>
                    <option value="partial">Partial</option>
                    <option value="received">Received</option>
                    <option value="na">N/A</option>
                  </select>
                ) : (
                  <div>{statusChip(it.status)}</div>
                )}

                {editMode ? (
                  <input
                    value={it.notes}
                    onChange={(e) => updateItem(si, i, 'notes', e.target.value)}
                    placeholder="Notes for borrower / processor"
                    style={{ fontSize: 12, border: '1px solid var(--n-200)', padding: '6px 10px', borderRadius: 2, width: '100%' }}
                  />
                ) : (
                  <div style={{ fontSize: 12, color: 'var(--n-500)' }}>
                    {it.notes}
                    {it.date && <div style={{ fontSize: 10.5, marginTop: 2 }}>{it.date}</div>}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  {it.status === 'received' ? (
                    <button className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', fontSize: 10 }}>View</button>
                  ) : it.status !== 'na' ? (
                    <button className="btn btn-ghost-gem btn-sm" style={{ padding: '6px 12px', fontSize: 10 }}>{Ic.send} Request</button>
                  ) : null}
                </div>

                {editMode && (
                  <button
                    onClick={() => removeItem(si, i)}
                    title="Remove item"
                    style={{ background: 'none', border: 'none', color: 'var(--ulu-red)', fontSize: 15, cursor: 'pointer', padding: '4px 8px' }}
                  >✕</button>
                )}
              </div>
            ))}
            {editMode && (
              <button
                onClick={() => addItem(si)}
                style={{
                  width: '100%', padding: '10px 22px', textAlign: 'left',
                  background: 'var(--paper)', border: 'none', borderTop: '1px dashed var(--n-200)',
                  fontSize: 12, color: 'var(--gem-blue)', fontWeight: 600, cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >+ Add document to {s.title}</button>
            )}
          </div>
        );
      })}

      {editMode && (
        <button
          onClick={addSection}
          style={{
            width: '100%', padding: '14px 22px', marginTop: 4,
            background: '#fff', border: '1px dashed var(--gem-blue)', borderRadius: 4,
            fontSize: 13, color: 'var(--gem-blue)', fontWeight: 600, cursor: 'pointer',
            fontFamily: 'Fraunces, serif',
          }}
        >+ Add new section</button>
      )}

      {/* Notes */}
      <div style={{ marginTop: 20, background: 'var(--paper)', border: '1px solid var(--n-200)', borderLeft: '3px solid var(--gem-blue)', padding: '18px 22px', borderRadius: 4 }}>
        <div className="eyebrow" style={{ color: 'var(--gem-blue)' }}>LO Notes</div>
        <div style={{ fontSize: 13.5, color: 'var(--n-700)', marginTop: 8, lineHeight: 1.65 }}>
          Borrower is strong W-2 earner with $210k liquid in primary savings. DTI 32%, FICO 782.
          Missing Dec bank statement — emailed Apr 18. Appraisal ordered through Island Valuation Group,
          fee $800 collected. Awaiting HOI quote from State Farm — buyer to provide by Apr 22. Targeting
          CTC by May 2, close May 12 per contract.
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LenderPipeline, LenderChecklist });
