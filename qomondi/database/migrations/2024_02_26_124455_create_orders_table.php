<?php

use App\Enums\OrderState;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string('orderState')->default(OrderState::EnAttende);
            $table->string('responsable_commercial')->nullable();
            $table->decimal('total_ttc', 10, 2)->nullable();
            $table->integer('nombre_articles')->nullable();
            $table->string('order_nmbr')->nullable();
            $table->integer('total_volume')->nullable();
            $table->integer('total_weight')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};