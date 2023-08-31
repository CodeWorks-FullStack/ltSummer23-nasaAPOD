import { AppState } from "../AppState.js";
import { sandboxApodService } from "../services/SandboxApodService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawSandboxApods() {
    console.log('drawing');
    let apods = AppState.sandboxApods
    let content = ''
    apods.forEach(apod => content += apod.FavoriteTemplate)
    setHTML('sandboxApods', content)
}

export class SandboxApodController {
    constructor() {
        console.log('sandbox controller');
        // this.getFavoriteApods()
        AppState.on('sandboxApods', _drawSandboxApods)
        // NOTE wait for the account to come back before trying  get req to the sandbox
        AppState.on('account', this.getFavoriteApods)
    }

    async addFavoriteApod() {
        try {
            console.log('adding fav')
            sandboxApodService.addFavoriteApod()
        } catch (error) {
            Pop.error(error)
        }
    }

    async getFavoriteApods() {
        try {
            await sandboxApodService.getFavoriteApods()
        } catch (error) {
            Pop.error(error)
        }
    }

    async deleteApod(apodId) {
        try {
            if (await Pop.confirm("Nuke?")) {
                await sandboxApodService.deleteApod(apodId)
            }
        } catch (error) {
            Pop.error(error)
        }
    }



}