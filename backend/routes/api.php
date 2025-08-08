<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'posts'], function(){
    Route::get('/', [PostController::class, 'index']);
    Route::get('/total', [PostController::class, 'totalPosts']);
    Route::get('/{post_id}', [PostController::class, 'viewPost']);
    Route::post('/create', [PostController::class, 'createPost'])->middleware('auth:sanctum');
    Route::put('{post_id}/update', [PostController::class, 'updatePost'])->middleware('auth:sanctum');
    Route::post('{post_id}/delete', [PostController::class, 'deletePost'])->middleware('auth:sanctum');
});

Route::group(['prefix' => 'user'], function(){
    Route::get('/profile', [UserController::class, 'userProfile'])->middleware('auth:sanctum');
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('/resetPassword', [UserController::class, 'resetPassword'])->middleware('auth:sanctum');
});