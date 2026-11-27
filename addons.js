// Admin: add-on services (match tickets, cars, cruises, Disney, ski, restaurants). Each service lists its companies, one
// box per company with its own status, commission, currency, payout, account, link and on/off switch. The service shows
// in the app as soon as any of its companies is switched on (the database keeps the service row in step).
export function installAddons(ctx) {
  const { sb, t, esc, shell, toast, STR } = ctx;
  Object.assign(STR.ar, {
    navAddons: 'الخدمات الإضافية', adTitle: 'الخدمات الإضافية',
    adSub: 'كل خدمة فيها الشركات اللي نتعامل معها، ولكل شركة خانة لحالها: حالة الطلب والعمولة والعملة ومدة الصرف وحسابنا عندها. الخدمة تطلع للمسافر «قريباً» إلى أن تفعّل شركة وحدة فيها على الأقل.',
    adName: 'اسم الشركة', adOffers: 'وش تقدّم', adCommission: 'العمولة', adCurrency: 'العملة', adPayout: 'مدة صرف الأرباح',
    adAccount: 'حسابنا عندهم', adLink: 'رابط العمولة (https)', adLinkHint: 'اكتب {sub} مكان رمز التتبع، وينحط بداله رمز خاص لكل مسافر عشان تعرف مين حجز.',
    adStatus: 'حالة الطلب', st_pending: 'ما قدّمنا', st_applied: 'قدّمنا ننتظر الرد', st_approved: 'تمت الموافقة', st_rejected: 'مرفوض', st_cancelled: 'ملغاة',
    adNote: 'ملاحظاتك (لك بس)', adActive: 'مفعّلة في التطبيق', adSave: 'حفظ', adSaved: 'تم الحفظ',
    adLinkRequired: 'ما تقدر تفعّل الشركة بدون رابط العمولة.', adNameRequired: 'اكتب اسم الشركة.', adClicks: 'ضغطات المسافرين', adClicks30: 'آخر 30 يوم',
    adLive: 'مفعّلة', adSoon: 'قريباً', adAdd: '+ إضافة شركة', adNew: 'شركة جديدة', adCancel: 'إلغاء', adNone: 'ما في شركات للحين.',
    adShowClosed: 'إظهار الشركات المرفوضة والملغاة',
  });
  Object.assign(STR.en, {
    navAddons: 'Add-on services', adTitle: 'Add-on services',
    adSub: 'Each service lists the companies we work with, one box per company: application status, commission, currency, payout time and our account with them. A service shows as “coming soon” to travelers until at least one of its companies is switched on.',
    adName: 'Company', adOffers: 'What they offer', adCommission: 'Commission', adCurrency: 'Currency', adPayout: 'Payout time',
    adAccount: 'Our account with them', adLink: 'Affiliate link (https)', adLinkHint: 'Write {sub} where the tracking id goes; each traveler gets their own id so you know who booked.',
    adStatus: 'Application', st_pending: 'Not applied', st_applied: 'Applied, waiting', st_approved: 'Approved', st_rejected: 'Rejected', st_cancelled: 'Cancelled',
    adNote: 'Your notes (private)', adActive: 'Live in the app', adSave: 'Save', adSaved: 'Saved',
    adLinkRequired: 'Add the affiliate link before switching the company on.', adNameRequired: 'Write the company name.', adClicks: 'Traveler taps', adClicks30: 'last 30 days',
    adLive: 'Live', adSoon: 'Coming soon', adAdd: '+ Add company', adNew: 'New company', adCancel: 'Cancel', adNone: 'No companies yet.',
    adShowClosed: 'Show rejected and cancelled companies',
  });
  const ST = ['pending', 'applied', 'approved', 'rejected', 'cancelled'];
  const TONE = { approved: 'good', rejected: 'bad', cancelled: 'bad', applied: 'accent', pending: '' };
  const isAr = () => document.documentElement.lang === 'ar';
  let showClosed = false;

  const providerForm = (p, service) => `<form class="ad-prov${p.active ? ' live' : ''}" data-id="${esc(p.id || '')}" data-service="${esc(service)}" novalidate>
    <div class="row between" style="gap:8px;flex-wrap:wrap"><b style="font-size:16px">${esc(p.name || t('adNew'))}</b>
      <span class="badge ${p.active ? 'good' : TONE[p.status] || ''}">${esc(p.active ? t('adLive') : t('st_' + (p.status || 'pending')))}</span></div>
    <label class="f">${esc(t('adName'))}<input name="name" maxlength="120" dir="auto" value="${esc(p.name || '')}" required></label>
    <label class="f">${esc(t('adOffers'))}<input name="offers" maxlength="200" dir="auto" value="${esc(p.offers || '')}"></label>
    <label class="f">${esc(t('adStatus'))}<select name="status">${ST.map((x) => `<option value="${x}" ${(p.status || 'pending') === x ? 'selected' : ''}>${esc(t('st_' + x))}</option>`).join('')}</select></label>
    <div class="ad-3">
      <label class="f">${esc(t('adCommission'))}<input name="commission" maxlength="60" dir="auto" value="${esc(p.commission || '')}"></label>
      <label class="f">${esc(t('adCurrency'))}<input name="currency" maxlength="20" dir="ltr" value="${esc(p.currency || '')}"></label>
      <label class="f">${esc(t('adPayout'))}<input name="payout" maxlength="80" dir="auto" value="${esc(p.payout || '')}"></label>
    </div>
    <label class="f">${esc(t('adAccount'))}<input name="account_ref" maxlength="120" dir="ltr" value="${esc(p.account_ref || '')}"></label>
    <label class="f">${esc(t('adLink'))}<input name="link" dir="ltr" maxlength="600" placeholder="https://…?subid={sub}" value="${esc(p.link || '')}"><small class="muted">${esc(t('adLinkHint'))}</small></label>
    <label class="f">${esc(t('adNote'))}<textarea name="note" rows="2" maxlength="1000" dir="auto">${esc(p.admin_note || '')}</textarea></label>
    <label class="ad-switch"><input type="checkbox" name="active" ${p.active ? 'checked' : ''}> ${esc(t('adActive'))}</label>
    <div class="row" style="gap:8px"><button class="btn small" type="submit">${esc(t('adSave'))}</button>${p.id ? '' : `<button class="btn small ghost" type="button" data-cancel>${esc(t('adCancel'))}</button>`}</div>
  </form>`;

  async function viewAddons() {
    const [svc, prov] = await Promise.all([sb.rpc('admin_addons'), sb.rpc('admin_addon_providers')]);
    const list = svc.data || [], all = prov.data || [];
    const closed = (p) => p.status === 'rejected' || p.status === 'cancelled';
    shell('addons', `<div class="top"><div><h1>${esc(t('adTitle'))}</h1><p class="muted" style="margin:4px 0 0;max-width:75ch">${esc(t('adSub'))}</p></div></div>
      ${svc.error || prov.error ? `<p class="notice bad">${esc(t('errGeneric'))}</p>` : ''}
      <label class="ad-switch" style="margin:0 0 12px"><input type="checkbox" id="adClosed" ${showClosed ? 'checked' : ''}> ${esc(t('adShowClosed'))}</label>
      <div class="ad-list">${list.map((s) => {
        const ps = all.filter((p) => p.service === s.key && (showClosed || !closed(p)));
        return `<section class="card ad-card" data-key="${esc(s.key)}">
          <div class="row between" style="gap:8px;flex-wrap:wrap"><h2 style="margin:0;font-size:18px">${esc(isAr() ? s.name_ar : s.name_en)}</h2>
            <span class="badge ${s.active ? 'good' : ''}">${esc(t(s.active ? 'adLive' : 'adSoon'))}</span></div>
          <div class="ad-stats"><span><b dir="ltr">${Number(s.clicks || 0)}</b> ${esc(t('adClicks'))}</span><span class="muted"><b dir="ltr">${Number(s.clicks_30 || 0)}</b> ${esc(t('adClicks30'))}</span></div>
          <div class="ad-provs">${ps.length ? ps.map((p) => providerForm(p, s.key)).join('') : `<p class="muted">${esc(t('adNone'))}</p>`}</div>
          <div><button class="btn small ghost" type="button" data-add="${esc(s.key)}">${esc(t('adAdd'))}</button></div>
        </section>`;
      }).join('')}</div>`);
    document.getElementById('adClosed').onchange = (e) => { showClosed = e.target.checked; viewAddons(); };
    document.querySelectorAll('[data-add]').forEach((b) => (b.onclick = () => {
      const box = b.closest('.ad-card').querySelector('.ad-provs');
      if (box.querySelector('form[data-id=""]')) return;
      box.insertAdjacentHTML('beforeend', providerForm({}, b.dataset.add));
      bind(box.lastElementChild);
      box.lastElementChild.querySelector('[name=name]').focus();
    }));
    document.querySelectorAll('.ad-prov').forEach(bind);
  }

  function bind(f) {
    const c = f.querySelector('[data-cancel]');
    if (c) c.onclick = () => f.remove();
    f.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(f), v = (k) => String(fd.get(k) || '').trim();
      const active = f.querySelector('[name=active]').checked;
      if (!v('name')) return toast(t('adNameRequired'));
      if (active && !v('link')) return toast(t('adLinkRequired'));
      const btn = f.querySelector('button[type=submit]'); btn.disabled = true;
      const { error } = await sb.rpc('admin_addon_provider_save', {
        p_id: f.dataset.id || null, p_service: f.dataset.service, p_name: v('name'), p_offers: v('offers'), p_status: v('status'),
        p_commission: v('commission'), p_currency: v('currency'), p_payout: v('payout'), p_account_ref: v('account_ref'),
        p_link: v('link'), p_note: String(fd.get('note') || ''), p_active: active,
      });
      btn.disabled = false;
      if (error) return toast(/link_required/.test(error.message) ? t('adLinkRequired') : /check/.test(error.message) ? t('adLink') + ' https://' : t('errGeneric'));
      toast(t('adSaved')); viewAddons();
    };
  }
  return { viewAddons };
}
