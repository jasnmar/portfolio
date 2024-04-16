import { dbObj } from "./env.js"
import { projectData } from "./projects.js"

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
buildPage();
function buildPage() {
    const projectList = document.getElementById("project-list")
    let projectHTML = ""
    projectData.forEach(project => {
        console.log('project: ', project)
        let projectImage
        if(project.screenshot==="") {
            projectImage = `<img class="project-screenshot" src="https://placehold.co/200x200">`
        } else {
            projectImage = `<img class="project-screenshot" src="./images/${project.screenshot}">`
        }
        projectHTML += `
            <div class="project">
                <h2>${project.name}</h2>
                ${projectImage}
                <p>${project.goal}</p>
                <a href=${project.githubAddress} target="_blank">Project Github</a>
                <a href=${project.deployLocation} target="_blank">Deploy</a>
                
            </div>
        `
    projectList.innerHTML = projectHTML
    });
}

const dbApp = initializeApp(dbObj)
const database = getDatabase(dbApp)
const projectsInDb = ref(database, "projectList")

const projectListEl = document.getElementById('project-list')

onValue(projectsInDb, function(snapshot) {
    const projects = Object.entries(snapshot.val())
    projectListEl.innerHTML = "";
    for (let i = 0; i < projects.length; i++){
        console.log(projects[i])
    }

})



function publishProjects() {
    
    const endosementValue = endosementInputEl.value
    const retVal = push(endorsementsInDb, endosementValue)
}