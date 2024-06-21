<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Job_offer extends Model
{
    use HasFactory;

    public function candidate(): HasMany
    {
        return $this->hasMany(Candidate::class,'job_offers_id');
    }

    public function steps(): BelongsToMany
    {
        return $this->belongsToMany(Step::class, 'job_step', 'job_offer_id', 'step_id');
    }

}
