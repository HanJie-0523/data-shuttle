<?php

namespace App\Jobs;

use App\Models\Document;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessDocument implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Document $document)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $this->document->update(['status' => 'processing']);

            $filePath = $this->document->file_path;

            if (!Storage::exists($filePath)) {
                throw new \Exception("File not found: {$filePath}");
            }

            $csvData = $this->readCsvFile($filePath);

            // Get column mapping from header row
            $columnMapping = $this->getColumnMapping($csvData[0]);

            $importedCount = 0;
            $errorCount = 0;

            foreach ($csvData as $rowIndex => $row) {
                try {
                    // Skip header row
                    if ($rowIndex === 0) {
                        continue;
                    }

                    // Map CSV columns to database fields
                    $productData = $this->mapCsvToProduct($row, $columnMapping);

                    // Skip if required fields are missing
                    if (empty($productData['unique_key'])) {
                        $errorCount++;
                        continue;
                    }

                    // Create or update product
                    Product::updateOrCreate(
                        ['unique_key' => $productData['unique_key']],
                        $productData
                    );

                    $importedCount++;
                } catch (\Exception $e) {
                    $errorCount++;
                    Log::error("Error processing row {$rowIndex}: " . $e->getMessage());
                }
            }

            // Update document with results
            $this->document->update([
                'status' => 'completed',
                'imported_count' => $importedCount,
                'error_count' => $errorCount,
            ]);
        } catch (\Exception $e) {
            // Update document status to failed
            $this->document->update([
                'status' => 'failed',
                'error_count' => $this->document->error_count + 1,
            ]);

            Log::error("ProcessDocument job failed for document {$this->document->id}: " . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Read CSV file and return array of rows
     */
    private function readCsvFile(string $filePath): array
    {
        $content = Storage::get($filePath);
        $lines = explode("\n", $content);
        $csvData = [];

        foreach ($lines as $line) {
            if (trim($line)) {
                $csvData[] = str_getcsv($line);
            }
        }

        return $csvData;
    }

    /**
     * Get column mapping from CSV header row
     */
    private function getColumnMapping(array $headerRow): array
    {
        $mapping = [];

        // Define the columns we need and their CSV header names
        $requiredColumns = [
            'unique_key' => 'UNIQUE_KEY',
            'title' => 'PRODUCT_TITLE',
            'description' => 'PRODUCT_DESCRIPTION',
            'style' => 'STYLE#',
            'sanmar_mainframe_color' => 'SANMAR_MAINFRAME_COLOR',
            'size' => 'SIZE',
            'color_name' => 'COLOR_NAME',
            'piece_price' => 'PIECE_PRICE',
        ];

        foreach ($headerRow as $index => $header) {
            $header = trim($header);

            // Find matching column
            foreach ($requiredColumns as $dbField => $csvHeader) {
                if ($header === $csvHeader) {
                    $mapping[$dbField] = $index;
                    break;
                }
            }
        }

        return $mapping;
    }

    /**
     * Map CSV row to product data using column mapping
     */
    private function mapCsvToProduct(array $row, array $columnMapping): array
    {
        $productData = [];

        // Map each field using the column mapping
        foreach ($columnMapping as $dbField => $columnIndex) {
            $productData[$dbField] = $row[$columnIndex] ?? '';
        }

        return $productData;
    }
}
