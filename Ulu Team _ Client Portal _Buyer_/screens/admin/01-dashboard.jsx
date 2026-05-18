// ============================================
// ADMIN DASHBOARD — Home screen for TM & Ulu Team
// ============================================
const AdminDashboard = ({ roleKey, onNav }) => {
  const role = ROLES[roleKey];
  const isKyle = roleKey === 'kyle';
  const accent = isKyle ? 'var(--gem-blue)' : 'var(--ulu-red)';
  const accentSoft = isKyle ? 'var(--gem-blue-light)' : 'var(--ulu-red-soft)';

  const today = [
    { t: 'Call Bishop & Co. about inspection access', client: '4521 Aukai Ave · Tanaka', due: 'Today 2:00 PM', priority: 'high' },
    { t: 'Confirm Title & Vesting · request loan commitment', client: 'Kaukahi #K11 · Yoshimoto/Correa', due: 'Apr 27 EOD', priority: 'high' },
    { t: 'Confirm wire with Title Guaranty', client: '87-432 Moi Moi St · Kealoha', due: 'Today', priority: 'med' },
    { t: 'Review condo docs (Waikīkī unit)', client: '321 Lewers #2104 · Silva', due: 'Tomorrow', priority: 'med' },
    { t: 'Send HOA questionnaire to Associa', client: '321 Lewers #2104 · Silva', due: 'Apr 22', priority: 'low' },
  ];

  const atRisk = [
    { addr: '4521 Aukai Ave, Kāhala', buyer: 'R. Tanaka', issue: 'Clear-to-close overdue 2 days', severity: 'high' },
    { addr: '321 Lewers St #2104', buyer: 'M. Silva', issue: 'Condo docs not yet reviewed by buyer', severity: 'med' },
  ];

  const recentMessages = [
    { from: 'Jordan Yoshimoto', avatar: 'JY', msg: 'Got the inspection report — do we need to send repair requests tonight?', time: '12 min ago', unread: true },
    { from: 'Kyle Murata (GEM)', avatar: 'KM', msg: 'Appraisal came back at $1.24M. Clear to proceed.', time: '1h ago', unread: true, gem: true },
    { from: 'Jessie Kealoha', avatar: 'JK', msg: 'Can we push walkthrough to Friday 4pm?', time: '3h ago', unread: false },
    { from: 'Stacy Paris (Seller Agent)', avatar: 'SP', msg: 'Thanks for the update on title — all good on our side.', time: 'Yesterday', unread: false },
  ];

  const kpis = isKyle ? [
    { k: 'Active Applications', v: 8, s: '3 awaiting docs', accent: false },
    { k: 'Clear to Close', v: 2, s: 'this week', accent: true },
    { k: 'Docs Received Today', v: 14, s: 'across all files' },
    { k: 'Avg. Time to CTC', v: '26d', s: 'last 30 days' },
  ] : [
    { k: 'Active Transactions', v: 4, s: '2 closing this month', accent: true },
    { k: 'At-Risk Files', v: 2, s: 'needs attention', warn: true },
    { k: 'Pending Pre-Approvals', v: 3, s: '1 awaiting Kyle' },
    { k: 'Unread Messages', v: 7, s: 'across 4 clients' },
  ];

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Welcome */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="eyebrow" style={{ color: accent }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 40, letterSpacing: '-0.02em', margin: '4px 0 2px' }}>
            Aloha, {role.user.name.split(' ')[0]}.
          </h1>
          <div style={{ fontSize: 14.5, color: 'var(--n-500)' }}>
            {isKyle
              ? 'You have 3 files awaiting docs and 2 ready to clear.'
              : 'You have 5 tasks today, 2 files needing attention, and 7 unread messages.'}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => onNav('messages')}>{Ic.mail} Inbox</button>
          <button className="btn btn-red btn-sm" onClick={() => onNav(isKyle ? 'checklists' : 'clients')}>
            {Ic.plus} {isKyle ? 'New Application' : 'New Client'}
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{
            background: '#fff', border: '1px solid var(--n-200)',
            borderTop: `2px solid ${k.warn ? 'var(--ulu-red)' : k.accent ? accent : 'var(--n-300)'}`,
            borderRadius: 3, padding: '18px 20px',
          }}>
            <div className="eyebrow">{k.k}</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 44, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, margin: '8px 0 6px', color: k.warn ? 'var(--ulu-red)' : 'var(--ulu-black)' }}>
              {k.v}
            </div>
            <div style={{ fontSize: 12, color: 'var(--n-500)' }}>{k.s}</div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* LEFT: Today + At-risk */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Today */}
          <div style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 4 }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--n-150)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="eyebrow" style={{ color: accent }}>Focus</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, marginTop: 2 }}>Today</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--n-500)' }}>5 tasks</div>
            </div>
            <div>
              {today.map((t, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '22px 1fr auto', gap: 14,
                  padding: '14px 22px',
                  borderBottom: i < today.length - 1 ? '1px solid var(--n-150)' : 'none',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 100,
                    border: `2px solid ${t.priority === 'high' ? 'var(--ulu-red)' : 'var(--n-300)'}`,
                    background: '#fff',
                  }} />
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ulu-ink)' }}>{t.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>{t.client}</div>
                  </div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: t.priority === 'high' ? 'var(--ulu-red)' : 'var(--n-500)',
                  }}>{t.due}</div>
                </div>
              ))}
            </div>
          </div>

          {/* At-Risk */}
          {!isKyle && (
            <div style={{ background: '#fff', border: '1px solid var(--n-200)', borderLeft: '3px solid var(--ulu-red)', borderRadius: 4 }}>
              <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--n-150)' }}>
                <div className="eyebrow eyebrow-red">Needs attention</div>
                <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, marginTop: 2 }}>At-Risk Files</div>
              </div>
              {atRisk.map((a, i) => (
                <div key={i} style={{
                  padding: '16px 22px',
                  borderBottom: i < atRisk.length - 1 ? '1px solid var(--n-150)' : 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600 }}>{a.addr}</div>
                    <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>Buyer: {a.buyer}</div>
                    <div style={{
                      display: 'inline-block', marginTop: 8,
                      padding: '4px 10px', background: 'var(--ulu-red-soft)', color: 'var(--ulu-red)',
                      fontSize: 11, fontWeight: 600, borderRadius: 2,
                    }}>⚠ {a.issue}</div>
                  </div>
                  <button className="btn btn-ghost-red btn-sm" onClick={() => onNav('timelines')}>Open</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Messages + calendar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#fff', border: '1px solid var(--n-200)', borderRadius: 4 }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--n-150)' }}>
              <div className="eyebrow">Activity</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, marginTop: 2 }}>Recent Messages</div>
            </div>
            <div style={{ padding: '48px 22px', textAlign: 'center' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 100, margin: '0 auto 14px',
                background: 'var(--paper)', border: '1px dashed var(--n-300)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--n-400)', fontSize: 18,
              }}>◷</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 600, color: 'var(--ulu-ink)' }}>Coming soon</div>
              <div style={{ fontSize: 12.5, color: 'var(--n-500)', marginTop: 6, lineHeight: 1.55, maxWidth: 240, margin: '6px auto 0' }}>
                In-portal messaging is on the roadmap. For now, communication happens through your CRM.
              </div>
            </div>
          </div>

          {/* Calendar strip */}
          <div style={{ background: 'var(--ulu-black)', color: '#fff', borderRadius: 4, padding: '20px 22px' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>This Week</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 600, marginTop: 2, marginBottom: 16 }}>Upcoming</div>
            {[
              { day: 'THU', date: '07', title: 'Final Walkthrough — Kaukahi', time: '3:00 PM' },
              { day: 'WED', date: '22', title: 'Clear-to-Close deadline — Aukai', time: 'EOD', red: true },
              { day: 'THU', date: '23', title: 'Appraisal — Moi Moi St', time: '10 AM' },
              { day: 'FRI', date: '24', title: 'Condo doc review — Lewers', time: '2 PM' },
            ].map((e, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 14,
                padding: '12px 0',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                alignItems: 'center',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', color: e.red ? 'var(--ulu-red)' : 'rgba(255,255,255,0.55)' }}>{e.day}</div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 600, color: e.red ? 'var(--ulu-red)' : '#fff', lineHeight: 1 }}>{e.date}</div>
                </div>
                <div style={{ fontSize: 13.5, color: '#fff' }}>{e.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{e.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AdminDashboard });
