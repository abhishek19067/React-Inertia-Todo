<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\NewUser;
use App\Models\User;
use App\Models\data;
use illuminate\support\facades\auth;

class homeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('test');
    }
    public function register(request $request){
            $json=[
                'name' => $request->input('name'),
                'password' => $request->input('password'),
                'email' => $request->input('email'),
            ];
            $validated = $request->validate([
                'name' => 'required|max:10',
                'password' => 'required|max:8',
                'email' => 'required|email',
            ]);
            $User = User::create($validated);
            return response()->json(["message"=>"User Registered Succesfully"]);
        }  

public function logins(){
    return Inertia::render('login');
}

public function login(Request $request)
{
    $validated = $request->validate([
        'name' => 'required',
        'password' => 'required',
    ]);
    if (Auth::attempt($validated)) {
        return response()->json(["message"=>"User logged in Succesfully"]);
        return redirect()->route('home');
    } else {
        return response()->json(["error" => "Invalid Credentials"], 401);
    }
}


public function home(){
           return inertia::render('Homepage/Main');
    }
    public function get_user(){
        $user = auth()->user();
        return response()->json(["user"=>$user]);
    }
      
                   
    public function store(Request $request)
    {
        $json=[
            'stored_data' => $request->input('stored_data'),
        ];
        $validated = $request->validate(
            [
                'stored_data' => 'required|max:100',
            ]
            );

             $data = new data();
             $data->stored_data = $request->input('stored_data');
             $data->save();
            return response()->json([
                'message' => 'Data stored successfully',
            ]);
            }

    public function show()
    {
        $data = data::all();
        return response()->json([
            'data' => $data,
        ]);
    }

    public function delete( $id)
   {
    $data = data::find($id);
    $data->delete();
    return response()->json([
        'message' => 'Data deleted successfully',
    ])
    ->setStatusCode(200);
}
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = data::find($id);
        return response()->json([
            'data' => $data,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $data = data::find($id);
        $data->stored_data = $request->input('stored_data');
        $data->save();
        return response()->json([
            'message' => 'Data updated successfully',
            ]);
    }


    /**
     * Remove the specified resource from storage.
     */
  public function logout(){
    auth()->logout();
    return response()->json([
        'message' => 'Logged out successfully',
    ]);
  }
}
