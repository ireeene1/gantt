import { ClassName } from '@/utils';

import type Gantt from "@/class";

export const setup$Row = (instance: Gantt) => {
    const div = document.createElement('div');
    div.classList.add(ClassName.$row);
    instance._htmlElement.$row = div;
    instance._htmlElement.$container.appendChild(div)
}