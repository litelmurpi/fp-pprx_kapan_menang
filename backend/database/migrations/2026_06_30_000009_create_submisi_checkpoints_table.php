<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submisi_checkpoints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('checkpoint_id')->constrained('checkpoints')->onDelete('cascade');
            $table->foreignId('anggota_tim_id')->constrained('anggota_tims')->onDelete('cascade');
            $table->text('catatan_progres');
            $table->datetime('waktu_submit');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submisi_checkpoints');
    }
};
