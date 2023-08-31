import { AppState } from "../AppState.js";
import { nasaService } from "../services/NasaService.js"
import { Pop } from "../utils/Pop.js"
import { setHTML, setText } from "../utils/Writer.js";

function _drawApod() {
    console.log('drawing');
    let apod = AppState.activeApod
    document.body.style.backgroundImage = `url(${apod.imgUrl})`
    // NOTE first arg is the id from the HTML, second arg is what we want to inject
    setHTML('activeApod', apod.ActiveTemplate)
    setText('copyright', apod.copyright)
}

function _drawElemDisplay() {
    let authElem = document.getElementById('authstate')
    let activeApodElem = document.getElementById('activeApod')
    let footerRowElem = document.getElementById('footer-row')

    let elems = [authElem, activeApodElem, footerRowElem]

    if (AppState.isVisible == false) {
        elems.forEach(elem => elem.style.visibility = 'hidden')
    } else {
        elems.forEach(elem => elem.style.visibility = 'visible')
    }

}

export class NasaController {
    constructor() {
        console.log('nasa controller')
        this.getApod()
        AppState.on('activeApod', _drawApod)
        AppState.on('isVisible', _drawElemDisplay)
    }

    toggleDisplay() {
        nasaService.toggleDisplay()
    }

    async getApod() {
        try {
            await nasaService.getApod()
        } catch (error) {
            Pop.error(error)
        }
    }

    async getApodByDate(date) {
        try {
            if (date) {
                await nasaService.getApodByDate(date)
            } else {
                const dateInput = document.getElementById('dateInput')
                // @ts-ignore
                const dateValue = dateInput.value
                console.log('getting date', dateValue)
                await nasaService.getApodByDate(dateValue)
            }
        } catch (error) {
            Pop.error(error)
        }
    }

}