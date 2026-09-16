<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'landing'])->name('public.landing');
Route::get('/overview', [PublicController::class, 'overview'])->name('public.overview');
Route::get('/standar', [PublicController::class, 'standards'])->name('public.standards');
Route::get('/sertifikat', [PublicController::class, 'certificates'])->name('public.certificates');

Route::get('/dashboard', function () {
    return redirect()->route('documents.index');
})->middleware(['auth', 'verified', 'permission:view dashboard'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // CMS Routes
    Route::resource('standards', App\Http\Controllers\StandardController::class)->except(['create', 'show', 'edit']);
    Route::resource('documents', App\Http\Controllers\DocumentController::class)->except(['create', 'show', 'edit']);
    Route::resource('certificates', App\Http\Controllers\CertificateController::class)->except(['create', 'show', 'edit']);

    Route::get('/reports', [App\Http\Controllers\ReportController::class, 'index'])
        ->middleware('permission:view statistics')
        ->name('reports.index');

    Route::get('/activity-logs', [App\Http\Controllers\ActivityLogController::class, 'index'])
        ->middleware('permission:view activity log')
        ->name('activity_logs.index');
});

require __DIR__.'/auth.php';
