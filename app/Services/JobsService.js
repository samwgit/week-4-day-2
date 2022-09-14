import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { SandboxServer } from "../Services/AxiosService.js";
import { Pop } from "../Utils/Pop.js";

class JobsService {
  async getJobs() {
    const res = await SandboxServer.get('/api/jobs')
    appState.jobs = res.data.map(orange => new Job(orange))
  }

  async editJob(formData) {
    const job = appState.activeJob
    const res = await SandboxServer.put(`/api/jobs/${job.id}`, formData)
    console.log('the update response', res.data);
    const updatedJob = new Job(res.data)
    const index = appState.jobs.findIndex(j => j.id == job.id)
    appState.jobs.splice(index, 1, updatedJob)
    appState.emit('jobs')
  }

  setActiveJob(id) {
    const job = appState.jobs.find(c => c.id == id)
    if (!job) {
      throw new Error('That is a bad Id')
    }
    appState.activeJob = job
    console.log('the active job', appState.activeJob)

  }
  async deleteJob(id) {

    const yes = await Pop.confirm('Delete the Job?')
    if (!yes) { return } // FULL STOP

    // TODO simulate an error 
    await SandboxServer.delete(`/api/jobs/${id}`)
    appState.jobs = appState.jobs.filter(j => j.id != id)
  }

  // REVIEW example of a POST REQUEST aka (CREATE)
  async addJob(formData) {
    const res = await SandboxServer.post('/api/jobs', formData)
    console.log('what the heck is the create job response?', res.data);
    // res.data includes all of the formData + the brand new shiny ID
    let job = new Job(res.data)
    appState.jobs = [...appState.jobs, job]
  }
}

export const jobsService = new JobsService()