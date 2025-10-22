# 🚀 Data Shuttle - Laravel File Processing Application

A Laravel application for uploading and processing CSV files in the background with real-time status updates and UTF-8 character cleanup.

## ✨ Features

-   📁 **File Upload**: Drag & drop CSV/TXT file upload interface
-   ⚙️ **Background Processing**: Files are processed asynchronously using Laravel queues
-   🔄 **Real-time Updates**: Live status updates using Inertia.js polling
-   🧹 **UTF-8 Cleanup**: Automatic removal of non-UTF-8 characters and HTML entities
-   🔒 **Data Integrity**: Prevents duplicate products using unique keys (same file can be uploaded multiple times safely)
-   🚨 **Error Handling**: Comprehensive error tracking and reporting
-   🎨 **Modern UI**: Built with React, Tailwind CSS, and shadcn/ui components

## 🛠️ Tech Stack

-   🐘 **Backend**: Laravel 12 with PHP 8.2+
-   ⚛️ **Frontend**: React 18 with Inertia.js
-   🎨 **Styling**: Tailwind CSS with shadcn/ui components
-   🗄️ **Database**: MySQL
-   📋 **Queue System**: Laravel Database Queue
-   🔐 **Authentication**: Laravel Breeze

## 📦 Installation

### 📋 Prerequisites

-   PHP 8.2 or higher
-   Composer
-   Node.js 18+ and npm
-   MySQL

### ⚙️ Setup

1. **Clone the repository**

    ```bash
    git clone git@github.com:HanJie-0523/data-shuttle.git
    cd data-shuttle
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database setup**

    ```bash
    # Configure your MySQL database in .env file
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password

    # Run migrations
    php artisan migrate
    ```

6. **Build assets**
    ```bash
    npm run build
    ```

## 🚀 Running the Application

### 🛠️ Development Mode

Start all services simultaneously:

```bash
npm run dev
```

This command runs:

-   Laravel development server (`php artisan serve`)
-   Queue worker (`php artisan queue:listen`)
-   Log viewer (`php artisan pail`)
-   Vite development server (`npm run dev`)

### 🏭 Production Mode

1. **Build assets**

    ```bash
    npm run build
    ```

2. **Start Laravel server**

    ```bash
    php artisan serve
    ```

3. **Start queue worker** (in a separate terminal)
    ```bash
    php artisan queue:work --queue=document
    ```

## 📄 File Processing

### 📁 Supported File Types

-   CSV files (`.csv`)
-   Text files (`.txt`)

### ⚙️ Processing Features

1. **UTF-8 Cleanup**:

    - Removes invalid UTF-8 bytes
    - Decodes HTML entities (e.g., `&#174;` → `®`)
    - Strips control characters
    - Normalizes whitespace

2. **CSV Processing**:

    - Auto-detects column headers
    - Maps CSV columns to database fields
    - Handles missing or malformed data
    - Creates or updates records based on unique keys

3. **Data Integrity**:
    - Same file can be uploaded multiple times
    - Products are not duplicated
    - File processing runs for each upload but data remains consistent

### 📊 Expected CSV Format

The application expects CSV files with these columns:

-   `UNIQUE_KEY` - Unique identifier for each record
-   `PRODUCT_TITLE` - Product title
-   `PRODUCT_DESCRIPTION` - Product description
-   `STYLE#` - Style number
-   `SANMAR_MAINFRAME_COLOR` - Color code
-   `SIZE` - Product size
-   `COLOR_NAME` - Color name
-   `PIECE_PRICE` - Price per piece

### 🧪 Test Files

The project includes sample CSV files for testing:

-   **`app/Data/test_import.csv`** - Sample product data for initial import testing
-   **`app/Data/test_updated.csv`** - Modified sample data with updated prices for testing data updates

These files contain realistic product data with all required columns and can be used to:

-   Test the file upload functionality
-   Verify data processing and UTF-8 cleanup
-   Test the behavior with duplicate unique keys
-   Validate the complete import workflow

### 🔧 Key Components

-   **ProcessDocument Job**: Handles background file processing
-   **DocumentRequest**: Validates file uploads
-   **DragDropFileUpload**: React component for file uploads
-   **FilesDataTable**: Displays upload history

## 🔧 Troubleshooting

### 📝 Logs

View application logs:

```bash
tail -f storage/logs/laravel.log
```

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
