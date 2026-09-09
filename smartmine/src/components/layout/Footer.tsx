import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mine-900 border-t border-mine-700/50">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-safety rounded-lg flex items-center justify-center">
                <HardHat className="w-5 h-5 text-mine-950" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-wider text-white">SMARTMINE</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-safety">XR</span>
              </div>
            </Link>
            <p className="text-mine-400 text-sm leading-relaxed mt-3">
              Immersive VR safety training for mining and manufacturing workers.
              Train for the danger — without facing it.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X Twitter"
                className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-600 flex items-center justify-center text-mine-400 hover:text-safety hover:border-safety/30 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-600 flex items-center justify-center text-mine-400 hover:text-safety hover:border-safety/30 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-mine-800 border border-mine-600 flex items-center justify-center text-mine-400 hover:text-safety hover:border-safety/30 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-mine-200 mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'About' },
                { to: '/training', label: 'Training' },
                { to: '/content', label: 'Content' },
                { to: '/product', label: 'Product' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-mine-400 hover:text-safety transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-mine-200 mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/plans', label: 'Plans' },
                { to: '/support', label: 'Support' },
                { to: '/support', label: 'VR Setup Guide' },
                { to: '/support', label: 'FAQ' },
              ].map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-mine-400 hover:text-safety transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-mine-200 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-mine-400 hover:text-safety transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-mine-400 hover:text-safety transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-mine-400 hover:text-safety transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-mine-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-mine-500">&copy; 2026 SmartMine XR. All rights reserved.</p>
          <p className="text-xs text-mine-600">Immersive Safety Training Platform</p>
        </div>
      </div>
    </footer>
  );
}
