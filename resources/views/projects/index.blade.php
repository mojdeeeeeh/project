@extends('layouts.app')

@section('content')
<div class="container" id="root">

	{{-- Update form --}}
    <div v-show="isUpdateMode">
        @include('projects.edit')
    </div>

    {{-- Create form --}}
    <div v-show="isCreateMode">
        @include('projects.create')
    </div>

	{{-- show form --}}
	<a class="btn btn-primary" href="#" :data-record-id="project.id" @click="showCreateForm">
	    Create
	</a>
	<table class="table table-hover"  v-show="isNormalMode">
	    <thead>
	        <tr>
	            <th>title</th>
	            <th>start</th>
	            <th>finish</th>
	            <th>extra</th>
	            <th></th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="project in projects">
	            <td> @{{ project.title }} </td>
	            <td> @{{ project.start }} </td>
	            <td> @{{ project.finish }} </td>
	            <td> @{{ project.extra }} </td>
	            <td>
	            	<a class="btn btn-primary" href="#" data-record-id="project.id" @click="showUpdateForm(project)">
	            		&plus;
	            	</a>
	            	<a class="btn btn-danger" href="#" data-record-id="project.id" @click="deleteProject(project)">
	            		&times;
	            	</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</div>
@endsection

@section('scripts')
<script src="{{ mix('js/page/project/index.js') }}" defer></script>

@endsection
