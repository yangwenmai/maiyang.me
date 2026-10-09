// Paste into mcp__Claude_Browser__javascript_tool on an x.com/<user>/status/<id> page.
// Returns "id,views,replies,reposts,likes,bookmarks" for the post's `x:` front matter.
// X shows no number next to a button when the count is 0; "139K" style counts are approximate.
for (let i = 0; i < 40 && !document.querySelector('main [aria-label="Bookmark"]'); i++) await new Promise(r => setTimeout(r, 250));
const num = s => {
  s = (s || '').trim().replace(/,/g, '');
  if (!s) return 0;
  const m = s.match(/^([\d.]+)([KM]?)$/);
  if (!m) return null;
  return Math.round(+m[1] * ({ K: 1e3, M: 1e6 }[m[2]] || 1));
};
const get = l => num(document.querySelector(`main [aria-label="${l}"]`)?.innerText);
const v = (document.querySelector('main').innerText.match(/\n([\d.,]+[KM]?)\nViews/) || [])[1];
[location.pathname.split('/').pop(), num(v), get('Reply'), get('Repost'), get('Like'), get('Bookmark')].join(',')
