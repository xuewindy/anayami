<?php

namespace App\Http\Controllers;

use App\Events\UserLogin;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\User;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('test.welcome');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view("test.form");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public  function formprocess(Request $request)
    {
        $email = $request->input('email');
        echo $email;
//        dd($request);
        $tempencrypt = Crypt::encrypt($email);
        echo $tempencrypt;
        echo '<br>';
        $tempdecrypt = Crypt::decrypt($tempencrypt);
//        echo $tempdecrypt;

        echo '<br>';
        echo Hash::make($email);
        $response = Event::fire(new UserLogin());
        $user = User::find(1);
        dd($user);
        //登录后注册发邮件
//        $data = ['email' => $email, 'name'=>'xuegeng', 'uid'=>1, 'activationcode'=>1];
//        Mail::send('activemail', $data, function($message) use($data)
//        {
//            $message->to($data['email'], $data['name'])->subject('欢迎注册我们的网站，请激活您的账号！');
//        });

    }
}
