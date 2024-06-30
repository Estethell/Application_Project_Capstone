<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\StepController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\JobOfferController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\ProfessionistController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});




Route::name('api.v1.')
->prefix('v1')
->group(function () {
    Route::post('/register', [RegisteredUserController::class,'store'])->name('register.store'); 
    Route::get('/jobOffer', [JobOfferController::class,'index'])->name('jobOffer.index'); 
    Route::get('/jobOffer/{id}', [JobOfferController::class,'show'])->name('jobOffer.show'); 
    Route::post('/jobOffer/{jobOffer}/assignSteps', [JobOfferController::class, 'assignSteps'])->name('jobOffer.assignSteps');
    Route::get('/candidate', [CandidateController::class,'index'])->name('candidate.index'); 
    Route::get('/step', [StepController::class,'index'])->name('step.index'); 
    Route::post('/candidate', [CandidateController::class,'create'])->name('candidate.create'); 
    Route::get('/candidate/list', [CandidateController::class,'show'])->name('candidate.show'); 
    Route::put('/candidate/nextStep/{id}', [CandidateController::class,'edit'])->name('candidate.edit'); 
    Route::post('/joboffer/form', [JobOfferController::class,'create'])->name('joboffer.create'); 
    Route::delete('candidate/{id}', [CandidateController::class, 'destroy'])->name('candidate.destroy'); 
    Route::delete('jobOffer/job/{id}', [JobOfferController::class, 'destroy'])->name('jobOffer.destroy'); 
    Route::get('/event/list/{id}', [EventController::class,'index'])->name('event.index'); 
    Route::post('/event/{id}', [EventController::class,'show'])->name('event.show'); 
    
});