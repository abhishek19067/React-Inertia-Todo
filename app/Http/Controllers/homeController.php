<?php

namespace App\Http\Controllers;

use App\Http\Requests\registerRequest;
use App\Http\Requests\TodoRequest;
use App\Http\Requests\updateNameRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Data;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class HomeController extends Controller
{
    //show Register Page
    public function index()
    {
        return Inertia::render('RegisterPage');
    }
   // store data from register form
   public function register(RegisterRequest $request)
{
    $validated = $request->validated();

    $existingUser = User::where('email', $validated['email'])->first();
    if ($existingUser) {
        return response()->json([
            'message' => 'Email already exists',
            'errors' => ['email' => ['Email already exists']],
        ], 422); 
    }
    
    $user = User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);
    return response()->json([
        'message' => 'User Registered Successfully',
        'status' => true,
        'token' => $user->createToken("API Token")->plainTextToken,
    ]);
} 

    //show login form
    public function logins()
    {
        return Inertia::render('login');
    }

    //check data from
    public function login(Request $request)
    {
        $credentials = $request->only(['name', 'password']);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid Credentials']);
        }
        $User_id = Auth::user()->id;
        $user = User::where('name', $credentials['name'])->first();

        return response()->json([
            'message' => 'User logged in successfully',
            'status' => true,
            'token' => $user->createToken("API Token")->plainTextToken,
            'user' => $user
        ]);
    }
    public function logout(Request $request)
    {
        Auth::logout();
        // $request->user()->tokens()->delete();
        return response()->json(['message' => 'User logged out successfully']);
    }


    public function home()
    {
        $User_id = auth::id();
        $user = User::where('id', $User_id)->first();
        $token=$user->createtoken("API  Token")->plainTextToken;
        return Inertia::render('Homepage/Mainpage', ['user' => $user],['token'=>$token]);
    }

    public function store(TodoRequest  $request)
    {
     $validated=$request->validated();   
         $data = new Data();
        $data->stored_data = $validated['stored_data'];
        $data->User_id=$validated['userID'];
        $data->save();
        return response()->json(['message' => 'Data stored successfully',
        'data'=>
        [
            'stored_data'=>$validated['stored_data'],
        ]
    ]);
    }

    public function show($userId)
    {
        $data = Data::where('user_id', $userId)->get();
        return response()->json(['data' => $data]);
    }
    public function showing()
    {
        return Inertia::render('Homepage/showing_data');
    }

    public function delete($id)
    {
        $data = Data::findOrFail($id);
        $data->delete();
        return response()->json(['message' => 'Data deleted successfully']);
    }

    public function edit($id)
    {
        $data = Data::findOrFail($id);
        return response()->json(['data' => $data]);
    }

    public function update(Request $request, $id)
    {
        
        $data = Data::findOrFail($id);
        $data->stored_data = $request['stored_data'];
        $data->save();

        return response()->json(['message' => 'Data updated successfully']);
    }
    public function update_username(updateNameRequest $request ,$id)
    {
        $validated = $request->validated();
        $oldname= User::where('id',$id)->value('name');
            $data = User::findOrFail($id);
            $data->name = $validated['name'];
            $data->save();
            $newname=$data->name;
            return response()->json(
            [
                'message' => 'Username updated successfully  from '.$oldname.' to '.$newname,
            ]);
    }
    public function update_password(request $request,$id)
    {
        $user = User::where('id',$id)->first();
        if (Hash::check($request->old_password, $user->password)) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json(['message' => 'Password updated successfully']);
            } else {
                return response()->json(['error' => 'Old Password is Incorrect']);
            }
        }

       
   
}
