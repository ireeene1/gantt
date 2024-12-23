import { ModeList } from "utils"

import type Gantt from "@/class"

export const setupPrototypeMode = (instance: typeof Gantt) => {
    Object.defineProperty(instance.prototype, 'mode', {
        get(){
            return this._mode
        },
        set(v){
            if(v !== this._mode && ModeList.includes(v)){
                this._mode = v;

                this.calculateDateRange()

                this.render()
            }
        }
    })
}