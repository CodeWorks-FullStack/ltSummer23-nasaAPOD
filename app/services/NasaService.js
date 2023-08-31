
// 2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1

import { AppState } from "../AppState.js";
import { Apod } from "../models/Apod.js";

// @ts-ignore
// const nasaApi = axios.create({
//     baseURL: "https://api.nasa.gov/planetary/apod?api_key=2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1",
//     timeout: 8000
// })

const nasaApi = axios.create({
    baseURL: "https://api.nasa.gov/planetary/apod",
    timeout: 8000,
    params: {
        'api_key': '2DRMc8Ah0Y0rljaAOqEQtjiMY3f6ZrfswxzINUX1',
    }
})

class NasaService {
    toggleDisplay() {
        AppState.isVisible = !AppState.isVisible
        console.log(AppState.isVisible)
        AppState.emit('isVisible')
    }

    async getApod() {
        const res = await nasaApi.get();
        console.log(res.data);
        AppState.activeApod = new Apod(res.data)
        console.log(AppState.activeApod)
    }

    async getApodByDate(dateValue) {
        const res = await nasaApi.get(`?date=${dateValue}`)
        console.log(res.data, '[GET BY DATE]')
        AppState.activeApod = new Apod(res.data)

    }

}

export const nasaService = new NasaService();