<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use App\Models\cv;
use App\Http\Requests\StorecvRequest;
use App\Http\Requests\UpdatecvRequest;

class CvController extends Controller
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
    public function store(StorecvRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(cv $cv)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(cv $cv)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecvRequest $request, cv $cv)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(cv $cv)
    {
        //
    }
}
