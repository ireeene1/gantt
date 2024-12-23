import { DateRangeMode, isNumber, getDateTime, formatDate } from "utils"
import { setupRule } from "./rule"

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

    Object.assign(instance.prototype, {
            //计算日期范围
        calculateDateRange(this: Gantt){
            const renderData = this.getRenderData();

            let startTime = null, endTime = null;

            renderData.map(({ startDate, endDate }) => {
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

            this.startDate = isNumber(startTime) ? formatDate(startTime) : null;
            this.endDate = isNumber(endTime) ? formatDate(endTime) : null;

            this.setupRule()
        },
            //计算日期范围内的元素
        setupRule
    })
}