// ============================================
// SCREEN 10: ADMIN LOGIN
// ============================================
const ScreenAdminLogin = ({ onEnter }) => (
  <div style={{ minHeight: '100vh', background: 'var(--n-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
    <div style={{ width: 440, background: '#fff', borderRadius: 6, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.10)', borderTop: '4px solid var(--ulu-red)' }}>
      <div style={{ background: 'var(--ulu-red)', padding: '24px 32px', display: 'flex', justifyContent: 'center' }}>
        <UluLogo variant="white" size="sm" />
      </div>
      <div style={{ padding: '40px 44px' }}>
        <h1 className="h-1" style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 30 }}>Admin Login</h1>
        <p style={{ textAlign: 'center', color: 'var(--n-500)', margin: '0 0 28px', fontSize: 13 }}>
          Ulu Team staff access only
        </p>
        <div className="field" style={{ marginBottom: 14 }}>
          <label className="field-label">Email</label>
          <input className="field-input" defaultValue="daniel@uluteam.com" />
        </div>
        <div className="field" style={{ marginBottom: 20 }}>
          <label className="field-label">Password</label>
          <input className="field-input" type="password" defaultValue="••••••••••" />
        </div>
        <button className="btn btn-red btn-block btn-lg" onClick={onEnter}>Sign In</button>
        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: 'var(--n-500)', letterSpacing: '0.04em' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--ulu-red)', fontSize: 14, marginBottom: 4 }}>Onward.</div>
          KW Honolulu · RB-21303
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// ADMIN SHELL
// ============================================
const AdminShell = ({ tab, onTab, children }) => (
  <div style={{ minHeight: '100vh', background: 'var(--n-100)', display: 'flex', flexDirection: 'column' }}>
    <div className="admin-top">
      <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <UluLogo variant="white" size="sm" />
        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.25)' }} />
        <div className="tagline">Real Estate Services with Aloha</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Transaction Dashboard</div>
        <div className="role">Timeline Manager</div>
        <div style={{ width: 36, height: 36, borderRadius: 100, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>DU</div>
      </div>
    </div>
    <div className="admin-tabs">
      <div className={`admin-tab ${tab === 'timelines' ? 'active' : ''}`} onClick={() => onTab('timelines')}>Timelines</div>
      <div className={`admin-tab ${tab === 'clients' ? 'active' : ''}`} onClick={() => onTab('clients')}>Clients</div>
      <div className={`admin-tab`}>Documents</div>
      <div className={`admin-tab`}>Settings</div>
    </div>
    {children}
    <div className="onward-footer">
      <div className="onward">Onward.</div>
      THE ULU TEAM · Keller Williams Honolulu RB-21303 · 590 Farrington Hwy, Kapolei HI 96707
    </div>
  </div>
);

// ============================================
// SCREEN 11: ADMIN TIMELINES
// ============================================
const ScreenAdminTimelines = ({ onEdit }) => {
  const [banner, setBanner] = React.useState(true);
  const timelines = [
    { addr: '94-1004 Kaukahi Pl. #K11, Waipahu', buyer: 'Yoshimoto / Correa', acc: 'Apr 12, 2026', close: 'May 12, 2026', days: 20, updated: '2h ago', status: 'On Track' },
    { addr: '87-432 Moi Moi St, Mākaha', buyer: 'J. & K. Kealoha', acc: 'Apr 02, 2026', close: 'May 18, 2026', days: 34, updated: 'Yesterday', status: 'On Track' },
    { addr: '4521 Aukai Ave, Kāhala', buyer: 'R. Tanaka', acc: 'Feb 14, 2026', close: 'Apr 22, 2026', days: 6, updated: '4h ago', status: 'At Risk' },
    { addr: '321 Lewers St #2104, Waikīkī', buyer: 'M. Silva', acc: 'Apr 10, 2026', close: 'May 28, 2026', days: 44, updated: '2d ago', status: 'On Track' },
  ];

  return (
    <div style={{ flex: 1, padding: '24px 32px' }}>
      {banner && (
        <div style={{ background: 'var(--ulu-black)', color: '#fff', borderRadius: 4, padding: '22px 28px', marginBottom: 20, position: 'relative' }}>
          <button onClick={() => setBanner(false)} style={{ position: 'absolute', top: 14, right: 14, color: 'rgba(255,255,255,0.6)', width: 20, height: 20 }}>{Ic.x}</button>
          <div className="eyebrow" style={{ color: 'var(--ulu-red)' }}>Getting started</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 10 }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>Timelines</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.6 }}>
                One timeline per transaction. Set the acceptance date and every contingency auto-calculates from the ULU-TX-CHECKLIST-v2. Check off items as they complete — buyers see the milestone updates live in their portal.
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700 }}>Clients</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.6 }}>
                Add buyers and sellers, send magic-link invites, and drop in GEM Mortgage pre-approval requests. Each client links to a single timeline; buyers also get Kyle Murata's loan application.
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--n-500)', display: 'inline-flex' }}>{Ic.search}</span>
          <input className="field-input" placeholder="Search by address or buyer…" style={{ paddingLeft: 36, width: '100%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <select className="field-input" style={{ minWidth: 170 }}><option>Sort: Closing Date</option><option>Sort: Updated</option><option>Sort: Days to Close</option></select>
          <button className="btn btn-red" onClick={onEdit}>{Ic.plus} New Timeline</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {timelines.map((t, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--n-200)', borderLeft: `3px solid ${t.status === 'At Risk' ? 'var(--ulu-red)' : 'var(--status-green)'}`, borderRadius: 4, padding: '18px 22px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: 20, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700 }}>{t.addr}</div>
              <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 4 }}>Buyer: {t.buyer}</div>
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
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: t.days < 10 ? 'var(--ulu-red)' : 'var(--ulu-ink)', marginTop: 2, lineHeight: 1 }}>{t.days}</div>
            </div>
            <div>
              <div className="eyebrow">Updated</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{t.updated}</div>
              <span className={`chip ${t.status === 'At Risk' ? 'chip-red' : 'chip-green'}`} style={{ marginTop: 6, fontSize: 9.5 }}>{t.status}</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn btn-ghost btn-sm" onClick={onEdit}>{Ic.edit} Edit</button>
              <button className="btn btn-ghost btn-sm">{Ic.dup}</button>
              <button className="btn btn-ghost-red btn-sm">{Ic.trash}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SCREEN 12: ADMIN CLIENTS
// ============================================
const ScreenAdminClients = ({ onAdd }) => {
  const clients = [
    { name: 'Jordan Yoshimoto', email: 'j.yoshimoto@example.com', role: 'Buyer', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12' },
    { name: 'Kaulanakai Correa', email: 'k.correa@example.com', role: 'Buyer', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12' },
    { name: 'Jessie Kealoha', email: 'jessie.k@example.com', role: 'Buyer', timeline: '87-432 Moi Moi St', added: 'Apr 02' },
    { name: 'Kai Kealoha', email: 'kai.k@example.com', role: 'Buyer', timeline: '87-432 Moi Moi St', added: 'Apr 02' },
    { name: 'R. Tanaka', email: 'rtanaka@example.com', role: 'Buyer', timeline: '4521 Aukai Ave', added: 'Feb 14' },
    { name: 'Seller of Record (Kaukahi)', email: 'stacy.paris@remax.com', role: 'Seller', timeline: '94-1004 Kaukahi Pl. #K11', added: 'Apr 12' },
    { name: 'M. Silva', email: 'msilva@example.com', role: 'Buyer', timeline: 'Unlinked', added: 'Apr 10' },
  ];
  return (
    <div style={{ flex: 1, padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 className="h-2" style={{ margin: 0 }}>Clients</h2>
          <div style={{ fontSize: 13, color: 'var(--n-500)', marginTop: 4 }}>{clients.length} people · 1 unlinked · 2 pending invite</div>
        </div>
        <button className="btn btn-red" onClick={onAdd}>{Ic.plus} Add Client</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {clients.map((c, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 4, padding: '18px 22px', display: 'grid', gridTemplateColumns: '2fr 1fr 1.3fr 1fr auto', gap: 20, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 100, background: c.role === 'Buyer' ? 'linear-gradient(135deg, #3a1a1c, var(--ulu-red))' : 'var(--ulu-black)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 14 }}>
                {c.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--n-500)' }}>{c.email}</div>
              </div>
            </div>
            <div>
              <div className="eyebrow">Role</div>
              <span className={`chip ${c.role === 'Buyer' ? 'chip-red' : 'chip-black'}`} style={{ marginTop: 4 }}>{c.role}</span>
            </div>
            <div>
              <div className="eyebrow">Timeline</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: c.timeline === 'Unlinked' ? 'var(--n-500)' : 'var(--ulu-ink)' }}>
                {c.timeline === 'Unlinked' ? <span style={{ fontStyle: 'italic' }}>Unlinked</span> : c.timeline}
              </div>
            </div>
            <div>
              <div className="eyebrow">Added</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{c.added}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn btn-ghost-red btn-sm">Send Invite</button>
              {c.role === 'Buyer' && (
                <button className="btn btn-ghost-gem btn-sm" title="GEM Mortgage pre-approval">
                  <span style={{ color: 'var(--gem-blue)' }}>◆</span> Pre-Approval
                </button>
              )}
              <button className="btn btn-ghost-red btn-sm">{Ic.trash}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SCREEN 13: ADD CLIENT MODAL
// ============================================
const AddClientModal = ({ onClose }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }} onClick={onClose}>
    <div style={{ background: '#fff', borderRadius: 6, width: 720, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', borderTop: '3px solid var(--ulu-red)' }} onClick={e => e.stopPropagation()}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--n-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="eyebrow eyebrow-red">New Transaction Parties</div>
          <h2 className="h-2" style={{ margin: '4px 0 0' }}>Add Clients</h2>
        </div>
        <button onClick={onClose} style={{ width: 32, height: 32, color: 'var(--n-500)' }}>{Ic.x}</button>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {[
          { label: 'Buyer #1', req: 'Required', border: 'var(--ulu-red)', chip: 'chip-red' },
          { label: 'Buyer #2', req: 'Optional', border: 'var(--n-300)', chip: 'chip-grey' },
          { label: 'Seller #1', req: 'Required', border: 'var(--ulu-black)', chip: 'chip-black' },
          { label: 'Seller #2', req: 'Optional', border: 'var(--n-300)', chip: 'chip-grey' },
        ].map((p, i) => (
          <div key={i} style={{ borderLeft: `3px solid ${p.border}`, background: 'var(--n-50)', borderRadius: '0 3px 3px 0', padding: '16px 20px', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{p.label}</div>
              <span className={`chip ${p.chip}`} style={{ fontSize: 9.5 }}>{p.req}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input className="field-input" placeholder="Full Name" />
              <input className="field-input" placeholder="Email address" />
            </div>
          </div>
        ))}

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="field">
            <label className="field-label">Link to Timeline</label>
            <select className="field-input">
              <option>94-1004 Kaukahi Pl. #K11, Waipahu — Closes May 12</option>
              <option>87-432 Moi Moi St, Mākaha — Closes May 18</option>
              <option>— None (link later)</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: 'var(--ulu-red)' }} />
            Send portal invite email to all clients
          </label>
        </div>
      </div>

      <div style={{ padding: '18px 32px', borderTop: '1px solid var(--n-200)', display: 'flex', justifyContent: 'flex-end', gap: 10, background: 'var(--n-50)' }}>
        <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn-red" onClick={onClose}>Create Clients</button>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenAdminLogin, AdminShell, ScreenAdminTimelines, ScreenAdminClients, AddClientModal });
