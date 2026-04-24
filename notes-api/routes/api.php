<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// 🔐 AUTH ROUTES
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);



// 🔒 PROTECTED ROUTES (butuh login/token)
Route::middleware('auth:sanctum')->group(function () {

    // CRUD NOTES
    Route::apiResource('notes', NoteController::class);

});