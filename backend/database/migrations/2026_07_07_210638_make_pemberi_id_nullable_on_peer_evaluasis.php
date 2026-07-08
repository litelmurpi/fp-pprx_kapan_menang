<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('peer_evaluasis', function (Blueprint $table) {
            $table->unsignedBigInteger('pemberi_id')->nullable()->change();
            $table->unsignedBigInteger('user_pemberi_id')->nullable()->after('pemberi_id'); // Optional, to track the user PIC
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('peer_evaluasis', function (Blueprint $table) {
            //
        });
    }
};
