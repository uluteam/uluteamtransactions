// Sidebar for buyer portal + shared parts

const Sidebar = ({ active, onNav }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: Ic.home },
    { id: 'preapproval', label: 'Pre-Approval', icon: Ic.gem },
    { id: 'transaction', label: 'Transaction', icon: Ic.tx },
    { id: 'documents', label: 'Documents', icon: Ic.doc },
    { id: 'calendar', label: 'Calendar', icon: Ic.cal },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <UluLogo variant="color" size="sm" />
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Portal</div>
        {items.map(it => (
          <a key={it.id}
             className={`nav-item ${active === it.id ? 'active' : ''}`}
             onClick={() => onNav && onNav(it.id)}>
            <span className="ico">{it.icon}</span>
            <span>{it.label}</span>
          </a>
        ))}
        <div className="sidebar-section-title" style={{ marginTop: 12 }}>Account</div>
        <a className={`nav-item ${active === 'settings' ? 'active' : ''}`}
           onClick={() => onNav && onNav('settings')}>
          <span className="ico">{Ic.gear}</span><span>Settings</span>
        </a>
      </nav>
      <div className="sidebar-foot">
        <strong>Kristina Ulu</strong> · Team Leader<br />
        RS-83724 · KW Honolulu<br />
        <a href="mailto:kristina@uluteam.com" style={{ color: 'var(--ulu-red)', textDecoration: 'none', fontSize: 12 }}>kristina@uluteam.com</a>
      </div>
    </aside>
  );
};

// Photo placeholder — abstract Hawaiian shapes
const PropertyPhoto = ({ kind = 0, children }) => {
  const palettes = [
    ['#3a5a6a', '#7da8b8'],
    ['#8a5a3c', '#d89968'],
    ['#2e3a4a', '#6a8aa2'],
    ['#5a6f4a', '#a8c088'],
    ['#72403a', '#c8856a'],
    ['#3e4d5c', '#94acc2'],
  ];
  const [a, b] = palettes[kind % palettes.length];
  return (
    <div style={{
      aspectRatio: '4 / 3',
      background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* mountain silhouette */}
        <path d={`M0 ${200 + (kind * 11) % 30} L80 ${140} L160 ${180} L240 ${120} L320 ${160} L400 ${130} L400 300 L0 300 Z`} fill="rgba(0,0,0,0.3)" />
        <path d={`M0 ${240} L60 ${220} L140 ${245} L220 ${210} L300 ${240} L380 ${225} L400 ${235} L400 300 L0 300 Z`} fill="rgba(0,0,0,0.5)" />
        {/* sun */}
        <circle cx={290 + kind * 8} cy="80" r="28" fill="rgba(255,240,200,0.4)" />
        {/* palm hint */}
        <path d="M50 300 Q 55 250, 50 200 M 50 200 Q 30 190, 20 200 M 50 200 Q 70 185, 80 195 M 50 200 Q 45 175, 55 165" 
              stroke="rgba(0,0,0,0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      {children && (
        <div style={{ position: 'absolute', inset: 0, padding: 14, display: 'flex', alignItems: 'flex-end' }}>
          {children}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { Sidebar, PropertyPhoto });
