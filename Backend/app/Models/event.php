<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model
{

    protected $fillable = [
        'type',
        'description',
        'time',
        'candidates_id',
    ];
    use HasFactory;

    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidates_id');
    }
}
