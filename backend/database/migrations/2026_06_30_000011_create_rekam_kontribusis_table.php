<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rekam_kontribusis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anggota_tim_id')->constrained('anggota_tims')->onDelete('cascade');
            $table->decimal('skor_rata_rata', 5, 2);
            $table->text('ringkasan_kontribusi');
            $table->string('status_validasi')->default('draft'); // draft, menunggu_acc_dosen, final
            $table->string('hash_data')->nullable(); // For Phase 2 hash-chaining
            $table->datetime('dibuat_pada');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rekam_kontribusis');
    }
};
