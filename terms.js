// Partner agreement: versioned text with data tokens, e-signatures of both parties, signed PDF copy.
import { marked } from 'https://cdn.jsdelivr.net/npm/marked@12.0.2/+esm';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm';

export function installTerms(ctx) {
  const { sb, state, t, esc, fmtDate, shell, toast, STR } = ctx;

  Object.assign(STR.ar, {
    navTerms: 'الاتفاقية', termsTitle: 'اتفاقية الشراكة', termsVersion: 'النسخة {v}', termsPublished: 'نُشرت {d}',
    termsAccept: 'أقرّ بأنني اطّلعت على اتفاقية الشراكة (النسخة {v})، وأوافق عليها نيابةً عن المكتب، وأن لهذا التوقيع الإلكتروني حجية التوقيع.',
    termsSigner: 'اسم المفوَّض بالتوقيع على الاتفاقية *', secTerms: 'اتفاقية الشراكة والتوقيع الإلكتروني', err_terms_required: 'يجب الموافقة على اتفاقية الشراكة وكتابة اسم المفوَّض والتوقيع قبل إرسال الطلب.',
    termsLive: 'تُعبّأ بيانات المكتب في الاتفاقية تلقائياً مما تكتبه في النموذج أعلاه.',
    signHere: 'التوقيع (ارسم توقيعك داخل المربع) *', clearSig: 'مسح التوقيع', sigMissing: 'التوقيع',
    termsEdit: 'نص الاتفاقية', termsEditSub: 'اكتب التعديل بصيغة Markdown. الرموز بين {{ }} تُستبدل تلقائياً ببيانات الطرفين. يُنشئ النشر نسخة جديدة توافق عليها المكاتب الجديدة، وتبقى موافقة المكاتب الحالية على نسختها.',
    preview: 'معاينة', publish: 'نشر نسخة جديدة', publishConfirm: 'هل تريد نشر النسخة {v} من الاتفاقية؟', published: 'تم نشر النسخة الجديدة.', versions: 'النسخ السابقة',
    acceptedOn: 'وقّع على النسخة {v} بتاريخ {d} · {n}', notAccepted: 'لم يوقّع على الاتفاقية',
    platformSec: 'بيانات المنصة وتوقيعها', platformSub: 'تظهر هذه البيانات في الاتفاقية بصفة الطرف الأول، ويُستخدم التوقيع تلقائياً عند الموافقة على أي مكتب.',
    pName: 'اسم الشركة المالكة للمنصة (كما في الرخصة)', pLicense: 'رقم الرخصة التجارية', pAddress: 'العنوان', pSignatory: 'اسم المفوَّض بالتوقيع', pTitle: 'الصفة', pEmail: 'البريد الإلكتروني للمراسلات',
    saveSettings: 'حفظ بيانات المنصة', settingsSaved: 'تم حفظ بيانات المنصة.', needPlatformSig: 'أكمل بيانات المنصة وتوقيعها من صفحة «الاتفاقية» قبل الموافقة.',
    sigTitle: 'التوقيعات', party1: 'الطرف الأول: المنصة', party2: 'الطرف الثاني: المكتب', signedAt: 'تاريخ التوقيع', signer: 'الموقّع',
    signedCopy: 'النسخة الموقّعة من الاتفاقية', download: 'تحميل PDF', pending: 'بانتظار توقيع المنصة', sending: 'جاري توقيع الاتفاقية وإرسالها…',
    sent: 'تم توقيع الاتفاقية وإرسال نسخة للمكتب.', sentNoMail: 'تم توقيع الاتفاقية وحفظها، والمكتب يستطيع تحميلها من البوابة. لم يُرسل البريد لأن خدمة الإرسال غير مفعّلة.',
    resendNotice: 'إعادة إرسال إشعار التوقيع', docNo: 'رقم الاتفاقية', signDlgTitle: 'مراجعة الاتفاقية وتوقيع المنصة', signDlgSub: 'وقّع المكتب على الاتفاقية. راجعها ثم وقّع بصفتك الطرف الأول لاعتمادها وتفعيل المكتب.', close: 'إغلاق', useSavedSig: 'استخدام التوقيع المحفوظ', platformConfirm: 'أقرّ بصفتي المفوَّض بالتوقيع عن المنصة بمراجعة الاتفاقية والموافقة عليها، وأن لهذا التوقيع الإلكتروني حجية التوقيع.', signApprove: 'توقيع الاتفاقية واعتماد المكتب', sigRequired: 'ارسم توقيعك أولاً.', confirmRequired: 'أشّر على الإقرار قبل التوقيع.', reviewSign: 'مراجعة الاتفاقية والتوقيع', agencyNotSigned: 'لا يمكن توقيع المنصة قبل توقيع المكتب على الاتفاقية.',
  });
  Object.assign(STR.en, {
    navTerms: 'Agreement', termsTitle: 'Partnership agreement', termsVersion: 'Version {v}', termsPublished: 'Published {d}',
    termsAccept: 'I confirm I have read the partnership agreement (version {v}) and accept it on behalf of the agency; this electronic signature has the effect of a signature.',
    termsSigner: 'Name of the authorized signatory *', secTerms: 'Partnership agreement & e-signature', err_terms_required: 'You must accept the agreement, enter the signatory name and sign before submitting.',
    termsLive: 'Your agency details are filled into the agreement automatically from the form above.',
    signHere: 'Signature (draw inside the box) *', clearSig: 'Clear signature', sigMissing: 'Signature',
    termsEdit: 'Agreement text', termsEditSub: 'Write changes in Markdown. Tokens in {{ }} are replaced with both parties’ details. Publishing creates a new version for new agencies; existing agencies keep their signed version.',
    preview: 'Preview', publish: 'Publish new version', publishConfirm: 'Publish version {v} of the agreement?', published: 'New version published.', versions: 'Previous versions',
    acceptedOn: 'Signed version {v} on {d} · {n}', notAccepted: 'Has not signed the agreement',
    platformSec: 'Platform details & signature', platformSub: 'Shown in the agreement as the first party; the signature is applied automatically when you approve an agency.',
    pName: 'Company owning the platform (as on license)', pLicense: 'Commercial license no.', pAddress: 'Address', pSignatory: 'Authorized signatory', pTitle: 'Title', pEmail: 'Correspondence email',
    saveSettings: 'Save platform details', settingsSaved: 'Platform details saved.', needPlatformSig: 'Complete the platform details and signature on the Agreement page before approving.',
    sigTitle: 'Signatures', party1: 'First party: Platform', party2: 'Second party: Agency', signedAt: 'Signed on', signer: 'Signatory',
    signedCopy: 'Signed copy of the agreement', download: 'Download PDF', pending: 'Awaiting platform signature', sending: 'Signing and sending the agreement…',
    sent: 'Agreement signed and a copy sent to the agency.', sentNoMail: 'Agreement signed and saved; the agency can download it from the portal. Email was not sent because the mail service is not set up.',
    resendNotice: 'Resend signing notice', docNo: 'Agreement no.', signDlgTitle: 'Review agreement & platform signature', signDlgSub: 'The agency has signed. Review the agreement, then sign as the first party to approve and activate the agency.', close: 'Close', useSavedSig: 'Use saved signature', platformConfirm: 'As the platform’s authorized signatory, I confirm I reviewed and accept this agreement; this electronic signature has the effect of a signature.', signApprove: 'Sign agreement & approve agency', sigRequired: 'Draw your signature first.', confirmRequired: 'Tick the confirmation before signing.', reviewSign: 'Review agreement & sign', agencyNotSigned: 'The platform cannot sign before the agency has signed the agreement.',
  });

  const md = (s) => DOMPurify.sanitize(marked.parse(s || ''));
  const latest = async () => (await sb.from('partner_terms').select('*').order('version', { ascending: false }).limit(1).maybeSingle()).data;
  const getSettings = async () => (await sb.from('platform_settings').select('*').eq('id', 1).maybeSingle()).data || {};
  const blank = (v) => (v && String(v).trim() ? String(v).trim() : '……………');

  // Replace {{tokens}} with both parties' details.
  function fill(body, a, ps, version) {
    const map = {
      platform_name: ps.company_name, platform_license: ps.license_no, platform_address: ps.address, platform_signatory: ps.signatory_name,
      agency_name: a.company_name_ar ? `${a.company_name_ar} (${a.company_name || ''})` : a.company_name, agency_license: a.license_no,
      agency_address: a.address, agency_paci: a.paci_no, agency_signatory: a.terms_signer || a.signatory_name,
      agency_bank: a.bank_name, agency_iban: a.iban, commission: a.commission_rate ?? '……', version,
    };
    return (body || '').replace(/\{\{(\w+)\}\}/g, (_, k) => (k in map ? blank(map[k]).replace(/[|*_[\]]/g, ' ') : `{{${k}}}`));
  }

  // ---------- signature pad
  function sigPad(el) {
    const c = el.querySelector('canvas');
    const ratio = window.devicePixelRatio || 1;
    const size = () => { const w = c.clientWidth; c.width = w * ratio; c.height = 160 * ratio; const g = c.getContext('2d'); g.scale(ratio, ratio); g.lineWidth = 2.2; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#0B3D91'; };
    size();
    c.addEventListener('padresize', size);
    let drawing = false, dirty = false, last = null;
    const pos = (e) => { const r = c.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: p.clientX - r.left, y: p.clientY - r.top }; };
    const start = (e) => { if (el.closest('[disabled]')) return; drawing = true; last = pos(e); e.preventDefault(); };
    const move = (e) => {
      if (!drawing) return;
      const p = pos(e), g = c.getContext('2d');
      g.beginPath(); g.moveTo(last.x, last.y); g.lineTo(p.x, p.y); g.stroke(); last = p; dirty = true; e.preventDefault();
      el.classList.remove('invalid');
    };
    const end = () => { drawing = false; };
    c.addEventListener('pointerdown', start); c.addEventListener('pointermove', move); window.addEventListener('pointerup', end);
    c.style.touchAction = 'none';
    el.querySelector('[data-clear]')?.addEventListener('click', () => { size(); dirty = false; });
    return { has: () => dirty, data: () => (dirty ? trimmed(c) : null), canvas: c };
  }
  // Crop to the drawn area and return a compact PNG.
  function trimmed(c) {
    const g = c.getContext('2d'); const { width: w, height: h } = c; const d = g.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = 0, y1 = 0;
    for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) if (d[(y * w + x) * 4 + 3] > 0) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
    if (x1 <= x0) return null;
    const pad = 8, out = document.createElement('canvas');
    out.width = Math.min(w, x1 - x0 + pad * 2); out.height = Math.min(h, y1 - y0 + pad * 2);
    out.getContext('2d').drawImage(c, x0 - pad, y0 - pad, out.width, out.height, 0, 0, out.width, out.height);
    return out.toDataURL('image/png');
  }
  const padHtml = (label) => `<div class="f sigbox" data-docbox="signature_pad" style="gap:6px"><span style="font-size:14px;font-weight:600;color:#3C4E50">${esc(t(label))}</span>
    <canvas style="width:100%;height:160px;border:1.5px dashed #94A3B8;border-radius:12px;background:#fff;cursor:crosshair"></canvas>
    <button class="btn ghost small" type="button" data-clear style="align-self:flex-start">${esc(t('clearSig'))}</button></div>`;

  // ---------- the signed document (used on screen and for the PDF)
  function contractHTML(a, ps, terms, opts = {}) {
    const sigCell = (title, name, img, date, extra = '') => `<td style="width:50%;vertical-align:top;padding:12px;border:1px solid #E2E8F0">
      <div style="font-weight:800;color:#0B3D91;margin-bottom:6px">${esc(title)}</div>
      <div>${esc(t('signer'))}: ${esc(name || '—')}${extra}</div>
      <div style="height:90px;display:flex;align-items:center">${img ? `<img src="${img}" alt="" style="max-height:86px;max-width:100%">` : `<span style="color:#94A3B8">${esc(t('pending'))}</span>`}</div>
      <div style="color:#64748B;font-size:12px">${esc(t('signedAt'))}: ${date ? esc(new Date(date).toLocaleString('ar-KW')) : '—'}</div></td>`;
    return `<div dir="rtl" class="terms-body contract-doc" style="font-family:'IBM Plex Sans Arabic',system-ui,sans-serif;color:#0F172A;line-height:1.8;font-size:14px">
      <style>.contract-doc table{width:100%;table-layout:fixed;border-collapse:collapse;margin:8px 0}.contract-doc td,.contract-doc th{border:1px solid #E2E8F0;padding:6px 8px;text-align:start;vertical-align:top;overflow-wrap:anywhere;white-space:normal}
      .contract-doc th{background:#F1F5F9}.contract-doc h1{font-size:20px;margin:0 0 10px}.contract-doc h2{font-size:16px;color:#0B3D91;margin:18px 0 6px}.contract-doc ol,.contract-doc ul{padding-inline-start:22px;margin:6px 0 10px}.contract-doc p{margin:0 0 10px}.contract-doc li{margin-bottom:4px}</style>
      <table style="border:0;margin:0 0 14px;border-bottom:3px solid #C0392B"><tr>
        <td style="border:0;padding:0 0 10px;font-weight:800;font-size:20px;color:#0B3D91"><span dir="ltr">TheTourist<span style="color:#C0392B">Plus</span></span></td>
        <td style="border:0;padding:0 0 10px;font-size:12px;color:#64748B;text-align:left"><span dir="ltr">TTP-${esc((a.id || '').slice(0, 8).toUpperCase())}-V${esc(terms.version)}</span> :${esc(t('docNo'))}</td>
      </tr></table>
      ${md(fill(terms.body, a, ps, terms.version))}
      <div><h2>${esc(t('sigTitle'))}</h2>
      <table><tr>
        ${sigCell(t('party1'), ps.signatory_name, opts.platformSig ? ps.signature : null, a.platform_signed_at, ps.signatory_title ? ` — ${esc(ps.signatory_title)}` : '')}
        ${sigCell(t('party2'), a.terms_signer, a.terms_signature, a.terms_accepted_at)}
      </tr></table></div></div>`;
  }

  // ---------- application form section
  async function termsSection(app, locked) {
    const v = await latest();
    if (!v) return '';
    const done = app.terms_version === v.version && app.terms_accepted_at;
    return `<fieldset class="card" style="display:flex;flex-direction:column;gap:12px" ${locked ? 'disabled' : ''} data-terms="${v.version}">
      <legend style="font-weight:800;color:var(--deep);padding:0 6px">${esc(t('secTerms'))} · ${esc(t('termsVersion', { v: v.version }))}</legend>
      <p class="muted" style="margin:0;font-size:13px">${esc(t('termsLive'))}</p>
      <div class="terms-live" style="max-height:380px;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:12px 16px;background:#fff"></div>
      <label class="f">${esc(t('termsSigner'))}<input name="terms_signer" value="${esc(app.terms_signer || app.signatory_name || '')}"></label>
      ${locked && app.terms_signature ? `<img src="${app.terms_signature}" alt="" style="max-height:90px;align-self:flex-start">` : padHtml('signHere')}
      <label class="chip ${done || locked ? 'on' : ''}" data-docbox="terms" style="align-self:stretch;border-radius:12px;white-space:normal;line-height:1.6">
        <input type="checkbox" name="terms_ok" ${done || locked ? 'checked' : ''}> ${esc(t('termsAccept', { v: v.version }))}</label>
    </fieldset>`;
  }
  // Wire the live contract preview + signature pad after the form is in the DOM.
  async function mount(form, app) {
    const box = form.querySelector('[data-terms]');
    if (!box) return null;
    const [v, ps] = [await latest(), await getSettings()];
    const live = box.querySelector('.terms-live');
    const read = () => {
      const fd = new FormData(form); const a = { ...app };
      ['company_name', 'company_name_ar', 'license_no', 'address', 'paci_no', 'bank_name', 'iban', 'terms_signer', 'signatory_name'].forEach((k) => { if (fd.has(k)) a[k] = String(fd.get(k) || '').trim(); });
      return a;
    };
    const render = () => { live.innerHTML = md(fill(v.body, read(), ps, v.version)); };
    render();
    let tm; form.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(render, 300); });
    const padEl = box.querySelector('.sigbox');
    return padEl ? sigPad(padEl) : null;
  }

  // ---------- PDF (browser-native rendering keeps Arabic shaping and direction correct)
  let libs = null;
  const loadLibs = () => libs || (libs = Promise.all([
    import('https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/+esm'),
    import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm'),
  ]));
  async function pdfBlob(html) {
    const [h2i, jsp] = await loadLibs();
    const JsPDF = jsp.jsPDF || jsp.default?.jsPDF || jsp.default;
    const W = 794, H = 1123, PAD = 44, FOOT = 28;
    const stage = document.createElement('div');
    stage.style.cssText = 'position:fixed;left:-20000px;top:0;';
    document.body.appendChild(stage);
    const src = document.createElement('div'); src.innerHTML = html; const doc = src.firstElementChild;
    const blocks = [...doc.children];
    const pages = [];
    const newPage = () => {
      const pg = document.createElement('div');
      pg.style.cssText = `width:${W}px;height:${H}px;padding:${PAD}px ${PAD}px ${PAD + FOOT}px;box-sizing:border-box;background:#fff;overflow:hidden;position:relative`;
      const inner = doc.cloneNode(false); inner.style.height = '100%'; inner.style.overflow = 'hidden';
      pg.appendChild(inner); stage.appendChild(pg); pages.push(pg); return inner;
    };
    let inner = newPage();
    const fits = () => inner.scrollHeight <= inner.clientHeight + 1;
    for (const b of blocks) {
      inner.appendChild(b);
      if (fits()) continue;
      if ((b.tagName === 'OL' || b.tagName === 'UL') && b.children.length > 1) {
        // split a long list item by item, keeping numbering
        const items = [...b.children]; b.innerHTML = '';
        let list = b, n = Number(b.getAttribute('start') || 1);
        for (const li of items) {
          list.appendChild(li);
          if (!fits() && list.children.length > 1) {
            list.removeChild(li); inner = newPage();
            list = b.cloneNode(false); if (b.tagName === 'OL') list.setAttribute('start', n);
            list.appendChild(li); inner.appendChild(list);
          }
          n++;
        }
        continue;
      }
      inner.removeChild(b); inner = newPage(); inner.appendChild(b);
    }
    try { await document.fonts?.ready; } catch {}
    const pdf = new JsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
    const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
    try {
      for (let i = 0; i < pages.length; i++) {
        const foot = document.createElement('div');
        foot.style.cssText = `position:absolute;left:${PAD}px;right:${PAD}px;bottom:${PAD - 10}px;display:flex;justify-content:space-between;font:12px system-ui,sans-serif;color:#64748B;border-top:1px solid #E2E8F0;padding-top:6px`;
        foot.innerHTML = `<span dir="ltr">TheTouristPlus</span><span dir="ltr">${i + 1} / ${pages.length}</span>`;
        pages[i].appendChild(foot);
        const img = await h2i.toJpeg(pages[i], { pixelRatio: 2, quality: 0.92, backgroundColor: '#ffffff', cacheBust: false });
        if (i) pdf.addPage();
        pdf.addImage(img, 'JPEG', 0, 0, pw, ph);
      }
      return pdf.output('blob');
    } finally { stage.remove(); }
  }

  // Called right after the admin approves an application: platform signs, PDF is stored and emailed.
  async function signAndSend(appId, sigOverride) {
    toast(t('sending'));
    const ps = { ...(await getSettings()) };
    if (sigOverride) ps.signature = sigOverride;
    if (!ps.signature || !ps.company_name || !ps.signatory_name) { toast(t('needPlatformSig')); return false; }
    const { data: a0 } = await sb.from('partner_applications').select('*').eq('id', appId).maybeSingle();
    if (!a0?.terms_version || !a0?.terms_signature || !a0?.terms_accepted_at) { toast(t('agencyNotSigned')); return false; }
    const now = new Date().toISOString();
    const a = { ...a0, platform_signed_at: now };
    const { data: terms } = await sb.from('partner_terms').select('*').eq('version', a.terms_version).maybeSingle();
    const blob = await pdfBlob(contractHTML(a, ps, terms, { platformSig: true }));
    const path = `${a.user_id}/agreement-v${terms.version}-signed-${Date.now()}.pdf`;
    const up = await sb.storage.from('partner-docs').upload(path, blob, { contentType: 'application/pdf' });
    if (up.error) { console.error(up.error); toast(t('errGeneric')); return false; }
    await sb.from('partner_applications').update({ platform_signed_at: now, platform_signer: ps.signatory_name, contract_path: path }).eq('id', appId);
    const { data: r, error } = await sb.functions.invoke('send-contract', { body: { app_id: appId } });
    toast(!error && r?.ok ? t('sent') : t('sentNoMail'));
    return true;
  }

  // Admin reviews the agency-signed contract and signs it as the platform.
  async function openSignDialog(appId, rate, approve, onDone) {
    const ps = await getSettings();
    const { data: a0 } = await sb.from('partner_applications').select('*').eq('id', appId).maybeSingle();
    if (!a0?.terms_signature || !a0?.terms_accepted_at) { toast(t('agencyNotSigned')); return; }
    const { data: terms } = await sb.from('partner_terms').select('*').eq('version', a0.terms_version).maybeSingle();
    const a = { ...a0, commission_rate: rate };
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:999;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:24px 12px';
    ov.innerHTML = `<div class="card" role="dialog" aria-modal="true" style="max-width:860px;width:100%;display:flex;flex-direction:column;gap:14px">
      <div class="row between"><h2 style="margin:0">${esc(t('signDlgTitle'))}</h2><button class="btn ghost small" type="button" data-x>${esc(t('close'))}</button></div>
      <p class="muted" style="margin:0">${esc(t('signDlgSub'))}</p>
      <div style="max-height:48vh;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:12px 16px;background:#fff">${contractHTML(a, ps, terms, { platformSig: false })}</div>
      <div class="f" style="gap:4px"><b>${esc(t('party1'))}</b><span class="muted">${esc(ps.company_name || '—')} · ${esc(t('signer'))}: ${esc(ps.signatory_name || '—')}${ps.signatory_title ? ' — ' + esc(ps.signatory_title) : ''}</span></div>
      ${ps.signature ? `<label class="chip on" style="align-self:flex-start"><input type="checkbox" data-saved checked> ${esc(t('useSavedSig'))}</label><img src="${ps.signature}" alt="" data-savedimg style="max-height:80px;align-self:flex-start">` : ''}
      <div data-padwrap ${ps.signature ? 'hidden' : ''}>${padHtml('signHere')}</div>
      <label class="chip" data-docbox="pconfirm" style="align-self:stretch;border-radius:12px;white-space:normal;line-height:1.6"><input type="checkbox" data-confirm> ${esc(t('platformConfirm'))}</label>
      <p class="notice bad" data-err hidden></p>
      <button class="btn accent" type="button" data-sign>✍️ ${esc(t('signApprove'))}</button></div>`;
    document.body.appendChild(ov);
    const close = () => ov.remove();
    ov.querySelector('[data-x]').onclick = close;
    const padWrap = ov.querySelector('[data-padwrap]');
    const pad = sigPad(padWrap.querySelector('.sigbox'));
    const saved = ov.querySelector('[data-saved]');
    if (saved) saved.onchange = () => { padWrap.hidden = saved.checked; ov.querySelector('[data-savedimg]').hidden = !saved.checked; if (!saved.checked) pad.canvas.dispatchEvent(new Event('padresize')); };
    ov.querySelector('[data-sign]').onclick = async (e) => {
      const err = ov.querySelector('[data-err]');
      const useSaved = saved?.checked && ps.signature;
      const sig = useSaved ? ps.signature : pad.data();
      if (!sig) { err.textContent = t('sigRequired'); err.hidden = false; return; }
      if (!ov.querySelector('[data-confirm]').checked) { err.textContent = t('confirmRequired'); err.hidden = false; return; }
      if (!ps.company_name || !ps.signatory_name) { err.textContent = t('needPlatformSig'); err.hidden = false; return; }
      e.target.disabled = true;
      if (!useSaved) await sb.from('platform_settings').update({ signature: sig, updated_at: new Date().toISOString() }).eq('id', 1);
      const ok = await approve();
      if (ok) await signAndSend(appId, sig);
      close(); onDone?.();
    };
  }

  async function openSigned(path) {
    const { data, error } = await sb.storage.from('partner-docs').createSignedUrl(path, 300);
    if (error) return toast(t('errGeneric'));
    window.open(data.signedUrl, '_blank', 'noopener');
  }

  // ---------- Agreement page
  async function viewTerms() {
    const isAdmin = state.profile?.role === 'admin';
    const ps = await getSettings();
    if (!isAdmin) {
      const { data: a } = await sb.from('partner_applications').select('*').eq('user_id', state.session.user.id).maybeSingle();
      const terms = a?.terms_version ? (await sb.from('partner_terms').select('*').eq('version', a.terms_version).maybeSingle()).data : await latest();
      if (!terms) return shell('terms', `<div class="card empty">—</div>`);
      shell('terms', `<div class="top"><div><h1>${esc(t('termsTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('termsVersion', { v: terms.version }))}</p></div>
        ${a?.contract_path ? `<button class="btn accent" type="button" id="dl">${esc(t('download'))}</button>` : ''}</div>
        <div class="card">${a ? contractHTML(a, ps, terms, { platformSig: !!a.platform_signed_at }) : md(terms.body)}</div>`);
      document.getElementById('dl')?.addEventListener('click', () => openSigned(a.contract_path));
      return;
    }
    const { data: all } = await sb.from('partner_terms').select('*').order('version', { ascending: false });
    const cur = (all || [])[0];
    const sample = { id: 'sample', company_name: 'Sample Travel Co.', company_name_ar: 'شركة نموذجية للسفر', license_no: '1234/2024', address: 'الكويت، شرق', paci_no: '12345678',
      terms_signer: 'اسم المفوَّض', bank_name: 'بنك الكويت الوطني', iban: 'KW00NBOK0000000000000000000000', commission_rate: 10 };
    const f = (k, n, v) => `<label class="f">${esc(t(k))}<input name="${n}" value="${esc(v || '')}"></label>`;
    shell('terms', `<div class="top"><div><h1>${esc(t('termsTitle'))}</h1><p class="muted" style="margin:4px 0 0">${cur ? `${esc(t('termsVersion', { v: cur.version }))} · ${esc(t('termsPublished', { d: fmtDate(cur.published_at) }))}` : ''}</p></div></div>
      <form id="ps-form" class="card" style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px">
        <h2>${esc(t('platformSec'))}</h2><p class="muted" style="margin:0;font-size:13px">${esc(t('platformSub'))}</p>
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${f('pName', 'company_name', ps.company_name)}</div><div class="grow">${f('pLicense', 'license_no', ps.license_no)}</div></div>
        ${f('pAddress', 'address', ps.address)}
        <div class="row" style="gap:12px;align-items:flex-start"><div class="grow">${f('pSignatory', 'signatory_name', ps.signatory_name)}</div><div class="grow">${f('pTitle', 'signatory_title', ps.signatory_title)}</div><div class="grow">${f('pEmail', 'email', ps.email)}</div></div>
        ${ps.signature ? `<img src="${ps.signature}" alt="" style="max-height:90px;align-self:flex-start">` : ''}
        ${padHtml('signHere')}
        <button class="btn" type="submit">${esc(t('saveSettings'))}</button>
      </form>
      ${cur ? `<div class="detail">
        <section class="col"><div class="card" style="display:flex;flex-direction:column;gap:10px">
          <h2>${esc(t('termsEdit'))}</h2><p class="muted" style="margin:0;font-size:13px">${esc(t('termsEditSub'))}</p>
          <textarea id="terms-src" dir="rtl" style="min-height:520px;font-family:ui-monospace,Menlo,monospace;font-size:13px;line-height:1.7">${esc(cur.body)}</textarea>
          <button class="btn accent" type="button" id="terms-pub">${esc(t('publish'))}</button>
          ${(all || []).length > 1 ? `<p class="muted" style="margin:0;font-size:13px">${esc(t('versions'))}: ${(all || []).slice(1).map((x) => `${t('termsVersion', { v: x.version })} (${fmtDate(x.published_at)})`).map(esc).join(' · ')}</p>` : ''}
        </div></section>
        <section class="col"><div class="card"><h2 style="margin-bottom:8px">${esc(t('preview'))}</h2><div id="terms-prev"></div></div></section>
      </div>` : ''}`);
    const pad = sigPad(document.querySelector('#ps-form .sigbox'));
    document.getElementById('ps-form').onsubmit = async (e) => {
      e.preventDefault();
      const row = Object.fromEntries(new FormData(e.target)); delete row.terms_ok;
      Object.keys(row).forEach((k) => { row[k] = String(row[k]).trim() || null; });
      if (pad.has()) row.signature = pad.data();
      row.updated_at = new Date().toISOString();
      const { error } = await sb.from('platform_settings').update(row).eq('id', 1);
      toast(error ? t('errGeneric') : t('settingsSaved'));
      viewTerms();
    };
    if (!cur) return;
    const src = document.getElementById('terms-src');
    const prev = () => { document.getElementById('terms-prev').innerHTML = contractHTML({ ...sample, terms_accepted_at: null }, ps, { body: src.value, version: cur.version }, { platformSig: true }); };
    prev(); src.oninput = prev;
    document.getElementById('terms-pub').onclick = async (e) => {
      const next = cur.version + 1;
      if (!src.value.trim() || src.value === cur.body) return;
      if (!confirm(t('publishConfirm', { v: next }))) return;
      e.target.disabled = true;
      const { error } = await sb.from('partner_terms').insert({ version: next, body: src.value });
      toast(error ? t('errGeneric') : t('published'));
      viewTerms();
    };
  }

  return { termsSection, mount, viewTerms, signAndSend, openSigned, openSignDialog, contractHTML, pdfBlob };
}
