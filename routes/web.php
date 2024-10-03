<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

use Inertia\Inertia; 

Route::redirect('/','/api');
route::redirect('login','/api/login');
route::redirect('/home','/api/home');
route::redirect('/homes','/api/home');




// Route::get('/', [HomeController::class, 'index']) ;
// Route::post('/post',[HomeController::class,'register'])->middleware('json'); 
// route::get('/login',[HomeController::class,"logins"]);




    


    

