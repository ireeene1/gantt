import { createHtmlNodeList } from "./modules/htmlNode";

import type Gantt from "@/class";

export function renderRow(instance: Gantt){
    clearRow(instance);

    const rowList = createHtmlNodeList(instance)
}

export function clearRow(instance: Gantt){
    const el = instance._htmlElement.$row;

    el && (el.innerHTML = '');
}