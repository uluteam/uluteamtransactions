// ============================================
// SCREEN 3: TRANSACTION
// ============================================
const ScreenTransaction = ({ state = 'active' }) => {
  // state: 'pre-approval' | 'ready' | 'active'
  if (state !== 'active') {
    return <ScreenTransactionEmpty state={state} />;
  }

  const milestones = [
    { label: 'Offer Accepted', date: 'Apr 12', done: true },
    { label: 'Initial Deposit', date: 'Apr 14', done: true },
    { label: 'Disclosures (SRPDS)', date: 'Apr 22', done: true },
    { label: 'Inspection', date: 'Apr 22', done: true },
    { label: 'Title & Vesting', date: 'Apr 27', current: true },
    { label: 'Loan Commitment', date: 'Apr 27', pending: true },
    { label: 'Final Walk-Thru', date: 'May 7', pending: true },
    { label: 'Closing', date: 'May 12', pending: true },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow eyebrow-red">Your Purchase</div>
          <h1 className="h-1" style={{ marginTop: 6 }}>Your Transaction</h1>
        </div>
      </div>

      {/* Hero bar */}
      <div style={{
        background: 'var(--ulu-black)', color: '#fff',
        padding: '28px 32px',
        borderRadius: 4, borderLeft: '4px solid var(--ulu-red)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24,
        marginBottom: 24,
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Subject Property</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 6 }}>
            94-1004 Kaukahi Pl. #K11, Waipahu
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
            <span style={{
              display: 'inline-block', padding: '3px 8px',
              background: 'rgba(255,255,255,0.1)', borderRadius: 2, fontSize: 10.5,
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: 10,
            }}>Buyer · Jordan Yoshimoto & Kaulanakai Correa</span>
            Condominium · Waipahu · Ref. 04/08/26 · Accepted 04/12/26
          </div>
        </div>
        <div style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Days to Close</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 700, color: 'var(--ulu-red)', lineHeight: 1 }}>20</div>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.15)' }} />
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Closing Day</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, lineHeight: 1, marginTop: 6 }}>May 12</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Tuesday, 2026</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="milestones mb-24">
        {milestones.map((m, i) => (
          <div key={i} className={`milestone ${m.done ? 'done' : ''} ${m.current ? 'current' : ''} ${m.pending ? 'pending' : ''}`}>
            <div className="milestone-dot">
              {m.done ? <span style={{ display: 'inline-flex', width: 16, height: 16 }}>{Ic.check}</span> : (i + 1)}
            </div>
            <div className="milestone-label">{m.label}</div>
            <div className="milestone-date">{m.date}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card card-accent">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div className="eyebrow eyebrow-red">Current Phase</div>
              <h3 className="h-3" style={{ margin: '6px 0 0' }}>What's happening now</h3>
            </div>
            <span className="chip chip-amber">In Progress</span>
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, marginTop: 14 }}>
            Title & Vesting · Loan Commitment
          </div>
          <p style={{ color: 'var(--n-600)', fontSize: 14, lineHeight: 1.6, marginTop: 6 }}>
            Your preliminary title report is in review and vesting is being finalized. In parallel, GEM Mortgage is wrapping
            underwriting — the Conditional Loan Commitment letter is due to the seller by <strong style={{ color: 'var(--ulu-ink)' }}>Apr 27</strong>.
            Next milestone: clear all loan conditions by <strong style={{ color: 'var(--ulu-ink)' }}>May 2</strong>.
          </p>
          <div style={{
            marginTop: 18, padding: 14,
            background: 'var(--n-50)', borderRadius: 3,
            display: 'flex', gap: 14, alignItems: 'center',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 100, background: 'var(--gem-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>KM</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Kyle Murata · GEM Mortgage</div>
              <div style={{ fontSize: 12, color: 'var(--n-500)' }}>Lender partner · separate company</div>
            </div>
            <a href="mailto:kmurata@gemcorp.com" className="btn btn-ghost-gem btn-sm" style={{ textDecoration: 'none' }}>Email</a>
          </div>
        </div>

        <div className="card card-accent">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <div className="eyebrow eyebrow-red">Checklist</div>
              <h3 className="h-3" style={{ margin: '6px 0 0' }}>What you need to do</h3>
            </div>
            <span className="chip chip-red">5 open</span>
          </div>
          {[
            'Do not open new credit lines',
            'Verify homeowner insurance quote',
            'Wire closing funds',
            'Bring government-issued ID',
            'Change mailing address',
          ].map((t, i) => (
            <label key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 0',
              borderBottom: i < 4 ? '1px solid var(--n-150)' : 'none',
              fontSize: 14, cursor: 'pointer',
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: 3,
                border: '1.5px solid var(--n-300)', background: '#fff',
                flex: 'none',
              }} />
              {t}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenTransaction });

// ============================================
// EMPTY STATE — no transaction yet
// ============================================
const ScreenTransactionEmpty = ({ state }) => {
  // state: 'pre-approval' | 'ready'
  const preApproval = state === 'pre-approval';

  const journeySteps = [
    { num: 1, title: 'Get pre-approved', sub: 'Submit documents through Kyle Murata at GEM Mortgage', status: preApproval ? 'current' : 'done' },
    { num: 2, title: 'Tour homes with Daniel', sub: 'Find the right property on Oʻahu', status: preApproval ? 'pending' : 'current' },
    { num: 3, title: 'Write & accept an offer', sub: 'Once accepted, your transaction timeline appears here', status: 'pending' },
    { num: 4, title: 'Transaction begins', sub: 'Daniel will activate your timeline with milestones & dates', status: 'pending' },
  ];

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="eyebrow eyebrow-red">Your Purchase</div>
          <h1 className="h-1" style={{ marginTop: 6 }}>Your Transaction</h1>
          <div className="page-sub">Your timeline will appear here once you're under contract.</div>
        </div>
      </div>

      {/* Hero empty card */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--n-150)',
        borderRadius: 12,
        padding: '72px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        marginBottom: 28,
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, opacity: 0.5 }}>
          <UluLeaf size={280} color="rgba(179,32,37,0.06)" />
        </div>
        <div style={{ position: 'absolute', bottom: -80, left: -40, opacity: 0.4 }}>
          <UluLeaf size={240} color="rgba(15,14,12,0.04)" />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          {/* Status icon */}
          <div style={{
            width: 88, height: 88, margin: '0 auto 28px',
            borderRadius: 100,
            background: preApproval ? 'var(--gem-blue-light)' : 'var(--status-amber-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `2px dashed ${preApproval ? 'var(--gem-blue-border)' : 'var(--gold-border)'}`,
          }}>
            <div style={{ width: 36, height: 36, color: preApproval ? 'var(--gem-blue)' : 'var(--status-amber)' }}>
              {preApproval ? Ic.gem : Ic.tx}
            </div>
          </div>

          <div className="eyebrow eyebrow-red" style={{ marginBottom: 14 }}>
            {preApproval ? 'Not yet in transaction' : 'Ready to shop — not under contract'}
          </div>
          <h2 className="h-2" style={{ margin: '0 0 16px', fontSize: 40, letterSpacing: '-0.02em' }}>
            {preApproval ? (
              <>Let's finish your <span style={{ fontStyle: 'italic', color: 'var(--ulu-red)' }}>pre-approval</span> first.</>
            ) : (
              <>You're <span style={{ fontStyle: 'italic', color: 'var(--ulu-red)' }}>almost there.</span></>
            )}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--n-600)', maxWidth: 520, margin: '0 auto 32px' }}>
            {preApproval ? (
              <>You're not in a transaction yet. Before we can write an offer, <strong style={{ color: 'var(--ulu-ink)' }}>Kyle Murata at GEM Mortgage</strong> needs to finish your pre-approval. Once you're under contract, Daniel will build your transaction timeline and every milestone will appear here.</>
            ) : (
              <>Your pre-approval is in hand. Once Daniel activates your transaction timeline — after an accepted offer — this page will fill with milestones, dates, and next steps.</>
            )}
          </p>

          <div style={{ display: 'inline-flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {preApproval ? (
              <>
                <button className="btn btn-gem btn-lg">Finish Pre-Approval {Ic.arrowR}</button>
                <a href="mailto:kristina@uluteam.com" className="btn btn-ghost btn-lg" style={{ textDecoration: 'none' }}>Email Kristina</a>
              </>
            ) : (
              <>
                <button className="btn btn-red btn-lg">Browse Listings with Kristina {Ic.arrowR}</button>
                <a href="mailto:kristina@uluteam.com" className="btn btn-ghost btn-lg" style={{ textDecoration: 'none' }}>Email Kristina</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Journey strip */}
      <div className="card">
        <div className="eyebrow eyebrow-red" style={{ marginBottom: 6 }}>What happens next</div>
        <h3 className="h-3" style={{ margin: '0 0 24px' }}>Your journey to keys</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
          {journeySteps.map((s, i) => {
            const isDone = s.status === 'done';
            const isCurrent = s.status === 'current';
            return (
              <div key={i} style={{ position: 'relative', padding: '0 16px' }}>
                {i < 3 && (
                  <div style={{
                    position: 'absolute',
                    top: 22, left: 'calc(50% + 24px)', right: 'calc(-50% + 24px)',
                    height: 2,
                    background: isDone ? 'var(--ulu-red)' : 'var(--n-200)',
                  }} />
                )}
                <div style={{
                  width: 44, height: 44, borderRadius: 100,
                  background: isDone ? 'var(--ulu-red)' : isCurrent ? '#fff' : '#fff',
                  border: isCurrent ? '2px solid var(--ulu-red)' : isDone ? 'none' : '2px solid var(--n-200)',
                  boxShadow: isCurrent ? '0 0 0 5px rgba(179,32,37,0.14)' : 'none',
                  color: isDone ? '#fff' : isCurrent ? 'var(--ulu-red)' : 'var(--n-400)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Fraunces, serif', fontWeight: 600, fontSize: 16,
                  position: 'relative', zIndex: 1,
                }}>
                  {isDone ? <span style={{ display: 'inline-flex', width: 16, height: 16 }}>{Ic.check}</span> : s.num}
                </div>
                <div style={{
                  fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 600,
                  color: isCurrent || isDone ? 'var(--ulu-ink)' : 'var(--n-500)',
                  marginTop: 14, letterSpacing: '-0.005em',
                }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--n-500)', marginTop: 4, lineHeight: 1.5 }}>{s.sub}</div>
                {isCurrent && (
                  <div style={{ marginTop: 10 }}>
                    <span className="chip chip-red">You are here</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent reassurance */}
      <div className="agent-card" style={{ marginTop: 20 }}>
        <div className="agent-avatar">DU</div>
        <div className="info">
          <div className="name">Questions before we start?</div>
          <div className="meta">
            <span>Daniel Ulu</span><span className="dot" />
            <span>Team Leader</span><span className="dot" />
            <span>kristina@uluteam.com</span>
          </div>
        </div>
        <div className="actions">
          <a href="mailto:kristina@uluteam.com" className="btn btn-ghost btn-sm" style={{ textDecoration: 'none' }}>{Ic.msg} Email</a>
          <button className="btn btn-red btn-sm">{Ic.phone} Call</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ScreenTransactionEmpty });
