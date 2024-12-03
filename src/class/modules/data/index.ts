import { isArray, isEmpty, isLegitimateData, DateRangeMode } from "@/utils";

import type Gantt from "@/class"
import type { GanttDataArray, GanttData, GanttDataId } from "@/types"

function handleRender(instance: Gantt){
    if(instance.dateRangeMode === DateRangeMode.Auto){
        instance.calculateDateRange()
    }

    instance.render()
}

export const setupData = (instance: Gantt) => {
    let renderData: GanttDataArray = [];

    instance.getRenderData = () => renderData;

        //setData会重设数据为当前值
    instance.setData = (target: GanttData | GanttDataArray) => {    
            //清空
        renderData = [];

        if(isArray(target)){
            target.map(t => isLegitimateData(t) && renderData.push(t))
        }else{
            isLegitimateData(target) && renderData.push(target)
        }

        handleRender(instance)
    }

        //updateData会更新或者新增
    instance.updateData = (target: GanttData | GanttDataArray) => {
        let needRender = false;

        function merge(item: GanttData){
            const existData = renderData.find(d => d.id === item.id);

            if(existData){
                Object.assign(existData, item)
            }else{
                isLegitimateData(item) && renderData.push(item)
            }

            needRender = true
        }

        if(isArray(target)){
            target.map(t => !isEmpty(t.id) && merge(t))
        }else if(!isEmpty(target.id)){
            merge(target)
        }

        needRender && handleRender(instance);
    }

    instance.deleteData = (target: GanttDataId | GanttDataId[]) => {
        let needRender = false,
            preDelete = [];

        function remove(){
            for(let i = renderData.length - 1; i > -1; i--){
                const data = renderData[ i ],
                    existIndex = preDelete.findIndex(id => id === data.id);

                    //移除
                if(~existIndex){
                    renderData.splice(i, 1)
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

        needRender && handleRender(instance)
    }
}