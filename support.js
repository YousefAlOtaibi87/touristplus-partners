// Agency ↔ platform admin conversations ("راسل الإدارة"): bug reports, improvement ideas and questions.
// Lives inside the messages page: agencies open a request and reply; the admin answers and closes it.
// All writes go through security-definer functions; RLS limits reads to the owning agency and the admin.
export function installSupport(ctx) {
  const { sb, state, t, esc, fmtDate, toast, STR } = ctx;

  Object.assign(STR.ar, {
    spTitle: 'راسل الإدارة', spSub: 'بلّغنا عن أي خطأ أو خانة تحتاج تعديل، أو اقترح تطوير للبوابة، أو اسأل أي استفسار.',
    spCat: 'نوع الرسالة', spCat_bug: 'خطأ أو خانة تحتاج تعديل', spCat_feature: 'اقتراح تطوير', spCat_question: 'استفسار', spCat_other: 'أخرى',
    spSubject: 'العنوان', spBody: 'الرسالة', spSend: 'إرسال للإدارة', spSent: 'وصلت رسالتك للإدارة، وبيوصلك الرد هنا.',
    spMine: 'رسائلي للإدارة', spNone: 'ما فيه رسائل.', spReply: 'رد', spReplyPh: 'اكتب ردك…', spClose: 'إغلاق', spReopen: 'إعادة فتح',
    st_open: 'بانتظار الرد', st_answered: 'تم الرد', st_closed: 'مغلقة', spNew: 'جديد', spYou: 'أنت', spAdmin: 'إدارة TheTouristPlus',
    spRequired: 'اكتب العنوان والرسالة.', spTooMany: 'وصلت الحد اليومي للرسائل، جرّب باجر.',
    spAdminTitle: 'رسائل المكاتب للإدارة', spAdminSub: 'بلاغات الأخطاء واقتراحات التطوير والاستفسارات من المكاتب. ردّك يوصل المكتب في صفحة رسائل الإدارة.',
    spFilterOpen: 'المفتوحة', spFilterAll: 'الكل',
  });
  Object.assign(STR.en, {
    spTitle: 'Message the platform', spSub: 'Report a bug or a field that needs fixing, suggest an improvement, or ask any question.',
    spCat: 'Type', spCat_bug: 'Bug or field to fix', spCat_feature: 'Improvement idea', spCat_question: 'Question', spCat_other: 'Other',
    spSubject: 'Subject', spBody: 'Message', spSend: 'Send to the platform', spSent: 'Your message reached the platform. The reply will appear here.',
    spMine: 'My messages to the platform', spNone: 'No messages.', spReply: 'Reply', spReplyPh: 'Write your reply…', spClose: 'Close', spReopen: 'Reopen',
    st_open: 'Awaiting reply', st_answered: 'Answered', st_closed: 'Closed', spNew: 'New', spYou: 'You', spAdmin: 'TheTouristPlus team',
    spRequired: 'Write a subject and a message.', spTooMany: 'Daily message limit reached. Try again tomorrow.',
    spAdminTitle: 'Agency messages to the platform', spAdminSub: 'Bug reports, improvement ideas and questions from agencies. Your reply appears on their messages page.',
    spFilterOpen: 'Open', spFilterAll: 'All',
  });

  const CATS = ['bug', 'feature', 'question', 'other'];
  const ST_CLS = { open: 'accent', answered: 'good', closed: '' };
  const isAdmin = () => state.profile?.role === 'admin';
  let adminFilter = 'open';

  // Unread counters for the sidebar badge.
  async function count() {
    const col = isAdmin() ? 'admin_unread' : 'agency_unread';
    const { count: n } = await sb.from('support_threads').select('id', { count: 'exact', head: true }).eq(col, true);
    return n || 0;
  }

  const bubble = (m) => {
    const mine = (m.sender === 'admin') === isAdmin();
    const who = m.sender === 'admin' ? t('spAdmin') : isAdmin() ? '' : t('spYou');
    return `<div class="sp-msg ${m.sender === 'admin' ? 'sp-admin' : 'sp-agency'}${mine ? ' mine' : ''}"><div class="sp-meta">${who ? esc(who) + ' · ' : ''}<span dir="ltr">${esc(fmtDate(m.created_at))}</span></div><div class="sp-body">${esc(m.body)}</div></div>`;
  };

  const threadCard = (th, agencyName) => {
    const unread = isAdmin() ? th.admin_unread : th.agency_unread;
    return `<details class="sp-thread" data-th="${esc(th.id)}"><summary>
      <span class="badge ${ST_CLS[th.status] || ''}">${esc(t('st_' + th.status))}</span>
      ${unread ? `<span class="badge bad">${esc(t('spNew'))}</span>` : ''}
      <b>${esc(th.subject)}</b><span class="muted" style="font-size:12px">${esc(t('spCat_' + th.category))}${agencyName ? ' · ' + esc(agencyName) : ''} · <span dir="ltr">${esc(fmtDate(th.updated_at))}</span></span></summary>
      <div class="sp-conv" data-conv></div>
      <form class="sp-reply" data-reply novalidate><textarea name="body" rows="2" maxlength="5000" dir="auto" placeholder="${esc(t('spReplyPh'))}"></textarea>
        <div class="row" style="gap:8px"><button class="btn small" type="submit">${esc(t('spReply'))}</button>
        ${isAdmin() ? `<button class="btn ghost small" type="button" data-close="${th.status === 'closed' ? '0' : '1'}">${esc(t(th.status === 'closed' ? 'spReopen' : 'spClose'))}</button>` : ''}</div></form></details>`;
  };

  function wire(root, reload) {
    root.querySelectorAll('.sp-thread').forEach((d) => {
      const id = d.dataset.th;
      d.addEventListener('toggle', async () => {
        if (!d.open) return;
        const { data, error } = await sb.from('support_messages').select('sender, body, created_at').eq('thread_id', id).order('id');
        d.querySelector('[data-conv]').innerHTML = error ? `<p class="notice bad">${esc(t('errGeneric'))}</p>` : (data || []).map(bubble).join('');
        sb.rpc('support_read', { p_thread: id }).then(() => { d.querySelector('.badge.bad')?.remove(); ctx.onCount?.(); }, () => {});
      });
      d.querySelector('[data-reply]').onsubmit = async (e) => {
        e.preventDefault();
        const ta = e.target.querySelector('textarea'); const body = ta.value.trim();
        if (!body) return;
        const btn = e.target.querySelector('button[type=submit]'); btn.disabled = true;
        const { error } = await sb.rpc('support_reply', { p_thread: id, p_body: body });
        btn.disabled = false;
        if (error) return toast(t('errGeneric'));
        reload(id);
      };
      const cl = d.querySelector('[data-close]');
      if (cl) cl.onclick = async () => {
        const { error } = await sb.rpc('admin_support_close', { p_thread: id, p_closed: cl.dataset.close === '1' });
        if (error) return toast(t('errGeneric'));
        reload();
      };
    });
  }

  const reopen = (root, id) => { const d = id && root.querySelector(`.sp-thread[data-th="${id}"]`); if (d) d.open = true; };

  // Agency: a form to open a request plus the list of its conversations.
  async function mountAgency(el, openId) {
    if (!el) return;
    const { data: list, error } = await sb.from('support_threads').select('*').order('updated_at', { ascending: false }).limit(100);
    el.innerHTML = `<form class="card" id="sp-form" style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px" novalidate>
        <div><h2 style="margin:0">✉️ ${esc(t('spTitle'))}</h2><p class="muted" style="margin:4px 0 0;font-size:13px">${esc(t('spSub'))}</p></div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;align-items:end">
          <label class="f">${esc(t('spCat'))}<select name="cat">${CATS.map((c) => `<option value="${c}">${esc(t('spCat_' + c))}</option>`).join('')}</select></label>
          <label class="f">${esc(t('spSubject'))}<input name="subject" maxlength="150" dir="auto"></label></div>
        <label class="f">${esc(t('spBody'))}<textarea name="body" rows="4" maxlength="5000" dir="auto"></textarea></label>
        <div><button class="btn" type="submit">${esc(t('spSend'))}</button></div></form>
      <div class="card"><h2 style="margin:0 0 10px">${esc(t('spMine'))}</h2>${error ? `<p class="notice bad">${esc(t('errGeneric'))}</p>` : (list || []).length ? (list || []).map((th) => threadCard(th)).join('') : `<p class="muted">${esc(t('spNone'))}</p>`}</div>`;
    const f = el.querySelector('#sp-form');
    f.onsubmit = async (e) => {
      e.preventDefault();
      const fd = new FormData(f); const subject = String(fd.get('subject') || '').trim(); const body = String(fd.get('body') || '').trim();
      if (subject.length < 2 || !body) return toast(t('spRequired'));
      const btn = f.querySelector('button[type=submit]'); btn.disabled = true;
      const { data: id, error: er } = await sb.rpc('agency_support_new', { p_category: fd.get('cat'), p_subject: subject, p_body: body });
      btn.disabled = false;
      if (er) return toast(/too_many/.test(er.message) ? t('spTooMany') : t('errGeneric'));
      toast(t('spSent'));
      mountAgency(el, id);
    };
    wire(el, (id) => mountAgency(el, id));
    reopen(el, openId);
  }

  // Admin: every agency's conversations, open ones first, with reply and close.
  async function mountAdmin(el, openId) {
    if (!el) return;
    let q = sb.from('support_threads').select('*, agencies(name, name_ar)').order('updated_at', { ascending: false }).limit(200);
    if (adminFilter === 'open') q = q.neq('status', 'closed');
    const { data: list, error } = await q;
    const nm = (a) => (a ? (state.lang === 'ar' ? a.name_ar || a.name : a.name) : '');
    el.innerHTML = `<div class="card" style="margin-bottom:16px"><div class="row between" style="gap:10px;flex-wrap:wrap;margin-bottom:10px">
        <div><h2 style="margin:0">📨 ${esc(t('spAdminTitle'))}</h2><p class="muted" style="margin:4px 0 0;font-size:13px">${esc(t('spAdminSub'))}</p></div>
        <div class="row" style="gap:6px"><button type="button" class="btn small ${adminFilter === 'open' ? '' : 'ghost'}" data-f="open">${esc(t('spFilterOpen'))}</button><button type="button" class="btn small ${adminFilter === 'all' ? '' : 'ghost'}" data-f="all">${esc(t('spFilterAll'))}</button></div></div>
      ${error ? `<p class="notice bad">${esc(t('errGeneric'))}</p>` : (list || []).length ? (list || []).map((th) => threadCard(th, nm(th.agencies))).join('') : `<p class="muted">${esc(t('spNone'))}</p>`}</div>`;
    el.querySelectorAll('[data-f]').forEach((b) => { b.onclick = () => { adminFilter = b.dataset.f; mountAdmin(el); }; });
    wire(el, (id) => mountAdmin(el, id));
    reopen(el, openId);
  }

  return { mountAgency, mountAdmin, count };
}
