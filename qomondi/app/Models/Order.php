<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $fillable = [
        'user_id',
        'orderState',
        "responsable_commercial",
        "total_ttc",
        "nombre_articles",
        "order_date",
        "order_nmbr",
       
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }


    public function getTotalPriceAttribute()
    {
        return $this->products->sum(function ($product) {
            return $product->pivot->price * $product->pivot->quantity;
        });
    }
}