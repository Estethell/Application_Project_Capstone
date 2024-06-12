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
        return $this->hasMany(Candidate::class);
    }

    public function step(): BelongsToMany
    {
        return $this->belongsToMany(Step::class, 'job_step');
    }

}
