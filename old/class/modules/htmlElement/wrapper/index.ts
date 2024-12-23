import { ClassName } from '@/utils';

import type Gantt from '@/class'

export function setupWrapperElement(instance: Gantt){
    const div = document.createElement('div');
    div.classList.add(ClassName.Wrapper);

    instance.htmlElement.container = div;
}