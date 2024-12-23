import { ClassName } from '@/utils';

import type Gantt from "@/class";

export const setup$Container = (instance: Gantt) => {
    const div = document.createElement('div');
    div.classList.add(ClassName.$container);

    instance._htmlElement.$container = div;
}