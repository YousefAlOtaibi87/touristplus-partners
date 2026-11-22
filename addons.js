// Admin: add-on services (match tickets, cars, cruises, Disney, ski). Each is linked to the platform's own account
// with the provider, and stays "coming soon" in the app until the owner gets approval, pastes the link and turns it on.
export function installAddons(ctx) {
  const { sb, t, esc, shell, toast, STR } = ctx;
  Object.assign(STR.ar, {
    navAddons: 'الخدمات الإضافية', adTitle: 'الخدمات الإضافية',
    adSub: 'تذاكر المباريات والسيارات والكروز وديزني والتزلج، مربوطة مباشرة بحساب المنصة عند كل مزوّد. كل خدمة تطلع للمسافر «قريباً» إلى أن تحصل الموافقة وتلصق رابط العمولة وتفعّلها.',
    adProvider: 'المزوّد', adLink: 'رابط العمولة (https)', adLinkHint: 'اكتب {sub} مكان رمز التتبع، وينحط بداله رمز خاص لكل مسافر عشان تعرف مين حجز.',
    adStatus: 'حالة الطلب', st_pending: 'ما قدّمنا', st_applied: 'قدّمنا ننتظر الرد', st_approved: 'تمت الموافقة', st_rejected: 'مرفوض',
    adNote: 'ملاحظاتك (لك بس)', adActive: 'مفعّلة في التطبيق والموقع', adSave: 'حفظ', adSaved: 'تم الحفظ',
    adLinkRequired: 'ما تقدر تفعّل الخدمة بدون رابط العمولة.', adClicks: 'ضغطات المسافرين', adClicks30: 'آخر 30 يوم',
    adLive: 'مفعّلة', adSoon: 'قريباً',
  });
  Object.assign(STR.en, {
    navAddons: 'Add-on services', adTitle: 'Add-on services',
    adSub: 'Match tickets, cars, cruises, Disney and ski, linked straight to the platform’s own account with each provider. Each shows as “coming soon” to travelers until you get approval, paste the affiliate link and turn it on.',
    adProvider: 'Provider', adLink: 'Affiliate link (https)', adLinkHint: 'Write {sub} where the tracking id goes; each traveler gets their own id so you know who booked.',
    adStatus: 'Application', st_pending: 'Not applied', st_applied: 'Applied, waiting', st_approved: 'Approved', st_rejected: 'Rejected',
    adNote: 'Your notes (private)', adActive: 'Live in the app and website', adSave: 'Save', adSaved: 'Saved',
    adLinkRequired: 'Add the affiliate link before turning the service on.', adClicks: 'Traveler taps', adClicks30: 'last 30 days',
    adLive: 'Live', adSoon: 'Coming soon',
  });
  const ST = ['pending', 'applied', 'approved', 'rejected'];
  const isAr = () => document.documentElement.lang === 'ar';

  async function viewAddons() {
    const { data, error } = await sb.rpc('admin_addons');
    const list = data || [];
    shell('addons', `<div class="top"><div><h1>${esc(t('adTitle'))}</h1><p class="muted" style="margin:4px 0 0;max-width:75ch">${esc(t('adSub'))}</p></div></div>
      ${error ? `<p class="notice bad">${esc(t('errGeneric'))}</p>` : ''}
      <div class="ad-grid">${list.map((s) => `<form class="card ad-card" data-key="${esc(s.key)}" novalidate>
        <div class="row between" style="gap:8px;flex-wrap:wrap"><h2 style="margin:0;font-size:18px">${esc(isAr() ? s.name_ar : s.name_en)}</h2>
          <span class="badge ${s.active ? 'good' : ''}">${esc(t(s.active ? 'adLive' : 'adSoon'))}</span></div>
        <div class="ad-stats"><span><b dir="ltr">${Number(s.clicks || 0)}</b> ${esc(t('adClicks'))}</span><span class="muted"><b dir="ltr">${Number(s.clicks_30 || 0)}</b> ${esc(t('adClicks30'))}</span></div>
        <label class="f">${esc(t('adProvider'))}<input name="provider" maxlength="120" dir="auto" value="${esc(s.provider || '')}"></label>
        <label class="f">${esc(t('adLink'))}<input name="link" dir="ltr" maxlength="600" placeholder="https://…?subid={sub}" value="${esc(s.link || '')}"><small class="muted">${esc(t('adLinkHint'))}</small></label>
        <label class="f">${esc(t('adStatus'))}<select name="status">${ST.map((x) => `<option value="${x}" ${s.status === x ? 'selected' : ''}>${esc(t('st_' + x))}</option>`).join('')}</select></label>
        <label class="f">${esc(t('adNote'))}<textarea name="note" rows="2" maxlength="1000" dir="auto">${esc(s.admin_note || '')}</textarea></label>
        <label class="ad-switch"><input type="checkbox" name="active" ${s.active ? 'checked' : ''}> ${esc(t('adActive'))}</label>
        <div><button class="btn small" type="submit">${esc(t('adSave'))}</button></div></form>`).join('')}</div>`);
    document.querySelectorAll('.ad-card').forEach((f) => (f.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(f), active = f.querySelector('[name=active]').checked, link = String(fd.get('link') || '').trim();
      if (active && !link) return toast(t('adLinkRequired'));
      const btn = f.querySelector('button'); btn.disabled = true;
      const { error: er } = await sb.rpc('admin_addon_save', { p_key: f.dataset.key, p_provider: String(fd.get('provider') || ''), p_link: link, p_status: fd.get('status'), p_note: String(fd.get('note') || ''), p_active: active });
      btn.disabled = false;
      if (er) return toast(/link_required/.test(er.message) ? t('adLinkRequired') : /check/.test(er.message) ? t('adLink') + ' https://' : t('errGeneric'));
      toast(t('adSaved')); viewAddons();
    }));
  }
  return { viewAddons };
}
