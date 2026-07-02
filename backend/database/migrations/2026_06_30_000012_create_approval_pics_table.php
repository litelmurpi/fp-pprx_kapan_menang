<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('approval_pics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proyek_id')->constrained('proyeks')->onDelete('cascade');
            $table->foreignId('pic_id')->constrained('users')->onDelete('cascade'); // PIC must have role = dosen or pic_ukm
            $table->string('status')->default('pending'); // pending, approved, rejected
            $table->text('catatan_alasan')->nullable();
            $table->datetime('waktu_keputusan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('approval_pics');
    }
};
