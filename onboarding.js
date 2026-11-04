// Partner self-registration (sign up → application with documents) and admin review.
export function installOnboarding(ctx) {
  const { sb, state, t, esc, fmtDate, shell, toast, STR, $app, brand, langToggle, route } = ctx;
  const T = ctx.terms;

  Object.assign(STR.ar, {
    registerCta: 'مكتب سفريات؟ سجّل مكتبك', emailExists: 'هذا الإيميل مسجّل عندنا من قبل. سجّل دخول بنفس الإيميل وكلمة المرور، وبيطلع لك نموذج بيانات المكتب. إذا نسيت كلمة المرور استخدم «نسيت كلمة المرور؟».', resend: 'إعادة إرسال الكود', resent: 'تم إرسال كود جديد. شيّك على البريد غير المرغوب (Junk) بعد.', register: 'تسجيل مكتب جديد', registerSub: 'أنشئ حساب، بعدها تعبي بيانات مكتبك وترفق المستندات.',
    createAccount: 'إنشاء الحساب', otpSent: 'أرسلنا كود التحقق لإيميلك. اكتبه هني:', otp: 'كود التحقق', verify: 'تأكيد', badOtp: 'الكود غير صحيح أو منتهي.',
    pwMin: 'كلمة المرور 8 أحرف على الأقل.', haveAccount: 'عندي حساب، تسجيل الدخول',
    appTitle: 'بيانات المكتب', appSub: 'عبّي كل البيانات وارفق المستند الخاص بكل قسم. بعد الإرسال نراجع الطلب ونفعّل حسابك.',
    secCompany: 'بيانات الشركة والرخصة', secOwner: 'صاحب الرخصة والمفوّض بالتوقيع', secContact: 'بيانات التواصل', secBank: 'الحساب البنكي (لتحويل مبالغ الحجوزات)',
    companyName: 'اسم الشركة (إنجليزي) *', companyNameAr: 'اسم الشركة (عربي)', licenseNo: 'رقم الرخصة التجارية *', licenseExpiry: 'تاريخ انتهاء الرخصة *',
    docLicense: 'صورة الرخصة التجارية *', docTourism: 'ترخيص مزاولة نشاط السياحة والسفر *', docArticles: 'عقد التأسيس أو آخر عقد تعديل *', docOther: 'شهادات وتراخيص إضافية لنشاط السياحة والسفر (مثل IATA، عضوية اتحاد مكاتب السفر…) — تقدر ترفق أكثر من ملف', removeFile: 'حذف', ownerName: 'اسم صاحب الرخصة *', ownerCivil: 'الرقم المدني لصاحب الرخصة *',
    docCivil: 'صورة البطاقة المدنية (الوجهين) *', signatory: 'اسم المفوّض بالتوقيع *', docSignature: 'اعتماد توقيع المفوّض *',
    phoneL: 'رقم الجوال *', emailCo: 'إيميل المكتب *', address: 'عنوان المكتب (المحافظة، المنطقة، القطعة، الشارع، المبنى، الدور/المكتب) *', paci: 'الرقم الآلي لعنوان المكتب *', secAddress: 'عنوان المكتب', bankName: 'اسم البنك *', holder: 'اسم الشركة كما هو مسجّل في البنك *', iban: 'رقم IBAN *', docIban: 'شهادة IBAN من البنك (لازم يكون فيها اسم الشركة كما هو مسجّل في البنك) *', bankNote: 'التحويلات تتم لهذا الحساب فقط، فتأكد إن اسم الشركة ورقم IBAN مطابقين للشهادة.',
    uploaded: 'تم الرفع', replace: 'استبدال', view: 'عرض', saveDraft: 'حفظ كمسودة', submitApp: 'إرسال الطلب للمراجعة', draftSaved: 'تم حفظ المسودة.',
    err_incomplete: 'كمّل كل الحقول المطلوبة وارفق كل المستندات (*).', missingList: 'باقي هالحقول، ومعلّمة باللون الأحمر تحت:', err_license_expired: 'تاريخ انتهاء الرخصة المكتوب ({d}) تاريخ فات. تأكد من السنة، أو ارفق رخصة مجدّدة.', err_bad_iban: 'رقم IBAN غير صحيح. لازم يبدأ بـ KW ويكون 30 خانة.', err_bad_paci: 'الرقم الآلي غير صحيح، اكتبه أرقام فقط كما هو في شهادة العنوان.',
    fileTooBig: 'حجم الملف أكبر من 10MB.', underReview: 'طلبك تحت المراجعة. بيوصلك تفعيل الحساب أول ما نخلص، وتقدر تدخل من نفس الصفحة.',
    rejectedMsg: 'تم رفض الطلب: {r}. عدّل البيانات وأرسله مرة ثانية.',
    navApps: 'طلبات الانضمام', appsTitle: 'طلبات انضمام المكاتب', noApps: 'ما فيه طلبات.', approve: 'موافقة وتفعيل', reject: 'رفض', rejectReason: 'سبب الرفض',
    approved: 'تم تفعيل المكتب.', rejectedDone: 'تم رفض الطلب.', ast_draft: 'مسودة', ast_submitted: 'بانتظار المراجعة', ast_approved: 'مفعّل', ast_rejected: 'مرفوض', submittedAt: 'تاريخ الإرسال',
  });
  Object.assign(STR.en, {
    registerCta: 'Travel agency? Register your agency', emailExists: 'This email is already registered. Sign in with the same email and password and the agency form will open. If you forgot the password, use “Forgot password?”.', resend: 'Resend code', resent: 'A new code was sent. Check your Junk folder too.', register: 'Register a new agency', registerSub: 'Create an account, then fill in your agency details and attach the documents.',
    createAccount: 'Create account', otpSent: 'We sent a verification code to your email. Enter it here:', otp: 'Verification code', verify: 'Verify', badOtp: 'Invalid or expired code.',
    pwMin: 'Password must be at least 8 characters.', haveAccount: 'I have an account, sign in',
    appTitle: 'Agency details', appSub: 'Fill in all details and attach the document for each section. After you submit, we review and activate your account.',
    secCompany: 'Company & license', secOwner: 'License owner & authorized signatory', secContact: 'Contact details', secBank: 'Bank account (for booking payouts)',
    companyName: 'Company name (English) *', companyNameAr: 'Company name (Arabic)', licenseNo: 'Commercial license no. *', licenseExpiry: 'License expiry date *',
    docLicense: 'Commercial license copy *', docTourism: 'Tourism & travel activity license *', docArticles: 'Articles of association or latest amendment *', docOther: 'Additional tourism & travel certificates and licenses (e.g. IATA, travel agencies union membership…) — you can attach several files', removeFile: 'Remove', ownerName: 'License owner name *', ownerCivil: 'Owner civil ID no. *',
    docCivil: 'Civil ID copy (both sides) *', signatory: 'Authorized signatory name *', docSignature: 'Signatory signature authorization *',
    phoneL: 'Mobile *', emailCo: 'Agency email *', address: 'Office address (governorate, area, block, street, building, floor/office) *', paci: 'Office PACI number *', secAddress: 'Office address', bankName: 'Bank name *', holder: 'Company name as registered at the bank *', iban: 'IBAN *', docIban: 'IBAN certificate from the bank (must show the company name as registered at the bank) *', bankNote: 'Payouts go to this account only, so make sure the company name and IBAN match the certificate.',
    uploaded: 'Uploaded', replace: 'Replace', view: 'View', saveDraft: 'Save draft', submitApp: 'Submit for review', draftSaved: 'Draft saved.',
    err_incomplete: 'Fill in all required fields and attach all documents (*).', missingList: 'These are still missing (marked in red below):', err_license_expired: 'The license expiry date entered ({d}) is in the past. Check the year, or attach a renewed license.', err_bad_iban: 'Invalid IBAN. It must start with KW and be 30 characters.', err_bad_paci: 'Invalid PACI number. Enter digits only, as on the address certificate.',
    fileTooBig: 'File is larger than 10MB.', underReview: 'Your application is under review. Your account will be activated once we finish; sign in from this page.',
    rejectedMsg: 'Application rejected: {r}. Update your details and submit again.',
    navApps: 'Applications', appsTitle: 'Agency applications', noApps: 'No applications.', approve: 'Approve & activate', reject: 'Reject', rejectReason: 'Rejection reason',
    approved: 'Agency activated.', rejectedDone: 'Application rejected.', ast_draft: 'Draft', ast_submitted: 'Awaiting review', ast_approved: 'Active', ast_rejected: 'Rejected', submittedAt: 'Submitted',
  });

  const DOCS = [['license', 'docLicense'], ['articles', 'docArticles'], ['tourism', 'docTourism'], ['civil_id', 'docCivil'], ['signature', 'docSignature'], ['iban_cert', 'docIban']];
  const f = (label, name, v, attrs = '') => `<label class="f">${esc(t(label))}<input name="${name}" value="${esc(v ?? '')}" ${attrs}></label>`;
  const two = (a, b) => `<div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${a}</div><div class="grow">${b}</div></div>`;

  // ------------------------------------------------------------ sign up
  function renderSignup(step = 'form', email = '', msg = '') {
    $app.innerHTML = `
    <main class="auth"><div class="auth-card">
      <div class="row between">${brand()}${langToggle()}</div>
      <h1>${esc(t('register'))}</h1>
      <p class="muted" style="margin:0">${esc(step === 'otp' ? t('otpSent') : t('registerSub'))}</p>${msg}
      <form id="su" class="row" style="flex-direction:column;align-items:stretch;gap:14px" novalidate>
        ${step === 'otp'
          ? `<label class="f">${esc(t('otp'))}<input name="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="8" required dir="ltr"></label>`
          : `<label class="f">${esc(t('email'))}<input name="email" type="email" autocomplete="username" required dir="ltr" value="${esc(email)}"></label>
             <label class="f">${esc(t('password'))}<input name="password" type="password" minlength="8" autocomplete="new-password" required dir="ltr"></label>`}
        <button class="btn" type="submit">${esc(step === 'otp' ? t('verify') : t('createAccount'))}</button>
      </form>
      ${step === 'otp' ? `<button class="btn ghost small" type="button" id="resend">${esc(t('resend'))}</button>` : ''}
      <button class="btn ghost small" type="button" data-act="to-login">${esc(t('haveAccount'))}</button>
    </div></main>`;
    const rs = document.getElementById('resend');
    if (rs) rs.onclick = async () => {
      rs.disabled = true;
      const { error } = await sb.auth.resend({ type: 'signup', email });
      renderSignup('otp', email, `<p class="notice ${error ? 'bad' : 'good'}" role="status">${esc(error ? error.message : t('resent'))}</p>`);
    };
    document.getElementById('su').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const btn = e.target.querySelector('button'); btn.disabled = true;
      const bad = (m) => renderSignup(step, email, `<p class="notice bad" role="alert">${esc(m)}</p>`);
      if (step === 'otp') {
        const { error } = await sb.auth.verifyOtp({ email, token: String(fd.get('otp') || '').trim(), type: 'signup' });
        if (error) return bad(t('badOtp'));
        return; // onAuthStateChange routes to the application form
      }
      const em = String(fd.get('email') || '').trim().toLowerCase();
      const pw = String(fd.get('password') || '');
      if (pw.length < 8) return bad(t('pwMin'));
      const { data, error } = await sb.auth.signUp({ email: em, password: pw });
      if (error) return renderSignup('form', em, `<p class="notice bad" role="alert">${esc(error.message)}</p>`);
      if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        return renderSignup('form', em, `<p class="notice bad" role="alert">${esc(t('emailExists'))}</p>`);
      }
      if (!data.session) renderSignup('otp', em);
    };
  }

  // ------------------------------------------------------------ application
  async function viewApplication(msg = '') {
    const uid = state.session.user.id;
    let { data: a } = await sb.from('partner_applications').select('*').eq('user_id', uid).maybeSingle();
    if (!a) {
      const ins = await sb.from('partner_applications').insert({ email: state.session.user.email }).select('*').single();
      a = ins.data;
    }
    if (a?.status === 'approved') { location.reload(); return; }
    if (!a) { $app.innerHTML = `<main class="auth"><div class="auth-card"><p class="notice bad">${esc(t('errGeneric'))}</p></div></main>`; return; }
    const locked = a.status === 'submitted';
    const docs = a.docs || {};
    const termsHtml = T ? await T.termsSection(a, locked) : '';
    const docRow = (key, label) => `<div class="f" data-docbox="${key}" style="gap:6px"><span style="font-size:14px;font-weight:600;color:#3C4E50">${esc(t(label))}</span>
      ${docs[key] ? `<div class="row" style="gap:8px"><span class="badge good">✓ ${esc(t('uploaded'))}</span><button class="btn ghost small" type="button" data-view="${esc(docs[key])}">${esc(t('view'))}</button></div>` : ''}
      ${locked ? '' : `<input type="file" data-doc="${key}" accept="image/*,application/pdf">`}</div>`;
    const others = Array.isArray(docs.other) ? docs.other : [];
    const otherRow = () => `<div class="f" data-docbox="other" style="gap:6px"><span style="font-size:14px;font-weight:600;color:#3C4E50">${esc(t('docOther'))}</span>
      ${others.length ? `<div class="chips">${others.map((pth, i) => `<span class="badge good" style="display:inline-flex;gap:6px;align-items:center">✓ ${i + 1}
        <button class="btn ghost small" type="button" data-view="${esc(pth)}">${esc(t('view'))}</button>
        ${locked ? '' : `<button class="btn danger small" type="button" data-rm="${i}">${esc(t('removeFile'))}</button>`}</span>`).join('')}</div>` : ''}
      ${locked ? '' : `<input type="file" data-doc="other" multiple accept="image/*,application/pdf">`}</div>`;
    const sec = (title, inner) => `<fieldset class="card" style="display:flex;flex-direction:column;gap:12px" ${locked ? 'disabled' : ''}><legend style="font-weight:800;color:var(--deep);padding:0 6px">${esc(t(title))}</legend>${inner}</fieldset>`;
    const banner = a.status === 'submitted' ? `<p class="notice info">${esc(t('underReview'))}</p>`
      : a.status === 'rejected' ? `<p class="notice bad">${esc(t('rejectedMsg', { r: a.reject_reason || '—' }))}</p>` : '';
    $app.innerHTML = `
    <main class="main" style="max-width:860px;margin:0 auto;padding:24px 16px 60px">
      <div class="row between" style="margin-bottom:16px">${brand()}<div class="row">${langToggle()}<button class="btn ghost small" data-act="signout" type="button">${esc(t('signOut'))}</button></div></div>
      <h1>${esc(t('appTitle'))}</h1><p class="muted">${esc(t('appSub'))}</p>${banner}${msg}
      <form id="app-form" data-keep style="display:flex;flex-direction:column;gap:16px" novalidate>
        ${sec('secCompany', two(f('companyName', 'company_name', a.company_name, 'required'), f('companyNameAr', 'company_name_ar', a.company_name_ar))
          + two(f('licenseNo', 'license_no', a.license_no, 'dir="ltr" required'), f('licenseExpiry', 'license_expiry', a.license_expiry, `type="date" dir="ltr" required min="${new Date().toISOString().slice(0, 10)}"`))
          + docRow('license', 'docLicense') + docRow('articles', 'docArticles') + docRow('tourism', 'docTourism') + otherRow())}
        ${sec('secOwner', two(f('ownerName', 'owner_name', a.owner_name, 'required'), f('ownerCivil', 'owner_civil_id', a.owner_civil_id, 'dir="ltr" inputmode="numeric" maxlength="12" required'))
          + docRow('civil_id', 'docCivil') + f('signatory', 'signatory_name', a.signatory_name) + docRow('signature', 'docSignature'))}
        ${sec('secContact', two(f('phoneL', 'phone', a.phone, 'dir="ltr" inputmode="tel" required'), f('emailCo', 'email', a.email, 'type="email" dir="ltr" required')))}
        ${sec('secAddress', f('address', 'address', a.address, 'required') + f('paci', 'paci_no', a.paci_no, 'dir="ltr" inputmode="numeric" maxlength="10" required'))}
        ${sec('secBank', two(f('bankName', 'bank_name', a.bank_name, 'required'), f('holder', 'account_holder', a.account_holder, 'required'))
          + f('iban', 'iban', a.iban, 'dir="ltr" placeholder="KW00XXXX0000000000000000000000" maxlength="34" required') + docRow('iban_cert', 'docIban')
          + `<p class="muted" style="margin:0;font-size:13px">${esc(t('bankNote'))}</p>`)}
        ${termsHtml}
        <div id="missing" class="notice bad" role="alert" hidden></div>
        ${locked ? '' : `<div class="row"><button class="btn ghost" type="button" id="draft">${esc(t('saveDraft'))}</button><button class="btn accent grow" type="submit">${esc(t('submitApp'))}</button></div>`}
      </form>
    </main>`;

    document.querySelectorAll('[data-view]').forEach((b) => (b.onclick = () => openDoc(b.dataset.view)));
    const form = document.getElementById('app-form');
    const pad = T ? await T.mount(form, a) : null;
    if (locked) return;
    const collect = async () => {
      const fd = new FormData(form);
      const row = {};
      ['company_name', 'company_name_ar', 'license_no', 'license_expiry', 'owner_name', 'owner_civil_id', 'signatory_name', 'phone', 'email', 'address', 'paci_no', 'bank_name', 'account_holder', 'iban']
        .forEach((k) => { const v = String(fd.get(k) || '').trim(); row[k] = v || null; });
      const nd = { ...docs };
      nd.other = [...others];
      for (const inp of form.querySelectorAll('input[data-doc]')) {
        for (const [i, file] of [...(inp.files || [])].entries()) {
          if (file.size > 10 * 1024 * 1024) throw new Error('fileTooBig');
          const ext = (file.name.split('.').pop() || 'pdf').toLowerCase().replace(/[^a-z0-9]/g, '');
          const path = `${uid}/${inp.dataset.doc}-${Date.now()}-${i}.${ext}`;
          const up = await sb.storage.from('partner-docs').upload(path, file, { contentType: file.type });
          if (up.error) throw up.error;
          if (inp.dataset.doc === 'other') nd.other.push(path); else nd[inp.dataset.doc] = path;
        }
      }
      if (!nd.other.length) delete nd.other;
      row.docs = nd;
      const tb = form.querySelector('[data-terms]');
      if (tb) {
        row.terms_signer = String(fd.get('terms_signer') || '').trim() || null;
        row.terms_version = fd.get('terms_ok') ? Number(tb.dataset.terms) : null;
        if (pad?.has()) row.terms_signature = pad.data();
      }
      return row;
    };
    const save = async (status, btn) => {
      btn.disabled = true;
      try {
        const row = await collect();
        const { error } = await sb.from('partner_applications').update({ ...row, status }).eq('id', a.id);
        if (error) {
          const code = ['incomplete', 'license_expired', 'bad_iban', 'bad_paci', 'terms_required'].find((c) => (error.message || '').includes(c));
          if (code) {
            // keep the uploaded files / typed values as a draft, then explain what is missing
            await sb.from('partner_applications').update({ ...row, status: 'draft' }).eq('id', a.id);
            return viewApplication(`<p class="notice bad" role="alert">${esc(t('err_' + code, { d: (row.license_expiry || '').split('-').reverse().join('/') }))}</p>`);
          }
          throw error;
        }
        if (status === 'draft') { toast(t('draftSaved')); return viewApplication(); }
        viewApplication();
      } catch (ex) {
        console.error(ex);
        toast(ex.message === 'fileTooBig' ? t('fileTooBig') : t('errGeneric'));
        btn.disabled = false;
      }
    };
    // Highlight every missing required field / document before sending.
    const REQ = ['company_name', 'license_no', 'license_expiry', 'owner_name', 'owner_civil_id', 'signatory_name', 'phone', 'email', 'address', 'paci_no', 'bank_name', 'account_holder', 'iban'];
    const REQ_DOCS = { license: 'docLicense', articles: 'docArticles', tourism: 'docTourism', civil_id: 'docCivil', signature: 'docSignature', iban_cert: 'docIban' };
    const validate = () => {
      form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
      const missing = [];
      REQ.forEach((n) => {
        const inp = form.querySelector(`[name="${n}"]`);
        if (inp && !inp.value.trim()) { inp.classList.add('invalid'); missing.push(inp.closest('label')?.firstChild?.textContent?.replace(' *', '').trim() || n); }
      });
      Object.entries(REQ_DOCS).forEach(([k, l]) => {
        const box = form.querySelector(`[data-docbox="${k}"]`);
        const picked = box?.querySelector('input[type=file]')?.files?.length;
        if (!docs[k] && !picked) { box?.classList.add('invalid'); missing.push(t(l).replace(' *', '').split(' (')[0]); }
      });
      const tbox = form.querySelector('[data-terms]');
      if (tbox) {
        const sg = tbox.querySelector('[name="terms_signer"]');
        if (!sg.value.trim()) { sg.classList.add('invalid'); missing.push(t('termsSigner').replace(' *', '')); }
        const ok = tbox.querySelector('[name="terms_ok"]');
        if (pad && !pad.has() && !a.terms_signature) { tbox.querySelector('.sigbox').classList.add('invalid'); missing.push(t('sigMissing')); }
        if (!ok.checked) { ok.closest('[data-docbox]').classList.add('invalid'); missing.push(t('secTerms')); }
      }
      const errBox = document.getElementById('missing');
      if (missing.length) {
        errBox.innerHTML = `<b>${esc(t('missingList'))}</b><ul style="margin:6px 0 0;padding-inline-start:20px">${missing.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`;
        errBox.hidden = false;
        errBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      const exp = form.querySelector('[name="license_expiry"]');
      if (exp.value && exp.value < new Date().toISOString().slice(0, 10)) {
        exp.classList.add('invalid');
        const [y, mo, d] = exp.value.split('-');
        errBox.innerHTML = esc(t('err_license_expired', { d: `${d}/${mo}/${y}` }));
        errBox.hidden = false;
        exp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
      errBox.hidden = true;
      return true;
    };
    form.addEventListener('input', (e) => { if (e.target.value?.trim()) e.target.classList.remove('invalid'); });
    form.addEventListener('change', (e) => { if (e.target.type === 'file' && e.target.files?.length) e.target.closest('[data-docbox]')?.classList.remove('invalid'); });
    form.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = async () => {
      const rest = others.filter((_, i) => i !== Number(b.dataset.rm));
      const nd = { ...docs }; if (rest.length) nd.other = rest; else delete nd.other;
      await sb.from('partner_applications').update({ docs: nd }).eq('id', a.id);
      viewApplication();
    }));
    form.onsubmit = (e) => { e.preventDefault(); if (validate()) save('submitted', form.querySelector('button[type=submit]')); };
    document.getElementById('draft').onclick = (e) => save('draft', e.target);
  }

  async function openDoc(path) {
    const { data, error } = await sb.storage.from('partner-docs').createSignedUrl(path, 300);
    if (error) return toast(t('errGeneric'));
    window.open(data.signedUrl, '_blank', 'noopener');
  }

  // ------------------------------------------------------------ admin review
  async function viewApplications(openId) {
    const { data, error } = await sb.from('partner_applications').select('*').neq('status', 'draft').order('submitted_at', { ascending: false });
    if (error) return shell('apps', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const tone = (s) => (s === 'approved' ? 'good' : s === 'submitted' ? 'accent' : s === 'rejected' ? 'bad' : '');
    const kv = (k, v) => `<dt>${esc(t(k)).replace(' *', '')}</dt><dd>${esc(v || '—')}</dd>`;
    const card = (a) => {
      const docs = a.docs || {};
      const open = a.id === openId || (!openId && a.status === 'submitted');
      return `<details class="card" ${open ? 'open' : ''} style="display:flex;flex-direction:column;gap:12px">
        <summary class="row between" style="cursor:pointer;list-style:none"><b>${esc(a.company_name || '—')}</b>
          <span class="row" style="gap:8px"><span class="muted" style="font-size:13px">${a.submitted_at ? esc(fmtDate(a.submitted_at)) : ''}</span><span class="badge ${tone(a.status)}">${esc(t('ast_' + a.status))}</span></span></summary>
        <dl class="kv" style="margin-top:12px">
          ${kv('companyNameAr', a.company_name_ar)}${kv('licenseNo', a.license_no)}${kv('licenseExpiry', a.license_expiry)}${kv('ownerName', a.owner_name)}${kv('ownerCivil', a.owner_civil_id)}
          ${kv('signatory', a.signatory_name)}${kv('phoneL', a.phone)}${kv('emailCo', a.email)}${kv('address', a.address)}${kv('paci', a.paci_no)}${kv('bankName', a.bank_name)}${kv('holder', a.account_holder)}${kv('iban', a.iban)}<dt>${esc(t('secTerms'))}</dt><dd>${a.terms_version ? esc(t('acceptedOn', { v: a.terms_version, d: a.terms_accepted_at ? fmtDate(a.terms_accepted_at) : '—', n: a.terms_signer || '—' })) : esc(t('notAccepted'))}</dd>
        </dl>
        <div class="chips">${DOCS.filter(([k]) => docs[k]).map(([k, l]) => `<button class="btn ghost small" type="button" data-view="${esc(docs[k])}">📄 ${esc(t(l).replace(' *', ''))}</button>`).join('')}
          ${(Array.isArray(docs.other) ? docs.other : []).map((pth, i) => `<button class="btn ghost small" type="button" data-view="${esc(pth)}">📄 ${esc(state.lang === 'ar' ? 'شهادة إضافية' : 'Extra certificate')} ${i + 1}</button>`).join('')}</div>
        ${a.status === 'rejected' && a.reject_reason ? `<p class="notice bad">${esc(a.reject_reason)}</p>` : ''}
        ${a.status === 'approved' && a.terms_version ? `<div class="row" style="gap:8px">${a.contract_path
          ? `<button class="btn ghost small" type="button" data-signed="${esc(a.contract_path)}">📄 ${esc(t('signedCopy'))}</button><button class="btn ghost small" type="button" data-resign="${a.id}">${esc(t('resend'))}</button>`
          : `<button class="btn accent small" type="button" data-resign="${a.id}">✍️ ${esc(t('pending'))}</button>`}</div>` : ''}
        ${a.status === 'submitted' ? `<div class="row" style="gap:10px;align-items:flex-end;flex-wrap:wrap" data-app="${a.id}">
          <label class="f" style="width:140px">${esc(t('rate'))}<input type="number" name="rate" min="0" max="100" step="0.1" value="10" dir="ltr"></label>
          <button class="btn accent" type="button" data-approve>${esc(t('approve'))}</button>
          <label class="f grow">${esc(t('rejectReason'))}<input name="reason"></label>
          <button class="btn danger" type="button" data-reject>${esc(t('reject'))}</button></div>` : ''}
      </details>`;
    };
    shell('apps', `<div class="top"><h1>${esc(t('appsTitle'))}</h1></div>
      ${(data || []).length ? `<div style="display:flex;flex-direction:column;gap:14px">${data.map(card).join('')}</div>` : `<div class="card empty">${esc(t('noApps'))}</div>`}`);
    document.querySelectorAll('[data-view]').forEach((b) => (b.onclick = () => openDoc(b.dataset.view)));
    document.querySelectorAll('[data-signed]').forEach((b) => (b.onclick = () => T.openSigned(b.dataset.signed)));
    document.querySelectorAll('[data-resign]').forEach((b) => (b.onclick = async () => { b.disabled = true; await T.signAndSend(b.dataset.resign); viewApplications(b.dataset.resign); }));
    document.querySelectorAll('[data-app]').forEach((box) => {
      const id = box.dataset.app;
      box.querySelector('[data-approve]').onclick = async (e) => {
        e.target.disabled = true;
        const { error: er } = await sb.rpc('admin_review_application', { p_app: id, p_approve: true, p_rate: Number(box.querySelector('[name=rate]').value || 10) });
        toast(er ? (String(er.message).includes('agency_not_signed') ? t('agencyNotSigned') : t('errGeneric')) : t('approved'));
        if (!er && T) await T.signAndSend(id);
        viewApplications(id);
      };
      box.querySelector('[data-reject]').onclick = async (e) => {
        const reason = box.querySelector('[name=reason]').value.trim();
        if (!reason) return box.querySelector('[name=reason]').focus();
        e.target.disabled = true;
        const { error: er } = await sb.rpc('admin_review_application', { p_app: id, p_approve: false, p_reason: reason });
        toast(er ? t('errGeneric') : t('rejectedDone'));
        viewApplications(id);
      };
    });
  }

  return { renderSignup, viewApplication, viewApplications };
}
