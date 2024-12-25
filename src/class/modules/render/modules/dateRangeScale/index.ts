import { createScaleNodeList } from "./modules/createNodeList";
import { appendChildren } from "./modules/appendChildren";

import type Gantt from "@/class";

export function renderDateRangeScale(instance: Gantt){
        //先清空
    clearDateRangeScale(instance);

    const nodeList = createScaleNodeList(instance);

        //将子元素添加到刻度容器
    appendChildren(instance, nodeList)
}

    //清除已渲染的元素
export function clearDateRangeScale(instance: Gantt){
    const el = instance._htmlElement.$scale;

    el && (el.innerHTML = '');
}