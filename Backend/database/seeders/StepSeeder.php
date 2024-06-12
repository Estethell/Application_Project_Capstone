<?php

namespace Database\Seeders;

use App\Models\Step;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     Step::create([
        "name"=> "Ricezione della candidatura",
        "description"=> "La candidatura è stata ricevuta e registrata nel sistema."
]);

Step::create([
    "name"=> "Screening iniziale del CV",
        "description"=> "Il CV e la lettera di presentazione sono stati valutati per una prima selezione."
]);

Step::create([
    "name"=> "Contatto iniziale con il candidato",
        "description"=> "Il candidato è stato contattato per confermare la ricezione della candidatura e per eventuali chiarimenti."
]);

Step::create([
    "name"=> "Prima intervista telefonica",
        "description"=> "È stata condotta una breve intervista telefonica per una valutazione preliminare delle competenze e dell'idoneità."
]);

Step::create([
    "name"=> "Valutazione approfondita del CV",
        "description"=> "Il CV è stato esaminato in dettaglio per verificare le esperienze lavorative e le qualifiche."
]);

Step::create([
    "name"=> "Programmazione del colloquio di persona o via video",
        "description"=> "È stato programmato un colloquio di persona o via video con il candidato."
]);

Step::create([
    "name"=> "Colloquio tecnico/di competenze",
        "description"=> "Il candidato ha partecipato a un colloquio tecnico per valutare le competenze specifiche richieste per la posizione."
]);

Step::create([
    "name"=> "Valutazione della compatibilità culturale",
        "description"=> "Il candidato è stato valutato per la compatibilità con la cultura aziendale e il team di lavoro."
    
]);

Step::create([
    "name"=> "Verifica delle referenze",
        "description"=> "Sono state contattate le referenze fornite dal candidato per una valutazione finale."
]);
Step::create([
    "name"=> "Decisione finale e offerta di lavoro",
        "description"=> "È stata presa una decisione finale sulla candidatura e, se positiva, è stata fatta un'offerta di lavoro al candidato."
]);

    
    
    
    
    }
}



