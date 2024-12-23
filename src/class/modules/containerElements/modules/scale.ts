import { ClassName } from '@/utils';

import type Gantt from "@/class";

export const setup$Scale = (instance: Gantt) => {
    const div = document.createElement('div');
    div.classList.add(ClassName.$scale);
    instance._htmlElement.$scale = div;
    instance._htmlElement.$container.appendChild(div)
}