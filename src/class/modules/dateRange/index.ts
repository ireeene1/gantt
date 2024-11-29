import { DateRangeMode } from "@/utils"

import type Gantt from "@/class"

export const setupPrototypeDateRange = (instance: typeof Gantt) => {
    Object.defineProperties(instance.prototype, {
        startDate: {
            get(){
                return this._startDate
            },
            set(v){
                if(v !== this._startDate){
                    this._startDate = v

                    if(this.dateRangeMode === DateRangeMode.Hand){
                        this.render()
                    }
                }
            }
        },
        endDate: {
            get(){
                return this._endDate
            },
            set(v){
                if(v !== this._endDate){
                    this._endDate = v

                    if(this.dateRangeMode === DateRangeMode.Hand){
                        this.render()
                    }
                }
            }
        }
    })
}