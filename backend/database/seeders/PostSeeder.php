<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\User::all()->each(function ($user) {
            \App\Models\Post::factory()->count(7)->create([
                'user_id' => $user->id,
            ]);
        });
    }
}
