import Store from './index-store'

new Vue({
	el: '#root',

	data:{
		formMode: 0,
		project: {
			id: null,
			title: null,
			start: null,
			finish: null
		}
	},

	store: Store,

	computed:{
		projects: state => state.$store.getters.projects,
		isNormalMode: state => state.formMode == 0,
		isUpdateMode: state => state.formMode == 1,
		isCreateMode: state => state.formMode == 2,

	},

	mounted(){
		this.$store.dispatch('loadData');
	},

	methods:{
		emptyProject(){
			this.project.id = null;
			this.project.title = null;
			this.project.start = null;
			this.project.finish = null;
		},

		cancel(){
			this.formMode = 0;
		},

		showUpdateForm(project) {
            this.project = Object.assign({}, project);
            this.formMode = 1;
        },

        updateProject(){
        	this.$store.dispatch('updateProject', this.project);
        	this.formMode = 0;
        },

        showCreateForm() {
        	this.emptyProject();
            this.formMode = 2;
        },

        createProject() {
        	this.$store.dispatch('newProject', this.project)
        		.then(res => this.formMode = 0)
        		.catch(err => alert(err.message));
        },

        deleteProject(project) {
            let confirmed = confirm('Are you sure to delete project?');

            if (! confirmed){
                return;
            }

            this.$store.dispatch('deleteProject', project);
            this.formMode = 0;
        },

	}
})


