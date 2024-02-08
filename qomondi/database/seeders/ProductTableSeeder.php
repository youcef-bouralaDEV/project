<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) { // Generate 10 fake products, adjust the number as needed
            Product::create([
                'category_id' => $faker->numberBetween(1, 3),
                'mark_id' => $faker->numberBetween(1, 3),
                'name' => $faker->word,
                'code' => $faker->unique()->randomNumber(3),
                'codebarreEAN13' => $faker->unique()->randomNumber(5),
                'ref' =>$faker->unique()->randomNumber(3),
                'quantity' => $faker->numberBetween(10, 1000),
                'quantité_minimal' => $faker->numberBetween(1, 50),
                'prix' => $faker->randomFloat(2, 5, 100),
                'etat' => $faker->randomElement(['Active', 'Inactive']),
                'etat_du_stock' => $faker->randomElement(['Disponible', 'Indisponible']),
                'commande_Colis' => $faker->randomElement(['Par_Defaut', 'oui']),
                'prix_dachat' => $faker->randomFloat(2, 1, 50),
                'grossiste' => $faker->randomFloat(2, 1, 50),
                'coulissage' => $faker->word,
                'height' => $faker->randomFloat(2, 5, 50),
                'length' => $faker->randomFloat(2, 10, 100),
                'width' => $faker->randomFloat(2, 5, 50),
                'description' => $faker->sentence,
            ]);
        }
    }
}