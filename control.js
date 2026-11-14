// Admin control panel: KPIs, system health, payment security alerts, editable platform settings, quick links.
export function installControl(ctx) {
  const { sb, state, t, esc, money, fmtDate, shell, toast, STR, fallback } = ctx;
  Object.assign(STR.ar, {
    wTitle: 'المحفظة والليالي المجانية', wOn: 'تفعيل برنامج الليلة المجانية', wNights: 'عدد الليالي المطلوبة لكل فئة', wDays: 'صلاحية الليلة (يوم)', wShare: 'أقصى تمويل: % من عمولة المنصة',
    wWeekend: 'منع الاستخدام إذا آخر ليلة جمعة أو سبت', wHolidays: 'منع الاستخدام في العطل الرسمية', wHolList: 'العطل الرسمية (كل سطر: من إلى الاسم)',
    wNote: 'الليلة المجانية = الليلة التالية بعد العدد المطلوب (مثلاً 12 مدفوعة والـ13 مجانية)، بنفس فئة الفندق. نسبة التمويل تحدد أقصى قيمة لليلة من عمولة المنصة على حجوزات الاستحقاق والاستخدام، والليالي الممنوحة يدوياً بدون حد.',
    wGrant: 'منح ليلة لعميل', wEmail: 'إيميل العميل', wTier: 'الفئة', wT5: '5 نجوم', wT4: '4 نجوم', wValid: 'الصلاحية (يوم)', wMemo: 'ملاحظة (اختياري)', wGive: 'منح الليلة',
    wCols: ['العميل', 'الفئة', 'الحالة', 'النوع', 'تنتهي في', ''], wManual: 'يدوية', wAuto: 'مكتسبة', wSaveDate: 'حفظ التاريخ', wRevoke: 'إلغاء', wNone: 'ما في ليالي مجانية لين الحين.',
    w_available: 'متاحة', w_used: 'مستخدمة', w_expired: 'منتهية', wDone: 'تم', wAskRevoke: 'تلغي هذه الليلة المجانية؟',
    e_no_user: 'ما لقينا عميل بهذا الإيميل.', e_has_night: 'العميل عنده ليلة متاحة في هذه الفئة.', e_bad_input: 'البيانات غير صحيحة.', e_bad_nights: 'عدد الليالي لازم بين 1 و60.', e_bad_days: 'الصلاحية لازم بين 1 و1095 يوم.', e_bad_holidays: 'قائمة العطل غير صحيحة.',
    cpTitle: 'لوحة التحكم', cpSub: 'كل أرقام التطبيق وصحة النظام والأمان والإعدادات في مكان واحد.', cpRefresh: '🔄 تحديث',
    cpSales: 'المبيعات', cpUsers: 'المستخدمين والشركاء', cpActivity: 'النشاط', cpHealth: 'صحة النظام', cpSecurity: 'الأمان وبوابة الدفع', cpSettings: 'إعدادات المنصة', cpLinks: 'اختصارات',
    k_revenue: 'إجمالي المبيعات', k_revenue_30d: 'مبيعات آخر 30 يوم', k_commission: 'عمولة المنصة', k_listing_fees: 'رسوم الإعلانات', k_bookings_paid: 'حجوزات مدفوعة', k_esim_orders: 'شرائح eSIM مباعة',
    k_travelers: 'المسافرين', k_travelers_7d: 'مسافرين جدد (7 أيام)', k_agencies_active: 'مكاتب فعّالة', k_agencies_suspended: 'مكاتب موقوفة', k_applications_pending: 'طلبات انضمام بالانتظار', k_push_devices: 'أجهزة الإشعارات',
    k_requests: 'طلبات السفر', k_requests_open: 'طلبات مفتوحة الحين', k_offers: 'عروض الأسعار', k_special_offers_live: 'عروض خاصة منشورة', k_free_nights_given: 'ليالي مجانية مستحقة',
    hJob: 'المهمة التلقائية', hSchedule: 'التوقيت', hLast: 'آخر تشغيل', hStatus: 'الحالة', hFails: 'فشل (24 ساعة)', hPush: 'إشعارات متأخرة', hMail: 'إيميلات متأخرة', hDb: 'حجم قاعدة البيانات', hNoJobs: 'ما في مهام تلقائية.',
    hOk: 'سليم', hFail: 'فشل', hOff: 'متوقف', hRunning: 'يعمل',
    sMode: 'وضع الدفع', sLive: '🟢 حقيقي (LIVE)', sTest: '🧪 تجريبي — ما ينخصم أي مبلغ', sReview: 'مدفوعات تحتاج مراجعة', sAlerts: 'تنبيهات آخر 7 أيام', sAdmins: 'حسابات الإدارة', sNoAlerts: '✅ ما في أي تنبيهات أمنية.',
    sCols: ['الوقت', 'المصدر', 'النوع', 'المرجع'], al_MISMATCH: 'مبلغ أو مرجع غير مطابق', al_BAD_SIGNATURE: 'توقيع Webhook غير صحيح', al_UNKNOWN_INVOICE: 'فاتورة غير معروفة', al_rate_limited: 'محاولات دفع كثيرة', al_error: 'خطأ', al_settle_error: 'خطأ في تأكيد الدفع',
    sAdminsWarn: 'تأكد إن كل حسابات الإدارة مفعّل فيها التحقق بخطوتين (2FA).',
    fPlans: 'رسوم إعلان العروض الخاصة (د.ك)', fWeek: 'أسبوعي (7 أيام)', fMonth: 'شهري (30 يوم)', fQuarter: 'فصلي (90 يوم)',
    fPromo: 'عمولة العروض الخاصة %', fFounders: 'عمولة الشركاء المؤسسين % (أول 3 شهور)', fMaxOffers: 'أقصى عدد خيارات أسعار لكل مكتب في الطلب', fFreeShare: 'تمويل الليلة المجانية: % من عمولة المنصة', fFreeShareNote: 'قيمة الليلة المجانية لا تتجاوز هذه النسبة من عمولة المنصة على الحجزين (حجز الاستحقاق + حجز الاستخدام)، فلا تدفع المنصة أكثر مما كسبت. 0 = إيقاف البرنامج.', fTesters: 'إيميلات المجربين لبوابة الدفع (وحد بكل سطر)',
    fTestersNote: 'هذولي بس يقدرون يدفعون في الوضع التجريبي (مع حسابات الإدارة).', fIntro: 'تفعيل الفترة التمهيدية للمكاتب (عمولة مخفضة بعد تفعيل العقد)', fIntroRate: 'عمولة الفترة التمهيدية %', fIntroDays: 'مدة الفترة التمهيدية (بالأيام)', fIntroNote: 'تطبَّق على حجوزات طلبات الأسعار من تاريخ تفعيل عقد المكتب، وبعد انتهاء المدة ترجع نسبة العقد (10%) تلقائياً. مكاتب في الفترة الحين: {n}. تمديد أو تقليل المدة لمكتب معيّن من صفحة الشركاء.', e_bad_intro_days: 'مدة الفترة التمهيدية بين 0 و 730 يوم.', fWa: 'تسجيل الدخول برقم الهاتف في التطبيق (الرمز يوصل على الواتساب)', fWaNote: 'لا تفعّله إلا بعد موافقة Meta على رقم الواتساب وقالب رمز الدخول (otp_login) وإضافة المفاتيح، وإلا ما بيوصل الرمز للمسافر.', fSave: 'حفظ الإعدادات', fSaved: 'تم حفظ الإعدادات.', fConfirm: 'تأكيد حفظ الإعدادات؟ التغيير يطبّق فوراً على التطبيق والبوابة.',
    fNotice: '⚠️ حسب الاتفاقية: أي تعديل على الرسوم أو العمولة يُبلَّغ للشركاء قبل 30 يوم من تطبيقه.',
    e_bad_fee: 'الرسوم لازم تكون بين 0 و 1000 د.ك.', e_bad_commission: 'العمولة لازم تكون بين 0 و 30%.', e_bad_max_offers: 'أقصى عدد الخيارات بين 1 و 10.', e_bad_limit: 'حد الليلة المجانية غير صحيح.', e_bad_email: 'في إيميل غير صحيح.', e_too_many_testers: 'الحد الأقصى 20 إيميل.',
    cpNotReady: 'لوحة التحكم تحتاج تحديث قاعدة البيانات (control_panel.sql). هذي النظرة العامة المختصرة لين يتم التحديث.',
    lk_apps: '📝 طلبات الانضمام', lk_partners: '🏢 الشركاء', lk_allbookings: '🧾 كل الحجوزات', lk_promos: '📣 العروض الخاصة', lk_push: '🔔 الإشعارات', lk_esim: '📶 شرائح eSIM', lk_terms: '📄 الشروط والأحكام',
    lk_supabase: '🗄️ Supabase', lk_mf: '💳 MyFatoorah', lk_asc: '🍎 App Store Connect',
  });
  Object.assign(STR.en, {
    wTitle: 'Wallet and free nights', wOn: 'Free-night program on', wNights: 'Nights required per class', wDays: 'Night validity (days)', wShare: 'Max funding: % of platform commission',
    wWeekend: 'Block when the last night is Friday or Saturday', wHolidays: 'Block on public holidays', wHolList: 'Public holidays (each line: from to name)',
    wNote: 'The free night is the night after the required count (e.g. 12 paid, the 13th free), same hotel class. The funding share caps the night value by the platform commission on the earning and using bookings; hand-granted nights have no cap.',
    wGrant: 'Grant a night to a customer', wEmail: 'Customer email', wTier: 'Class', wT5: '5 stars', wT4: '4 stars', wValid: 'Validity (days)', wMemo: 'Note (optional)', wGive: 'Grant night',
    wCols: ['Customer', 'Class', 'Status', 'Type', 'Expires', ''], wManual: 'Manual', wAuto: 'Earned', wSaveDate: 'Save date', wRevoke: 'Revoke', wNone: 'No free nights yet.',
    w_available: 'Available', w_used: 'Used', w_expired: 'Expired', wDone: 'Done', wAskRevoke: 'Revoke this free night?',
    e_no_user: 'No customer with this email.', e_has_night: 'The customer already has an available night in this class.', e_bad_input: 'Invalid input.', e_bad_nights: 'Nights must be between 1 and 60.', e_bad_days: 'Validity must be between 1 and 1095 days.', e_bad_holidays: 'Invalid holiday list.',
    cpTitle: 'Control panel', cpSub: 'All app numbers, system health, security and settings in one place.', cpRefresh: '🔄 Refresh',
    cpSales: 'Sales', cpUsers: 'Users & partners', cpActivity: 'Activity', cpHealth: 'System health', cpSecurity: 'Security & payment gateway', cpSettings: 'Platform settings', cpLinks: 'Shortcuts',
    k_revenue: 'Total sales', k_revenue_30d: 'Sales, last 30 days', k_commission: 'Platform commission', k_listing_fees: 'Listing fees', k_bookings_paid: 'Paid bookings', k_esim_orders: 'eSIMs sold',
    k_travelers: 'Travelers', k_travelers_7d: 'New travelers (7 days)', k_agencies_active: 'Active agencies', k_agencies_suspended: 'Suspended agencies', k_applications_pending: 'Pending applications', k_push_devices: 'Push devices',
    k_requests: 'Trip requests', k_requests_open: 'Open requests now', k_offers: 'Price offers', k_special_offers_live: 'Live special offers', k_free_nights_given: 'Free nights earned',
    hJob: 'Scheduled job', hSchedule: 'Schedule', hLast: 'Last run', hStatus: 'Status', hFails: 'Failures (24h)', hPush: 'Delayed push', hMail: 'Delayed emails', hDb: 'Database size', hNoJobs: 'No scheduled jobs.',
    hOk: 'OK', hFail: 'Failed', hOff: 'Off', hRunning: 'Running',
    sMode: 'Payment mode', sLive: '🟢 Live', sTest: '🧪 Test — no money is charged', sReview: 'Payments to review', sAlerts: 'Alerts, last 7 days', sAdmins: 'Admin accounts', sNoAlerts: '✅ No security alerts.',
    sCols: ['Time', 'Source', 'Type', 'Reference'], al_MISMATCH: 'Amount or reference mismatch', al_BAD_SIGNATURE: 'Bad webhook signature', al_UNKNOWN_INVOICE: 'Unknown invoice', al_rate_limited: 'Too many payment attempts', al_error: 'Error', al_settle_error: 'Payment confirmation error',
    sAdminsWarn: 'Make sure every admin account has two-factor authentication (2FA) on.',
    fPlans: 'Special-offer listing fees (KWD)', fWeek: 'Weekly (7 days)', fMonth: 'Monthly (30 days)', fQuarter: 'Quarterly (90 days)',
    fPromo: 'Special-offer commission %', fFounders: 'Founding partners commission % (first 3 months)', fMaxOffers: 'Max price options per agency per request', fFreeShare: 'Free night funding: % of platform commission', fFreeShareNote: 'The free night never exceeds this share of the platform commission on the two bookings (earning + using). 0 = program off.', fTesters: 'Payment tester emails (one per line)',
    fTestersNote: 'Only these (plus admins) can pay while in test mode.', fIntro: 'Enable the introductory period for agencies (reduced commission after contract activation)', fIntroRate: 'Introductory commission %', fIntroDays: 'Introductory period (days)', fIntroNote: 'Applies to request bookings from the agency’s contract activation date; the contract rate (10%) returns automatically afterwards. Agencies in the period now: {n}. Extend or shorten it per agency from the Partners page.', e_bad_intro_days: 'Introductory period must be 0–730 days.', fWa: 'Phone number sign-in in the app (code sent on WhatsApp)', fWaNote: 'Turn on only after Meta approves the WhatsApp number and the sign-in template (otp_login) and the keys are added, or travelers will not receive the code.', fSave: 'Save settings', fSaved: 'Settings saved.', fConfirm: 'Save the settings? Changes apply to the app and portal immediately.',
    fNotice: '⚠️ Per the agreement: any change to fees or commission must be notified to partners 30 days before it applies.',
    e_bad_fee: 'Fees must be between 0 and 1000 KWD.', e_bad_commission: 'Commission must be between 0 and 30%.', e_bad_max_offers: 'Max options must be 1–10.', e_bad_limit: 'Invalid free night cap.', e_bad_email: 'An email is invalid.', e_too_many_testers: 'Maximum 20 emails.',
    cpNotReady: 'The control panel needs the database update (control_panel.sql). Showing the short overview until then.',
    lk_apps: '📝 Applications', lk_partners: '🏢 Partners', lk_allbookings: '🧾 All bookings', lk_promos: '📣 Special offers', lk_push: '🔔 Notifications', lk_esim: '📶 eSIMs', lk_terms: '📄 Terms',
    lk_supabase: '🗄️ Supabase', lk_mf: '💳 MyFatoorah', lk_asc: '🍎 App Store Connect',
  });

  const num = (v) => Number(v || 0).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-US');
  const tile = (k, v, tone) => `<div class="card" style="display:flex;flex-direction:column;gap:4px;padding:14px 16px">
    <span class="muted" style="font-size:13px">${esc(t(k))}</span><b style="font-size:24px;color:${tone === 'bad' ? 'var(--bad)' : tone === 'good' ? 'var(--good)' : 'var(--deep)'}">${esc(v)}</b></div>`;
  const grid = (html) => `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px">${html}</div>`;
  const section = (title, body) => `<section style="margin-top:26px"><h2 style="margin:0 0 12px">${esc(t(title))}</h2>${body}</section>`;
  const when = (d) => (d ? fmtDate(d) : '—');

  async function wallet() {
    const box = document.getElementById('cp-wallet'); if (!box) return;
    const { data, error } = await sb.rpc('admin_wallet_list');
    if (!box.isConnected) return;   // the admin left the page while loading
    const rows = error ? [] : (data || []);
    const werr = (err) => { const c = (String(err.message).match(/no_user|has_night|bad_input/) || [])[0]; toast(c ? t('e_' + c) : t('errGeneric')); };
    box.innerHTML = `<form id="w-grant" data-keep class="card" style="display:flex;flex-direction:column;gap:12px;max-width:760px" novalidate>
        <b>${esc(t('wGrant'))}</b>
        <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap">
          <label class="grow" style="display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:14px">${esc(t('wEmail'))}<input name="email" type="email" dir="ltr" required></label>
          <label style="display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:14px">${esc(t('wTier'))}<select name="tier"><option value="5">${esc(t('wT5'))}</option><option value="4">${esc(t('wT4'))}</option></select></label>
          <label style="display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:14px;max-width:130px">${esc(t('wValid'))}<input name="days" type="number" min="1" max="1095" value="365" dir="ltr" required></label></div>
        <label style="display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:14px">${esc(t('wMemo'))}<input name="note" maxlength="200"></label>
        <div><button class="btn" type="submit">${esc(t('wGive'))}</button></div></form>
      <div class="tbl-wrap" style="margin-top:12px">${rows.length ? `<table><thead><tr>${t('wCols').map((x) => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>
          <td>${esc(r.name || '—')}<br><span class="muted" dir="ltr" style="font-size:12px">${esc(r.email || '')}</span>${r.note ? `<br><span class="muted" style="font-size:12px">${esc(r.note)}</span>` : ''}</td>
          <td>${esc(r.tier)}★</td><td>${esc(t('w_' + r.status))}</td><td>${esc(t(r.manual ? 'wManual' : 'wAuto'))}</td>
          <td>${r.status === 'used' ? esc(fmtDate(r.used_at)) : `<input type="date" data-w="${esc(r.id)}" value="${esc(String(r.expires_at).slice(0, 10))}" dir="ltr" style="max-width:150px">`}</td>
          <td>${r.status === 'used' ? '' : `<button class="btn ghost small" data-wsave="${esc(r.id)}">${esc(t('wSaveDate'))}</button> ${r.status === 'available' ? `<button class="btn ghost small" data-wrev="${esc(r.id)}">${esc(t('wRevoke'))}</button>` : ''}`}</td></tr>`).join('')}</tbody></table>` : `<p class="muted">${esc(t('wNone'))}</p>`}</div>`;
    box.querySelector('#w-grant').onsubmit = async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const { error: err } = await sb.rpc('admin_wallet_grant', { p_email: String(f.get('email') || '').trim(), p_tier: parseInt(f.get('tier'), 10), p_days: parseInt(f.get('days'), 10), p_note: String(f.get('note') || '') });
      if (err) return werr(err);
      toast(t('wDone')); wallet();
    };
    box.querySelectorAll('[data-wsave]').forEach((b) => { b.onclick = async () => {
      const v = box.querySelector(`[data-w="${b.dataset.wsave}"]`).value; if (!v) return;
      const { error: err } = await sb.rpc('admin_wallet_set', { p_id: b.dataset.wsave, p_expires: `${v}T23:59:59+03:00`, p_revoke: false });
      if (err) return werr(err);
      toast(t('wDone')); wallet();
    }; });
    box.querySelectorAll('[data-wrev]').forEach((b) => { b.onclick = async () => {
      if (!confirm(t('wAskRevoke'))) return;
      const { error: err } = await sb.rpc('admin_wallet_set', { p_id: b.dataset.wrev, p_expires: null, p_revoke: true });
      if (err) return werr(err);
      toast(t('wDone')); wallet();
    }; });
  }

  async function viewControl() {
    const { data: c, error } = await sb.rpc('admin_control');
    if (error) {
      await fallback();
      const main = document.querySelector('main.main') || document.getElementById('app');
      main?.insertAdjacentHTML('afterbegin', `<p class="notice info" style="margin-bottom:14px">${esc(t('cpNotReady'))}</p>`);
      return;
    }
    const k = c.kpi, h = c.health, s = c.security, st = c.settings;
    const plan = (key) => (st.promo_plans || []).find((p) => p.key === key)?.fee ?? '';

    const jobs = (h.jobs || []).map((j) => {
      const ok = !j.active ? ['', t('hOff')] : j.last_status === 'failed' ? ['bad', t('hFail')] : j.last_status === 'running' ? ['', t('hRunning')] : ['good', t('hOk')];
      return `<tr><td dir="ltr" style="font-weight:700">${esc(j.job)}</td><td dir="ltr"><code>${esc(j.schedule)}</code></td><td>${esc(when(j.last_run))}</td>
        <td><span class="badge ${ok[0]}">${esc(ok[1])}</span></td><td>${j.fails_24h > 0 ? `<b style="color:var(--bad)">${esc(j.fails_24h)}</b>` : '0'}</td></tr>`;
    }).join('');

    const alerts = (s.alerts || []).map((a) => `<tr><td>${esc(when(a.at))}</td><td dir="ltr">${esc(a.source || '')}</td>
      <td><span class="badge bad">${esc(t('al_' + a.kind) || a.kind)}</span></td><td dir="ltr" style="font-size:12px">${esc(a.ref || '')}</td></tr>`).join('');

    const links = ['apps', 'partners', 'allbookings', 'promos', 'push', 'esim', 'terms'].map((r) => `<a class="btn ghost small" href="#/${r}">${esc(t('lk_' + r))}</a>`).join('')
      + `<a class="btn ghost small" href="https://supabase.com/dashboard/project/eyuezkeuxobuvakqpwlu" target="_blank" rel="noopener">${esc(t('lk_supabase'))}</a>`
      + `<a class="btn ghost small" href="https://appstoreconnect.apple.com" target="_blank" rel="noopener">${esc(t('lk_asc'))}</a>`;

    const fld = (label, input) => `<label style="display:flex;flex-direction:column;gap:6px;font-weight:700;font-size:14px">${esc(label)}${input}</label>`;
    const n = (name, val, step, min, max) => `<input name="${name}" type="number" step="${step}" min="${min}" max="${max}" value="${esc(val ?? '')}" dir="ltr" required>`;

    shell('overview', `<div class="top"><div><h1>${esc(t('cpTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('cpSub'))}</p></div>
        <button class="btn ghost small" type="button" id="cp-refresh">${esc(t('cpRefresh'))}</button></div>
      ${(k.applications_pending > 0 || s.payments_review > 0 || s.alerts_7d > 0) ? `<div class="notice bad" style="margin-top:12px">
        ${k.applications_pending > 0 ? `<a href="#/apps">${esc(t('k_applications_pending'))}: ${esc(k.applications_pending)}</a> · ` : ''}
        ${s.payments_review > 0 ? `${esc(t('sReview'))}: ${esc(s.payments_review)} · ` : ''}${s.alerts_7d > 0 ? `${esc(t('sAlerts'))}: ${esc(s.alerts_7d)}` : ''}</div>` : ''}
      ${section('cpLinks', `<div class="row" style="gap:8px;flex-wrap:wrap">${links}</div>`)}
      ${section('cpSales', grid(tile('k_revenue', money(k.revenue)) + tile('k_revenue_30d', money(k.revenue_30d)) + tile('k_commission', money(k.commission), 'good')
        + tile('k_listing_fees', money(k.listing_fees)) + tile('k_bookings_paid', num(k.bookings_paid)) + tile('k_esim_orders', num(k.esim_orders))))}
      ${section('cpUsers', grid(tile('k_travelers', num(k.travelers)) + tile('k_travelers_7d', num(k.travelers_7d), 'good') + tile('k_agencies_active', num(k.agencies_active))
        + tile('k_agencies_suspended', num(k.agencies_suspended), k.agencies_suspended > 0 ? 'bad' : '') + tile('k_applications_pending', num(k.applications_pending), k.applications_pending > 0 ? 'bad' : '') + tile('k_push_devices', num(k.push_devices))))}
      ${section('cpActivity', grid(tile('k_requests', num(k.requests)) + tile('k_requests_open', num(k.requests_open)) + tile('k_offers', num(k.offers))
        + tile('k_special_offers_live', num(k.special_offers_live))))}
      ${section('cpSecurity', grid(tile('sMode', s.payments_mode === 'live' ? t('sLive') : t('sTest'), s.payments_mode === 'live' ? 'good' : '')
        + tile('sReview', num(s.payments_review), s.payments_review > 0 ? 'bad' : 'good') + tile('sAlerts', num(s.alerts_7d), s.alerts_7d > 0 ? 'bad' : 'good') + tile('sAdmins', num(s.admins)))
        + `<p class="muted" style="font-size:13px;margin:10px 0">🔐 ${esc(t('sAdminsWarn'))}</p>`
        + (alerts ? `<div class="tbl-wrap"><table><thead><tr>${t('sCols').map((x) => `<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${alerts}</tbody></table></div>` : `<p class="notice good">${esc(t('sNoAlerts'))}</p>`))}
      ${section('cpHealth', grid(tile('hPush', num(h.push_pending), h.push_pending > 0 ? 'bad' : 'good') + tile('hMail', num(h.mail_pending), h.mail_pending > 0 ? 'bad' : 'good') + tile('hDb', `${h.db_size_mb} MB`))
        + `<div class="tbl-wrap" style="margin-top:12px">${jobs ? `<table><thead><tr><th>${esc(t('hJob'))}</th><th>${esc(t('hSchedule'))}</th><th>${esc(t('hLast'))}</th><th>${esc(t('hStatus'))}</th><th>${esc(t('hFails'))}</th></tr></thead><tbody>${jobs}</tbody></table>` : `<p class="muted">${esc(t('hNoJobs'))}</p>`}</div>`)}
      ${section('cpSettings', `<form id="cp-form" data-keep class="card" style="display:flex;flex-direction:column;gap:14px;max-width:760px" novalidate>
        <p class="notice info" style="margin:0">${esc(t('fNotice'))}</p>
        <fieldset style="border:0;padding:0;margin:0"><legend style="font-weight:800;margin-bottom:8px">${esc(t('fPlans'))}</legend>
          <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${fld(t('fWeek'), n('week', plan('week'), '0.001', 0, 1000))}</div>
          <div class="grow">${fld(t('fMonth'), n('month', plan('month'), '0.001', 0, 1000))}</div><div class="grow">${fld(t('fQuarter'), n('quarter', plan('quarter'), '0.001', 0, 1000))}</div></div></fieldset>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${fld(t('fPromo'), n('promo_commission', st.promo_commission, '0.1', 0, 30))}</div>
          <div class="grow">${fld(t('fFounders'), n('founders_commission', st.founders_commission, '0.1', 0, 30))}</div></div>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${fld(t('fMaxOffers'), n('max_offers', st.max_offers, '1', 1, 10))}</div>
          </div>
        ${st.intro_days === undefined ? '' : `<label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="intro_enabled" style="width:auto" ${st.intro_enabled ? 'checked' : ''}> 🎁 ${esc(t('fIntro'))}</label>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${fld(t('fIntroRate'), n('intro_commission', st.intro_commission, '0.1', 0, 30))}</div>
          <div class="grow">${fld(t('fIntroDays'), n('intro_days', st.intro_days, '1', 0, 730))}</div></div>
        <p class="muted" style="margin:-6px 0 0;font-size:13px">${esc(t('fIntroNote', { n: st.intro_active ?? 0 }))}</p>`}
        ${st.free_night_nights === undefined ? '' : `<fieldset style="border:1px solid var(--line,#e5e7eb);border-radius:12px;padding:12px;margin:0;display:flex;flex-direction:column;gap:12px"><legend style="font-weight:800;padding:0 6px">🎁 ${esc(t('wTitle'))}</legend>
          <label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="free_night_enabled" style="width:auto" ${st.free_night_enabled ? 'checked' : ''}> ${esc(t('wOn'))}</label>
          <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${fld(t('wNights'), n('free_night_nights', st.free_night_nights, '1', 1, 60))}</div>
            <div class="grow">${fld(t('wDays'), n('free_night_days', st.free_night_days, '1', 1, 1095))}</div><div class="grow">${fld(t('wShare'), n('free_night_share', st.free_night_share, '1', 0, 100))}</div></div>
          <label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="free_night_block_weekend" style="width:auto" ${st.free_night_block_weekend ? 'checked' : ''}> ${esc(t('wWeekend'))}</label>
          <label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="free_night_block_holidays" style="width:auto" ${st.free_night_block_holidays ? 'checked' : ''}> ${esc(t('wHolidays'))}</label>
          ${fld(t('wHolList'), `<textarea name="free_night_holidays" rows="5" dir="auto">${esc((st.free_night_holidays || []).map((h) => `${h.from} ${h.to} ${h.name || ''}`.trim()).join('\n'))}</textarea>`)}
          <p class="muted" style="margin:0;font-size:13px">${esc(t('wNote'))}</p></fieldset>`}
        ${fld(t('fTesters'), `<textarea name="testers" rows="3" dir="ltr">${esc((st.payment_test_emails || []).join('\n'))}</textarea>`)}
        <p class="muted" style="margin:-6px 0 0;font-size:13px">${esc(t('fTestersNote'))}</p>
        <div><button class="btn" type="submit">${esc(t('fSave'))}</button></div></form>`)}
      ${st.free_night_nights === undefined ? '' : section('wTitle', '<div id="cp-wallet"></div>')}`);
    if (st.free_night_nights !== undefined) wallet();

    document.getElementById('cp-refresh').onclick = () => viewControl();
    document.getElementById('cp-form').onsubmit = async (e) => {
      e.preventDefault();
      if (!confirm(t('fConfirm'))) return;
      const f = new FormData(e.target);
      const p = {
        plans: { week: +f.get('week'), month: +f.get('month'), quarter: +f.get('quarter') },
        promo_commission: +f.get('promo_commission'), founders_commission: +f.get('founders_commission'),
        max_offers: parseInt(f.get('max_offers'), 10), 
        ...(f.has('intro_days') ? { intro_enabled: f.get('intro_enabled') === 'on', intro_commission: +f.get('intro_commission'), intro_days: parseInt(f.get('intro_days'), 10) } : {}),
        ...(f.has('free_night_nights') ? { free_night_enabled: f.get('free_night_enabled') === 'on', free_night_nights: parseInt(f.get('free_night_nights'), 10), free_night_days: parseInt(f.get('free_night_days'), 10),
          free_night_share: +f.get('free_night_share'), free_night_block_weekend: f.get('free_night_block_weekend') === 'on', free_night_block_holidays: f.get('free_night_block_holidays') === 'on',
          free_night_holidays: String(f.get('free_night_holidays') || '').split('\n').map((l) => l.trim().match(/^(\d{4}-\d\d-\d\d)\s+(\d{4}-\d\d-\d\d)\s*(.*)$/)).filter(Boolean).map((m) => ({ from: m[1], to: m[2], name: m[3] })) } : {}),
        payment_test_emails: String(f.get('testers') || '').split(/[\s,;]+/).map((x) => x.trim()).filter(Boolean),
      };
      const btn = e.target.querySelector('button[type=submit]'); btn.disabled = true;
      const { error: err } = await sb.rpc('admin_update_settings', { p });
      btn.disabled = false;
      if (err) {
        const code = (String(err.message).match(/bad_fee|bad_commission|bad_nights|bad_days|bad_holidays|bad_max_offers|bad_intro_days|bad_limit|bad_email|too_many_testers/) || [])[0];
        return toast(code ? t('e_' + code) : t('errGeneric'));
      }
      toast(t('fSaved'));
      viewControl();
    };
  }

  return { viewControl };
}
