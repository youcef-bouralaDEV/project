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
            'name' => 'T-shirt',
            'Icon' => 'icon1.png',
            'order' => 1,
            'catégorie_mére' => 'clothes',
            'etat' => 'Active',
        ]);
        Category::create([
            'name' => 'Laptop',
            'Icon' => 'icon1.png',
            'order' => 2,
            'catégorie_mére' => 'electrionc',
            'etat' => 'Active',
        ]);
        Category::create([
            'name' => 'Shoes',
            'Icon' => 'icon1.png',
            'order' => 1,
            'catégorie_mére' => 'clothes',
            'etat' => 'Active',
        ]);
        Category::create([
            'name' => 'Phone',
            'Icon' => 'icon1.png',
            'order' => 2,
            'catégorie_mére' => 'electrionc',
            'etat' => 'Active',
        ]);
    }
}