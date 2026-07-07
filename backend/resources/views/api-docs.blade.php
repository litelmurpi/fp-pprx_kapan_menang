<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verstack — API Docs</title>
    
    <!-- Premium Fonts matching Frontend -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Theme Script to initialize theme early before render -->
    <script>
        (function() {
            const storedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', storedTheme);
            if (storedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            } else {
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
            }
        })();
    </script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                        display: ['"Space Grotesk"', 'sans-serif'],
                        mono: ['"JetBrains Mono"', 'monospace'],
                    },
                    colors: {
                        canvas: 'var(--color-canvas)',
                        surface: 'var(--color-surface)',
                        elevated: 'var(--color-elevated)',
                        border: {
                            DEFAULT: 'var(--color-border)',
                            hover: 'var(--color-border-hover)',
                            subtle: 'var(--color-border-subtle)',
                            highlight: 'var(--color-border-highlight)',
                        },
                        ink: {
                            primary: 'var(--color-text-primary)',
                            secondary: 'var(--color-text-secondary)',
                            tertiary: 'var(--color-text-tertiary)',
                            accent: 'var(--color-text-accent)',
                        },
                        brand: {
                            DEFAULT: 'var(--color-primary)',
                            foreground: 'var(--color-primary-foreground)',
                            hover: 'var(--color-primary-hover)',
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        :root {
            /* Verstack Monochrome Foundation (Dark Mode) — per DESIGN.md v2.0 */
            --color-canvas: #0A0A0A;
            --color-surface: #111111;
            --color-elevated: #161616;
            --color-border: #262626;
            --color-border-hover: #CCFD15;
            --color-border-subtle: rgba(255, 255, 255, 0.08);
            --color-border-highlight: rgba(204, 253, 21, 0.45);
            --color-bg-hover: rgba(204, 253, 21, 0.08);
            --color-bg-active: rgba(204, 253, 21, 0.15);
            
            --color-text-primary: #FFFFFF;
            --color-text-secondary: #8B8B8B;
            --color-text-tertiary: #525252;
            --color-text-accent: #CCFD15;
            
            --color-primary: #CCFD15;
            --color-primary-hover: #BADC0E;
            --color-primary-foreground: #111111;
            
            --color-secondary: #FAFAFA;
            --color-secondary-hover: #E5E5E5;
            --color-secondary-foreground: #0A0A0A;
            
            --color-accent: #CCFD15;
            --color-accent-soft: rgba(204, 253, 21, 0.12);
            --color-accent-border: rgba(204, 253, 21, 0.35);
            --color-accent-text: #CCFD15;
            
            --color-info: #FAFAFA;
            --color-info-soft: rgba(255, 255, 255, 0.10);
            --color-info-border: rgba(255, 255, 255, 0.20);
            --color-info-text: #FAFAFA;

            --color-brand-glow: rgba(204, 253, 21, 0.25);
            --color-brand-glow-strong: rgba(204, 253, 21, 0.45);
            
            --bg-grid: 
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        .light {
            /* Verstack Clean Productivity Authority (Light Mode) — per DESIGN.md v2.0 */
            --color-canvas: #FAFAFA;
            --color-surface: #FFFFFF;
            --color-elevated: #FFFFFF;
            --color-border: #E2E8F0;
            --color-border-hover: #8C99E0;
            --color-border-subtle: rgba(0, 0, 0, 0.06);
            --color-border-highlight: rgba(179, 187, 253, 0.60);
            --color-bg-hover: rgba(179, 187, 253, 0.12);
            --color-bg-active: rgba(179, 187, 253, 0.22);
            
            --color-text-primary: #0A0A0A;
            --color-text-secondary: #475569;
            --color-text-tertiary: #64748B;
            --color-text-accent: #0A0A0A;
            
            --color-primary: #CCFD15;
            --color-primary-hover: #BADC0E;
            --color-primary-foreground: #111111;
            
            --color-secondary: #0A0A0A;
            --color-secondary-hover: #262626;
            --color-secondary-foreground: #FAFAFA;
            
            --color-accent: #CCFD15;
            --color-accent-soft: rgba(204, 253, 21, 0.20);
            --color-accent-border: rgba(110, 140, 6, 0.35);
            --color-accent-text: #0A0A0A;
            
            --color-info: #0A0A0A;
            --color-info-soft: rgba(0, 0, 0, 0.06);
            --color-info-border: rgba(0, 0, 0, 0.20);
            --color-info-text: #0A0A0A;

            --color-brand-glow: rgba(204, 253, 21, 0.20);
            --color-brand-glow-strong: rgba(204, 253, 21, 0.35);
            
            --bg-grid: 
                linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
        }

        body {
            background-color: var(--color-canvas);
            color: var(--color-text-primary);
            font-family: "Inter", -apple-system, sans-serif;
            background-image: var(--bg-grid);
            background-size: 48px 48px;
            transition: background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Custom Scrollbar to match frontend */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: var(--color-canvas);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--color-border);
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-border-hover);
        }

        .sidebar-scroll::-webkit-scrollbar {
            width: 4px;
        }

        /* Typography & Document Styles */
        .markdown-content {
            font-size: 0.925rem;
            line-height: 1.6;
        }

        .markdown-content h1 {
            font-family: "Space Grotesk", sans-serif;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.030em;
            line-height: 1.2;
            color: var(--color-text-primary);
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--color-border);
        }
        
        .markdown-content h2 {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: -0.020em;
            line-height: 1.3;
            color: var(--color-text-primary);
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid var(--color-border-subtle);
        }
        
        .markdown-content h3 {
            font-family: "Inter", sans-serif;
            font-size: 1.125rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--color-text-primary);
            letter-spacing: -0.015em;
        }
        
        .markdown-content p {
            margin-bottom: 1rem;
            color: var(--color-text-secondary);
        }
        
        .markdown-content ul {
            list-style-type: none;
            margin-left: 0;
            margin-bottom: 1.25rem;
        }
        
        .markdown-content ul li {
            position: relative;
            padding-left: 1.25rem;
            margin-bottom: 0.35rem;
            color: var(--color-text-secondary);
        }
        
        .markdown-content ul li::before {
            content: "—";
            position: absolute;
            left: 0;
            color: var(--color-text-tertiary);
            font-weight: 300;
        }

        .markdown-content ol {
            list-style-type: decimal;
            margin-left: 1.25rem;
            margin-bottom: 1.25rem;
        }

        .markdown-content ol li {
            margin-bottom: 0.35rem;
            color: var(--color-text-secondary);
            padding-left: 0.15rem;
        }
        
        .markdown-content table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
            margin-bottom: 1.5rem;
            background: var(--color-surface);
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid var(--color-border);
        }
        
        .markdown-content th {
            background: var(--color-elevated);
            color: var(--color-text-primary);
            font-weight: 600;
            text-align: left;
            padding: 0.65rem 0.85rem;
            border-bottom: 1px solid var(--color-border);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .markdown-content td {
            padding: 0.65rem 0.85rem;
            border-bottom: 1px solid var(--color-border-subtle);
            color: var(--color-text-secondary);
            font-size: 0.85rem;
        }
        
        .markdown-content tr:last-child td {
            border-bottom: none;
        }
        
        .markdown-content tr:hover td {
            background: var(--color-bg-hover);
        }
        
        .markdown-content code {
            background: rgba(255, 255, 255, 0.05);
            color: var(--color-primary);
            padding: 0.15rem 0.35rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
            border: 1px solid var(--color-border-subtle);
        }

        .light .markdown-content code {
            background: rgba(0, 0, 0, 0.03);
            border-color: rgba(0, 0, 0, 0.06);
            color: var(--color-text-primary);
        }
        
        .markdown-content pre {
            margin: 0;
        }

        .markdown-content hr {
            border: none;
            height: 1px;
            background: var(--color-border);
            margin: 2.5rem 0;
        }

        .markdown-content strong {
            color: var(--color-text-primary);
            font-weight: 600;
        }

        /* Pulse glow animation */
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.15; transform: scale(1) translateX(-50%); }
            50% { opacity: 0.25; transform: scale(1.05) translateX(-50%); }
        }
        .animate-pulse-glow {
            animation: pulse-glow 6s ease-in-out infinite;
        }

        /* Scroll entry animations */
        .reveal-element {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body class="antialiased overflow-x-hidden min-h-screen flex flex-col z-10 relative bg-canvas text-ink-primary font-sans transition-colors duration-300">

    <!-- Ambient background layer -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand/15 dark:bg-brand/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow"></div>

    <!-- Minimal Header -->
    <header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between transition-colors duration-300">
        <!-- Top Subtle Laser Line -->
        <div class="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent w-full opacity-60"></div>
        
        <div class="flex items-center gap-4">
            <div class="h-8 w-8 rounded-lg bg-brand flex items-center justify-center shadow-[0_0_15px_var(--color-brand-glow)]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-brand-foreground"><path d="M11.8536 1.14645C12.0488 0.951184 12.3654 0.951184 12.5607 1.14645L13.8536 2.43934C14.0488 2.6346 14.0488 2.95118 13.8536 3.14645L12.5607 4.43934C12.3654 4.6346 12.0488 4.6346 11.8536 4.43934L10.5607 3.14645C10.3654 2.95118 10.3654 2.6346 10.5607 2.43934L11.8536 1.14645Z" fill="currentColor"/><path d="M1.5 3C1.5 2.17157 2.17157 1.5 3 1.5H8C8.27614 1.5 8.5 1.72386 8.5 2C8.5 2.27614 8.27614 2.5 8 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V12C2.5 12.2761 2.72386 12.5 3 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V7C12.5 6.72386 12.7239 6.5 13 6.5C13.2761 6.5 13.5 6.72386 13.5 7V12C13.5 12.8284 12.8284 13.5 12 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V3Z" fill="currentColor"/></svg>
            </div>
            <div>
                <h1 class="text-sm font-display font-bold tracking-tight text-ink-primary">Verstack</h1>
                <p class="text-[9px] text-ink-tertiary font-mono uppercase tracking-wider">API Documentation</p>
            </div>
        </div>
        
        <div class="flex items-center gap-4">
            <a href="/api/health" target="_blank" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>HEALTHY</span>
            </a>

            <!-- Theme Switcher Button -->
            <button id="theme-toggle-btn" aria-label="Toggle Theme" class="p-2 rounded-xl bg-surface hover:opacity-80 text-ink-secondary hover:text-ink-primary border border-border transition-all cursor-pointer flex items-center justify-center shadow-sm">
                <!-- Sun Icon -->
                <svg id="sun-icon" class="w-4 h-4 text-brand hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <!-- Moon Icon -->
                <svg id="moon-icon" class="w-4 h-4 text-brand hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            </button>
            
            <a href="/api-documentation/postman" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand hover:opacity-90 active:scale-95 duration-200 text-brand-foreground font-semibold text-xs transition-all tracking-wide shadow-sm">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5"><path d="M7.5 1C7.77614 1 8 1.22386 8 1.5V9.29289L10.6464 6.64645C10.8417 6.45118 11.1583 6.45118 11.3536 6.64645C11.5488 6.84171 11.5488 7.15829 11.3536 7.35355L7.85355 10.8536C7.65829 11.0488 7.34171 11.0488 7.15355 10.8536L3.64645 7.35355C3.45118 7.15829 3.45118 6.84171 3.64645 6.64645C3.84171 6.45118 4.15829 6.45118 4.35355 6.64645L7 9.29289V1.5C7 1.22386 7.22386 1 7.5 1ZM2 11.5C2 11.2239 2.22386 11 2.5 11H12.5C12.7761 11 13 11.2239 13 11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5ZM2.5 13C2.22386 13 2 13.2239 2 13.5C2 13.7761 2.22386 14 2.5 14H12.5C12.7761 14 13 13.7761 13 13.5C13 13.2239 12.7761 13 12.5 13H2.5Z" fill="currentColor"/></svg>
                <span>Download Collection</span>
            </a>
        </div>
    </header>

    <!-- Main Container Layout (Asymmetric split screen) -->
    <div class="flex-1 flex w-full max-w-[1400px] mx-auto px-8 py-16 gap-16 relative z-10">
        
        <!-- Sidebar Navigation (Crisp & Clean) -->
        <aside class="w-60 shrink-0 hidden md:block self-start sticky top-28 max-h-[calc(100vh-160px)] overflow-y-auto sidebar-scroll pr-2">
            <div class="space-y-8">
                <div>
                    <h3 class="text-[10px] font-bold text-ink-tertiary uppercase tracking-widest mb-4 font-mono">Materi Utama</h3>
                    <nav class="space-y-2">
                        <a href="#1-persiapan-awal" class="sidebar-link active flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-ink-primary bg-elevated border-l-2 border-brand transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-brand"></span>
                            <span>Persiapan Awal</span>
                        </a>
                        <a href="#2-kredensial-uji-coba-seeded-users" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>Kredensial Akun</span>
                        </a>
                    </nav>
                </div>
                
                <div>
                    <h3 class="text-[10px] font-bold text-ink-tertiary uppercase tracking-widest mb-4 font-mono">Skenario Tes</h3>
                    <nav class="space-y-2">
                        <a href="#skenario-a-login--kelola-profil-mahasiswa" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>A: Login & Profil</span>
                        </a>
                        <a href="#skenario-b-manajemen-proyek--approval-pic" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>B: Proyek & Approval</span>
                        </a>
                        <a href="#skenario-c-matchmaking--pembentukan-tim" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>C: Matchmaking</span>
                        </a>
                        <a href="#skenario-d-checkpoints--progres" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>D: Checkpoints</span>
                        </a>
                        <a href="#skenario-e-peer-evaluation--deteksi-kolusi-variance-check" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-ink-tertiary hover:text-ink-primary hover:bg-elevated/50 transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>E: Peer Evaluation</span>
                        </a>
                    </nav>
                </div>
            </div>
        </aside>

        <!-- Main Document Pane (max-w-4xl, pure layout elegance) -->
        <main class="flex-1 min-w-0 max-w-4xl border border-border bg-surface rounded-2xl p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_35px_rgba(0,0,0,0.6)] border-t border-t-white/5 dark:border-t-white/5 relative reveal-element transition-colors duration-300" id="main-content-pane">
            <!-- Light spotlight glow inside card -->
            <div class="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-40"></div>
            
            <article class="markdown-content">
                {!! $htmlContent !!}
            </article>
        </main>
        
    </div>

    <!-- Footer -->
    <footer class="mt-auto border-t border-border bg-surface py-8 px-8 text-center text-xs text-ink-tertiary font-mono transition-colors duration-300">
        <p>&copy; 2026 UKM Amikom ACC. Powered by Verstack Visual Systems.</p>
    </footer>

    <!-- IntersectionObserver and Scrollspy -->
    <script>
        // Trigger reveal-element class
        document.addEventListener('DOMContentLoaded', () => {
            // Generate IDs for markdown headings dynamically to enable anchors
            const markdownHeadings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3');
            markdownHeadings.forEach(heading => {
                let text = heading.textContent.toLowerCase();
                let slug = text
                    .replace(/[^\w\s-]/g, '') // remove special characters
                    .trim()
                    .replace(/\s+/g, '-')     // replace spaces with dashes
                    .replace(/-+/g, '-');     // collapse multiple dashes
                
                heading.setAttribute('id', slug);
            });

            const el = document.getElementById('main-content-pane');
            if (el) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, 50);
            }

            // Stagger reveal of markdown list items and tables dynamically
            const elementsToReveal = document.querySelectorAll('.markdown-content h2, .markdown-content table, .markdown-content .border');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            elementsToReveal.forEach((el, index) => {
                el.classList.add('reveal-element');
                // Apply a slight stagger via index delay
                el.style.transitionDelay = `${Math.min(index * 40, 300)}ms`;
                observer.observe(el);
            });

            // Scrollspy Implementation
            const links = document.querySelectorAll('.sidebar-link');
            const sections = [];
            
            links.forEach(link => {
                const targetId = link.getAttribute('href').substring(1);
                const elem = document.getElementById(targetId);
                if (elem) {
                    sections.push({ link, elem });
                }
            });

            window.addEventListener('scroll', () => {
                let current = '';
                const scrollPos = window.scrollY + 120;

                sections.forEach(({ elem }) => {
                    if (scrollPos >= elem.offsetTop) {
                        current = elem.getAttribute('id');
                    }
                });

                sections.forEach(({ link, elem }) => {
                    const id = elem.getAttribute('id');
                    const dot = link.querySelector('span');
                    if (id === current) {
                        link.classList.add('active', 'text-ink-primary', 'bg-elevated', 'border-l-2', 'border-brand', 'font-semibold');
                        link.classList.remove('text-ink-tertiary', 'hover:text-ink-primary', 'hover:bg-elevated/50', 'font-medium');
                        if (dot) {
                            dot.classList.remove('bg-transparent');
                            dot.classList.add('bg-brand');
                        }
                    } else {
                        link.classList.remove('active', 'text-ink-primary', 'bg-elevated', 'border-l-2', 'border-brand', 'font-semibold');
                        link.classList.add('text-ink-tertiary', 'hover:text-ink-primary', 'hover:bg-elevated/50', 'font-medium');
                        if (dot) {
                            dot.classList.remove('bg-brand');
                            dot.classList.add('bg-transparent');
                        }
                    }
                });
            });

            // Theme Switcher Logic
            const toggleBtn = document.getElementById('theme-toggle-btn');
            const sunIcon = document.getElementById('sun-icon');
            const moonIcon = document.getElementById('moon-icon');

            function updateSwitcherIcons(theme) {
                if (theme === 'dark') {
                    sunIcon.classList.remove('hidden');
                    moonIcon.classList.add('hidden');
                } else {
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                }
            }

            // Initialize icons
            const currentTheme = localStorage.getItem('theme') || 'dark';
            updateSwitcherIcons(currentTheme);

            toggleBtn.addEventListener('click', () => {
                const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', nextTheme);
                if (nextTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                }
                localStorage.setItem('theme', nextTheme);
                updateSwitcherIcons(nextTheme);
            });
        });
    </script>
</body>
</html>
