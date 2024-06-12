<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use App\Models\Job_offer;
use App\Http\Requests\StoreJob_offerRequest;
use App\Http\Requests\UpdateJob_offerRequest;

class JobOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobOffers = Job_offer::with('steps')->get();
    return response()->json($jobOffers);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJob_offerRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jobOffer = Job_offer::with('step')->find($id);
        if ($jobOffer) {
            return response(['message'=> 'Nessuna offerta di lavoro disponibile'], 404);

    }

     return [
    'data' => $jobOffer
        ];
        }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job_offer $job_offer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJob_offerRequest $request, Job_offer $job_offer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job_offer $job_offer)
    {
        //
    }
}
