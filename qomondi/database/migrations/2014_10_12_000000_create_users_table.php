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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('name');
            $table->string('lastname');
            $table->string('username')->nullable();
            $table->string('raison_social');
            $table->string('groupe')->nullable();
            $table->string('region')->nullable();
            $table->decimal('seuil_paiement', 10, 2)->nullable();
            $table->string('mobile');
            $table->string('mobile_2')->nullable();
            $table->string('tel_fix')->nullable();
            $table->string('fax')->nullable();
            $table->string('coordonnees_fiscales')->nullable();
            $table->string('registre_commerce')->nullable();
            $table->string('num_identite_fiscal')->nullable();
            $table->string('num_identite_statistique')->nullable();
            $table->string('article_imposition')->nullable();
            $table->text('adresse')->nullable();
            $table->string('wilaya');
            $table->string('commune');
            $table->string('etat')->default('Active');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};