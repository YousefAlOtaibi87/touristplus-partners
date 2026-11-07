// Special offers (partners) and admin views. Loaded by app.js.
export function install(ctx) {
  const { sb, state, t, esc, money, place, fmtDate, shell, toast, STR, SERVICES, TYPES, route } = ctx;

  Object.assign(STR.ar, {
    promoHow: 'طريقة النشر', promoHow1: 'أضف العرض واحفظه.', promoHow2: 'اختر مدة الإعلان وادفع رسومه عن طريق MyFatoorah: {plansText}.', promoHow3: 'يظهر العرض فوراً في التطبيق، ويتوقف تلقائياً بنهاية المدة ويمكنك تجديده.',
    promoHow4: 'عمولة المنصة {rate}% من كل حجز يتم عن طريق العروض الخاصة. هوية مكتبكم وبيانات التواصل تبقى مخفية عن المسافر حتى يدفع.',
    liveUntil: 'منشور حتى {d}', notLive: 'غير منشور', stoppedByAdmin: 'موقوف من الإدارة', publishBtn: '📣 {plan} — {fee} د.ك', renewBtn: '🔁 تجديد {plan} — {fee} د.ك', plan_week: 'أسبوعي (7 أيام)', plan_month: 'شهري (30 يوماً)', plan_quarter: 'فصلي (90 يوماً)', planDays: '{n} يوماً',
    founderBanner: '🎉 أنتم الشريك المؤسس رقم {n} من 10: نشر عروضكم الخاصة بدون رسوم إعلان وبدون عمولة العروض الخاصة حتى {d} (الملحق رقم 2 من الاتفاقية).', founderBtn: '📣 نشر مجاني حتى {d}', founderDone: 'نُشر العرض مجاناً حتى {d}.',
    foundersTitle: 'الشركاء المؤسسون: {n} من {max}', foundersSub: 'أول 10 مكاتب تُفعَّل: بدون رسوم إعلان وبدون عمولة العروض الخاصة لمدة 3 أشهر من التفعيل.', founderRemove: 'إلغاء صفة المؤسس', founderRemoveConfirm: 'إلغاء صفة الشريك المؤسس عن هذا المكتب وتحرير مقعده؟', noFounders: 'لم ينضم أي شريك مؤسس بعد.', founderNo: 'رقم', founderEnds: 'ينتهي العرض',
    payOpening: 'جاري فتح صفحة الدفع…', promoPaid: 'تم الدفع ونُشر العرض في التطبيق.', promoFailed: 'لم يكتمل الدفع، ولم يُنشر العرض.', needSave: 'احفظ العرض أولاً.', bookingsN: '{n} حجز',
    navPush: 'الإشعارات', pushTitle: 'إشعارات المسافرين', pushSub: 'إشعار يوصل لكل اللي منزّلين التطبيق وسمحوا بالإشعارات، مسجّلين أو بدون تسجيل. يُرسل بين 10 الصبح و10 الليل بتوقيت الكويت، وبحد أقصى إشعار تسويقي واحد لكل مسافر كل 20 ساعة.', pushDevices: 'أجهزة مسجّلة', pushOptIn: 'يستقبلون إشعارات العروض', pushGuests: 'منزّلين التطبيق بدون تسجيل', pushTitleAr: 'العنوان (عربي) *', pushBodyAr: 'النص (عربي) *', pushTitleEn: 'العنوان (إنجليزي)', pushBodyEn: 'النص (إنجليزي)', pushTarget: 'يفتح عند الضغط', tgtHome: 'الصفحة الرئيسية', tgtOffers: 'العروض الخاصة', tgtNew: 'طلب رحلة جديدة', pushSend: '📣 إرسال الإشعار', pushConfirm: 'إرسال هذا الإشعار لكل اللي منزّلين التطبيق؟', pushQueued: 'تم وضع الإشعار في قائمة الإرسال.', pushRecent: 'آخر الإشعارات العامة', pushNone: 'ما في إشعارات بعد.', pushAuto: 'تلقائياً يوصل للمسافر: عرض سعر جديد، عرض قرب ينتهي، تأكيد الحجز، عرض خاص جديد، وتذكير للي ما طلب رحلة.', pushNotReady: 'الإشعارات ما تفعّلت بعد في قاعدة البيانات.', ps_pending: 'بالانتظار', ps_sent: 'أُرسل', ps_skipped: 'لم يُرسل', kind_promo: 'عرض خاص', kind_broadcast: 'إشعار عام', pushSentTo: 'وصل لـ {n} جهاز',
    navPromos: 'العروض الخاصة', promosTitle: 'العروض الخاصة والإعلانات', promosSub: 'كل عرض منشور برسوم إعلان حسب مدته (أسبوعي أو شهري أو فصلي)، وعمولة العروض الخاصة تُحتسب تلقائياً على حجوزاتها، ويُعفى الشركاء المؤسسون منهما لأول 3 أشهر.', colOffer: 'العرض', colFee: 'الرسوم', colPaid: 'تاريخ الدفع', colEnds: 'ينتهي', colLive: 'الحالة', stopBtn: 'إيقاف', resumeBtn: 'إعادة تفعيل', stopNote: 'سبب الإيقاف (يظهر للمكتب)', noPromos: 'لا توجد عروض منشورة بعد.', pay_pending: 'بانتظار الدفع', pay_failed: 'فشل الدفع', pay_paid: 'مدفوع', pay_refunded: 'مسترد',
    navPackages: 'العروض الخاصة', packagesTitle: 'العروض الخاصة', packagesSub: 'عروض بسعر ثابت تظهر للمسافرين في قسم «العروض» وفي شريط الإعلانات بالتطبيق، ويحجزونها ويدفعون مباشرة من التطبيق.',
    newPackage: 'عرض جديد', editPackage: 'تعديل العرض', noPackages: 'ما أضفت أي عرض للحين.', pkgTitle: 'اسم العرض', pkgDesc: 'الوصف والبرنامج',
    pkgPrice: 'السعر للشخص (د.ك)', pkgNights: 'عدد الليالي', tripType: 'نوع الرحلة', availFrom: 'متاحة من', availTo: 'متاحة إلى', pkgImage: 'صورة العرض (تظهر في شريط الإعلانات)',
    active: 'فعّالة', hidden: 'مخفية', save: 'حفظ', saved: 'تم الحفظ.', del: 'حذف', delConfirm: 'تبي تحذف هذا العرض؟', deleted: 'تم الحذف.',
    errFields: 'كمّل الحقول المطلوبة (الاسم، الوجهة، الليالي، السعر).', perPerson: 'للشخص', uploading: 'جاري رفع الصورة…',
    adminTitle: 'لوحة الإدارة', navOverview: 'نظرة عامة', navPartners: 'الشركاء', navAllBookings: 'كل الحجوزات',
    st_travelers: 'المسافرين', st_partners: 'الشركاء الفعّالين', st_requests: 'طلبات السفر', st_open: 'طلبات مفتوحة', st_offers: 'العروض', st_bookings: 'الحجوزات',
    st_packages: 'العروض الخاصة', st_paid: 'إجمالي المدفوع', st_commission: 'إجمالي العمولات',
    verifiedL: 'موثّق', rate: 'العمولة %', supplier: 'كود المورد', sales: 'المبيعات', invite: 'إضافة شريك', inviteSub: 'بيوصل الشريك إيميل دعوة لتعيين كلمة المرور.',
    pkgCol: 'العروض', pkgUntil: 'حتى تاريخ', pkgLockedTitle: 'العروض الخاصة', pkgLockedSub: 'نشر العروض الخاصة متاح للشركاء المفعّلين. للاستفسار، تواصل مع إدارة TheTouristPlus على info@thetouristplus.com.',
    agencyName: 'اسم الشركة (EN)', agencyNameAr: 'اسم الشركة (عربي)', license: 'رقم الترخيص', inviteSent: 'تم إرسال الدعوة للشريك.', partner: 'الشريك', bookedAt: 'تاريخ الحجز',
  });
  Object.assign(STR.en, {
    promoHow: 'How publishing works', promoHow1: 'Add the offer and save it.', promoHow2: 'Choose the listing period and pay its fee via MyFatoorah: {plansText}.', promoHow3: 'The offer goes live in the app at once, stops automatically at the end of the period, and can be renewed.',
    promoHow4: 'Platform commission is {rate}% on every booking made through special offers. Your identity and contact details stay hidden from travelers until they pay.',
    liveUntil: 'Live until {d}', notLive: 'Not published', stoppedByAdmin: 'Stopped by admin', publishBtn: '📣 {plan} — {fee} KWD', renewBtn: '🔁 Renew {plan} — {fee} KWD', plan_week: 'Weekly (7 days)', plan_month: 'Monthly (30 days)', plan_quarter: 'Quarterly (90 days)', planDays: '{n} days',
    founderBanner: '🎉 You are founding partner no. {n} of 10: publish your special offers with no listing fees and no special-offers commission until {d} (agreement annex 2).', founderBtn: '📣 Publish free until {d}', founderDone: 'Offer published free until {d}.',
    foundersTitle: 'Founding partners: {n} of {max}', foundersSub: 'The first 10 activated agencies: no listing fees and no special-offers commission for 3 months from activation.', founderRemove: 'Remove founder status', founderRemoveConfirm: 'Remove founding-partner status from this agency and free its seat?', noFounders: 'No founding partners yet.', founderNo: 'No.', founderEnds: 'Offer ends',
    payOpening: 'Opening payment page…', promoPaid: 'Paid — your offer is live in the app.', promoFailed: 'Payment was not completed; the offer is not published.', needSave: 'Save the offer first.', bookingsN: '{n} bookings',
    navPush: 'Notifications', pushTitle: 'Traveler notifications', pushSub: 'Reaches everyone who installed the app and allowed notifications, signed in or not. Sent between 10:00 and 22:00 Kuwait time, at most one marketing notification per traveler every 20 hours.', pushDevices: 'Registered devices', pushOptIn: 'Receiving offer notifications', pushGuests: 'Installed, not signed in', pushTitleAr: 'Title (Arabic) *', pushBodyAr: 'Text (Arabic) *', pushTitleEn: 'Title (English)', pushBodyEn: 'Text (English)', pushTarget: 'Opens on tap', tgtHome: 'Home', tgtOffers: 'Special offers', tgtNew: 'New trip request', pushSend: '📣 Send notification', pushConfirm: 'Send this notification to all travelers?', pushQueued: 'Notification queued for sending.', pushRecent: 'Recent broadcast notifications', pushNone: 'No notifications yet.', pushAuto: 'Sent automatically to the traveler: new price offer, offer about to expire, booking confirmed, new special offer, and a reminder for those who have not requested a trip.', pushNotReady: 'Notifications are not enabled in the database yet.', ps_pending: 'Queued', ps_sent: 'Sent', ps_skipped: 'Not sent', kind_promo: 'Special offer', kind_broadcast: 'Broadcast', pushSentTo: 'Reached {n} devices',
    navPromos: 'Special offers', promosTitle: 'Special offers & ads', promosSub: 'Each live offer carries a listing fee by period (weekly, monthly or quarterly); the special-offers commission is applied to its bookings automatically. Founding partners are exempt from both for their first 3 months.', colOffer: 'Offer', colFee: 'Fee', colPaid: 'Paid', colEnds: 'Ends', colLive: 'Status', stopBtn: 'Stop', resumeBtn: 'Resume', stopNote: 'Reason (shown to the agency)', noPromos: 'No published offers yet.', pay_pending: 'Awaiting payment', pay_failed: 'Failed', pay_paid: 'Paid', pay_refunded: 'Refunded',
    navPackages: 'Special offers', packagesTitle: 'Special offers', packagesSub: 'Fixed-price offers shown to travelers in the app’s Offers section and the home banner; they book and pay in the app.',
    newPackage: 'New offer', editPackage: 'Edit offer', noPackages: 'You have not added any offers yet.', pkgTitle: 'Offer name', pkgDesc: 'Description & itinerary',
    pkgPrice: 'Price per person (KWD)', pkgNights: 'Nights', tripType: 'Trip type', availFrom: 'Available from', availTo: 'Available until', pkgImage: 'Offer image (shown in the banner)',
    active: 'Active', hidden: 'Hidden', save: 'Save', saved: 'Saved.', del: 'Delete', delConfirm: 'Delete this offer?', deleted: 'Deleted.',
    errFields: 'Fill in the required fields (name, destination, nights, price).', perPerson: 'per person', uploading: 'Uploading image…',
    adminTitle: 'Admin', navOverview: 'Overview', navPartners: 'Partners', navAllBookings: 'All bookings',
    st_travelers: 'Travelers', st_partners: 'Active partners', st_requests: 'Trip requests', st_open: 'Open requests', st_offers: 'Offers', st_bookings: 'Bookings',
    st_packages: 'Special offers', st_paid: 'Total paid', st_commission: 'Total commission',
    verifiedL: 'Verified', rate: 'Commission %', supplier: 'Supplier code', sales: 'Sales', invite: 'Add partner', inviteSub: 'The partner receives an invitation email to set a password.',
    pkgCol: 'Offers', pkgUntil: 'Until', pkgLockedTitle: 'Special offers', pkgLockedSub: 'Publishing special offers is available to activated partners. For questions, contact TheTouristPlus at info@thetouristplus.com.',
    agencyName: 'Company name (EN)', agencyNameAr: 'Company name (AR)', license: 'License no.', inviteSent: 'Invitation sent to the partner.', partner: 'Partner', bookedAt: 'Booked',
  });

  const field = (label, html) => `<label class="f">${esc(label)}${html}</label>`;

  // ------------------------------------------------------------ partner: packages
  async function promoSettings() {
    const { data } = await sb.from('platform_settings').select('promo_fee, promo_days, promo_plans, promo_commission, promo_terms_version, founders_limit').eq('id', 1).maybeSingle();
    const plans = Array.isArray(data?.promo_plans) && data.promo_plans.length ? data.promo_plans
      : [{ key: 'month', days: Number(data?.promo_days ?? 30), fee: Number(data?.promo_fee ?? 15) }];
    const ps = { plans, rate: Number(data?.promo_commission ?? 4), foundersLimit: Number(data?.founders_limit ?? 10) };
    ps.plans.forEach((p) => { p.label = STR[state.lang]?.['plan_' + p.key] ? t('plan_' + p.key) : t('planDays', { n: p.days }); });
    ps.plansText = ps.plans.map((p) => `${p.label} ${money(p.fee)}`).join(' · ');
    return ps;
  }
  // End of this agency's founding-partner period (null when not a founder or already over).
  async function founderUntil() {
    if (!state.agency?.founder_no) return null;
    const { data } = await sb.rpc('agency_founder_until', { p_agency: state.agency.id });
    return data && Date.parse(data) > Date.now() ? data : null;
  }
  const isLive = (p) => p.active && p.review_status !== 'rejected' && p.featured_until && Date.parse(p.featured_until) >= Date.now();

  async function startPromo(pkgId, btn, plan = 'month') {
    const T = ctx.terms;
    if (T?.latestTermsStatus) {
      const st = await T.latestTermsStatus();
      if (st.needs) return T.openAcceptDialog(() => startPromo(pkgId, btn, plan));
    }
    if (btn) btn.disabled = true;
    toast(t('payOpening'));
    const { data, error } = await sb.functions.invoke('promo-pay', { body: { package_id: pkgId, plan } });
    if (error || !data?.url) { if (btn) btn.disabled = false; return toast(t('errGeneric')); }
    location.href = data.url;
  }
  async function founderPublish(pkgId, btn) {
    const T = ctx.terms;
    if (T?.latestTermsStatus) {
      const st = await T.latestTermsStatus();
      if (st.needs) return T.openAcceptDialog(() => founderPublish(pkgId, btn));
    }
    if (btn) btn.disabled = true;
    const { data, error } = await sb.rpc('founder_publish', { p_package: pkgId });
    if (error) { if (btn) btn.disabled = false; return toast(t('errGeneric')); }
    toast(t('founderDone', { d: fmtDate(data) }));
    viewPackages();
  }

  async function viewPackages() {
    const q = new URLSearchParams(location.hash.split('?')[1] || '');
    if (q.get('promo') === 'paid') toast(t('promoPaid')); else if (q.get('promo') === 'failed') toast(t('promoFailed'));
    const [{ data, error }, ps, fUntil] = await Promise.all([
      sb.from('packages').select('*').eq('agency_id', state.agency.id).order('created_at', { ascending: false }),
      promoSettings(), founderUntil(),
    ]);
    if (error) return shell('packages', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const ids = (data || []).map((p) => p.id);
    const { data: bk } = ids.length ? await sb.from('offers').select('source_package').in('source_package', ids) : { data: [] };
    const nBk = (id) => (bk || []).filter((x) => x.source_package === id).length;
    const status = (p) => p.review_status === 'rejected'
      ? `<span class="badge bad" title="${esc(p.review_note || '')}">${esc(t('stoppedByAdmin'))}</span>`
      : isLive(p) ? `<span class="badge good">${esc(t('liveUntil', { d: fmtDate(p.featured_until) }))}</span>` : `<span class="badge">${esc(t('notLive'))}</span>`;
    const cards = (data || []).map((p) => `<div class="card rfq offer-card">
      <a href="#/package/${p.id}" style="color:inherit;text-decoration:none;display:flex;flex-direction:column;gap:8px">
        ${p.image_url ? `<img src="${esc(p.image_url)}" alt="" style="width:100%;height:150px;object-fit:cover;border-radius:12px">` : `<div class="offer-cover"><span>⚡ ${esc(place(p.destination))}</span></div>`}
        <div class="row between"><span class="dest">${esc(p.title)}</span>${status(p)}</div>
        <div class="muted" style="font-size:14px">${esc(place(p.destination))} · ${esc(t('type_' + p.trip_type))} · ${esc(t('nights', { n: p.nights }))}</div>
        <div class="foot"><span><b>${esc(money(p.price))}</b> <span class="muted">${esc(t('perPerson'))}</span></span><span class="muted">${esc(t('bookingsN', { n: nBk(p.id) }))}</span></div>
      </a>
      ${p.review_status === 'rejected' ? (p.review_note ? `<p class="notice bad" style="margin:0">${esc(p.review_note)}</p>` : '')
        : fUntil ? (isLive(p) && Date.parse(p.featured_until) >= Date.parse(fUntil) - 60000 ? ''
          : `<button class="btn accent" type="button" data-free="${p.id}" ${p.active ? '' : 'disabled'}>${esc(t('founderBtn', { d: fmtDate(fUntil) }))}</button>`)
        : `<div class="row" style="gap:6px;flex-wrap:wrap">${ps.plans.map((pl) => `<button class="btn small ${isLive(p) ? 'ghost' : 'accent'}" type="button" data-promo="${p.id}" data-plan="${esc(pl.key)}" ${p.active ? '' : 'disabled'}>${esc(t(isLive(p) ? 'renewBtn' : 'publishBtn', { plan: pl.label, fee: pl.fee }))}</button>`).join('')}</div>`}
    </div>`).join('');
    shell('packages', `
      <div class="top"><div><h1>${esc(t('packagesTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('packagesSub'))}</p></div>
        <a class="btn accent" href="#/package/new">+ ${esc(t('newPackage'))}</a></div>
      ${fUntil ? `<p class="notice good" style="margin-bottom:16px">${esc(t('founderBanner', { n: state.agency.founder_no, d: fmtDate(fUntil) }))}</p>` : ''}
      <div class="card promo-how"><h2>${esc(t('promoHow'))}</h2>
        <ol><li>${esc(t('promoHow1'))}</li><li>${esc(t('promoHow2', ps))}</li><li>${esc(t('promoHow3'))}</li></ol>
        <p class="muted" style="margin:0">${esc(t('promoHow4', ps))}</p></div>
      ${cards ? `<div class="list">${cards}</div>` : `<div class="card empty">${esc(t('noPackages'))}</div>`}`);
    document.querySelectorAll('[data-promo]').forEach((b) => (b.onclick = () => startPromo(b.dataset.promo, b, b.dataset.plan)));
    document.querySelectorAll('[data-free]').forEach((b) => (b.onclick = () => founderPublish(b.dataset.free, b)));
  }

  // ------------------------------------------------------------ admin: special offers
  async function viewPromos() {
    const [{ data, error }, { data: fd }, ps] = await Promise.all([sb.rpc('admin_promotions'), sb.rpc('admin_founders'), promoSettings()]);
    if (error) return shell('promos', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const founders = fd || [];
    const fBox = `<div class="card" style="margin-bottom:16px;display:flex;flex-direction:column;gap:8px">
      <h2 style="margin:0">⭐ ${esc(t('foundersTitle', { n: founders.length, max: ps.foundersLimit }))}</h2><p class="muted" style="margin:0;font-size:13px">${esc(t('foundersSub'))}</p>
      ${founders.length ? `<div class="tbl-wrap"><table><tbody>${founders.map((f) => `<tr><td>${esc(t('founderNo'))} ${esc(f.founder_no)}</td><td><b>${esc(f.name)}</b></td><td class="muted">${esc(fmtDate(f.activated_at))} → ${esc(fmtDate(f.founder_until))}</td><td><button class="btn ghost small" type="button" data-unfound="${f.id}">${esc(t('founderRemove'))}</button></td></tr>`).join('')}</tbody></table></div>` : `<p class="muted" style="margin:0">${esc(t('noFounders'))}</p>`}</div>`;
    const rows = (data || []).map((r) => `<tr>
      <td><b>${esc(r.title)}</b><div class="muted" style="font-size:12px">${esc(r.agency)}</div></td>
      <td>${esc(money(r.amount))}</td><td><span class="badge ${r.status === 'paid' ? 'good' : r.status === 'pending' ? 'accent' : ''}">${esc(t('pay_' + r.status))}</span></td>
      <td class="muted">${r.paid_at ? esc(fmtDate(r.paid_at)) : '—'}</td><td class="muted">${r.ends_at ? esc(fmtDate(r.ends_at)) : '—'}</td>
      <td>${r.review_status === 'rejected' ? `<span class="badge bad">${esc(t('stoppedByAdmin'))}</span>` : r.live ? `<span class="badge good">${esc(t('active'))}</span>` : `<span class="badge">${esc(t('notLive'))}</span>`}</td>
      <td>${esc(r.bookings)}</td>
      <td>${r.review_status === 'rejected' ? `<button class="btn small" type="button" data-resume="${r.package_id}">${esc(t('resumeBtn'))}</button>` : `<button class="btn danger small" type="button" data-stop="${r.package_id}">${esc(t('stopBtn'))}</button>`}</td></tr>`).join('');
    shell('promos', `<div class="top"><div><h1>${esc(t('promosTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('promosSub'))}</p></div></div>
      ${fBox}
      ${rows ? `<div class="tbl-wrap"><table><thead><tr><th>${esc(t('colOffer'))}</th><th>${esc(t('colFee'))}</th><th>${esc(t('payStatus'))}</th><th>${esc(t('colPaid'))}</th><th>${esc(t('colEnds'))}</th><th>${esc(t('colLive'))}</th><th>${esc(t('st_bookings'))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="card empty">${esc(t('noPromos'))}</div>`}`);
    document.querySelectorAll('[data-stop]').forEach((b) => (b.onclick = async () => {
      const note = prompt(t('stopNote')) || '';
      const { error: e } = await sb.rpc('admin_review_package', { p_package: b.dataset.stop, p_approve: false, p_note: note });
      toast(e ? t('errGeneric') : t('saved')); viewPromos();
    }));
    document.querySelectorAll('[data-unfound]').forEach((b) => (b.onclick = async () => {
      if (!confirm(t('founderRemoveConfirm'))) return;
      const { error: e } = await sb.rpc('admin_set_founder', { p_agency: b.dataset.unfound, p_on: false });
      toast(e ? t('errGeneric') : t('saved')); viewPromos();
    }));
    document.querySelectorAll('[data-resume]').forEach((b) => (b.onclick = async () => {
      const { error: e } = await sb.rpc('admin_review_package', { p_package: b.dataset.resume, p_approve: true });
      toast(e ? t('errGeneric') : t('saved')); viewPromos();
    }));
  }

  async function viewPackage(id) {
    let p = { title: '', destination: '', trip_type: 'leisure', nights: 5, price: '', includes: ['flights', 'hotel'], active: true };
    if (id !== 'new') {
      const { data } = await sb.from('packages').select('*').eq('id', id).maybeSingle();
      if (!data) { location.hash = '#/packages'; return; }
      p = data;
    }
    const inc = new Set(p.includes || []);
    const rtl = state.lang === 'ar';
    shell('packages', `
      <a class="back" href="#/packages">${rtl ? '›' : '‹'} ${esc(t('back'))}</a>
      <div class="top"><h1>${esc(id === 'new' ? t('newPackage') : t('editPackage'))}</h1></div>
      <form id="pkg-form" data-keep class="card" style="display:flex;flex-direction:column;gap:14px;max-width:760px" novalidate>
        ${field(t('pkgTitle') + ' *', `<input name="title" required maxlength="120" value="${esc(p.title)}">`)}
        <div class="row" style="gap:12px;align-items:flex-start">
          <div class="grow">${field(t('destination') + ' *', `<input name="destination" required value="${esc(p.destination)}" placeholder="Istanbul">`)}</div>
          <div class="grow">${field(t('tripType'), `<select name="trip_type">${TYPES.map((x) => `<option value="${x}" ${p.trip_type === x ? 'selected' : ''}>${esc(t('type_' + x))}</option>`).join('')}</select>`)}</div>
        </div>
        <div class="row" style="gap:12px;align-items:flex-start">
          <div class="grow">${field(t('pkgNights') + ' *', `<input name="nights" type="number" min="1" max="60" required value="${esc(p.nights)}" dir="ltr">`)}</div>
          <div class="grow">${field(t('pkgPrice') + ' *', `<input name="price" type="number" min="1" step="0.001" required value="${esc(p.price)}" dir="ltr">`)}</div>
        </div>
        <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:14px;font-weight:600;color:#3C4E50;margin-bottom:6px">${esc(t('includes'))}</legend>
          <div class="chips">${SERVICES.map((s) => `<label class="chip ${inc.has(s) ? 'on' : ''}"><input type="checkbox" name="inc" value="${s}" ${inc.has(s) ? 'checked' : ''}> ${esc(t('svc_' + s))}</label>`).join('')}</div></fieldset>
        <div class="row" style="gap:12px;align-items:flex-start">
          <div class="grow">${field(t('airline'), `<input name="airline" value="${esc(p.airline || '')}" placeholder="${esc(t('airlinePh'))}">`)}</div>
          <div class="grow">${field(t('hotel'), `<input name="hotel" value="${esc(p.hotel || '')}" placeholder="${esc(t('hotelPh'))}">`)}</div>
          <div>${field(t('hotelStars'), `<select name="hotel_stars"><option value="">—</option>${[3, 4, 5].map((n) => `<option value="${n}" ${p.hotel_stars === n ? 'selected' : ''}>${'★'.repeat(n)}</option>`).join('')}</select>`)}</div>
        </div>
        <div class="row" style="gap:12px;align-items:flex-start">
          <div class="grow">${field(t('availFrom'), `<input name="available_from" type="date" value="${esc(p.available_from || '')}" dir="ltr">`)}</div>
          <div class="grow">${field(t('availTo'), `<input name="available_to" type="date" value="${esc(p.available_to || '')}" dir="ltr">`)}</div>
        </div>
        ${field(t('pkgDesc'), `<textarea name="description" placeholder="${esc(t('itineraryPh'))}">${esc(p.description || '')}</textarea>`)}
        <div>${p.image_url ? `<img src="${esc(p.image_url)}" alt="" id="pkg-img" style="width:220px;height:130px;object-fit:cover;border-radius:12px;display:block;margin-bottom:8px">` : ''}
          ${field(t('pkgImage'), `<input name="image" type="file" accept="image/*">`)}</div>
        <label class="chip ${p.active ? 'on' : ''}" style="align-self:flex-start"><input type="checkbox" name="active" ${p.active ? 'checked' : ''}> ${esc(t('active'))}</label>
        <p id="pkg-err" class="notice bad" role="alert" hidden></p>
        <div class="row"><button class="btn accent grow" type="submit">${esc(t('save'))}</button>
          ${id !== 'new' ? `<button class="btn danger" type="button" id="pkg-del">${esc(t('del'))}</button>` : ''}</div>
      </form>`);
    const form = document.getElementById('pkg-form');
    form.querySelectorAll('.chip input').forEach((i) => (i.onchange = () => i.closest('.chip').classList.toggle('on', i.checked)));
    form.onsubmit = async (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const err = document.getElementById('pkg-err');
      const row = {
        title: String(f.get('title') || '').trim(), destination: String(f.get('destination') || '').trim(), trip_type: f.get('trip_type'),
        nights: Number(f.get('nights')), price: Number(f.get('price')), includes: f.getAll('inc'),
        airline: String(f.get('airline') || '').trim() || null, hotel: String(f.get('hotel') || '').trim() || null,
        hotel_stars: f.get('hotel_stars') ? Number(f.get('hotel_stars')) : null, description: String(f.get('description') || '').trim() || null,
        available_from: f.get('available_from') || null, available_to: f.get('available_to') || null, active: !!f.get('active'),
      };
      if (row.title.length < 3 || !row.destination || !(row.nights >= 1) || !(row.price > 0)) { err.textContent = t('errFields'); err.hidden = false; return; }
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      try {
        const file = f.get('image');
        if (file && file.size) {
          toast(t('uploading'));
          const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
          const path = `${state.agency.id}/${Date.now()}.${ext}`;
          const up = await sb.storage.from('packages').upload(path, file, { contentType: file.type, upsert: false });
          if (up.error) throw up.error;
          row.image_url = sb.storage.from('packages').getPublicUrl(path).data.publicUrl;
        }
        const res = id === 'new' ? await sb.from('packages').insert({ ...row, agency_id: state.agency.id }) : await sb.from('packages').update(row).eq('id', id);
        if (res.error) throw res.error;
        toast(t('saved'));
        location.hash = '#/packages';
      } catch (ex) {
        console.error(ex);
        err.textContent = t('errGeneric'); err.hidden = false; btn.disabled = false;
      }
    };
    const del = document.getElementById('pkg-del');
    if (del) del.onclick = async () => {
      if (!confirm(t('delConfirm'))) return;
      const { error } = await sb.from('packages').delete().eq('id', id);
      if (error) return toast(t('errGeneric'));
      toast(t('deleted'));
      location.hash = '#/packages';
    };
  }

  // ------------------------------------------------------------ admin
  async function viewOverview() {
    const { data: o, error } = await sb.rpc('admin_overview');
    if (error) return shell('overview', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const tile = (k, v) => `<div class="card" style="display:flex;flex-direction:column;gap:4px"><span class="muted" style="font-size:14px">${esc(t(k))}</span><b style="font-size:26px;color:var(--deep)">${esc(v)}</b></div>`;
    shell('overview', `<div class="top"><h1>${esc(t('adminTitle'))}</h1></div>
      <div class="list">${tile('st_paid', money(o.paid_total))}${tile('st_commission', money(o.commission_total))}${tile('st_bookings', o.bookings)}
      ${tile('st_requests', o.requests)}${tile('st_open', o.open_requests)}${tile('st_offers', o.offers)}${tile('st_travelers', o.travelers)}${tile('st_partners', o.partners)}${tile('st_packages', o.packages)}</div>`);
  }

  async function viewPartners() {
    const { data, error } = await sb.rpc('admin_agencies');
    const [{ data: apps }, { data: codes }] = await Promise.all([
      sb.from('partner_applications').select('id, agency_id, code').not('agency_id', 'is', null),
      Promise.resolve({ data: [] }),
    ]);
    const appOf = Object.fromEntries((apps || []).map((x) => [x.agency_id, x.id]));
    const codeOf = Object.fromEntries((apps || []).map((x) => [x.agency_id, x.code]));
    if (error) return shell('partners', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const rows = (data || []).map((a) => `<tr data-id="${a.id}" data-q="${esc([codeOf[a.id], a.name, a.name_ar, a.email, a.license_no].filter(Boolean).join(' ').toLowerCase())}">
      <td>${codeOf[a.id] ? `<span class="badge" dir="ltr" style="margin-inline-end:6px">${esc(codeOf[a.id])}</span>` : ''}${appOf[a.id] ? `<a href="#/company/${appOf[a.id]}" style="font-weight:800">${esc(state.lang === 'ar' ? a.name_ar || a.name : a.name)} ↗</a>` : `<b>${esc(state.lang === 'ar' ? a.name_ar || a.name : a.name)}</b>`}<div class="muted" style="font-size:12px" dir="ltr">${esc(a.email || '')}</div></td>
      <td><input type="checkbox" data-k="active" ${a.active ? 'checked' : ''} hidden><span class="badge ${a.status === 'cancelled' ? 'bad' : a.status === 'suspended' ? 'accent' : 'good'}" title="${esc(a.status_reason || '')}">${esc(t('st_' + (a.status || 'active')))}</span></td>
      <td><input type="checkbox" data-k="verified" ${a.verified ? 'checked' : ''} aria-label="${esc(t('verifiedL'))}" style="width:auto"></td>
      <td><input type="number" data-k="rate" min="0" max="100" step="0.1" value="${esc(a.commission_rate)}" style="width:90px" dir="ltr"></td>
      <td><input type="number" data-k="supplier" value="${esc(a.mf_supplier_code ?? '')}" style="width:110px" dir="ltr"></td>
      <td>${esc(a.bookings)} · ${esc(money(a.paid_total))}</td><td>${esc(money(a.commission_total))}</td>
      <td><button class="btn small" type="button" data-save>${esc(t('save'))}</button></td></tr>`).join('');
    shell('partners', `<div class="top"><h1>${esc(t('navPartners'))}</h1></div>
      <input id="p-q" type="search" placeholder="${esc(state.lang === 'ar' ? 'ابحث بكود المكتب (مثال TP1001) أو الاسم' : 'Search by agency code (e.g. TP1001) or name')}" style="margin-bottom:14px;width:100%" dir="auto">
      <div class="tbl-wrap"><table><thead><tr><th>${esc(t('partner'))}</th><th>${esc(t('active'))}</th><th>${esc(t('verifiedL'))}</th><th>${esc(t('rate'))}</th><th>${esc(t('supplier'))}</th><th>${esc(t('sales'))}</th><th>${esc(t('commission'))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
      <form id="invite" data-keep class="card" style="display:flex;flex-direction:column;gap:12px;max-width:760px;margin-top:20px" novalidate>
        <h2>${esc(t('invite'))}</h2><p class="muted" style="margin:0">${esc(t('inviteSub'))}</p>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${field(t('agencyName'), '<input name="name" required>')}</div><div class="grow">${field(t('agencyNameAr'), '<input name="name_ar">')}</div></div>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${field(t('email'), '<input name="email" type="email" required dir="ltr">')}</div><div class="grow">${field(t('phone'), '<input name="phone" dir="ltr">')}</div></div>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${field(t('license'), '<input name="license" dir="ltr">')}</div><div class="grow">${field(t('rate'), '<input name="rate" type="number" min="0" max="100" step="0.1" value="10" dir="ltr">')}</div></div>
        <button class="btn accent" type="submit">${esc(t('invite'))}</button></form>`);
    document.getElementById('p-q').addEventListener('input', (e) => { const q = e.target.value.trim().toLowerCase(); document.querySelectorAll('tr[data-q]').forEach((r) => (r.hidden = !!q && !r.dataset.q.includes(q))); });
    document.querySelectorAll('[data-save]').forEach((b) => (b.onclick = async () => {
      const tr = b.closest('tr');
      const v = (k) => tr.querySelector(`[data-k=${k}]`);
      const sup = v('supplier').value.trim();
      const { error: e2 } = await sb.rpc('admin_update_agency', { p_agency: tr.dataset.id, p_active: v('active').checked, p_verified: v('verified').checked, p_rate: Number(v('rate').value || 0), p_supplier_code: sup ? Number(sup) : null });
      const e4 = null;
      toast(e2 || e4 ? t('errGeneric') : t('saved'));
    }));
    document.getElementById('invite').onsubmit = async (e) => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      if (!f.name || !f.email) return toast(t('errFields'));
      const btn = e.target.querySelector('button'); btn.disabled = true;
      const { data: r, error: e3 } = await sb.functions.invoke('admin-invite', { body: { ...f, rate: Number(f.rate || 0) } });
      btn.disabled = false;
      if (e3 || r?.error) return toast(r?.error || t('errGeneric'));
      toast(t('inviteSent'));
      viewPartners();
    };
  }

  async function viewAllBookings() {
    const { data, error } = await sb.rpc('admin_bookings');
    if (error) return shell('allbookings', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const rows = (data || []).map((b) => `<tr><td>${esc(place(b.destination))}</td><td dir="ltr" style="text-align:start">${esc(b.depart)}</td><td>${esc(b.traveler_name || '—')}</td><td>${esc(b.agency_name)}</td>
      <td>${esc(money(b.price))}</td><td><span class="badge ${b.payment_status === 'paid' ? 'good' : b.payment_status === 'none' ? '' : 'accent'}">${esc(t('pay_' + b.payment_status))}</span></td>
      <td>${b.commission != null ? esc(money(b.commission)) : '—'}</td><td class="muted">${esc(fmtDate(b.booked_at))}</td></tr>`).join('');
    shell('allbookings', `<div class="top"><h1>${esc(t('navAllBookings'))}</h1></div>
      ${rows ? `<div class="tbl-wrap"><table><thead><tr><th>${esc(t('destination'))}</th><th>${esc(t('depart'))}</th><th>${esc(t('traveler'))}</th><th>${esc(t('partner'))}</th><th>${esc(t('price'))}</th><th>${esc(t('payStatus'))}</th><th>${esc(t('commission'))}</th><th>${esc(t('bookedAt'))}</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="card empty">${esc(t('noBookings'))}</div>`}`);
  }

  function viewPackagesLocked() {
    shell('packages', `<div class="top"><h1>${esc(t('pkgLockedTitle'))}</h1></div><div class="card"><p style="margin:0">${esc(t('pkgLockedSub'))}</p></div>`);
  }

  // ---------- admin: traveler push notifications
  async function viewPush() {
    const { data, error } = await sb.rpc('admin_push_overview');
    if (error) return shell('push', `<div class="top"><h1>${esc(t('pushTitle'))}</h1></div><p class="notice info">${esc(t('pushNotReady'))}</p>`);
    const rows = data?.recent || [];
    shell('push', `<div class="top"><div><h1>${esc(t('pushTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('pushSub'))}</p></div></div>
      <div class="row" style="gap:12px;margin-bottom:16px;flex-wrap:wrap">
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushDevices'))}</div><b style="font-size:26px">${esc(data.devices ?? 0)}</b></div>
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushGuests'))}</div><b style="font-size:26px">${esc(data.guests ?? 0)}</b></div>
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushOptIn'))}</div><b style="font-size:26px">${esc(data.opted_in ?? 0)}</b></div></div>
      <form class="card" id="push-form" style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        <div class="row" style="gap:12px;align-items:flex-start"><label class="f grow">${esc(t('pushTitleAr'))}<input name="ta" maxlength="60" required></label>
          <label class="f grow">${esc(t('pushTitleEn'))}<input name="te" maxlength="60" dir="ltr"></label></div>
        <div class="row" style="gap:12px;align-items:flex-start"><label class="f grow">${esc(t('pushBodyAr'))}<textarea name="ba" rows="3" maxlength="180" required></textarea></label>
          <label class="f grow">${esc(t('pushBodyEn'))}<textarea name="be" rows="3" maxlength="180" dir="ltr"></textarea></label></div>
        <label class="f" style="max-width:260px">${esc(t('pushTarget'))}<select name="route"><option value="/">${esc(t('tgtHome'))}</option><option value="/packages">${esc(t('tgtOffers'))}</option><option value="/new">${esc(t('tgtNew'))}</option></select></label>
        <button class="btn accent" type="submit" style="align-self:flex-start">${esc(t('pushSend'))}</button>
        <p class="muted" style="margin:0;font-size:13px">${esc(t('pushAuto'))}</p></form>
      <div class="card"><h2 style="margin-bottom:8px">${esc(t('pushRecent'))}</h2>
        ${rows.length ? `<div class="tbl-wrap"><table><tbody>${rows.map((r) => `<tr><td style="white-space:nowrap">${esc(fmtDate(r.created_at))}</td><td>${esc(t('kind_' + r.kind) || r.kind)}</td>
          <td><b>${esc(r.title_ar)}</b><div class="muted" style="font-size:13px">${esc(r.body_ar)}</div></td>
          <td><span class="badge ${r.status === 'sent' ? 'good' : ''}">${esc(t('ps_' + r.status))}</span>${r.status === 'sent' ? `<div class="muted" style="font-size:12px">${esc(t('pushSentTo', { n: r.sent_count }))}</div>` : ''}</td></tr>`).join('')}</tbody></table></div>`
          : `<p class="muted">${esc(t('pushNone'))}</p>`}</div>`);
    document.getElementById('push-form').onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      if (!confirm(t('pushConfirm'))) return;
      const btn = e.target.querySelector('button'); btn.disabled = true;
      const { error: er } = await sb.rpc('admin_push_broadcast', { p_title_ar: fd.get('ta'), p_body_ar: fd.get('ba'), p_title_en: fd.get('te'), p_body_en: fd.get('be'), p_route: fd.get('route') });
      toast(er ? t('errGeneric') : t('pushQueued'));
      viewPush();
    };
  }

  return { viewPush, viewPackagesLocked, viewPackages, viewPackage, viewOverview, viewPartners, viewAllBookings, viewPromos, startPromo };
}
