<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Platform Kolaborasi Tim Kampus — API Docs</title>
    
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
                        mono: ['"JetBrains Mono"', 'monospace'],
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #FBFBFA;
            color: #2F3437;
            font-family: "Plus Jakarta Sans", sans-serif;
            font-feature-settings: "cv02", "cv03", "cv04", "cv11";
        }

        /* Ambient subtle light spot for depth without breaking minimalist aesthetic */
        .ambient-glow {
            position: fixed;
            top: -10%;
            left: 50%;
            transform: translateX(-50%);
            width: 80vw;
            height: 50vh;
            background: radial-gradient(circle, rgba(25, 28, 48, 0.02) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #FBFBFA;
        }
        ::-webkit-scrollbar-thumb {
            background: #EAEAEA;
            border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #D1D1D0;
        }

        /* Sidebar scroll area styling */
        .sidebar-scroll::-webkit-scrollbar {
            width: 4px;
        }

        /* Typography & Document Styles */
        .markdown-content {
            font-size: 1rem;
            line-height: 1.65;
        }

        .markdown-content h1 {
            font-family: "Instrument Serif", serif;
            font-size: 2.75rem;
            font-weight: 400;
            letter-spacing: -0.02em;
            line-height: 1.1;
            color: #111111;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #EAEAEA;
        }
        
        .markdown-content h2 {
            font-family: "Instrument Serif", serif;
            font-size: 1.9rem;
            font-weight: 400;
            letter-spacing: -0.01em;
            line-height: 1.2;
            color: #111111;
            margin-top: 2.25rem;
            margin-bottom: 1rem;
            padding-bottom: 0.25rem;
            border-bottom: 1px solid rgba(0,0,0,0.04);
        }
        
        .markdown-content h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 1.75rem;
            margin-bottom: 0.75rem;
            color: #111111;
            letter-spacing: -0.01em;
        }
        
        .markdown-content p {
            margin-bottom: 1.25rem;
            color: #2F3437;
        }
        
        .markdown-content ul {
            list-style-type: none;
            margin-left: 0;
            margin-bottom: 1.5rem;
        }
        
        .markdown-content ul li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            color: #2F3437;
        }
        
        .markdown-content ul li::before {
            content: "—";
            position: absolute;
            left: 0;
            color: #787774;
            font-weight: 300;
        }

        .markdown-content ol {
            list-style-type: decimal;
            margin-left: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .markdown-content ol li {
            margin-bottom: 0.5rem;
            color: #2F3437;
            padding-left: 0.25rem;
        }
        
        .markdown-content table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.25rem;
            margin-bottom: 1.75rem;
            background: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #EAEAEA;
        }
        
        .markdown-content th {
            background: #F7F6F3;
            color: #111111;
            font-weight: 600;
            text-align: left;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #EAEAEA;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .markdown-content td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #EAEAEA;
            color: #2F3437;
            font-size: 0.925rem;
        }
        
        .markdown-content tr:last-child td {
            border-bottom: none;
        }
        
        .markdown-content tr:hover td {
            background: #FBFBFA;
        }
        
        .markdown-content code {
            background: #F7F6F3;
            color: #111111;
            padding: 0.15rem 0.35rem;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.85em;
            border: 1px solid #EAEAEA;
        }
        
        .markdown-content pre {
            margin: 0;
        }

        .markdown-content hr {
            border: none;
            height: 1px;
            background: #EAEAEA;
            margin: 3rem 0;
        }

        .markdown-content strong {
            color: #111111;
            font-weight: 600;
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
<body class="antialiased overflow-x-hidden min-h-screen flex flex-col z-10 relative">

    <!-- Ambient background layer -->
    <div class="ambient-glow"></div>

    <!-- Minimal Header -->
    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#EAEAEA] px-8 py-5 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <!-- Custom Radix-style SVGs instead of Lucide icons -->
            <div class="h-8 w-8 rounded bg-[#111111] flex items-center justify-center">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M11.8536 1.14645C12.0488 0.951184 12.3654 0.951184 12.5607 1.14645L13.8536 2.43934C14.0488 2.6346 14.0488 2.95118 13.8536 3.14645L12.5607 4.43934C12.3654 4.6346 12.0488 4.6346 11.8536 4.43934L10.5607 3.14645C10.3654 2.95118 10.3654 2.6346 10.5607 2.43934L11.8536 1.14645Z" fill="currentColor"/><path d="M1.5 3C1.5 2.17157 2.17157 1.5 3 1.5H8C8.27614 1.5 8.5 1.72386 8.5 2C8.5 2.27614 8.27614 2.5 8 2.5H3C2.72386 2.5 2.5 2.72386 2.5 3V12C2.5 12.2761 2.72386 12.5 3 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V7C12.5 6.72386 12.7239 6.5 13 6.5C13.2761 6.5 13.5 6.72386 13.5 7V12C13.5 12.8284 12.8284 13.5 12 13.5H3C2.17157 13.5 1.5 12.8284 1.5 12V3Z" fill="currentColor"/></svg>
            </div>
            <div>
                <h1 class="text-sm font-semibold tracking-tight text-[#111111]">Amikom ACC</h1>
                <p class="text-[10px] text-[#787774] font-mono uppercase tracking-wider">API Documentation</p>
            </div>
        </div>
        
        <div class="flex items-center gap-6">
            <a href="/api/health" target="_blank" class="flex items-center gap-2 px-3 py-1.5 rounded bg-[#EDF3EC] text-[#346538] text-xs font-mono border border-green-200">
                <span class="h-1.5 w-1.5 rounded-full bg-[#346538]"></span>
                <span>HEALTHY</span>
            </a>
            
            <a href="/api-documentation/postman" class="flex items-center gap-2 px-4 py-2 rounded bg-[#111111] hover:bg-[#333333] active:scale-95 duration-200 text-white font-semibold text-xs transition-all tracking-wide">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5"><path d="M7.5 1C7.77614 1 8 1.22386 8 1.5V9.29289L10.6464 6.64645C10.8417 6.45118 11.1583 6.45118 11.3536 6.64645C11.5488 6.84171 11.5488 7.15829 11.3536 7.35355L7.85355 10.8536C7.65829 11.0488 7.34171 11.0488 7.15355 10.8536L3.64645 7.35355C3.45118 7.15829 3.45118 6.84171 3.64645 6.64645C3.84171 6.45118 4.15829 6.45118 4.35355 6.64645L7 9.29289V1.5C7 1.22386 7.22386 1 7.5 1ZM2 11.5C2 11.2239 2.22386 11 2.5 11H12.5C12.7761 11 13 11.2239 13 11.5C13 11.7761 12.7761 12 12.5 12H2.5C2.22386 12 2 11.7761 2 11.5ZM2.5 13C2.22386 13 2 13.2239 2 13.5C2 13.7761 2.22386 14 2.5 14H12.5C12.7761 14 13 13.7761 13 13.5C13 13.2239 12.7761 13 12.5 13H2.5Z" fill="currentColor"/></svg>
                <span>Download Collection</span>
            </a>
        </div>
    </header>

    <!-- Main Container Layout (Asymmetric split screen) -->
    <div class="flex-1 flex w-full max-w-[1400px] mx-auto px-8 py-20 gap-16 relative z-10">
        
        <!-- Sidebar Navigation (Crisp & Clean) -->
        <aside class="w-60 shrink-0 hidden md:block self-start sticky top-28 max-h-[calc(100vh-160px)] overflow-y-auto sidebar-scroll pr-2">
            <div class="space-y-8">
                <div>
                    <h3 class="text-[10px] font-bold text-[#787774] uppercase tracking-widest mb-4">Materi Utama</h3>
                    <nav class="space-y-2">
                        <a href="#1-persiapan-awal" class="sidebar-link active flex items-center gap-3 px-3 py-2 rounded text-xs font-semibold text-[#111111] bg-[#F7F6F3] border-l-2 border-[#111111] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#111111]"></span>
                            <span>Persiapan Awal</span>
                        </a>
                        <a href="#2-kredensial-uji-coba-seeded-users" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>Kredensial Akun</span>
                        </a>
                    </nav>
                </div>
                
                <div>
                    <h3 class="text-[10px] font-bold text-[#787774] uppercase tracking-widest mb-4">Skenario Tes</h3>
                    <nav class="space-y-2">
                        <a href="#skenario-a-login--kelola-profil-mahasiswa" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>A: Login & Profil</span>
                        </a>
                        <a href="#skenario-b-manajemen-proyek--approval-pic" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>B: Proyek & Approval</span>
                        </a>
                        <a href="#skenario-c-matchmaking--pembentukan-tim" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>C: Matchmaking</span>
                        </a>
                        <a href="#skenario-d-checkpoints--progres" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>D: Checkpoints</span>
                        </a>
                        <a href="#skenario-e-peer-evaluation--deteksi-kolusi-variance-check" class="sidebar-link flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-[#787774] hover:text-[#111111] hover:bg-[#F7F6F3] transition-all">
                            <span class="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                            <span>E: Peer Evaluation</span>
                        </a>
                    </nav>
                </div>
            </div>
        </aside>

        <!-- Main Document Pane (max-w-4xl, pure layout elegance) -->
        <main class="flex-1 min-w-0 max-w-4xl border border-[#EAEAEA] bg-white rounded-lg p-10 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.01)] reveal-element" id="main-content-pane">
            <article class="markdown-content">
                {!! $htmlContent !!}
            </article>
        </main>
        
    </div>

    <!-- Footer -->
    <footer class="mt-auto border-t border-[#EAEAEA] bg-white py-8 px-8 text-center text-xs text-[#787774] font-mono">
        <p>&copy; 2026 UKM Amikom ACC. Utilitarian Minimalist Editorial Documentation.</p>
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
                        link.classList.add('active', 'text-[#111111]', 'bg-[#F7F6F3]', 'border-l-2', 'border-[#111111]');
                        link.classList.remove('text-[#787774]', 'hover:text-[#111111]');
                        if (dot) dot.classList.replace('bg-transparent', 'bg-[#111111]');
                    } else {
                        link.classList.remove('active', 'text-[#111111]', 'bg-[#F7F6F3]', 'border-l-2', 'border-[#111111]');
                        link.classList.add('text-[#787774]', 'hover:text-[#111111]');
                        if (dot) dot.classList.replace('bg-[#111111]', 'bg-transparent');
                    }
                });
            });
        });
    </script>
</body>
</html>
