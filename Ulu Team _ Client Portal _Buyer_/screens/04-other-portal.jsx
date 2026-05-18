// ============================================
// SCREEN 6: DOCUMENTS
// ============================================
const ScreenDocuments = () => {
  const docs = [
    ['Purchase Agreement (RR201)', 'Contract', 'Apr 12, 2026', 'Signed', 'chip-green', 'View'],
    ['Seller Disclosure (SRPDS)', 'Disclosure', 'Apr 22, 2026', 'Signed', 'chip-green', 'View'],
    ['Inspection Report', 'Report', 'Apr 22, 2026', 'Reviewed', 'chip-grey', 'View'],
    ['Lead-Based Paint Addendum', 'Disclosure', 'Apr 05, 2026', 'Needs Signature', 'chip-amber', 'Sign'],
    ['HOA Documents', 'Condo / HOA', 'Apr 09, 2026', 'Reviewed', 'chip-grey', 'View'],
    ['Earnest Money Receipt', 'Escrow', 'Apr 10, 2026', 'Signed', 'chip-green', 'View'],
    ['Preliminary Title Report', 'Title', 'Apr 09, 2026', 'Reviewed', 'chip-grey', 'View'],
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow eyebrow-red">Paper Trail</div>
          <h1 className="h-1" style={{ marginTop: 6 }}>Documents</h1>
          <div className="page-sub">Read-only · 12 documents · 2 awaiting your signature</div>
        </div>
      </div>

      <div style={{
        background: 'var(--paper-deep)',
        border: '1px solid var(--n-200)',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 24,
        display: 'flex', alignItems: 'flex-start', gap: 14,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 100, background: '#fff', color: 'var(--ulu-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', border: '1px solid var(--n-200)' }}>
          <span style={{ width: 16, height: 16, display: 'inline-flex' }}>{Ic.doc}</span>
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--n-700)', lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--ulu-ink)' }}>This is a read-only archive.</strong> Every document here was uploaded by your agent or lender — you don't upload anything to the portal. To sign, click <em>Sign</em> and you'll be taken to the secure e-sign provider. To send a new document to Daniel, use <strong>Messages</strong> or reply to his email.
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '42%' }}>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ width: 120 }}></th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d, i) => (
            <tr key={i}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 32, height: 32, borderRadius: 3, background: 'var(--n-100)', color: 'var(--ulu-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ width: 16, height: 16, display: 'inline-flex' }}>{Ic.doc}</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>{d[0]}</span>
                </div>
              </td>
              <td style={{ color: 'var(--n-500)' }}>{d[1]}</td>
              <td style={{ color: 'var(--n-500)' }}>{d[2]}</td>
              <td><span className={`chip ${d[4]}`}>{d[3]}</span></td>
              <td style={{ textAlign: 'right' }}>
                <button className={d[5] === 'Sign' ? 'btn btn-red btn-sm' : 'btn btn-ghost btn-sm'}>{d[5]}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================
// SCREEN 8: CALENDAR
// ============================================
const ScreenCalendar = () => {
  const events = [
    { date: 'Apr 27', day: 'Mon', time: 'By end of day', title: 'Title & Vesting · Loan Commitment', sub: 'Preliminary title report + GEM commitment letter due', current: true },
    { date: 'May 02', day: 'Sat', time: 'By end of day', title: 'Loan conditions cleared', sub: 'All underwriting conditions satisfied', current: false },
    { date: 'May 07', day: 'Thu', time: '3:00 PM', title: 'Final walkthrough', sub: 'Meet Kristina at 94-1004 Kaukahi Pl. #K11', current: false },
    { date: 'May 12', day: 'Tue', time: '11:00 AM', title: 'Closing', sub: 'Title Guaranty · Ala Moana office', current: false },
  ];
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow eyebrow-red">On the horizon</div>
          <h1 className="h-1" style={{ marginTop: 6 }}>Calendar</h1>
          <div className="page-sub">4 upcoming events · Closing in 22 days</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm">
            <span style={{ width: 14, height: 14, display: 'inline-flex' }}>{Ic.apple}</span> Apple
          </button>
          <button className="btn btn-ghost btn-sm">
            <span style={{ width: 14, height: 14, display: 'inline-flex' }}>{Ic.google}</span> Google
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {events.map((e, i) => (
          <div key={i} style={{
            background: '#fff',
            border: '1px solid var(--n-200)',
            borderLeft: e.current ? '4px solid var(--ulu-red)' : '4px solid transparent',
            borderRadius: 4, padding: 20,
            display: 'flex', alignItems: 'center', gap: 24,
          }}>
            <div style={{ textAlign: 'center', minWidth: 72, padding: '6px 14px', borderRight: '1px solid var(--n-200)' }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: e.current ? 'var(--ulu-red)' : 'var(--n-500)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{e.day}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, lineHeight: 1, marginTop: 4 }}>{e.date.split(' ')[1]}</div>
              <div style={{ fontSize: 10, color: 'var(--n-500)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>{e.date.split(' ')[0]}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 100, background: e.current ? 'var(--ulu-red)' : 'var(--n-400)', boxShadow: e.current ? '0 0 0 4px rgba(179,32,37,0.18)' : 'none' }} />
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700 }}>{e.title}</div>
                {e.current && <span className="chip chip-red">Next up</span>}
              </div>
              <div style={{ color: 'var(--n-500)', fontSize: 13, marginTop: 6 }}>{e.time} · {e.sub}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm">
                <span style={{ width: 13, height: 13, display: 'inline-flex' }}>{Ic.apple}</span>
              </button>
              <button className="btn btn-ghost btn-sm">
                <span style={{ width: 13, height: 13, display: 'inline-flex' }}>{Ic.google}</span>
              </button>
              <button className="btn btn-red btn-sm">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SCREEN 9: SETTINGS
// ============================================
const ScreenSettings = () => (
  <div className="page">
    <div className="page-head">
      <div>
        <div className="eyebrow eyebrow-red">Account</div>
        <h1 className="h-1" style={{ marginTop: 6 }}>Settings</h1>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
      <div className="card card-accent">
        <h3 className="h-3" style={{ margin: '0 0 20px' }}>Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="field">
            <label className="field-label">Full Name</label>
            <input className="field-input" defaultValue="Jordan Yoshimoto" />
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <input className="field-input" defaultValue="buyer@example.com" />
          </div>
          <div className="field">
            <label className="field-label">Phone</label>
            <input className="field-input" defaultValue="(808) 555-0142" />
          </div>
          <div className="field">
            <label className="field-label">Preferred Contact</label>
            <select className="field-input"><option>Email</option><option>Phone Call</option></select>
          </div>
        </div>
        <button className="btn btn-red" style={{ marginTop: 20 }}>Save Changes</button>
      </div>

      <div className="card card-accent">
        <h3 className="h-3" style={{ margin: '0 0 20px' }}>Notifications</h3>
        {[
          ['Pre-approval reminders', "Outstanding items Kyle's waiting on", true],
          ['Transaction milestones', 'Email when Kristina marks a milestone complete', true],
          ['Upcoming deadlines', 'Day-before & day-of reminders for signings, appraisal, closing', true],
          ['Lender updates from GEM', 'Progress, conditions, clear-to-close', true],
          ['Marketing & new listings', 'Weekly digest of saved-search matches', false],
        ].map(([t, s, on], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 4 ? '1px solid var(--n-150)' : 'none' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 12, color: 'var(--n-500)', marginTop: 2 }}>{s}</div>
            </div>
            <div style={{ width: 42, height: 24, borderRadius: 100, background: on ? 'var(--ulu-red)' : 'var(--n-300)', position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 20, height: 20, borderRadius: 100, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left .15s' }} />
            </div>
          </div>
        ))}
      </div>

      <div className="card card-accent">
        <h3 className="h-3" style={{ margin: '0 0 20px' }}>Security</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--n-150)' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Password</div>
            <div style={{ fontSize: 12, color: 'var(--n-500)' }}>Magic link enabled — no password required</div>
          </div>
          <button className="btn btn-ghost btn-sm">Set Password</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Two-Factor Authentication</div>
            <div style={{ fontSize: 12, color: 'var(--n-500)' }}>SMS to (808) 555-0173 · recommended for closing day</div>
          </div>
          <button className="btn btn-ghost-red btn-sm">Enable 2FA</button>
        </div>
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenDocuments, ScreenCalendar, ScreenSettings });
