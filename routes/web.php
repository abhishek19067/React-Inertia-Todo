<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

use Inertia\Inertia;

use Illuminate\Http\Request;

Route::get('/user', function (Request $Request) {
    return $Request->user();
})->middleware('auth::sanctum');

Route::redirect('/', '/api');


Route::get('/', [HomeController::class, 'index']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/home', [HomeController::class, 'home'])->name('home');
    Route::get('/show', [HomeController::class, 'show']);
    Route::get('/Saved_Data', [HomeController::class, 'showing'])->name('Saved_data');
    Route::get('/getdata', [HomeController::class, 'get_user']);
    Route::get('/edit/{id}', [HomeController::class, 'edit']);
    Route::get('/show/{userId}', [HomeController::class, 'show']);
});



Route::get('/login', [HomeController::class, 'logins'])->name('login');




