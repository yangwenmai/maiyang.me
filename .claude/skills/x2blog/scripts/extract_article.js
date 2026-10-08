// Paste into mcp__Claude_Browser__javascript_tool on an x.com/<user>/status/<id> page
// that holds an X Article. Returns JSON: {url, title, date, cover, md}.
// Images come out as `@@IMG <url> | <alt>` lines for scripts/fetch_images.py.
for (let i = 0; i < 40 && !document.querySelector('.x-article-body'); i++) await new Promise(r => setTimeout(r, 250));
const BODY = document.querySelector('.x-article-body');
function inTag(n, tags) { let p = n.parentElement; while (p && p !== BODY) { if (tags.includes(p.tagName)) return true; p = p.parentElement } return false }
function wrap(c, m) { const x = c.match(/^(\s*)([\s\S]*?)(\s*)$/); return x[2] ? x[1] + m + x[2] + m + x[3] : c }
function inl(n) {
  if (n.nodeType === 3) return n.textContent;
  if (n.nodeType !== 1) return '';
  const t = n.tagName;
  if (t === 'STYLE' || t === 'SCRIPT') return '';
  if (t === 'BR') return '\n';
  if (t === 'IMG') return n.src.includes('pbs.twimg.com/media') ? '\n@@IMG ' + n.src + ' | ' + (n.alt || '') + '\n' : '';
  const c = [...n.childNodes].map(inl).join('');
  if (t === 'B' || t === 'STRONG') return inTag(n, ['B', 'STRONG']) ? c : wrap(c, '**');
  if (t === 'I' || t === 'EM') return inTag(n, ['I', 'EM']) ? c : wrap(c, '*');
  if (t === 'S' || t === 'DEL' || t === 'STRIKE') return wrap(c, '~~');
  if (t === 'CODE' && n.parentElement.tagName !== 'PRE') return '`' + c + '`';
  if (t === 'A') {
    const h = n.href; if (!h) return c; const s = c.trim();
    return (s && s !== h && !h.startsWith(s.replace(/…$/, ''))) ? '[' + s + '](' + h + ')' : h;
  }
  return c;
}
const out = [];
// X Articles put several lines in one <p> separated by <br>; a line that is
// bold only and does not end in punctuation is a section heading.
function push(s) {
  s.split('\n').map(l => l.trim()).filter(Boolean).forEach(l => {
    const m = l.match(/^\*\*([^*]+)\*\*$/);
    if (m && m[1].length <= 70 && !/[.。!?！？:：,，]$/.test(m[1].trim())) out.push('## ' + m[1].trim());
    else out.push(l);
  });
}
function blk(n) {
  if (n.nodeType === 3) { if (n.textContent.trim()) push(n.textContent); return }
  if (n.nodeType !== 1) return;
  const t = n.tagName;
  if (t === 'STYLE' || t === 'SCRIPT') return;
  if (/^H[1-6]$/.test(t)) { out.push('## ' + n.innerText.trim()); return }
  if (t === 'P') { push(inl(n)); return }
  if (t === 'UL' || t === 'OL') { out.push([...n.children].map((li, i) => (t === 'OL' ? (i + 1) + '. ' : '- ') + inl(li).trim().replace(/\n+/g, ' ')).join('\n')); return }
  if (t === 'BLOCKQUOTE') { out.push(inl(n).trim().split('\n').filter(Boolean).map(l => '> ' + l.trim()).join('\n>\n')); return }
  if (t === 'PRE') { out.push('```\n' + n.innerText.replace(/\n$/, '') + '\n```'); return }
  if (t === 'IMG') { if (n.src.includes('pbs.twimg.com/media')) out.push('@@IMG ' + n.src + ' | ' + (n.alt || '')); return }
  if (t === 'VIDEO') { out.push('@@VIDEO ' + (n.poster || '') + ' ' + (n.src || '')); return }
  if (t === 'HR') { out.push('---'); return }
  [...n.childNodes].forEach(blk);
}
blk(BODY);
const cover = [...document.querySelectorAll('main img')].filter(i => i.src.includes('pbs.twimg.com/media') && !BODY.contains(i)).map(i => i.src)[0] || null;
const title = document.querySelector('main h1')?.innerText;
// Shown in the browser's local time zone; check Intl.DateTimeFormat().resolvedOptions().timeZone.
const date = (document.querySelector('main').innerText.match(/\d{1,2}:\d{2} [AP]M · [A-Z][a-z]{2} \d{1,2}, \d{4}/) || [])[0];
JSON.stringify({ url: location.href, title, date, cover, md: out.join('\n\n') })
