import { renderRules } from "./rule";

import type Gantt from "@/class"

export const setupPrototypeRender = (instance: typeof Gantt) => {
    Object.assign(instance.prototype, {
        render(this: Gantt){
            if(this.getRenderData().length){
                renderRules(this)
            }
        }
    })
}