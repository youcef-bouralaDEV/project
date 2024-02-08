<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'admin',
            'raison_social'=> '123',
            'lastname' => 'admin1',
            'username' => 'admin1',
            'mobile'=> "0555555",
            'email' => 'admin@g',
            'wilaya'=> 'alger',
            'commune'=>"alger",
            'password' => bcrypt('123')
        ]);
        $user = User::create([
            'name' => 'user',
            'raison_social'=> '123',
            'lastname' => 'user',
            'username' => 'user',
            'email' => 'user@g',
            'mobile'=> "0555555",
            'groupe' => 'one',
            'wilaya'=> 'alger',
            'commune'=>"alger",
            'password' => bcrypt('123')
        ]);


        $userRole = Role::where('name', 'user')->first();
        $adminRole = Role::where('name', 'admin')->first();

        $user->assignRole($userRole);
        $admin->assignRole($adminRole);
    }
    // {

    //     // $user_list = Permission::create(['name' => 'users.list']);
    //     // $user_view = Permission::create(['name' => 'users.view']);
    //     // $user_create = Permission::create(['name' => 'users.create']);
    //     // $user_update = Permission::create(['name' => 'users.update']);
    //     // $user_delete = Permission::create(['name' => 'users.delete']);

    //     // $admin_role = Role::create(['name' => 'admin']);

    //     // $admin_role->givePermissionTo([
    //     //     $user_create,
    //     //     $user_list,
    //     //     $user_update,
    //     //     $user_view,
    //     //     $user_delete
    //     // ]);

    //     // $admin = User::create([
    //     //     'name' => 'Admin',
    //     //     'email' => 'admin@admin',
    //     //     'password' => bcrypt('123')
    //     // ]);

    //     // $admin->assignRole($admin_role);
    //     // $admin->givePermissionTo([
    //     //     $user_create,
    //     //     $user_list,
    //     //     $user_update,
    //     //     $user_view,
    //     //     $user_delete
    //     // ]);

    //     // $user = User::create([
    //     //     'name' => 'user',
    //     //     'email' => 'user@user',
    //     //     'password' => bcrypt('123')
    //     // ]);

    //     // $user_role = Role::create(['name' => 'user']);

    //     // $user->assignRole($user_role);
    //     // $user->givePermissionTo([
    //     //     $user_list,
    //     // ]);

    //     // $user_role->givePermissionTo([
    //     //     $user_list,
    //     // ]);
    // }
}