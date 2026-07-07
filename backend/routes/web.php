<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api-documentation', function () {
    $path = base_path('api_walkthrough.md');
    if (!File::exists($path)) {
        abort(404, 'Documentation file not found.');
    }
    
    $markdown = File::get($path);
    $htmlContent = Str::markdown($markdown);
    
    // Replace emojis and symbols with theme status badges
    $htmlContent = str_replace(
        '🔴 Jam luang: 4 jam/minggu', 
        '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-500/10 text-red-500 border border-red-500/20 dark:text-red-400 dark:border-red-500/30"><span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>Jam luang: 4 jam/minggu</span>', 
        $htmlContent
    );
    $htmlContent = str_replace(
        '🔴 Waktu Terbatas', 
        '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 dark:text-amber-400 dark:border-amber-500/30"><span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>WAKTU TERBATAS</span>', 
        $htmlContent
    );
    $htmlContent = str_replace(
        '[FLAGGED]', 
        '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-red-500/15 text-red-500 border border-red-500/25 font-mono text-[10px] font-bold animate-pulse">FLAGGED</span>', 
        $htmlContent
    );

    // Format code blocks with macOS window chrome wrapper
    $htmlContent = preg_replace(
        '/<pre><code(?: class="language-([^"]+)")?>/i',
        '<div class="border border-border rounded-xl overflow-hidden bg-elevated my-6 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
            <div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface/50">
                <span class="w-2 h-2 rounded-full bg-red-500/30 dark:bg-red-500/40"></span>
                <span class="w-2 h-2 rounded-full bg-amber-500/30 dark:bg-amber-500/40"></span>
                <span class="w-2 h-2 rounded-full bg-green-500/30 dark:bg-green-500/40"></span>
            </div>
            <pre class="p-4 font-mono text-xs overflow-x-auto bg-surface text-ink-primary"><code>',
        $htmlContent
    );
    $htmlContent = str_replace('</code></pre>', '</code></pre></div>', $htmlContent);
    
    return view('api-docs', [
        'htmlContent' => $htmlContent
    ]);
});

Route::get('/api-documentation/postman', function () {
    $path = base_path('postman_collection.json');
    if (!File::exists($path)) {
        abort(404, 'Postman collection file not found.');
    }
    return response()->download($path, 'Platform_Kolaborasi_Tim_Kampus.postman_collection.json');
});
