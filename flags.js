// Admin: traveler abuse alerts (request limits hit, contact details shared, attempts while suspended)
// and manual suspension. Alerts are written by database triggers; this page only reads and resolves them.
export function installFlags(ctx) {
  const { sb, state, t, esc, shell, toast, fmtDate, STR } = ctx;
  Object.assign(STR.ar, {
    navFlags: 'تنبيهات المسافرين', flTitle: 'تنبيهات المسافرين',
    flSub: 'أي محاولة تلاعب من مسافر تظهر هني. تواصل معه، وإذا لزم أوقف حسابه يدوياً. الحساب الموقوف ما يقدر يرسل طلبات رحلات جديدة ولا رسائل في المحادثة.',
    flBanner: 'عندك {n} تنبيه تلاعب من مسافرين يحتاج مراجعة', flOpen: 'افتح التنبيهات',
    flShowAll: 'عرض المعالجة أيضاً', flNone: 'ما في تنبيهات مفتوحة 👍',
    flCols: ['المسافر', 'التواصل', 'نوع التنبيه', 'التفاصيل', 'عدد المحاولات', 'أول / آخر محاولة', 'الطلبات', 'الحالة', ''],
    fk_rfq_limit_open: 'تجاوز حد الطلبات المفتوحة (٥)', fk_rfq_limit_daily: 'تجاوز حد الطلبات اليومي (١٠)',
    fk_contact_share: 'حاول يشارك وسيلة تواصل', fk_suspended_attempt: 'حاول يطلب وهو موقوف',
    flSuspended: 'موقوف', flActive: 'نشط', flResolved: 'تمت المعالجة',
    flSuspend: 'إيقاف الحساب', flUnsuspend: 'إلغاء الإيقاف', flResolve: 'تمت المعالجة',
    flSuspendNote: 'سبب الإيقاف (يظهر لك فقط):', flResolveNote: 'ملاحظة المعالجة (اختياري):',
    flUnsuspendConfirm: 'إلغاء إيقاف هذا المسافر؟', flDone: 'تم',
  });
  Object.assign(STR.en, {
    navFlags: 'Traveler alerts', flTitle: 'Traveler alerts',
    flSub: 'Any abuse attempt by a traveler shows here. Contact them and suspend the account manually if needed. A suspended account cannot send new trip requests or chat messages.',
    flBanner: '{n} traveler abuse alert(s) need review', flOpen: 'Open alerts',
    flShowAll: 'Show resolved too', flNone: 'No open alerts 👍',
    flCols: ['Traveler', 'Contact', 'Alert', 'Details', 'Attempts', 'First / last', 'Requests', 'Status', ''],
    fk_rfq_limit_open: 'Open-requests limit hit (5)', fk_rfq_limit_daily: 'Daily requests limit hit (10)',
    fk_contact_share: 'Tried to share contact details', fk_suspended_attempt: 'Tried to request while suspended',
    flSuspended: 'Suspended', flActive: 'Active', flResolved: 'Resolved',
    flSuspend: 'Suspend', flUnsuspend: 'Unsuspend', flResolve: 'Resolved',
    flSuspendNote: 'Suspension reason (only you see it):', flResolveNote: 'Resolution note (optional):',
    flUnsuspendConfirm: 'Unsuspend this traveler?', flDone: 'Done',
  });

  async function refreshCount() {
    const { data, error } = await sb.rpc('admin_open_flags');
    state.openFlags = error ? 0 : data || 0;
    return state.openFlags;
  }

  function banner(active) {
    if (state.profile?.role !== 'admin' || !state.openFlags || active === 'flags') return '';
    return `<div class="notice bad" style="margin-bottom:16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <b style="flex:1 1 220px">⚠️ ${esc(t('flBanner', { n: state.openFlags }))}</b>
      <a class="btn small" href="#/flags">${esc(t('flOpen'))}</a></div>`;
  }

  async function viewFlags() {
    const all = new URLSearchParams(location.hash.split('?')[1] || '').get('all') === '1';
    const { data, error } = await sb.rpc('admin_traveler_flags', { p_all: all });
    await refreshCount();
    if (error) return shell('flags', `<div class="top"><h1>${esc(t('flTitle'))}</h1></div><p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const rows = data || [];
    const tr = (f) => `<tr>
      <td>${esc(f.full_name || '—')}</td>
      <td><div dir="ltr">${esc(f.phone || '—')}</div><div dir="ltr" class="muted" style="font-size:13px">${esc(f.email || '')}</div></td>
      <td>${esc(t('fk_' + f.kind))}</td>
      <td style="max-width:320px;white-space:pre-wrap;word-break:break-word">${esc(f.detail || '')}${f.resolved_note ? `<div class="muted" style="font-size:13px">✓ ${esc(f.resolved_note)}</div>` : ''}</td>
      <td>${esc(f.hits)}</td>
      <td style="white-space:nowrap">${esc(fmtDate(f.first_at))}<br>${esc(fmtDate(f.last_at))}</td>
      <td>${esc(f.requests)}</td>
      <td>${f.suspended_at ? `<span class="badge bad">${esc(t('flSuspended'))}</span>` : `<span class="badge">${esc(t('flActive'))}</span>`}
        ${f.resolved_at ? `<div class="muted" style="font-size:13px">${esc(t('flResolved'))}</div>` : ''}</td>
      <td style="white-space:nowrap">
        ${f.resolved_at ? '' : `<button type="button" class="btn ghost small" data-resolve="${esc(f.id)}">${esc(t('flResolve'))}</button>`}
        <button type="button" class="btn ${f.suspended_at ? 'ghost' : 'danger'} small" data-susp="${esc(f.user_id)}" data-on="${f.suspended_at ? '0' : '1'}">${esc(t(f.suspended_at ? 'flUnsuspend' : 'flSuspend'))}</button>
      </td></tr>`;
    shell('flags', `<div class="top"><div><h1>${esc(t('flTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('flSub'))}</p></div>
        <label class="row" style="gap:6px;align-items:center"><input type="checkbox" id="fl-all" ${all ? 'checked' : ''}> ${esc(t('flShowAll'))}</label></div>
      <div class="card">${rows.length ? `<div class="tbl-wrap"><table><thead><tr>${t('flCols').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(tr).join('')}</tbody></table></div>` : `<p class="muted" style="margin:0">${esc(t('flNone'))}</p>`}</div>`);
    document.getElementById('fl-all').onchange = (e) => { location.hash = e.target.checked ? '#/flags?all=1' : '#/flags'; };
    document.querySelectorAll('[data-resolve]').forEach((b) => (b.onclick = async () => {
      const note = prompt(t('flResolveNote'));
      if (note === null) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_resolve_flag', { p_id: Number(b.dataset.resolve), p_note: note });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      toast(t('flDone')); viewFlags();
    }));
    document.querySelectorAll('[data-susp]').forEach((b) => (b.onclick = async () => {
      const on = b.dataset.on === '1';
      let note = null;
      if (on) { note = prompt(t('flSuspendNote')); if (note === null) return; }
      else if (!confirm(t('flUnsuspendConfirm'))) return;
      b.disabled = true;
      const { error: er } = await sb.rpc('admin_set_traveler_suspended', { p_user: b.dataset.susp, p_on: on, p_note: note });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      toast(t('flDone')); viewFlags();
    }));
  }

  return { viewFlags, refreshCount, banner };
}
