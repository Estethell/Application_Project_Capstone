<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\UserNotificationMail;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail(Request $request)
    {
        $details = [
            'title' => 'Candidatura di lavoro',
            'body' => 'Purtroppo la sua candidatura è stata rifiutata. Ritenta, sarà più fortunato!'
        ];

        Mail::to($request->user()->email)->send(new UserNotificationMail($details));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
