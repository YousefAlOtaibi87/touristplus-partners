// Admin: events, festivals and new openings per destination and month, shown in the app's Destinations tab.
// They change every season, so they live in the database and are edited here without an app release.
export function installEvents(ctx) {
  const { sb, t, esc, shell, toast, place, STR } = ctx;
  Object.assign(STR.ar, {
    navEvents: 'فعاليات الوجهات', evTitle: 'فعاليات الوجهات',
    evSub: 'المهرجانات والمناسبات والأماكن الجديدة لكل وجهة وشهر. تظهر للمسافر في قسم «الوجهات» مباشرة، وما تحتاج تحديث للتطبيق. راجعها كل فترة.',
    evCity: 'الوجهة (الاسم الإنجليزي كما في التطبيق)', evMonth: 'الشهر', evKind: 'النوع', evTitleAr: 'العنوان بالعربي', evTitleEn: 'العنوان بالإنجليزي',
    evNoteAr: 'ملاحظة بالعربي (اختياري)', evNoteEn: 'ملاحظة بالإنجليزي (اختياري)', evStarts: 'من تاريخ (اختياري)', evEnds: 'إلى تاريخ (اختياري، تختفي بعده)',
    evSource: 'رابط المصدر (اختياري)', evImg: 'رابط الصورة (اختياري، https)', evImgCredit: 'حقوق الصورة (المصوّر · الرخصة)', evImgCreditUrl: 'رابط صفحة الصورة', evAdd: 'إضافة فعالية', evSave: 'حفظ', evHide: 'إخفاء', evShow: 'إظهار', evDelete: 'حذف',
    evDeleteConfirm: 'حذف هذه الفعالية نهائياً؟', evSaved: 'تم الحفظ', evAll: 'كل الوجهات', evAllMonths: 'كل الشهور', evNone: 'ما في فعاليات بهذا الفلتر.',
    evHidden: 'مخفية', evReviewed: 'آخر مراجعة', evMarkReviewed: 'تمت المراجعة', evOld: 'تحتاج مراجعة',
    k_event: 'فعالية', k_festival: 'مهرجان', k_opening: 'افتتاح جديد', k_holiday: 'مناسبة', k_season: 'موسم',
  });
  Object.assign(STR.en, {
    navEvents: 'Destination events', evTitle: 'Destination events',
    evSub: 'Festivals, holidays and new openings per destination and month. They show in the app\'s Destinations tab right away, with no app update. Review them regularly.',
    evCity: 'Destination (English name as in the app)', evMonth: 'Month', evKind: 'Type', evTitleAr: 'Title (Arabic)', evTitleEn: 'Title (English)',
    evNoteAr: 'Note (Arabic, optional)', evNoteEn: 'Note (English, optional)', evStarts: 'From (optional)', evEnds: 'Until (optional, hidden after)',
    evSource: 'Source link (optional)', evImg: 'Image link (optional, https)', evImgCredit: 'Image credit (author · licence)', evImgCreditUrl: 'Image page link', evAdd: 'Add event', evSave: 'Save', evHide: 'Hide', evShow: 'Show', evDelete: 'Delete',
    evDeleteConfirm: 'Delete this event for good?', evSaved: 'Saved', evAll: 'All destinations', evAllMonths: 'All months', evNone: 'No events for this filter.',
    evHidden: 'Hidden', evReviewed: 'Last reviewed', evMarkReviewed: 'Mark reviewed', evOld: 'Needs review',
    k_event: 'Event', k_festival: 'Festival', k_opening: 'New opening', k_holiday: 'Holiday', k_season: 'Season',
  });
  const isAr = () => document.documentElement.lang === 'ar';
  const KINDS = ['event', 'festival', 'opening', 'holiday', 'season'];
  const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthName = (m) => new Date(2026, m - 1, 1).toLocaleString(document.documentElement.lang === 'ar' ? 'ar-KW-u-nu-latn' : 'en-GB', { month: 'long' });
  const fields = (e = {}) => `
    <label class="f">${esc(t('evCity'))}<input name="city" required value="${esc(e.city || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evMonth'))}<select name="month">${MONTHS.map((m) => `<option value="${m}" ${e.month === m ? 'selected' : ''}>${esc(monthName(m))}</option>`).join('')}</select></label>
    <label class="f">${esc(t('evKind'))}<select name="kind">${KINDS.map((k) => `<option value="${k}" ${e.kind === k ? 'selected' : ''}>${esc(t('k_' + k))}</option>`).join('')}</select></label>
    <label class="f">${esc(t('evTitleAr'))}<input name="title_ar" required value="${esc(e.title_ar || '')}"></label>
    <label class="f">${esc(t('evTitleEn'))}<input name="title_en" required value="${esc(e.title_en || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evNoteAr'))}<input name="note_ar" value="${esc(e.note_ar || '')}"></label>
    <label class="f">${esc(t('evNoteEn'))}<input name="note_en" value="${esc(e.note_en || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evStarts'))}<input name="starts_on" type="date" value="${esc(e.starts_on || '')}"></label>
    <label class="f">${esc(t('evEnds'))}<input name="ends_on" type="date" value="${esc(e.ends_on || '')}"></label>
    <label class="f">${esc(t('evSource'))}<input name="source_url" type="url" placeholder="https://" value="${esc(e.source_url || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evImg'))}<input name="image_url" type="url" placeholder="https://" value="${esc(e.image_url || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evImgCredit'))}<input name="image_credit" maxlength="160" value="${esc(e.image_credit || '')}" dir="ltr"></label>
    <label class="f">${esc(t('evImgCreditUrl'))}<input name="image_credit_url" type="url" placeholder="https://" value="${esc(e.image_credit_url || '')}" dir="ltr"></label>`;
  const read = (form) => {
    const f = Object.fromEntries(new FormData(form));
    const v = (k) => (String(f[k] || '').trim() || null);
    return { city: v('city'), month: Number(f.month), kind: f.kind, title_ar: v('title_ar'), title_en: v('title_en'), note_ar: v('note_ar'), note_en: v('note_en'),
      starts_on: v('starts_on'), ends_on: v('ends_on'), recurring: !v('starts_on'), source_url: v('source_url'), image_url: v('image_url'), image_credit: v('image_credit'), image_credit_url: v('image_credit_url'), updated_at: new Date().toISOString(), reviewed_at: new Date().toISOString() };
  };

  async function viewEvents(filter = { city: '', month: 0 }) {
    let q = sb.from('destination_events').select('*').order('city').order('month').limit(500);
    if (filter.city) q = q.eq('city', filter.city);
    if (filter.month) q = q.eq('month', filter.month);
    const { data, error } = await q;
    if (error) { shell('events', `<div class="top"><div><h1>${esc(t('evTitle'))}</h1></div></div><p class="notice bad">${esc(t('errGeneric'))}</p>`); return; }
    const list = data || [];
    const cities = [...new Set(list.map((e) => e.city).concat(filter.city ? [filter.city] : []))].sort();
    const stale = (e) => !e.reviewed_at || Date.now() - new Date(e.reviewed_at).getTime() > 180 * 864e5;
    const row = (e) => `<div class="card" style="margin-bottom:10px;${e.active ? '' : 'opacity:.6'}" data-id="${esc(e.id)}">
      <div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div><b>${esc(isAr() ? e.title_ar : e.title_en)}</b> <span class="muted" style="font-size:12px">· ${esc(isAr() ? e.title_en : e.title_ar)}</span><div class="muted" style="font-size:12px;margin-top:4px">${esc(place(e.city))} · ${esc(monthName(e.month))} · ${esc(t('k_' + e.kind))}${e.ends_on ? ` · ← ${esc(e.ends_on)}` : ''}${e.active ? '' : ` · ${esc(t('evHidden'))}`}</div>
        ${e.image_url && /^https:\/\//.test(e.image_url) ? `<img src="${esc(e.image_url)}" alt="" loading="lazy" style="width:96px;height:64px;object-fit:cover;border-radius:8px;margin-top:6px">` : ''}
        ${(isAr() ? e.note_ar : e.note_en || e.note_ar) ? `<div style="font-size:13px;margin-top:4px">${esc(isAr() ? e.note_ar : e.note_en || e.note_ar)}</div>` : ''}</div>
        <div class="row" style="gap:6px;flex-wrap:wrap;align-items:center">${stale(e) ? `<span class="badge">${esc(t('evOld'))}</span>` : ''}
          <button class="btn ghost small" type="button" data-rev="${esc(e.id)}">${esc(t('evMarkReviewed'))}</button>
          <button class="btn ghost small" type="button" data-edit="${esc(e.id)}">${esc(t('hdEdit') || 'Edit')}</button>
          <button class="btn ghost small" type="button" data-tog="${esc(e.id)}">${esc(t(e.active ? 'evHide' : 'evShow'))}</button>
          <button class="btn ghost small" type="button" data-del="${esc(e.id)}">${esc(t('evDelete'))}</button></div>
      </div>
      <form data-form="${esc(e.id)}" style="display:none;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-top:10px">${fields(e)}
        <div class="row" style="align-items:flex-end"><button class="btn small" type="submit">${esc(t('evSave'))}</button></div></form>
    </div>`;
    shell('events', `<div class="top"><div><h1>${esc(t('evTitle'))}</h1><p class="muted" style="margin:4px 0 0;max-width:70ch">${esc(t('evSub'))}</p></div></div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:12px">
        <select id="ev-city" style="max-width:220px"><option value="">${esc(t('evAll'))}</option>${cities.map((c) => `<option value="${esc(c)}" ${filter.city === c ? 'selected' : ''}>${esc(place(c))}</option>`).join('')}</select>
        <select id="ev-month" style="max-width:180px"><option value="0">${esc(t('evAllMonths'))}</option>${MONTHS.map((m) => `<option value="${m}" ${filter.month === m ? 'selected' : ''}>${esc(monthName(m))}</option>`).join('')}</select>
      </div>
      <details class="card" style="margin-bottom:12px"><summary style="cursor:pointer;font-weight:700">${esc(t('evAdd'))}</summary>
        <form id="ev-new" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-top:10px">${fields({ city: filter.city, month: filter.month || new Date().getMonth() + 1 })}
          <div class="row" style="align-items:flex-end"><button class="btn small" type="submit">${esc(t('evAdd'))}</button></div></form></details>
      ${list.length ? list.map(row).join('') : `<p class="muted">${esc(t('evNone'))}</p>`}`);
    const again = () => viewEvents(filter);
    document.getElementById('ev-city').onchange = (e) => viewEvents({ ...filter, city: e.target.value });
    document.getElementById('ev-month').onchange = (e) => viewEvents({ ...filter, month: Number(e.target.value) });
    document.getElementById('ev-new').onsubmit = async (e) => {
      e.preventDefault();
      const { error: er } = await sb.from('destination_events').insert(read(e.target));
      if (er) return toast(t('errGeneric')); toast(t('evSaved')); again();
    };
    document.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => { const f = document.querySelector(`[data-form="${b.dataset.edit}"]`); f.style.display = f.style.display === 'none' ? 'grid' : 'none'; }));
    document.querySelectorAll('[data-form]').forEach((f) => (f.onsubmit = async (e) => {
      e.preventDefault();
      const { error: er } = await sb.from('destination_events').update(read(f)).eq('id', f.dataset.form);
      if (er) return toast(t('errGeneric')); toast(t('evSaved')); again();
    }));
    document.querySelectorAll('[data-rev]').forEach((b) => (b.onclick = async () => {
      const { error: er } = await sb.from('destination_events').update({ reviewed_at: new Date().toISOString() }).eq('id', b.dataset.rev);
      if (er) return toast(t('errGeneric')); toast(t('evSaved')); again();
    }));
    document.querySelectorAll('[data-tog]').forEach((b) => (b.onclick = async () => {
      const e = list.find((x) => x.id === b.dataset.tog);
      const { error: er } = await sb.from('destination_events').update({ active: !e.active }).eq('id', e.id);
      if (er) return toast(t('errGeneric')); again();
    }));
    document.querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
      if (!confirm(t('evDeleteConfirm'))) return;
      const { error: er } = await sb.from('destination_events').delete().eq('id', b.dataset.del);
      if (er) return toast(t('errGeneric')); again();
    }));
  }
  return { viewEvents };
}
