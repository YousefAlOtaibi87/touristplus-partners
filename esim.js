// Admin: eSIM roaming data — supplier, prices, packages, quote simulator, orders. Hidden from the app until enabled.
export function installEsim(ctx) {
  const { sb, state, t, esc, fmtDate, shell, toast, STR } = ctx;
  Object.assign(STR.ar, {
    navEsim: 'شرائح eSIM', esTitle: 'شرائح التجوال الإلكترونية (eSIM)',
    esSub: 'المسافر يختار الدول اللي بيزورها وعدد الأيام بس، والنظام يختار أرخص باقة تغطيها بدل باقة قارة كاملة. تبقى الخدمة مخفية في التطبيق لين تفعّلها.',
    esHidden: '🔒 مخفية في التطبيق', esLive: '🟢 ظاهرة في التطبيق', esProvider: 'المورّد', pv_mock: 'مورّد تجريبي (بدون فلوس)', pv_esimaccess: 'eSIM Access',
    esMarkup: 'هامش الربح %', esMinMargin: 'أقل ربح لكل شريحة (د.ك)', esRate: 'سعر الدولار بالدينار', esRound: 'تقريب السعر لأقرب (د.ك)',
    esEnable: 'إظهار الخدمة في التطبيق', esEnableWarn: 'لا تفعّلها إلا بعد توقيع اتفاقية المورّد وربط بوابة الدفع.', esSave: 'حفظ الإعدادات', esSaved: 'تم الحفظ وإعادة حساب الأسعار.',
    esSync: '🔄 تحديث الباقات من المورّد', esSynced: 'تم تحديث {n} باقة.', esBalance: 'رصيد المورّد', esCheckBal: 'عرض الرصيد',
    esPackages: 'الباقات', esActive: 'فعّالة', esCountries: 'دولة مغطاة', esOrders: 'الطلبات', esRevenue: 'مبيعات', esLastSync: 'آخر تحديث',
    esSearch: 'ابحث برمز الدولة (TR, GB…) أو اسم الباقة', esCols: ['الباقة', 'الدول', 'الأيام', 'البيانات', 'التكلفة $', 'سعر البيع د.ك', 'سعر يدوي', 'فعّالة'],
    esUnlimited: 'غير محدودة', esSim: 'محاكاة طلب المسافر', esSimSub: 'جرّب مثل ما بيشوفها المسافر: اختر الدول والمدة.',
    esPickCountries: 'الدول اللي بيزورها', esDays: 'عدد الأيام', esMinGb: 'أقل بيانات (GB) — اختياري', esQuote: 'احسب السعر',
    esSingle: 'شريحة وحدة تغطي كل الدول', esCombo: 'شريحة لكل دولة ({n} رموز QR)', esNone: 'ما في باقة تغطي هذا الاختيار.', esUncovered: 'دول ما لها باقات: {c}',
    esTestBuy: 'طلب تجريبي', esTestDone: 'تم إنشاء طلب تجريبي.', esRealConfirm: 'المورّد الحالي حقيقي وبيخصم من رصيدك. متأكد؟',
    esOrderCols: ['التاريخ', 'الدول', 'الأيام', 'السعر', 'الحالة', ''], os_pending_payment: 'بانتظار الدفع', os_paid: 'مدفوع', os_provisioning: 'جاري التفعيل', os_ready: 'جاهزة', os_failed: 'فشل', os_refunded: 'مسترجع', os_cancelled: 'ملغي',
    esShowQr: 'رمز QR', esRetry: 'إعادة المحاولة', esTest: 'تجريبي', esQrTitle: 'رمز تثبيت الشريحة', esManual: 'التثبيت اليدوي', esSmdp: 'عنوان SM-DP+', esCode: 'رمز التفعيل',
    esNoOrders: 'ما في طلبات بعد.', esNoPkgs: 'ما في باقات بعد — اضغط «تحديث الباقات من المورّد».', esNeedKey: 'لتفعيل eSIM Access أضف المفاتيح ESIM_ACCESS_CODE و ESIM_SECRET_KEY في أسرار Supabase (Edge Functions → Secrets).',
    esAppNote: 'في التطبيق (عند التفعيل): المسافر يشتري ويدفع، يوصله إشعار، يمسح QR، ويقدر يرجع للرمز أي وقت من «شرائحي» لو مسحه أو طلع من الشاشة.',
  });
  Object.assign(STR.en, {
    navEsim: 'eSIMs', esTitle: 'Roaming data eSIMs', esSub: 'Travelers pick only the countries they visit and the days; the system picks the cheapest package that covers them instead of a whole continent. Hidden in the app until you enable it.',
    esHidden: '🔒 Hidden in the app', esLive: '🟢 Live in the app', esProvider: 'Supplier', pv_mock: 'Test supplier (no money)', pv_esimaccess: 'eSIM Access',
    esMarkup: 'Margin %', esMinMargin: 'Minimum profit per eSIM (KWD)', esRate: 'USD → KWD rate', esRound: 'Round prices up to (KWD)',
    esEnable: 'Show the service in the app', esEnableWarn: 'Enable only after the supplier agreement is signed and the payment gateway is live.', esSave: 'Save settings', esSaved: 'Saved and prices recalculated.',
    esSync: '🔄 Sync packages from supplier', esSynced: '{n} packages synced.', esBalance: 'Supplier balance', esCheckBal: 'Show balance',
    esPackages: 'Packages', esActive: 'Active', esCountries: 'Countries covered', esOrders: 'Orders', esRevenue: 'Sales', esLastSync: 'Last sync',
    esSearch: 'Search by country code (TR, GB…) or package name', esCols: ['Package', 'Countries', 'Days', 'Data', 'Cost $', 'Price KWD', 'Manual price', 'Active'],
    esUnlimited: 'Unlimited', esSim: 'Traveler quote simulator', esSimSub: 'Try it the way the traveler will: pick countries and days.',
    esPickCountries: 'Countries visited', esDays: 'Days', esMinGb: 'Minimum data (GB) — optional', esQuote: 'Get price',
    esSingle: 'One eSIM covering all countries', esCombo: 'One eSIM per country ({n} QR codes)', esNone: 'No package covers this selection.', esUncovered: 'Countries without packages: {c}',
    esTestBuy: 'Test order', esTestDone: 'Test order created.', esRealConfirm: 'The current supplier is real and will charge your balance. Sure?',
    esOrderCols: ['Date', 'Countries', 'Days', 'Price', 'Status', ''], os_pending_payment: 'Awaiting payment', os_paid: 'Paid', os_provisioning: 'Activating', os_ready: 'Ready', os_failed: 'Failed', os_refunded: 'Refunded', os_cancelled: 'Cancelled',
    esShowQr: 'QR code', esRetry: 'Retry', esTest: 'Test', esQrTitle: 'eSIM install code', esManual: 'Manual install', esSmdp: 'SM-DP+ address', esCode: 'Activation code',
    esNoOrders: 'No orders yet.', esNoPkgs: 'No packages yet — press “Sync packages from supplier”.', esNeedKey: 'To use eSIM Access add ESIM_ACCESS_CODE and ESIM_SECRET_KEY to the Supabase secrets (Edge Functions → Secrets).',
    esAppNote: 'In the app (once enabled): the traveler buys and pays, gets a notification, scans the QR, and can always reopen the code under “My eSIMs” if it was lost or the screen closed.',
  });

  const region = () => { try { return new Intl.DisplayNames([state.lang === 'ar' ? 'ar' : 'en'], { type: 'region' }); } catch { return { of: (c) => c }; } };
  const cname = (c) => { try { return region().of(c) || c; } catch { return c; } };
  const kwd = (n) => `${Number(n).toFixed(3)} ${state.lang === 'ar' ? 'د.ك' : 'KWD'}`;
  const call = async (body) => {
    const { data, error } = await sb.functions.invoke('esim', { body });
    if (error) { let m = error.message; try { m = (await error.context.json()).error || m; } catch {} throw new Error(m); }
    if (data?.error) throw new Error(data.error);
    return data;
  };
  let qrLib = null;
  const qr = async (text) => { qrLib = qrLib || (await import('https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm')).default; return qrLib.toDataURL(text, { width: 260, margin: 1 }); };

  async function viewEsim() {
    const [{ data: s }, { data: ov }, { data: pkgs }, { data: orders }] = await Promise.all([
      sb.from('esim_settings').select('*').eq('id', 1).maybeSingle(),
      sb.rpc('admin_esim_overview'),
      sb.from('esim_packages').select('*').order('price_kwd').limit(2000),
      sb.from('esim_orders').select('*').order('created_at', { ascending: false }).limit(100),
    ]);
    if (!s) return shell('esim', `<p class="notice bad">${esc(state.lang === 'ar' ? 'جداول eSIM ما انضافت لقاعدة البيانات بعد.' : 'eSIM tables are not in the database yet.')}</p>`);
    const o = ov || {};
    const all = [...new Set((pkgs || []).filter((p) => p.active).flatMap((p) => p.countries))].sort((a, b) => cname(a).localeCompare(cname(b)));
    const tile = (k, v) => `<div class="card" style="display:flex;flex-direction:column;gap:4px"><span class="muted" style="font-size:14px">${esc(t(k))}</span><b style="font-size:24px;color:var(--deep)">${esc(v)}</b></div>`;
    const cols = t('esCols');
    const pkgRow = (p) => `<tr data-pkg="${esc(p.package_code)}" data-q="${esc([p.package_code, p.name, ...p.countries, ...p.countries.map(cname)].join(' ').toLowerCase())}">
      <td><b>${esc(p.name)}</b><div class="muted" style="font-size:12px" dir="ltr">${esc(p.package_code)}</div></td>
      <td style="max-width:260px">${p.countries.length > 4 ? `${esc(p.countries.slice(0, 4).map(cname).join('، '))} +${p.countries.length - 4}` : esc(p.countries.map(cname).join('، '))}</td>
      <td>${p.days}</td><td>${p.data_gb == null ? esc(t('esUnlimited')) : `${Number(p.data_gb)} GB`}</td>
      <td dir="ltr">$${Number(p.cost_usd).toFixed(2)}</td><td><b>${esc(kwd(p.price_kwd))}</b></td>
      <td><input type="number" data-ov min="0" step="0.25" value="${p.price_override ?? ''}" style="width:90px" dir="ltr"></td>
      <td><input type="checkbox" data-act ${p.active ? 'checked' : ''} style="width:auto"></td></tr>`;
    const ordRow = (r) => `<tr><td style="white-space:nowrap">${esc(fmtDate(r.created_at))}${r.is_test ? ` <span class="badge">${esc(t('esTest'))}</span>` : ''}</td>
      <td>${esc(r.countries.map(cname).join('، '))}</td><td>${r.days}</td><td>${esc(kwd(r.price_kwd))}</td>
      <td><span class="badge ${r.status === 'ready' ? 'good' : r.status === 'failed' ? 'bad' : 'accent'}" title="${esc(r.error || '')}">${esc(t('os_' + r.status))}</span></td>
      <td>${r.status === 'ready' ? `<button class="btn ghost small" type="button" data-qr="${r.id}">${esc(t('esShowQr'))}</button>` : ''}
          ${['paid', 'provisioning', 'failed'].includes(r.status) ? `<button class="btn ghost small" type="button" data-prov="${r.id}">${esc(t('esRetry'))}</button>` : ''}</td></tr>`;

    shell('esim', `<div class="top"><div><h1>${esc(t('esTitle'))}</h1><p class="muted" style="margin:4px 0 0;max-width:760px">${esc(t('esSub'))}</p></div>
        <span class="badge ${s.enabled_in_app ? 'good' : 'accent'}" style="font-size:14px">${esc(t(s.enabled_in_app ? 'esLive' : 'esHidden'))}</span></div>
      <div class="list">${tile('esPackages', o.packages ?? 0)}${tile('esActive', o.active ?? 0)}${tile('esCountries', o.countries ?? 0)}${tile('esOrders', o.orders ?? 0)}${tile('esRevenue', kwd(o.revenue_kwd ?? 0))}</div>
      <div class="detail" style="margin-top:20px"><section class="col">
        <div class="card" style="display:flex;flex-direction:column;gap:12px"><h2>${esc(t('esSim'))}</h2><p class="muted" style="margin:0">${esc(t('esSimSub'))}</p>
          <label class="f">${esc(t('esPickCountries'))}<select id="sim-c" multiple size="8">${all.map((c) => `<option value="${c}">${esc(cname(c))} (${c})</option>`).join('')}</select></label>
          <div class="row" style="gap:12px"><label class="f" style="width:140px">${esc(t('esDays'))}<input id="sim-d" type="number" min="1" max="365" value="7" dir="ltr"></label>
            <label class="f" style="width:200px">${esc(t('esMinGb'))}<input id="sim-g" type="number" min="0" step="0.5" dir="ltr"></label></div>
          <button class="btn accent" type="button" id="sim-go">${esc(t('esQuote'))}</button>
          <div id="sim-out"></div></div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="row between"><h2>${esc(t('esPackages'))}</h2>
            <span class="muted" style="font-size:13px">${esc(t('esLastSync'))}: ${o.last_sync ? esc(fmtDate(o.last_sync)) : '—'}</span></div>
          <input id="pkg-q" type="search" placeholder="${esc(t('esSearch'))}">
          ${(pkgs || []).length ? `<div class="tbl-wrap" style="max-height:520px;overflow:auto"><table><thead><tr>${cols.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${pkgs.map(pkgRow).join('')}</tbody></table></div>` : `<p class="muted">${esc(t('esNoPkgs'))}</p>`}</div>
        <div class="card"><h2 style="margin-bottom:10px">${esc(t('esOrders'))}</h2>
          ${(orders || []).length ? `<div class="tbl-wrap"><table><thead><tr>${t('esOrderCols').map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${orders.map(ordRow).join('')}</tbody></table></div>` : `<p class="muted">${esc(t('esNoOrders'))}</p>`}</div>
      </section><aside class="col">
        <form class="card" id="es-set" data-keep style="display:flex;flex-direction:column;gap:12px" novalidate><h2>${esc(t('esProvider'))}</h2>
          <label class="f">${esc(t('esProvider'))}<select name="provider">${['mock', 'esimaccess'].map((p) => `<option value="${p}" ${s.provider === p ? 'selected' : ''}>${esc(t('pv_' + p))}</option>`).join('')}</select></label>
          ${s.provider === 'esimaccess' ? '' : `<p class="muted" style="margin:0;font-size:12px">${esc(t('esNeedKey'))}</p>`}
          <div class="row" style="gap:10px"><label class="f grow">${esc(t('esMarkup'))}<input name="markup_pct" type="number" step="0.5" value="${s.markup_pct}" dir="ltr"></label>
            <label class="f grow">${esc(t('esMinMargin'))}<input name="min_margin_kwd" type="number" step="0.05" value="${s.min_margin_kwd}" dir="ltr"></label></div>
          <div class="row" style="gap:10px"><label class="f grow">${esc(t('esRate'))}<input name="usd_to_kwd" type="number" step="0.0001" value="${s.usd_to_kwd}" dir="ltr"></label>
            <label class="f grow">${esc(t('esRound'))}<input name="round_to_kwd" type="number" step="0.05" value="${s.round_to_kwd}" dir="ltr"></label></div>
          <label class="row" style="gap:8px;align-items:flex-start"><input type="checkbox" name="enabled_in_app" ${s.enabled_in_app ? 'checked' : ''} style="width:auto;margin-top:4px"><span><b>${esc(t('esEnable'))}</b><br><span class="muted" style="font-size:12px">${esc(t('esEnableWarn'))}</span></span></label>
          <button class="btn" type="submit">${esc(t('esSave'))}</button></form>
        <div class="card" style="display:flex;flex-direction:column;gap:10px">
          <button class="btn accent" type="button" id="es-sync">${esc(t('esSync'))}</button>
          <div class="row between"><span>${esc(t('esBalance'))}: <b id="es-bal">—</b></span><button class="btn ghost small" type="button" id="es-balbtn">${esc(t('esCheckBal'))}</button></div>
          <p class="muted" style="margin:0;font-size:12px">${esc(t('esAppNote'))}</p></div>
      </aside></div>
      <div id="qr-ov" style="position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:999;display:none;align-items:center;justify-content:center;padding:16px"><div class="card" id="qr-box" style="max-width:420px;width:100%;display:flex;flex-direction:column;gap:10px;align-items:center"></div></div>`);

    document.getElementById('pkg-q')?.addEventListener('input', (e) => { const q = e.target.value.trim().toLowerCase(); document.querySelectorAll('tr[data-q]').forEach((r) => (r.hidden = !!q && !r.dataset.q.includes(q))); });
    document.querySelectorAll('tr[data-pkg]').forEach((tr) => {
      const save = async () => {
        const ov = tr.querySelector('[data-ov]').value.trim();
        const { error } = await sb.from('esim_packages').update({ active: tr.querySelector('[data-act]').checked, price_override: ov ? Number(ov) : null }).eq('package_code', tr.dataset.pkg);
        if (error) return toast(t('errGeneric'));
        await sb.rpc('esim_reprice'); toast(t('saved'));
      };
      tr.querySelector('[data-act]').onchange = save; tr.querySelector('[data-ov]').onchange = save;
    });
    document.getElementById('es-set').onsubmit = async (e) => {
      e.preventDefault();
      const f = e.target; const fd = new FormData(f);
      const row = { provider: fd.get('provider'), markup_pct: Number(fd.get('markup_pct')), min_margin_kwd: Number(fd.get('min_margin_kwd')),
        usd_to_kwd: Number(fd.get('usd_to_kwd')), round_to_kwd: Number(fd.get('round_to_kwd')) || 0.25, enabled_in_app: f.enabled_in_app.checked, updated_at: new Date().toISOString() };
      if (row.enabled_in_app && !s.enabled_in_app && !confirm(t('esEnableWarn'))) return;
      const { error } = await sb.from('esim_settings').update(row).eq('id', 1);
      if (error) return toast(t('errGeneric'));
      await sb.rpc('esim_reprice'); toast(t('esSaved')); viewEsim();
    };
    document.getElementById('es-sync').onclick = async (e) => {
      e.target.disabled = true;
      try { const r = await call({ action: 'sync' }); toast(t('esSynced', { n: r.synced })); viewEsim(); } catch (ex) { toast(ex.message); e.target.disabled = false; }
    };
    document.getElementById('es-balbtn').onclick = async () => {
      try { const r = await call({ action: 'balance' }); document.getElementById('es-bal').textContent = r.balance_usd == null ? '—' : `$${Number(r.balance_usd).toFixed(2)}`; } catch (ex) { toast(ex.message); }
    };
    document.getElementById('sim-go').onclick = async () => {
      const cs = [...document.getElementById('sim-c').selectedOptions].map((x) => x.value);
      const days = Number(document.getElementById('sim-d').value || 0);
      const g = document.getElementById('sim-g').value;
      const out = document.getElementById('sim-out');
      if (!cs.length || !days) return;
      const { data: q, error } = await sb.rpc('esim_quote', { p_countries: cs, p_days: days, p_min_gb: g ? Number(g) : null });
      if (error) { out.innerHTML = `<p class="notice bad">${esc(error.message)}</p>`; return; }
      const line = (p) => `${esc(p.name)} · ${p.days} ${state.lang === 'ar' ? 'يوم' : 'days'} · ${p.data_gb == null ? esc(t('esUnlimited')) : p.data_gb + ' GB'} — <b>${esc(kwd(p.price_kwd))}</b> <span class="muted" dir="ltr">($${Number(p.cost_usd).toFixed(2)})</span>`;
      out.innerHTML = `${q.uncovered?.length ? `<p class="notice bad">${esc(t('esUncovered', { c: q.uncovered.map(cname).join('، ') }))}</p>` : ''}
        ${q.single?.length ? `<h3 style="margin:8px 0 4px">${esc(t('esSingle'))}</h3>${q.single.map((p, i) => `<div class="row between" style="gap:8px;border-top:1px solid var(--line);padding:6px 0"><span>${i === 0 ? '⭐ ' : ''}${line(p)}</span><button class="btn ghost small" type="button" data-buy="single" data-code="${esc(p.package_code)}">${esc(t('esTestBuy'))}</button></div>`).join('')}` : ''}
        ${q.combo ? `<h3 style="margin:12px 0 4px">${esc(t('esCombo', { n: q.combo.items.length }))} — ${esc(kwd(q.combo.price_kwd))}</h3>${q.combo.items.map((p) => `<div style="padding:4px 0">${esc(cname(p.for))}: ${line(p)}</div>`).join('')}<button class="btn ghost small" type="button" data-buy="combo">${esc(t('esTestBuy'))}</button>` : ''}
        ${!q.single?.length && !q.combo ? `<p class="muted">${esc(t('esNone'))}</p>` : ''}`;
      out.querySelectorAll('[data-buy]').forEach((b) => (b.onclick = async () => {
        const real = s.provider !== 'mock';
        if (real && !confirm(t('esRealConfirm'))) return;
        b.disabled = true;
        try { await call({ action: 'test_order', countries: cs, days, min_gb: g ? Number(g) : null, option: b.dataset.buy, package_code: b.dataset.code, confirm_real: real }); toast(t('esTestDone')); viewEsim(); }
        catch (ex) { toast(ex.message); b.disabled = false; }
      }));
    };
    document.querySelectorAll('[data-prov]').forEach((b) => (b.onclick = async () => { b.disabled = true; try { await call({ action: 'provision', order_id: b.dataset.prov }); } catch (ex) { toast(ex.message); } viewEsim(); }));
    const qov = document.getElementById('qr-ov');
    qov.onclick = (e) => { if (e.target === qov) qov.style.display = 'none'; };
    document.querySelectorAll('[data-qr]').forEach((b) => (b.onclick = async () => {
      const { data: ps } = await sb.from('esim_profiles').select('*').eq('order_id', b.dataset.qr).order('created_at');
      const box = document.getElementById('qr-box');
      const parts = await Promise.all((ps || []).map(async (p) => `<div style="text-align:center;border-top:1px solid var(--line);padding-top:8px;width:100%">
        <b>${esc((p.countries || []).map(cname).join('، '))}</b><br>${p.lpa ? `<img src="${await qr(p.lpa)}" alt="QR" style="width:220px;height:220px">` : p.qr_url ? `<img src="${esc(p.qr_url)}" alt="QR" style="width:220px">` : '—'}
        <div class="muted" style="font-size:12px;text-align:start" dir="ltr">ICCID: ${esc(p.iccid || '—')}<br>${esc(t('esSmdp'))}: ${esc(p.smdp || '—')}<br>${esc(t('esCode'))}: ${esc(p.activation_code || '—')}</div></div>`));
      box.innerHTML = `<div class="row between" style="width:100%"><h2 style="margin:0">${esc(t('esQrTitle'))}</h2><button class="btn ghost small" type="button" id="qr-x">✕</button></div>${parts.join('')}`;
      document.getElementById('qr-x').onclick = () => (qov.style.display = 'none');
      qov.style.display = 'flex';
    }));
  }
  return { viewEsim };
}
