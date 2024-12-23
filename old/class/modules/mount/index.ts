import { isHtml, isString } from "utils"

import type Gantt from "@/class"

export const setupPrototypeMount = (instance: typeof Gantt) => {
    instance.prototype.mount = function(this: Gantt, el: string | HTMLElement){
        let element;

        if(isHtml(el)){
            element = el
        }else if(isString(el)){
            element = document.querySelector(el)
        };

        if(!element){
            throw new Error('不正确的dom')
        }

        const { htmlElement } = this;

        htmlElement.$el = element;
        element.appendChild(htmlElement._el);

        this.render()
    }
}