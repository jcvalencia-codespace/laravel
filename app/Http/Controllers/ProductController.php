<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Nette\Schema\Message;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create()
    {
        return Inertia::render('Products/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_category' => 'required|string|max:255',
            'product_price' => 'required|numeric',
            'product_description' => 'nullable|string'
        ]);
        if ($request) {
            Product::create($request->all());
            return redirect()->route('products.index')->with('message', 'Product Created Successfully');
        }
    }

    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_category' => 'required|string|max:255',
            'product_price' => 'required|numeric',
            'product_description' => 'nullable|string'
        ]);

        $product->update([
            'product_name' => $request->input('product_name'),
            'product_category' => $request->input('product_category'),
            'product_price' => $request->input('product_price'),
            'product_description' => $request->input('product_description'),
        ]);
        if ($request) {
            return redirect()->route('products.index')->with('message', 'Product Updated Successfully');
        }
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted successfully');
    }
}
