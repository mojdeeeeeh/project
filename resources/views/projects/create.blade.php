<div class="card">
    <div class="card-header">
        Create Task
    </div>

    <div class="card-body">
        <div class="form-group row" >
            <label for="name" class="col-md-2 col-form-label text-md-right">
            	Title
            </label>

            <div class="col-md-8">
                <input type="text" class="form-control" v-model="project.title" autofocus />
            </div>
        </div>

        <div class="form-group row" >
            <label for="name" class="col-md-2 col-form-label text-md-right">
                Start
            </label>

            <div class="col-md-8">
                <input type="text" id="input3" class="form-control" v-model="project.start" />
            </div>
        </div>

        <div class="form-group row" >
            <label for="name" class="col-md-2 col-form-label text-md-right">
                Finish
            </label>

            <div class="col-md-8">
                <input type="text" class="form-control" v-model="project.finish"/>
            </div>
        </div>


        <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-2">
                <input type="submit" class="btn btn-primary" value="Create" @click.prevent="createProject" />
                <input type="button" class="btn btn-danger" value="Cancel" @click="cancel" />
            </div>
        </div>
    </div>
</div>
