export class Apod {
    constructor(data) {
        this.id = data.id || ''
        this.date = data.date
        this.description = data.description || data.explanation
        this.imgUrl = data.imgUrl || data.hdurl || data.url
        this.copyright = data.copyright || ''
        this.title = data.title || ''
    }

    get ActiveTemplate() {
        return `   <div class="col-md-8 text-white">
          <div class="apod-wrapper">
            <div class="text-end apod-header">
              <h1>${this.title}</h1>
              <h2>${this.date}</h2>
            </div>
            <p class="apod-body">${this.description}</p>
          </div>
        </div>`
    }

    get FavoriteTemplate() {
        return `   <div class="selectable my-2" onclick="app.NasaController.getApodByDate('${this.date}')">
          <img class="img-fluid rounded" src=${this.imgUrl} alt="">
          <div class="d-flex justify-content-between fs-3 align-items-center">
          <span class="">${this.date}</span>
        <button class="btn text-danger" title="Delete Apod" onclick="app.SandboxApodController.deleteApod('${this.id}')"><i class="mdi mdi-nuke fs-4"></i></button>
          </div>
        </div>`
    }

}