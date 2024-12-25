import { createNode } from "./createNode";

import type Gantt from "@/class";
import type { GanttDataId } from "@/types";

export function createHtmlNodeList(instance: Gantt){
    const {
        _renderData
    } = instance;

        //缓存本次的id 做重复识别用
    const _idHash: GanttDataId[] = []

    const nodeList: HTMLDivElement[] = [];

    _renderData.map(data => {
        if(_idHash.includes(data.id)){
            return console.warn(`id: ${ data.id }标识重复`)
        }

        const htmlNode = createNode(data)
    })

    return nodeList
}