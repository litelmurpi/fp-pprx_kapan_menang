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
    
    // Replace emojis and symbols with minimalist-ui status badges
    $htmlContent = str_replace(
        '🔴 Jam luang: 4 jam/minggu', 
        '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FDEBEC] text-[#9F2F2D] border border-red-200"><span class="w-1.5 h-1.5 rounded-full bg-[#9F2F2D]"></span>Jam luang: 4 jam/minggu</span>', 
        $htmlContent
    );
    $htmlContent = str_replace(
        '🔴 Waktu Terbatas', 
        '<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FDEBEC] text-[#9F2F2D] border border-red-200"><span class="w-1.5 h-1.5 rounded-full bg-[#9F2F2D]"></span>WAKTU TERBATAS</span>', 
        $htmlContent
    );
    $htmlContent = str_replace(
        '[FLAGGED]', 
        '<span class="inline-flex items-center px-1.5 py-0.5 rounded bg-[#FDEBEC] text-[#9F2F2D] font-mono text-[10px] font-bold border border-red-200">FLAGGED</span>', 
        $htmlContent
    );

    // Format code blocks with macOS window chrome wrapper
    $htmlContent = preg_replace(
        '/<pre><code(?: class="language-([^"]+)")?>/i',
        '<div class="border border-[#EAEAEA] rounded-lg overflow-hidden bg-white my-6">
            <div class="flex items-center gap-1.5 px-4 py-2 border-b border-[#EAEAEA] bg-[#F7F6F3]">
                <span class="w-1.5 h-1.5 rounded-full bg-[#EAEAEA]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#EAEAEA]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-[#EAEAEA]"></span>
            </div>
            <pre class="p-4 font-mono text-sm overflow-x-auto bg-white text-[#2F3437]"><code>',
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
