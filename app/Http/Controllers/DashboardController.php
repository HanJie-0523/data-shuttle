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

    /**
     * Handle CSV file upload and import products.
     */
    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt|max:10240',
        ]);

        // Store the uploaded file
        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        // Create document record
        Document::create([
            'name' => $file->getClientOriginalName(),
            'status' => 'pending',
            'file_path' => $filePath,
            'imported_count' => 0,
            'error_count' => 0,
        ]);

        return redirect()->route('dashboard');
    }
}
