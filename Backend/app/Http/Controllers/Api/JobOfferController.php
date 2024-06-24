<?php

namespace App\Http\Controllers\Api;
use App\Models\Step;

use App\Models\Job_offer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
    public function create(Request $request)
    {

        error_log("sono in create");
        
        $jobOffer = Job_offer::create([
            'name' => $request['name'],
            'description' => $request['description'],
        ]);

        
        
error_log("ciao");
        $jobOffer->steps()->attach($request['steps']);
        error_log("ciao2");



        return response()->json($jobOffer->load('steps'), 201); 
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

        
        public function assignSteps( $request, $jobOfferId)
    {
        $jobOffer = Job_offer::findOrFail($jobOfferId);
        $stepIds = $request->input('step_ids'); 

        
        if (!is_array($stepIds)) {
            return response()->json(['error' => 'step_ids deve essere un array'], 400);
        }

       
        $steps = Step::whereIn('id', $stepIds)->get();
        if (count($steps) != count($stepIds)) {
            return response()->json(['error' => 'Uno o più steps non esistono'], 400);
        }

       
        $jobOffer->steps()->attach($stepIds);

        return response()->json([
            'message' => 'Steps assegnati con successo',
            'job_offer' => $jobOffer->load('steps')
        ], 200);
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
