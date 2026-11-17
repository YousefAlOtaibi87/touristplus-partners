// Admin: traveler preferences & behavior — overall and per traveler (from trip requests and bookings).
export function installInsights(ctx) {
  const { sb, state, t, esc, money, place, fmtDate, shell, STR } = ctx;
  Object.assign(STR.ar, {
    navInsights: 'تفضيلات المسافرين', inTitle: 'تفضيلات وسلوك المسافرين',
    inSub: 'وش يطلبون المسافرين وش يحجزون، بشكل عام ولكل مسافر بروحه. محسوبة من طلبات الرحلات والحجوزات، عشان تعرف وش تطلب من المكاتب يقدمونه كعروض.',
    inPeriod: 'الفترة', inDays: 'آخر {n} يوم', inAll: 'كل الفترات', inBack: '→ كل المسافرين',
    inReq: 'طلبات', inTrav: 'مسافرين طلبوا', inBooked: 'حجوزات', inConv: 'نسبة الحجز', inRepeat: 'رجعوا وطلبوا مرة ثانية', inNights: 'متوسط الليالي',
    inPeople: 'متوسط عدد الأشخاص', inFamily: 'عوائل مع أطفال', inLead: 'يطلبون قبل السفر بـ', inLeadV: '{n} يوم', inValue: 'متوسط قيمة الحجز', inTotal: 'مجموع الحجوزات', inBudget: 'متوسط الميزانية',
    inTips: 'أفكار عروض للمكاتب', inTipDest: 'الوجهة الأكثر طلباً {d} ({n} طلب، {b} حجز) — اطلب من المكاتب عروض جاهزة لها.',
    inTipParty: 'أغلب الطلبات {p} — خل العروض مناسبة لهم.', inTipNights: 'المدة المفضلة {n} ليالي.', inTipBudget: 'الميزانية الأشيع {b} د.ك.',
    inTipStars: 'الفنادق المفضلة {s} نجوم.', inTipMonth: 'أكثر شهر سفر: {m}.', inTipLead: 'أغلبهم يطلبون قبل السفر بـ {l} يوم — انشر العروض قبلها بفترة.',
    inTipConv: '{d} عليها طلبات كثيرة بس الحجز قليل — ممكن الأسعار أعلى من المتوقع.',
    inD_dest: 'الوجهات', inD_type: 'نوع الرحلة', inD_party: 'مع مين يسافرون', inD_nights: 'مدة الرحلة (ليالي)', inD_budget: 'الميزانية / قيمة الحجز (د.ك)',
    inD_stars: 'نجوم الفندق', inD_cabin: 'درجة الطيران', inD_service: 'الخدمات المطلوبة', inD_pref: 'التفضيلات الإضافية', inD_airline: 'شركات طيران طلبوها',
    inD_paid_airline: 'شركات طيران حجزوا عليها', inD_month: 'شهر السفر', inD_lead: 'كم يوم قبل السفر يطلبون', inD_cancel: 'سياسة إلغاء الفندق',
    inP_solo: 'فرد', inP_couple: 'شخصين', inP_family: 'عائلة مع أطفال', inP_group: 'مجموعة (3+)',
    inN: '{n} طلب', inB: '{b} حجز', inNone: 'ما في طلبات في هالفترة.', inUsers: 'المسافرين', inSearch: 'ابحث بالاسم أو الإيميل أو الوجهة',
    inCols: ['المسافر', 'طلبات', 'حجوزات', 'الوجهة المفضلة', 'نوع الرحلة', 'الليالي', 'الأشخاص', 'النجوم', 'متوسط الحجز', 'آخر طلب'],
    inKids: 'مع أطفال', inHistory: 'كل طلباته', inHCols: ['التاريخ', 'الوجهة', 'النوع', 'السفر', 'الليالي', 'الأشخاص', 'النجوم', 'الميزانية', 'قيمة الحجز', 'الحالة'],
    inPromosOff: 'قافل إشعارات العروض', inDests: '{n} وجهات مختلفة', inNote: 'قيمة الحجز = سعر العرض اللي قبله المسافر. الأرقام تشمل الحسابات التجريبية.',
    inMonths: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  });
  Object.assign(STR.en, {
    navInsights: 'Traveler preferences', inTitle: 'Traveler preferences & behavior',
    inSub: 'What travelers request and book, overall and for each traveler. Built from trip requests and bookings, so you know which offers to ask agencies for.',
    inPeriod: 'Period', inDays: 'Last {n} days', inAll: 'All time', inBack: '← All travelers',
    inReq: 'Requests', inTrav: 'Travelers who requested', inBooked: 'Bookings', inConv: 'Booking rate', inRepeat: 'Came back and requested again', inNights: 'Average nights',
    inPeople: 'Average people', inFamily: 'Families with children', inLead: 'Request ahead of travel', inLeadV: '{n} days', inValue: 'Average booking value', inTotal: 'Total bookings', inBudget: 'Average budget',
    inTips: 'Offer ideas for agencies', inTipDest: 'Most requested destination: {d} ({n} requests, {b} booked) — ask agencies for ready offers there.',
    inTipParty: 'Most requests are {p} — shape offers for them.', inTipNights: 'Preferred length: {n} nights.', inTipBudget: 'Most common budget: KWD {b}.',
    inTipStars: 'Preferred hotels: {s} stars.', inTipMonth: 'Top travel month: {m}.', inTipLead: 'Most request {l} days before travel — publish offers earlier than that.',
    inTipConv: '{d} gets many requests but few bookings — prices may be higher than expected.',
    inD_dest: 'Destinations', inD_type: 'Trip type', inD_party: 'Who they travel with', inD_nights: 'Trip length (nights)', inD_budget: 'Budget / booking value (KWD)',
    inD_stars: 'Hotel stars', inD_cabin: 'Cabin class', inD_service: 'Services requested', inD_pref: 'Extra preferences', inD_airline: 'Airlines requested',
    inD_paid_airline: 'Airlines booked', inD_month: 'Travel month', inD_lead: 'Days between request and travel', inD_cancel: 'Hotel cancellation policy',
    inP_solo: 'Solo', inP_couple: 'Couple', inP_family: 'Family with children', inP_group: 'Group (3+)',
    inN: '{n} requests', inB: '{b} booked', inNone: 'No requests in this period.', inUsers: 'Travelers', inSearch: 'Search by name, email or destination',
    inCols: ['Traveler', 'Requests', 'Bookings', 'Favorite destination', 'Trip type', 'Nights', 'People', 'Stars', 'Avg booking', 'Last request'],
    inKids: 'with children', inHistory: 'All their requests', inHCols: ['Date', 'Destination', 'Type', 'Travel', 'Nights', 'People', 'Stars', 'Budget', 'Booking value', 'Status'],
    inPromosOff: 'Offer notifications off', inDests: '{n} different destinations', inNote: 'Booking value = price of the offer the traveler accepted. Numbers include test accounts.',
    inMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  });

  const ORDER = ['dest', 'type', 'party', 'nights', 'budget', 'stars', 'month', 'lead', 'cabin', 'service', 'pref', 'airline', 'paid_airline', 'cancel'];
  const SORTED = new Set(['nights', 'budget', 'lead', 'month', 'stars']);
  const label = (d, k) => {
    if (d === 'dest') return place(k);
    if (d === 'type') return t('type_' + k);
    if (d === 'party') return t('inP_' + k);
    if (d === 'service') return t('svc_' + k);
    if (d === 'pref') return t('pref_' + k);
    if (d === 'cabin') return t('cabin_' + k);
    if (d === 'cancel') return t('hc_' + k);
    if (d === 'stars') return '★'.repeat(Number(k) || 0) || k;
    if (d === 'month') return t('inMonths')[Number(k) - 1] || k;
    if (d === 'budget' || d === 'lead') return k.slice(1);
    return k;
  };
  const n1 = (x) => (x == null ? '—' : esc(Number(x).toLocaleString('en-US', { maximumFractionDigits: 1 })));
  const kpi = (l, v) => `<div class="card grow" style="min-width:150px"><div class="muted" style="font-size:13px">${esc(l)}</div><b style="font-size:24px">${v}</b></div>`;

  function bars(d, list) {
    const rows = SORTED.has(d) ? [...list].sort((a, b) => (a.k < b.k ? -1 : 1)) : list.slice(0, 10);
    const max = Math.max(1, ...rows.map((x) => x.n));
    return `<div class="card" style="margin:0"><h3 style="margin:0 0 10px">${esc(t('inD_' + d))}</h3>${rows.map((x) => `
      <div style="margin-bottom:8px"><div class="row" style="justify-content:space-between;font-size:13px;gap:8px"><span>${esc(label(d, x.k))}</span>
        <span class="muted">${esc(t('inN', { n: x.n }))}${x.b ? ` · <b style="color:inherit">${esc(t('inB', { b: x.b }))}</b>` : ''}</span></div>
        <div style="height:8px;border-radius:6px;background:var(--line,#e5e7eb);overflow:hidden;margin-top:4px;position:relative">
          <div style="position:absolute;inset:0 auto 0 0;width:${(x.n / max) * 100}%;background:var(--accent,#0e7490);opacity:.35"></div>
          <div style="position:absolute;inset:0 auto 0 0;width:${(x.b / max) * 100}%;background:var(--accent,#0e7490)"></div></div></div>`).join('')}</div>`;
  }

  function tips(dims) {
    const top = (d) => (dims[d] || [])[0];
    const out = [];
    const d = top('dest'); if (d) out.push(t('inTipDest', { d: place(d.k), n: d.n, b: d.b }));
    const p = top('party'); if (p) out.push(t('inTipParty', { p: t('inP_' + p.k) }));
    const n = top('nights'); if (n) out.push(t('inTipNights', { n: n.k }));
    const b = top('budget'); if (b) out.push(t('inTipBudget', { b: b.k.slice(1) }));
    const s = top('stars'); if (s) out.push(t('inTipStars', { s: s.k }));
    const m = top('month'); if (m) out.push(t('inTipMonth', { m: label('month', m.k) }));
    const l = top('lead'); if (l) out.push(t('inTipLead', { l: l.k.slice(1) }));
    (dims.dest || []).filter((x) => x.n >= 3 && x.b / x.n < 0.25).slice(0, 2).forEach((x) => out.push(t('inTipConv', { d: place(x.k) })));
    return out.length ? `<div class="card" style="margin-bottom:16px"><h2 style="margin:0 0 8px">💡 ${esc(t('inTips'))}</h2><ul style="margin:0;padding-inline-start:20px;line-height:1.9">${out.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : '';
  }

  function summary(x) {
    const conv = x.requests ? Math.round((x.booked / x.requests) * 100) : 0;
    return `<div class="row" style="gap:12px;margin-bottom:16px;flex-wrap:wrap">
      ${kpi(t('inReq'), n1(x.requests))}${kpi(t('inBooked'), `${n1(x.booked)} <span class="muted" style="font-size:14px">(${conv}%)</span>`)}
      ${x.travelers != null ? kpi(t('inTrav'), n1(x.travelers)) + kpi(t('inRepeat'), n1(x.repeat)) : ''}
      ${kpi(t('inNights'), n1(x.avg_nights))}${kpi(t('inPeople'), n1(x.avg_people))}${x.family_pct != null ? kpi(t('inFamily'), `${n1(x.family_pct)}%`) : ''}
      ${x.avg_lead != null ? kpi(t('inLead'), esc(t('inLeadV', { n: x.avg_lead }))) : ''}${kpi(t('inValue'), x.avg_paid ? esc(money(x.avg_paid)) : '—')}
      ${kpi(t('inTotal'), x.total_paid ? esc(money(x.total_paid)) : '—')}${x.avg_budget ? kpi(t('inBudget'), esc(money(x.avg_budget))) : ''}</div>`;
  }

  const grid = (dims) => `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;margin-bottom:16px">${ORDER.filter((d) => dims[d]?.length).map((d) => bars(d, dims[d])).join('')}</div>`;

  function periodSel(days) {
    return `<label class="f" style="width:180px">${esc(t('inPeriod'))}<select id="in-days">${[30, 90, 180, 365, 3650].map((v) => `<option value="${v}" ${Number(days) === v ? 'selected' : ''}>${esc(v === 3650 ? t('inAll') : t('inDays', { n: v }))}</option>`).join('')}</select></label>`;
  }

  async function viewInsights(userId = '', days = state.inDays || 365) {
    state.inDays = Number(days);
    const { data, error } = await sb.rpc('admin_traveler_insights', { p_days: Number(days), p_user: userId || null });
    if (error || !data) return shell('insights', `<div class="top"><h1>${esc(t('inTitle'))}</h1></div><p class="notice bad">${esc(t('errGeneric'))}</p>`);
    const tot = data.totals || {}; const dims = data.dims || {}; const users = data.users || [];
    if (userId) {
      const u = users[0] || {};
      const hist = data.history || [];
      shell('insights', `<div class="top"><div><a href="#/insights" class="muted" style="font-size:13px">${esc(t('inBack'))}</a>
          <h1 style="margin:6px 0 0">${esc(u.name || '—')}</h1>
          <p class="muted" style="margin:4px 0 0" dir="auto">${esc(u.email || '')}${u.phone ? ` · <span dir="ltr">${esc(u.phone)}</span>` : ''}${u.n_dest ? ` · ${esc(t('inDests', { n: u.n_dest }))}` : ''}${u.has_kids ? ` · ${esc(t('inKids'))}` : ''}${u.promos === false ? ` · <span class="badge">${esc(t('inPromosOff'))}</span>` : ''}</p></div>
          ${periodSel(days)}</div>
        ${!tot.requests ? `<p class="muted">${esc(t('inNone'))}</p>` : `${summary(tot)}${tips(dims)}${grid(dims)}
        <div class="card"><h2 style="margin:0 0 10px">${esc(t('inHistory'))}</h2><div class="tbl-wrap"><table><thead><tr>${t('inHCols').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>
          ${hist.map((h) => `<tr><td style="white-space:nowrap">${esc(fmtDate(h.at))}</td><td>${esc(place(h.dest || ''))}</td><td>${esc(t('type_' + h.type))}</td><td dir="ltr">${esc(h.depart || '')}</td>
            <td>${n1(h.nights)}</td><td>${n1(h.people)}</td><td>${h.stars ? '★'.repeat(h.stars) : '—'}</td><td>${h.budget ? esc(money(h.budget)) : '—'}</td>
            <td>${h.paid ? `<b>${esc(money(h.paid))}</b>` : '—'}</td><td>${esc(t('rfq_' + h.status))}</td></tr>`).join('')}</tbody></table></div></div>`}`);
    } else {
      shell('insights', `<div class="top"><div><h1>${esc(t('inTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('inSub'))}</p></div>${periodSel(days)}</div>
        ${!tot.requests ? `<p class="muted">${esc(t('inNone'))}</p>` : `${summary(tot)}${tips(dims)}${grid(dims)}
        <div class="card"><div class="row" style="justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:10px"><h2 style="margin:0">${esc(t('inUsers'))} (${users.length})</h2>
          <input id="in-q" placeholder="${esc(t('inSearch'))}" style="max-width:320px"></div>
          <div class="tbl-wrap"><table><thead><tr>${t('inCols').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody id="in-rows">
          ${users.map((u) => `<tr data-uid="${esc(u.id)}" data-q="${esc(`${u.name || ''} ${u.email || ''} ${u.top_dest || ''} ${place(u.top_dest || '')}`.toLowerCase())}" style="cursor:pointer">
            <td><b>${esc(u.name || '—')}</b><div class="muted" dir="ltr" style="font-size:12px">${esc(u.email || '')}</div></td>
            <td>${n1(u.requests)}</td><td><b>${n1(u.booked)}</b></td><td>${esc(place(u.top_dest || '—'))}</td><td>${esc(t('type_' + u.top_type))}</td>
            <td>${n1(u.avg_nights)}</td><td>${n1(u.avg_people)}${u.has_kids ? ' 👶' : ''}</td><td>${u.top_stars ? '★'.repeat(u.top_stars) : '—'}</td>
            <td>${u.avg_paid ? esc(money(u.avg_paid)) : '—'}</td><td style="white-space:nowrap">${esc(fmtDate(u.last_at))}</td></tr>`).join('')}</tbody></table></div>
          <p class="muted" style="margin:10px 0 0;font-size:12px">${esc(t('inNote'))}</p></div>`}`);
      const q = document.getElementById('in-q');
      if (q) q.oninput = () => { const s = q.value.trim().toLowerCase(); document.querySelectorAll('#in-rows tr').forEach((r) => { r.style.display = !s || r.dataset.q.includes(s) ? '' : 'none'; }); };
      document.querySelectorAll('#in-rows tr[data-uid]').forEach((r) => { r.onclick = () => { location.hash = '#/insights/' + r.dataset.uid; }; });
    }
    const sel = document.getElementById('in-days');
    if (sel) sel.onchange = () => viewInsights(userId, sel.value);
  }

  return { viewInsights };
}
