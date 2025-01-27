import { DateRangeMode, isNumber, getDateTime, isDate } from "utils"
import { setupScaleElements } from "./modules/setupScaleElements"

import type Gantt from "@/class"

export const setupDateRange = (instance:Gantt) => {
    Object.defineProperties(instance, {
        startDate: {
            get(this: Gantt){
                return this._startDate
            },
            set(this: Gantt, v){
                if(v !== this._startDate && isDate(v)){
                    this._startDate = v

                    if(this.dateRangeMode === DateRangeMode.Auto){
                        this.render()
                    }
                }
            }
        },
        endDate: {
            get(this: Gantt){
                return this._endDate
            },
            set(this: Gantt, v){
                if(v !== this._endDate && isDate(v)){
                    this._endDate = v

                    if(this.dateRangeMode === DateRangeMode.Auto){
                        this.render()
                    }
                }
            }
        }
    })

    Object.assign(instance, {
            //计算日期范围
        calculateDateRange(this: Gantt){
            let startTime = null, endTime = null;

            this._renderData.map(({ startDate, endDate }) => {
                if(isNumber(startTime)){
                    startTime = Math.min(startTime, getDateTime(startDate))

                }else{
                    startTime = getDateTime(startDate)
                }

                if(isNumber(endTime)){
                    endTime = Math.max(endTime, getDateTime(endDate))

                }else{
                    endTime = getDateTime(endDate)
                }
            })

            this.startDate = isNumber(startTime) ? new Date(startTime) : null;
            this.endDate = isNumber(endTime) ? new Date(endTime) : null;

                //设置刻度元素
            this._setupScaleElements()
        },
        _setupScaleElements: setupScaleElements
    })
}