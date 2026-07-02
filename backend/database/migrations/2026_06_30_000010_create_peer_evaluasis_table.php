<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peer_evaluasis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->foreignId('pemberi_id')->constrained('anggota_tims')->onDelete('cascade');
            $table->foreignId('penerima_id')->constrained('anggota_tims')->onDelete('cascade');
            $table->integer('skor_kontribusi'); // e.g. scale 1-5 or 1-100
            $table->text('komentar')->nullable();
            $table->datetime('waktu_evaluasi');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peer_evaluasis');
    }
};
