import { isHtml, isString } from "utils"

import type Gantt from "@/class"

function handleMount(this: Gantt, el: string | HTMLElement){
    let element;

    if(isHtml(el)){
        element = el
    }else if(isString(el)){
        element = document.querySelector(el)
    };

    if(!element){
        throw new Error('不正确的dom')
    }

    const { _htmlElement } = this;

    _htmlElement.$el = element;
    element.appendChild(_htmlElement.$container);

    this.render()

    return this
}

export const setupMount = (instance: Gantt) => {
    instance.mount = handleMount
}