"""Replace `@@IMG <url> | <alt>` lines in a post with downloaded images.

Usage: python3 -I fetch_images.py <repo_root> <post.md> [<post.md> ...]
"""
import re
import sys
import urllib.parse
import urllib.error
import urllib.request
import time
from pathlib import Path

RAW = "https://raw.githubusercontent.com/yangwenmai/maiyang.me/master/blog/"
MARK = re.compile(r"^@@IMG (\S+) \|\s?(.*)$")
SLUG = re.compile(r"^\d{4}-\d{2}-\d{2}-([a-z0-9-]+)\.md$")
MEDIA = re.compile(r"^/media/([A-Za-z0-9_-]+)(?:\.(jpg|jpeg|png|webp))?$")


def orig_url(url):
    u = urllib.parse.urlparse(url)
    if u.scheme != "https" or u.netloc != "pbs.twimg.com":
        raise ValueError(f"refusing non-pbs.twimg.com image: {url}")
    m = MEDIA.match(u.path)
    if not m:
        raise ValueError(f"unexpected media path: {url}")
    media_id, ext = m.group(1), m.group(2)
    if not ext:
        ext = urllib.parse.parse_qs(u.query).get("format", ["jpg"])[0]
    ext = "png" if ext == "png" else "jpg"  # webp/jpeg -> jpg
    return f"https://pbs.twimg.com/media/{media_id}?format={ext}&name=orig", ext


def download(src, attempts=4):
    req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
    for i in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                ctype = r.headers.get("Content-Type", "")
                if not ctype.startswith("image/"):
                    raise ValueError(f"not an image ({ctype}): {src}")
                return r.read()
        except urllib.error.URLError:
            if i == attempts - 1:
                raise
            time.sleep(2 * (i + 1))


def process(repo, post):
    m = SLUG.match(post.name)
    if not m:
        raise ValueError(f"bad post filename: {post.name}")
    slug = m.group(1)
    blog = (repo / "blog").resolve()
    lines = post.read_text(encoding="utf-8").split("\n")
    n = 0
    for i, line in enumerate(lines):
        mk = MARK.match(line)
        if not mk:
            continue
        n += 1
        src, ext = orig_url(mk.group(1))
        dest = (blog / f"{slug}-{n}.{ext}").resolve()
        if dest.parent != blog:
            raise ValueError(f"path escapes blog/: {dest}")
        if dest.exists():
            raise FileExistsError(f"refusing to overwrite {dest}")
        dest.write_bytes(download(src))
        alt = mk.group(2).strip().replace("[", "").replace("]", "")
        lines[i] = f"![{alt}]({RAW}{dest.name})"
        print(f"  {dest.name}  <- {src}")
    post.write_text("\n".join(lines), encoding="utf-8")
    print(f"{post.name}: {n} images")


if __name__ == "__main__":
    root = Path(sys.argv[1]).resolve()
    for p in sys.argv[2:]:
        process(root, (root / p).resolve())
