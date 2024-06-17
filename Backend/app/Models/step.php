<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Step extends Model
{
    use HasFactory;

    public function candidate(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    public function job_offer(): BelongsToMany
    {
        return $this->belongsToMany(Job_offer::class, 'job_step', 'step_id', 'job_offer_id');
    }
}
