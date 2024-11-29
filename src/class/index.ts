import { DateRangeMode } from "@/utils"
import {
    setupWrapperElement, setupRule, setupData,
    setupPrototypeMode, setupPrototypeMount, setupPrototypeDateRange,
} from "./modules"

import type { ConstructorOption, Mode } from "types"

class Gantt {
    constructor(option: ConstructorOption = {}){
        console.log(option)

        setupWrapperElement(this)
        setupRule(this)
        setupData(this)

        if(option.mode){
            this.mode = option.mode
        }
    }

        //html
    html = {
        $el: HTMLElement = null,           //挂载的元素
        _el: HTMLDivElement = null,        //容器
        _rule: HTMLDivElement = null,      //刻度
    }
    mount: Function   //挂载

        //模式
    _mode: Mode = 'day'
    dateRangeMode = DateRangeMode.Auto
    mode

        //日期范围
    _startDate: string
    _endDate: string
    startDate
    endDate

        //刻度
    _renderRule: Function

        //数据
    setData: Function
    updateData: Function
    deleteData: Function

        //渲染
    render: Function = () => {} 
}

setupPrototypeMode(Gantt)
setupPrototypeDateRange(Gantt)
setupPrototypeMount(Gantt)

export default Gantt