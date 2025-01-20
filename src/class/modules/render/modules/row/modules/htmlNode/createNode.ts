import type { GanttData, GanttDataId } from "@/types";
import { ClassName } from "@/utils";

const htmlMap = new Map<GanttDataId, HTMLDivElement>

function handleCreate(data: GanttData){
    const div = document.createElement('div')
    div.classList.add(ClassName.rowItem)

    return div
}

export function createNode(data: GanttData){
    const cache = htmlMap.get(data.id);

    if(cache){
        return cache
    }

    const htmlNode = handleCreate(data)

    htmlMap.set(data.id, htmlNode)

    return htmlNode
}