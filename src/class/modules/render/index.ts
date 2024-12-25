import { isDate, isEqualDate, isHtml, throttleRAF } from "@/utils";
import { clearDateRangeScale, renderDateRangeScale } from "./modules/dateRangeScale";
import { clearRow, renderRow } from './modules/row'

import type Gantt from "@/class";

export const setupRender = (instance: Gantt) => {
        //缓存
    const _cache = {
        startDate: instance.startDate,
        endDate: instance.endDate,
        mode: instance.mode
    };

    const handleRender = throttleRAF<() => void>(() => {
        const {
            startDate, endDate,
            mode,
            _renderData
        } = instance;

            //两个日期有一个不相等才更新
        if(!isEqualDate(startDate, _cache.startDate) || !isEqualDate(endDate, _cache.endDate) || mode !== _cache.mode){
            console.log('renderScale')
            renderDateRangeScale(instance)

            _cache.startDate = startDate
            _cache.endDate = endDate
            _cache.mode = mode
        }

        if(_renderData.length){
            renderRow(instance)
        }else{
            clearRow(instance)
        }
    })

    instance.render = function(this: Gantt){
        const {
            startDate, endDate,
            _htmlElement: { $el },
        } = this;

        if(isHtml($el) && isDate(startDate) && isDate(endDate)){
            handleRender()
        }else{
            clearDateRangeScale(this)
            clearRow(this)
        }
    }
}