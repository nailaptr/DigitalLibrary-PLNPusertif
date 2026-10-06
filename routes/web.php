<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'landing'])->name('public.landing');
Route::get('/overview', [PublicController::class, 'overview'])->name('public.overview');
Route::get('/standar', [PublicController::class, 'standards'])->name('public.standards');
Route::get('/standar/{id}', [PublicController::class, 'showStandard'])->name('public.standards.show');
Route::get('/sertifikat', [PublicController::class, 'certificates'])->name('public.certificates');
Route::get('/dokumen', [PublicController::class, 'documents'])->name('public.documents');
Route::get('/temuan', [PublicController::class, 'findings'])->name('public.findings');

Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'permission:view dashboard'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // CMS Routes
    Route::resource('standards', App\Http\Controllers\StandardController::class)
        ->except(['create', 'show', 'edit'])
        ->middleware('permission:manage standards');
        
    Route::resource('documents', App\Http\Controllers\DocumentController::class)
        ->except(['create', 'show', 'edit'])
        ->middleware('permission:manage documents');
        
    Route::resource('certificates', App\Http\Controllers\CertificateController::class)
        ->except(['create', 'show', 'edit'])
        ->middleware('permission:manage certificates');

    Route::get('/findings/overview', [App\Http\Controllers\FindingController::class, 'overview'])
        ->name('findings.overview')
        ->middleware('permission:manage findings');

    Route::resource('findings', App\Http\Controllers\FindingController::class)
        ->except(['create', 'show', 'edit'])
        ->middleware('permission:manage findings');
        
    Route::post('/findings/{finding}/publish', [App\Http\Controllers\FindingController::class, 'publish'])
        ->name('findings.publish')
        ->middleware('permission:manage findings');
        
    Route::post('/findings/{finding}/unpublish', [App\Http\Controllers\FindingController::class, 'unpublish'])
        ->name('findings.unpublish')
        ->middleware('permission:manage findings');

    Route::get('/reports', [App\Http\Controllers\ReportController::class, 'index'])
        ->middleware('permission:view statistics')
        ->name('reports.index');

    Route::resource('users', App\Http\Controllers\UserController::class)
        ->except(['create', 'show', 'edit'])
        ->middleware('permission:manage users');

    Route::get('/activity-logs', [App\Http\Controllers\ActivityLogController::class, 'index'])
        ->middleware('permission:view activity log')
        ->name('activity_logs.index');
});

require __DIR__.'/auth.php';
