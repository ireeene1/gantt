import { ClassName, isNumber } from "@/utils";

import type Gantt from "@/class";

export const setupStyle = (instance: Gantt) => {
    const style = {
        scaleElementWidth: 40
    }

    Object.defineProperties(instance.style, {
        scaleElementWidth: {
            get(){
                return style.scaleElementWidth
            },
            set(v){
                if(isNumber(v) && v !== style.scaleElementWidth){
                    style.scaleElementWidth = v

                    instance.render()
                }
            }
        }
    })

        //根据实际长度设置关键元素长度
    instance._setScaleElementBottommostLayerWidth = () => {
        const {
            _htmlElement: {
                $el,
                $scale
            },
            style: {
                scaleElementWidth
            }
        } = instance;

            //可见区总长度
        const $elWidth = $el.getBoundingClientRect().width;

        const bottommostLayerNode = $scale.querySelectorAll('.' + ClassName.scaleElementBottommost);

        const preWidth = $elWidth / bottommostLayerNode.length,
            currentWidth = Math.max(preWidth, scaleElementWidth);

        bottommostLayerNode.forEach(node => (node as HTMLDivElement).style.width =  `${ currentWidth }px`)
    }
}