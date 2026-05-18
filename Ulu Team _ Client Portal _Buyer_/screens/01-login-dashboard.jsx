// ============================================
// SCREEN 1: LOGIN — editorial revamp
// ============================================
const ScreenLogin = ({ onEnter }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FAF6F0 0%, #F3ECE0 100%)',
    display: 'flex', alignItems: 'stretch',
    position: 'relative',
  }}>
    {/* Decorative leaf */}
    <div style={{ position: 'absolute', top: -40, right: -40, transform: 'rotate(15deg)' }}>
      <UluLeaf size={360} color="rgba(179,32,37,0.05)" />
    </div>
    <div style={{ position: 'absolute', bottom: -80, left: -60, transform: 'rotate(-30deg)' }}>
      <UluLeaf size={320} color="rgba(15,14,12,0.04)" />
    </div>

    {/* Left: brand panel */}
    <div style={{ flex: 1, padding: '60px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
      <UluLogo size="md" />
      <div>
        <div className="eyebrow eyebrow-red" style={{ marginBottom: 20 }}>Client Portal</div>
        <h1 style={{
          fontFamily: "Fraunces, 'Playfair Display', serif",
          fontSize: 80, fontWeight: 400, margin: 0, lineHeight: 0.95,
          letterSpacing: '-0.035em',
          fontVariationSettings: '"opsz" 144, "SOFT" 100',
        }}>
          Real Estate<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--ulu-red)', fontWeight: 300 }}>Services</span><br/>
          with Aloha.
        </h1>
        <div className="rule" style={{ marginTop: 28 }} />
        <p style={{ fontSize: 16, color: 'var(--n-600)', maxWidth: 420, marginTop: 24, lineHeight: 1.65 }}>
          Every milestone and update for your Oʻahu home purchase — in one quiet, organized place.
        </p>
      </div>
      <div style={{ fontSize: 11, color: 'var(--n-500)', letterSpacing: '0.12em' }}>
        KELLER WILLIAMS HONOLULU · RB-21303
      </div>
    </div>

    {/* Right: sign-in card */}
    <div style={{ width: 480, background: '#fff', padding: '80px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '-20px 0 60px rgba(40,20,10,0.06)', zIndex: 1 }}>
      <div className="eyebrow eyebrow-red">Welcome back</div>
      <h2 className="h-2" style={{ margin: '12px 0 10px', fontSize: 36 }}>
        Sign in.
      </h2>
      <p style={{ fontSize: 14, color: 'var(--n-500)', margin: '0 0 32px' }}>
        We'll send a secure link to your email. No password needed.
      </p>

      <div className="field" style={{ marginBottom: 20 }}>
        <label className="field-label">Email Address</label>
        <input className="field-input" defaultValue="buyer@example.com" />
      </div>

      <button className="btn btn-red btn-block btn-lg">
        Send Login Link {Ic.arrowR}
      </button>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        margin: '32px 0 18px',
        color: 'var(--n-400)', fontSize: 10.5, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--n-200)' }} />
        Demo Mode
        <div style={{ flex: 1, height: 1, background: 'var(--n-200)' }} />
      </div>

      <button className="btn btn-ghost btn-block" onClick={onEnter}>
        Enter as Demo Buyer
      </button>

      <div style={{ marginTop: 48, textAlign: 'center' }}>
        <div style={{ fontFamily: "Fraunces, 'Playfair Display', serif", fontStyle: 'italic', color: 'var(--ulu-red)', fontSize: 24, fontWeight: 400 }}>
          Onward.
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// SCREEN 2: DASHBOARD — 3 variations via tweaks
// Variant A: Action-first (recommended)
// Variant B: Closing countdown hero
// Variant C: Property-focused
// ============================================

const DashboardActions = [
  { title: 'Review & sign seller disclosures', sub: 'SRPDS packet — 6 items to initial', due: 'Today', urgent: true, done: false },
  { title: 'Verify homeowner insurance quote', sub: 'Island Insurance bound policy needed by Apr 25', due: 'In 7 days', urgent: false, done: false },
  { title: 'Upload last 2 bank statements', sub: 'GEM needs for final underwriting conditions', due: 'In 3 days', urgent: true, done: false },
  { title: 'Confirm final walkthrough time', sub: 'Daniel suggested Apr 30, 3:00 PM', due: 'Flexible', urgent: false, done: false },
  { title: 'Upload government-issued ID', sub: 'Driver\'s license or passport', due: 'Complete', urgent: false, done: true },
];

const ScreenDashboard = ({ onNav, variant = 'actions' }) => (
  <div className="page">
    <div className="page-head">
      <div>
        <div className="eyebrow eyebrow-red">Monday, April 20</div>
        <h1 className="h-1" style={{ marginTop: 10 }}>
          Aloha, <span style={{ fontStyle: 'italic', color: 'var(--ulu-red)' }}>Jordan & Kaulanakai</span>.
        </h1>
        <div className="page-sub">94-1004 Kaukahi Pl. #K11, Waipahu · Closing <strong style={{ color: 'var(--ulu-ink)' }}>Tue, May 12</strong> · <span style={{ color: 'var(--ulu-red)', fontWeight: 600 }}>20 days to go</span></div>
      </div>
      <a href="mailto:kristina@uluteam.com" style={{ flexShrink: 0, whiteSpace: 'nowrap', fontSize: 13, color: 'var(--n-600)', textDecoration: 'none', alignSelf: 'center' }}>
        Questions? <strong style={{ color: 'var(--ulu-red)' }}>kristina@uluteam.com</strong>
      </a>
    </div>

    {/* VARIANT A — Action list hero */}
    {variant === 'actions' && (
      <>
        <div className="action-hero mb-24">
          <div className="action-hero-head">
            <div>
              <div className="eyebrow eyebrow-red">What you need to do</div>
              <h2 className="h-2" style={{ margin: '8px 0 0' }}>Today's focus.</h2>
              <p style={{ color: 'var(--n-500)', fontSize: 14, marginTop: 6 }}>
                <strong>3 tasks</strong> waiting on you — two are time-sensitive. The rest we handle behind the scenes.
              </p>
            </div>
            <div style={{ textAlign: 'right', flex: 'none' }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 52, fontWeight: 500, color: 'var(--ulu-red)', letterSpacing: '-0.03em', lineHeight: 1 }}>3</div>
              <div className="eyebrow" style={{ marginTop: 4 }}>Open tasks</div>
            </div>
          </div>
          {DashboardActions.map((a, i) => (
            <div key={i} className={`action-row ${a.done ? 'done' : ''}`}>
              <div className="action-check">
                {a.done && <span style={{ display: 'inline-flex', width: 14, height: 14 }}>{Ic.check}</span>}
              </div>
              <div>
                <div className="action-title">{a.title}</div>
                <div className="action-sub">{a.sub}</div>
              </div>
              <div className={`action-due ${a.urgent ? 'urgent' : ''}`}>
                {a.urgent && !a.done && '● '}{a.due}
              </div>
              <div style={{ color: 'var(--n-400)' }}>{Ic.arrowR}</div>
            </div>
          ))}
        </div>
      </>
    )}

    {/* VARIANT B — Closing countdown */}
    {variant === 'countdown' && (
      <div style={{
        background: 'linear-gradient(135deg, var(--ulu-black) 0%, #2A1F1A 100%)',
        color: '#fff', borderRadius: 12,
        padding: '56px 48px',
        marginBottom: 24, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -40, opacity: 0.12 }}>
          <UluLeaf size={400} color="rgba(179,32,37,1)" />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>Closing countdown</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginTop: 20 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 180, fontWeight: 300, color: 'var(--ulu-red)', letterSpacing: '-0.05em', lineHeight: 0.85 }}>22</div>
            <div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 48, fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: 1 }}>days to home.</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 16, maxWidth: 500, lineHeight: 1.6 }}>
                You're on track. Three action items are waiting on you — review them below, then we'll meet at Title Guaranty on <strong style={{ color: '#fff' }}>Tuesday, May 12 at 11 AM</strong>.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <div><div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Open tasks</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 6 }}>3</div></div>
            <div><div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Documents</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 6 }}>12</div></div>
            <div><div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Status</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 6, color: 'var(--status-green-bg)' }}>On track</div></div>
          </div>
        </div>
      </div>
    )}

    {/* VARIANT C — Property focused */}
    {variant === 'property' && (
      <div style={{
        background: '#fff', borderRadius: 12, overflow: 'hidden',
        border: '1px solid var(--n-150)', boxShadow: 'var(--shadow-md)',
        marginBottom: 24, display: 'grid', gridTemplateColumns: '1.1fr 1fr',
      }}>
        <div style={{ height: 380, background: 'linear-gradient(160deg, #3a5a6a 0%, #7da8b8 100%)', position: 'relative' }}>
          <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M0 210 L80 140 L160 180 L240 120 L320 160 L400 130 L400 300 L0 300 Z" fill="rgba(0,0,0,0.3)" />
            <path d="M0 240 L60 220 L140 245 L220 210 L300 240 L380 225 L400 235 L400 300 L0 300 Z" fill="rgba(0,0,0,0.5)" />
            <circle cx="300" cy="75" r="30" fill="rgba(255,240,200,0.45)" />
          </svg>
          <div style={{ position: 'absolute', top: 20, left: 20 }}>
            <span className="chip chip-amber" style={{ background: 'rgba(255,255,255,0.95)' }}>Under Contract</span>
          </div>
        </div>
        <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="eyebrow eyebrow-red">Your future home</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 38, fontWeight: 500, marginTop: 14, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            94-1004 Kaukahi Pl. #K11
          </div>
          <div style={{ fontSize: 15, color: 'var(--n-500)', marginTop: 6 }}>Waipahu, HI 96797 · Condominium</div>
          <div style={{ display: 'flex', gap: 32, marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--n-150)' }}>
            <div><div className="eyebrow">Beds</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 4 }}>4</div></div>
            <div><div className="eyebrow">Baths</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 4 }}>3</div></div>
            <div><div className="eyebrow">Sq Ft</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 4 }}>2,840</div></div>
            <div><div className="eyebrow">Price</div><div style={{ fontFamily: 'Fraunces, serif', fontSize: 28, marginTop: 4, color: 'var(--ulu-red)' }}>$2.195M</div></div>
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, color: 'var(--n-600)', marginTop: 24 }}>
            Closing <strong style={{ color: 'var(--ulu-red)', fontStyle: 'normal' }}>Tuesday, May 12</strong> — 20 days.
          </div>
        </div>
      </div>
    )}

    {/* Common: stats for B and C variants */}
    {variant !== 'actions' && (
      <div className="stat-grid mb-24">
        <div className="stat card-accent">
          <div className="stat-label">Open Tasks</div>
          <div className="stat-value">3</div>
          <div className="stat-sub"><strong>2</strong> waiting on you</div>
        </div>
        <div className="stat card-accent">
          <div className="stat-label">Documents</div>
          <div className="stat-value">12</div>
          <div className="stat-sub"><strong>2</strong> need signature</div>
        </div>
        <div className="stat card-accent">
          <div className="stat-label">Days to Close</div>
          <div className="stat-value">22</div>
          <div className="stat-sub" style={{ color: 'var(--status-green)' }}>● On track</div>
        </div>
      </div>
    )}

    {/* Agent card — always */}
    <div className="agent-card mb-24">
      <div className="agent-avatar">DU</div>
      <div className="info">
        <div className="name">Daniel Ulu</div>
        <div className="meta">
          <span>Team Leader</span><span className="dot" />
          <span>RS-83724</span><span className="dot" />
          <span>kristina@uluteam.com</span>
        </div>
      </div>
      <div className="actions">
        <a href="mailto:kristina@uluteam.com" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>{Ic.msg} Email</a>
        <button className="btn btn-red btn-sm">{Ic.phone} Call</button>
      </div>
    </div>

    {/* Activity + Next */}
    <div className="grid-2">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="eyebrow eyebrow-red">Behind the scenes</div>
            <h3 className="h-3" style={{ margin: '6px 0 0' }}>Recent activity</h3>
          </div>
        </div>
        <div className="tl-list">
          <div className="tl-item done"><div className="tl-dot" /><div><div className="tl-title">Inspection report uploaded</div><div className="tl-sub">Bishop &amp; Co. Home Inspectors · 42 pages</div></div><div className="tl-date">Apr 15</div></div>
          <div className="tl-item done"><div className="tl-dot" /><div><div className="tl-title">Earnest money received</div><div className="tl-sub">$25,000 deposited to Title Guaranty escrow</div></div><div className="tl-date">Apr 10</div></div>
          <div className="tl-item done"><div className="tl-dot" /><div><div className="tl-title">Appraisal scheduled</div><div className="tl-sub">Island Valuation Group · 10:00 AM on site</div></div><div className="tl-date">Apr 08</div></div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="eyebrow eyebrow-red">On the horizon</div>
            <h3 className="h-3" style={{ margin: '6px 0 0' }}>Next milestones</h3>
          </div>
        </div>
        <div className="tl-list">
          <div className="tl-item current"><div className="tl-dot" /><div><div className="tl-title">Sign disclosures</div><div className="tl-sub">Seller's SRPDS packet — 6 items to initial</div></div><div className="tl-date">Apr 16</div></div>
          <div className="tl-item"><div className="tl-dot" /><div><div className="tl-title">Final walkthrough</div><div className="tl-sub">Meet Kristina on site, 3:00 PM</div></div><div className="tl-date">Apr 30</div></div>
          <div className="tl-item"><div className="tl-dot" /><div><div className="tl-title">Closing day</div><div className="tl-sub">Title Guaranty, Ala Moana · 11:00 AM</div></div><div className="tl-date">May 6</div></div>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 48, textAlign: 'center' }}>
      <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 20, color: 'var(--ulu-red)' }}>Onward.</div>
    </div>
  </div>
);

Object.assign(window, { ScreenLogin, ScreenDashboard });
