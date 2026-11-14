// Special offers (partners) and admin views. Loaded by app.js.
export function install(ctx) {
  const { sb, state, t, esc, money, place, fmtDate, shell, toast, STR, SERVICES, TYPES, route } = ctx;

  Object.assign(STR.ar, {
    promoHow: 'طريقة النشر', promoHow1: 'أضف العرض واحفظه.', promoHow2: 'اختر مدة الإعلان وادفع رسومه عن طريق بوابة الدفع: {plansText}.', promoHow3: 'يظهر العرض فوراً في التطبيق، ويتوقف تلقائياً بنهاية المدة ويمكنك تجديده.',
    promoHow4: 'عمولة المنصة {rate}% من كل حجز يتم عن طريق العروض الخاصة. هوية مكتبكم وبيانات التواصل تبقى مخفية عن المسافر حتى يدفع.',
    liveUntil: 'منشور حتى {d}', notLive: 'غير منشور', stoppedByAdmin: 'موقوف من الإدارة', publishBtn: '📣 {plan} — {fee} د.ك', renewBtn: '🔁 تجديد {plan} — {fee} د.ك', plan_week: 'أسبوعي (7 أيام)', plan_month: 'شهري (30 يوماً)', plan_quarter: 'فصلي (90 يوماً)', planDays: '{n} يوماً',
    founderBanner: '🎉 أنتم الشريك المؤسس رقم {n} من 10: نشر عروضكم الخاصة بدون رسوم إعلان، وعمولة مخفّضة 2.5% بدل 4% على حجوزات العروض حتى {d} (الملحق رقم 2 من الاتفاقية).', founderBtn: '📣 نشر مجاني حتى {d}', founderDone: 'نُشر العرض مجاناً حتى {d}.',
    foundersTitle: 'الشركاء المؤسسون: {n} من {max}', foundersSub: 'أول 10 مكاتب تُفعَّل: بدون رسوم إعلان، وعمولة العروض الخاصة 2.5% بدل 4% لمدة 3 أشهر من التفعيل.', founderRemove: 'إلغاء صفة المؤسس', founderRemoveConfirm: 'إلغاء صفة الشريك المؤسس عن هذا المكتب وتحرير مقعده؟', noFounders: 'لم ينضم أي شريك مؤسس بعد.', founderNo: 'رقم', founderEnds: 'ينتهي العرض',
    payOpening: 'جاري فتح صفحة الدفع…', promoPaid: 'تم الدفع ونُشر العرض في التطبيق.', promoFailed: 'لم يكتمل الدفع، ولم يُنشر العرض.', needSave: 'احفظ العرض أولاً.', bookingsN: '{n} حجز',
    uDel: 'حذف', uDelAsk: 'حذف حساب {e} وكل بياناته (الطلبات، المحادثات، الجوازات، المحفظة) نهائياً؟ ما يمكن التراجع، ويقدر يسجّل من جديد بنفس الإيميل.\n\nللتأكيد اكتب الإيميل:', uDelReason: 'سبب الحذف (اختياري):', uDeleted: 'تم حذف الحساب وبياناته.', uDelMismatch: 'الإيميل غير مطابق، ما تم الحذف.',
    e_has_paid_bookings: 'ما ينحذف: عنده حجوزات مدفوعة لازم تبقى في السجلات المالية.', e_not_traveler: 'ما ينحذف من هنا: الحساب مو مسافر (مدير أو مكتب).', e_cannot_delete_self: 'ما تقدر تحذف حسابك.',
    navErrors: 'سجل الأخطاء', errTitle: 'سجل الأخطاء', errSub: 'أخطاء التطبيق ولوحة الإدارة، ومشاكل الدفع والمهام التلقائية والإشعارات اللي ما وصلت لأحد.', errDays: 'آخر', errDaysN: '{n} يوم', errNone: 'ما في أخطاء في هذي الفترة 👍', errCols: ['الوقت', 'المصدر', 'النوع', 'الرسالة', 'تفاصيل', 'المستخدم / المرجع'],
    src_app: 'التطبيق', src_portal: 'لوحة الإدارة', src_site: 'الموقع', src_payments: 'الدفع', src_cron: 'مهمة تلقائية', src_push: 'الإشعارات', errCopy: 'نسخ', errCopied: 'تم النسخ',
    gTitle: 'نمو المستخدمين', gPeriod: 'الفترة', gp_7: 'آخر 7 أيام', gp_30: 'آخر 30 يوم', gp_90: 'آخر 90 يوم', gp_month: 'هذا الشهر', gp_lastmonth: 'الشهر الماضي', gp_year: 'هذي السنة', gp_all: 'من البداية', gp_custom: 'فترة محددة', gFrom: 'من', gTo: 'إلى',
    gNew: 'مسجّلين جدد في الفترة', gPrev: 'الفترة اللي قبلها', gChange: 'التغيّر', gAvg: 'متوسط باليوم', gTotalAt: 'إجمالي المسجّلين بنهاية الفترة', gBy_day: 'حسب اليوم', gBy_week: 'حسب الأسبوع', gBy_month: 'حسب الشهر', gTableNote: 'الجدول تحت يعرض المسجّلين في هذي الفترة.',
    navUsers: 'المستخدمين', usersTitle: 'مستخدمين التطبيق', usersSub: 'كل اللي سجّلوا في التطبيق مع بيانات التسجيل ونشاطهم.', uTotal: 'إجمالي المسجّلين', u7: 'سجّلوا آخر 7 أيام', u30: 'سجّلوا آخر 30 يوم', uDev: 'عندهم إشعارات مفعّلة', uGuests: 'أجهزة بدون تسجيل', uBooked: 'حجزوا مرة على الأقل', uSearch: 'ابحث بالاسم أو الإيميل أو الرقم', uCsv: '⬇ تنزيل Excel (CSV)', uNone: 'ما في مستخدمين.',
    uCols: ['الاسم', 'الإيميل', 'الهاتف', 'تاريخ التسجيل', 'آخر دخول', 'طريقة التسجيل', 'اللغة', 'الطلبات', 'الحجوزات', 'المدفوع', 'الإشعارات', 'إشعارات العروض'], uYes: 'نعم', uNo: 'لا', uAdmin: 'مدير',
    navPush: 'الإشعارات', pushTitle: 'إشعارات المسافرين', pushSub: 'أرسل لكل اللي منزّلين التطبيق، أو للمسجّلين فقط، أو لمستخدم محدد بإيميله. يوصل خلال دقيقة تقريباً، وبدون حد لعدد الإشعارات أو وقت الإرسال. اللي قفّل «إشعارات العروض» من حسابه ما توصله الإشعارات العامة، والإشعار الخاص يوصل له دائماً.', pushAud: 'إلى', aud_all: 'كل اللي منزّلين التطبيق', aud_registered: 'المسجّلين فقط', aud_user: 'مستخدم محدد', pushEmail: 'إيميل المستخدم', pushRegistered: 'أجهزة لمستخدمين مسجّلين', kind_direct: 'إشعار خاص', pushConfirmUser: 'إرسال هذا الإشعار لـ {e}؟', pushResend: '↻ إعادة الإرسال', pushAt: 'وقت الإرسال (اختياري، بتوقيت الكويت)', pushAtNote: 'اتركه فاضي للإرسال الحين.', pushSchedFor: 'مجدول: {d}', pushCancel: 'إلغاء', pushCancelAsk: 'تلغي هذا الإشعار المجدول؟', pushScheduled: 'تمت جدولة الإشعار.', e_bad_time: 'اختر وقت في المستقبل (خلال سنة).', pushResendAsk: 'تعيد إرسال هذا الإشعار لنفس المستلمين؟', e_no_user: 'ما لقينا مستخدم بهذا الإيميل.', pushDevices: 'أجهزة مسجّلة', pushOptIn: 'يستقبلون إشعارات العروض', pushGuests: 'منزّلين التطبيق بدون تسجيل', pushTitleAr: 'العنوان (عربي)', pushBodyAr: 'النص (عربي)', pushOneLang: 'اكتب العنوان والنص بلغة وحدة على الأقل (عربي أو إنجليزي). إذا كتبت بلغة وحدة يوصل نفس النص للكل.', pushTitleEn: 'العنوان (إنجليزي)', pushBodyEn: 'النص (إنجليزي)', pushTarget: 'يفتح عند الضغط', tgtHome: 'الصفحة الرئيسية', tgtOffers: 'العروض الخاصة', tgtNew: 'طلب رحلة جديدة', pushSend: '📣 إرسال الإشعار', pushConfirm: 'إرسال هذا الإشعار لـ «{a}»؟', pushQueued: 'تم وضع الإشعار في قائمة الإرسال.', pushRecent: 'آخر الإشعارات المرسلة', pushNone: 'ما في إشعارات بعد.', pushAuto: 'تلقائياً يوصل للمسافر: عرض سعر جديد، عرض قرب ينتهي، تأكيد الحجز، عرض خاص جديد، وتذكير للي ما طلب رحلة.', pushNotReady: 'الإشعارات ما تفعّلت بعد في قاعدة البيانات.', ps_pending: 'بالانتظار', ps_sent: 'أُرسل', ps_skipped: 'ملغي', kind_promo: 'عرض خاص', kind_broadcast: 'إشعار عام', pushSentTo: 'وصل لـ {n} جهاز',
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
    promoHow: 'How publishing works', promoHow1: 'Add the offer and save it.', promoHow2: 'Choose the listing period and pay its fee through the payment gateway: {plansText}.', promoHow3: 'The offer goes live in the app at once, stops automatically at the end of the period, and can be renewed.',
    promoHow4: 'Platform commission is {rate}% on every booking made through special offers. Your identity and contact details stay hidden from travelers until they pay.',
    liveUntil: 'Live until {d}', notLive: 'Not published', stoppedByAdmin: 'Stopped by admin', publishBtn: '📣 {plan} — {fee} KWD', renewBtn: '🔁 Renew {plan} — {fee} KWD', plan_week: 'Weekly (7 days)', plan_month: 'Monthly (30 days)', plan_quarter: 'Quarterly (90 days)', planDays: '{n} days',
    founderBanner: '🎉 You are founding partner no. {n} of 10: publish your special offers with no listing fees and a reduced 2.5% (instead of 4%) special-offers commission until {d} (agreement annex 2).', founderBtn: '📣 Publish free until {d}', founderDone: 'Offer published free until {d}.',
    foundersTitle: 'Founding partners: {n} of {max}', foundersSub: 'The first 10 activated agencies: no listing fees and a 2.5% (instead of 4%) special-offers commission for 3 months from activation.', founderRemove: 'Remove founder status', founderRemoveConfirm: 'Remove founding-partner status from this agency and free its seat?', noFounders: 'No founding partners yet.', founderNo: 'No.', founderEnds: 'Offer ends',
    payOpening: 'Opening payment page…', promoPaid: 'Paid — your offer is live in the app.', promoFailed: 'Payment was not completed; the offer is not published.', needSave: 'Save the offer first.', bookingsN: '{n} bookings',
    uDel: 'Delete', uDelAsk: 'Permanently delete {e} and all their data (requests, chats, passports, wallet)? This cannot be undone; they can sign up again with the same email.\n\nType the email to confirm:', uDelReason: 'Reason (optional):', uDeleted: 'Account and data deleted.', uDelMismatch: 'Email does not match; nothing was deleted.',
    e_has_paid_bookings: 'Cannot delete: has paid bookings that must stay in the financial records.', e_not_traveler: 'Cannot delete here: not a traveler account (admin or agency).', e_cannot_delete_self: 'You cannot delete your own account.',
    navErrors: 'Error log', errTitle: 'Error log', errSub: 'Errors from the app and the admin portal, plus payment, scheduled-job and undelivered-notification problems.', errDays: 'Last', errDaysN: '{n} days', errNone: 'No errors in this period 👍', errCols: ['Time', 'Source', 'Type', 'Message', 'Details', 'User / ref'],
    src_app: 'App', src_portal: 'Admin portal', src_site: 'Website', src_payments: 'Payments', src_cron: 'Scheduled job', src_push: 'Notifications', errCopy: 'Copy', errCopied: 'Copied',
    gTitle: 'User growth', gPeriod: 'Period', gp_7: 'Last 7 days', gp_30: 'Last 30 days', gp_90: 'Last 90 days', gp_month: 'This month', gp_lastmonth: 'Last month', gp_year: 'This year', gp_all: 'All time', gp_custom: 'Custom range', gFrom: 'From', gTo: 'To',
    gNew: 'New sign-ups in period', gPrev: 'Previous period', gChange: 'Change', gAvg: 'Average per day', gTotalAt: 'Total users at period end', gBy_day: 'By day', gBy_week: 'By week', gBy_month: 'By month', gTableNote: 'The table below shows users who signed up in this period.',
    navUsers: 'Users', usersTitle: 'App users', usersSub: 'Everyone who signed up in the app, with sign-up details and activity.', uTotal: 'Signed-up users', u7: 'Joined last 7 days', u30: 'Joined last 30 days', uDev: 'Notifications on', uGuests: 'Devices not signed in', uBooked: 'Booked at least once', uSearch: 'Search by name, email or phone', uCsv: '⬇ Download Excel (CSV)', uNone: 'No users.',
    uCols: ['Name', 'Email', 'Phone', 'Signed up', 'Last sign-in', 'Sign-up method', 'Language', 'Requests', 'Bookings', 'Paid', 'Notifications', 'Offer notifications'], uYes: 'Yes', uNo: 'No', uAdmin: 'Admin',
    navPush: 'Notifications', pushTitle: 'Traveler notifications', pushSub: 'Send to everyone who installed the app, to signed-in users only, or to one user by email. Delivered in about a minute, with no limit on how many or when. Users who turned off offer notifications do not get general sends; a direct notification always reaches them.', pushAud: 'To', aud_all: 'Everyone with the app', aud_registered: 'Signed-in users only', aud_user: 'One user', pushEmail: 'User email', pushRegistered: 'Signed-in users\' devices', kind_direct: 'Direct', pushConfirmUser: 'Send this notification to {e}?', pushResend: '↻ Send again', pushAt: 'Send time (optional, Kuwait time)', pushAtNote: 'Leave empty to send now.', pushSchedFor: 'Scheduled: {d}', pushCancel: 'Cancel', pushCancelAsk: 'Cancel this scheduled notification?', pushScheduled: 'Notification scheduled.', e_bad_time: 'Pick a future time (within a year).', pushResendAsk: 'Send this notification again to the same recipients?', e_no_user: 'No user with this email.', pushDevices: 'Registered devices', pushOptIn: 'Receiving offer notifications', pushGuests: 'Installed, not signed in', pushTitleAr: 'Title (Arabic)', pushBodyAr: 'Text (Arabic)', pushOneLang: 'Write the title and text in at least one language (Arabic or English). With one language, everyone gets the same text.', pushTitleEn: 'Title (English)', pushBodyEn: 'Text (English)', pushTarget: 'Opens on tap', tgtHome: 'Home', tgtOffers: 'Special offers', tgtNew: 'New trip request', pushSend: '📣 Send notification', pushConfirm: 'Send this notification to “{a}”?', pushQueued: 'Notification queued for sending.', pushRecent: 'Recent notifications', pushNone: 'No notifications yet.', pushAuto: 'Sent automatically to the traveler: new price offer, offer about to expire, booking confirmed, new special offer, and a reminder for those who have not requested a trip.', pushNotReady: 'Notifications are not enabled in the database yet.', ps_pending: 'Queued', ps_sent: 'Sent', ps_skipped: 'Cancelled', kind_promo: 'Special offer', kind_broadcast: 'Broadcast', pushSentTo: 'Reached {n} devices',
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
      sb.rpc('admin_intro_list'),
    ]);
    const introOf = Object.fromEntries((codes || []).map((x) => [x.id, x]));
    const appOf = Object.fromEntries((apps || []).map((x) => [x.agency_id, x.id]));
    const codeOf = Object.fromEntries((apps || []).map((x) => [x.agency_id, x.code]));
    if (error) return shell('partners', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const rows = (data || []).map((a) => `<tr data-id="${a.id}" data-q="${esc([codeOf[a.id], a.name, a.name_ar, a.email, a.license_no].filter(Boolean).join(' ').toLowerCase())}">
      <td>${codeOf[a.id] ? `<span class="badge" dir="ltr" style="margin-inline-end:6px">${esc(codeOf[a.id])}</span>` : ''}${appOf[a.id] ? `<a href="#/company/${appOf[a.id]}" style="font-weight:800">${esc(state.lang === 'ar' ? a.name_ar || a.name : a.name)} ↗</a>` : `<b>${esc(state.lang === 'ar' ? a.name_ar || a.name : a.name)}</b>`}<div class="muted" style="font-size:12px" dir="ltr">${esc(a.email || '')}</div></td>
      <td><input type="checkbox" data-k="active" ${a.active ? 'checked' : ''} hidden><span class="badge ${a.status === 'cancelled' ? 'bad' : a.status === 'suspended' ? 'accent' : 'good'}" title="${esc(a.status_reason || '')}">${esc(t('st_' + (a.status || 'active')))}</span></td>
      <td><input type="checkbox" data-k="verified" ${a.verified ? 'checked' : ''} aria-label="${esc(t('verifiedL'))}" style="width:auto"></td>
      <td><input type="number" data-k="rate" min="0" max="100" step="0.1" value="${esc(a.commission_rate)}" style="width:90px" dir="ltr"></td>
      <td><input type="number" data-k="supplier" value="${esc(a.mf_supplier_code ?? '')}" style="width:110px" dir="ltr"></td>
      <td><input type="date" data-k="intro" data-was="${esc((introOf[a.id]?.intro_until || '').slice(0, 10))}" value="${esc((introOf[a.id]?.intro_until || '').slice(0, 10))}" style="width:150px" dir="ltr"><div class="muted" style="font-size:12px">${introOf[a.id] ? esc(introOf[a.id].rate) + '%' : ''}</div></td>
      <td>${esc(a.bookings)} · ${esc(money(a.paid_total))}</td><td>${esc(money(a.commission_total))}</td>
      <td><button class="btn small" type="button" data-save>${esc(t('save'))}</button></td></tr>`).join('');
    shell('partners', `<div class="top"><h1>${esc(t('navPartners'))}</h1></div>
      <input id="p-q" type="search" placeholder="${esc(state.lang === 'ar' ? 'ابحث بكود المكتب (مثال TP1001) أو الاسم' : 'Search by agency code (e.g. TP1001) or name')}" style="margin-bottom:14px;width:100%" dir="auto">
      <div class="tbl-wrap"><table><thead><tr><th>${esc(t('partner'))}</th><th>${esc(t('active'))}</th><th>${esc(t('verifiedL'))}</th><th>${esc(t('rate'))}</th><th>${esc(t('supplier'))}</th><th title="${esc(state.lang === 'ar' ? 'تاريخ نهاية العمولة المخفضة. عدّل التاريخ للتمديد أو التقليل، وامسحه للرجوع للمدة الافتراضية.' : 'End date of the reduced commission. Change it to extend or shorten; clear it to return to the default period.')}">${esc(state.lang === 'ar' ? 'العمولة المخفضة حتى' : 'Reduced rate until')}</th><th>${esc(t('sales'))}</th><th>${esc(t('commission'))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
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
      const iv = v('intro'); let e4 = null;
      if (iv && iv.value !== iv.dataset.was) { ({ error: e4 } = await sb.rpc('admin_set_intro', { p_agency: tr.dataset.id, p_until: iv.value ? new Date(iv.value + 'T23:59:59').toISOString() : null })); if (!e4) iv.dataset.was = iv.value; }
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
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushRegistered'))}</div><b style="font-size:26px">${esc(data.registered ?? 0)}</b></div>
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushGuests'))}</div><b style="font-size:26px">${esc(data.guests ?? 0)}</b></div>
        <div class="card grow"><div class="muted" style="font-size:13px">${esc(t('pushOptIn'))}</div><b style="font-size:26px">${esc(data.opted_in ?? 0)}</b></div></div>
      <form class="card" id="push-form" style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">
        <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap"><label class="f" style="min-width:240px">${esc(t('pushAud'))}<select name="aud"><option value="all">${esc(t('aud_all'))}</option><option value="registered">${esc(t('aud_registered'))}</option><option value="user">${esc(t('aud_user'))}</option></select></label>
          <label class="f grow" id="push-email" style="display:none">${esc(t('pushEmail'))}<input name="email" type="email" dir="ltr"></label></div>
        <div class="row" style="gap:12px;align-items:flex-start"><label class="f grow">${esc(t('pushTitleAr'))}<input name="ta" maxlength="60"></label>
          <label class="f grow">${esc(t('pushTitleEn'))}<input name="te" maxlength="60" dir="ltr"></label></div>
        <div class="row" style="gap:12px;align-items:flex-start"><label class="f grow">${esc(t('pushBodyAr'))}<textarea name="ba" rows="3" maxlength="180"></textarea></label>
          <label class="f grow">${esc(t('pushBodyEn'))}<textarea name="be" rows="3" maxlength="180" dir="ltr"></textarea></label></div>
        <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap"><label class="f" style="min-width:260px">${esc(t('pushAt'))}<input name="at" type="datetime-local" dir="ltr"></label><span class="muted" style="font-size:13px;padding-bottom:10px">${esc(t('pushAtNote'))}</span></div>
        <label class="f" style="max-width:260px">${esc(t('pushTarget'))}<select name="route"><option value="/">${esc(t('tgtHome'))}</option><option value="/packages">${esc(t('tgtOffers'))}</option><option value="/new">${esc(t('tgtNew'))}</option></select></label>
        <button class="btn accent" type="submit" style="align-self:flex-start">${esc(t('pushSend'))}</button>
        <p class="muted" style="margin:0;font-size:13px">${esc(t('pushAuto'))}</p></form>
      <div class="card"><h2 style="margin-bottom:8px">${esc(t('pushRecent'))}</h2>
        ${rows.length ? `<div class="tbl-wrap"><table><tbody>${rows.map((r) => `<tr><td style="white-space:nowrap">${esc(fmtDate(r.created_at))}</td><td>${esc(t('kind_' + r.kind) || r.kind)}${r.audience && r.audience !== 'user' ? `<div class="muted" style="font-size:12px">${esc(t('aud_' + r.audience))}</div>` : ''}${r.email ? `<div class="muted" dir="ltr" style="font-size:12px">${esc(r.email)}</div>` : ''}</td>
          <td><b>${esc(r.title_ar)}</b><div class="muted" style="font-size:13px">${esc(r.body_ar)}</div></td>
          <td><span class="badge ${r.status === 'sent' ? 'good' : ''}">${esc(t('ps_' + r.status))}</span>${r.status === 'sent' ? `<div class="muted" style="font-size:12px">${esc(t('pushSentTo', { n: r.sent_count }))}</div>` : ''}${r.status === 'pending' && r.send_after && Date.parse(r.send_after) > Date.now() + 60000 ? `<div class="muted" style="font-size:12px">${esc(t('pushSchedFor', { d: new Date(r.send_after).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-GB', { timeZone: 'Asia/Kuwait', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }))}</div>` : ''}</td>
          <td>${r.status === 'pending' && (r.kind === 'broadcast' || r.kind === 'direct') ? `<button type="button" class="btn ghost small" data-pcancel="${esc(r.id)}">${esc(t('pushCancel'))}</button> ` : ''}${r.kind === 'broadcast' || r.kind === 'direct' ? `<button type="button" class="btn ghost small" data-resend="${esc(r.id)}">${esc(t('pushResend'))}</button>` : ''}</td></tr>`).join('')}</tbody></table></div>`
          : `<p class="muted">${esc(t('pushNone'))}</p>`}</div>`);
    const pf = document.getElementById('push-form');
    pf.aud.onchange = () => { const u = pf.aud.value === 'user'; document.getElementById('push-email').style.display = u ? '' : 'none'; pf.email.required = u; };
    document.querySelectorAll('[data-resend]').forEach((b) => { b.onclick = async () => {
      if (!confirm(t('pushResendAsk'))) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_push_resend', { p_id: Number(b.dataset.resend) });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      toast(t('pushQueued')); viewPush();
    }; });
    document.querySelectorAll('[data-pcancel]').forEach((b) => { b.onclick = async () => {
      if (!confirm(t('pushCancelAsk'))) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_push_cancel', { p_id: Number(b.dataset.pcancel) });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      viewPush();
    }; });
    pf.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(pf);
      const aud = String(fd.get('aud') || 'all'); const email = String(fd.get('email') || '').trim();
      if (aud === 'user' && !email) return pf.email.focus();
      if (!((String(fd.get('ta') || '').trim() && String(fd.get('ba') || '').trim()) || (String(fd.get('te') || '').trim() && String(fd.get('be') || '').trim()))) return toast(t('pushOneLang'));
      if (!confirm(aud === 'user' ? t('pushConfirmUser', { e: email }) : t('pushConfirm', { a: t('aud_' + aud) }))) return;
      const btn = pf.querySelector('button[type=submit]'); btn.disabled = true;
      const ta = String(fd.get('ta') || '').trim(), ba = String(fd.get('ba') || '').trim(), te = String(fd.get('te') || '').trim(), be = String(fd.get('be') || '').trim();
      if (!((ta && ba) || (te && be))) return toast(t('pushOneLang'));
      const tAr = ta && ba ? ta : te, bAr = ta && ba ? ba : be, tEn = te && be ? te : tAr, bEn = te && be ? be : bAr;
      const at = String(fd.get('at') || '');
      const pAt = at ? `${at.length === 16 ? at + ':00' : at}+03:00` : null;
      if (pAt && !(Date.parse(pAt) > Date.now() - 60000)) return toast(t('e_bad_time'));
      const { error: er } = await sb.rpc('admin_push_send', { p_audience: aud, p_email: email || null, p_title_ar: tAr, p_body_ar: bAr, p_title_en: tEn, p_body_en: bEn, p_route: fd.get('route'), p_at: pAt });
      btn.disabled = false;
      if (er) return toast(/no_user/.test(er.message) ? t('e_no_user') : /bad_time/.test(er.message) ? t('e_bad_time') : t('errGeneric'));
      toast(t(pAt ? 'pushScheduled' : 'pushQueued'));
      viewPush();
    };
  }

  // ---------- admin: app users
  async function viewUsers() {
    const [{ data, error }, ov] = await Promise.all([sb.rpc('admin_users'), sb.rpc('admin_push_overview')]);
    if (error) return shell('users', `<div class="top"><h1>${esc(t('usersTitle'))}</h1></div><p class="notice info">${esc(t('errGeneric'))}</p>`);
    const all = data || [];
    const day = 86400000, now = Date.now();
    const trav = all.filter((u) => u.role !== 'admin');
    const k = (lbl, v) => `<div class="card grow" style="min-width:150px"><div class="muted" style="font-size:13px">${esc(t(lbl))}</div><b style="font-size:26px">${esc(v)}</b></div>`;
    const d = (x) => (x ? new Date(x).toLocaleDateString(state.lang === 'ar' ? 'ar-KW' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
    const prov = (p) => ({ email: 'Email', apple: 'Apple', google: 'Google', phone: 'SMS' }[p] || p || '—');
    const row = (u) => `<tr><td>${esc(u.full_name || '—')}${u.role === 'admin' ? ` <span class="badge">${esc(t('uAdmin'))}</span>` : ''}</td><td dir="ltr">${esc(u.email || '—')}</td><td dir="ltr">${esc(u.phone || '—')}</td>
      <td style="white-space:nowrap">${esc(d(u.created_at))}</td><td style="white-space:nowrap">${esc(d(u.last_sign_in_at))}</td><td>${esc(prov(u.provider))}</td><td>${esc((u.lang || 'ar').toUpperCase())}</td>
      <td>${esc(u.requests)}</td><td>${esc(u.bookings)}</td><td>${esc(money(u.spent))}</td><td>${esc(t(Number(u.devices) > 0 ? 'uYes' : 'uNo'))}</td><td>${esc(t(u.notify_promos ? 'uYes' : 'uNo'))}</td>
      <td>${u.role === 'traveler' ? `<button type="button" class="btn ghost small" data-udel="${esc(u.id)}" data-email="${esc(u.email || '')}">${esc(t('uDel'))}</button>` : ''}</td></tr>`;
    shell('users', `<div class="top"><div><h1>${esc(t('usersTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('usersSub'))}</p></div>
        <button class="btn ghost" id="u-csv" type="button">${esc(t('uCsv'))}</button></div>
      <div class="row" style="gap:12px;margin-bottom:16px;flex-wrap:wrap">
        ${k('uTotal', trav.length)}${k('u7', trav.filter((u) => now - Date.parse(u.created_at) < 7 * day).length)}${k('u30', trav.filter((u) => now - Date.parse(u.created_at) < 30 * day).length)}
        ${k('uBooked', trav.filter((u) => Number(u.bookings) > 0).length)}${k('uDev', trav.filter((u) => Number(u.devices) > 0).length)}${k('uGuests', ov.data?.guests ?? 0)}</div>
      <div class="card" style="margin-bottom:16px;display:flex;flex-direction:column;gap:14px">
        <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap"><h2 style="margin:0;flex:1 1 200px">${esc(t('gTitle'))}</h2>
          <label class="f" style="min-width:170px">${esc(t('gPeriod'))}<select id="g-p">${['7', '30', '90', 'month', 'lastmonth', 'year', 'all', 'custom'].map((p) => `<option value="${p}" ${p === '30' ? 'selected' : ''}>${esc(t('gp_' + p))}</option>`).join('')}</select></label>
          <label class="f" id="g-fw" style="display:none">${esc(t('gFrom'))}<input type="date" id="g-from" dir="ltr"></label>
          <label class="f" id="g-tw" style="display:none">${esc(t('gTo'))}<input type="date" id="g-to" dir="ltr"></label></div>
        <div class="row" id="g-k" style="gap:12px;flex-wrap:wrap"></div>
        <div><div class="muted" id="g-by" style="font-size:13px;margin-bottom:6px"></div><div id="g-chart" dir="ltr" style="display:flex;align-items:flex-end;gap:3px;height:150px;border-bottom:1px solid var(--line,#e5e7eb);overflow-x:auto"></div>
          <div id="g-axis" dir="ltr" style="display:flex;justify-content:space-between;font-size:11px;color:#6b7280;margin-top:4px"></div></div>
        <p class="muted" style="margin:0;font-size:13px">${esc(t('gTableNote'))}</p></div>
      <div class="card"><input id="u-q" type="search" placeholder="${esc(t('uSearch'))}" style="margin-bottom:12px;max-width:360px">
        <div class="tbl-wrap"><table><thead><tr>${t('uCols').map((c) => `<th>${esc(c)}</th>`).join('')}<th></th></tr></thead><tbody id="u-body"></tbody></table></div></div>`);
    const body = document.getElementById('u-body');
    // ----- growth filter (local = Kuwait time in the admin's browser)
    const sod = (x) => { const z = new Date(x); z.setHours(0, 0, 0, 0); return z; };
    const addD = (x, n) => { const z = new Date(x); z.setDate(z.getDate() + n); return z; };
    const iso = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
    let range = null;
    const firstAt = trav.length ? sod(Math.min(...trav.map((u) => Date.parse(u.created_at)))) : sod(Date.now());
    const calcRange = () => {
      const p = document.getElementById('g-p').value, today = sod(Date.now()), end = addD(today, 1);
      document.getElementById('g-fw').style.display = document.getElementById('g-tw').style.display = p === 'custom' ? '' : 'none';
      if (/^\d+$/.test(p)) return [addD(end, -Number(p)), end];
      if (p === 'month') return [new Date(today.getFullYear(), today.getMonth(), 1), end];
      if (p === 'lastmonth') return [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 1)];
      if (p === 'year') return [new Date(today.getFullYear(), 0, 1), end];
      if (p === 'all') return [firstAt, end];
      const f = document.getElementById('g-from').value, to = document.getElementById('g-to').value;
      const a1 = f ? sod(new Date(f + 'T00:00:00')) : addD(end, -30), b1 = to ? addD(sod(new Date(to + 'T00:00:00')), 1) : end;
      return a1 < b1 ? [a1, b1] : [b1, a1];
    };
    const inR = (u, a1, b1) => { const x = Date.parse(u.created_at); return x >= +a1 && x < +b1; };
    const growth = () => {
      range = calcRange();
      const [a1, b1] = range, days = Math.max(1, Math.round((b1 - a1) / day));
      const cur = trav.filter((u) => inR(u, a1, b1)).length, prev = trav.filter((u) => inR(u, addD(a1, -days), a1)).length;
      const ch = prev ? Math.round((cur - prev) / prev * 100) : null;
      const kk = (lbl, v) => `<div class="card grow" style="min-width:150px;box-shadow:none;border:1px solid var(--line,#e5e7eb)"><div class="muted" style="font-size:13px">${esc(t(lbl))}</div><b style="font-size:24px">${esc(v)}</b></div>`;
      document.getElementById('g-k').innerHTML = kk('gNew', cur) + kk('gPrev', prev) + kk('gChange', ch === null ? '—' : (ch > 0 ? '+' : '') + ch + '%')
        + kk('gAvg', (cur / days).toFixed(1)) + kk('gTotalAt', trav.filter((u) => Date.parse(u.created_at) < +b1).length);
      const by = days <= 31 ? 'day' : days <= 140 ? 'week' : 'month';
      const buckets = [];
      for (let x = new Date(a1); x < b1;) {
        const nx = by === 'day' ? addD(x, 1) : by === 'week' ? addD(x, 7) : new Date(x.getFullYear(), x.getMonth() + 1, 1);
        const e1 = nx < b1 ? nx : b1;
        buckets.push({ from: new Date(x), n: trav.filter((u) => inR(u, x, e1)).length });
        x = nx;
      }
      const max = Math.max(1, ...buckets.map((b) => b.n));
      const lbl = (x) => x.toLocaleDateString(state.lang === 'ar' ? 'ar-KW' : 'en-GB', by === 'month' ? { month: 'short', year: '2-digit' } : { day: 'numeric', month: 'short' });
      document.getElementById('g-by').textContent = t('gBy_' + by);
      document.getElementById('g-chart').innerHTML = buckets.map((b) => `<div title="${esc(lbl(b.from))}: ${b.n}" style="flex:1 0 8px;min-width:8px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%">
          <span style="font-size:10px;color:#6b7280">${b.n || ''}</span><div style="width:100%;height:${Math.round(b.n / max * 120)}px;min-height:${b.n ? 3 : 1}px;background:${b.n ? '#0B3D91' : '#e5e7eb'};border-radius:4px 4px 0 0"></div></div>`).join('');
      document.getElementById('g-axis').innerHTML = buckets.length ? `<span>${esc(lbl(buckets[0].from))}</span><span>${esc(lbl(buckets[buckets.length - 1].from))}</span>` : '';
      draw(document.getElementById('u-q').value);
    };
    const draw = (q) => {
      const s = String(q || '').trim().toLowerCase();
      const base = range ? all.filter((u) => inR(u, range[0], range[1])) : all;
      const list = s ? base.filter((u) => [u.full_name, u.email, u.phone].some((v) => String(v || '').toLowerCase().includes(s))) : base;
      body.innerHTML = list.length ? list.map(row).join('') : `<tr><td colspan="13" class="muted">${esc(t('uNone'))}</td></tr>`;
    };
    ['g-p', 'g-from', 'g-to'].forEach((id) => { document.getElementById(id).onchange = growth; });
    growth();
    document.getElementById('u-q').oninput = (e) => draw(e.target.value);
    body.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-udel]'); if (!b) return;
      const email = b.dataset.email || '';
      const typed = prompt(t('uDelAsk', { e: email }));
      if (typed === null) return;
      if (typed.trim().toLowerCase() !== email.toLowerCase()) return toast(t('uDelMismatch'));
      const reason = prompt(t('uDelReason')) || '';
      b.disabled = true;
      const { data: files } = await sb.rpc('admin_user_files', { p_id: b.dataset.udel });
      const { error: er } = await sb.rpc('admin_delete_user', { p_id: b.dataset.udel, p_reason: reason });
      if (er) { b.disabled = false; const c = (String(er.message).match(/has_paid_bookings|not_traveler|cannot_delete_self/) || [])[0]; return toast(c ? t('e_' + c) : t('errGeneric')); }
      if (files?.length) await sb.storage.from('passports').remove(files).catch(() => {});
      toast(t('uDeleted')); viewUsers();
    });
    document.getElementById('u-csv').onclick = () => {
      const cell = (v) => { let x = String(v ?? ''); if (/^[=+\-@]/.test(x)) x = "'" + x; return '"' + x.replace(/"/g, '""') + '"'; };
      const head = t('uCols');
      const lines = [head.map(cell).join(',')].concat((range ? all.filter((u) => inR(u, range[0], range[1])) : all).map((u) => [u.full_name, u.email, u.phone, (u.created_at || '').slice(0, 10), (u.last_sign_in_at || '').slice(0, 10), prov(u.provider), u.lang, u.requests, u.bookings, u.spent, Number(u.devices) > 0 ? t('uYes') : t('uNo'), u.notify_promos ? t('uYes') : t('uNo')].map(cell).join(',')));
      const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `thetouristplus-users-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    };
  }

  // ---------- admin: error log
  async function viewErrors(days = 7) {
    const { data, error } = await sb.rpc('admin_error_log', { p_days: days });
    const rows = error ? [] : (data || []);
    const opt = [1, 7, 30, 90].map((n) => `<option value="${n}" ${n === days ? 'selected' : ''}>${esc(t('errDaysN', { n }))}</option>`).join('');
    shell('errors', `<div class="top"><div><h1>${esc(t('errTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('errSub'))}</p></div>
        <label class="f" style="min-width:140px">${esc(t('errDays'))}<select id="err-days">${opt}</select></label></div>
      ${error ? `<p class="notice info">${esc(t('errGeneric'))}</p>` : ''}
      <div class="card">${rows.length ? `<div class="tbl-wrap"><table><thead><tr>${t('errCols').map((c) => `<th>${esc(c)}</th>`).join('')}<th></th></tr></thead><tbody>${rows.map((r, i) => `<tr>
          <td style="white-space:nowrap">${esc(fmtDate(r.at))}</td><td><span class="badge">${esc(t('src_' + r.source) || r.source)}</span></td><td>${esc(r.kind)}</td>
          <td style="max-width:320px"><b>${esc(r.message)}</b></td><td style="max-width:360px"><div class="muted" dir="ltr" style="font-size:12px;white-space:pre-wrap;word-break:break-word;max-height:90px;overflow:auto">${esc(r.detail || '')}</div></td>
          <td dir="ltr" style="font-size:12px">${esc(r.who || '')}</td><td><button type="button" class="btn ghost small" data-ecopy="${i}">${esc(t('errCopy'))}</button></td></tr>`).join('')}</tbody></table></div>`
        : `<p class="muted">${esc(t('errNone'))}</p>`}</div>`);
    document.getElementById('err-days').onchange = (e) => viewErrors(parseInt(e.target.value, 10));
    document.querySelectorAll('[data-ecopy]').forEach((b) => { b.onclick = async () => {
      const r = rows[Number(b.dataset.ecopy)];
      try { await navigator.clipboard.writeText(`${r.at}\n${r.source} / ${r.kind}\n${r.message}\n${r.detail || ''}\n${r.who || ''}`); toast(t('errCopied')); } catch { toast(t('errGeneric')); }
    }; });
  }

  return { viewErrors, viewUsers, viewPush, viewPackagesLocked, viewPackages, viewPackage, viewOverview, viewPartners, viewAllBookings, viewPromos, startPromo };
}
