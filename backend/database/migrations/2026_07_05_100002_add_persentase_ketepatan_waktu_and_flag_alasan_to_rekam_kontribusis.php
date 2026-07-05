<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('rekam_kontribusis', function (Blueprint $table) {
            $table->decimal('persentase_ketepatan_waktu', 5, 2)->nullable()->after('skor_rata_rata');
            $table->string('flag_alasan')->nullable()->after('status_validasi');
        });
    }

    public function down(): void
    {
        Schema::table('rekam_kontribusis', function (Blueprint $table) {
            $table->dropColumn(['persentase_ketepatan_waktu', 'flag_alasan']);
        });
    }
};
