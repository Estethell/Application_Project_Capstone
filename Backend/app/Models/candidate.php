<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Candidate extends Model
{
    use HasFactory;

    public function job_offer(): BelongsTo
    {
        return $this->belongsTo(Job_Offer::class);
    }

    public function event(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function professionist(): BelongsTo
    {
        return $this->belongsTo(Professionist::class);
    }

    public function step(): HasMany
    {
        return $this->hasMany(Step::class);
    }
}
