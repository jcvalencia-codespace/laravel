<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/products', [ProductController:: class, 'index'])->name('products.index');
    Route::post('/products', [ProductController:: class, 'store'])->name('products.store');
    Route::get('/products/create', [ProductController:: class, 'create'])->name('products.create');
    Route::get('/products/{product}/edit', [ProductController:: class, 'edit'])->name('products.edit');
    Route::put('/products/{product}/update', [ProductController:: class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController:: class, 'destroy'])->name('products.destroy');
});

Route::get('/home', [HomeController:: class, 'index'])->name('home.index');
Route::get('/home/{product}/viewitem', [HomeController:: class, 'viewitem'])->name('home.viewitem');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
