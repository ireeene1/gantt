
import { ClassName } from "@/utils";

import type { DateRangeElement } from "@/types";
import type Gantt from "@/class";

    //添加子元素
function _appendChildNode(parentNode: HTMLDivElement, childNode: HTMLDivElement){
    const group = parentNode.querySelector('.' + ClassName.scaleElementChildrenContent);
    group.appendChild(childNode)
}

function _createNode(element: DateRangeElement, nodeList: HTMLDivElement[], bottommostLayerNodeCache: HTMLDivElement[]): HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add(ClassName.scaleElement)

        //有nodeList代表顶层
    if(nodeList){
        div.classList.add(ClassName.scaleElementTopmost)
    }

        //最深层
    if(!element.children || !element.children.length){
        div.classList.add(ClassName.scaleElementBottommost)
        bottommostLayerNodeCache.push(div)
    }

    div.innerHTML = `
        <p class="${ ClassName.scaleElementContext }">
            <span class="${ ClassName.scaleElementContextSticky }">${ element.context }</span>
        </p>

        <div class="${ ClassName.scaleElementChildrenContent }"></div>
    `
    return div
}

    //递归创建dom
function _deepCreate(scale: DateRangeElement[], parentNode: HTMLDivElement, nodeList: HTMLDivElement[], bottommostLayerNodeCache: HTMLDivElement[]){
    for(let i = 0, j = scale.length; i < j; i++){
        const _element = scale[ i ]

        const htmlNode = _createNode(scale[ i ], nodeList, bottommostLayerNodeCache);
        _element.htmlNode = htmlNode;

            //指定父级或者添加到根级
        if(parentNode){
            _appendChildNode(parentNode, htmlNode)
        }else if(nodeList){
            nodeList.push(htmlNode)
        }

        if(_element.children?.length){
            _deepCreate(_element.children, htmlNode, null, bottommostLayerNodeCache)
        }
    }
}

export function createScaleNodeList(instance: Gantt){
    const {
        _renderElements: {
            scale
        }
    } = instance;

    const nodeList: HTMLDivElement[] = [],
        _bottommostLayerNodeCache: HTMLDivElement[] = [];   //记录最底层的dom缓存

    _deepCreate(scale, null, nodeList, _bottommostLayerNodeCache)

    return nodeList
}