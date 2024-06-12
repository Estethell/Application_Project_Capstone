<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cv extends Model
{
    use HasFactory;

    public function professionist(): BelongsTo
    {
        return $this->belongsTo(Professionist::class);
    }
}
