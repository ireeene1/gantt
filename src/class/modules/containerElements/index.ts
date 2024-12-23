import { setup$Container } from "./modules/container";
import { setup$Scale } from "./modules/scale";

import type Gantt from "@/class";

export const setupContainerElements = (instance: Gantt) => {
    setup$Container(instance)

    setup$Scale(instance)
}