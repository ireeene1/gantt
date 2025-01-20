import { createHtmlNodeList } from "./modules/htmlNode";

import type Gantt from "@/class";

export function renderRow(instance: Gantt){
    clearRow(instance);

    const el = instance._htmlElement.$row;

    const rowList = createHtmlNodeList(instance)

    const fragment = document.createDocumentFragment()

    rowList.map(row => fragment.appendChild(row));

    el.appendChild(fragment)
}

export function clearRow(instance: Gantt){
    const el = instance._htmlElement.$row;

    el && (el.innerHTML = '');
}