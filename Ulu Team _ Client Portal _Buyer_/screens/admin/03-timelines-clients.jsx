// ============================================
// ADMIN TIMELINES v2 — with at-risk signals
// ============================================
const AdminTimelinesV2 = ({ roleKey, onEdit, onOpenClient }) => {
  const [filter, setFilter] = React.useState('all');

  const timelines = [
    {
      addr: '94-1004 Kaukahi Pl. #K11, Waipahu', buyer: 'Yoshimoto / Correa', seller: 'S. Paris (RE/MAX)',
      acc: 'Apr 12, 2026', close: 'May 12, 2026', days: 20, updated: '2h ago',
      phase: 'Title & Loan Commitment', progress: 64, status: 'on-track', tc: 'Kristina U.',
      signals: [],
    },
    {
      addr: '87-432 Moi Moi St, Mākaha', buyer: 'J. & K. Kealoha', seller: 'Estate of Lono',
      acc: 'Apr 02, 2026', close: 'May 18, 2026', days: 34, updated: 'Yesterday',
      phase: 'Title review', progress: 28, status: 'on-track', tc: 'Kristina U.',
      signals: [],
    },
    {
      addr: '4521 Aukai Ave, Kāhala', buyer: 'R. Tanaka', seller: 'K. Nakamura',
      acc: 'Feb 14, 2026', close: 'Apr 22, 2026', days: 6, updated: '4h ago',
      phase: 'Clear to Close', progress: 88, status: 'at-risk', tc: 'Kristina U.',
      signals: ['CTC overdue 2 days', 'HOI not bound'],
    },
    {
      addr: '321 Lewers St #2104, Waikīkī', buyer: 'M. Silva', seller: 'Tanaka Ohana Trust',
      acc: 'Apr 10, 2026', close: 'May 28, 2026', days: 44, updated: '2d ago',
      phase: 'Condo docs', progress: 18, status: 'attention', tc: 'Kristina U.',
      signals: ['Condo docs not yet reviewed'],
    },
  ];

  const filtered = filter === 'all' ? timelines : timelines.filter(t => t.status === filter);
  const statusStyles = {
    'on-track': { border: 'var(--status-green)', chip: 'chip-green', label: 'On Track' },
    'attention': { border: 'var(--status-amber)', chip: 'chip-amber', label: 'Needs Attention' },
    'at-risk': { border: 'var(--ulu-red)', chip: 'chip-red', label: 'At Risk' },
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="eyebrow eyebrow-red">Transactions</div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 34, letterSpacing: '-0.02em', margin: '4px 0 6px' }}>Timelines</h1>
          <div style={{ fontSize: 13.5, color: 'var(--n-500)' }}>
            {timelines.length} active · {timelines.filter(t => t.status === 'at-risk').length} at-risk · {timelines.filter(t => t.status === 'attention').length} need attention
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">{Ic.download} Export</button>
          <button className="btn btn-red" onClick={onEdit}>{Ic.plus} New Timeline</button>
        </div>
      </div>

      {/* Status filter pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[['all', `All (${timelines.length})`, 'var(--ulu-black)'],
          ['on-track', `On Track (${timelines.filter(t => t.status === 'on-track').length})`, 'var(--status-green)'],
          ['attention', `Attention (${timelines.filter(t => t.status === 'attention').length})`, 'var(--status-amber)'],
          ['at-risk', `At Risk (${timelines.filter(t => t.status === 'at-risk').length})`, 'var(--ulu-red)']].map(([k, l, c]) => (
          <button key={k} onClick={() => setFilter(k)} className="btn btn-sm" style={{
            background: filter === k ? c : '#fff',
            color: filter === k ? '#fff' : 'var(--ulu-ink)',
            border: `1px solid ${filter === k ? c : 'var(--n-300)'}`,
          }}>{l}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', width: 240 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--n-500)', display: 'inline-flex' }}>{Ic.search}</span>
          <input className="field-input" placeholder="Search address or buyer…" style={{ paddingLeft: 32, fontSize: 13 }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((t, i) => {
          const s = statusStyles[t.status];
          return (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--n-200)',
              borderLeft: `3px solid ${s.border}`, borderRadius: 4,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr 1fr auto', gap: 20, alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{t.addr}</div>
                    <span className={`chip ${s.chip}`} style={{ fontSize: 9.5 }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--n-500)' }}>
                    Buyer: <strong style={{ color: 'var(--ulu-ink)' }}>{t.buyer}</strong> · Seller: {t.seller} · TC: {t.tc}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                      <span style={{ color: 'var(--n-500)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: 9.5 }}>{t.phase}</span>
                      <span style={{ fontWeight: 700 }}>{t.progress}%</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--n-150)', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ width: `${t.progress}%`, height: '100%', background: s.border }} />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="eyebrow">Accepted</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{t.acc}</div>
                </div>
                <div>
                  <div className="eyebrow">Closing</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{t.close}</div>
                </div>
                <div>
                  <div className="eyebrow">Days</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 500, color: t.days < 10 ? 'var(--ulu-red)' : 'var(--ulu-ink)', marginTop: 2, lineHeight: 1, letterSpacing: '-0.02em' }}>{t.days}</div>
                </div>
                <div>
                  <div className="eyebrow">Updated</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{t.updated}</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-ghost btn-sm" onClick={onEdit}>{Ic.edit} Edit</button>
                  <button className="btn btn-ghost btn-sm">{Ic.dup}</button>
                </div>
              </div>

              {t.signals.length > 0 && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--n-150)', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {t.signals.map((sig, j) => (
                    <div key={j} style={{
                      padding: '5px 12px',
                      background: t.status === 'at-risk' ? 'var(--ulu-red-soft)' : 'var(--status-amber-bg)',
                      color: t.status === 'at-risk' ? 'var(--ulu-red)' : 'var(--status-amber)',
                      fontSize: 11.5, fontWeight: 600, borderRadius: 2,
                    }}>⚠ {sig}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// ADMIN CLIENTS v2 — filters + GEM invite state
// ============================================
const AdminClientsV2 = ({ onAdd }) => {
  const [roleFilter, setRoleFilter] = React.useState('all');

  const clients = [
    { name: 'Jordan Yoshimoto', email: 'j.yoshimoto@example.com', role: 'Buyer', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12', portal: 'active', gem: 'active' },
    { name: 'Kaulanakai Correa', email: 'k.correa@example.com', role: 'Buyer', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12', portal: 'active', gem: 'active' },
    { name: 'Jessie Kealoha', email: 'jessie.k@example.com', role: 'Buyer', timeline: '87-432 Moi Moi St', added: 'Apr 02', portal: 'active', gem: 'pending' },
    { name: 'Kai Kealoha', email: 'kai.k@example.com', role: 'Buyer', timeline: '87-432 Moi Moi St', added: 'Apr 02', portal: 'invited', gem: 'pending' },
    { name: 'R. Tanaka', email: 'rtanaka@example.com', role: 'Buyer', timeline: '4521 Aukai Ave', added: 'Feb 14', portal: 'active', gem: 'active' },
    { name: 'Stacy L. Paris (Seller Agent)', email: 'stacy.paris@remax.com', role: 'Seller Agent', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12', portal: 'active', gem: null },
    { name: 'M. Silva', email: 'msilva@example.com', role: 'Buyer', timeline: 'Unlinked', added: 'Apr 10', portal: 'invited', gem: null },
    { name: 'Tanaka Ohana Trust', email: 'trustee@tanakaohana.com', role: 'Seller', timeline: '321 Lewers #2104', added: 'Apr 10', portal: 'invited', gem: null },
  ];

  const filtered = roleFilter === 'all' ? clients : clients.filter(c => c.role.toLowerCase() === roleFilter);

  const portalPill = (s) => {
    const m = {
      active: { bg: 'var(--status-green-bg)', c: 'var(--status-green)', label: 'Active' },
      invited: { bg: 'var(--status-amber-bg)', c: 'var(--status-amber)', label: 'Invited' },
    }[s];
    return <span style={{ background: m.bg, color: m.c, padding: '3px 9px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2 }}>{m.label}</span>;
  };

  const gemPill = (s) => {
    if (!s) return <span style={{ fontSize: 11, color: 'var(--n-400)', fontStyle: 'italic' }}>—</span>;
    const m = {
      active: { bg: 'var(--gem-blue)', c: '#fff', label: 'Pre-Approved' },
      pending: { bg: 'var(--gem-blue-light)', c: 'var(--gem-blue)', label: 'In Progress' },
    }[s];
    return <span style={{ background: m.bg, color: m.c, padding: '3px 9px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: 2 }}>◆ {m.label}</span>;
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
        <div>
          <div className="eyebrow eyebrow-red">Parties to Transactions</div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 34, letterSpacing: '-0.02em', margin: '4px 0 6px' }}>Clients</h1>
          <div style={{ fontSize: 13.5, color: 'var(--n-500)' }}>
            {clients.length} people · {clients.filter(c => c.portal === 'invited').length} pending invite · {clients.filter(c => c.gem === 'pending').length} GEM apps in progress
          </div>
        </div>
        <button className="btn btn-red" onClick={onAdd}>{Ic.plus} Add Client</button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {[['all', `All (${clients.length})`], ['buyer', `Buyers (${clients.filter(c => c.role === 'Buyer').length})`], ['seller', `Sellers (${clients.filter(c => c.role === 'Seller').length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setRoleFilter(k)} className="btn btn-sm" style={{
            background: roleFilter === k ? 'var(--ulu-black)' : '#fff',
            color: roleFilter === k ? '#fff' : 'var(--ulu-ink)',
            border: '1px solid var(--n-300)',
          }}>{l}</button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', width: 260 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--n-500)', display: 'inline-flex' }}>{Ic.search}</span>
          <input className="field-input" placeholder="Search name or email…" style={{ paddingLeft: 32, fontSize: 13 }} />
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.4fr 1fr 1.2fr 180px',
          gap: 18, padding: '14px 22px', background: 'var(--paper)',
          borderBottom: '1px solid var(--n-200)',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--n-500)',
          textAlign: 'left',
        }}>
          <div>Name · Email</div>
          <div>Role</div>
          <div>Timeline</div>
          <div>Portal</div>
          <div>GEM Mortgage</div>
          <div style={{ textAlign: 'right' }}>Actions</div>
        </div>

        {filtered.map((c, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.4fr 1fr 1.2fr 180px',
            gap: 18, padding: '16px 22px',
            borderBottom: i < filtered.length - 1 ? '1px solid var(--n-150)' : 'none',
            alignItems: 'center',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 100, flex: 'none',
                background: c.role === 'Buyer' ? 'linear-gradient(135deg, #3a1a1c, var(--ulu-red))' : 'var(--ulu-black)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 14,
              }}>{c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--n-500)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.email}</div>
              </div>
            </div>
            <div style={{ textAlign: 'left' }}><span className={`chip ${c.role === 'Buyer' ? 'chip-red' : 'chip-black'}`}>{c.role}</span></div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.timeline === 'Unlinked' ? 'var(--n-500)' : 'var(--ulu-ink)', textAlign: 'left' }}>
              {c.timeline === 'Unlinked' ? <em>Unlinked</em> : c.timeline}
            </div>
            <div style={{ textAlign: 'left' }}>{portalPill(c.portal)}</div>
            <div style={{ textAlign: 'left' }}>{c.role === 'Buyer' ? gemPill(c.gem) : <span style={{ fontSize: 11, color: 'var(--n-400)', fontStyle: 'italic' }}>—</span>}</div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
              {c.portal === 'invited' && <button className="btn btn-ghost-red btn-sm">Resend</button>}
              {c.role === 'Buyer' && !c.gem && <button className="btn btn-ghost-gem btn-sm">◆ GEM</button>}
              <button className="btn btn-ghost btn-sm">Open</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// ADD CLIENT MODAL v2 — property + contract upload
// ============================================
const AddClientModalV2 = ({ onClose }) => {
  const [step, setStep] = React.useState(1);
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }} onClick={onClose}>
      <div style={{ background: '#fff', borderRadius: 6, width: 820, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', borderTop: '3px solid var(--ulu-red)' }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--n-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow eyebrow-red">New Transaction</div>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 26, margin: '4px 0 0' }}>Set up a new file</h2>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, color: 'var(--n-500)' }}>{Ic.x}</button>
        </div>

        {/* stepper */}
        <div style={{ display: 'flex', padding: '18px 32px', borderBottom: '1px solid var(--n-150)', background: 'var(--paper)', gap: 10 }}>
          {['Property', 'Parties', 'Contract', 'Invites'].map((s, i) => (
            <div key={i} onClick={() => setStep(i + 1)} style={{
              flex: 1, padding: '10px 14px', cursor: 'pointer',
              borderRadius: 3, display: 'flex', alignItems: 'center', gap: 10,
              background: step === i + 1 ? '#fff' : 'transparent',
              border: `1px solid ${step === i + 1 ? 'var(--ulu-red)' : 'transparent'}`,
            }}>
              <div style={{
                width: 22, height: 22, borderRadius: 100,
                background: step > i + 1 ? 'var(--status-green)' : step === i + 1 ? 'var(--ulu-red)' : 'var(--n-200)',
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>{step > i + 1 ? '✓' : i + 1}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: step === i + 1 ? 'var(--ulu-red)' : 'var(--n-500)' }}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '28px 32px', minHeight: 340 }}>
          {step === 1 && (
            <div>
              <div className="eyebrow">Step 1</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, margin: '4px 0 20px' }}>Property details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="field" style={{ gridColumn: '1 / -1' }}><label className="field-label">Address</label><input className="field-input" placeholder="e.g. 94-1004 Kaukahi Pl. #K11, Waipahu HI 9679714" /></div>
                <div className="field"><label className="field-label">TMK</label><input className="field-input" placeholder="1-2-3-456-789" /></div>
                <div className="field"><label className="field-label">Property Type</label><select className="field-input"><option>Single-family home</option><option>Condo</option><option>Townhome</option><option>Multi-family</option><option>Land</option></select></div>
                <div className="field"><label className="field-label">Purchase Price</label><input className="field-input" placeholder="$1,350,000" /></div>
                <div className="field"><label className="field-label">MLS #</label><input className="field-input" placeholder="202508347" /></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="eyebrow">Step 2</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, margin: '4px 0 20px' }}>Parties to transaction</h3>
              {[
                { label: 'Buyer #1', req: 'Required', border: 'var(--ulu-red)', chip: 'chip-red' },
                { label: 'Buyer #2', req: 'Optional', border: 'var(--n-300)', chip: 'chip-grey' },
                { label: 'Seller #1', req: 'Required', border: 'var(--ulu-black)', chip: 'chip-black' },
              ].map((p, i) => (
                <div key={i} style={{ borderLeft: `3px solid ${p.border}`, background: 'var(--n-50)', padding: '14px 18px', marginBottom: 10, borderRadius: '0 3px 3px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.label}</div>
                    <span className={`chip ${p.chip}`} style={{ fontSize: 9.5 }}>{p.req}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input className="field-input" placeholder="Full name" />
                    <input className="field-input" placeholder="Email" />
                  </div>
                </div>
              ))}
              <button style={{ color: 'var(--ulu-red)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>+ Add another party</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="eyebrow">Step 3</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, margin: '4px 0 6px' }}>Fully-executed contract</h3>
              <div style={{ fontSize: 13, color: 'var(--n-500)', marginBottom: 18 }}>Drop the signed DROA + addendums here. Acceptance date will auto-detect.</div>
              <div style={{
                border: '2px dashed var(--n-300)', borderRadius: 8,
                background: 'var(--paper)', padding: '40px 24px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 34, marginBottom: 8 }}>📄</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600 }}>Drop contract PDF</div>
                <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 4 }}>or click to browse</div>
                <button className="btn btn-ghost-red btn-sm" style={{ marginTop: 16 }}>Choose file</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
                <div className="field"><label className="field-label">Acceptance Date</label><input className="field-input" defaultValue="Apr 18, 2026" /></div>
                <div className="field"><label className="field-label">Closing Date</label><input className="field-input" defaultValue="May 28, 2026" /></div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className="eyebrow">Step 4</div>
              <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: 22, margin: '4px 0 20px' }}>Send invites</h3>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--n-200)', borderRadius: 4, padding: 18, marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 3, width: 18, height: 18, accentColor: 'var(--ulu-red)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Buyer portal invites</div>
                    <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>Magic-link access to their transaction timeline and documents</div>
                  </div>
                </label>
              </div>
              <div style={{ background: 'var(--gem-blue-light)', border: '1px solid var(--gem-blue-border)', borderRadius: 4, padding: 18, marginBottom: 12 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked style={{ marginTop: 3, width: 18, height: 18, accentColor: 'var(--gem-blue)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--gem-blue)' }}>◆ GEM Mortgage intake (Kyle Murata)</div>
                    <div style={{ fontSize: 12, color: 'var(--n-600)', marginTop: 2 }}>Buyer gets GEM's secure doc-upload link + Kyle begins pre-approval checklist</div>
                  </div>
                </label>
              </div>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--n-200)', borderRadius: 4, padding: 18 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ marginTop: 3, width: 18, height: 18, accentColor: 'var(--ulu-red)' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>Seller portal invite</div>
                    <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>Read-only milestone view for the other side</div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '18px 32px', borderTop: '1px solid var(--n-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--n-50)' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 1 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Back</button>}
            {step < 4 ? (
              <button className="btn btn-red" onClick={() => setStep(step + 1)}>Continue →</button>
            ) : (
              <button className="btn btn-red" onClick={onClose}>Create file & send invites</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PLACEHOLDER SCREENS
// ============================================
const AdminPlaceholder = ({ title, desc, accent = 'var(--ulu-red)' }) => (
  <div style={{ padding: '60px 32px', maxWidth: 900, margin: '0 auto' }}>
    <div className="eyebrow" style={{ color: accent }}>Coming soon</div>
    <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 40, letterSpacing: '-0.02em', margin: '4px 0 10px' }}>{title}</h1>
    <p style={{ fontSize: 15, color: 'var(--n-500)', maxWidth: 620, lineHeight: 1.6 }}>{desc}</p>
    <div style={{
      marginTop: 32, background: '#fff', border: `1px dashed var(--n-300)`,
      borderRadius: 6, padding: '60px 24px', textAlign: 'center', color: 'var(--n-400)',
    }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontStyle: 'italic', color: accent }}>Onward.</div>
      <div style={{ fontSize: 13, marginTop: 8 }}>Screen will be wired up in the next pass.</div>
    </div>
  </div>
);

const AdminDocuments = () => <AdminPlaceholder title="Document Library" desc="Central archive of every signed document across every active and past transaction. Search by client, property, or document type. Version history tracked." />;
const AdminMessages = ({ isKyle }) => <AdminPlaceholder title="Unified Inbox" desc="Every message from every client — portal DMs, emails (via kyle@ / team@), and system notifications. Threaded per file with labels for transaction phase." accent={isKyle ? 'var(--gem-blue)' : 'var(--ulu-red)'} />;
const AdminAnalytics = () => <AdminPlaceholder title="Performance Analytics" desc="Close rate, average days-to-close, client satisfaction scores, pipeline value, lender performance comparisons, and team productivity — all in one dashboard." />;
const AdminSettings = ({ isKyle }) => <AdminPlaceholder title="Settings" desc="Team members, timeline templates, email templates, branding, integrations (MLS, Title Guaranty, DocuSign, GEM API), and billing." accent={isKyle ? 'var(--gem-blue)' : 'var(--ulu-red)'} />;

Object.assign(window, { AdminTimelinesV2, AdminClientsV2, AddClientModalV2, AdminDocuments, AdminMessages, AdminAnalytics, AdminSettings });
