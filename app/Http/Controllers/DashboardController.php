<?php

namespace App\Http\Controllers;

use App\Enums\DocumentStatus;
use App\Http\Filters\DocumentFilter;
use App\Http\Requests\DocumentRequest;
use App\Http\Resources\DocumentResource;
use App\Jobs\ProcessDocument;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function dashboard(Request $request)
    {
        $documents = Document::filter(new DocumentFilter($request))->orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'files' => DocumentResource::collection($documents),
        ]);
    }

    /**
     * Handle CSV file upload and import products.
     */
    public function uploadFile(DocumentRequest $request)
    {

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('uploads', $fileName);

        $document = Document::create([
            'name' => $file->getClientOriginalName(),
            'status' => DocumentStatus::PENDING,
            'file_path' => $filePath,
            'imported_count' => 0,
            'error_count' => 0,
        ]);

        ProcessDocument::dispatch($document)->onQueue('document');

        return redirect()->route('dashboard');
    }
}
