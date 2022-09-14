export class Job {
  /**
    * The data needed to make a Job
    * @param {{company: string, jobTitle: string, description: string, hours: number, rate: number, id?:string}} data 
    */

  constructor(data) {
    this.id = data.id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.description = data.description
    this.hours = data.hours
    this.rate = data.rate
  }

  get JobCardTemplate() {
    return /*html*/`
        <div class="card m-3" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${this.jobTitle}</h5>
            <h6 class="card-subtitle mb-2 text-dark">${this.rate} Per Hour</h6>
            <h6 class="card-subtitle mb-2 text-dark">${this.hours} Hours</h6>
            <h6 class="card-subtitle mb-2 text-muted">${this.company}</h6>
            <p class="card-text">${this.description}</p>
          </div>
          <div class="card-footer d-flex align-items-center justify-content-around">
          <button class="btn text-uppercase" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
          <button class="btn text-uppercase text-success" data-bs-toggle="offcanvas" data-bs-target="#rightBar" onclick="app.jobsController.beginJobEdit('${this.id}')">Edit</button>
          </div>
        </div>
    `
  }
  // TODO using an editable...
  /**@param {Job} [editable] */

  static getJobForm(editable) {
    editable = editable || new Job({ company: '', jobTitle: '', description: '', hours: 0, rate: 0 })
    return /*html*/`
      <form onsubmit="app.jobsController.handleSubmit()">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="jobTitle" required value="${editable.jobTitle}">
        <label for="model">Job Title</label>
      </div>
      
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="company" required minlength="3" maxlength="20" value="${editable.company}">
        <label for="make">Company</label>
      </div>
      
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="rate" required min="0" value="${editable.rate}">
        <label for="price">Rate</label>
      </div>
      
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="hours" required min="0" value="${editable.hours}">
        <label for="price">Hours</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="description" required min="1886" max="9999" value="${editable.description}">
        <label for="year">description</label>
      </div>

      <div class="d-flex my-4 gap-5 align-items-center">
        <button class="btn" type="reset">Cancel</button>
        <button class="btn btn-primary" type="submit">${editable.id ? 'Save Changes' : 'Create'}</button>
      </div>
      </form>
      `
  }

  // TODO make an editable
  // 
}