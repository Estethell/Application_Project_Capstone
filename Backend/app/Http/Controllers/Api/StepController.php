<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use App\Models\step;
use App\Http\Requests\StorestepRequest;
use App\Http\Requests\UpdatestepRequest;

class StepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorestepRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(step $step)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(step $step)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatestepRequest $request, step $step)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(step $step)
    {
        //
    }
}
