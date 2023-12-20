<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'category_id' => 1, 
            'images' => json_encode(['path/to/image1.jpg', 'path/to/image2.jpg']),
            'type_id' => 1,
            'nom' => 'Product 1',
            'code' => 123,
            'codebarreEAN13' => 98723,
            'ref' => 'REF123',
            'quantity' => 100,
            'quantité_minimal' => 10,
            'prix' => 19.99,
            'etat' => 'active', // Or use EtatEnum::Active
            'etat_du_stock' => 'Disponible', // Or use EtatDuStockEnum::Disponible
            'commande_Colis' => 'Par_Defaut', // Or use CommandeParColisEnum::Par_Defaut
            'prix_dachat' => 15.50,
            'grossiste' => 18.00,
            'coulissage' => 'Coulissage Value',
            'height' => 10.5,
            'length' => 20.2,
            'width' => 15.8,
            'description' => 'Product description goes here',
        ]);
        Product::create([
            'category_id' => 1, 
            'images'=> json_encode(['path/image2.png']),
            'type_id' => 1,
            'nom' => 'Product 2',
            'code' => 456,
            'codebarreEAN13' => 10000,
            'ref' => 'REF456',
            'quantity' => 320,
            'quantité_minimal' => 10,
            'prix' => 19.99,
            'prix_dachat' => 15.50,
            'etat' => 'inactive', // Or use EtatEnum::Active
            'etat_du_stock' => 'Indisponible', // Or use EtatDuStockEnum::Disponible
            'commande_Colis' => 'oui', // Or use CommandeParColisEnum::Par_Defaut
            'grossiste' => 18.00,
            'coulissage' => 'Coulissage Value',
            'height' => 10.5,
            'length' => 20.2,
            'width' => 15.8,
            'description' => 'Product description goes here',
        ]);

        
    }
}