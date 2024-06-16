<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;


use App\Models\professionist;
use App\Http\Requests\StoreprofessionistRequest;
use App\Http\Requests\UpdateprofessionistRequest;
use App\Http\Service\ProfessionistService;
use App\Models\Candidate;

class ProfessionistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $professionists =  Professionist::all();
        return response()->json($professionists);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprofessionistRequest $request)
    {
        if($request === null) {
            $validateData = $request->validate([
                'name'=>'required',
                'email'=>'required | email',
                'surname'=>'required',
                'id_job'=>'required',
                'id_step'=>'required'
            ]);

            $professionist = Professionist::create([
                
                    'name'=>$validateData['name'],
                    'email'=>$validateData['email'],
                    'surname'=>$validateData['surname'],
                    
            ]);

            $candidate = Candidate::create([
                'id_job'=>$validateData['id_job'],
                'id_step'=>$validateData['id_step']
            ]);

            $professionist = ProfessionistService::professionistPost($professionist, $candidate);
        }
       
    return response()->json($professionist);
    }

    /**
     * Display the specified resource.
     */
    public function show(professionist $professionist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(professionist $professionist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprofessionistRequest $request, professionist $professionist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(professionist $professionist)
    {
        //
    }
}
