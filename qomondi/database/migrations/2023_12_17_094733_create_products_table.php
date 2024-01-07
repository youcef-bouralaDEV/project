<?php

use App\Enums\EtatEnum;
use App\Enums\UnitePoidsEnum;
use App\Enums\EtatDuStockEnum;
use App\Enums\UniteDeLongueurEnum;
use App\Enums\CommandeParColisEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use SebastianBergmann\CodeCoverage\Report\Xml\Unit;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->unsignedBigInteger('mark_id');
            $table->foreign('mark_id')->references('id')->on('markes');
            $table->string('nom');
            $table->integer('code')->nullable();
            $table->integer('codebarreEAN13')->nullable();
            $table->integer('ref')->nullable();
            $table->integer('quantity');
            $table->integer('quantité_minimal')->nullable();
            $table->double('prix');
            $table->double('prix_dachat')->nullable();
            $table->double('grossiste')->nullable();
            $table->string('coulissage')->nullable();
            $table->integer('height')->nullable();
            $table->integer('length')->nullable();
            $table->integer('width')->nullable();
            $table ->integer('poid')->nullable();
            $table->string('etat')->default(EtatEnum::Active);
            $table->string('etat_du_stock')->default(EtatDuStockEnum::Disponible);
            $table->string('commande_Colis')->default(CommandeParColisEnum::Par_Defaut);
            $table->string('uniteLongueur')->default(UniteDeLongueurEnum::Métre);
            $table->string('Unité_poids')->default(UnitePoidsEnum::kilogramme); 
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};