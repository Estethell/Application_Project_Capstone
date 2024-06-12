<?php

use App\Http\Controllers\JobOfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::name('api.v1.')
->prefix('v1')
->group(function () {
    Route::get('jobOffer', [JobOfferController::class,'index'])->name('jobOffer.index'); 

});