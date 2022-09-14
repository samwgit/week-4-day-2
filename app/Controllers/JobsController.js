import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawJobs() {
  let template = ''
  appState.jobs.forEach(job => template += job.JobCardTemplate)
  // TODO trigger bad set
  setHTML('listings', template)
}
export class JobsController {
  constructor() {
    appState.on('jobs', drawJobs)
    this.showJobs()
  }
  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error('[GetJobs]', error)
      Pop.error(error)
    }
  }
  showJobs() {
    this.getJobs()
    drawJobs()
    setHTML('forms', drawJobs())
  }

  addJob() {
    // @ts-ignore
    appState.activeJob = null
    const template = Job.getJobForm()
    setHTML('forms', template)
  }

  async handleSubmit() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      const form = window.event.target
      let formData = getFormData(form)

      // HOW DO I KNOW IF I AM EDITING OR CREATING?
      // FIXME fix this
      if (appState.activeJob) {
        await jobsService.editJob(formData)
      } else {
        await jobsService.addJob(formData)
      }

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[AddJob]', error)
      Pop.error(error)
    }
  }

  async deleteJob(id) {
    try {
      await jobsService.deleteJob(id)
    } catch (error) {
      console.error('[DeletingJob]', error)
      Pop.error(error)
    }
  }

  beginJobEdit(id) {
    // TWO JOBS find the job by its id
    // and then what??? 
    // Then fill in the form with all the values
    jobsService.setActiveJob(id)
    const editable = appState.activeJob
    const template = Job.getJobForm(editable)

    setHTML('forms', template)
  }

}






// TODO Be able to create, delete, and edit jobs
// TODO Must set an active job, just use jakes reference if you are feeling hopeless
// You got this man