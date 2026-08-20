<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('homepage dapat diakses', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});

test('guest tidak dapat mengakses dashboard', function () {
    $response = $this->get('/dashboard');
    $response->assertRedirect('/login');
});

test('user dapat login dan authentication bekerja', function () {
    $user = User::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('role dan permission dapat digunakan', function () {
    $user = User::factory()->create();
    $role = Role::create(['name' => 'TestManager']);
    $permission = Permission::create(['name' => 'view dashboard']);
    
    $role->givePermissionTo($permission);
    $user->assignRole($role);
    
    expect($user->hasRole('TestManager'))->toBeTrue();
    expect($user->hasPermissionTo('view dashboard'))->toBeTrue();

    $response = $this->actingAs($user)->get('/dashboard');
    $response->assertStatus(200);
});

test('database dapat digunakan', function () {
    $user = User::factory()->create(['name' => 'Test DB User']);
    
    $this->assertDatabaseHas('users', [
        'email' => $user->email,
        'name' => 'Test DB User',
    ]);
});
