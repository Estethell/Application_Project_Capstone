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

    

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cv(): BelongsTo
    {
        return $this->belongsTo(Cv::class);
    }

    public function step(): BelongsTo
    {
        return $this->belongsTo(Step::class);
    }
    public function event(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
