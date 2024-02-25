<?php

namespace App\Http\Controllers\api;

use App\Models\Mark;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MarksController extends Controller
{
    public function getMarks()
    {
        $mark = Mark::all();
        if ($mark) {

            return response()->json([
                'status' => 200,
                'marks' => $mark

            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No category Available'
            ]);
        }
    }
}