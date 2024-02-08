<?php

namespace TheHocineSaad\LaravelAlgereography\Models;

use Illuminate\Database\Eloquent\Model;

class Wilaya extends Model
{
    

    public function dairas()
    {
        return $this->hasMany(Daira::class);
    }
}