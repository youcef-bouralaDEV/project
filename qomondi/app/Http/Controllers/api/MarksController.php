<?php

namespace App\Http\Controllers\api;

use App\Models\Mark;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarksController extends Controller
{
    public function getMarks(){
        try {
               
            $categoryNames = Mark::select('id', 'name')->get();
    
            return response()->json($categoryNames, 200);
        }catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch categories' ,$e], 500);
        }
    
    }
}