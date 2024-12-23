import { isArray, isEmpty, isLegitimateData, DateRangeMode } from "utils";

import type Gantt from "@/class"
import type { GanttDataArray, GanttData, GanttDataId } from "@/types"

function handleRender(instance: Gantt){
    if(instance.dateRangeMode === DateRangeMode.Auto){
        instance.calculateDateRange()
    }

    instance.render()
}

function setDataConstructor(this: Gantt, target: GanttData | GanttDataArray){
    //清空
    this._renderData = [];

    if(isArray(target)){
        target.map(t => isLegitimateData(t) && this._renderData.push(t))
    }else{
        isLegitimateData(target) && this._renderData.push(target)
    }

    handleRender(this)
}

function updateDataConstructor(this: Gantt, target: GanttData | GanttDataArray){
    let needRender = false;
    const me = this;

    function merge(item: GanttData){
        const existData = me._renderData.find(d => d.id === item.id);

        if(existData){
            Object.assign(existData, item)
        }else{
            isLegitimateData(item) && me._renderData.push(item)
        }

        needRender = true
    }

    if(isArray(target)){
        target.map(t => !isEmpty(t.id) && merge(t))
    }else if(!isEmpty(target.id)){
        merge(target)
    }

    needRender && handleRender(this);
}

function deleteDataConstructor(this: Gantt, target: GanttDataId | GanttDataId[]){
    let needRender = false,
        preDelete = [];
    const me = this;

    function remove(){
        for(let i = me._renderData.length - 1; i > -1; i--){
            const data = me._renderData[ i ],
                existIndex = preDelete.findIndex(id => id === data.id);

                //移除
            if(~existIndex){
                me._renderData.splice(i, 1)
                preDelete.splice(existIndex, 1)

                needRender = true
            }
        }
    }

    if(isArray(target)){
        preDelete = [ ...target ]
        remove()
    }else{
        preDelete = [ target ]
        remove()
    }

    needRender && handleRender(this)
}

export const setupData = (instance: Gantt) => {
        //setData会重设数据为当前值
    instance.setData = setDataConstructor

        //updateData会更新或者新增
    instance.updateData = updateDataConstructor

    instance.deleteData = deleteDataConstructor
}