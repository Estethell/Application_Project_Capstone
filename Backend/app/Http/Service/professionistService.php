<?php

namespace App\Http\Service;
use App\Models\professionist;
use App\Models\cv;


class ProfessionistService 
{

    static function professionistPost($data)
    {
        $professionist = Professionist::create([
            'name' => $data['name'],
            'surname' => $data['surname'],
            'email' => $data['email']
        ]);

            $cv = Cv::create([
                'professionist_id' => $professionist->id, 
                'content' => $data['cv']
            ]);
    
           
            return $professionist;


    }
}

