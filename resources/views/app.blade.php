<!DOCTYPE html>
<html class="no-js" lang="zh-CN">
<head>
    <style>
        #navbarico
        {
            color: purple;
        }
    </style>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title id="title">Fantasy</title>
    <link rel='stylesheet' href="/bootstrap/css/bootstrap.css" type='text/css' media='all'/>
    <script type='text/javascript' src="/bootstrap/js/bootstrap.js"></script>
</head>
<body>
<div id="wrapper">
    <span class="sr-only">Toggle Navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" id="navbarico" href="#">Anayami</a>
</div>

<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    <ul class="nav navbar-nav">
        <li><a href="{{ url('/') }}">Home</a></li>
    </ul>

    <ul class="nav navbar-nav navbar-right">
        @if (Auth::guest())
            <li><a href="{{ url('/auth/login') }}">Login</a></li>
            <li><a href="{{ url('/auth/register') }}">Register</a></li>
        @else
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                    <li><a href="{{ url('/auth/logout') }}">Logout</a></li>
                </ul>
            </li>
        @endif
    </ul>
</div>
{{--</div>--}}
{{--</nav>--}}
    <div class="container-fluid">
        {{--<section class="content">--}}
            {{--<div class="pad group">--}}
                @yield('content')
            {{--</div>--}}
        {{--</section>--}}
    </div>


    {{--<nav class="nav-container group" id="nav-footer" >--}}
        {{--<div class="nav-wrap">--}}
            {{--<ul class="nav container group">--}}
                {{--<li class="menu-item">--}}
                    {{--<a href="/" rel="nofollow" target="_blank">Laravel 5 Blog</a>--}}
                {{--</li>--}}
            {{--</ul>--}}
        {{--</div>--}}
    {{--</nav>--}}
{{--<footer class="footer">--}}
    {{--<div class="container">--}}
        {{--<p class="text-center">Place sticky footer content here.</p>--}}
    {{--</div>--}}
{{--</footer>--}}
<div id="footer" style="text-align: center; border-top: dashed 3px #eeeeee; margin: 50px 0; padding: 20px;">
    ©2015 <a href="http:///localhost:8000/">Fantasy</a>
</div>
{{--</div>--}}
</body>
</html>
