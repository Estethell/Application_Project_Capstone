<?php

namespace App\Http\Controllers\Api;
use App\Models\event;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreeventRequest;
use App\Http\Requests\UpdateeventRequest;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $events = Event::where('candidates_id', $id)->get();
    return response()->json($events);
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
    public function store(StoreeventRequest $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        error_log($request);

        $time = Carbon::parse($request->input('time'))->toDateTimeString();
        
        $event = Event::create([
            'candidates_id' =>$request['id'],
            'time' => $time,
            'type' => $request['type'],
            'description' => $request['comment'],
        ]);

        return response()->json($event, 201); 
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateeventRequest $request, event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(event $event)
    {
        //
    }
}
