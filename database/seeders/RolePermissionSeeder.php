<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Define permissions
        $permissions = [
            'view dashboard',
            'manage users',
            'manage documents',
            'review documents',
            'view statistics',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->givePermissionTo(Permission::all());

        $managerRole = Role::create(['name' => 'Manager']);
        $managerRole->givePermissionTo([
            'view dashboard',
            'manage documents',
            'review documents',
            'view statistics',
        ]);

        $staffRole = Role::create(['name' => 'Staff']);
        $staffRole->givePermissionTo([
            'view dashboard',
            'manage documents',
        ]);

        $guestRole = Role::create(['name' => 'Guest']);
        // Guest role has no specific permissions in this seeder, 
        // but can be given minimal access if needed.

        // Create an Admin user
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ]
        );
        
        $adminUser->assignRole($adminRole);
    }
}
