<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index()
    {
        $logs = ActivityLog::with('user')->orderBy('created_at', 'desc')->get()->map(function($log) {
            return [
                'id' => $log->id,
                'user_name' => $log->user ? $log->user->name : 'System',
                'action' => $log->action,
                'entity' => $log->entity_type . ' (ID: ' . $log->entity_id . ')',
                'details' => $log->details,
                'created_at' => $log->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return Inertia::render('CMS/ActivityLog', [
            'logs' => $logs
        ]);
    }
}
