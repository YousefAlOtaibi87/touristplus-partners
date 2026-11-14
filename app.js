import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { install } from './extra.js?v=23';
import { AIRLINES } from './airlines.js?v=1';
import { installOnboarding } from './onboarding.js?v=24';
import { installTerms } from './terms.js?v=11';
import { installEsim } from './esim.js?v=3';
import { installControl } from './control.js?v=10';

const CFG = window.TP_CONFIG || {};
const $app = document.getElementById('app');

// ---------------------------------------------------------------- i18n
const STR = {
  ar: {
    partners: 'بوابة الشركاء', signIn: 'تسجيل الدخول', signInSub: 'ادخل بالإيميل وكلمة المرور اللي استلمتها من TheTouristPlus.',
    email: 'الإيميل', password: 'كلمة المرور', forgot: 'نسيت كلمة المرور؟', sendReset: 'أرسل رابط إعادة التعيين',
    resetSent: 'إذا الإيميل مسجّل، بيوصلك رابط لتعيين كلمة مرور جديدة.', backToLogin: 'رجوع لتسجيل الدخول',
    newPassword: 'كلمة مرور جديدة', savePassword: 'حفظ كلمة المرور', passwordSaved: 'تم حفظ كلمة المرور.',
    badLogin: 'الإيميل أو كلمة المرور غير صحيحة.', errGeneric: 'صار خطأ، حاول مرة ثانية.',
    notPartner: 'هذا الحساب مو حساب شريك. تواصل مع TheTouristPlus لتفعيل حسابك.', notConfigured: 'البوابة غير مربوطة بالخادم للحين.',
    childAges: 'أعمار الأطفال', ageInfant: 'رضيع ({n})', ageYears: '{n} سنوات', prefsL: 'تفضيلات المسافر',
    pref_central: 'فندق في وسط المدينة', pref_breakfast: 'إفطار مشمول', pref_direct: 'طيران مباشر', pref_connecting: 'غرف متصلة', pref_view: 'إطلالة بحر / جبل',
    pref_pool: 'مسبح أو فيلا', pref_flexible: 'مرونة بالتواريخ ±2 يوم', pref_driver: 'سيارة مع سائق', pref_access: 'احتياجات خاصة',
    flightPrefs: 'الطيران المطلوب', cabinL: 'درجة المقعد', cabin_economy: 'سياحية', cabin_premium: 'سياحية مميزة', cabin_business: 'رجال الأعمال', cabin_first: 'الأولى',
    navRequests: 'طلبات السفر', navOffers: 'عروض الأسعار', navBookings: 'الحجوزات', signOut: 'تسجيل الخروج',
    requestsTitle: 'طلبات السفر المفتوحة', requestsSub: 'اختر طلب وقدّم عرضك للمسافر.',
    search: 'ابحث بالوجهة…', allTypes: 'كل الأنواع', sortClosing: 'الأقرب إغلاقاً', sortNewest: 'الأحدث',
    onlyNew: 'بدون عرض مني', noRequests: 'ما فيه طلبات مفتوحة حالياً. الطلبات الجديدة تطلع هنا تلقائياً.',
    closesIn: 'يغلق بعد {h} ساعة', closesInM: 'يغلق بعد {m} دقيقة', closed: 'مغلق', offersN: '{n} عروض', yourOfferSent: 'أرسلت عرض',
    budgetUpTo: 'الميزانية حتى {v}', travelers: '{a} بالغين، {c} أطفال', nights: '{n} ليالي',
    depart: 'المغادرة', ret: 'العودة', travelersL: 'المسافرين', hotelStars: 'تصنيف الفندق', budget: 'الميزانية', services: 'الخدمات المطلوبة', any: 'أي', notes: 'ملاحظات المسافر', traveler: 'المسافر',
    back: 'رجوع', tripDetails: 'تفاصيل الطلب', yourOffer: 'عرضك', sendOffer: 'أرسل العرض', updateOffer: 'حدّث العرض', withdraw: 'سحب العرض',
    withdrawConfirm: 'تبي تسحب عرضك؟', price: 'السعر الإجمالي (د.ك)', airline: 'الطيران', airlinePh: 'مثال: الخطوط الجوية الكويتية', hotel: 'الفندق', hotelPh: 'اسم الفندق',
    includes: 'الخدمات المشمولة', itinerary: 'البرنامج والتفاصيل', itineraryPh: 'اليوم ١: الوصول والتوصيل…', validFor: 'صلاحية العرض', days: '{n} أيام',
    errPrice: 'اكتب سعر صحيح.', validUntil: 'العرض صالح حتى', validUntilHint: 'تحدد أنت صلاحية العرض، بشرط تكون قبل تاريخ السفر.', errValidity: 'اختر تاريخ صلاحية بعد ساعة على الأقل وقبل تاريخ السفر.', errMaxOffers: 'وصلت الحد الأعلى من الخيارات لهذا الطلب (3 خيارات لكل مدينة).', hotelCity: 'المدينة', hCancel: 'الإلغاء', hcFree: 'قابل للإلغاء', hcNonref: 'غير قابل للإلغاء', hcUntil: 'إلغاء مجاني حتى', hcWant: 'إلغاء الفندق المطلوب', hc_any: 'قابل أو غير قابل للإلغاء', hc_free: 'قابل للإلغاء', hc_nonref: 'غير قابل للإلغاء', flightPolicy: 'تذاكر الطيران تخضع لسياسة شركة الطيران نفسها.', errCancel: 'حدد لكل فندق: قابل للإلغاء أو غير قابل للإلغاء.', citiesL: 'المدن', anyHotel: 'أي فندق', introBanner: '🎁 فترة تمهيدية: عمولة المنصة على حجوزات طلبات الأسعار {r}% بدل {n}% حتى {d}، وبعدها تطبَّق النسبة الأصلية تلقائياً.', optLabel: 'اسم الخيار (اختياري)', optLabelPh: 'مثال: خيار اقتصادي / فندق على البحر', yourOptions: 'خياراتك المرسلة ({n} من {m})', addOption: '+ إضافة خيار آخر', editOption: 'تعديل', optionN: 'خيار {n}', hotelsL: 'الفنادق', hotelRow: 'فندق {n}', hotelNights: 'عدد الليالي', nightPrice: 'سعر الليلة (د.ك)', addHotel: '+ فندق آخر', hotelsHint: 'اذكر عدد الليالي وسعر الليلة لكل فندق.', validLeft: 'صالح حتى {d}', followup: '⏰ طلب متابعة المسافر', followupDone: 'تم إرسال تنبيه للمسافر بأن عرضك بانتظار قراره.', followupSoon: 'أرسلت طلب متابعة لهذا الطلب خلال آخر 24 ساعة.', followupHint: 'المنصة ترسل للمسافر تنبيه في التطبيق بأن عرضك بانتظار قراره (مرة كل 24 ساعة).', resultTitle: 'نتيجة الطلب', resultWon: 'تم اختيار عرضك 🎉', resultOther: 'اختار المسافر عرض المكتب {c} بسعر {p}.', resultNone: 'أُغلق الطلب بدون حجز.', myCode: 'كود مكتبك: {c}', cancelEdit: 'إلغاء التعديل', offerSent: 'تم إرسال عرضك للمسافر.', offerUpdated: 'تم تحديث العرض.', offerWithdrawn: 'تم سحب العرض.',
    requestClosed: 'هذا الطلب ما يستقبل عروض جديدة.', chat: 'المحادثة مع المسافر', chatHint: 'المحادثة تتفعّل بعد ما ترسل عرضك.', typeMessage: 'اكتب رسالة…', send: 'إرسال', noMessages: 'ما فيه رسائل للحين.',
    myOffersTitle: 'عروضي', noOffers: 'ما أرسلت أي عرض للحين.', destination: 'الوجهة', dates: 'التواريخ', status: 'الحالة', sentAt: 'أُرسل',
    st_pending: 'بانتظار المسافر', st_accepted: 'تم الحجز', st_declined: 'لم يُختر', st_withdrawn: 'مسحوب',
    bookingsTitle: 'الحجوزات المؤكدة', noBookings: 'ما فيه حجوزات للحين.', bookedNotice: 'المسافر اختار عرضك! بيدفع من التطبيق، وأول ما يتم الدفع يطلع لك هني. تواصل معه لإرسال المستندات.',
    contactAfterPay: 'تظهر بيانات المسافر وجوازات السفر هنا فور إتمام الدفع.', passports: 'بيانات جوازات السفر', paxName: 'الاسم كما في الجواز', passportNo: 'رقم الجواز', nationality: 'الجنسية', birth: 'تاريخ الميلاد', expiry: 'انتهاء الجواز', viewCopy: 'عرض النسخة',
    payStatus: 'الدفع', commission: 'العمولة', net: 'صافي لك', pay_paid: 'مدفوع', pay_pending: 'بانتظار الدفع', pay_failed: 'لم يتم', pay_refunded: 'مسترجع', pay_none: 'لم يدفع بعد',
    contact: 'بيانات التواصل', name: 'الاسم', phone: 'الجوال', newRequest: 'وصل طلب سفر جديد', newMessage: 'رسالة جديدة من مسافر', offerAccepted: 'مسافر حجز عرضك!',
    type_leisure: 'سياحة', type_family: 'عائلية', type_umrah: 'عمرة', type_honeymoon: 'شهر عسل', type_business: 'عمل', type_group: 'مجموعة',
    svc_flights: 'طيران', svc_hotel: 'فندق', svc_transfers: 'توصيل', svc_tours: 'جولات', svc_visa: 'تأشيرة', svc_insurance: 'تأمين',
    kwd: 'د.ك', open: 'مفتوح', rfq_booked: 'محجوز', rfq_cancelled: 'ملغي', rfq_closed: 'مغلق',
  },
  en: {
    partners: 'Partner portal', signIn: 'Sign in', signInSub: 'Use the email and password you received from TheTouristPlus.',
    email: 'Email', password: 'Password', forgot: 'Forgot password?', sendReset: 'Send reset link',
    resetSent: 'If the email is registered, you will receive a link to set a new password.', backToLogin: 'Back to sign in',
    newPassword: 'New password', savePassword: 'Save password', passwordSaved: 'Password saved.',
    badLogin: 'Incorrect email or password.', errGeneric: 'Something went wrong. Please try again.',
    notPartner: 'This is not a partner account. Contact TheTouristPlus to activate your account.', notConfigured: 'The portal is not connected to the server yet.',
    childAges: 'Children’s ages', ageInfant: 'infant ({n})', ageYears: '{n} yrs', prefsL: 'Traveler preferences',
    pref_central: 'Central hotel', pref_breakfast: 'Breakfast included', pref_direct: 'Direct flights', pref_connecting: 'Connecting rooms', pref_view: 'Sea / mountain view',
    pref_pool: 'Pool or villa', pref_flexible: 'Flexible dates ±2 days', pref_driver: 'Car with driver', pref_access: 'Accessibility needs',
    flightPrefs: 'Requested flights', cabinL: 'Cabin', cabin_economy: 'Economy', cabin_premium: 'Premium Economy', cabin_business: 'Business', cabin_first: 'First',
    navRequests: 'Trip requests', navOffers: 'My quotes', navBookings: 'Bookings', signOut: 'Sign out',
    requestsTitle: 'Open trip requests', requestsSub: 'Pick a request and send your offer to the traveler.',
    search: 'Search destination…', allTypes: 'All types', sortClosing: 'Closing soon', sortNewest: 'Newest',
    onlyNew: 'Not offered yet', noRequests: 'No open requests right now. New requests appear here automatically.',
    closesIn: 'Closes in {h}h', closesInM: 'Closes in {m} min', closed: 'Closed', offersN: '{n} offers', yourOfferSent: 'Offer sent',
    budgetUpTo: 'Budget up to {v}', travelers: '{a} adults, {c} children', nights: '{n} nights',
    depart: 'Departure', ret: 'Return', travelersL: 'Travelers', hotelStars: 'Hotel rating', budget: 'Budget', services: 'Requested services', any: 'Any', notes: 'Traveler notes', traveler: 'Traveler',
    back: 'Back', tripDetails: 'Request details', yourOffer: 'Your offer', sendOffer: 'Send offer', updateOffer: 'Update offer', withdraw: 'Withdraw offer',
    withdrawConfirm: 'Withdraw your offer?', price: 'Total price (KWD)', airline: 'Airline', airlinePh: 'e.g. Kuwait Airways', hotel: 'Hotel', hotelPh: 'Hotel name',
    includes: 'Included services', itinerary: 'Itinerary & details', itineraryPh: 'Day 1: arrival & transfer…', validFor: 'Valid for', days: '{n} days',
    errPrice: 'Enter a valid price.', validUntil: 'Offer valid until', validUntilHint: 'You set the offer’s validity, as long as it ends before the departure date.', errValidity: 'Pick a validity at least one hour from now and before departure.', errMaxOffers: 'Limit reached for this request (3 options per city).', hotelCity: 'City', hCancel: 'Cancellation', hcFree: 'Free cancellation', hcNonref: 'Non-refundable', hcUntil: 'Free cancellation until', hcWant: 'Hotel cancellation wanted', hc_any: 'Refundable or non-refundable', hc_free: 'Free cancellation', hc_nonref: 'Non-refundable', flightPolicy: 'Flight tickets follow the airline’s own policy.', errCancel: 'State for every hotel: free cancellation or non-refundable.', citiesL: 'Cities', anyHotel: 'Any hotel', introBanner: '🎁 Introductory period: platform commission on request bookings is {r}% instead of {n}% until {d}; the standard rate applies automatically afterwards.', optLabel: 'Option name (optional)', optLabelPh: 'e.g. Budget option / Beachfront hotel', yourOptions: 'Your options ({n} of {m})', addOption: '+ Add another option', editOption: 'Edit', optionN: 'Option {n}', hotelsL: 'Hotels', hotelRow: 'Hotel {n}', hotelNights: 'Nights', nightPrice: 'Price per night (KWD)', addHotel: '+ Another hotel', hotelsHint: 'Give the number of nights and the nightly rate for each hotel.', validLeft: 'Valid until {d}', followup: '⏰ Ask to follow up with the traveler', followupDone: 'The traveler was reminded that your offer awaits their decision.', followupSoon: 'You already asked for a follow-up on this request in the last 24 hours.', followupHint: 'The platform sends the traveler an in-app reminder that your offer awaits a decision (once every 24 hours).', resultTitle: 'Request result', resultWon: 'Your offer was chosen 🎉', resultOther: 'The traveler chose agency {c}’s offer at {p}.', resultNone: 'The request closed without a booking.', myCode: 'Your agency code: {c}', cancelEdit: 'Cancel edit', offerSent: 'Your offer was sent to the traveler.', offerUpdated: 'Offer updated.', offerWithdrawn: 'Offer withdrawn.',
    requestClosed: 'This request is no longer accepting offers.', chat: 'Chat with traveler', chatHint: 'Chat opens after you send an offer.', typeMessage: 'Write a message…', send: 'Send', noMessages: 'No messages yet.',
    myOffersTitle: 'My offers', noOffers: 'You have not sent any offers yet.', destination: 'Destination', dates: 'Dates', status: 'Status', sentAt: 'Sent',
    st_pending: 'Awaiting traveler', st_accepted: 'Booked', st_declined: 'Not selected', st_withdrawn: 'Withdrawn',
    bookingsTitle: 'Confirmed bookings', noBookings: 'No bookings yet.', bookedNotice: 'The traveler chose your offer! They pay in the app and the payment shows here once complete. Contact them to send documents.',
    contactAfterPay: 'Traveler details and passports appear here once payment is complete.', passports: 'Passport details', paxName: 'Name as in passport', passportNo: 'Passport no.', nationality: 'Nationality', birth: 'Date of birth', expiry: 'Passport expiry', viewCopy: 'View copy',
    payStatus: 'Payment', commission: 'Commission', net: 'Your net', pay_paid: 'Paid', pay_pending: 'Awaiting payment', pay_failed: 'Failed', pay_refunded: 'Refunded', pay_none: 'Not paid yet',
    contact: 'Contact details', name: 'Name', phone: 'Mobile', newRequest: 'New trip request received', newMessage: 'New message from a traveler', offerAccepted: 'A traveler booked your offer!',
    type_leisure: 'Leisure', type_family: 'Family', type_umrah: 'Umrah', type_honeymoon: 'Honeymoon', type_business: 'Business', type_group: 'Group',
    svc_flights: 'Flights', svc_hotel: 'Hotel', svc_transfers: 'Transfers', svc_tours: 'Tours', svc_visa: 'Visa', svc_insurance: 'Insurance',
    kwd: 'KWD', open: 'Open', rfq_booked: 'Booked', rfq_cancelled: 'Cancelled', rfq_closed: 'Closed',
  },
};
const PLACES = {"Istanbul":"إسطنبول","Trabzon":"طرابزون","Antalya":"أنطاليا","Bodrum":"بودروم","Izmir":"إزمير","Bursa":"بورصة","Sapanca":"سبانجا","Cappadocia":"كابادوكيا","Uzungöl":"أوزنجول","Ankara":"أنقرة","Dalaman":"دالامان","London":"لندن","Manchester":"مانشستر","Edinburgh":"إدنبرة","Birmingham":"برمنغهام","Dublin":"دبلن","Paris":"باريس","Nice":"نيس","Chamonix":"شامونيه","Cannes":"كان","Geneva":"جنيف","Zurich":"زيورخ","Interlaken":"إنترلاكن","Lucerne":"لوسيرن","Vienna":"فيينا","Salzburg":"سالزبورغ","Zell am See":"زيلامسي","Innsbruck":"إنسبروك","Munich":"ميونخ","Frankfurt":"فرانكفورت","Berlin":"برلين","Amsterdam":"أمستردام","Brussels":"بروكسل","Prague":"براغ","Budapest":"بودابست","Rome":"روما","Milan":"ميلانو","Venice":"البندقية","Florence":"فلورنسا","Naples":"نابولي","Madrid":"مدريد","Barcelona":"برشلونة","Malaga":"مالقة","Marbella":"ماربيا","Lisbon":"لشبونة","Athens":"أثينا","Santorini":"سانتوريني","Mykonos":"ميكونوس","Sarajevo":"سراييفو","Tirana":"تيرانا","Belgrade":"بلغراد","Oslo":"أوسلو","Stockholm":"ستوكهولم","Copenhagen":"كوبنهاغن","Helsinki":"هلسنكي","Reykjavik":"ريكيافيك","Baku":"باكو","Gabala":"قبالا","Tbilisi":"تبليسي","Batumi":"باتومي","Yerevan":"يريفان","Almaty":"ألماتي","Tashkent":"طشقند","Samarkand":"سمرقند","Bishkek":"بيشكيك","Moscow":"موسكو","Saint Petersburg":"سانت بطرسبرغ","Sochi":"سوتشي","Kazan":"قازان","Dubai":"دبي","Abu Dhabi":"أبوظبي","Ras Al Khaimah":"رأس الخيمة","Doha":"الدوحة","Manama":"المنامة","Muscat":"مسقط","Salalah":"صلالة","Riyadh":"الرياض","Jeddah":"جدة","Makkah":"مكة المكرمة","Madinah":"المدينة المنورة","AlUla":"العلا","Abha":"أبها","Taif":"الطائف","Dammam":"الدمام","Beirut":"بيروت","Amman":"عمّان","Aqaba":"العقبة","Dead Sea":"البحر الميت","Cairo":"القاهرة","Sharm El Sheikh":"شرم الشيخ","Hurghada":"الغردقة","Alexandria":"الإسكندرية","Luxor":"الأقصر","Casablanca":"الدار البيضاء","Marrakech":"مراكش","Tunis":"تونس","Zanzibar":"زنجبار","Nairobi":"نيروبي","Mauritius":"موريشيوس","Seychelles":"سيشل","Cape Town":"كيب تاون","Bali":"بالي","Jakarta":"جاكرتا","Puncak":"بونشاك","Kuala Lumpur":"كوالالمبور","Langkawi":"لنكاوي","Penang":"بينانغ","Bangkok":"بانكوك","Phuket":"بوكيت","Krabi":"كرابي","Singapore":"سنغافورة","Maldives":"جزر المالديف","Colombo":"كولومبو","Mumbai":"مومباي","Delhi":"دلهي","Goa":"غوا","Kerala":"كيرالا","Kathmandu":"كاتماندو","Tokyo":"طوكيو","Seoul":"سيول","Beijing":"بكين","Shanghai":"شنغهاي","Hong Kong":"هونغ كونغ","Manila":"مانيلا","New York":"نيويورك","Los Angeles":"لوس أنجلوس","Miami":"ميامي","Orlando":"أورلاندو","Washington":"واشنطن","Toronto":"تورنتو","Sydney":"سيدني","Melbourne":"ملبورن"};
const SERVICES = ['flights', 'hotel', 'transfers', 'tours', 'visa', 'insurance'];
const TYPES = ['leisure', 'family', 'honeymoon', 'business', 'group'];
const CABIN_KEYS = { E: 'economy', P: 'premium', B: 'business', F: 'first' };
const airlineName = (code) => { const a = AIRLINES.find((x) => x[0] === code); return a ? (state.lang === 'ar' ? a[2] : a[1]) : code; };
const airlineCabins = (name) => { const a = AIRLINES.find((x) => x[1] === name || x[2] === name || x[0] === name); return a ? a[3].split('').map((c) => CABIN_KEYS[c]) : Object.values(CABIN_KEYS); };

const state = {
  lang: localStorage.getItem('tp.lang') === 'en' ? 'en' : 'ar',
  session: null, profile: null, agency: null,
  filters: { q: '', type: '', sort: 'closing', onlyNew: false },
  openCount: 0,
};
const t = (k, v) => {
  let s = (STR[state.lang] && STR[state.lang][k]) || STR.en[k] || k;
  if (v) for (const [a, b] of Object.entries(v)) s = s.split(`{${a}}`).join(String(b));
  return s;
};
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const place = (p) => (state.lang === 'ar' ? String(p).split(' + ').map((x) => PLACES[x] || x).join(' + ') : p);
const money = (n) => {
  const s = Number(n).toLocaleString('en-US', { maximumFractionDigits: 3 });
  return state.lang === 'ar' ? `${s} د.ك` : `KWD ${s}`;
};
const nights = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
const closesLabel = (iso) => {
  const ms = Date.parse(iso) - Date.now();
  if (ms <= 0) return t('closed');
  const h = Math.floor(ms / 3600000);
  return h >= 1 ? t('closesIn', { h }) : t('closesInM', { m: Math.max(1, Math.round(ms / 60000)) });
};
const fmtDate = (iso) => new Date(iso).toLocaleString(state.lang === 'ar' ? 'ar-KW' : 'en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
const icon = {
  plane: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F2A65A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
  back: (rtl) => `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="${rtl ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'}"/></svg>`,
};

function applyLang() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
}
function toast(msg) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
const langToggle = () => `<button class="btn ghost small" data-act="lang" type="button" lang="${state.lang === 'ar' ? 'en' : 'ar'}">${state.lang === 'ar' ? 'English' : 'العربية'}</button>`;
const brand = () => `<div class="brand"><span class="logo"><span class="tp" dir="ltr">T+</span></span><span><span dir="ltr" class="w"><b>TheTourist</b><i>Plus</i></span><small>${t('partners')}</small></span></div>`;

// ---------------------------------------------------------------- boot
applyLang();
if (!CFG.SUPABASE_URL || !CFG.SUPABASE_ANON_KEY) {
  $app.innerHTML = `<div class="auth"><div class="auth-card">${brand()}<p class="notice info">${t('notConfigured')}</p></div></div>`;
  throw new Error('not configured');
}
const sb = createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
// Report portal errors to the admin error log (best effort, never throws).
const reportError = (msg, stack) => { try { sb.rpc('log_error', { p_source: 'portal', p_message: String(msg || 'error').slice(0, 500), p_stack: String(stack || '').slice(0, 3000), p_screen: location.hash.slice(0, 200), p_version: 'web', p_platform: navigator.userAgent.slice(0, 40) }).then(() => {}, () => {}); } catch {} };
window.addEventListener('error', (e) => reportError(e.message, e.error?.stack || `${e.filename}:${e.lineno}`));
window.addEventListener('unhandledrejection', (e) => reportError(e.reason?.message || e.reason, e.reason?.stack));
let recoveryMode = /type=(recovery|invite)/.test(location.hash);
const TM = installTerms({ sb, state, t, esc, fmtDate, shell, toast, STR });
const ES = installEsim({ sb, state, t, esc, fmtDate, shell, toast, STR });
const X = install({ sb, state, t, esc, money, place, fmtDate, shell, toast, STR, SERVICES, TYPES, route, terms: TM });
const CP = installControl({ sb, state, t, esc, money, fmtDate, shell, toast, STR, fallback: () => X.viewOverview() });
const O = installOnboarding({ sb, state, t, esc, fmtDate, shell, toast, STR, $app, brand, langToggle, route, terms: TM });

sb.auth.onAuthStateChange(async (event, session) => {
  if (event === 'PASSWORD_RECOVERY') recoveryMode = true;
  state.session = session;
  await loadProfile();
  route();
});

async function loadProfile() {
  state.profile = null;
  state.agency = null;
  if (!state.session) return;
  const { data: p } = await sb.from('profiles').select('id, role, full_name, agency_id').eq('id', state.session.user.id).maybeSingle();
  state.profile = p;
  if (p?.agency_id) {
    const { data: a } = await sb.from('agencies').select('id, name, name_ar, license_no, phone, email, rating, reviews, verified, active, status, status_reason_type, status_reason, founder_no, activated_at').eq('id', p.agency_id).maybeSingle();
    if (a) { const { data: cd } = await sb.from('agencies').select('code').eq('id', p.agency_id).maybeSingle(); if (cd) a.code = cd.code; }
    state.agency = a;
    state.intro = null;
    if (a) { const { data: it } = await sb.rpc('my_intro'); if (it?.on) state.intro = it; }
    if (a) try { sessionStorage.removeItem('ttp_reload'); } catch {}
  }
  if (p?.role === 'admin') { const { data: n } = await sb.rpc('admin_pending_applications'); state.pendingApps = n || 0; }
  startRealtime();
}

// ---------------------------------------------------------------- realtime
let channel = null;
function startRealtime() {
  if (channel) { sb.removeChannel(channel); channel = null; }
  if (!state.agency) return;
  channel = sb
    .channel('partner-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rfqs' }, () => { toast(t('newRequest')); refreshCurrent(); })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rfqs' }, () => refreshCurrent())
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'offers', filter: `agency_id=eq.${state.agency.id}` }, (p) => {
      if (p.new?.status === 'accepted' && p.old?.status !== 'accepted') toast(t('offerAccepted'));
      refreshCurrent();
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (p) => {
      if (p.new?.sender_role === 'traveler') toast(t('newMessage'));
      refreshCurrent(true);
    })
    .subscribe();
}
let refreshTimer = null;
function refreshCurrent(chatOnly) {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    if (chatOnly && currentChatOffer) return loadChat(currentChatOffer);
    if (!isEditing()) route();
  }, 250);
}
const isEditing = () => {
  const a = document.activeElement;
  return a && ['INPUT', 'TEXTAREA', 'SELECT'].includes(a.tagName) && a.closest('form[data-keep]');
};

// ---------------------------------------------------------------- router
window.addEventListener('hashchange', route);
async function route() {
  applyLang();
  if (recoveryMode && state.session) return renderReset();
  if (!state.session) return location.hash.startsWith('#/register') ? O.renderSignup() : renderLogin();
  if (!state.profile) return; // still loading
  const h = location.hash.replace(/^#\/?/, '').split('?')[0];
  const [view, id] = h.split('/');
  if (state.profile.role === 'admin') {
    if (view === 'partners') return X.viewPartners();
    if (view === 'allbookings') return X.viewAllBookings();
    if (view === 'apps') return O.viewApplications();
    if (view === 'promos') return X.viewPromos();
    if (view === 'push') return X.viewPush();
    if (view === 'users') return X.viewUsers();
    if (view === 'perf') return X.viewPerf();
    if (view === 'esim') return ES.viewEsim();
    if (view === 'company' && id) return O.viewCompany(id);
    if (view === 'terms') return TM.viewTerms();
    return CP.viewControl();
  }
  if (!state.agency || state.profile.role !== 'agency') return O.viewApplication();
  if (view === 'packages') return X.viewPackages();
  if (view === 'terms') return TM.viewTerms();
  if (view === 'package' && id) return X.viewPackage(id);
  if (view === 'request' && id) return viewRequest(id);
  if (view === 'documents') return O.viewDocuments();
  if (view === 'offers') return viewOffers();
  if (view === 'bookings') return viewBookings();
  return viewRequests();
}

// ---------------------------------------------------------------- auth screens
function renderLogin(mode = 'login', msg = '') {
  const isForgot = mode === 'forgot';
  $app.innerHTML = `
  <main class="auth"><div class="auth-card">
    <div class="row between">${brand()}${langToggle()}</div>
    <h1>${isForgot ? esc(t('forgot')) : esc(t('signIn'))}</h1>
    ${isForgot ? '' : `<p class="muted" style="margin:0">${esc(t('signInSub'))}</p>`}
    ${msg}
    <form id="auth-form" class="row" style="flex-direction:column;align-items:stretch;gap:14px" novalidate>
      <label class="f">${esc(t('email'))}<input name="email" type="email" autocomplete="username" required dir="ltr"></label>
      ${isForgot ? '' : `<label class="f">${esc(t('password'))}<input name="password" type="password" autocomplete="current-password" required dir="ltr"></label>`}
      <button class="btn" type="submit">${esc(isForgot ? t('sendReset') : t('signIn'))}</button>
    </form>
    <button class="btn ghost small" type="button" data-act="${isForgot ? 'to-login' : 'to-forgot'}">${esc(isForgot ? t('backToLogin') : t('forgot'))}</button>
    ${isForgot ? '' : `<hr style="border:0;border-top:1px solid var(--line);width:100%"><button class="btn accent" type="button" data-act="to-register">${esc(t('registerCta'))}</button>`}
  </div></main>`;
  document.getElementById('auth-form').onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const email = String(f.get('email') || '').trim();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    if (isForgot) {
      await sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname });
      renderLogin('login', `<p class="notice good">${esc(t('resetSent'))}</p>`);
    } else {
      const { error } = await sb.auth.signInWithPassword({ email, password: String(f.get('password') || '') });
      if (error) { btn.disabled = false; renderLogin('login', `<p class="notice bad" role="alert">${esc(t('badLogin'))}</p>`); }
    }
  };
}
function renderReset(msg = '') {
  $app.innerHTML = `
  <main class="auth"><div class="auth-card">
    <div class="row between">${brand()}${langToggle()}</div>
    <h1>${esc(t('newPassword'))}</h1>${msg}
    <form id="reset-form" class="row" style="flex-direction:column;align-items:stretch;gap:14px">
      <label class="f">${esc(t('newPassword'))}<input name="password" type="password" minlength="8" autocomplete="new-password" required dir="ltr"></label>
      <button class="btn" type="submit">${esc(t('savePassword'))}</button>
    </form>
  </div></main>`;
  document.getElementById('reset-form').onsubmit = async (e) => {
    e.preventDefault();
    const { error } = await sb.auth.updateUser({ password: String(new FormData(e.target).get('password')) });
    if (error) return renderReset(`<p class="notice bad" role="alert">${esc(error.message)}</p>`);
    recoveryMode = false;
    history.replaceState(null, '', location.pathname);
    toast(t('passwordSaved'));
    route();
  };
}
function renderNotPartner() {
  $app.innerHTML = `<main class="auth"><div class="auth-card"><div class="row between">${brand()}${langToggle()}</div>
    <p class="notice bad">${esc(t('notPartner'))}</p><button class="btn ghost" data-act="signout" type="button">${esc(t('signOut'))}</button></div></main>`;
}

// ---------------------------------------------------------------- shell
function agencyBanner() {
  const a = state.agency;
  if (a && state.profile?.role !== 'admin' && (!a.status || a.status === 'active') && state.intro?.on && Number(state.intro.rate) < Number(state.intro.normal))
    return `<div class="notice good" style="margin-bottom:16px">${esc(t('introBanner', { r: state.intro.rate, n: state.intro.normal, d: fmtDate(state.intro.until) }))}</div>`;
  if (!a || state.profile?.role === 'admin' || !a.status || a.status === 'active') return '';
  const why = [a.status_reason_type ? t('rt_' + a.status_reason_type) : '', a.status_reason || ''].filter(Boolean).join(' — ');
  return `<div class="notice ${a.status === 'cancelled' ? 'bad' : 'info'}" style="margin-bottom:16px"><b>${esc(t(a.status === 'cancelled' ? 'agCancelled' : 'agSuspended'))}</b>${why ? `<div>${esc(t('agReason'))} ${esc(why)}</div>` : ''}<div class="muted">${esc(t('agContact'))}</div></div>`;
}
function shell(active, inner) {
  const isAdmin = state.profile?.role === 'admin';
  const name = isAdmin ? t('adminTitle') : state.lang === 'ar' ? state.agency.name_ar || state.agency.name : state.agency.name;
  const link = (key, href, label, count) =>
    `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}><span>${esc(label)}</span>${count ? `<span class="count">${count}</span>` : ''}</a>`;
  $app.innerHTML = `
  <div class="shell">
    <aside class="side">
      ${brand()}
      <nav class="nav" aria-label="${esc(t('partners'))}">
        ${isAdmin ? `${link('overview', '#/overview', t('navOverview'))}
        ${link('partners', '#/partners', t('navPartners'))}
        ${link('allbookings', '#/allbookings', t('navAllBookings'))}
        ${link('apps', '#/apps', t('navApps'), state.pendingApps)}
        ${link('promos', '#/promos', t('navPromos'))}
        ${link('users', '#/users', t('navUsers'))}
        ${link('perf', '#/perf', t('navPerf'))}
        ${link('push', '#/push', t('navPush'))}
        ${link('esim', '#/esim', t('navEsim'))}
        ${link('terms', '#/terms', t('navTerms'))}` : `${link('requests', '#/requests', t('navRequests'), state.openCount)}
        ${link('offers', '#/offers', t('navOffers'))}
        ${link('bookings', '#/bookings', t('navBookings'))}
        ${link('packages', '#/packages', t('navPackages'))}
        ${link('documents', '#/documents', t('navDocs'))}
        ${link('terms', '#/terms', t('navTerms'))}`}
      </nav>
      <div class="side-foot">
        <span class="who">${esc(name)}${!isAdmin && state.agency?.code ? `<br><span class="badge" dir="ltr" style="margin-top:4px">${esc(state.agency.code)}</span>` : ''}</span>
        ${langToggle()}
        <button class="btn ghost small" data-act="signout" type="button">${esc(t('signOut'))}</button>
      </div>
    </aside>
    <main class="main">${agencyBanner()}<div id="docs-banner"></div>${inner}</main>
  </div>`;
  if (!isAdmin && state.agency && active !== 'documents') O.docsBanner().then((h) => { const el = document.getElementById('docs-banner'); if (el) el.innerHTML = h; }).catch(() => {});
}

// ---------------------------------------------------------------- views
async function viewRequests() {
  const { data: rfqs, error } = await sb.from('rfqs').select('*').eq('status', 'open').gt('closes_at', new Date().toISOString()).order('closes_at');
  if (error) return shell('requests', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
  const ids = (rfqs || []).map((r) => r.id);
  const [{ data: counts }, { data: mine }] = await Promise.all([
    ids.length ? sb.rpc('rfq_offer_counts', { p_ids: ids }) : Promise.resolve({ data: [] }),
    ids.length ? sb.from('offers').select('rfq_id, price, status').in('rfq_id', ids) : Promise.resolve({ data: [] }),
  ]);
  const countMap = Object.fromEntries((counts || []).map((c) => [c.rfq_id, c.n]));
  const mineMap = Object.fromEntries((mine || []).filter((o) => o.status !== 'withdrawn').map((o) => [o.rfq_id, o]));
  state.openCount = (rfqs || []).filter((r) => !mineMap[r.id]).length;

  const f = state.filters;
  let list = (rfqs || []).filter((r) =>
    (!f.q || (r.destination + ' ' + place(r.destination)).toLowerCase().includes(f.q.toLowerCase())) &&
    (!f.type || r.trip_type === f.type) && (!f.onlyNew || !mineMap[r.id]));
  if (f.sort === 'newest') list = [...list].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));

  const cards = list.map((r) => {
    const my = mineMap[r.id];
    const hrs = (Date.parse(r.closes_at) - Date.now()) / 3600000;
    return `<a class="card rfq" href="#/request/${r.id}">
      <div class="row between"><span class="dest">${esc(place(r.destination))}</span><span class="badge ${hrs < 12 ? 'bad' : 'accent'}">${esc(closesLabel(r.closes_at))}</span></div>
      <div class="muted" style="font-size:14px">${esc(t('type_' + r.trip_type))} · <span dir="ltr">${esc(r.depart)} → ${esc(r.ret)}</span> · ${esc(t('nights', { n: nights(r.depart, r.ret) }))}</div>
      <div style="font-size:14px">${esc(t('travelers', { a: r.adults, c: r.children }))}</div>
      <div class="chips">${(r.services || []).map((s) => `<span class="badge">${esc(t('svc_' + s))}</span>`).join('')}</div>
      <div class="foot">
        <span class="muted">${esc(t('offersN', { n: countMap[r.id] || 0 }))}${r.budget_max ? ' · ' + esc(t('budgetUpTo', { v: money(r.budget_max) })) : ''}</span>
        ${my ? `<span class="badge good">${esc(t('yourOfferSent'))} · ${esc(money(my.price))}</span>` : ''}
      </div>
    </a>`;
  }).join('');

  shell('requests', `
    <div class="top"><div><h1>${esc(t('requestsTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('requestsSub'))}</p></div></div>
    <div class="filters" role="search">
      <label class="sr" for="fq">${esc(t('search'))}</label>
      <input id="fq" type="search" placeholder="${esc(t('search'))}" value="${esc(f.q)}">
      <label class="sr" for="ft">${esc(t('allTypes'))}</label>
      <select id="ft"><option value="">${esc(t('allTypes'))}</option>${TYPES.map((x) => `<option value="${x}" ${f.type === x ? 'selected' : ''}>${esc(t('type_' + x))}</option>`).join('')}</select>
      <label class="sr" for="fs">${esc(t('sortClosing'))}</label>
      <select id="fs"><option value="closing" ${f.sort === 'closing' ? 'selected' : ''}>${esc(t('sortClosing'))}</option><option value="newest" ${f.sort === 'newest' ? 'selected' : ''}>${esc(t('sortNewest'))}</option></select>
      <label class="chip ${f.onlyNew ? 'on' : ''}"><input id="fn" type="checkbox" ${f.onlyNew ? 'checked' : ''}> ${esc(t('onlyNew'))}</label>
    </div>
    ${list.length ? `<div class="list">${cards}</div>` : `<div class="card empty">${esc(t('noRequests'))}</div>`}
  `);
  const fq = document.getElementById('fq');
  fq.oninput = () => { f.q = fq.value; clearTimeout(fq._t); fq._t = setTimeout(() => { viewRequests().then(() => { const n = document.getElementById('fq'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }); }, 250); };
  document.getElementById('ft').onchange = (e) => { f.type = e.target.value; viewRequests(); };
  document.getElementById('fs').onchange = (e) => { f.sort = e.target.value; viewRequests(); };
  document.getElementById('fn').onchange = (e) => { f.onlyNew = e.target.checked; viewRequests(); };
}

let currentChatOffer = null;
async function viewRequest(id) {
  currentChatOffer = null;
  const [{ data: r }, { data: offers }, { data: counts }] = await Promise.all([
    sb.from('rfqs').select('*').eq('id', id).maybeSingle(),
    state.agency ? sb.from('offers').select('*').eq('rfq_id', id).eq('agency_id', state.agency.id) : sb.from('offers').select('*').eq('rfq_id', id),
    sb.rpc('rfq_offer_counts', { p_ids: [id] }),
  ]);
  const rtl = state.lang === 'ar';
  if (!r) return shell('requests', `<a class="back" href="#/requests">${icon.back(rtl)} ${esc(t('back'))}</a><div class="card empty">—</div>`);
  const mine = (offers || []).filter((o) => o.status !== 'withdrawn').sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
  const accepted = mine.find((o) => o.status === 'accepted') || null;
  const live = accepted || mine[0] || null;
  const canOffer = r.status === 'open' && Date.parse(r.closes_at) > Date.now();
  const editId = new URLSearchParams(location.hash.split('?')[1] || '').get('edit');
  const editing = editId ? mine.find((o) => o.id === editId && o.status === 'pending') || null : null;
  const rc = Array.isArray(r.cities) ? r.cities.filter((c) => c && c.city) : [];
  const cap = 3 * Math.max(1, rc.length);
  const showForm = canOffer && (editing || mine.length < cap) && (editing || !mine.length || new URLSearchParams(location.hash.split('?')[1] || '').get('new') === '1');
  const base = editing || null;
  const svc = new Set(base?.includes || r.services || []);
  const stars = base?.hotel_stars ?? r.hotel_stars;
  const hotels = base?.hotels?.length ? base.hotels : (base?.hotel ? [{ name: base.hotel, stars: base.hotel_stars, nights: nights(r.depart, r.ret) }] : rc.length ? rc.map((c) => ({ city: c.city, name: c.hotel || '', stars: r.hotel_stars, nights: c.nights || null })) : [{ name: '', stars: r.hotel_stars, nights: nights(r.depart, r.ret) }]);
  const toLocal = (d) => { const z = new Date(d); z.setMinutes(z.getMinutes() - z.getTimezoneOffset()); return z.toISOString().slice(0, 16); };
  const maxValid = `${r.depart}T00:00`;
  const defValid = base ? toLocal(base.valid_until) : toLocal(Math.min(Date.now() + 3 * 86400000, Date.parse(`${r.depart}T00:00`) - 3600000));

  const facts = `<dl class="kv">
    <dt>${esc(t('depart'))}</dt><dd dir="ltr" style="text-align:start">${esc(r.depart)}</dd>
    <dt>${esc(t('ret'))}</dt><dd dir="ltr" style="text-align:start">${esc(r.ret)} · ${esc(t('nights', { n: nights(r.depart, r.ret) }))}</dd>
    <dt>${esc(t('travelersL'))}</dt><dd>${esc(t('travelers', { a: r.adults, c: r.children }))}</dd>
    ${r.airlines?.length || r.cabin ? `<dt>${esc(t('flightPrefs'))}</dt><dd>${esc([(r.airlines || []).map(airlineName).join('، '), r.cabin ? t('cabin_' + r.cabin) : ''].filter(Boolean).join(' · '))}</dd>` : ''}
    ${r.children_ages?.length ? `<dt>${esc(t('childAges'))}</dt><dd>${r.children_ages.map((a) => esc(a < 2 ? t('ageInfant', { n: a }) : t('ageYears', { n: a }))).join('، ')}</dd>` : ''}
    ${r.prefs?.length ? `<dt>${esc(t('prefsL'))}</dt><dd><div class="chips">${r.prefs.map((p) => `<span class="badge accent">${esc(t('pref_' + p))}</span>`).join('')}</div></dd>` : ''}
    <dt>${esc(t('hotelStars'))}</dt><dd>${r.hotel_stars ? '★'.repeat(r.hotel_stars) : esc(t('any'))}</dd>
    ${r.budget_min || r.budget_max ? `<dt>${esc(t('budget'))}</dt><dd>${r.budget_min ? esc(money(r.budget_min)) : '—'} – ${r.budget_max ? esc(money(r.budget_max)) : '—'}</dd>` : ''}
    ${rc.length ? `<dt>${esc(t('citiesL'))}</dt><dd>${rc.map((c) => `${esc(place(c.city))}${c.nights ? ' · ' + esc(t('nights', { n: c.nights })) : ''} · 🏨 ${esc(c.hotel || t('anyHotel'))}`).join('<br>')}</dd>` : ''}
    ${r.services?.includes('hotel') && r.hotel_cancel ? `<dt>${esc(t('hcWant'))}</dt><dd>${esc(t('hc_' + r.hotel_cancel))}</dd>` : ''}
    <dt>${esc(t('traveler'))}</dt><dd>${esc(r.traveler_name || '—')}</dd>
  </dl>`;

  const hotelRow = (h, i) => `<div class="row" data-hotel style="gap:8px;align-items:flex-end;flex-wrap:wrap;background:var(--sand,#F7F3EC);padding:10px;border-radius:12px">
      ${rc.length ? `<label class="f" style="width:150px">${esc(t('hotelCity'))}<select data-h="city">${rc.map((c) => `<option value="${esc(c.city)}" ${h.city === c.city ? 'selected' : ''}>${esc(place(c.city))}</option>`).join('')}</select></label>` : ''}
      <label class="f grow" style="min-width:180px">${esc(t('hotelRow', { n: i + 1 }))}<input data-h="name" placeholder="${esc(t('hotelPh'))}" value="${esc(h.name || '')}"></label>
      <label class="f" style="width:110px">${esc(t('hotelStars'))}<select data-h="stars">${[3, 4, 5].map((n) => `<option value="${n}" ${Number(h.stars) === n ? 'selected' : ''}>${'★'.repeat(n)}</option>`).join('')}</select></label>
      <label class="f" style="width:100px">${esc(t('hotelNights'))}<input data-h="nights" type="number" min="1" max="60" value="${esc(h.nights ?? '')}" dir="ltr"></label>
      <label class="f" style="width:140px">${esc(t('nightPrice'))}<input data-h="night_price" type="number" min="0" step="0.001" value="${esc(h.night_price ?? '')}" dir="ltr"></label>
      <label class="f" style="width:170px">${esc(t('hCancel'))}<select data-h="cancel"><option value="">—</option><option value="free" ${(h.cancel || (r.hotel_cancel === 'free' ? 'free' : '')) === 'free' ? 'selected' : ''}>${esc(t('hcFree'))}</option><option value="nonref" ${(h.cancel || (r.hotel_cancel === 'nonref' ? 'nonref' : '')) === 'nonref' ? 'selected' : ''}>${esc(t('hcNonref'))}</option></select></label>
      <label class="f" style="width:160px">${esc(t('hcUntil'))}<input data-h="cancel_until" type="date" max="${esc(r.depart)}" value="${esc(h.cancel_until || '')}" dir="ltr"></label></div>`;

  const form = showForm ? `
    <form id="offer-form" data-keep class="row" style="flex-direction:column;align-items:stretch;gap:14px" novalidate>
      ${editing ? `<p class="notice info" style="margin:0">${esc(t('editOption'))}: ${esc(editing.label || t('optionN', { n: mine.indexOf(editing) + 1 }))}</p>` : ''}
      <label class="f">${esc(t('optLabel'))}<input name="label" maxlength="60" placeholder="${esc(t('optLabelPh'))}" value="${esc(base?.label || '')}"></label>
      <label class="f">${esc(t('price'))}<input name="price" type="number" min="1" step="0.001" inputmode="decimal" required value="${base ? esc(base.price) : ''}" dir="ltr"></label>
      ${r.services.includes('flights') ? `<div class="row" style="gap:12px;align-items:flex-start"><label class="f grow">${esc(t('airline'))}<input name="airline" list="airline-list" autocomplete="off" placeholder="${esc(t('airlinePh'))}" value="${esc(base?.airline || (r.airlines?.length === 1 ? airlineName(r.airlines[0]) : ''))}"></label>
        <label class="f" style="min-width:170px">${esc(t('cabinL'))}<select name="cabin">${Object.values(CABIN_KEYS).map((c) => `<option value="${c}" ${(base?.cabin || r.cabin || 'economy') === c ? 'selected' : ''}>${esc(t('cabin_' + c))}</option>`).join('')}</select></label></div>
        <datalist id="airline-list">${AIRLINES.map((a) => `<option value="${esc(state.lang === 'ar' ? a[2] : a[1])}">${esc(a[0])} · ${esc(state.lang === 'ar' ? a[1] : a[2])}</option>`).join('')}</datalist>` : ''}
      ${r.services.includes('hotel') ? `<fieldset style="border:0;padding:0;margin:0;display:flex;flex-direction:column;gap:8px"><legend style="font-size:14px;font-weight:600;color:#3C4E50;margin-bottom:6px">${esc(t('hotelsL'))}</legend>
        <div id="hotels" style="display:flex;flex-direction:column;gap:8px">${hotels.map(hotelRow).join('')}</div>
        <div class="row" style="gap:8px"><button class="btn ghost small" type="button" id="add-hotel">${esc(t('addHotel'))}</button><span class="muted" style="font-size:12px">${esc(t('hotelsHint'))}</span></div></fieldset>` : ''}
      ${r.services.includes('flights') ? `<p class="muted" style="margin:0;font-size:12px">✈️ ${esc(t('flightPolicy'))}</p>` : ''}
      <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:14px;font-weight:600;color:#3C4E50;margin-bottom:6px">${esc(t('includes'))}</legend>
        <div class="chips">${SERVICES.map((sv) => `<label class="chip ${svc.has(sv) ? 'on' : ''}"><input type="checkbox" name="inc" value="${sv}" ${svc.has(sv) ? 'checked' : ''}> ${esc(t('svc_' + sv))}</label>`).join('')}</div></fieldset>
      <label class="f">${esc(t('itinerary'))}<textarea name="itinerary" placeholder="${esc(t('itineraryPh'))}">${esc(base?.itinerary || '')}</textarea></label>
      <label class="f">${esc(t('validUntil'))}<input name="valid_until" type="datetime-local" required value="${esc(defValid)}" max="${esc(maxValid)}" dir="ltr"><span class="muted" style="font-size:12px">${esc(t('validUntilHint'))}</span></label>
      <p id="offer-err" class="notice bad" role="alert" hidden></p>
      <div class="row">
        <button class="btn accent grow" type="submit">${esc(editing ? t('updateOffer') : t('sendOffer'))}</button>
        ${editing || mine.length ? `<a class="btn ghost" href="#/request/${r.id}">${esc(t('cancelEdit'))}</a>` : ''}
      </div>
    </form>` : '';

  const optCard = (o, i) => `<div class="card" style="display:flex;flex-direction:column;gap:8px;border:1px solid var(--line,#E5E7EB);box-shadow:none">
      <div class="row between"><b>${esc(o.label || t('optionN', { n: i + 1 }))}</b><span class="badge ${o.status === 'accepted' ? 'good' : o.status === 'declined' ? '' : 'accent'}">${esc(t('st_' + o.status))}</span></div>
      <div style="font-size:20px;font-weight:800;color:var(--deep)">${esc(money(o.price))}</div>
      ${o.airline ? `<div class="muted" style="font-size:14px">✈ ${esc(o.airline)}${o.cabin ? ' · ' + esc(t('cabin_' + o.cabin)) : ''}</div>` : ''}
      ${(o.hotels?.length ? o.hotels : o.hotel ? [{ name: o.hotel, stars: o.hotel_stars }] : []).map((h) => `<div class="muted" style="font-size:14px">🏨 ${h.city ? esc(place(h.city)) + ': ' : ''}${esc(h.name)} ${h.stars ? '★'.repeat(h.stars) : ''}${h.nights ? ' · ' + esc(t('nights', { n: h.nights })) : ''}${h.night_price ? ' · ' + esc(money(h.night_price)) : ''}${h.cancel === 'free' ? ' · ✅ ' + esc(h.cancel_until ? t('hcUntil') + ' ' + h.cancel_until : t('hcFree')) : h.cancel === 'nonref' ? ' · ⛔ ' + esc(t('hcNonref')) : ''}</div>`).join('')}
      ${o.status === 'pending' ? `<div class="muted" style="font-size:13px">${esc(t('validLeft', { d: fmtDate(o.valid_until) }))}</div>` : ''}
      ${o.status === 'pending' && canOffer ? `<div class="row" style="gap:8px;flex-wrap:wrap"><a class="btn ghost small" href="#/request/${r.id}?edit=${o.id}">${esc(t('editOption'))}</a>
        <button class="btn danger small" type="button" data-wd="${o.id}">${esc(t('withdraw'))}</button></div>` : ''}</div>`;

  const optionsHtml = mine.length ? `<div style="display:flex;flex-direction:column;gap:10px">
      <div class="muted" style="font-size:14px">${esc(t('yourOptions', { n: mine.length, m: cap }))}</div>
      ${mine.map(optCard).join('')}
      ${canOffer && mine.length < cap && !showForm ? `<a class="btn ghost" href="#/request/${r.id}?new=1">${esc(t('addOption'))}</a>` : ''}
      ${canOffer && mine.some((o) => o.status === 'pending') ? `<button class="btn" type="button" id="followup">${esc(t('followup'))}</button><span class="muted" style="font-size:12px">${esc(t('followupHint'))}</span>` : ''}
    </div>` : '';
  const resultBox = r.status !== 'open' && mine.length ? `<div class="card" id="result-box"><h2 style="margin-bottom:8px">${esc(t('resultTitle'))}</h2><div id="result-body" class="muted">…</div></div>` : '';

  shell('requests', `
    <a class="back" href="#/requests">${icon.back(rtl)} ${esc(t('back'))}</a>
    <div class="top"><div><h1>${esc(place(r.destination))}</h1>
      <p class="muted" style="margin:4px 0 0">${esc(t('type_' + r.trip_type))} · ${r.status === 'open' ? esc(closesLabel(r.closes_at)) : esc(t('rfq_' + r.status))} · ${esc(t('offersN', { n: counts?.[0]?.n || 0 }))}</p></div></div>
    <div class="detail">
      <section class="col">
        <div class="card" style="display:flex;flex-direction:column;gap:14px"><h2>${esc(t('tripDetails'))}</h2>${facts}
          <div><div class="muted" style="font-size:14px;margin-bottom:6px">${esc(t('services'))}</div><div class="chips">${r.services.map((s) => `<span class="badge">${esc(t('svc_' + s))}</span>`).join('')}</div></div>
          ${r.notes ? `<div><div class="muted" style="font-size:14px;margin-bottom:6px">${esc(t('notes'))}</div><div class="notes">${esc(r.notes)}</div></div>` : ''}
        </div>
        ${resultBox}
        ${live?.status === 'accepted' ? `<div class="card" id="contact"><h2>${esc(t('contact'))}</h2><p class="notice good" style="margin:10px 0">${esc(t('bookedNotice'))}</p><div id="contact-body">…</div></div>` : ''}
      </section>
      <section class="col">
        <div class="card" style="display:flex;flex-direction:column;gap:14px"><h2>${esc(t('yourOffer'))}</h2>
          ${!canOffer && !mine.length ? `<p class="notice info">${esc(t('requestClosed'))}</p>` : ''}${optionsHtml}${form}
        </div>
        <div class="card"><h2 style="margin-bottom:10px">${esc(t('chat'))}</h2>
          ${live ? `<div class="chat" id="chat" aria-live="polite"></div>
            <form class="chat-form" id="chat-form" data-keep><label class="sr" for="chat-in">${esc(t('typeMessage'))}</label><input id="chat-in" placeholder="${esc(t('typeMessage'))}" autocomplete="off" maxlength="4000"><button class="btn" type="submit">${esc(t('send'))}</button></form>`
            : `<p class="muted">${esc(t('chatHint'))}</p>`}
        </div>
      </section>
    </div>`);

  // chip visual state
  document.querySelectorAll('.chip input').forEach((i) => i.addEventListener('change', () => {
    if (i.type === 'radio') document.querySelectorAll(`input[name="${i.name}"]`).forEach((x) => x.closest('.chip').classList.toggle('on', x.checked));
    else i.closest('.chip').classList.toggle('on', i.checked);
  }));

  const of = document.getElementById('offer-form');
  // Cabin choices follow what the typed airline usually sells.
  const alIn = of?.querySelector('[name=airline]'), cabSel = of?.querySelector('[name=cabin]');
  if (alIn && cabSel) {
    const sync = () => { const ok = airlineCabins(alIn.value.trim()); const cur = cabSel.value;
      cabSel.innerHTML = ok.map((c) => `<option value="${c}">${esc(t('cabin_' + c))}</option>`).join(''); cabSel.value = ok.includes(cur) ? cur : ok[0]; };
    alIn.addEventListener('input', sync); sync();
  }
  document.getElementById('add-hotel')?.addEventListener('click', () => {
    const box = document.getElementById('hotels');
    if (box.querySelectorAll('[data-hotel]').length >= (rc.length ? 15 : 4)) return;
    box.insertAdjacentHTML('beforeend', hotelRow({ stars: r.hotel_stars }, box.querySelectorAll('[data-hotel]').length));
  });
  if (of) of.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(of);
    const price = Number(fd.get('price'));
    const err = document.getElementById('offer-err');
    if (!price || price <= 0) { err.textContent = t('errPrice'); err.hidden = false; return; }
    const vu = new Date(String(fd.get('valid_until') || ''));
    if (Number.isNaN(vu.getTime()) || vu.getTime() < Date.now() + 3600000 || vu.getTime() > Date.parse(`${r.depart}T00:00`)) { err.textContent = t('errValidity'); err.hidden = false; return; }
    const hs = [...of.querySelectorAll('[data-hotel]')].map((row) => {
      const g = (k) => (row.querySelector(`[data-h=${k}]`)?.value || '').trim();
      return { ...(rc.length ? { city: g('city') } : {}), name: g('name'), stars: Number(g('stars')) || null, nights: Number(g('nights')) || null, night_price: g('night_price') ? Number(g('night_price')) : null, cancel: g('cancel') || null, cancel_until: g('cancel') === 'free' && g('cancel_until') ? g('cancel_until') : null };
    }).filter((h) => h.name);
    if (hs.some((h) => !h.cancel)) { err.textContent = t('errCancel'); err.hidden = false; return; }
    const row = {
      price, label: String(fd.get('label') || '').trim() || null,
      airline: String(fd.get('airline') || '') || null, cabin: fd.get('cabin') || null,
      hotels: hs, hotel: hs[0]?.name || null, hotel_stars: hs[0]?.stars || null,
      includes: fd.getAll('inc').map(String), itinerary: String(fd.get('itinerary') || '') || null,
      valid_until: vu.toISOString(),
    };
    of.querySelector('[type=submit]').disabled = true;
    const res = editing ? await sb.from('offers').update(row).eq('id', editing.id)
      : await sb.from('offers').insert({ ...row, rfq_id: r.id, agency_id: state.agency.id });
    if (res.error) {
      const m = String(res.error.message || '');
      err.textContent = m.includes('max_offers') ? t('errMaxOffers') : /validity/.test(m) ? t('errValidity') : t('errGeneric');
      err.hidden = false; of.querySelector('[type=submit]').disabled = false; return;
    }
    toast(editing ? t('offerUpdated') : t('offerSent'));
    document.activeElement?.blur();
    location.hash = `#/request/${r.id}`;
  };
  document.querySelectorAll('[data-wd]').forEach((b) => (b.onclick = async () => {
    if (!confirm(t('withdrawConfirm'))) return;
    const { error } = await sb.from('offers').update({ status: 'withdrawn' }).eq('id', b.dataset.wd);
    if (error) return toast(t('errGeneric'));
    toast(t('offerWithdrawn'));
    viewRequest(id);
  }));
  const fu = document.getElementById('followup');
  if (fu) fu.onclick = async () => {
    const target = mine.find((o) => o.status === 'pending');
    fu.disabled = true;
    const { error } = await sb.rpc('agency_request_followup', { p_offer: target.id });
    toast(error ? (String(error.message).includes('too_soon') ? t('followupSoon') : t('errGeneric')) : t('followupDone'));
    fu.disabled = false;
  };
  if (document.getElementById('result-body')) {
    const { data: res } = await sb.rpc('rfq_result', { p_rfq: r.id });
    const w = res?.[0];
    document.getElementById('result-body').innerHTML = !w ? esc(t('resultNone'))
      : w.code === state.agency.code ? `<span class="badge good">${esc(t('resultWon'))}</span>`
      : esc(t('resultOther', { c: w.code, p: money(w.price) }));
  }

  if (live) {
    currentChatOffer = live.id;
    loadChat(live.id);
    document.getElementById('chat-form').onsubmit = async (e) => {
      e.preventDefault();
      const inp = document.getElementById('chat-in');
      const body = inp.value.trim();
      if (!body) return;
      inp.value = '';
      const { error } = await sb.from('messages').insert({ offer_id: live.id, body, sender_role: 'agency' });
      if (error) { inp.value = body; return toast(t('errGeneric')); }
      loadChat(live.id);
    };
  }
  if (live?.status === 'accepted') {
    const { data: c } = await sb.rpc('booking_contact', { p_offer: live.id });
    const x = c?.[0];
    const body = document.getElementById('contact-body');
    if (body) body.innerHTML = x ? `<dl class="kv"><dt>${esc(t('name'))}</dt><dd>${esc(x.full_name || '—')}</dd>
      <dt>${esc(t('email'))}</dt><dd><a href="mailto:${esc(x.email)}" dir="ltr">${esc(x.email)}</a></dd>
      ${x.phone ? `<dt>${esc(t('phone'))}</dt><dd dir="ltr" style="text-align:start">${esc(x.phone)}</dd>` : ''}</dl>` : `<p class="muted">${esc(t('contactAfterPay'))}</p>`;
    const { data: pax } = await sb.from('booking_travelers').select('*').eq('offer_id', live.id).order('created_at');
    if (body && pax?.length) {
      body.insertAdjacentHTML('beforeend', `<h3 style="margin:14px 0 6px">${esc(t('passports'))}</h3><div class="tbl-wrap"><table><thead><tr>
        <th>${esc(t('paxName'))}</th><th>${esc(t('passportNo'))}</th><th>${esc(t('nationality'))}</th><th>${esc(t('birth'))}</th><th>${esc(t('expiry'))}</th><th></th></tr></thead><tbody>
        ${pax.map((x2) => `<tr><td dir="ltr">${esc(x2.full_name)}</td><td dir="ltr">${esc(x2.passport_no)}</td><td>${esc(x2.nationality)}</td><td dir="ltr">${esc(x2.birth_date)}</td><td dir="ltr">${esc(x2.expiry_date)}</td>
        <td><button class="btn ghost small" type="button" data-pp="${esc(x2.image_path)}">${esc(t('viewCopy'))}</button></td></tr>`).join('')}</tbody></table></div>`);
      body.querySelectorAll('[data-pp]').forEach((b2) => (b2.onclick = async () => {
        const { data: u } = await sb.storage.from('passports').createSignedUrl(b2.dataset.pp, 300);
        if (u?.signedUrl) window.open(u.signedUrl, '_blank', 'noopener');
      }));
    }
  }
}

async function loadChat(offerId) {
  const el = document.getElementById('chat');
  if (!el) return;
  const { data } = await sb.from('messages').select('*').eq('offer_id', offerId).order('created_at');
  el.innerHTML = (data || []).length
    ? data.map((m) => `<div class="msg ${m.sender_role === 'agency' ? 'me' : ''}">${esc(m.body)}<time datetime="${esc(m.created_at)}">${esc(fmtDate(m.created_at))}</time></div>`).join('')
    : `<p class="muted">${esc(t('noMessages'))}</p>`;
  el.scrollTop = el.scrollHeight;
}

async function viewOffers(onlyBooked = false) {
  let q = sb.from('offers').select('*, rfq:rfqs(id, destination, depart, ret, trip_type, status, traveler_name)').order('created_at', { ascending: false });
  if (onlyBooked) q = q.eq('status', 'accepted');
  const { data, error } = await q;
  const key = onlyBooked ? 'bookings' : 'offers';
  if (error) return shell(key, `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
  const tone = (s) => (s === 'accepted' ? 'good' : s === 'pending' ? 'accent' : '');
  const pays = {};
  if (onlyBooked) {
    const { data: p } = await sb.rpc('partner_payments');
    (p || []).forEach((r) => { if (!pays[r.offer_id] || r.status === 'paid') pays[r.offer_id] = r; });
  }
  const payCells = (o) => {
    if (!onlyBooked) return '';
    const p = pays[o.id];
    const st = p ? p.status : 'none';
    return `<td><span class="badge ${st === 'paid' ? 'good' : st === 'none' ? '' : 'accent'}">${esc(t('pay_' + st))}</span></td>
      <td>${p && p.status === 'paid' ? esc(money(p.commission)) : '—'}</td>
      <td>${p && p.status === 'paid' ? esc(money(p.partner_share)) : '—'}</td>
      <td>${o.confirmed_at ? `<span class="badge good">${esc(t('confirmedOn', { d: fmtDate(o.confirmed_at) }))}</span>` : `<button type="button" class="btn small" data-confirm="${esc(o.id)}">${esc(t('confirmBtn'))}</button>`}</td>`;
  };
  const rows = (data || []).map((o) => `<tr class="link" tabindex="0" data-href="#/request/${o.rfq_id}">
      <td><a href="#/request/${o.rfq_id}">${esc(place(o.rfq?.destination || '—'))}</a></td>
      <td dir="ltr" style="text-align:start">${esc(o.rfq?.depart || '')} → ${esc(o.rfq?.ret || '')}</td>
      <td>${esc(o.rfq?.traveler_name || '—')}</td>
      <td>${esc(money(o.price))}</td>
      <td><span class="badge ${tone(o.status)}">${esc(t('st_' + o.status))}</span></td>${payCells(o)}
      <td class="muted">${esc(fmtDate(o.created_at))}</td></tr>`).join('');
  shell(key, `
    <div class="top"><h1>${esc(onlyBooked ? t('bookingsTitle') : t('myOffersTitle'))}</h1></div>
    ${rows ? `<div class="tbl-wrap"><table>
      <thead><tr><th scope="col">${esc(t('destination'))}</th><th scope="col">${esc(t('dates'))}</th><th scope="col">${esc(t('traveler'))}</th><th scope="col">${esc(t('price'))}</th><th scope="col">${esc(t('status'))}</th>${onlyBooked ? `<th scope="col">${esc(t('payStatus'))}</th><th scope="col">${esc(t('commission'))}</th><th scope="col">${esc(t('net'))}</th><th scope="col">${esc(t('confirmCol'))}</th>` : ''}<th scope="col">${esc(t('sentAt'))}</th></tr></thead>
      <tbody>${rows}</tbody></table></div>` : `<div class="card empty">${esc(onlyBooked ? t('noBookings') : t('noOffers'))}</div>`}`);
  document.querySelectorAll('[data-confirm]').forEach((b) => { b.onclick = async (e) => {
    e.stopPropagation();
    if (!confirm(t('confirmAsk'))) return;
    b.disabled = true;
    const { error: er } = await sb.rpc('agency_confirm_booking', { p_offer: b.dataset.confirm });
    if (er) { b.disabled = false; return toast(t('errGeneric')); }
    toast(t('confirmDone')); viewOffers(true);
  }; });
  document.querySelectorAll('tr.link').forEach((tr) => {
    tr.onclick = (e) => { if (e.target.tagName !== 'A' && !e.target.closest('button')) location.hash = tr.dataset.href; };
    tr.onkeydown = (e) => { if (e.key === 'Enter') location.hash = tr.dataset.href; };
  });
}
const viewBookings = () => viewOffers(true);

// ---------------------------------------------------------------- global actions
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const act = b.dataset.act;
  if (act === 'lang') { state.lang = state.lang === 'ar' ? 'en' : 'ar'; localStorage.setItem('tp.lang', state.lang); state.session ? route() : renderLogin(); }
  if (act === 'signout') { await sb.auth.signOut(); location.hash = ''; }
  if (act === 'to-forgot') renderLogin('forgot');
  if (act === 'to-login') renderLogin('login');
  if (act === 'to-register') O.renderSignup();
});

// initial render
const { data: init } = await sb.auth.getSession();
state.session = init.session;
await loadProfile();
route();
setInterval(() => { if (!isEditing() && (location.hash === '' || location.hash.startsWith('#/requests'))) route(); }, 60000);
