<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use App\Models\candidate;
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
    public function create($candidate)
    {
        $candidate = Candidate::create([


        ]);
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
    public function show(candidate $candidate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(candidate $candidate)
    {
        //
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
    public function destroy(candidate $candidate)
    {
        //
    }
}
