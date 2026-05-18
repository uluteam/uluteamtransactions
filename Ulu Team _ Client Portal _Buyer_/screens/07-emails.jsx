// ============================================
// SCREEN 15: GEM MORTGAGE PRE-APPROVAL EMAIL
// SCREEN 16: ULU TEAM MAGIC LINK EMAIL
// ============================================

const EmailFrame = ({ subject, from, children }) => (
  <div style={{ background: 'var(--n-100)', padding: 28, borderRadius: 6 }}>
    <div style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--n-200)', padding: '12px 18px', marginBottom: 10, fontSize: 12, color: 'var(--n-600)', display: 'flex', gap: 18 }}>
      <div><span style={{ color: 'var(--n-500)', letterSpacing: '0.04em' }}>FROM</span> &nbsp;{from}</div>
      <div><span style={{ color: 'var(--n-500)', letterSpacing: '0.04em' }}>SUBJECT</span> &nbsp;<strong>{subject}</strong></div>
    </div>
    <div style={{ background: '#fff', borderRadius: 4, border: '1px solid var(--n-200)', overflow: 'hidden', maxWidth: 620, margin: '0 auto' }}>
      {children}
    </div>
  </div>
);

const EmailGem = () => (
  <EmailFrame subject="Aloha Jordan & Kaulanakai, let's get you pre-approved" from="Kyle Murata <kmurata@gemcorp.com>">
    <div style={{ height: 6, background: 'var(--gem-blue)' }} />
    <div style={{ padding: '28px 36px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
      <span className="gem-tag">Lender Partner · Separate Company</span>
    </div>
    <div style={{ padding: '12px 36px 0' }}>
      <GemLogo size="md" />
    </div>
    <div style={{ padding: '28px 36px 8px' }}>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: 'var(--gem-blue)', margin: 0, lineHeight: 1.2 }}>
        Aloha Jordan & Kaulanakai, let's get you pre-approved.
      </h1>
      <div style={{ width: 56, height: 3, background: 'var(--ulu-red)', marginTop: 14 }} />
    </div>
    <div style={{ padding: '20px 36px 8px', fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 1.7, color: 'var(--n-700)' }}>
      <p style={{ margin: '0 0 14px' }}>
        Daniel Ulu at The Ulu Team let me know you're starting your home search on Oʻahu — congratulations.
        I'm Kyle Murata at <strong>GEM Mortgage</strong>, the Ulu Team's preferred lender partner.
      </p>
      <p style={{ margin: '0 0 14px' }}>
        To write a strong offer in this market, you'll want a pre-approval letter in hand. I can issue yours in
        <strong> less than 24 hours</strong> once I receive your application and a few documents.
      </p>
      <p style={{ margin: '0 0 18px' }}>
        Tap below to get started. If anything's unclear, call me directly — I answer my phone.
      </p>
    </div>
    <div style={{ padding: '8px 36px 28px', textAlign: 'center' }}>
      <button className="btn btn-gem btn-xl" style={{ width: '100%', maxWidth: 360 }}>Apply with GEM Mortgage →</button>
    </div>

    <div style={{ padding: '0 36px 28px' }}>
      <div className="gem-info-card">
        <div style={{ fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gem-blue)', fontWeight: 700, fontFamily: 'Raleway' }}>Your Loan Officer</div>
        <div style={{ marginTop: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 100, background: 'var(--gem-blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia', fontWeight: 700, fontSize: 20 }}>KM</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--gem-blue)' }}>Kyle Murata</div>
            <div style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--n-600)' }}>Senior Loan Officer · NMLS #229811</div>
            <div style={{ fontSize: 13, marginTop: 6, color: 'var(--n-700)' }}>kmurata@gemcorp.com · 808.228.8681</div>
          </div>
        </div>
      </div>
    </div>

    {/* Ulu signoff */}
    <div style={{ padding: '24px 36px 8px', borderTop: '1px solid var(--n-150)', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <UluLogo size="sm" />
      </div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--ulu-red)', fontSize: 15, marginTop: 6 }}>Real Estate Services with Aloha</div>
    </div>

    {/* Black footer */}
    <div style={{ background: 'var(--ulu-black)', color: 'rgba(255,255,255,0.7)', padding: '20px 36px', fontSize: 11, lineHeight: 1.7 }}>
      <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>THE ULU TEAM · Keller Williams Honolulu RB-21303</div>
      <div>Daniel Ulu RS-76778 · 808-295-8157 · daniel@uluteam.com</div>
      <div>590 Farrington Hwy, Kapolei HI 96707</div>
    </div>

    {/* RESPA */}
    <div style={{ padding: '14px 36px', fontSize: 10, color: 'var(--n-500)', background: 'var(--n-50)', lineHeight: 1.5 }}>
      You are not required to use GEM Mortgage — you have the right to shop for a lender of your choice.
      GEM Mortgage is a separate company from The Ulu Team and Keller Williams Honolulu. A Division of Golden Empire Mortgage, Inc.
      NMLS #2427. Equal Housing Opportunity.
    </div>
  </EmailFrame>
);

const EmailMagic = () => (
  <EmailFrame subject="Your Ulu Team client portal is ready" from="The Ulu Team <hello@uluteam.com>">
    <div style={{ height: 6, background: 'var(--ulu-red)' }} />
    <div style={{ padding: '32px 36px 4px', textAlign: 'center' }}>
      <UluLogo size="md" />
    </div>
    <div style={{ padding: '28px 36px 8px' }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, margin: 0, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
        Aloha Jordan & Kaulanakai — your client portal is ready.
      </h1>
      <div style={{ width: 56, height: 3, background: 'var(--ulu-red)', marginTop: 14 }} />
    </div>
    <div style={{ padding: '20px 36px 8px', fontSize: 15, lineHeight: 1.7, color: 'var(--n-700)' }}>
      <p style={{ margin: '0 0 14px' }}>
        Everything for your Oʻahu home purchase lives in one place — your transaction timeline, documents,
        and the GEM Mortgage pre-approval.
      </p>
      <p style={{ margin: '0 0 18px' }}>
        Click below to access your Ulu Team client portal. This link will sign you in automatically — no password needed.
      </p>
    </div>
    <div style={{ padding: '8px 36px 28px', textAlign: 'center' }}>
      <button className="btn btn-red btn-xl" style={{ width: '100%', maxWidth: 360 }}>Access Your Portal →</button>
      <div style={{ fontSize: 11, color: 'var(--n-500)', marginTop: 10 }}>Link expires in 24 hours · Single use</div>
    </div>

    <div style={{ padding: '24px 36px 8px', borderTop: '1px solid var(--n-150)', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
        <UluLogo size="sm" />
      </div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: 'var(--ulu-red)', fontSize: 22, marginTop: 6 }}>Onward.</div>
    </div>

    <div style={{ background: 'var(--ulu-black)', color: 'rgba(255,255,255,0.7)', padding: '20px 36px', fontSize: 11, lineHeight: 1.7 }}>
      <div style={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>THE ULU TEAM · Keller Williams Honolulu RB-21303</div>
      <div>Daniel Ulu RS-76778 · 808-295-8157 · daniel@uluteam.com</div>
      <div>590 Farrington Hwy, Kapolei HI 96707</div>
    </div>
  </EmailFrame>
);

const ScreenEmails = () => (
  <div className="page">
    <div className="page-head">
      <div>
        <div className="eyebrow eyebrow-red">Transactional Emails</div>
        <h1 className="h-1" style={{ marginTop: 6 }}>Email Mockups</h1>
        <div className="page-sub">Preview what clients see in their inbox.</div>
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'flex-start' }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>GEM Mortgage · Pre-Approval</div>
        <EmailGem />
      </div>
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Ulu Team · Magic Link Login</div>
        <EmailMagic />
      </div>
    </div>
  </div>
);

Object.assign(window, { ScreenEmails });
