import { AppState } from "../AppState.js";
import { Apod } from "../models/Apod.js";
import { api } from "./AxiosService.js";

class SandboxApodService {

    async addFavoriteApod() {
        // NOTE here we are just sending the activeApod from the AppState bc that is where the img is saved from the Nasa API in our application
        const res = await api.post('api/apods', AppState.activeApod)
        console.log(res.data)

        let newApod = new Apod(res.data)
        console.log(newApod, 'new Apod')
        AppState.sandboxApods.push(newApod)
        AppState.emit('sandboxApods')
    }

    async getFavoriteApods() {
        const res = await api.get('api/apods')
        console.log(res.data, '[GETTING SANDBOX APODS]');
        let mappedArr = res.data.map(dataObj => new Apod(dataObj))
        AppState.sandboxApods = mappedArr
    }

    async deleteApod(apodId) {
        const res = await api.delete(`api/apods/${apodId}`)
        console.log(res.data, '[DELETING]')

        AppState.sandboxApods = AppState.sandboxApods.filter(apod => apod.id != apodId)
        // AppState.emit('sandboxApods')
    }


}

export const sandboxApodService = new SandboxApodService();