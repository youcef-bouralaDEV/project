<?php

namespace App\Enums;


enum OrderState:string {

    case EnAttende = 'En attende';
    case EnCours = 'En cours de traitement';
    case Expediee = 'Expédiée';
    case Deilvree = 'Deilvree';
    case Annuler = 'Annuler';

}