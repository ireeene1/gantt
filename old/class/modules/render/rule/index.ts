import type Gantt from "@/class"

export const renderRules = (instance: Gantt) => {
    
    const {
        _rule: { items },
        htmlElement: { $el, _el, _rule }
    } = instance;

    console.log(_rule)
}