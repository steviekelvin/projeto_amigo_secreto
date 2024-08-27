<?php

use App\Http\Controllers\PersonController;
use Illuminate\Support\Facades\Route;

Route::prefix("persons")->group(
    function () {
        Route::get('/', [PersonController::class, 'index'])->name('persons.index');
        Route::get('/change', [PersonController::class, 'change'])->name('persons.change');
        Route::get('/clear', [PersonController::class, 'clear'])->name('persons.clear');
        Route::get('/{id}', [PersonController::class, 'show'])->name('persons.show');
        Route::post('/', [PersonController::class, 'store'])->name('persons.create');
        Route::put('/{id}', [PersonController::class, 'update'])->name('persons.update');
        Route::delete('/{id}', [PersonController::class, 'destroy'])->name('persons.destroy');
    }
);
