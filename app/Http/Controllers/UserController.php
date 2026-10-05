<?php

namespace App\Http\Controllers;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use App\Models\ActivityLog;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->orderBy('created_at', 'desc')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->first() ? $user->roles->first()->name : 'User',
                'status' => 'Active', // Mocked as we don't have status column yet
                'createdAtDate' => $user->created_at ? $user->created_at->format('M d, Y') : null,
                'createdAt' => $user->created_at ? $user->created_at->format('d F Y, H:i A') : null,
                'updatedAt' => $user->updated_at ? $user->updated_at->format('d F Y, H:i A') : null,
            ];
        });

        $roles = Role::all()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
            ];
        });

        return Inertia::render('CMS/UserManagement', [
            'initialUsers' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        ActivityLog::record(ActivityLog::ACTION_CREATE, $user, "Menambahkan user baru: {$user->email}");

        return redirect()->back();
    }

    public function update(Request $request, User $user)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'role' => 'required|exists:roles,name',
        ];

        if ($request->filled('password')) {
            $rules['password'] = ['confirmed', Rules\Password::defaults()];
        }

        $validated = $request->validate($rules);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        if ($request->filled('password')) {
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        $user->syncRoles([$validated['role']]);

        ActivityLog::record(ActivityLog::ACTION_UPDATE, $user, "Memperbarui user: {$user->email}");

        return redirect()->back();
    }

    public function destroy(User $user)
    {
        ActivityLog::record(ActivityLog::ACTION_DELETE, $user, "Menghapus user: {$user->email}");
        
        $user->delete();

        return redirect()->back();
    }
}
