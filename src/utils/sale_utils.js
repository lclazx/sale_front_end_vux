import axios from 'axios'
let projectList = null;
export default {
    async getProjects(refresh) {
        if (projectList == null || refresh) {
            var res = await axios.get('/api/projectinfo/list');
            projectList = res.data;
        }
        return Promise.resolve(projectList);
    },
    convertToPanelProjectItems(list) {
        let result = [];
        list.forEach(project => {
            result.push({
                title: project.name,
                desc: project.city,
                url: `/project/${project.projectInfoId}`
            })
        })
        return result;
    }


}