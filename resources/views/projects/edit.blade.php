<div class="card">
    <div class="card-header">
        Modify Project
    </div>

    <div class="card-body">
        <div class="form-group row" >
            <label for="name" class="col-md-4 col-form-label text-md-right">
            	title
            </label>

            <div class="col-md-6">
                <input type="text"
                	class="form-control"
                	v-model="project.title"
                	required autofocus />
            </div>
        </div>

        <div class="form-group row" >
            <label for="name" class="col-md-4 col-form-label text-md-right">
            	start
            </label>

            <div class="col-md-6">
                <input type="text"
                	class="form-control"
                	v-model="project.start"
                	required />
            </div>
        </div>

        <div class="form-group row" >
            <label for="name" class="col-md-4 col-form-label text-md-right">
                finish
            </label>

            <div class="col-md-6">
                <input type="text"
                    class="form-control"
                    v-model="project.finish"
                    required />
            </div>
        </div>
       
        <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4">
                <input type="submit" class="btn btn-primary" value="Update" @click.prevent="updateProject" />
                <input type="button" class="btn btn-danger" value="Cancel" @click="cancel" />
            </div>
        </div>
    </div>

</div>
