<?php

namespace App\Models;


use App\Enums\UnitePoidsEnum;
use App\Enums\EtatDuStockEnum;
use App\Enums\UniteDeLongueurEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasFactory , InteractsWithMedia;

  

    protected $fillable = [
        'name',
        'category_id',
        'mark_id',
        'code',
        'codebarreEAN13',
        'ref',
        'quantity',
        "raison_social",
        'quantité_minimal',
        'prix',
        'prix_dachat',
        'grossiste',
        'coulissage',
        'height',
        'length',
        'width',
        'poid',
        'etat_du_stock',
        'commande_Colis',
        'uniteLongueur',
        'Unité_poids',
        'description',
        'etat',
        'etat_du_stock',
        'commande_Colis',
        'uniteLongueur',
        'Unité_poids'
    ];

    protected $casts = [
        'etat' => \App\Enums\EtatEnum::class,
        'etat_du_stock' => EtatDuStockEnum::class,
        "UniteLongueur" => UniteDeLongueurEnum::class,
        "Unité_poids" => UnitePoidsEnum::class,
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function mark()
    {
        return $this->belongsTo(Mark::class, 'mark_id');
    }
    

   
}