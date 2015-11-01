@extends('app')
@section('content')
    <div class="row">
        <div class="col-md-10 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">新增 Page</div>

                    <div class="panel-body">
    {{--<h1>撰写新文章</h1>--}}
                        {!! Form::open(['class' => 'form-horizontal','role' => 'form']) !!}

                    <div class="form-group">
                    {{--{!! Form::label('title','编辑',['class' => 'col-md-4 control-label','required' => 'require']) !!}--}}
                        <div class="col-md-6">
                            {!! Form::text('title',null,['class' => 'form-control']) !!}
                        </div>
                    </div>
                        <div class="col-md-6">
                            {!! Form::textarea('body',null,['class' => 'form-control'])!!}
                        </div>
                        {!! Form::close() !!}
                    </div>
            </div>
        </div>
    <

@endsection