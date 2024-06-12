<?php

namespace Database\Seeders;

use App\Models\Job_offer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobOfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     Job_offer::create([
    'name' => 'Senior Backend Developer',
    'description' => 'Responsible for server-side web application logic and integration'
]);

Job_offer::create([
    'name' => 'Full Stack Engineer',
    'description' => 'Handles both frontend and backend development tasks and integration'
]);

Job_offer::create([
    'name' => 'Frontend Developer',
    'description' => 'Creates and implements user-facing features using web technologies'
]);

Job_offer::create([
    'name' => 'Mobile App Developer',
    'description' => 'Develops and maintains applications for mobile devices, various platforms'
]);

Job_offer::create([
    'name' => 'DevOps Engineer',
    'description' => 'Combines software development and IT operations, automates processes'
]);

Job_offer::create([
    'name' => 'Software Architect',
    'description' => 'Designs software architecture, high-level structure of software systems'
]);

Job_offer::create([
    'name' => 'Data Scientist',
    'description' => 'Analyzes complex data sets to extract valuable insights and information'
]);

Job_offer::create([
    'name' => 'Machine Learning Engineer',
    'description' => 'Designs and implements machine learning models and algorithms'
]);

Job_offer::create([
    'name' => 'Cloud Solutions Architect',
    'description' => 'Designs and manages cloud infrastructure and services for businesses'
]);

Job_offer::create([
    'name' => 'PHP back end',
    'description' => 'Responsible for server-side web application logic and integration on PHP'
]);

    
    
    
    
    }
}



            
          
