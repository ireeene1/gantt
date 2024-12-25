import type Gantt from "@/class";

export function appendChildren(instance: Gantt, nodeList: HTMLDivElement[]){
    const {
        _htmlElement: {
            $scale
        }
    } = instance;

    const fragment = document.createDocumentFragment();

    nodeList.forEach(node => fragment.appendChild(node))

    $scale.appendChild(fragment);

    instance._setScaleElementBottommostLayerWidth()
}