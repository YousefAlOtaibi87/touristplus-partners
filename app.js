import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { install } from './extra.js?v=3';
import { installOnboarding } from './onboarding.js?v=10';
import { installTerms } from './terms.js?v=3';

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
    navRequests: 'طلبات السفر', navOffers: 'عروضي', navBookings: 'الحجوزات', signOut: 'تسجيل الخروج',
    requestsTitle: 'طلبات السفر المفتوحة', requestsSub: 'اختر طلب وقدّم عرضك للمسافر.',
    search: 'ابحث بالوجهة…', allTypes: 'كل الأنواع', sortClosing: 'الأقرب إغلاقاً', sortNewest: 'الأحدث',
    onlyNew: 'بدون عرض مني', noRequests: 'ما فيه طلبات مفتوحة حالياً. الطلبات الجديدة تطلع هنا تلقائياً.',
    closesIn: 'يغلق بعد {h} ساعة', closesInM: 'يغلق بعد {m} دقيقة', closed: 'مغلق', offersN: '{n} عروض', yourOfferSent: 'أرسلت عرض',
    budgetUpTo: 'الميزانية حتى {v}', travelers: '{a} بالغين، {c} أطفال', nights: '{n} ليالي',
    depart: 'المغادرة', ret: 'العودة', travelersL: 'المسافرين', hotelStars: 'تصنيف الفندق', budget: 'الميزانية', services: 'الخدمات المطلوبة', any: 'أي', notes: 'ملاحظات المسافر', traveler: 'المسافر',
    back: 'رجوع', tripDetails: 'تفاصيل الطلب', yourOffer: 'عرضك', sendOffer: 'أرسل العرض', updateOffer: 'حدّث العرض', withdraw: 'سحب العرض',
    withdrawConfirm: 'تبي تسحب عرضك؟', price: 'السعر الإجمالي (د.ك)', airline: 'الطيران', airlinePh: 'مثال: الخطوط الجوية الكويتية', hotel: 'الفندق', hotelPh: 'اسم الفندق',
    includes: 'الخدمات المشمولة', itinerary: 'البرنامج والتفاصيل', itineraryPh: 'اليوم ١: الوصول والتوصيل…', validFor: 'صلاحية العرض', days: '{n} أيام',
    errPrice: 'اكتب سعر صحيح.', offerSent: 'تم إرسال عرضك للمسافر.', offerUpdated: 'تم تحديث العرض.', offerWithdrawn: 'تم سحب العرض.',
    requestClosed: 'هذا الطلب ما يستقبل عروض جديدة.', chat: 'المحادثة مع المسافر', chatHint: 'المحادثة تتفعّل بعد ما ترسل عرضك.', typeMessage: 'اكتب رسالة…', send: 'إرسال', noMessages: 'ما فيه رسائل للحين.',
    myOffersTitle: 'عروضي', noOffers: 'ما أرسلت أي عرض للحين.', destination: 'الوجهة', dates: 'التواريخ', status: 'الحالة', sentAt: 'أُرسل',
    st_pending: 'بانتظار المسافر', st_accepted: 'تم الحجز', st_declined: 'لم يُختر', st_withdrawn: 'مسحوب',
    bookingsTitle: 'الحجوزات المؤكدة', noBookings: 'ما فيه حجوزات للحين.', bookedNotice: 'المسافر اختار عرضك! بيدفع من التطبيق، وأول ما يتم الدفع يطلع لك هني. تواصل معه لإرسال المستندات.',
    contactAfterPay: 'تظهر بيانات المسافر وجوازات السفر هنا فور إتمام الدفع.', passports: 'بيانات جوازات السفر', paxName: 'الاسم كما في الجواز', passportNo: 'رقم الجواز', nationality: 'الجنسية', birth: 'تاريخ الميلاد', expiry: 'انتهاء الجواز', viewCopy: 'عرض النسخة',
    payStatus: 'الدفع', commission: 'العمولة', net: 'صافي لك', pay_paid: 'مدفوع', pay_pending: 'بانتظار الدفع', pay_failed: 'لم يتم', pay_refunded: 'مسترجع', pay_none: 'لم يدفع بعد',
    contact: 'بيانات التواصل', name: 'الاسم', phone: 'الجوال', newRequest: 'وصل طلب سفر جديد', newMessage: 'رسالة جديدة من مسافر', offerAccepted: 'مسافر حجز عرضك!',
    type_leisure: 'سياحة', type_umrah: 'عمرة', type_honeymoon: 'شهر عسل', type_business: 'عمل', type_group: 'مجموعة',
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
    navRequests: 'Trip requests', navOffers: 'My offers', navBookings: 'Bookings', signOut: 'Sign out',
    requestsTitle: 'Open trip requests', requestsSub: 'Pick a request and send your offer to the traveler.',
    search: 'Search destination…', allTypes: 'All types', sortClosing: 'Closing soon', sortNewest: 'Newest',
    onlyNew: 'Not offered yet', noRequests: 'No open requests right now. New requests appear here automatically.',
    closesIn: 'Closes in {h}h', closesInM: 'Closes in {m} min', closed: 'Closed', offersN: '{n} offers', yourOfferSent: 'Offer sent',
    budgetUpTo: 'Budget up to {v}', travelers: '{a} adults, {c} children', nights: '{n} nights',
    depart: 'Departure', ret: 'Return', travelersL: 'Travelers', hotelStars: 'Hotel rating', budget: 'Budget', services: 'Requested services', any: 'Any', notes: 'Traveler notes', traveler: 'Traveler',
    back: 'Back', tripDetails: 'Request details', yourOffer: 'Your offer', sendOffer: 'Send offer', updateOffer: 'Update offer', withdraw: 'Withdraw offer',
    withdrawConfirm: 'Withdraw your offer?', price: 'Total price (KWD)', airline: 'Airline', airlinePh: 'e.g. Kuwait Airways', hotel: 'Hotel', hotelPh: 'Hotel name',
    includes: 'Included services', itinerary: 'Itinerary & details', itineraryPh: 'Day 1: arrival & transfer…', validFor: 'Valid for', days: '{n} days',
    errPrice: 'Enter a valid price.', offerSent: 'Your offer was sent to the traveler.', offerUpdated: 'Offer updated.', offerWithdrawn: 'Offer withdrawn.',
    requestClosed: 'This request is no longer accepting offers.', chat: 'Chat with traveler', chatHint: 'Chat opens after you send an offer.', typeMessage: 'Write a message…', send: 'Send', noMessages: 'No messages yet.',
    myOffersTitle: 'My offers', noOffers: 'You have not sent any offers yet.', destination: 'Destination', dates: 'Dates', status: 'Status', sentAt: 'Sent',
    st_pending: 'Awaiting traveler', st_accepted: 'Booked', st_declined: 'Not selected', st_withdrawn: 'Withdrawn',
    bookingsTitle: 'Confirmed bookings', noBookings: 'No bookings yet.', bookedNotice: 'The traveler chose your offer! They pay in the app and the payment shows here once complete. Contact them to send documents.',
    contactAfterPay: 'Traveler details and passports appear here once payment is complete.', passports: 'Passport details', paxName: 'Name as in passport', passportNo: 'Passport no.', nationality: 'Nationality', birth: 'Date of birth', expiry: 'Passport expiry', viewCopy: 'View copy',
    payStatus: 'Payment', commission: 'Commission', net: 'Your net', pay_paid: 'Paid', pay_pending: 'Awaiting payment', pay_failed: 'Failed', pay_refunded: 'Refunded', pay_none: 'Not paid yet',
    contact: 'Contact details', name: 'Name', phone: 'Mobile', newRequest: 'New trip request received', newMessage: 'New message from a traveler', offerAccepted: 'A traveler booked your offer!',
    type_leisure: 'Leisure', type_umrah: 'Umrah', type_honeymoon: 'Honeymoon', type_business: 'Business', type_group: 'Group',
    svc_flights: 'Flights', svc_hotel: 'Hotel', svc_transfers: 'Transfers', svc_tours: 'Tours', svc_visa: 'Visa', svc_insurance: 'Insurance',
    kwd: 'KWD', open: 'Open', rfq_booked: 'Booked', rfq_cancelled: 'Cancelled', rfq_closed: 'Closed',
  },
};
const PLACES = { Istanbul: 'إسطنبول', London: 'لندن', Makkah: 'مكة المكرمة', Paris: 'باريس', Bali: 'بالي', Tbilisi: 'تبليسي', Dubai: 'دبي', Baku: 'باكو', Trabzon: 'طرابزون', Cairo: 'القاهرة' };
const SERVICES = ['flights', 'hotel', 'transfers', 'tours', 'visa', 'insurance'];
const TYPES = ['leisure', 'umrah', 'honeymoon', 'business', 'group'];

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
const place = (p) => (state.lang === 'ar' ? PLACES[p] || p : p);
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
let recoveryMode = /type=(recovery|invite)/.test(location.hash);
const X = install({ sb, state, t, esc, money, place, fmtDate, shell, toast, STR, SERVICES, TYPES, route });
const TM = installTerms({ sb, state, t, esc, fmtDate, shell, toast, STR });
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
    const { data: a } = await sb.from('agencies').select('id, name, name_ar, license_no, phone, email, rating, reviews, verified, active').eq('id', p.agency_id).maybeSingle();
    state.agency = a;
  }
  if (p?.role === 'admin') { const { data: n } = await sb.rpc('admin_pending_applications'); state.pendingApps = n || 0; }
  if (p?.role === 'agency') { const { data: on } = await sb.rpc('my_packages_on'); state.packagesOn = !!on; }
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
  const h = location.hash.replace(/^#\/?/, '');
  const [view, id] = h.split('/');
  if (state.profile.role === 'admin') {
    if (view === 'partners') return X.viewPartners();
    if (view === 'allbookings') return X.viewAllBookings();
    if (view === 'apps') return O.viewApplications();
    if (view === 'terms') return TM.viewTerms();
    return X.viewOverview();
  }
  if (!state.agency || state.profile.role !== 'agency') return O.viewApplication();
  if ((view === 'packages' || view === 'package') && !state.packagesOn) return X.viewPackagesLocked();
  if (view === 'packages') return X.viewPackages();
  if (view === 'terms') return TM.viewTerms();
  if (view === 'package' && id) return X.viewPackage(id);
  if (view === 'request' && id) return viewRequest(id);
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
        ${link('terms', '#/terms', t('navTerms'))}` : `${link('requests', '#/requests', t('navRequests'), state.openCount)}
        ${link('offers', '#/offers', t('navOffers'))}
        ${link('bookings', '#/bookings', t('navBookings'))}
        ${state.packagesOn ? link('packages', '#/packages', t('navPackages')) : ''}
        ${link('terms', '#/terms', t('navTerms'))}`}
      </nav>
      <div class="side-foot">
        <span class="who">${esc(name)}</span>
        ${langToggle()}
        <button class="btn ghost small" data-act="signout" type="button">${esc(t('signOut'))}</button>
      </div>
    </aside>
    <main class="main">${inner}</main>
  </div>`;
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
    sb.from('offers').select('*').eq('rfq_id', id),
    sb.rpc('rfq_offer_counts', { p_ids: [id] }),
  ]);
  const rtl = state.lang === 'ar';
  if (!r) return shell('requests', `<a class="back" href="#/requests">${icon.back(rtl)} ${esc(t('back'))}</a><div class="card empty">—</div>`);
  const my = (offers || [])[0] || null;
  const live = my && my.status !== 'withdrawn' ? my : null;
  const canOffer = r.status === 'open' && Date.parse(r.closes_at) > Date.now();
  const editable = canOffer && (!my || my.status === 'pending' || my.status === 'withdrawn');
  const svc = new Set(live?.includes || r.services || []);
  const stars = live?.hotel_stars ?? r.hotel_stars;

  const facts = `<dl class="kv">
    <dt>${esc(t('depart'))}</dt><dd dir="ltr" style="text-align:start">${esc(r.depart)}</dd>
    <dt>${esc(t('ret'))}</dt><dd dir="ltr" style="text-align:start">${esc(r.ret)} · ${esc(t('nights', { n: nights(r.depart, r.ret) }))}</dd>
    <dt>${esc(t('travelersL'))}</dt><dd>${esc(t('travelers', { a: r.adults, c: r.children }))}</dd>
    <dt>${esc(t('hotelStars'))}</dt><dd>${r.hotel_stars ? '★'.repeat(r.hotel_stars) : esc(t('any'))}</dd>
    ${r.budget_min || r.budget_max ? `<dt>${esc(t('budget'))}</dt><dd>${r.budget_min ? esc(money(r.budget_min)) : '—'} – ${r.budget_max ? esc(money(r.budget_max)) : '—'}</dd>` : ''}
    <dt>${esc(t('traveler'))}</dt><dd>${esc(r.traveler_name || '—')}</dd>
  </dl>`;

  const form = editable ? `
    <form id="offer-form" data-keep class="row" style="flex-direction:column;align-items:stretch;gap:14px" novalidate>
      <label class="f">${esc(t('price'))}<input name="price" type="number" min="1" step="0.001" inputmode="decimal" required value="${live ? esc(live.price) : ''}" dir="ltr"></label>
      ${r.services.includes('flights') ? `<label class="f">${esc(t('airline'))}<input name="airline" placeholder="${esc(t('airlinePh'))}" value="${esc(live?.airline || '')}"></label>` : ''}
      ${r.services.includes('hotel') ? `<label class="f">${esc(t('hotel'))}<input name="hotel" placeholder="${esc(t('hotelPh'))}" value="${esc(live?.hotel || '')}"></label>
        <fieldset style="border:0;padding:0;margin:0"><legend class="f" style="font-size:14px;font-weight:600;color:#3C4E50;margin-bottom:6px">${esc(t('hotelStars'))}</legend>
        <div class="chips">${[3, 4, 5].map((n) => `<label class="chip ${stars === n ? 'on' : ''}"><input type="radio" name="stars" value="${n}" ${stars === n ? 'checked' : ''}> ${'★'.repeat(n)}</label>`).join('')}</div></fieldset>` : ''}
      <fieldset style="border:0;padding:0;margin:0"><legend style="font-size:14px;font-weight:600;color:#3C4E50;margin-bottom:6px">${esc(t('includes'))}</legend>
        <div class="chips">${SERVICES.map((s) => `<label class="chip ${svc.has(s) ? 'on' : ''}"><input type="checkbox" name="inc" value="${s}" ${svc.has(s) ? 'checked' : ''}> ${esc(t('svc_' + s))}</label>`).join('')}</div></fieldset>
      <label class="f">${esc(t('itinerary'))}<textarea name="itinerary" placeholder="${esc(t('itineraryPh'))}">${esc(live?.itinerary || '')}</textarea></label>
      <label class="f">${esc(t('validFor'))}<select name="valid">${[1, 3, 7].map((n) => `<option value="${n}" ${n === 3 ? 'selected' : ''}>${esc(t('days', { n }))}</option>`).join('')}</select></label>
      <p id="offer-err" class="notice bad" role="alert" hidden></p>
      <div class="row">
        <button class="btn accent grow" type="submit">${esc(live ? t('updateOffer') : t('sendOffer'))}</button>
        ${live ? `<button class="btn danger" type="button" id="withdraw">${esc(t('withdraw'))}</button>` : ''}
      </div>
    </form>` : '';

  const offerView = live && !editable ? `<dl class="kv">
      <dt>${esc(t('price'))}</dt><dd>${esc(money(live.price))}</dd>
      ${live.airline ? `<dt>${esc(t('airline'))}</dt><dd>${esc(live.airline)}</dd>` : ''}
      ${live.hotel ? `<dt>${esc(t('hotel'))}</dt><dd>${esc(live.hotel)} ${live.hotel_stars ? '★'.repeat(live.hotel_stars) : ''}</dd>` : ''}
      <dt>${esc(t('status'))}</dt><dd><span class="badge ${live.status === 'accepted' ? 'good' : ''}">${esc(t('st_' + live.status))}</span></dd>
    </dl>${live.itinerary ? `<div class="notes">${esc(live.itinerary)}</div>` : ''}` : '';

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
        ${live?.status === 'accepted' ? `<div class="card" id="contact"><h2>${esc(t('contact'))}</h2><p class="notice good" style="margin:10px 0">${esc(t('bookedNotice'))}</p><div id="contact-body">…</div></div>` : ''}
      </section>
      <section class="col">
        <div class="card" style="display:flex;flex-direction:column;gap:14px"><h2>${esc(t('yourOffer'))}</h2>
          ${!canOffer && !live ? `<p class="notice info">${esc(t('requestClosed'))}</p>` : ''}${form}${offerView}
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
  if (of) of.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(of);
    const price = Number(fd.get('price'));
    const err = document.getElementById('offer-err');
    if (!price || price <= 0) { err.textContent = t('errPrice'); err.hidden = false; return; }
    const row = {
      price, airline: String(fd.get('airline') || '') || null, hotel: String(fd.get('hotel') || '') || null,
      hotel_stars: fd.get('stars') ? Number(fd.get('stars')) : null, includes: fd.getAll('inc').map(String),
      itinerary: String(fd.get('itinerary') || '') || null,
      valid_until: new Date(Date.now() + Number(fd.get('valid') || 3) * 86400000).toISOString(),
    };
    of.querySelector('[type=submit]').disabled = true;
    let res;
    if (my) res = await sb.from('offers').update({ ...row, status: 'pending' }).eq('id', my.id);
    else res = await sb.from('offers').insert({ ...row, rfq_id: r.id, agency_id: state.agency.id });
    if (res.error) { err.textContent = t('errGeneric'); err.hidden = false; of.querySelector('[type=submit]').disabled = false; return; }
    toast(my ? t('offerUpdated') : t('offerSent'));
    document.activeElement?.blur();
    viewRequest(id);
  };
  const wd = document.getElementById('withdraw');
  if (wd) wd.onclick = async () => {
    if (!confirm(t('withdrawConfirm'))) return;
    const { error } = await sb.from('offers').update({ status: 'withdrawn' }).eq('id', my.id);
    if (error) return toast(t('errGeneric'));
    toast(t('offerWithdrawn'));
    viewRequest(id);
  };

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
      <td>${p && p.status === 'paid' ? esc(money(p.partner_share)) : '—'}</td>`;
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
      <thead><tr><th scope="col">${esc(t('destination'))}</th><th scope="col">${esc(t('dates'))}</th><th scope="col">${esc(t('traveler'))}</th><th scope="col">${esc(t('price'))}</th><th scope="col">${esc(t('status'))}</th>${onlyBooked ? `<th scope="col">${esc(t('payStatus'))}</th><th scope="col">${esc(t('commission'))}</th><th scope="col">${esc(t('net'))}</th>` : ''}<th scope="col">${esc(t('sentAt'))}</th></tr></thead>
      <tbody>${rows}</tbody></table></div>` : `<div class="card empty">${esc(onlyBooked ? t('noBookings') : t('noOffers'))}</div>`}`);
  document.querySelectorAll('tr.link').forEach((tr) => {
    tr.onclick = (e) => { if (e.target.tagName !== 'A') location.hash = tr.dataset.href; };
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
