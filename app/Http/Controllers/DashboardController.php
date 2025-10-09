<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function dashboard(Request $request): Response
    {
        $files = Document::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'files' => $files,
        ]);
    }
}
