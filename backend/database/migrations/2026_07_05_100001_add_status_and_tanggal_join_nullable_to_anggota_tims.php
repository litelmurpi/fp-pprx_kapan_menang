<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('anggota_tims', function (Blueprint $table) {
            $table->string('status')->default('mengajukan')->after('peran');
            $table->date('tanggal_join')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('anggota_tims', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->date('tanggal_join')->nullable(false)->change();
        });
    }
};
