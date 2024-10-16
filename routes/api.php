<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use Inertia\Inertia; 
use Illuminate\Http\Request;

Route::get('/user',function(Request $Request){
    return $Request->user();
})->middleware('auth::sanctum');

Route::middleware("auth:sanctum")->group(function()
{
    Route::get('/home', [HomeController::class, 'home'])->name('home');
});


Route::post('/home',[HomeController::class,'store']);

Route::post('/login', [HomeController::class, 'login']);

Route::post('/post', [HomeController::class, 'register']);

Route::delete('/delete/{id}', [HomeController::class, 'delete']);

Route::put('/update/{id}', [HomeController::class, 'update']);

Route::post('/update_username/{id}',[HomeController::class,'update_username']);
Route::post('/update_password/{id}',[HomeController::class,'update_password']);

Route::post('/logout', [HomeController::class, 'logout']);



