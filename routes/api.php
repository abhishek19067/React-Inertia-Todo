<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\homeController;
use App\Http\middleware\Authenticate;
use Inertia\Inertia;


//login-authentication
Route::get("/", function(){
    return Inertia::render('test');
});
Route::post('/post',[homeController::class,"register"]);
Route::get('/login',[homeController::class,"logins"]);
Route::post('/post',[homeController::class,"register"]);
route::post('/login',[homeController::class,"login"]);

//Home or Main 
Route::get('/home',[homeController::class,"home"])->name("home");
Route::post('/home',[homeController::class,"store"]) ;

route::get('/show',[homeController::class,"show"]);
route::get('getdata',[homeController::class,"get_user"]);

//delete data
Route::delete("/delete/{id}",[homeController::class,"delete"]) ;
//update data
Route::get("/edit/{id}",[homeController::class,"edit"]) ;
Route::put("/update/{id}",[homeController::class,"update"]) ;
//logout
Route::get("/logout",[homeController::class,"logout"]);


