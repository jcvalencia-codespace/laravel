<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){
        $products = Product::all();
        return Inertia::render('Home/Index', compact('products'));
    }

    public function viewitem(Product $product){
        return Inertia::render('Home/ViewItem', compact('product'));
    }
}
