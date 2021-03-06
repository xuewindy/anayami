<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/article',function()
{
    $first = 'jelly';
    $last = 'bool';
    return view('articles.list',compact('first','last'));
});
Route::get('/home','ArticleController@index');
Route::get('articles/{id}','ArticleController@show');
Route::group(['prefix' => 'admin'],function()
{
   Route::get('/create','ArticleController@create');
    Route::post('/articles','ArticleController@store');

});
Route::group(['prefix' => 'test'],function()
{
//    Route::get('welcome','TestController@index');
    Route::get('/form','TestController@create');
    Route::post('/formprocess','TestController@formprocess');
});
