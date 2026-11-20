// Booking issuance: after the traveler accepts (and pays), the agency enters the confirmed booking's details and
// attaches its confirmation files. Every field and file the request needs is required before it can issue.
// The traveler receives the details on a TheTouristPlus voucher; the agency's own files go to the admin only.
export function installIssue(ctx) {
  const { sb, state, t, esc, shell, toast, place, STR } = ctx;
  Object.assign(STR.ar, {
    isTitle: 'إصدار الحجز', isBtn: 'إصدار الحجز', isView: 'تفاصيل الحجز',
    isSub: 'عبّ تفاصيل الحجز المؤكد وارفق ملفات التأكيد. كل الحقول والملفات مطلوبة قبل التأكيد. المسافر يستلم قسيمة باسم ذا تورست بلس بدون اسم المكتب، وملفاتك تروح لإدارة المنصة فقط.',
    isHotel: 'الفندق', isFlight: 'الطيران', isExtras: 'الخدمات الإضافية', isFiles: 'الملفات المرفقة',
    hName: 'اسم الفندق', hConf: 'رقم تأكيد الفندق', hRoom: 'نوع الغرفة وعددها', hIn: 'تاريخ الدخول', hOut: 'تاريخ الخروج', hBoard: 'الوجبات', hCancel: 'سياسة الإلغاء',
    b_ro: 'بدون وجبات', b_bb: 'شامل الإفطار', b_hb: 'إفطار وعشاء', b_fb: 'ثلاث وجبات', b_ai: 'شامل كلياً',
    c_ref: 'قابل للاسترداد', c_non: 'غير قابل للاسترداد',
    fPnr: 'رقم الحجز (PNR)', fOut: 'رحلة الذهاب (الرقم، التاريخ، الوقت)', fRet: 'رحلة العودة (الرقم، التاريخ، الوقت)', fBag: 'الأمتعة', fPax: 'اسم المسافر كما في الجواز', fTicket: 'رقم التذكرة',
    x_transfers: 'التوصيل (من وين لوين، التاريخ)', x_tours: 'الجولات (الأسماء والتواريخ)', x_visa: 'التأشيرة (النوع ورقمها)', x_insurance: 'تأمين السفر (الشركة ورقم الوثيقة)',
    k_hotel: 'تأكيد الفندق', k_ticket: 'التذاكر الإلكترونية', k_transfers: 'تأكيد التوصيل', k_tours: 'تأكيد الجولات', k_visa: 'التأشيرة', k_insurance: 'وثيقة التأمين', k_other: 'ملف آخر',
    isAttach: 'إرفاق ملف', isFileHint: 'PDF أو صورة، حتى 10 ميغا', isFileBad: 'نوع الملف لازم PDF أو صورة وحجمه أقل من 10 ميغا.', isUploaded: 'تم رفع الملف', isRemove: 'حذف', isOpen: 'فتح',
    isSave: 'حفظ', isSaved: 'تم الحفظ', isIssue: '✓ تأكيد الحجز وإرسال القسيمة للمسافر', isIssued: 'تم تأكيد الحجز وإرسال القسيمة للمسافر.',
    isMissing: 'باقي قبل التأكيد:', isReady: 'كل شي مكتمل، تقدر تأكد الحجز.', isDone: 'الحجز مؤكد', isRef: 'رقم الحجز',
    isNote: 'لا تكتب اسم مكتبك أو أرقامه في الحقول. الملفات المرفقة تراجعها إدارة المنصة ولا تظهر للمسافر.',
    m_hotel: 'تفاصيل الفندق', m_file_hotel: 'ملف تأكيد الفندق', m_file_ticket: 'ملف التذاكر', m_flight_tickets: 'اسم ورقم التذكرة لكل مسافر',
  });
  Object.assign(STR.en, {
    isTitle: 'Issue booking', isBtn: 'Issue booking', isView: 'Booking details',
    isSub: 'Enter the confirmed booking details and attach the confirmation files. Every field and file is required before confirming. The traveler gets a TheTouristPlus voucher without your agency name; your files go to the platform admin only.',
    isHotel: 'Hotel', isFlight: 'Flights', isExtras: 'Extra services', isFiles: 'Attached files',
    hName: 'Hotel name', hConf: 'Hotel confirmation number', hRoom: 'Room type and count', hIn: 'Check-in', hOut: 'Check-out', hBoard: 'Meals', hCancel: 'Cancellation policy',
    b_ro: 'Room only', b_bb: 'Breakfast', b_hb: 'Half board', b_fb: 'Full board', b_ai: 'All inclusive',
    c_ref: 'Refundable', c_non: 'Non-refundable',
    fPnr: 'Booking reference (PNR)', fOut: 'Outbound flight (number, date, time)', fRet: 'Return flight (number, date, time)', fBag: 'Baggage', fPax: 'Passenger name as in passport', fTicket: 'Ticket number',
    x_transfers: 'Transfers (from, to, date)', x_tours: 'Tours (names and dates)', x_visa: 'Visa (type and number)', x_insurance: 'Travel insurance (company and policy number)',
    k_hotel: 'Hotel confirmation', k_ticket: 'E-tickets', k_transfers: 'Transfer confirmation', k_tours: 'Tour confirmation', k_visa: 'Visa', k_insurance: 'Insurance policy', k_other: 'Other file',
    isAttach: 'Attach file', isFileHint: 'PDF or image, up to 10 MB', isFileBad: 'The file must be a PDF or image under 10 MB.', isUploaded: 'File uploaded', isRemove: 'Remove', isOpen: 'Open',
    isSave: 'Save', isSaved: 'Saved', isIssue: '✓ Confirm booking and send the voucher', isIssued: 'Booking confirmed and voucher sent to the traveler.',
    isMissing: 'Still missing:', isReady: 'Everything is complete. You can confirm the booking.', isDone: 'Booking confirmed', isRef: 'Booking ref',
    isNote: 'Do not write your agency name or numbers in the fields. Attached files are reviewed by the platform and never shown to the traveler.',
    m_hotel: 'Hotel details', m_file_hotel: 'Hotel confirmation file', m_file_ticket: 'Ticket file', m_flight_tickets: 'Name and ticket number for each passenger',
  });
  const BOARDS = ['ro', 'bb', 'hb', 'fb', 'ai'];
  const EXTRA = ['transfers', 'tours', 'visa', 'insurance'];
  const MIME = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  const H_KEYS = { name: 'hName', confirmation: 'hConf', room: 'hRoom', check_in: 'hIn', check_out: 'hOut', board: 'hBoard', cancel: 'hCancel' };
  const F_KEYS = { pnr: 'fPnr', out: 'fOut', ret: 'fRet', baggage: 'fBag' };
  const missLabel = (m) => {
    let x = m.match(/^hotel(\d+)\.(\w+)$/);
    if (x) return `${t('isHotel')} ${x[1]}: ${t(H_KEYS[x[2]] || x[2])}`;
    x = m.match(/^flight\.(\w+)$/);
    if (x) return x[1] === 'tickets' ? t('m_flight_tickets') : t(F_KEYS[x[1]] || x[1]);
    x = m.match(/^extra\.(\w+)$/);
    if (x) return t('x_' + x[1]);
    x = m.match(/^file\.(\w+)$/);
    if (x) return t('k_' + x[1]);
    return m === 'hotel' ? t('m_hotel') : m;
  };
  const input = (name, label, value, opts = {}) => `<label class="f">${esc(label)}${opts.req === false ? '' : ' *'}<input name="${esc(name)}" ${opts.type ? `type="${opts.type}"` : ''} ${opts.ltr ? 'dir="ltr"' : ''} maxlength="${opts.max || 160}" value="${esc(value || '')}" ${opts.ro ? 'disabled' : ''}></label>`;
  const select = (name, label, value, list, prefix, ro) => `<label class="f">${esc(label)} *<select name="${esc(name)}" ${ro ? 'disabled' : ''}><option value=""></option>${list.map((v) => `<option value="${v}" ${value === v ? 'selected' : ''}>${esc(t(prefix + v))}</option>`).join('')}</select></label>`;

  async function viewIssue(offerId) {
    const admin = state.profile?.role === 'admin';
    // One RPC for agency and admin: the admin can't read offers directly.
    const { data: o, error } = await sb.rpc('booking_context', { p_offer: offerId });
    if (error || !o) return shell(admin ? 'allbookings' : 'bookings', `<p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const [{ data: b }, { data: files }, { data: miss }] = await Promise.all([
      sb.from('bookings').select('*').eq('offer_id', offerId).maybeSingle(),
      sb.from('booking_files').select('*').eq('offer_id', offerId).order('created_at'),
      sb.rpc('booking_missing', { p_offer: offerId }),
    ]);
    const r = o.rfq || {};
    const sv = r.services || [];
    const issued = !!b?.issued_at;
    const ro = issued || admin;
    const pax = (r.adults || 0) + (r.children || 0);
    const cities = Array.isArray(r.cities) && r.cities.length ? r.cities.map((c) => c.city || c.name || c) : [r.destination];
    const hotels = (b?.hotels?.length ? b.hotels : cities.map(() => ({})));
    const fl = b?.flight || {};
    const tickets = Array.from({ length: pax }, (_, i) => (fl.tickets || [])[i] || {});
    const ex = b?.extras || {};
    const hotelBlock = sv.includes('hotel') ? `<section class="card" style="display:grid;gap:10px"><h2 style="margin:0">${esc(t('isHotel'))}</h2>
      ${hotels.map((h, i) => `<div data-hotel="${i}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px">
        ${cities.length > 1 ? `<b style="grid-column:1/-1">${esc(place(cities[i] || ''))}</b>` : ''}
        ${input('name', t('hName'), h.name || (i === 0 ? o.hotel : ''), { ro })}${input('confirmation', t('hConf'), h.confirmation, { ltr: true, ro })}${input('room', t('hRoom'), h.room, { ro })}
        ${input('check_in', t('hIn'), h.check_in || (i === 0 ? r.depart : ''), { type: 'date', ro })}${input('check_out', t('hOut'), h.check_out || (i === hotels.length - 1 ? r.ret : ''), { type: 'date', ro })}
        ${select('board', t('hBoard'), h.board, BOARDS, 'b_', ro)}${select('cancel', t('hCancel'), h.cancel, ['ref', 'non'], 'c_', ro)}</div>`).join('<hr style="border:0;border-top:1px solid var(--line,#e2e8f0)">')}</section>` : '';
    const flightBlock = sv.includes('flights') ? `<section class="card" style="display:grid;gap:10px" id="is-flight"><h2 style="margin:0">${esc(t('isFlight'))}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px">${input('pnr', t('fPnr'), fl.pnr, { ltr: true, max: 20, ro })}${input('out', t('fOut'), fl.out, { ro })}${r.ret ? input('ret', t('fRet'), fl.ret, { ro }) : ''}${input('baggage', t('fBag'), fl.baggage, { ro })}</div>
      <div style="display:grid;gap:6px">${tickets.map((tk, i) => `<div data-ticket="${i}" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px">${input('name', `${t('fPax')} ${i + 1}`, tk.name, { ltr: true, ro })}${input('number', `${t('fTicket')} ${i + 1}`, tk.number, { ltr: true, max: 30, ro })}</div>`).join('')}</div></section>` : '';
    const extras = EXTRA.filter((k) => sv.includes(k));
    const extraBlock = extras.length ? `<section class="card" style="display:grid;gap:10px" id="is-extras"><h2 style="margin:0">${esc(t('isExtras'))}</h2>
      ${extras.map((k) => `<label class="f">${esc(t('x_' + k))} *<textarea name="${k}" maxlength="500" rows="2" ${ro ? 'disabled' : ''}>${esc(ex[k] || '')}</textarea></label>`).join('')}</section>` : '';
    const kinds = [...(sv.includes('hotel') ? ['hotel'] : []), ...(sv.includes('flights') ? ['ticket'] : []), ...extras, 'other'];
    const fileList = (files || []).map((f) => `<li class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span>${esc(t('k_' + f.kind))} · ${esc(f.name)}${f.size ? ` · ${Math.round(f.size / 1024)} KB` : ''}</span><span class="row" style="gap:6px">
      <button type="button" class="btn ghost small" data-open="${esc(f.path)}">${esc(t('isOpen'))}</button>${ro ? '' : `<button type="button" class="btn ghost small" data-rm="${esc(f.id)}" data-path="${esc(f.path)}">${esc(t('isRemove'))}</button>`}</span></li>`).join('');
    const missing = Array.isArray(miss) ? miss : [];
    shell(admin ? 'allbookings' : 'bookings', `<div class="top"><div><h1>${esc(issued ? t('isView') : t('isTitle'))}</h1>
      <p class="muted" style="margin:4px 0 0">${esc(place(r.destination || ''))} · <span dir="ltr">${esc(r.depart || '')} → ${esc(r.ret || '')}</span> · ${pax}</p></div>
      ${issued ? `<span class="badge good">${esc(t('isDone'))} · ${esc(t('isRef'))} <span dir="ltr">${esc(b.ref)}</span></span>` : ''}</div>
      ${ro ? '' : `<p class="notice">${esc(t('isSub'))}</p>`}
      <form id="is-form" style="display:grid;gap:14px">${hotelBlock}${flightBlock}${extraBlock}</form>
      <section class="card" style="display:grid;gap:10px;margin-top:14px"><h2 style="margin:0">${esc(t('isFiles'))}</h2>
        ${fileList ? `<ul style="list-style:none;margin:0;padding:0;display:grid;gap:6px">${fileList}</ul>` : ''}
        ${ro ? '' : `<div class="row" style="gap:8px;flex-wrap:wrap;align-items:flex-end"><label class="f">${esc(t('isAttach'))}<select id="is-kind">${kinds.map((k) => `<option value="${k}">${esc(t('k_' + k))}</option>`).join('')}</select></label>
          <input id="is-file" type="file" accept="application/pdf,image/jpeg,image/png,image/webp"><span class="muted" style="font-size:12px">${esc(t('isFileHint'))}</span></div>`}
      </section>
      ${ro ? '' : `<p class="muted" style="font-size:13px">${esc(t('isNote'))}</p>
      <div id="is-miss">${missing.length ? `<p class="notice bad" style="margin:0"><b>${esc(t('isMissing'))}</b> ${missing.map((m) => esc(missLabel(m))).join('، ')}</p>` : `<p class="notice good" style="margin:0">${esc(t('isReady'))}</p>`}</div>
      <div class="row" style="gap:8px;justify-content:flex-end;margin-top:12px"><button type="button" class="btn ghost" id="is-save">${esc(t('isSave'))}</button><button type="button" class="btn" id="is-issue">${esc(t('isIssue'))}</button></div>`}`);

    document.querySelectorAll('[data-open]').forEach((btn) => (btn.onclick = async () => {
      const { data: s, error: er } = await sb.storage.from('booking-docs').createSignedUrl(btn.dataset.open, 120);
      if (er || !s?.signedUrl) return toast(t('errGeneric'));
      window.open(s.signedUrl, '_blank', 'noopener');
    }));
    if (ro) return;

    const collect = () => {
      const val = (el, n) => String(el.querySelector(`[name="${n}"]`)?.value || '').trim();
      const hs = [...document.querySelectorAll('[data-hotel]')].map((el, i) => ({ city: cities[i] || '', name: val(el, 'name'), confirmation: val(el, 'confirmation'), room: val(el, 'room'), check_in: val(el, 'check_in'), check_out: val(el, 'check_out'), board: val(el, 'board'), cancel: val(el, 'cancel') }));
      const fe = document.getElementById('is-flight');
      const flight = fe ? { pnr: val(fe, 'pnr'), out: val(fe, 'out'), ret: val(fe, 'ret'), baggage: val(fe, 'baggage'), tickets: [...fe.querySelectorAll('[data-ticket]')].map((el) => ({ name: val(el, 'name'), number: val(el, 'number') })) } : null;
      const xe = document.getElementById('is-extras');
      const extrasOut = {};
      if (xe) extras.forEach((k) => { extrasOut[k] = val(xe, k); });
      return { p_offer: offerId, p_hotels: hs, p_flight: flight, p_extras: extrasOut };
    };
    const save = async () => {
      const { error: er } = await sb.rpc('agency_save_booking', collect());
      if (er) { toast(t('errGeneric')); return false; }
      return true;
    };
    document.getElementById('is-save').onclick = async () => { if (await save()) { toast(t('isSaved')); viewIssue(offerId); } };
    document.getElementById('is-issue').onclick = async (e) => {
      e.target.disabled = true;
      if (!(await save())) { e.target.disabled = false; return; }
      const { error: er } = await sb.rpc('agency_issue_booking', { p_offer: offerId });
      if (er) { toast(t('errGeneric')); return viewIssue(offerId); }
      toast(t('isIssued')); viewIssue(offerId);
    };
    document.getElementById('is-file').onchange = async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      if (!MIME.includes(f.type) || f.size > 10 * 1024 * 1024) { e.target.value = ''; return toast(t('isFileBad')); }
      if (!(await save())) return;
      const kind = document.getElementById('is-kind').value;
      const safe = f.name.replace(/[^A-Za-z0-9._-]+/g, '_').slice(-80) || 'file';
      const path = `${o.agency_id}/${offerId}/${crypto.randomUUID()}-${safe}`;
      const { error: up } = await sb.storage.from('booking-docs').upload(path, f, { contentType: f.type, upsert: false });
      if (up) return toast(t('errGeneric'));
      const { error: ins } = await sb.from('booking_files').insert({ offer_id: offerId, agency_id: o.agency_id, kind, path, name: f.name.slice(0, 200), size: f.size });
      if (ins) { await sb.storage.from('booking-docs').remove([path]); return toast(t('errGeneric')); }
      toast(t('isUploaded')); viewIssue(offerId);
    };
    document.querySelectorAll('[data-rm]').forEach((btn) => (btn.onclick = async () => {
      const { error: er } = await sb.from('booking_files').delete().eq('id', btn.dataset.rm);
      if (er) return toast(t('errGeneric'));
      await sb.storage.from('booking-docs').remove([btn.dataset.path]);
      viewIssue(offerId);
    }));
  }
  return { viewIssue };
}
