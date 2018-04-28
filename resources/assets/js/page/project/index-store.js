export default new Vuex.Store({
	state: {
		projects_data:[],
	},

	getters:{
		projects: state => state.projects_data,
	},

	mutations:{
		setProjects(state, data){
			state.projects_data = data;
		},

		newProject(state, data){
			state.projects_data.push(data);
		},

		deleteProject(state, data){
			let index = state.projects_data.map(el => el.id)
						              .indexOf(data.id);

            state.projects_data.splice(index, 1);
		},

		updateProject(state, data){
			let project = state.projects_data.filter(el => el.id == data.id)[0];

			if (null != project){
				project.title = data.title;
				project.start = data.start;
				project.finish = data.finish;
			}
		}
	},

	actions:{
		loadData(context){
			Axios.get('/projects')
				 .then(res => context.commit('setProjects', res.data.data));
		},

        updateProject(context, project) {
            Axios.put('/projects/' + project.id, project)
                .then(res => {
                	context.commit('updateProject', res.data);

                    alert('Updated');
                })
                .catch(err => {
                    alert(err.message);
                });
        },

        newProject(context, project) {
        	return new Promise((resolve, reject) => {
	            Axios.post('/projects', project)
	                .then(res => {
	                	context.commit('newProject', res.data);

	                    resolve(res);
	                    alert('Inserted');
	                })
	                .catch(err => {
	                    reject(err);
	                    alert(err.message);
	                });
        	});
        },

        deleteProject(context, project) {
            Axios.delete('/projects/' + project.id)
                .then(res => {
                    context.commit('deleteProject', project);

                    alert('Deleted');
                })
                .catch(err => {
                    alert(err.message);
                });
        }

	},
})