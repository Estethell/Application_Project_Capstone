<?php

namespace Database\Seeders;

use App\Models\Job_offer;
use App\Models\Step;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobOfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
 $steps = Step::all();

 $jobOffer1 = Job_offer::create([
    'name' => 'Senior Backend Developer',
    'description' => 'Responsible for server-side web application logic and integration'
]);

$jobOffer2 = Job_offer::create([
    'name' => 'Full Stack Engineer',
    'description' => 'Handles both frontend and backend development tasks and integration'
]);

$jobOffer3 = Job_offer::create([
    'name' => 'Frontend Developer',
    'description' => 'Creates and implements user-facing features using web technologies'
]);

$jobOffer4 = Job_offer::create([
    'name' => 'Mobile App Developer',
    'description' => 'Develops and maintains applications for mobile devices, various platforms'
]);

$jobOffer5 = Job_offer::create([
    'name' => 'DevOps Engineer',
    'description' => 'Combines software development and IT operations, automates processes'
]);

$jobOffer6 = Job_offer::create([
    'name' => 'Software Architect',
    'description' => 'Designs software architecture, high-level structure of software systems'
]);

$jobOffer7 = Job_offer::create([
    'name' => 'Data Scientist',
    'description' => 'Analyzes complex data sets to extract valuable insights and information'
]);

$jobOffer8 = Job_offer::create([
    'name' => 'Machine Learning Engineer',
    'description' => 'Designs and implements machine learning models and algorithms'
]);

$jobOffer9 = Job_offer::create([
    'name' => 'Cloud Solutions Architect',
    'description' => 'Designs and manages cloud infrastructure and services for businesses'
]);

$jobOffer10 = Job_offer::create([
    'name' => 'PHP back end',
    'description' => 'Responsible for server-side web application logic and integration on PHP'
]);

$stepIds = Step::all()->pluck('id')->toArray();

       
        if (count($stepIds) >= 10) {
            
            $jobOffer1->steps()->attach([$stepIds[3], $stepIds[4]]);
            $jobOffer2->steps()->attach([$stepIds[7], $stepIds[9], $stepIds[0]]);
            $jobOffer3->steps()->attach([$stepIds[1], $stepIds[5]]);
            $jobOffer4->steps()->attach([$stepIds[2], $stepIds[6], $stepIds[3], $stepIds[4]]);
            $jobOffer5->steps()->attach([$stepIds[7], $stepIds[1]]);
            $jobOffer6->steps()->attach([$stepIds[8], $stepIds[0]]);
            $jobOffer7->steps()->attach([$stepIds[2], $stepIds[3]]);
            $jobOffer8->steps()->attach([$stepIds[4], $stepIds[5], $stepIds[6]]);
            $jobOffer9->steps()->attach([$stepIds[7], $stepIds[8], $stepIds[9]]);
            $jobOffer10->steps()->attach([$stepIds[0], $stepIds[1], $stepIds[2]]);
        } else {
         
            throw new \Exception('Non ci sono abbastanza step nel database.');
        }
    
    
    
    }
}



            
          
