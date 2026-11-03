// Partner agreement: versioned text in partner_terms, admin edits & publishes, agencies accept on application.
import { marked } from 'https://cdn.jsdelivr.net/npm/marked@12.0.2/+esm';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm';

export function installTerms(ctx) {
  const { sb, state, t, esc, fmtDate, shell, toast, STR } = ctx;

  Object.assign(STR.ar, {
    navTerms: 'الاتفاقية', termsTitle: 'اتفاقية الشراكة', termsVersion: 'النسخة {v}', termsPublished: 'نُشرت {d}',
    termsAccept: 'قرأت اتفاقية الشراكة (النسخة {v}) وأوافق عليها نيابةً عن المكتب، وموافقتي هذي لها أثر التوقيع.',
    termsSigner: 'اسم المفوّض اللي يوافق على الاتفاقية *', secTerms: 'اتفاقية الشراكة', err_terms_required: 'لازم توافق على اتفاقية الشراكة وتكتب اسم المفوّض قبل الإرسال.',
    termsEdit: 'تعديل الاتفاقية', termsEditSub: 'اكتب التعديل بصيغة Markdown (## للعناوين، 1. للبنود، | للجداول). النشر يسوي نسخة جديدة، والمكاتب الجديدة توافق عليها. المكاتب الحالية تبقى موافقتها على نسختها.',
    preview: 'معاينة', publish: 'نشر نسخة جديدة', publishConfirm: 'تنشر النسخة {v} من الاتفاقية؟', published: 'تم نشر النسخة الجديدة.', versions: 'النسخ السابقة',
    acceptedOn: 'وافق على النسخة {v} بتاريخ {d} · {n}', notAccepted: 'ما وافق على الاتفاقية',
  });
  Object.assign(STR.en, {
    navTerms: 'Agreement', termsTitle: 'Partnership agreement', termsVersion: 'Version {v}', termsPublished: 'Published {d}',
    termsAccept: 'I have read the partnership agreement (version {v}) and accept it on behalf of the agency; this acceptance has the effect of a signature.',
    termsSigner: 'Name of the authorized person accepting *', secTerms: 'Partnership agreement', err_terms_required: 'You must accept the partnership agreement and enter the authorized name before submitting.',
    termsEdit: 'Edit agreement', termsEditSub: 'Write changes in Markdown (## headings, 1. clauses, | tables). Publishing creates a new version that new agencies accept. Existing agencies keep their accepted version.',
    preview: 'Preview', publish: 'Publish new version', publishConfirm: 'Publish version {v} of the agreement?', published: 'New version published.', versions: 'Previous versions',
    acceptedOn: 'Accepted version {v} on {d} · {n}', notAccepted: 'Has not accepted the agreement',
  });

  const md = (s) => DOMPurify.sanitize(marked.parse(s || ''));
  const latest = async () => (await sb.from('partner_terms').select('*').order('version', { ascending: false }).limit(1).maybeSingle()).data;

  // Box shown at the end of the application form.
  async function termsSection(app, locked) {
    const v = await latest();
    if (!v) return '';
    const done = app.terms_version === v.version && app.terms_accepted_at;
    return `<fieldset class="card" style="display:flex;flex-direction:column;gap:12px" ${locked ? 'disabled' : ''} data-terms="${v.version}">
      <legend style="font-weight:800;color:var(--deep);padding:0 6px">${esc(t('secTerms'))} · ${esc(t('termsVersion', { v: v.version }))}</legend>
      <div class="terms-body" style="max-height:340px;overflow:auto;border:1px solid var(--line);border-radius:12px;padding:12px 16px;background:#fff">${md(v.body)}</div>
      <label class="f">${esc(t('termsSigner'))}<input name="terms_signer" value="${esc(app.terms_signer || app.signatory_name || '')}"></label>
      <label class="chip ${done || locked ? 'on' : ''}" data-docbox="terms" style="align-self:stretch;border-radius:12px;white-space:normal;line-height:1.6">
        <input type="checkbox" name="terms_ok" ${done || locked ? 'checked' : ''}> ${esc(t('termsAccept', { v: v.version }))}</label>
    </fieldset>`;
  }

  async function viewTerms() {
    const isAdmin = state.profile?.role === 'admin';
    const { data: all } = await sb.from('partner_terms').select('*').order('version', { ascending: false });
    const cur = (all || [])[0];
    if (!cur) return shell('terms', `<div class="card empty">—</div>`);
    const head = `<div class="top"><div><h1>${esc(t('termsTitle'))}</h1><p class="muted" style="margin:4px 0 0">${esc(t('termsVersion', { v: cur.version }))} · ${esc(t('termsPublished', { d: fmtDate(cur.published_at) }))}</p></div></div>`;
    if (!isAdmin) return shell('terms', `${head}<div class="card terms-body">${md(cur.body)}</div>`);
    shell('terms', `${head}
      <div class="detail">
        <section class="col"><div class="card" style="display:flex;flex-direction:column;gap:10px">
          <h2>${esc(t('termsEdit'))}</h2><p class="muted" style="margin:0;font-size:13px">${esc(t('termsEditSub'))}</p>
          <textarea id="terms-src" dir="rtl" style="min-height:520px;font-family:ui-monospace,Menlo,monospace;font-size:13px;line-height:1.7">${esc(cur.body)}</textarea>
          <button class="btn accent" type="button" id="terms-pub">${esc(t('publish'))}</button>
          ${(all || []).length > 1 ? `<p class="muted" style="margin:0;font-size:13px">${esc(t('versions'))}: ${(all || []).slice(1).map((x) => `${t('termsVersion', { v: x.version })} (${fmtDate(x.published_at)})`).map(esc).join(' · ')}</p>` : ''}
        </div></section>
        <section class="col"><div class="card"><h2 style="margin-bottom:8px">${esc(t('preview'))}</h2><div id="terms-prev" class="terms-body">${md(cur.body)}</div></div></section>
      </div>`);
    const src = document.getElementById('terms-src');
    src.oninput = () => { document.getElementById('terms-prev').innerHTML = md(src.value); };
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

  return { termsSection, viewTerms };
}
