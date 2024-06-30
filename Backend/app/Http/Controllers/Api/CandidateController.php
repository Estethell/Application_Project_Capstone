<?php

namespace App\Http\Controllers\Api;
use App\Models\candidate;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorecandidateRequest;
use App\Http\Requests\UpdatecandidateRequest;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::all();
        return response()->json($candidates);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        

        $candidate = Candidate::create([
            'job_offers_id' => $request['jobOfferId'],
            'users_id' => $request['userId'],
            'steps_id' => $request['stepId'],
        ]);

        return response()->json($candidate, 201); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorecandidateRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        error_log("ciao");
        try {
            $candidates = Candidate::with('job_offer', 'user', 'step')->get();
            error_log($candidates);
            
            return [
                'success' => true,
                'data' => $candidates
            ];
        } catch (\Exception $e) {
            return response([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $body, $id)
    {
        $candidate = Candidate::findOrFail($id);
        $candidate->steps_id=$body['nextStepId'];
        $candidate->save();
        return $candidate;

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecandidateRequest $request, candidate $candidate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $candidate = Candidate::find($id);
    
        if (!$candidate) {
            return response()->json(['success' => false, 'message' => 'Candidatura non trovata'], 404);
        }
    
        
        $candidate->events()->delete();
    
        
        $candidate->delete();
    
        return response()->json(['success' => true, 'message' => 'Candidatura eliminata con successo']);
    }
    
}
