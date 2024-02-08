<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use TheHocineSaad\LaravelAlgereography\Models\Daira;
use TheHocineSaad\LaravelAlgereography\Models\Wilaya;

class WilayaCommuneController extends Controller
{
    public function getWilayasAndCommunes()
    {
        $jsonFilePath = base_path('/data/wilayaJson.json');
        
        // Check if the file exists
        if (!file_exists($jsonFilePath)) {
            return response()->json(['error' => 'JSON file not found'], 404);
        }
    
        // Read the contents of the JSON file
        $jsonContents = file_get_contents($jsonFilePath);
    
        // Decode the JSON contents
        $wilayaData = json_decode($jsonContents, true); // true to get an associative array
    
        if ($wilayaData === null) {
            return response()->json(['error' => 'Error decoding JSON file'], 500);
        }
    
        return response()->json($wilayaData);
    }
    

   
}