<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'Nom' => 'Category 1',
            'Icon' => 'icon1.png',
            'order' => 1,
            'Catégorie mére' => 'Parent Category',
            'etat' => 'Active',
        ]);
    }
}