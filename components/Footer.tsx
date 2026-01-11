import Link from 'next/link';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/yangwenmai' },
  { name: 'Twitter', href: 'https://x.com/maiyangai' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mai-yang-2a082777/' },
];

const links = [
  { name: 'RSS', href: '/rss.xml' },
  { name: 'Sitemap', href: '/sitemap.xml' },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Copyright */}
          <div className="text-sm" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} MaiYangAI · 自 2014 年起
          </div>

          {/* Center: Links */}
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
