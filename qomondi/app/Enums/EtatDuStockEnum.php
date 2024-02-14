<?php

namespace App\Enums;

enum EtatDuStockEnum: string
{

    case Disponible = 'Disponible';
    case Indisponible = 'Indisponible';
    case Prochainement = 'Disponible_Prochainement';
}