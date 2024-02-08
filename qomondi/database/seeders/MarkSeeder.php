<?php

namespace Database\Seeders;

use App\Models\Mark;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MarkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mark::create([
            'name' => 'Nike',
            'etat' => 'Active',
        ]);
        Mark::create([
            'name' => 'iphone',
            'etat' => 'Active',
        ]);
        Mark::create([
            'name' => 'puma',
            'etat' => 'Inctive',
        ]);
        Mark::create([
            'name' => 'Asus',
            'etat' => 'Active',
        ]);
    }
}