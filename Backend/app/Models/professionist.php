<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Professionist extends Model
{
    use HasFactory;

    public function candidate(): HasMany
    {
        return $this->hasMany(Candidate::class);
    }

    public function cv(): BelongsTo
    {
        return $this->belongsTo(Cv::class);
    }
}
