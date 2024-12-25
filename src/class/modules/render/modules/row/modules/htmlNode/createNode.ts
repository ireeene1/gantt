import type { GanttData, GanttDataId } from "@/types";

const htmlMap = new Map<GanttDataId, HTMLDivElement>

function handleCreate(data: GanttData){
    const div = document.createElement('div')

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