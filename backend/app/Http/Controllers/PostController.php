<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    //
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(6);
        return PostResource::collection($posts);
    }

    public function totalPosts()
    {
        $total_posts = Post::count();
        $total_users = User::count();
        return response()->json([
            'total_posts' => $total_posts,
            'total_users' => $total_users,
        ]);
    }

    public function createPost(PostRequest $request)
    {
        $post = Post::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json([
            'succes' => true,
        ], 201);
    }

    public function viewPost($post_id)
    {
        return new PostResource(Post::with('user')->findOrFail($post_id));
    }

    public function updatePost(PostRequest $request, $post_id)
    {
        $user_id = auth()->id();

        $post = Post::where('user_id', $user_id)->where('id', $post_id)->first();

        if(!$post){
            return response()->json([
                'message' => "Post is unavailable",
            ]);
        }
        
        $post->update($request->only(['title', 'content']));

        return response()->json([
            'success' => true,
        ]);
    }

    public function deletePost($post_id)
    {

        $user_id = auth()->id();

        $post = Post::where('user_id', $user_id)->where('id', $post_id)->first();

        if(!$post){
            return response()->json([
                'message' => "Post is unavailable",
            ]);
        }

        $post->delete();
        return response()->json([
            'success' => true,
        ]);
    }
}
