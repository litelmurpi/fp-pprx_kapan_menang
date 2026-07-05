import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PixelRobot, PixelHeart } from './PixelIcons';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="theme-border border-t theme-canvas theme-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 justify-between">
          
          {/* Brand & Mission (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <span className="font-heading text-lg font-bold tracking-tight theme-text flex items-center gap-1.5">
                Verstack
              </span>
            </div>
            <p className="text-xs theme-text-sub leading-relaxed max-w-sm font-normal">
              A premium project synergy platform helping students, developers, designers, and creators find the best teammates based on skills, ratings, experience, and verified SHA-256 checkpoints.
            </p>
          </div>

          {/* Links: About, Blog, Contact, Terms, Privacy (Col 6-9) */}
          <div className="md:col-span-4 flex flex-wrap gap-12">
            <div>
              <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider theme-text mb-4">Platform</h4>
              <ul className="space-y-2.5 text-xs theme-text-sub">
                <li><a href="#features" className="hover:theme-text transition-colors">Features</a></li>
                <li><button onClick={() => setActiveTab('matchmaking')} className="hover:theme-text transition-colors cursor-pointer">Discover Teams</button></li>
                <li><a href="#how-it-works" className="hover:theme-text transition-colors">How it Works</a></li>
                <li><a href="#pricing" className="hover:theme-text transition-colors">Pricing &amp; Stats</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider theme-text mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs theme-text-sub">
                <li><a href="#about" className="hover:theme-text transition-colors">About</a></li>
                <li><a href="#blog" className="hover:theme-text transition-colors flex items-center gap-1">Blog <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="#contact" className="hover:theme-text transition-colors">Contact</a></li>
                <li><a href="#terms" className="hover:theme-text transition-colors">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:theme-text transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Social Icons: GitHub, Discord, LinkedIn (Col 10-12) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech font-bold uppercase tracking-wider theme-text">Connect With Us</h4>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl theme-surface theme-border border flex items-center justify-center theme-text-sub hover:theme-text hover:border-[var(--color-brand)] transition-all"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.53 1.03 1.53 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a 
                href="https://discord.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl theme-surface theme-border border flex items-center justify-center theme-text-sub hover:theme-text hover:border-[var(--color-brand)] transition-all"
                title="Discord"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl theme-surface theme-border border flex items-center justify-center theme-text-sub hover:theme-text hover:border-[var(--color-brand)] transition-all"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.69a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66Z" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] theme-text-muted font-mono-tech pt-2">
              BUILDING NEXT-GEN SYNERGY
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 theme-border border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs theme-text-muted font-mono-tech">
          <p>© 2026 Verstack Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>SHA-256 IMMUTABLE LEDGER</span>
            <span className="flex items-center gap-1.5 theme-text-sub">
              <span>Zero Free-Riders Guaranteed</span>
              <PixelHeart className="w-3.5 h-3.5 brand-text" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
