// Admin: violations from travelers and agencies (contact sharing / contact requests outside the app,
// agency name or ad photos, request-limit abuse), with a resolution archive. Alerts are written by
// database triggers; this page reads them, records the action taken and applies suspensions.
export function installFlags(ctx) {
  const { sb, state, t, esc, shell, toast, fmtDate, STR } = ctx;
  Object.assign(STR.ar, {
    navFlags: 'المخالفات', flTitle: 'المخالفات',
    flSub: 'كل محاولة تواصل خارج التطبيق أو تلاعب من مسافر أو مكتب تظهر هني مع عدد مرات تكرارها. سجّل الإجراء اللي اتخذته عشان يصير عندك أرشيف ترجع له إذا تكررت المخالفة.',
    flBanner: 'عندك {n} مخالفة مفتوحة تحتاج مراجعة', flOpen: 'افتح المخالفات',
    flTabT: 'المسافرين', flTabA: 'المكاتب', flShowAll: 'عرض الأرشيف (المعالجة)', flNone: 'ما في مخالفات مفتوحة 👍',
    flColsT: ['المسافر', 'التواصل', 'المخالفة', 'التفاصيل', 'مرات التكرار', 'أول / آخر مرة', 'الحالة', ''],
    flColsA: ['المكتب', 'التواصل', 'المخالفة', 'المصدر', 'التفاصيل', 'مرات التكرار', 'أول / آخر مرة', 'الحالة', ''],
    fk_rfq_limit_open: 'تجاوز حد الطلبات المفتوحة (٥)', fk_rfq_limit_daily: 'تجاوز حد الطلبات اليومي (١٠)',
    fk_contact_share: 'كتب وسيلة تواصل (رقم/إيميل/رابط/حساب)', fk_contact_request: 'طلب تواصل خارج التطبيق',
    fk_suspended_attempt: 'حاول يطلب وهو موقوف', fk_agency_name: 'كتب اسم المكتب', fk_photo_ad: 'صورة فيها إعلان أو وسيلة تواصل', fk_other: 'مخالفة أخرى',
    src_offer: 'عرض سعر', src_message: 'المحادثة', src_package: 'عرض خاص', src_photo: 'صورة', src_admin: 'يدوي',
    flTotal: 'إجمالي المخالفات: {n}', flSuspended: 'موقوف', flActive: 'نشط', flCancelled: 'ملغي',
    flResolved: 'تمت المعالجة', flHandle: 'معالجة', flSuspend: 'إيقاف', flUnsuspend: 'فتح الإيقاف',
    flAction: 'الإجراء المتخذ', flFine: 'مبلغ الغرامة (د.ك)', flNote: 'ملاحظة', flSave: 'حفظ في الأرشيف', flCancel: 'إلغاء',
    act_none: 'بدون إجراء (تم التعامل)', act_warning: 'تنبيه / إنذار', act_suspend: 'إيقاف الحساب', act_cancel: 'إلغاء الشراكة',
    act_fine: 'غرامة', act_unsuspend: 'فتح الإيقاف',
    flFineHint: 'الغرامة تتسجل في الأرشيف فقط، وتحصيلها يكون حسب العقد.',
    flCancelConfirm: 'متأكد تبي تلغي شراكة هذا المكتب؟ عروضه المفتوحة بتنسحب.', flUnsuspendConfirm: 'فتح الإيقاف عن هذا الحساب؟',
    flSuspendNote: 'سبب الإيقاف:', flDone: 'تم', flFineReq: 'اكتب مبلغ الغرامة',
    phFlag: '⚠️ مخالفة', phFlagConfirm: 'تسجيل مخالفة على المكتب: صورة فيها إعلان أو وسيلة تواصل؟', phFlagged: 'تم تسجيل المخالفة في صفحة المخالفات',
  });
  Object.assign(STR.en, {
    navFlags: 'Violations', flTitle: 'Violations',
    flSub: 'Every attempt by a traveler or agency to contact outside the app, or to abuse limits, shows here with its repeat count. Record the action you took so you keep an archive for repeat cases.',
    flBanner: '{n} open violation(s) need review', flOpen: 'Open violations',
    flTabT: 'Travelers', flTabA: 'Agencies', flShowAll: 'Show archive (resolved)', flNone: 'No open violations 👍',
    flColsT: ['Traveler', 'Contact', 'Violation', 'Details', 'Repeats', 'First / last', 'Status', ''],
    flColsA: ['Agency', 'Contact', 'Violation', 'Source', 'Details', 'Repeats', 'First / last', 'Status', ''],
    fk_rfq_limit_open: 'Open-requests limit hit (5)', fk_rfq_limit_daily: 'Daily requests limit hit (10)',
    fk_contact_share: 'Wrote contact details', fk_contact_request: 'Asked to contact outside the app',
    fk_suspended_attempt: 'Tried to request while suspended', fk_agency_name: 'Wrote the agency name', fk_photo_ad: 'Photo with ad or contact', fk_other: 'Other',
    src_offer: 'Offer', src_message: 'Chat', src_package: 'Special offer', src_photo: 'Photo', src_admin: 'Manual',
    flTotal: 'Total violations: {n}', flSuspended: 'Suspended', flActive: 'Active', flCancelled: 'Cancelled',
    flResolved: 'Resolved', flHandle: 'Handle', flSuspend: 'Suspend', flUnsuspend: 'Lift suspension',
    flAction: 'Action taken', flFine: 'Fine amount (KWD)', flNote: 'Note', flSave: 'Save to archive', flCancel: 'Cancel',
    act_none: 'No action (handled)', act_warning: 'Warning', act_suspend: 'Suspend account', act_cancel: 'Cancel partnership',
    act_fine: 'Fine', act_unsuspend: 'Lift suspension',
    flFineHint: 'The fine is only recorded in the archive; collection follows the contract.',
    flCancelConfirm: 'Cancel this agency\'s partnership? Its open offers will be withdrawn.', flUnsuspendConfirm: 'Lift the suspension on this account?',
    flSuspendNote: 'Suspension reason:', flDone: 'Done', flFineReq: 'Enter the fine amount',
    phFlag: '⚠️ Violation', phFlagConfirm: 'Record a violation on this agency: photo with an ad or contact details?', phFlagged: 'Violation recorded on the Violations page',
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

  // apply the chosen action to the traveler / agency, then archive the violation
  async function applyAction(who, f, action, fine, note) {
    let er = null;
    if (who === 'traveler' && (action === 'suspend' || action === 'unsuspend'))
      ({ error: er } = await sb.rpc('admin_set_traveler_suspended', { p_user: f.user_id, p_on: action === 'suspend', p_note: note || null }));
    if (who === 'agency' && ['suspend', 'cancel', 'unsuspend'].includes(action))
      ({ error: er } = await sb.rpc('admin_set_agency_status', { p_agency: f.agency_id,
        p_status: action === 'suspend' ? 'suspended' : action === 'cancel' ? 'cancelled' : 'active', p_reason_type: 'violation', p_reason: note || t('fk_' + f.kind) }));
    if (er) return er;
    ({ error: er } = await sb.rpc('admin_resolve_violation', { p_who: who, p_id: Number(f.id), p_action: action, p_fine: action === 'fine' ? Number(fine) : null, p_note: note || null }));
    return er;
  }

  const actionsFor = (who) => (who === 'traveler' ? ['none', 'warning', 'suspend', 'unsuspend', 'fine'] : ['none', 'warning', 'fine', 'suspend', 'cancel', 'unsuspend']);

  function resolveForm(who, f) {
    return `<form class="row" data-rform style="gap:10px;align-items:flex-end;flex-wrap:wrap;padding:10px;background:rgba(0,0,0,.03);border-radius:10px">
      <label class="f" style="min-width:180px">${esc(t('flAction'))}<select name="act">${actionsFor(who).map((a) => `<option value="${a}">${esc(t('act_' + a))}</option>`).join('')}</select></label>
      <label class="f" data-fine style="min-width:140px;display:none">${esc(t('flFine'))}<input name="fine" type="number" min="0" step="0.001" dir="ltr"></label>
      <label class="f" style="flex:1 1 220px">${esc(t('flNote'))}<input name="note" maxlength="500" dir="auto"></label>
      <button class="btn small" type="submit">${esc(t('flSave'))}</button>
      <button class="btn ghost small" type="button" data-rcancel>${esc(t('flCancel'))}</button>
      <p class="muted" data-finehint style="margin:0;font-size:12px;flex-basis:100%;display:none">${esc(t('flFineHint'))}</p></form>`;
  }

  const statusBadge = (who, f) => {
    if (who === 'traveler') return f.suspended_at ? `<span class="badge bad">${esc(t('flSuspended'))}</span>` : `<span class="badge">${esc(t('flActive'))}</span>`;
    if (f.agency_status === 'suspended') return `<span class="badge bad">${esc(t('flSuspended'))}</span>`;
    if (f.agency_status === 'cancelled') return `<span class="badge bad">${esc(t('flCancelled'))}</span>`;
    return `<span class="badge">${esc(t('flActive'))}</span>`;
  };
  const resolvedInfo = (f) => (f.resolved_at
    ? `<div class="muted" style="font-size:12px;margin-top:4px">✓ ${esc(t('flResolved'))} · ${esc(fmtDate(f.resolved_at))}<br>${esc(t('act_' + (f.action || 'none')))}${f.fine_amount ? ` · ${esc(f.fine_amount)} KWD` : ''}${f.resolved_note ? `<br>${esc(f.resolved_note)}` : ''}</div>` : '');

  function row(who, f, i) {
    const name = who === 'traveler' ? esc(f.full_name || '—')
      : `${esc(f.agency_name || '—')}${f.agency_code ? ` <span class="badge" dir="ltr">${esc(f.agency_code)}</span>` : ''}`;
    const isSusp = who === 'traveler' ? !!f.suspended_at : f.agency_status === 'suspended';
    const cells = [
      `${name}<div class="muted" style="font-size:12px">${esc(t('flTotal', { n: f.total_hits }))}</div>`,
      `<div dir="ltr">${esc(f.phone || '—')}</div><div dir="ltr" class="muted" style="font-size:12px">${esc(f.email || '')}</div>`,
      esc(t('fk_' + f.kind)),
      ...(who === 'agency' ? [esc(t('src_' + (f.source || 'admin')))] : []),
      `<div style="max-width:320px;white-space:pre-wrap;word-break:break-word">${esc(f.detail || '')}</div>`,
      `<b>${esc(f.hits)}</b>`,
      `<span style="white-space:nowrap">${esc(fmtDate(f.first_at))}<br>${esc(fmtDate(f.last_at))}</span>`,
      statusBadge(who, f) + resolvedInfo(f),
      `<div style="display:flex;gap:6px;flex-wrap:wrap">${f.resolved_at ? '' : `<button type="button" class="btn small" data-handle="${i}">${esc(t('flHandle'))}</button>`}
        <button type="button" class="btn ${isSusp ? 'ghost' : 'danger'} small" data-qs="${i}">${esc(t(isSusp ? 'flUnsuspend' : 'flSuspend'))}</button></div>`,
    ];
    return `<tr>${cells.map((c) => `<td>${c}</td>`).join('')}</tr><tr data-rrow="${i}" hidden><td colspan="${cells.length}"></td></tr>`;
  }

  async function viewFlags() {
    const qs = new URLSearchParams(location.hash.split('?')[1] || '');
    const all = qs.get('all') === '1';
    const who = qs.get('who') === 'agency' ? 'agency' : 'traveler';
    const [tr, ag] = await Promise.all([sb.rpc('admin_traveler_flags', { p_all: all }), sb.rpc('admin_agency_flags', { p_all: all })]);
    await refreshCount();
    if (tr.error || ag.error) return shell('flags', `<div class="top"><h1>${esc(t('flTitle'))}</h1></div><p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const openT = (tr.data || []).filter((f) => !f.resolved_at).length, openA = (ag.data || []).filter((f) => !f.resolved_at).length;
    const rows = (who === 'traveler' ? tr.data : ag.data) || [];
    const href = (w, a) => `#/flags?who=${w}${a ? '&all=1' : ''}`;
    const tab = (w, label, n) => `<a class="btn ${who === w ? '' : 'ghost'} small" href="${href(w, all)}">${esc(label)}${n ? ` <span class="count">${n}</span>` : ''}</a>`;
    shell('flags', `<div class="top"><div><h1>${esc(t('flTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('flSub'))}</p></div></div>
      <div class="row" style="gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px">${tab('traveler', t('flTabT'), openT)}${tab('agency', t('flTabA'), openA)}
        <label class="row" style="gap:6px;align-items:center;margin-inline-start:auto"><input type="checkbox" id="fl-all" style="width:auto" ${all ? 'checked' : ''}> ${esc(t('flShowAll'))}</label></div>
      <div class="card">${rows.length ? `<div class="tbl-wrap"><table><thead><tr>${t(who === 'traveler' ? 'flColsT' : 'flColsA').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map((f, i) => row(who, f, i)).join('')}</tbody></table></div>` : `<p class="muted" style="margin:0">${esc(t('flNone'))}</p>`}</div>`);
    document.getElementById('fl-all').onchange = (e) => { location.hash = href(who, e.target.checked); };

    document.querySelectorAll('[data-handle]').forEach((b) => (b.onclick = () => {
      const i = Number(b.dataset.handle), f = rows[i];
      const holder = document.querySelector(`[data-rrow="${i}"]`);
      holder.hidden = false;
      holder.firstElementChild.innerHTML = resolveForm(who, f);
      const form = holder.querySelector('[data-rform]');
      const sel = form.elements.act, fineBox = form.querySelector('[data-fine]'), hint = form.querySelector('[data-finehint]');
      sel.onchange = () => { const on = sel.value === 'fine'; fineBox.style.display = on ? '' : 'none'; hint.style.display = on ? '' : 'none'; };
      form.querySelector('[data-rcancel]').onclick = () => { holder.hidden = true; };
      form.onsubmit = async (e) => {
        e.preventDefault();
        const action = sel.value, fine = form.elements.fine.value, note = form.elements.note.value.trim();
        if (action === 'fine' && !(Number(fine) > 0)) return toast(t('flFineReq'));
        if (action === 'cancel' && !confirm(t('flCancelConfirm'))) return;
        form.querySelector('[type=submit]').disabled = true;
        const er = await applyAction(who, f, action, fine, note);
        if (er) { form.querySelector('[type=submit]').disabled = false; return toast(t('errGeneric')); }
        toast(t('flDone')); viewFlags();
      };
    }));

    document.querySelectorAll('[data-qs]').forEach((b) => (b.onclick = async () => {
      const f = rows[Number(b.dataset.qs)];
      const isSusp = who === 'traveler' ? !!f.suspended_at : f.agency_status === 'suspended';
      let note = null;
      if (!isSusp) { note = prompt(t('flSuspendNote')); if (note === null) return; }
      else if (!confirm(t('flUnsuspendConfirm'))) return;
      b.disabled = true;
      const { error: er } = who === 'traveler'
        ? await sb.rpc('admin_set_traveler_suspended', { p_user: f.user_id, p_on: !isSusp, p_note: note })
        : await sb.rpc('admin_set_agency_status', { p_agency: f.agency_id, p_status: isSusp ? 'active' : 'suspended', p_reason_type: 'violation', p_reason: note || t('fk_' + f.kind) });
      if (er) { b.disabled = false; return toast(t('errGeneric')); }
      toast(t('flDone')); viewFlags();
    }));
  }

  return { viewFlags, refreshCount, banner };
}
