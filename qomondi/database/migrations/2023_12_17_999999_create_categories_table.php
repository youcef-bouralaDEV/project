<?php

use App\Enums\EtatEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('Nom');
            $table->json('images')->nullable();
            $table->string('Icon')->nullable();
            $table->string('order')->nullable();
            $table->string('Catégorie mére');
            $table->string('etat')->default(EtatEnum::Active);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};