import { ClassName } from '@/utils';

import type Gantt from '@/class'

export const setupRule = (instance: Gantt) => {
    const ruleEl = document.createElement('div');
    ruleEl.classList.add(ClassName.Rule);
    instance.html._rule = ruleEl;
    instance.html._el.appendChild(ruleEl)


    
}