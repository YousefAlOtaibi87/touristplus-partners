// Special offers (partners) and admin views. Loaded by app.js.
export function install(ctx) {
  const { sb, state, t, esc, money, place, fmtDate, shell, toast, STR, SERVICES, TYPES, route } = ctx;

  Object.assign(STR.ar, {
    promoHow: 'طريقة النشر', promoHow1: 'أضف العرض واحفظه.', promoHow2: 'اختر مدة الإعلان وادفع رسومه عن طريق بوابة الدفع: {plansText}.', promoHow3: 'يظهر العرض فوراً في التطبيق، ويتوقف تلقائياً بنهاية المدة ويمكنك تجديده.',
    promoHow4: 'عمولة المنصة {rate}% من كل حجز يتم عن طريق العروض الخاصة. هوية مكتبكم وبيانات التواصل تبقى مخفية عن المسافر دائماً، حتى بعد الدفع.',
    liveUntil: 'منشور حتى {d}', notLive: 'غير منشور', stoppedByAdmin: 'موقوف من الإدارة', publishBtn: '📣 {plan} — {fee} د.ك', renewBtn: '🔁 تجديد {plan} — {fee} د.ك', plan_week: 'أسبوعي (7 أيام)', plan_month: 'شهري (30 يوماً)', plan_quarter: 'فصلي (90 يوماً)', planDays: '{n} يوماً',
    founderBanner: '🎉 مزايا الإطلاق لحسابكم: نشر عروضكم الخاصة بدون رسوم إعلان، وعمولة مخفّضة 3% بدل 4% على حجوزات العروض الخاصة حتى {d}.', founderBtn: '📣 نشر مجاني حتى {d}', founderDone: 'نُشر العرض مجاناً حتى {d}.',
    foundersTitle: 'مزايا الإطلاق: {n} مكتب في أول 3 شهور', foundersSub: 'كل مكتب جديد: بدون رسوم إعلان، وعمولة العروض الخاصة 3% بدل 4% لمدة 3 أشهر من تفعيل العقد.', founderRemove: 'إنهاء مزايا الإطلاق', founderRemoveConfirm: 'إنهاء مزايا الإطلاق لهذا المكتب الآن؟', noFounders: 'لا يوجد مكاتب في فترة مزايا الإطلاق حالياً.', founderNo: 'رقم', founderEnds: 'ينتهي العرض',
    payOpening: 'جاري فتح صفحة الدفع…', promoPaid: 'تم الدفع ونُشر العرض في التطبيق.', promoFailed: 'لم يكتمل الدفع، ولم يُنشر العرض.', needSave: 'احفظ العرض أولاً.', bookingsN: '{n} حجز',
    uDel: 'حذف', uDelAsk: 'حذف حساب {e} وكل بياناته (الطلبات، المحادثات، الجوازات، المحفظة) نهائياً؟ ما يمكن التراجع، ويقدر يسجّل من جديد بنفس الإيميل.\n\nللتأكيد اكتب الإيميل:', uDelReason: 'سبب الحذف (اختياري):', uDeleted: 'تم حذف الحساب وبياناته.', uDelMismatch: 'الإيميل غير مطابق، ما تم الحذف.',
    e_has_paid_bookings: 'ما ينحذف: عنده حجوزات مدفوعة لازم تبقى في السجلات المالية.', e_not_traveler: 'ما ينحذف من هنا: الحساب مو مسافر (مدير أو مكتب).', e_cannot_delete_self: 'ما تقدر تحذف حسابك.',
    navErrors: 'سجل الأخطاء', errTitle: 'سجل الأخطاء', errSub: 'أخطاء التطبيق ولوحة الإدارة، ومشاكل الدفع والمهام التلقائية والإشعارات اللي ما وصلت لأحد.', errDays: 'آخر', errDaysN: '{n} يوم', errNone: 'ما في أخطاء في هذي الفترة 👍', errCols: ['الوقت', 'المصدر', 'النوع', 'الرسالة', 'تفاصيل', 'المستخدم / المرجع'],
    src_app: 'التطبيق', src_portal: 'لوحة الإدارة', src_site: 'الموقع', src_payments: 'الدفع', src_cron: 'مهمة تلقائية', src_push: 'الإشعارات', errCopy: 'نسخ', errCopied: 'تم النسخ',
    gTitle: 'نمو المستخدمين', gPeriod: 'الفترة', gp_7: 'آخر 7 أيام', gp_30: 'آخر 30 يوم', gp_90: 'آخر 90 يوم', gp_month: 'هذا الشهر', gp_lastmonth: 'الشهر الماضي', gp_year: 'هذي السنة', gp_all: 'من البداية', gp_custom: 'فترة محددة', gFrom: 'من', gTo: 'إلى',
    gNew: 'مسجّلين جدد في الفترة', gPrev: 'الفترة اللي قبلها', gChange: 'التغيّر', gAvg: 'متوسط باليوم', gTotalAt: 'إجمالي المسجّلين بنهاية الفترة', gBy_day: 'حسب اليوم', gBy_week: 'حسب الأسبوع', gBy_month: 'حسب الشهر', gTableNote: 'الجدول تحت يعرض المسجّلين في هذي الفترة.',
    aTitle: 'نشاط المسافرين في الفترة', oOpens: 'فتحات التطبيق (عدّ دقيق)', oDevices: 'أجهزة فتحت التطبيق', oRetDev: 'أجهزة رجعت بأكثر من يوم', oGuests: 'فتحات بدون تسجيل', aVisits: 'زيارات (مستخدم/يوم)', aActive: 'مستخدمين نشطين', aReturning: 'مستخدمين راجعين', aReq: 'طلبات حجز', aRepeat: 'طلبوا أكثر من مرة', aBooked: 'تم الحجز', aPaid: 'منها مدفوع', aNot: 'لم يتم الحجز',
    aNotDetail: 'عندها عروض ولم تُحجز {a} · بدون عروض {b} · ملغاة {c} · منتهية {d}', aConv: 'نسبة التحويل (حجز ÷ طلبات)', aNote: 'الزيارات تُحسب من دخول المستخدم للتطبيق (مرة لكل مستخدم باليوم). «راجع» = دخل في يومين أو أكثر بالفترة أو مسجّل من قبلها.',
    confirmCol: 'تأكيد الحجز', confirmBtn: '✓ تأكيد الحجز', confirmAsk: 'تأكيد هذا الحجز؟ يوصل إشعار للمسافر إن حجزه تأكد.', confirmDone: 'تم تأكيد الحجز وإشعار المسافر.', confirmedOn: 'مؤكد {d}',
    navPerf: 'أداء المكاتب', perfTitle: 'أداء المكاتب', perfSub: 'نشاط كل مكتب في الفترة: الدخول، العروض، سرعة الرد على الطلبات الجديدة، والوقت لتأكيد الحجز.',
    pCols: ['المكتب', 'الحالة', 'آخر دخول', 'آخر خروج', 'تقييم الأداء ★', 'جودة الخدمة (تقييم المسافرين)', 'حجوزات من البداية', 'مبيعات من البداية', 'أيام دخول', 'عروض مرسلة', 'طلبات رد عليها', 'متوسط وقت الرد', 'وسيط وقت الرد', 'حجوزات', 'مدفوعة', 'مؤكدة', 'بانتظار التأكيد', 'متوسط وقت التأكيد', 'وسيط وقت التأكيد'],
    pMarket: 'طلبات المسافرين في الفترة', pAnswered: 'نسبة الطلبات اللي رد عليها أي مكتب', pFastest: 'أسرع مكتب بالرد', pOffers: 'إجمالي العروض', pPending: 'حجوزات بانتظار التأكيد',
    pNote: 'وقت الرد = من نزول طلب المسافر لين أول عرض من المكتب. وقت التأكيد = من الدفع (أو قبول العرض إذا ما في دفع) لين ضغط المكتب «تأكيد الحجز». «الوسيط» يقلل تأثير الحالات الشاذة.', pNone: 'ما في مكاتب.', pScoreNote: 'تقييم الأداء (من 5) يُحسب تلقائياً من تاريخ المكتب كامل: جودة الخدمة من تقييم المسافرين بعد الرحلة 20%، نسبة الرد على الطلبات 25%، سرعة الرد 20%، تحويل العروض لحجوزات 20%، سرعة تأكيد الحجز 15%. إذا ما فيه بيانات لجزء (مثلاً ما فيه تقييمات بعد) يُحسب كمتوسط محايد. يظهر لك أنت بس كمدير، وما يشوفه المسافر ولا المكتب.', pBest: 'أعلى مكتب تقييماً', prOnline: '🟢 متصل الآن', prOffline: 'غير متصل', prSeen: 'آخر نشاط {d}', prLogins: '{n} دخول آخر 30 يوم', pOnlineNow: 'مكاتب متصلة الآن', pRevN: '{n} تقييم', pRevPeriod: 'بالفترة {s}★ من {n}', pReviewsTitle: 'آخر تعليقات المسافرين', pMin: '{n} د', pHr: '{n} س', pDay: '{n} يوم',
    bdTitle: '🎂 أعياد ميلاد المسافرين', bdSub: 'تاريخ الميلاد ينحفظ تلقائياً من جواز المسافر نفسه، أو يضيفه من «بياناتي». يوصله تهنئة تلقائية يوم ميلاده الساعة 9 الصبح، مع عرض ترويجي اختياري لمن قبِل العروض.', bdCover: 'عندهم تاريخ ميلاد', bdToday: 'ميلادهم اليوم', bdSent: 'تهاني هالسنة', bdGroups: 'الفئات العمرية', bdUpcoming: 'أعياد الميلاد خلال 30 يوم', bdNone: 'ما فيه أعياد ميلاد قريبة.', bdTurns: 'يكمل {n}', bdNoPromo: 'رافض العروض', bdOn: 'إرسال التهنئة تلقائياً', bdTitleAr: 'العنوان (عربي) — {name} = الاسم الأول', bdBodyAr: 'نص التهنئة (عربي)', bdTitleEn: 'العنوان (إنجليزي)', bdBodyEn: 'نص التهنئة (إنجليزي)', bdPromoAr: 'سطر العرض الترويجي (عربي، اختياري) — مثال: هديتك خصم على رحلتك الجاية', bdPromoEn: 'سطر العرض الترويجي (إنجليزي، اختياري)', bdSave: 'حفظ إعدادات التهنئة', bdSaved: 'انحفظت إعدادات التهنئة.', bdGift: '🎁 أرسل عرض', bdGiftTitle: 'العنوان', bdGiftBody: 'نص العرض', bdGiftTitleDef: '🎁 هدية عيد ميلادك', bdGiftSend: 'إرسال العرض', bdGiftCancel: 'إلغاء', bdGiftSent: 'انرسل العرض لـ {n}.', bdGiftEn: 'نسخة إنجليزية (اختياري)', bdGreeted: '✓ تهنّى', bdOfferSent: '🎁 انرسل عرض {d}', bdNoPromoWarn: 'هذا المسافر رافض العروض الترويجية. متأكد تبي ترسل له؟', bdRecent: 'تهاني آخر 14 يوم', bdTodayBadge: 'اليوم 🎉',
    navStrengths: 'تميّز المكاتب', stTitle: 'تميّز المكاتب بالمدن والفنادق', stSub: 'وين كل مكتب قوي: عدد عروضه وحجوزاته لكل مدينة وفندق، ونسبة فوزه، وسعره مقارنة بباقي المكاتب على نفس الفندق. للإدارة فقط.', stDays: 'الفترة', stAgency: 'المكتب', stAll: 'كل المكاتب', stByCity: 'الأقوى في كل مدينة', stDetail: 'التفاصيل لكل مكتب وفندق', stCity: 'المدينة', stHotel: 'الفندق', stOffers: 'عروض', stWins: 'حجوزات', stWinRate: 'نسبة الفوز', stNight: 'متوسط سعره لليلة', stMarket: 'متوسط السوق', stDiff: 'مقارنة بالسوق', stCheaper: 'أرخص {n}%', stPricier: 'أغلى {n}%', stSame: 'مماثل', stAlone: 'وحده', stNone: 'ما فيه بيانات كافية بعد — تتجمع تلقائياً مع كل عرض فيه فندق.', stTopHotels: 'أقوى فنادقه', stTopCities: 'أقوى مدنه', stCompeting: '{n} مكاتب',
    navHotels: 'دليل الفنادق', hdShare: 'مشاركة الدليل مع المكاتب والمسافرين', hdShareOff: 'الدليل خاص بالإدارة فقط — المكاتب والمسافرين ما يشوفون منه شي.', hdShareOn: 'الدليل مُشارك: المكاتب تشوف اقتراحات الفنادق وصورها، والمسافرين يشوفونها في البحث.', hdShareConfirm: 'متأكد تبي تفتح الدليل للمكاتب والمسافرين؟', hdShareOffConfirm: 'ترجّع الدليل خاص بالإدارة فقط؟', hdTitle: 'دليل الفنادق', hdSub: 'كل فندق ينحفظ مرة وحدة من عروض الشركاء، مع صوره وموقعه وبياناته — بدون تكرار.', hdSearch: 'ابحث باسم الفندق أو المدينة', hdNone: 'ما فيه فنادق بعد. الدليل يكبر تلقائياً مع كل عرض فيه فندق.', hdOffers: 'عروض', hdBookings: 'حجوزات', hdAvg: 'متوسط الليلة', hdAgencies: 'مكاتب', hdEdit: 'تعديل', hdSave: 'حفظ', hdCancel: 'إلغاء', hdMerge: 'دمج المحدد', hdMergeHint: 'حدد سجلين لنفس الفندق واضغط دمج.', hdMergeConfirm: 'نحتفظ بـ «{a}» وندمج فيه «{b}» (صوره وعروضه). متأكد؟', hdMerged: 'تم الدمج.', hdSaved: 'انحفظ.', hdPhotoDel: 'حذف الصورة من الدليل؟', hdName: 'الاسم', hdCity: 'المدينة', hdArea: 'المنطقة', hdAddress: 'العنوان', hdStars: 'النجوم', hdPhone: 'الهاتف', hdMap: 'رابط الخريطة', hdCount: '{n} فندق',
    navPhotos: 'صور العروض', phTitle: 'مراجعة صور العروض', phSub: 'راجع الصور اللي يرفعها الشركاء واحذف أي صورة فيها اسم المكتب أو شعاره أو بيانات تواصل.', phNone: 'ما فيه عروض فيها صور.', phNotReady: 'الميزة تحتاج تفعيل في قاعدة البيانات أولاً.', phDel: 'حذف', phDelConfirm: 'تحذف هذي الصورة من العرض نهائياً؟', phDeleted: 'انحذفت الصورة.', phNotify: 'أرسل تنبيه للمكتب', phNoticeTitle: 'حذف صورة مخالفة من عرضك', phNoticeBody: 'تم حذف صورة من عرضك ({d}) لأنها تحتوي على اسم المكتب أو بيانات تواصل. نذكّركم بأن الصور يجب أن تكون خالية من أي بيانات تعريفية أو تواصل، وتكرار المخالفة قد يؤدي لإيقاف العروض.', phNoticeSent: 'انحذفت الصورة وانرسل تنبيه للمكتب.', phFilterAll: 'كل الحالات', phCount: '{n} صورة',
    wcTitle: 'رسالة الترحيب التلقائية', wcSub: 'توصل تلقائياً لكل مكتب جديد (في البوابة وبالإيميل) لحظة قبول تسجيله وتفعيل حسابه.', wcOn: 'تفعيل الإرسال التلقائي', wcSubject: 'العنوان', wcBody: 'نص الرسالة', wcSave: 'حفظ رسالة الترحيب', wcSaved: 'انحفظت رسالة الترحيب.',
    navNoticesAdmin: 'رسائل للمكاتب', navNotices: 'رسائل الإدارة', noticesUnread: 'عندك {n} رسالة جديدة من إدارة TheTouristPlus — اضغط هنا لقراءتها.',
    ntTitle: 'رسائل للمكاتب', ntSub: 'أرسل رسالة لكل المكاتب أو لمكتب محدد. توصلهم في بوابة الشركاء (مع تنبيه)، ومع إيميل إذا اخترته.', ntTo: 'إلى', ntAll: 'كل المكاتب المفعّلة', ntSubject: 'العنوان *', ntBody: 'نص الرسالة *', ntEmail: 'أرسلها بالإيميل بعد', ntSend: 'إرسال الرسالة',
    ntConfirmAll: 'إرسال هذه الرسالة لكل المكاتب؟', ntConfirmOne: 'إرسال هذه الرسالة إلى {a}؟', ntSent: 'تم إرسال الرسالة.', ntHistory: 'الرسائل المرسلة', ntRead: 'قرأها {r} من {n}', ntNone: 'ما في رسائل.', ntEmailed: 'بالإيميل', ntMyTitle: 'رسائل الإدارة', ntMySub: 'رسائل وتعاميم من إدارة TheTouristPlus.', ntNew: 'جديد', ntRequired: 'اكتب العنوان والنص.',
    navUsers: 'المستخدمين', usersTitle: 'مستخدمين التطبيق', usersSub: 'كل اللي سجّلوا في التطبيق مع بيانات التسجيل ونشاطهم.', uTotal: 'إجمالي المسجّلين', u7: 'سجّلوا آخر 7 أيام', u30: 'سجّلوا آخر 30 يوم', uDev: 'عندهم إشعارات مفعّلة', uGuests: 'أجهزة بدون تسجيل', uBooked: 'حجزوا مرة على الأقل', uSearch: 'ابحث بالاسم أو الإيميل أو الرقم', uCsv: '⬇ تنزيل Excel (CSV)', uNone: 'ما في مستخدمين.',
    uCols: ['الاسم', 'الإيميل', 'الهاتف', 'تاريخ التسجيل', 'آخر دخول', 'طريقة التسجيل', 'اللغة', 'الطلبات', 'الحجوزات', 'المدفوع', 'الإشعارات', 'إشعارات العروض'], uYes: 'نعم', uNo: 'لا', uAdmin: 'مدير',
    navPush: 'الإشعارات', pushTitle: 'إشعارات المسافرين', pushSub: 'أرسل لكل اللي منزّلين التطبيق، أو للمسجّلين فقط، أو للي منزّلين التطبيق وما سجّلوا (ما يوصل لأي جهاز سجّل فيه حساب)، أو لمستخدم محدد بإيميله. يوصل خلال دقيقة تقريباً، وبدون حد لعدد الإشعارات أو وقت الإرسال. اللي قفّل «إشعارات العروض» من حسابه ما توصله الإشعارات العامة، والإشعار الخاص يوصل له دائماً.', pushAud: 'إلى', aud_all: 'كل اللي منزّلين التطبيق', aud_registered: 'المسجّلين فقط', aud_guests: 'منزّلين التطبيق وما سجّلوا', aud_user: 'مستخدم محدد', pushEmail: 'إيميل المستخدم', pushRegistered: 'أجهزة لمستخدمين مسجّلين', kind_direct: 'إشعار خاص', pushConfirmUser: 'إرسال هذا الإشعار لـ {e}؟', pushResend: '↻ إعادة الإرسال', pushAt: 'وقت الإرسال (اختياري، بتوقيت الكويت)', pushAtNote: 'اتركه فاضي للإرسال الحين.', pushSchedFor: 'مجدول: {d}', pushCancel: 'إلغاء', pushEdit: '✏️ تعديل', pushEditSave: 'حفظ التعديل', pushEdited: 'انحفظ التعديل، ويوصل بالوقت الجديد.', e_not_editable: 'ما يمدي يتعدّل: الإشعار انرسل أو باقي عليه أقل من دقيقة.', pushCancelAsk: 'تلغي هذا الإشعار المجدول؟', pushScheduled: 'تمت جدولة الإشعار.', e_bad_time: 'اختر وقت في المستقبل (خلال سنة).', pushResendAsk: 'تعيد إرسال هذا الإشعار لنفس المستلمين؟', e_no_user: 'ما لقينا مستخدم بهذا الإيميل.', pushDevices: 'أجهزة مسجّلة', pushOptIn: 'يستقبلون إشعارات العروض', pushGuests: 'منزّلين التطبيق بدون تسجيل', pushTitleAr: 'العنوان (عربي)', pushBodyAr: 'النص (عربي)', pushOneLang: 'اكتب العنوان والنص بلغة وحدة على الأقل (عربي أو إنجليزي). إذا كتبت بلغة وحدة يوصل نفس النص للكل.', pushTitleEn: 'العنوان (إنجليزي)', pushBodyEn: 'النص (إنجليزي)', pushTarget: 'يفتح عند الضغط', tgtHome: 'الصفحة الرئيسية', tgtOffers: 'العروض الخاصة', tgtNew: 'طلب رحلة جديدة', pushSend: '📣 إرسال الإشعار', pushConfirm: 'إرسال هذا الإشعار لـ «{a}»؟', pushQueued: 'تم وضع الإشعار في قائمة الإرسال.', pushRecent: 'آخر الإشعارات المرسلة', pushNone: 'ما في إشعارات بعد.', pushAuto: 'تلقائياً يوصل للمسافر: عرض سعر جديد، عرض قرب ينتهي، تأكيد الحجز، عرض خاص جديد، وتذكير للي ما طلب رحلة.', pushNotReady: 'الإشعارات ما تفعّلت بعد في قاعدة البيانات.', ps_pending: 'بالانتظار', ps_sent: 'أُرسل', ps_skipped: 'ملغي', kind_promo: 'عرض خاص', kind_broadcast: 'إشعار عام', pushSentTo: 'وصل لـ {n} جهاز',
    navPromos: 'العروض الخاصة', promosTitle: 'العروض الخاصة والإعلانات', promosSub: 'كل عرض منشور برسوم إعلان حسب مدته (أسبوعي أو شهري أو فصلي)، وعمولة العروض الخاصة تُحتسب تلقائياً على حجوزاتها، وخلال أول 3 أشهر من تفعيل العقد: بدون رسوم إعلان، وعمولة العروض الخاصة 3% بدل 4%.', colOffer: 'العرض', colFee: 'الرسوم', colPaid: 'تاريخ الدفع', colEnds: 'ينتهي', colLive: 'الحالة', stopBtn: 'إيقاف', resumeBtn: 'إعادة تفعيل', stopNote: 'سبب الإيقاف (يظهر للمكتب)', noPromos: 'لا توجد عروض منشورة بعد.', pay_pending: 'بانتظار الدفع', pay_failed: 'فشل الدفع', pay_paid: 'مدفوع', pay_refunded: 'مسترد',
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
    promoHow4: 'Platform commission is {rate}% on every booking made through special offers. Your identity and contact details always stay hidden from travelers, even after they pay.',
    liveUntil: 'Live until {d}', notLive: 'Not published', stoppedByAdmin: 'Stopped by admin', publishBtn: '📣 {plan} — {fee} KWD', renewBtn: '🔁 Renew {plan} — {fee} KWD', plan_week: 'Weekly (7 days)', plan_month: 'Monthly (30 days)', plan_quarter: 'Quarterly (90 days)', planDays: '{n} days',
    founderBanner: '🎉 Your launch benefits: publish your special offers with no listing fees and a reduced 3% (instead of 4%) special-offers commission until {d}.', founderBtn: '📣 Publish free until {d}', founderDone: 'Offer published free until {d}.',
    foundersTitle: 'Launch benefits: {n} agencies in their first 3 months', foundersSub: 'Every new agency: no listing fees and a 3% (instead of 4%) special-offers commission for 3 months from contract activation.', founderRemove: 'End launch benefits', founderRemoveConfirm: 'End the launch benefits for this agency now?', noFounders: 'No agencies in the launch-benefits period right now.', founderNo: 'No.', founderEnds: 'Offer ends',
    payOpening: 'Opening payment page…', promoPaid: 'Paid — your offer is live in the app.', promoFailed: 'Payment was not completed; the offer is not published.', needSave: 'Save the offer first.', bookingsN: '{n} bookings',
    uDel: 'Delete', uDelAsk: 'Permanently delete {e} and all their data (requests, chats, passports, wallet)? This cannot be undone; they can sign up again with the same email.\n\nType the email to confirm:', uDelReason: 'Reason (optional):', uDeleted: 'Account and data deleted.', uDelMismatch: 'Email does not match; nothing was deleted.',
    e_has_paid_bookings: 'Cannot delete: has paid bookings that must stay in the financial records.', e_not_traveler: 'Cannot delete here: not a traveler account (admin or agency).', e_cannot_delete_self: 'You cannot delete your own account.',
    navErrors: 'Error log', errTitle: 'Error log', errSub: 'Errors from the app and the admin portal, plus payment, scheduled-job and undelivered-notification problems.', errDays: 'Last', errDaysN: '{n} days', errNone: 'No errors in this period 👍', errCols: ['Time', 'Source', 'Type', 'Message', 'Details', 'User / ref'],
    src_app: 'App', src_portal: 'Admin portal', src_site: 'Website', src_payments: 'Payments', src_cron: 'Scheduled job', src_push: 'Notifications', errCopy: 'Copy', errCopied: 'Copied',
    gTitle: 'User growth', gPeriod: 'Period', gp_7: 'Last 7 days', gp_30: 'Last 30 days', gp_90: 'Last 90 days', gp_month: 'This month', gp_lastmonth: 'Last month', gp_year: 'This year', gp_all: 'All time', gp_custom: 'Custom range', gFrom: 'From', gTo: 'To',
    gNew: 'New sign-ups in period', gPrev: 'Previous period', gChange: 'Change', gAvg: 'Average per day', gTotalAt: 'Total users at period end', gBy_day: 'By day', gBy_week: 'By week', gBy_month: 'By month', gTableNote: 'The table below shows users who signed up in this period.',
    aTitle: 'Traveler activity in period', oOpens: 'App opens (exact)', oDevices: 'Devices that opened the app', oRetDev: 'Devices back on 2+ days', oGuests: 'Opens without sign-in', aVisits: 'Visits (user-days)', aActive: 'Active users', aReturning: 'Returning users', aReq: 'Trip requests', aRepeat: 'Requested more than once', aBooked: 'Booked', aPaid: 'of which paid', aNot: 'Not booked',
    aNotDetail: 'Has offers, not booked {a} · No offers {b} · Cancelled {c} · Expired {d}', aConv: 'Conversion (booked ÷ requests)', aNote: 'Visits are counted from app sign-ins (once per user per day). “Returning” = active on 2+ days in the period, or signed up before it.',
    confirmCol: 'Confirmation', confirmBtn: '✓ Confirm booking', confirmAsk: 'Confirm this booking? The traveler is notified that it is confirmed.', confirmDone: 'Booking confirmed and traveler notified.', confirmedOn: 'Confirmed {d}',
    navPerf: 'Partner performance', perfTitle: 'Partner performance', perfSub: 'Each agency in the period: sign-ins, offers, response speed to new requests, and time to confirm bookings.',
    pCols: ['Agency', 'Status', 'Last sign-in', 'Last sign-out', 'Performance ★', 'Service quality (traveler rating)', 'Bookings (all time)', 'Sales (all time)', 'Sign-in days', 'Offers sent', 'Requests answered', 'Avg response', 'Median response', 'Bookings', 'Paid', 'Confirmed', 'Awaiting confirmation', 'Avg confirmation', 'Median confirmation'],
    pMarket: 'Traveler requests in period', pAnswered: 'Requests answered by any agency', pFastest: 'Fastest to respond', pOffers: 'Total offers', pPending: 'Bookings awaiting confirmation',
    pNote: 'Response time = from the traveler’s request to the agency’s first offer. Confirmation time = from payment (or offer acceptance when unpaid) to the agency pressing “Confirm booking”. The median limits the effect of outliers.', pNone: 'No agencies.', pScoreNote: 'Performance score (out of 5), from the agency’s whole history: service quality from travelers’ post-trip ratings 20%, answer rate 25%, response speed 20%, offer-to-booking conversion 20%, confirmation speed 15%. A part with no data yet (e.g. no ratings) counts as neutral. Visible to you as admin only — never to travelers or agencies.', pBest: 'Top-rated agency', prOnline: '🟢 Online now', prOffline: 'Offline', prSeen: 'Last active {d}', prLogins: '{n} sign-ins in 30 days', pOnlineNow: 'Agencies online now', pRevN: '{n} ratings', pRevPeriod: 'period {s}★ of {n}', pReviewsTitle: 'Latest traveler comments', pMin: '{n} min', pHr: '{n} h', pDay: '{n} d',
    bdTitle: '🎂 Traveler birthdays', bdSub: 'The birth date is saved automatically from the traveler’s own passport, or added in “My details”. They get an automatic greeting at 9 am on their birthday, with an optional offer line for those who accept promotions.', bdCover: 'with a birth date', bdToday: 'birthday today', bdSent: 'greetings this year', bdGroups: 'Age groups', bdUpcoming: 'Birthdays in the next 30 days', bdNone: 'No upcoming birthdays.', bdTurns: 'turns {n}', bdNoPromo: 'declined offers', bdOn: 'Send the greeting automatically', bdTitleAr: 'Title (Arabic) — {name} = first name', bdBodyAr: 'Greeting (Arabic)', bdTitleEn: 'Title (English)', bdBodyEn: 'Greeting (English)', bdPromoAr: 'Offer line (Arabic, optional)', bdPromoEn: 'Offer line (English, optional)', bdSave: 'Save greeting settings', bdSaved: 'Greeting settings saved.', bdGift: '🎁 Send offer', bdGiftTitle: 'Title', bdGiftBody: 'Offer text', bdGiftTitleDef: '🎁 Your birthday gift', bdGiftSend: 'Send offer', bdGiftCancel: 'Cancel', bdGiftSent: 'Offer sent to {n}.', bdGiftEn: 'English version (optional)', bdGreeted: '✓ greeted', bdOfferSent: '🎁 offer sent {d}', bdNoPromoWarn: 'This traveler declined promotional offers. Send anyway?', bdRecent: 'Greetings in the last 14 days', bdTodayBadge: 'today 🎉',
    navStrengths: 'Agency strengths', stTitle: 'Agency strengths by city and hotel', stSub: 'Where each agency is strong: offers and bookings per city and hotel, win rate, and its price versus other agencies on the same hotel. Admin only.', stDays: 'Period', stAgency: 'Agency', stAll: 'All agencies', stByCity: 'Strongest in each city', stDetail: 'Detail per agency and hotel', stCity: 'City', stHotel: 'Hotel', stOffers: 'offers', stWins: 'bookings', stWinRate: 'Win rate', stNight: 'Its avg night', stMarket: 'Market avg', stDiff: 'vs market', stCheaper: '{n}% cheaper', stPricier: '{n}% pricier', stSame: 'similar', stAlone: 'only one', stNone: 'Not enough data yet — it builds up automatically with every offer that includes a hotel.', stTopHotels: 'Top hotels', stTopCities: 'Top cities', stCompeting: '{n} agencies',
    navHotels: 'Hotel directory', hdShare: 'Share the directory with agencies and travelers', hdShareOff: 'Private to admin — agencies and travelers see nothing from it.', hdShareOn: 'Shared: agencies get hotel suggestions and photos, travelers see it in search.', hdShareConfirm: 'Open the directory to agencies and travelers?', hdShareOffConfirm: 'Make the directory admin-only again?', hdTitle: 'Hotel directory', hdSub: 'Every hotel is stored once from partner offers, with its photos, location and details — no duplicates.', hdSearch: 'Search by hotel or city', hdNone: 'No hotels yet. The directory grows automatically with every offer that includes a hotel.', hdOffers: 'offers', hdBookings: 'bookings', hdAvg: 'avg night', hdAgencies: 'agencies', hdEdit: 'Edit', hdSave: 'Save', hdCancel: 'Cancel', hdMerge: 'Merge selected', hdMergeHint: 'Tick two records of the same hotel and press merge.', hdMergeConfirm: 'Keep “{a}” and merge “{b}” into it (photos and offers). Sure?', hdMerged: 'Merged.', hdSaved: 'Saved.', hdPhotoDel: 'Remove this photo from the directory?', hdName: 'Name', hdCity: 'City', hdArea: 'Area', hdAddress: 'Address', hdStars: 'Stars', hdPhone: 'Phone', hdMap: 'Map link', hdCount: '{n} hotels',
    navPhotos: 'Offer photos', phTitle: 'Review offer photos', phSub: 'Review partner photos and remove any showing the agency name, logo or contact details.', phNone: 'No offers with photos yet.', phNotReady: 'This feature needs the database update first.', phDel: 'Delete', phDelConfirm: 'Remove this photo from the offer permanently?', phDeleted: 'Photo removed.', phNotify: 'Notify the agency', phNoticeTitle: 'A photo was removed from your offer', phNoticeBody: 'A photo was removed from your offer ({d}) because it showed the agency name or contact details. Photos must not contain any identifying or contact details; repeated violations may suspend your offers.', phNoticeSent: 'Photo removed and the agency was notified.', phFilterAll: 'All statuses', phCount: '{n} photos',
    wcTitle: 'Automatic welcome message', wcSub: 'Sent automatically to every new agency (portal + email) the moment its registration is approved and the account activated.', wcOn: 'Send automatically', wcSubject: 'Subject', wcBody: 'Message', wcSave: 'Save welcome message', wcSaved: 'Welcome message saved.',
    navNoticesAdmin: 'Messages to agencies', navNotices: 'Platform messages', noticesUnread: 'You have {n} new message(s) from TheTouristPlus — click to read.',
    ntTitle: 'Messages to agencies', ntSub: 'Send a message to every agency or to one agency. It appears in the partner portal (with an alert), and by email if you choose.', ntTo: 'To', ntAll: 'All active agencies', ntSubject: 'Subject *', ntBody: 'Message *', ntEmail: 'Also send by email', ntSend: 'Send message',
    ntConfirmAll: 'Send this message to every agency?', ntConfirmOne: 'Send this message to {a}?', ntSent: 'Message sent.', ntHistory: 'Sent messages', ntRead: 'Read by {r} of {n}', ntNone: 'No messages.', ntEmailed: 'by email', ntMyTitle: 'Platform messages', ntMySub: 'Messages and circulars from TheTouristPlus.', ntNew: 'New', ntRequired: 'Write a subject and a message.',
    navUsers: 'Users', usersTitle: 'App users', usersSub: 'Everyone who signed up in the app, with sign-up details and activity.', uTotal: 'Signed-up users', u7: 'Joined last 7 days', u30: 'Joined last 30 days', uDev: 'Notifications on', uGuests: 'Devices not signed in', uBooked: 'Booked at least once', uSearch: 'Search by name, email or phone', uCsv: '⬇ Download Excel (CSV)', uNone: 'No users.',
    uCols: ['Name', 'Email', 'Phone', 'Signed up', 'Last sign-in', 'Sign-up method', 'Language', 'Requests', 'Bookings', 'Paid', 'Notifications', 'Offer notifications'], uYes: 'Yes', uNo: 'No', uAdmin: 'Admin',
    navPush: 'Notifications', pushTitle: 'Traveler notifications', pushSub: 'Send to everyone who installed the app, to signed-in users only, to people who installed but never signed up (no device that ever had an account gets it), or to one user by email. Delivered in about a minute, with no limit on how many or when. Users who turned off offer notifications do not get general sends; a direct notification always reaches them.', pushAud: 'To', aud_all: 'Everyone with the app', aud_registered: 'Signed-in users only', aud_guests: 'Installed, not signed up', aud_user: 'One user', pushEmail: 'User email', pushRegistered: 'Signed-in users\' devices', kind_direct: 'Direct', pushConfirmUser: 'Send this notification to {e}?', pushResend: '↻ Send again', pushAt: 'Send time (optional, Kuwait time)', pushAtNote: 'Leave empty to send now.', pushSchedFor: 'Scheduled: {d}', pushCancel: 'Cancel', pushEdit: '✏️ Edit', pushEditSave: 'Save changes', pushEdited: 'Changes saved; it goes out at the new time.', e_not_editable: 'Cannot be edited: already sent or less than a minute left.', pushCancelAsk: 'Cancel this scheduled notification?', pushScheduled: 'Notification scheduled.', e_bad_time: 'Pick a future time (within a year).', pushResendAsk: 'Send this notification again to the same recipients?', e_no_user: 'No user with this email.', pushDevices: 'Registered devices', pushOptIn: 'Receiving offer notifications', pushGuests: 'Installed, not signed in', pushTitleAr: 'Title (Arabic)', pushBodyAr: 'Text (Arabic)', pushOneLang: 'Write the title and text in at least one language (Arabic or English). With one language, everyone gets the same text.', pushTitleEn: 'Title (English)', pushBodyEn: 'Text (English)', pushTarget: 'Opens on tap', tgtHome: 'Home', tgtOffers: 'Special offers', tgtNew: 'New trip request', pushSend: '📣 Send notification', pushConfirm: 'Send this notification to “{a}”?', pushQueued: 'Notification queued for sending.', pushRecent: 'Recent notifications', pushNone: 'No notifications yet.', pushAuto: 'Sent automatically to the traveler: new price offer, offer about to expire, booking confirmed, new special offer, and a reminder for those who have not requested a trip.', pushNotReady: 'Notifications are not enabled in the database yet.', ps_pending: 'Queued', ps_sent: 'Sent', ps_skipped: 'Cancelled', kind_promo: 'Special offer', kind_broadcast: 'Broadcast', pushSentTo: 'Reached {n} devices',
    navPromos: 'Special offers', promosTitle: 'Special offers & ads', promosSub: 'Each live offer carries a listing fee by period (weekly, monthly or quarterly); the special-offers commission is applied to its bookings automatically. During the first 3 months after contract activation: no listing fees and a 3% (instead of 4%) special-offers commission.', colOffer: 'Offer', colFee: 'Fee', colPaid: 'Paid', colEnds: 'Ends', colLive: 'Status', stopBtn: 'Stop', resumeBtn: 'Resume', stopNote: 'Reason (shown to the agency)', noPromos: 'No published offers yet.', pay_pending: 'Awaiting payment', pay_failed: 'Failed', pay_paid: 'Paid', pay_refunded: 'Refunded',
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
      ${founders.length ? `<div class="tbl-wrap"><table><tbody>${founders.map((f) => `<tr><td>${esc(f.founder_no)}</td><td><b>${esc(f.name)}</b></td><td class="muted">${esc(fmtDate(f.activated_at))} → ${esc(fmtDate(f.founder_until))}</td></tr>`).join('')}</tbody></table></div>` : `<p class="muted" style="margin:0">${esc(t('noFounders'))}</p>`}</div>`;
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
    ctx.suggest?.airlineField(form.querySelector('[name=airline]'));
    ctx.suggest?.hotelField(form.querySelector('[name=hotel]'), () => form.querySelector('[name=destination]').value, (h) => { const st = form.querySelector('[name=hotel_stars]'); if (h?.stars && st) st.value = String(h.stars); });
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
      <td>${b.commission != null ? esc(money(b.commission)) : '—'}</td><td class="muted">${esc(fmtDate(b.booked_at))}</td><td><a class="btn ghost small" href="#/issue/${esc(b.offer_id)}">${esc(t('isView'))}</a></td></tr>`).join('');
    shell('allbookings', `<div class="top"><h1>${esc(t('navAllBookings'))}</h1></div>
      ${rows ? `<div class="tbl-wrap"><table><thead><tr><th>${esc(t('destination'))}</th><th>${esc(t('depart'))}</th><th>${esc(t('traveler'))}</th><th>${esc(t('partner'))}</th><th>${esc(t('price'))}</th><th>${esc(t('payStatus'))}</th><th>${esc(t('commission'))}</th><th>${esc(t('bookedAt'))}</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>` : `<div class="card empty">${esc(t('noBookings'))}</div>`}`);
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
        <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap"><label class="f" style="min-width:240px">${esc(t('pushAud'))}<select name="aud"><option value="all">${esc(t('aud_all'))}</option><option value="registered">${esc(t('aud_registered'))}</option><option value="guests">${esc(t('aud_guests'))}</option><option value="user">${esc(t('aud_user'))}</option></select></label>
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
          <td>${r.status === 'pending' && (r.kind === 'broadcast' || r.kind === 'direct') && r.send_after && Date.parse(r.send_after) > Date.now() + 60000 ? `<button type="button" class="btn ghost small" data-pedit="${esc(r.id)}">${esc(t('pushEdit'))}</button> ` : ''}${r.status === 'pending' && (r.kind === 'broadcast' || r.kind === 'direct') ? `<button type="button" class="btn ghost small" data-pcancel="${esc(r.id)}">${esc(t('pushCancel'))}</button> ` : ''}${r.kind === 'broadcast' || r.kind === 'direct' ? `<button type="button" class="btn ghost small" data-resend="${esc(r.id)}">${esc(t('pushResend'))}</button>` : ''}</td></tr>`).join('')}</tbody></table></div>`
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
    // Edit a scheduled notification inline (text, target, time) before it is sent.
    const kwLocal = (iso) => { const d = new Date(Date.parse(iso) + 3 * 3600e3); return d.toISOString().slice(0, 16); };
    document.querySelectorAll('[data-pedit]').forEach((b) => { b.onclick = () => {
      const r = rows.find((x) => String(x.id) === b.dataset.pedit); const tr = b.closest('tr');
      // When only one language was written, the other is stored as a copy: show it empty so it is clear it was not written separately.
      const same = (r.title_en || '') === (r.title_ar || '') && (r.body_en || '') === (r.body_ar || '');
      const vAr = { t: r.title_ar, b: r.body_ar }, vEn = same ? { t: '', b: '' } : { t: r.title_en, b: r.body_en };
      if (tr.nextElementSibling?.dataset?.editrow) { tr.nextElementSibling.remove(); return; }
      const ed = document.createElement('tr'); ed.dataset.editrow = '1';
      ed.innerHTML = `<td colspan="9"><form style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;padding:10px;background:#F6F2EA;border-radius:12px" novalidate>
        <label class="f">${esc(t('pushTitleAr'))}<input name="ta" maxlength="60" value="${esc(vAr.t || '')}"></label>
        <label class="f">${esc(t('pushTitleEn'))}<input name="te" maxlength="60" dir="ltr" value="${esc(vEn.t || '')}"></label>
        <label class="f">${esc(t('pushBodyAr'))}<textarea name="ba" rows="3" maxlength="180">${esc(vAr.b || '')}</textarea></label>
        <label class="f">${esc(t('pushBodyEn'))}<textarea name="be" rows="3" maxlength="180" dir="ltr">${esc(vEn.b || '')}</textarea></label>
        <label class="f">${esc(t('pushAt'))}<input name="at" type="datetime-local" dir="ltr" required value="${esc(kwLocal(r.send_after))}"></label>
        <label class="f">${esc(t('pushTarget'))}<select name="route">${[['/', 'tgtHome'], ['/packages', 'tgtOffers'], ['/new', 'tgtNew']].map(([v, l]) => `<option value="${v}" ${r.route === v ? 'selected' : ''}>${esc(t(l))}</option>`).join('')}</select></label>
        <div class="row" style="gap:8px;align-items:flex-end"><button class="btn small" type="submit">${esc(t('pushEditSave'))}</button><button class="btn ghost small" type="button" data-x>${esc(t('hdCancel'))}</button></div></form></td>`;
      tr.after(ed);
      const f = ed.querySelector('form'); f.querySelector('[data-x]').onclick = () => ed.remove();
      f.onsubmit = async (e) => {
        e.preventDefault(); const fd = new FormData(f); const at = String(fd.get('at') || '');
        if (!((String(fd.get('ta') || '').trim() && String(fd.get('ba') || '').trim()) || (String(fd.get('te') || '').trim() && String(fd.get('be') || '').trim()))) return toast(t('pushOneLang'));
        const { error: er } = await sb.rpc('admin_push_update', { p_id: Number(r.id), p_title_ar: fd.get('ta'), p_body_ar: fd.get('ba'), p_title_en: fd.get('te'), p_body_en: fd.get('be'), p_route: fd.get('route'),
          p_at: at ? `${at.length === 16 ? at + ':00' : at}+03:00` : null });
        if (er) { const m = String(er.message || ''); return toast(m.includes('bad_time') ? t('e_bad_time') : m.includes('not_editable') ? t('e_not_editable') : t('errGeneric')); }
        toast(t('pushEdited')); viewPush();
      };
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

  async function renderBirthdays(box) {
    const [{ data: b, error }, { data: st }] = await Promise.all([sb.rpc('admin_birthdays', { p_days: 30 }),
      sb.from('platform_settings').select('bday_enabled, bday_title_ar, bday_body_ar, bday_title_en, bday_body_en, bday_promo_ar, bday_promo_en').eq('id', 1).maybeSingle()]);
    if (error || !b) { box.remove(); return; }
    const k = (n, l) => `<div class="kpi" style="min-width:140px"><b style="font-size:22px">${esc(n)}</b><span class="muted" style="font-size:12px">${esc(l)}</span></div>`;
    const G = ['18-24', '25-34', '35-44', '45-54', '55+', '<18'];
    const gmax = Math.max(1, ...G.map((g) => Number(b.groups?.[g] || 0)));
    box.innerHTML = `<h2 style="margin:0 0 4px">${esc(t('bdTitle'))}</h2><p class="muted" style="margin:0 0 12px;font-size:13px">${esc(t('bdSub'))}</p>
      <div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:14px">${k(`${b.with_bd} / ${b.total}`, t('bdCover'))}${k(b.today, t('bdToday'))}${k(b.sent_this_year, t('bdSent'))}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px">
        <div><h3 style="margin:0 0 8px">${esc(t('bdGroups'))}</h3>${G.filter((g) => b.groups?.[g]).map((g) => `<div class="row" style="gap:8px;align-items:center;margin:4px 0"><span style="width:52px;font-size:13px" dir="ltr">${g}</span><div style="flex:1;background:#eef2f7;border-radius:6px;height:14px"><div style="width:${Math.round((b.groups[g] / gmax) * 100)}%;background:#0B3D91;height:14px;border-radius:6px"></div></div><b style="font-size:13px;width:28px">${b.groups[g]}</b></div>`).join('') || '<span class="muted">—</span>'}</div>
        <div><h3 style="margin:0 0 8px">${esc(t('bdUpcoming'))}</h3>${b.upcoming.length ? b.upcoming.map((u) => `<div class="bd-row" style="padding:6px 0;border-bottom:1px solid var(--line,#e5e7eb);font-size:13px"><div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span><b>${esc(u.name || '—')}</b> <span class="muted" dir="ltr">${esc(u.email || '')}</span></span>
          <span>${u.date ? `${u.is_today ? `<span class="badge good">${esc(t('bdTodayBadge'))}</span>` : esc(fmtDate(u.date))} · ${esc(t('bdTurns', { n: u.turns }))}` : ''}${u.promos === false ? ` · <span class="muted">${esc(t('bdNoPromo'))}</span>` : ''}${u.greeted ? ` · ${esc(t('bdGreeted'))}` : ''}${u.offer_sent ? ` · ${esc(t('bdOfferSent', { d: fmtDate(u.offer_sent) }))}` : ''}
          <button class="btn ghost small" type="button" data-gift="${esc(u.email)}" data-name="${esc(u.name || u.email)}" data-promos="${u.promos === false ? 0 : 1}">${esc(t('bdGift'))}</button></span></div><div data-giftbox></div></div>`).join('') : `<span class="muted">${esc(t('bdNone'))}</span>`}
          ${b.recent?.length ? `<h3 style="margin:14px 0 8px">${esc(t('bdRecent'))}</h3>${b.recent.map((u) => `<div class="bd-row" style="padding:6px 0;border-bottom:1px solid var(--line,#e5e7eb);font-size:13px"><div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span><b>${esc(u.name || '—')}</b> <span class="muted" dir="ltr">${esc(u.email || '')}</span></span>
          <span>${u.date ? `${u.is_today ? `<span class="badge good">${esc(t('bdTodayBadge'))}</span>` : esc(fmtDate(u.date))} · ${esc(t('bdTurns', { n: u.turns }))}` : ''}${u.promos === false ? ` · <span class="muted">${esc(t('bdNoPromo'))}</span>` : ''}${u.greeted ? ` · ${esc(t('bdGreeted'))}` : ''}${u.offer_sent ? ` · ${esc(t('bdOfferSent', { d: fmtDate(u.offer_sent) }))}` : ''}
          <button class="btn ghost small" type="button" data-gift="${esc(u.email)}" data-name="${esc(u.name || u.email)}" data-promos="${u.promos === false ? 0 : 1}">${esc(t('bdGift'))}</button></span></div><div data-giftbox></div></div>`).join('')}` : ''}</div></div>
      ${st ? `<form id="bd-form" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px;margin-top:16px" novalidate>
        <label style="grid-column:1/-1;display:flex;gap:10px;align-items:center;font-weight:700"><input type="checkbox" name="enabled" style="width:auto" ${st.bday_enabled ? 'checked' : ''}> ${esc(t('bdOn'))}</label>
        <label class="f">${esc(t('bdTitleAr'))}<input name="title_ar" value="${esc(st.bday_title_ar || '')}"></label><label class="f">${esc(t('bdTitleEn'))}<input name="title_en" dir="ltr" value="${esc(st.bday_title_en || '')}"></label>
        <label class="f">${esc(t('bdBodyAr'))}<textarea name="body_ar" rows="3">${esc(st.bday_body_ar || '')}</textarea></label><label class="f">${esc(t('bdBodyEn'))}<textarea name="body_en" rows="3" dir="ltr">${esc(st.bday_body_en || '')}</textarea></label>
        <label class="f">${esc(t('bdPromoAr'))}<input name="promo_ar" value="${esc(st.bday_promo_ar || '')}"></label><label class="f">${esc(t('bdPromoEn'))}<input name="promo_en" dir="ltr" value="${esc(st.bday_promo_en || '')}"></label>
        <div><button class="btn" type="submit">${esc(t('bdSave'))}</button></div></form>` : ''}`;
    box.querySelectorAll('[data-gift]').forEach((btn) => (btn.onclick = () => {
      const holder = btn.closest('.bd-row').querySelector('[data-giftbox]'); if (holder.innerHTML) { holder.innerHTML = ''; return; }
      holder.innerHTML = `<form style="display:grid;gap:8px;margin:8px 0;padding:10px;background:#F6F2EA;border-radius:10px" novalidate>
        <label class="f">${esc(t('bdGiftTitle'))}<input name="ta" value="${esc(t('bdGiftTitleDef'))}"></label>
        <label class="f">${esc(t('bdGiftBody'))}<textarea name="ba" rows="3" required></textarea></label>
        <details><summary class="muted" style="font-size:12px;cursor:pointer">${esc(t('bdGiftEn'))}</summary><div style="display:grid;gap:8px;margin-top:8px"><input name="te" dir="ltr" placeholder="Title"><textarea name="be" rows="2" dir="ltr" placeholder="Offer text"></textarea></div></details>
        <div class="row" style="gap:8px"><button class="btn small" type="submit">${esc(t('bdGiftSend'))}</button><button class="btn ghost small" type="button" data-x>${esc(t('bdGiftCancel'))}</button></div></form>`;
      const gf = holder.querySelector('form'); gf.querySelector('[data-x]').onclick = () => (holder.innerHTML = '');
      gf.onsubmit = async (e) => {
        e.preventDefault(); const d = Object.fromEntries(new FormData(gf));
        if (!String(d.ba || '').trim() || !String(d.ta || '').trim()) return toast(t('ntRequired'));
        if (btn.dataset.promos === '0' && !confirm(t('bdNoPromoWarn'))) return;
        const { error: er } = await sb.rpc('admin_birthday_offer', { p_email: btn.dataset.gift, p_title_ar: d.ta, p_body_ar: d.ba, p_title_en: d.te || null, p_body_en: d.be || null });
        if (er) return toast(t('errGeneric'));
        toast(t('bdGiftSent', { n: btn.dataset.name })); renderBirthdays(box);
      };
    }));
    const f = document.getElementById('bd-form');
    if (f) f.onsubmit = async (e) => { e.preventDefault(); const p = Object.fromEntries(new FormData(f)); p.enabled = f.enabled.checked;
      const { error: er } = await sb.rpc('admin_set_birthday', { p }); toast(er ? t('errGeneric') : t('bdSaved')); };
  }
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
        <h3 style="margin:6px 0 0">${esc(t('aTitle'))}</h3><div class="row" id="a-k" style="gap:12px;flex-wrap:wrap"></div>
        <p class="muted" id="a-nd" style="margin:0;font-size:13px"></p><p class="muted" style="margin:0;font-size:12px">${esc(t('aNote'))}</p>
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
      activity(a1, b1, kk);
    };
    let actSeq = 0;
    const activity = async (a1, b1, kk) => {
      const my = ++actSeq;
      const box = document.getElementById('a-k'); box.innerHTML = '<span class="muted">…</span>';
      const { data: v, error: er } = await sb.rpc('admin_activity', { p_from: a1.toISOString(), p_to: b1.toISOString() });
      if (my !== actSeq || !box.isConnected) return;
      if (er || !v) { box.innerHTML = `<span class="muted">${esc(t('errGeneric'))}</span>`; return; }
      const notB = v.open_offers + v.open_no_offers + v.cancelled + v.expired;
      box.innerHTML = kk('aVisits', v.visits) + kk('aActive', v.active) + kk('aReturning', v.returning) + kk('aReq', v.requests) + kk('aRepeat', v.repeat_requesters)
        + kk('aBooked', `${v.booked} (${t('aPaid')} ${v.paid})`) + kk('aNot', notB) + kk('aConv', v.requests ? Math.round(v.booked / v.requests * 100) + '%' : '—');
      document.getElementById('a-nd').textContent = t('aNotDetail', { a: v.open_offers, b: v.open_no_offers, c: v.cancelled, d: v.expired });
      const { data: op } = await sb.rpc('admin_opens', { p_from: a1.toISOString(), p_to: b1.toISOString() });   // app 1.3.1+
      if (my === actSeq && box.isConnected && op && Number(op.opens) > 0) box.innerHTML += kk('oOpens', op.opens) + kk('oDevices', op.devices) + kk('oRetDev', op.returning_devices) + kk('oGuests', op.opens_guests);
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
    const bbox = document.createElement('div'); bbox.className = 'card'; bbox.style.marginTop = '16px';
    document.querySelector('main')?.appendChild(bbox); renderBirthdays(bbox);
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

  // ---------- admin: partner performance
  async function viewPerf(p = '30', from = '', to = '') {
    const sod = (x) => { const z = new Date(x); z.setHours(0, 0, 0, 0); return z; };
    const addD = (x, n) => { const z = new Date(x); z.setDate(z.getDate() + n); return z; };
    const today = sod(Date.now()), end = addD(today, 1);
    let a1, b1;
    if (/^\d+$/.test(p)) { a1 = addD(end, -Number(p)); b1 = end; }
    else if (p === 'month') { a1 = new Date(today.getFullYear(), today.getMonth(), 1); b1 = end; }
    else if (p === 'lastmonth') { a1 = new Date(today.getFullYear(), today.getMonth() - 1, 1); b1 = new Date(today.getFullYear(), today.getMonth(), 1); }
    else if (p === 'year') { a1 = new Date(today.getFullYear(), 0, 1); b1 = end; }
    else if (p === 'all') { a1 = new Date(2026, 0, 1); b1 = end; }
    else { a1 = from ? sod(new Date(from + 'T00:00:00')) : addD(end, -30); b1 = to ? addD(sod(new Date(to + 'T00:00:00')), 1) : end; if (a1 > b1) [a1, b1] = [b1, a1]; }
    const allFrom = new Date(2026, 0, 1).toISOString(), allTo = addD(end, 1).toISOString();
    const [{ data, error }, { data: hist }, { data: sales }, { data: revAll }, { data: revP }, { data: pres }] = await Promise.all([
      sb.rpc('admin_partner_perf', { p_from: a1.toISOString(), p_to: b1.toISOString() }),
      sb.rpc('admin_partner_perf', { p_from: allFrom, p_to: allTo }),
      sb.rpc('admin_partner_sales', { p_from: allFrom, p_to: allTo }),
      sb.rpc('admin_partner_reviews', { p_from: allFrom, p_to: allTo }),
      sb.rpc('admin_partner_reviews', { p_from: a1.toISOString(), p_to: b1.toISOString() }),
      sb.rpc('admin_agency_presence')]);
    const PR = Object.fromEntries((pres || []).map((x) => [x.agency_id, x]));
    const when = (x) => (x ? new Date(x).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—');
    const RA = Object.fromEntries((revAll || []).map((x) => [x.agency_id, x]));
    const RP = Object.fromEntries((revP || []).map((x) => [x.agency_id, x]));
    const rows = error ? [] : (data || []);
    const H = Object.fromEntries((hist || []).map((h) => [h.agency_id, h]));
    const S = Object.fromEntries((sales || []).map((x) => [x.agency_id, x]));
    const clamp = (x) => Math.max(0, Math.min(1, x));
    const score = (h, rv) => {
      if (!h || !Number(h.requests_answered)) return null;
      const q = rv && Number(rv.reviews) ? clamp((Number(rv.avg_stars) - 1) / 4) : 0.5;
      const ans = clamp(h.requests_answered / Math.max(1, h.market_requests));
      const spd = h.median_response_min === null ? 0.5 : clamp(1 - Math.log(Math.max(30, h.median_response_min) / 30) / Math.log(48));
      const conv = clamp(h.accepted / h.requests_answered);
      const conf = h.median_confirm_hours === null ? 0.5 : clamp(1 - (Math.max(2, h.median_confirm_hours) - 2) / 70);
      return Math.round((q * 0.2 + ans * 0.25 + spd * 0.2 + conv * 0.2 + conf * 0.15) * 50) / 10;
    };
    rows.forEach((r) => { r._score = score(H[r.agency_id], RA[r.agency_id]); r._q = RA[r.agency_id]; r._qp = RP[r.agency_id]; r._b = S[r.agency_id]?.bookings ?? 0; r._sales = S[r.agency_id]?.sales ?? 0; });
    const best = rows.filter((r) => r._score !== null).sort((x, y) => y._score - x._score)[0];
    const dur = (m) => (m === null || m === undefined ? '—' : m < 60 ? t('pMin', { n: Math.round(m) }) : m < 2880 ? t('pHr', { n: (m / 60).toFixed(1) }) : t('pDay', { n: (m / 1440).toFixed(1) }));
    const durH = (h) => (h === null || h === undefined ? '—' : dur(Number(h) * 60));
    const market = rows[0]?.market_requests ?? 0;
    const offers = rows.reduce((s1, r) => s1 + Number(r.offers_sent), 0);
    const pend = rows.reduce((s1, r) => s1 + Number(r.pending_confirm), 0);
    const fast = rows.filter((r) => r.median_response_min !== null).sort((x, y) => x.median_response_min - y.median_response_min)[0];
    const k = (lbl, v) => `<div class="card grow" style="min-width:160px"><div class="muted" style="font-size:13px">${esc(t(lbl))}</div><b style="font-size:22px">${esc(v)}</b></div>`;
    const opt = ['7', '30', '90', 'month', 'lastmonth', 'year', 'all', 'custom'].map((x) => `<option value="${x}" ${x === p ? 'selected' : ''}>${esc(t('gp_' + x))}</option>`).join('');
    shell('perf', `<div class="top"><div><h1>${esc(t('perfTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('perfSub'))}</p></div>
        <div class="row" style="gap:10px;align-items:flex-end;flex-wrap:wrap"><label class="f" style="min-width:160px">${esc(t('gPeriod'))}<select id="pf-p">${opt}</select></label>
          ${p === 'custom' ? `<label class="f">${esc(t('gFrom'))}<input type="date" id="pf-from" dir="ltr" value="${esc(from)}"></label><label class="f">${esc(t('gTo'))}<input type="date" id="pf-to" dir="ltr" value="${esc(to)}"></label>` : ''}</div></div>
      ${error ? `<p class="notice info">${esc(t('errGeneric'))}</p>` : ''}
      <div class="row" style="gap:12px;margin-bottom:16px;flex-wrap:wrap">${k('pMarket', market)}${k('pOffers', offers)}${k('pFastest', fast ? `${fast.name} · ${dur(fast.median_response_min)}` : '—')}${k('pPending', pend)}${pres ? k('pOnlineNow', (pres || []).filter((x) => x.online).length) : ''}${k('pBest', best ? `${best.name} · ${best._score}★` : '—')}</div>
      <div class="card"><div class="tbl-wrap"><table><thead><tr>${t('pCols').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>
        ${rows.length ? rows.map((r) => `<tr><td><b>${esc(r.name)}</b>${r.status && r.status !== 'active' ? `<div class="muted" style="font-size:12px">${esc(r.status)}</div>` : ''}</td>
          <td style="white-space:nowrap">${PR[r.agency_id] ? `${esc(t(PR[r.agency_id].online ? 'prOnline' : 'prOffline'))}<div class="muted" style="font-size:12px">${esc(t('prSeen', { d: when(PR[r.agency_id].last_seen) }))}<br>${esc(t('prLogins', { n: PR[r.agency_id].logins_30d }))}</div>` : '—'}</td>
          <td style="white-space:nowrap">${esc(when(PR[r.agency_id]?.last_login))}</td><td style="white-space:nowrap">${esc(when(PR[r.agency_id]?.last_logout))}</td>
          <td><b>${r._score === null ? '—' : esc(r._score) + ' ★'}</b></td>
          <td>${r._q ? `${esc(Number(r._q.avg_stars).toFixed(1))} ★ <span class="muted" style="font-size:12px">(${esc(t('pRevN', { n: r._q.reviews }))}${r._qp ? ` · ${esc(t('pRevPeriod', { s: Number(r._qp.avg_stars).toFixed(1), n: r._qp.reviews }))}` : ''})</span>` : '—'}</td><td>${esc(r._b)}</td><td>${esc(money(r._sales))}</td>
          <td>${esc(r.logins)}</td><td>${esc(r.offers_sent)}</td><td>${esc(r.requests_answered)}${market ? ` <span class="muted" style="font-size:12px">(${Math.round(r.requests_answered / market * 100)}%)</span>` : ''}</td>
          <td>${esc(dur(r.avg_response_min))}</td><td>${esc(dur(r.median_response_min))}</td><td>${esc(r.accepted)}</td><td>${esc(r.paid)}</td><td>${esc(r.confirmed)}</td>
          <td>${Number(r.pending_confirm) ? `<span class="badge accent">${esc(r.pending_confirm)}</span>` : '0'}</td><td>${esc(durH(r.avg_confirm_hours))}</td><td>${esc(durH(r.median_confirm_hours))}</td></tr>`).join('')
          : `<tr><td colspan="19" class="muted">${esc(t('pNone'))}</td></tr>`}</tbody></table></div>
        <p class="muted" style="margin:10px 0 0;font-size:12px">${esc(t('pNote'))}</p><p class="muted" style="margin:6px 0 0;font-size:12px">${esc(t('pScoreNote'))}</p></div>
      <div class="card" style="margin-top:16px"><h2 style="margin:0 0 10px">${esc(t('pReviewsTitle'))}</h2><div id="pf-rev" class="muted">…</div></div>`);
    sb.from('agency_reviews').select('stars, comment, created_at, agency_id').gte('created_at', a1.toISOString()).lt('created_at', b1.toISOString()).order('created_at', { ascending: false }).limit(30).then(({ data: rv }) => {
      const box = document.getElementById('pf-rev'); if (!box) return;
      const nm = Object.fromEntries(rows.map((r) => [r.agency_id, r.name]));
      box.innerHTML = rv?.length ? rv.map((x) => `<div style="padding:8px 0;border-bottom:1px solid var(--line,#e5e7eb)"><b>${'★'.repeat(x.stars)}${'☆'.repeat(5 - x.stars)}</b> · ${esc(nm[x.agency_id] || '')} · <span class="muted" style="font-size:12px">${esc(fmtDate(x.created_at))}</span>${x.comment ? `<div style="color:inherit;margin-top:4px">${esc(x.comment)}</div>` : ''}</div>`).join('') : '—';
    });
    const main = document.querySelector('main') || document.getElementById('app');
    const sbox = document.createElement('div'); sbox.className = 'card'; sbox.id = 'pf-strengths'; sbox.style.marginTop = '16px';
    main.appendChild(sbox); renderStrengths(sbox);
    const go = () => viewPerf(document.getElementById('pf-p').value, document.getElementById('pf-from')?.value || from, document.getElementById('pf-to')?.value || to);
    document.getElementById('pf-p').onchange = go;
    ['pf-from', 'pf-to'].forEach((id) => { const el = document.getElementById(id); if (el) el.onchange = go; });
  }




  // ---------- admin: where each agency is strong (city / hotel)
  async function viewStrengths() { location.hash = '#/perf'; }
  async function renderStrengths(box, days = 365, agency = '') {
    const [{ data, error }, { data: ags }] = await Promise.all([
      sb.rpc('admin_agency_strengths', { p_days: Number(days), p_agency: agency || null }),
      sb.from('agencies').select('id, name, name_ar').order('name')]);
    if (!box.isConnected) return; // user left the page while loading
    const rows = error ? [] : (data || []);
    const nm = (a) => (state.lang === 'ar' ? a.name_ar || a.name : a.name);
    const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);
    const diff = (r) => {
      if (Number(r.agencies_on_hotel) < 2 || !r.avg_night || !r.market_avg) return `<span class="muted">${esc(t('stAlone'))}</span>`;
      const d = Math.round(((Number(r.avg_night) - Number(r.market_avg)) / Number(r.market_avg)) * 100);
      return Math.abs(d) < 5 ? esc(t('stSame')) : d < 0 ? `<span class="badge good">${esc(t('stCheaper', { n: -d }))}</span>` : `<span class="badge">${esc(t('stPricier', { n: d }))}</span>`;
    };
    // strongest agencies per city (bookings first, then offers)
    const byCity = {};
    rows.forEach((r) => { const c = r.city || '—'; const k = r.agency_id; byCity[c] ??= {}; const x = (byCity[c][k] ??= { name: r.agency_name, offers: 0, wins: 0, hotels: new Set() }); x.offers += Number(r.offers); x.wins += Number(r.wins); x.hotels.add(r.hotel_name); });
    const cities = Object.entries(byCity).map(([c, m]) => [c, Object.values(m).sort((a, b) => b.wins - a.wins || b.offers - a.offers)]).sort((a, b) => b[1].reduce((s, x) => s + x.offers, 0) - a[1].reduce((s, x) => s + x.offers, 0));
    box.innerHTML = `<h2 style="margin:0 0 4px">${esc(t('stTitle'))}</h2><p class="muted" style="margin:0 0 12px;font-size:13px">${esc(t('stSub'))}</p>
      <div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:14px">
        <label class="f" style="width:160px">${esc(t('stDays'))}<select id="st-days">${[[90, '90'], [180, '180'], [365, '365'], [3650, '∞']].map(([v, l]) => `<option value="${v}" ${Number(days) === v ? 'selected' : ''}>${l === '∞' ? '∞' : l + (state.lang === 'ar' ? ' يوم' : ' days')}</option>`).join('')}</select></label>
        <label class="f" style="min-width:220px">${esc(t('stAgency'))}<select id="st-ag"><option value="">${esc(t('stAll'))}</option>${(ags || []).map((a) => `<option value="${esc(a.id)}" ${agency === a.id ? 'selected' : ''}>${esc(nm(a))}</option>`).join('')}</select></label></div>
      ${!rows.length ? `<p class="muted">${esc(t('stNone'))}</p>` : `
      <div style="margin-bottom:16px"><h3 style="margin:0 0 10px">${esc(t('stByCity'))}</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">${cities.map(([c, list]) => `<div style="border:1px solid var(--line,#e5e7eb);border-radius:12px;padding:10px">
          <b>📍 ${esc(place(c))}</b>${list.slice(0, 3).map((x, i) => `<div class="row" style="justify-content:space-between;font-size:13px;margin-top:6px"><span>${['🥇', '🥈', '🥉'][i]} ${esc(x.name || '—')}</span><span class="muted">${x.wins} ${esc(t('stWins'))} · ${x.offers} ${esc(t('stOffers'))}</span></div>`).join('')}</div>`).join('')}</div></div>
      <div><h3 style="margin:0 0 10px">${esc(t('stDetail'))}</h3><div class="tbl-wrap"><table><thead><tr>
        <th>${esc(t('stAgency'))}</th><th>${esc(t('stCity'))}</th><th>${esc(t('stHotel'))}</th><th>${esc(t('stOffers'))}</th><th>${esc(t('stWins'))}</th><th>${esc(t('stWinRate'))}</th><th>${esc(t('stNight'))}</th><th>${esc(t('stMarket'))}</th><th>${esc(t('stDiff'))}</th></tr></thead><tbody>
        ${rows.map((r) => `<tr><td>${esc(r.agency_name || '—')}</td><td>${esc(place(r.city || ''))}</td><td>${esc(r.hotel_name)} ${r.stars ? '★'.repeat(r.stars) : ''}<div class="muted" style="font-size:11px">${esc(t('stCompeting', { n: r.agencies_on_hotel }))}</div></td>
          <td>${esc(r.offers)}</td><td><b>${esc(r.wins)}</b></td><td>${pct(Number(r.wins), Number(r.offers))}%</td>
          <td>${r.avg_night ? esc(money(r.avg_night)) : '—'}</td><td>${r.market_avg ? esc(money(r.market_avg)) : '—'}</td><td>${diff(r)}</td></tr>`).join('')}</tbody></table></div></div>`}`;
    const sd = box.querySelector('#st-days'), sa = box.querySelector('#st-ag');
    if (!sd || !sa) return;
    const go = () => renderStrengths(box, sd.value, sa.value);
    sd.onchange = go; sa.onchange = go;
  }
  // ---------- admin: hotel directory (catalog)
  async function viewHotels(q = '') {
    const [{ data, error }, { data: ps }] = await Promise.all([sb.rpc('admin_hotels', { p_q: q || null, p_limit: 300 }), sb.from('platform_settings').select('catalog_shared').eq('id', 1).maybeSingle()]);
    const shared = !!ps?.catalog_shared;
    if (error) { shell('hotels', `<div class="top"><div><h1>${esc(t('hdTitle'))}</h1></div></div><p class="notice bad">${esc(t('errGeneric'))}</p>`); return; }
    const list = data || [];
    const card = (h) => `<div class="card" style="margin-bottom:12px" data-hid="${esc(h.id)}">
      <div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap">
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" data-sel="${esc(h.id)}" style="width:auto"> <b>${esc(h.name)}</b> ${h.stars ? '★'.repeat(h.stars) : ''}</label>
        <span class="muted" style="font-size:12px">${esc(h.offers)} ${esc(t('hdOffers'))} · ${esc(h.bookings)} ${esc(t('hdBookings'))} · ${esc(h.agencies)} ${esc(t('hdAgencies'))}${h.avg_night ? ` · ${esc(t('hdAvg'))} ${esc(money(h.avg_night))}` : ''}</span></div>
      <div class="muted" style="font-size:13px;margin:6px 0">${esc([h.city ? place(h.city) : '', h.area, h.address].filter(Boolean).join(' · ') || '—')}${h.phone ? ` · ☎ <span dir="ltr">${esc(h.phone)}</span>` : ''}${h.map ? ` · <a href="${esc(h.map)}" target="_blank" rel="noopener">📍 ${esc(t('hdMap'))}</a>` : ''}</div>
      ${h.photos?.length ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0">${h.photos.map((p) => `<div style="position:relative"><a href="${esc(p.url)}" target="_blank" rel="noopener"><img src="${esc(p.url)}" alt="" loading="lazy" style="width:110px;height:80px;object-fit:cover;border-radius:8px;background:#eee"></a>
        <button type="button" data-phrm="${esc(p.id)}" aria-label="×" style="position:absolute;top:3px;inset-inline-end:3px;width:22px;height:22px;border-radius:11px;border:0;background:rgba(0,0,0,.6);color:#fff;cursor:pointer">×</button></div>`).join('')}</div>` : ''}
      <button class="btn ghost small" type="button" data-edit="${esc(h.id)}">${esc(t('hdEdit'))}</button>
      <form data-form="${esc(h.id)}" hidden style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:10px">
        ${[['name', 'hdName'], ['city', 'hdCity'], ['area', 'hdArea'], ['address', 'hdAddress'], ['stars', 'hdStars'], ['phone', 'hdPhone'], ['map', 'hdMap']].map(([k, l]) => `<label class="f">${esc(t(l))}<input name="${k}" value="${esc(h[k] ?? '')}" ${k === 'phone' || k === 'map' || k === 'stars' ? 'dir="ltr"' : ''}></label>`).join('')}
        <div class="row" style="gap:8px;align-items:flex-end"><button class="btn small" type="submit">${esc(t('hdSave'))}</button><button class="btn ghost small" type="button" data-cancel>${esc(t('hdCancel'))}</button></div></form></div>`;
    shell('hotels', `<div class="top"><div><h1>${esc(t('hdTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('hdSub'))}</p></div></div>
      <div class="card" style="margin-bottom:12px;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><label style="display:flex;gap:8px;align-items:center;font-weight:700"><input type="checkbox" id="hd-share" style="width:auto" ${shared ? 'checked' : ''}> ${esc(t('hdShare'))}</label>
        <span class="badge ${shared ? 'good' : ''}">${esc(t(shared ? 'hdShareOn' : 'hdShareOff'))}</span></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:12px"><input id="hd-q" placeholder="${esc(t('hdSearch'))}" value="${esc(q)}" style="max-width:320px">
        <button class="btn" type="button" id="hd-merge">${esc(t('hdMerge'))}</button><span class="muted" style="font-size:12px">${esc(t('hdMergeHint'))} · ${esc(t('hdCount', { n: list.length }))}</span></div>
      ${list.length ? list.map(card).join('') : `<p class="muted">${esc(t('hdNone'))}</p>`}`);
    document.getElementById('hd-share').onchange = async (e) => {
      const on = e.target.checked;
      if (!confirm(t(on ? 'hdShareConfirm' : 'hdShareOffConfirm'))) { e.target.checked = !on; return; }
      const { error: er } = await sb.rpc('admin_set_catalog_shared', { p_on: on });
      if (er) { e.target.checked = !on; return toast(t('errGeneric')); }
      viewHotels(q);
    };
    let qt; document.getElementById('hd-q').oninput = (e) => { clearTimeout(qt); qt = setTimeout(() => viewHotels(e.target.value.trim()), 400); };
    document.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => { const f = document.querySelector(`[data-form="${b.dataset.edit}"]`); f.hidden = !f.hidden; }));
    document.querySelectorAll('[data-form]').forEach((f) => {
      f.querySelector('[data-cancel]').onclick = () => (f.hidden = true);
      f.onsubmit = async (e) => { e.preventDefault(); const p = Object.fromEntries(new FormData(f));
        const { error: er } = await sb.rpc('admin_hotel_update', { p_id: f.dataset.form, p });
        if (er) return toast(t('errGeneric')); toast(t('hdSaved')); viewHotels(q); };
    });
    document.querySelectorAll('[data-phrm]').forEach((b) => (b.onclick = async () => {
      if (!confirm(t('hdPhotoDel'))) return;
      const { error: er } = await sb.rpc('admin_hotel_photo_remove', { p_id: b.dataset.phrm });
      if (er) return toast(t('errGeneric')); viewHotels(q);
    }));
    document.getElementById('hd-merge').onclick = async () => {
      const ids = [...document.querySelectorAll('[data-sel]:checked')].map((x) => x.dataset.sel);
      if (ids.length !== 2) return toast(t('hdMergeHint'));
      const [x, y] = ids.map((id) => list.find((h) => h.id === id));
      const keep = Number(x.offers) >= Number(y.offers) ? x : y, drop = keep === x ? y : x;
      if (!confirm(t('hdMergeConfirm', { a: keep.name, b: drop.name }))) return;
      const { error: er } = await sb.rpc('admin_hotel_merge', { p_from: drop.id, p_into: keep.id });
      if (er) return toast(t('errGeneric')); toast(t('hdMerged')); viewHotels(q);
    };
  }
  // ---------- admin: review offer photos
  async function viewPhotos() {
    const { data, error } = await sb.rpc('admin_offer_photos', { p_limit: 200 });
    if (error) { shell('photos', `<div class="top"><div><h1>${esc(t('phTitle'))}</h1></div></div><p class="notice info">${esc(t('phNotReady'))}</p>`); return; }
    const list = data || [];
    shell('photos', `<div class="top"><div><h1>${esc(t('phTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('phSub'))}</p></div></div>
      <label style="display:flex;gap:8px;align-items:center;font-weight:700;font-size:14px;margin-bottom:12px"><input type="checkbox" id="ph-notify" style="width:auto" checked> ${esc(t('phNotify'))}</label>
      ${list.length ? list.map((o) => `<div class="card" style="margin-bottom:12px">
        <div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px"><b>${esc(o.agency_name || '—')} · ${esc(place(o.destination || ''))}</b>
          <span class="muted" style="font-size:12px">${esc(fmtDate(o.created_at))} · ${esc(t('st_' + o.status))} · ${esc(t('phCount', { n: o.photos.length }))}</span></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">${o.photos.map((p) => `<div style="width:170px;display:flex;flex-direction:column;gap:6px">
          <a href="${esc(p.url)}" target="_blank" rel="noopener"><img src="${esc(p.url)}" alt="" loading="lazy" style="width:170px;height:120px;object-fit:cover;border-radius:10px;background:#eee"></a>
          <div class="row" style="justify-content:space-between"><span class="badge">${esc(t('kind_' + (p.kind || 'hotel')))}</span>
          <button class="btn ghost small" type="button" data-ph-flag data-offer="${esc(o.offer_id)}" data-agency="${esc(o.agency_id)}" data-dest="${esc(place(o.destination || ''))}" data-url="${esc(p.url)}">${esc(t('phFlag'))}</button>
          <button class="btn danger small" type="button" data-ph-del data-offer="${esc(o.offer_id)}" data-agency="${esc(o.agency_id)}" data-dest="${esc(place(o.destination || ''))}" data-url="${esc(p.url)}">${esc(t('phDel'))}</button></div></div>`).join('')}</div></div>`).join('') : `<p class="muted">${esc(t('phNone'))}</p>`}`);
    document.querySelectorAll('[data-ph-flag]').forEach((b) => (b.onclick = async () => {
      if (!confirm(t('phFlagConfirm'))) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_flag_agency', { p_agency: b.dataset.agency, p_kind: 'photo_ad', p_detail: `صورة في عرض سعر (${b.dataset.dest}): ${b.dataset.url}`, p_ref: b.dataset.offer });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      toast(t('phFlagged'));
    }));
    document.querySelectorAll('[data-ph-del]').forEach((b) => (b.onclick = async () => {
      if (!confirm(t('phDelConfirm'))) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_remove_offer_photo', { p_offer: b.dataset.offer, p_url: b.dataset.url });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      const path = decodeURIComponent((b.dataset.url.split('/object/public/offer-photos/')[1] || '').split('?')[0]);
      if (path) await sb.storage.from('offer-photos').remove([path]).catch(() => {});
      if (document.getElementById('ph-notify')?.checked) {
        await sb.rpc('admin_send_notice', { p_agency: b.dataset.agency, p_title: t('phNoticeTitle'), p_body: t('phNoticeBody', { d: b.dataset.dest }), p_email: true });
        toast(t('phNoticeSent'));
      } else toast(t('phDeleted'));
      viewPhotos();
    }));
  }
  // ---------- admin → agencies messages
  async function viewNotices() {
    const [{ data: ags }, { data: list }, { data: wc }] = await Promise.all([sb.from('agencies').select('id, name, name_ar, status').order('name'), sb.rpc('admin_notices'),
      sb.from('platform_settings').select('welcome_enabled, welcome_title, welcome_body').eq('id', 1).maybeSingle()]);
    const nm = (a) => (state.lang === 'ar' ? a.name_ar || a.name : a.name);
    shell('notices', `<div class="top"><div><h1>${esc(t('ntTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('ntSub'))}</p></div></div>
      <div id="sp-box"></div>
      ${wc ? `<form class="card" id="wc-form" style="display:flex;flex-direction:column;gap:12px;max-width:760px;margin-bottom:16px" novalidate>
        <h2 style="margin:0">${esc(t('wcTitle'))}</h2><p class="muted" style="margin:0;font-size:13px">${esc(t('wcSub'))}</p>
        <label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="on" style="width:auto" ${wc.welcome_enabled ? 'checked' : ''}> ${esc(t('wcOn'))}</label>
        <label class="f">${esc(t('wcSubject'))}<input name="title" maxlength="150" dir="auto" value="${esc(wc.welcome_title || '')}"></label>
        <label class="f">${esc(t('wcBody'))}<textarea name="body" rows="14" maxlength="5000" dir="auto">${esc(wc.welcome_body || '')}</textarea></label>
        <div><button class="btn" type="submit">${esc(t('wcSave'))}</button></div></form>` : ''}
      <form class="card" id="nt-form" style="display:flex;flex-direction:column;gap:12px;max-width:760px;margin-bottom:16px" novalidate>
        <label class="f">${esc(t('ntTo'))}<select name="to"><option value="">${esc(t('ntAll'))}</option>${(ags || []).map((a) => `<option value="${esc(a.id)}">${esc(nm(a))}${a.status && a.status !== 'active' ? ` (${esc(a.status)})` : ''}</option>`).join('')}</select></label>
        <label class="f">${esc(t('ntSubject'))}<input name="title" maxlength="150" dir="auto"></label>
        <label class="f">${esc(t('ntBody'))}<textarea name="body" rows="6" maxlength="5000" dir="auto"></textarea></label>
        <label style="display:flex;gap:10px;align-items:center;font-weight:700;font-size:14px"><input type="checkbox" name="email" style="width:auto" checked> ${esc(t('ntEmail'))}</label>
        <div><button class="btn" type="submit">${esc(t('ntSend'))}</button></div></form>
      <div class="card"><h2 style="margin:0 0 10px">${esc(t('ntHistory'))}</h2>${(list || []).length ? (list || []).map((n) => `<div style="padding:10px 0;border-bottom:1px solid var(--line,#e5e7eb)">
          <div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap"><b>${esc(n.title)}</b><span class="muted" style="font-size:12px">${esc(fmtDate(n.created_at))} · ${esc(n.agency_name || t('ntAll'))}${n.by_email ? ` · ${esc(t('ntEmailed'))}` : ''} · ${esc(t('ntRead', { r: n.reads, n: n.targets }))}</span></div>
          <div style="white-space:pre-wrap;margin-top:6px">${esc(n.body)}</div></div>`).join('') : `<p class="muted">${esc(t('ntNone'))}</p>`}</div>`);
    ctx.support?.mountAdmin(document.getElementById('sp-box'));
    const wf = document.getElementById('wc-form');
    if (wf) wf.onsubmit = async (e) => {
      e.preventDefault(); const fd = new FormData(wf);
      const { error: er } = await sb.rpc('admin_set_welcome', { p_enabled: fd.get('on') === 'on', p_title: String(fd.get('title') || ''), p_body: String(fd.get('body') || '') });
      toast(er ? t('ntRequired') : t('wcSaved'));
    };
    const f = document.getElementById('nt-form');
    f.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(f); const to = String(fd.get('to') || ''); const title = String(fd.get('title') || '').trim(); const body = String(fd.get('body') || '').trim();
      if (!title || !body) return toast(t('ntRequired'));
      const ag = (ags || []).find((a) => a.id === to);
      if (!confirm(to ? t('ntConfirmOne', { a: ag ? nm(ag) : '' }) : t('ntConfirmAll'))) return;
      const btn = f.querySelector('button[type=submit]'); btn.disabled = true;
      const { error: er } = await sb.rpc('admin_send_notice', { p_agency: to || null, p_title: title, p_body: body, p_email: fd.get('email') === 'on' });
      btn.disabled = false;
      if (er) return toast(t('errGeneric'));
      toast(t('ntSent')); viewNotices();
    };
  }

  async function viewMyNotices() {
    const { data } = await sb.rpc('my_notices');
    const list = data || [];
    shell('notices', `<div class="top"><div><h1>${esc(t('ntMyTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('ntMySub'))}</p></div></div>
      <div class="card">${list.length ? list.map((n) => `<div style="padding:12px 0;border-bottom:1px solid var(--line,#e5e7eb)">
          <div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap"><b>${n.is_read ? '' : `<span class="badge accent">${esc(t('ntNew'))}</span> `}${esc(n.title)}</b><span class="muted" style="font-size:12px">${esc(fmtDate(n.created_at))}</span></div>
          <div style="white-space:pre-wrap;margin-top:6px">${esc(n.body)}</div></div>`).join('') : `<p class="muted">${esc(t('ntNone'))}</p>`}</div>
      <div id="sp-box" style="margin-top:16px"></div>`);
    ctx.support?.mountAgency(document.getElementById('sp-box'));
    if (list.some((n) => !n.is_read)) { await sb.rpc('read_notices'); state.unread = 0; }
  }

  return { viewStrengths, viewHotels, viewPhotos, viewNotices, viewMyNotices, viewPerf, viewErrors, viewUsers, viewPush, viewPackagesLocked, viewPackages, viewPackage, viewOverview, viewPartners, viewAllBookings, viewPromos, startPromo };
}
