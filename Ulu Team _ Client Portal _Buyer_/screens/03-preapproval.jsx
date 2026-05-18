// ============================================
// SCREEN 4: PRE-APPROVAL
// ============================================
const ScreenPreapproval = () => {
  const docs = [
    { title: 'Government ID', sub: "Driver's license or passport", received: true, receivedOn: 'Apr 10' },
    { title: 'Pay Stubs', sub: 'Last 30 days (both buyers)', received: true, receivedOn: 'Apr 11' },
    { title: 'W-2s', sub: 'Last 2 years', received: true, receivedOn: 'Apr 11' },
    { title: 'Bank Statements', sub: 'Last 2 months, all pages', received: false },
    { title: 'Tax Returns', sub: 'Last 2 years, all schedules', received: false },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow eyebrow-red">Financing</div>
          <h1 className="h-1" style={{ marginTop: 6 }}>Pre-Approval</h1>
        </div>
      </div>

      {/* GEM HERO CARD */}
      <div className="gem-card mb-24">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span className="gem-tag">Lender Partner · Separate Company</span>
            <GemLogo size="lg" />
          </div>
          <span className="gem-step-badge">Step 1 of 5</span>
        </div>

        <div className="gem-headline">Start here: Submit your loan application</div>

        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--n-700)', maxWidth: 720, margin: '18px 0 18px' }}>
          Before we can write a strong offer on Oʻahu, you'll need a pre-approval letter.
          Submit your loan application to <strong>Kyle Murata at GEM Mortgage</strong> through his secure intake link.
          He'll issue your pre-approval letter in <strong>less than 24 hours</strong>, and we'll have it ready for your first showing.
        </p>

        <div className="gem-disclosure mb-24">
          <strong>Important:</strong> GEM Mortgage is a separate company from The Ulu Team and Keller Williams Honolulu.
          You are not required to use GEM Mortgage — you have the right to shop for a lender of your choice.
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-gem btn-xl">
            Open GEM's Secure Intake Link {Ic.arrowR}
          </button>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'var(--n-600)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--gem-blue)' }}>Kyle Murata</strong> · Senior Loan Officer<br />
            kmurata@gemcorp.com · 808.228.8681
          </div>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, color: 'var(--n-500)', fontStyle: 'italic', lineHeight: 1.5 }}>
          All documents are submitted directly to GEM Mortgage through Kyle's secure link — never uploaded to this portal. Below is a read-only view of what Kyle has received so far.
        </div>
      </div>

      {/* STEPPER */}
      <div className="stepper mb-24">
        {['Intake', 'Documents', 'Review', 'Credit Check', 'Approved'].map((s, i) => (
          <div key={i} className={`step ${i < 1 ? 'done' : i === 1 ? 'current' : ''}`}>
            <div className="step-num">{i < 1 ? '✓' : (i + 1)}</div>
            <div className="step-label">{s}</div>
          </div>
        ))}
      </div>

      {/* TWO COLUMN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <div className="card card-accent">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div>
              <div className="eyebrow eyebrow-red">Kyle's Checklist</div>
              <h3 className="h-3" style={{ margin: '6px 0 0' }}>Document status</h3>
            </div>
            <span className="chip chip-amber">2 outstanding</span>
          </div>
          <p style={{ color: 'var(--n-500)', fontSize: 13, margin: '6px 0 20px' }}>
            Kyle updates this list as your files arrive through his secure intake link.
            Nothing is uploaded or stored in this portal — this is a read-only mirror of his loan file.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {docs.map((d, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr auto',
                gap: 16, alignItems: 'center',
                padding: '16px 4px',
                borderBottom: i < docs.length - 1 ? '1px solid var(--n-150)' : 'none',
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 100,
                  background: d.received ? 'var(--status-green)' : '#fff',
                  border: d.received ? 'none' : '1.5px dashed var(--n-300)',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {d.received && <span style={{ display: 'inline-flex', width: 12, height: 12 }}>{Ic.check}</span>}
                </div>
                <div>
                  <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600, color: d.received ? 'var(--ulu-ink)' : 'var(--n-600)' }}>{d.title}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--n-500)', marginTop: 2 }}>{d.sub}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {d.received ? (
                    <>
                      <span className="chip chip-green" style={{ marginBottom: 4 }}>Received</span>
                      <div style={{ fontSize: 10.5, color: 'var(--n-500)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                        Marked by Kyle · {d.receivedOn}
                      </div>
                    </>
                  ) : (
                    <span className="chip chip-grey">Awaiting</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: 16, background: 'var(--gem-blue-light)', borderRadius: 8, borderLeft: '3px solid var(--gem-blue)', fontSize: 13, color: 'var(--n-700)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--gem-blue)' }}>Need to submit remaining documents?</strong> Use Kyle's secure intake link above — don't email attachments.
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{
            background: '#fff',
            border: '1.5px solid var(--gem-blue-border)',
            borderTop: '3px solid var(--gem-blue)',
            borderRadius: 3, padding: 22,
          }}>
            <div className="eyebrow" style={{ color: 'var(--gem-blue)' }}>Your Lender</div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 100, background: 'var(--gem-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia', fontWeight: 700, fontSize: 20 }}>KM</div>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700 }}>Kyle Murata</div>
                <div style={{ fontSize: 12, color: 'var(--n-500)' }}>Senior Loan Officer · NMLS #229811</div>
              </div>
            </div>
            <div style={{ marginTop: 16, fontSize: 13, color: 'var(--n-600)', lineHeight: 1.9 }}>
              <div>{Ic.mail && <span style={{ display: 'inline-flex', width: 14, height: 14, verticalAlign: 'middle', marginRight: 8, color: 'var(--gem-blue)' }}>{Ic.mail}</span>}kmurata@gemcorp.com</div>
              <div>{Ic.phone && <span style={{ display: 'inline-flex', width: 14, height: 14, verticalAlign: 'middle', marginRight: 8, color: 'var(--gem-blue)' }}>{Ic.phone}</span>}808.228.8681</div>
            </div>
            <button className="btn btn-gem btn-block btn-sm" style={{ marginTop: 16 }}>Email Kyle</button>
            <div style={{ fontSize: 10.5, color: 'var(--n-500)', marginTop: 12, lineHeight: 1.5 }}>
              GEM Mortgage · A Division of Golden Empire Mortgage, Inc.
              <br />Separate company from The Ulu Team.
            </div>
          </div>

          <div className="agent-card" style={{ padding: 20 }}>
            <div className="agent-avatar" style={{ width: 52, height: 52, fontSize: 18 }}>KU</div>
            <div className="info">
              <div className="name" style={{ fontSize: 18 }}>Stuck? I'm here to help.</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>Kristina Ulu · Team Leader</div>
              <a href="mailto:kristina@uluteam.com" className="btn btn-ghost btn-sm" style={{ marginTop: 10, textDecoration: 'none', display: 'inline-flex' }}>Email Kristina</a>
            </div>
          </div>

          <div className="card card-accent">
            <div className="eyebrow eyebrow-red">What to expect</div>
            <div style={{ marginTop: 10 }}>
              {[
                ['Application', '15 min'],
                ['Docs review', '< 24 hrs'],
                ['Credit pull', 'Same day'],
                ['Pre-approval letter', '< 24 hrs'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: i < 3 ? '1px solid var(--n-150)' : 'none',
                  fontSize: 13.5,
                }}>
                  <span>{k}</span>
                  <span style={{ fontWeight: 700, color: 'var(--ulu-red)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenPreapproval });
