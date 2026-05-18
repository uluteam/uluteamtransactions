// ============================================
// ADMIN V2 — Role-based: TM / Kyle / Ulu Team
// ============================================

const ROLES = {
  tm: {
    key: 'tm',
    name: 'Transaction Manager',
    tagline: 'Manage timelines and client milestones',
    accent: 'var(--ulu-red)',
    user: { name: 'Kristina Ulu', initials: 'KU', title: 'Transaction Manager' },
    tabs: ['dashboard', 'timelines', 'clients', 'documents'],
  },
  kyle: {
    key: 'kyle',
    name: 'Lender — GEM Mortgage',
    tagline: 'Kyle Murata · Senior Loan Officer',
    accent: 'var(--gem-blue)',
    user: { name: 'Kyle Murata', initials: 'KM', title: 'GEM Mortgage · NMLS #229811' },
    tabs: ['dashboard', 'pipeline', 'checklists', 'messages'],
  },
  ulu: {
    key: 'ulu',
    name: 'Ulu Team (Shared Account)',
    tagline: 'Team-wide view · all active transactions',
    accent: 'var(--ulu-red)',
    user: { name: 'Ulu Team', initials: 'UT', title: 'Shared Account · KW Honolulu' },
    tabs: ['dashboard', 'timelines', 'clients', 'documents'],
  },
};

// ---------------------------------------------
// LOGIN — role picker
// ---------------------------------------------
const AdminLoginV2 = ({ onEnter }) => {
  const [role, setRole] = React.useState('tm');
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FAF6F0 0%, #F3ECE0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, position: 'relative' }}>
      <div style={{ position: 'absolute', top: -40, right: -40, transform: 'rotate(15deg)' }}>
        <UluLeaf size={320} color="rgba(179,32,37,0.05)" />
      </div>
      <div style={{ width: 560, background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 30px 80px rgba(40,20,10,0.12)', zIndex: 1 }}>
        <div style={{ background: 'var(--ulu-black)', padding: '28px 36px', borderBottom: '3px solid var(--ulu-red)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <UluLogo variant="white" size="sm" />
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Staff Portal</div>
        </div>

        <div style={{ padding: '40px 44px' }}>
          <div className="eyebrow eyebrow-red">Sign in as</div>
          <h2 className="h-2" style={{ margin: '6px 0 22px', fontSize: 30 }}>Choose your portal.</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {Object.values(ROLES).map(r => (
              <label key={r.key} onClick={() => setRole(r.key)} style={{
                display: 'grid', gridTemplateColumns: '48px 1fr 18px', gap: 16, alignItems: 'center',
                padding: '16px 18px',
                border: `1.5px solid ${role === r.key ? r.accent : 'var(--n-200)'}`,
                background: role === r.key ? (r.key === 'kyle' ? 'var(--gem-blue-light)' : 'var(--paper)') : '#fff',
                borderRadius: 8, cursor: 'pointer',
                boxShadow: role === r.key ? `0 0 0 3px ${r.key === 'kyle' ? 'rgba(0,79,163,0.12)' : 'rgba(179,32,37,0.12)'}` : 'none',
                transition: 'all .14s',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 100, background: r.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 17 }}>
                  {r.user.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 17, letterSpacing: '-0.005em' }}>{r.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--n-500)', marginTop: 2 }}>{r.tagline}</div>
                </div>
                <div style={{
                  width: 18, height: 18, borderRadius: 100,
                  border: `2px solid ${role === r.key ? r.accent : 'var(--n-300)'}`,
                  background: '#fff', position: 'relative',
                }}>
                  {role === r.key && <div style={{ position: 'absolute', inset: 3, borderRadius: 100, background: r.accent }} />}
                </div>
              </label>
            ))}
          </div>

          <div className="field" style={{ marginBottom: 14 }}>
            <label className="field-label">Email</label>
            <input className="field-input" defaultValue={role === 'kyle' ? 'kmurata@gemcorp.com' : role === 'ulu' ? 'team@uluteam.com' : 'kristina@uluteam.com'} />
          </div>
          <div className="field" style={{ marginBottom: 22 }}>
            <label className="field-label">Password</label>
            <input className="field-input" type="password" defaultValue="••••••••••" />
          </div>
          <button className="btn btn-red btn-block btn-lg" onClick={() => onEnter(role)}>
            Sign in {Ic.arrowR}
          </button>
          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: 'var(--n-500)' }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'var(--ulu-red)', fontSize: 16 }}>Onward.</div>
            KW Honolulu · RB-21303
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------
// SHELL — header + tabs per role
// ---------------------------------------------
const AdminShellV2 = ({ roleKey, tab, onTab, onLogout, children }) => {
  const role = ROLES[roleKey];
  const isKyle = roleKey === 'kyle';
  const tabLabels = {
    dashboard: 'Dashboard', timelines: 'Timelines', clients: 'Clients',
    documents: 'Documents', messages: 'Messages', analytics: 'Analytics',
    settings: 'Settings', pipeline: 'Pipeline', checklists: 'Doc Checklists',
  };
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: isKyle ? 'var(--gem-blue)' : 'var(--ulu-black)',
        color: '#fff', padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: isKyle ? '3px solid var(--gem-blue-dark)' : '3px solid var(--ulu-red)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {isKyle ? (
            <div style={{ background: '#fff', padding: '8px 14px', borderRadius: 4 }}>
              <GemLogo size="sm" />
            </div>
          ) : (
            <UluLogo variant="white" size="sm" />
          )}
          <div style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
            {role.name}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{ color: 'rgba(255,255,255,0.75)', width: 20, height: 20 }}>{Ic.bell}</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 12px 4px 4px', background: 'rgba(255,255,255,0.08)', borderRadius: 100 }}>
            <div style={{ width: 30, height: 30, borderRadius: 100, background: isKyle ? 'var(--gem-blue-dark)' : 'var(--ulu-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700 }}>{role.user.initials}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{role.user.name}</div>
          </div>
          <button onClick={onLogout} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>Sign out</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 2, background: '#fff', borderBottom: '1px solid var(--n-200)', padding: '0 20px' }}>
        {role.tabs.map(t => (
          <div key={t} onClick={() => onTab(t)} style={{
            padding: '16px 18px 14px',
            fontSize: 11.5, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: tab === t ? (isKyle ? 'var(--gem-blue)' : 'var(--ulu-red)') : 'var(--n-500)',
            borderBottom: `2px solid ${tab === t ? (isKyle ? 'var(--gem-blue)' : 'var(--ulu-red)') : 'transparent'}`,
            marginBottom: -1, cursor: 'pointer',
          }}>
            {tabLabels[t]}
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }}>{children}</div>

      <div style={{ padding: '28px 32px', textAlign: 'center', borderTop: '1px solid var(--n-200)', color: 'var(--n-500)', fontSize: 12, background: '#fff' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 20, color: 'var(--ulu-red)', marginBottom: 4 }}>Onward.</div>
        THE ULU TEAM · Keller Williams Honolulu RB-21303
      </div>
    </div>
  );
};

Object.assign(window, { AdminLoginV2, AdminShellV2, ROLES });
