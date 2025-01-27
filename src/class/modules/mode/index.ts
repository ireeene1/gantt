import { ModeList } from "utils"

import type Gantt from "@/class"

export const setupMode = (instance: Gantt) => {
    Object.defineProperty(instance, 'mode', {
        get(this: Gantt){
            return this._mode
        },
        set(this: Gantt, v){
            if(v !== this._mode && ModeList.includes(v)){
                this._mode = v;

                this.calculateDateRange()

                this.render()
            }
        }
    })
}