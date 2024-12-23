import { DateRangeMode } from "utils"
import {
    setupWrapperElement, setupRule, setupData,
    setupPrototypeMode, setupPrototypeMount, setupPrototypeDateRange, setupPrototypeRender
} from "./modules"

import type { ConstructorOption, GanttDataArray, GanttData, Mode, GanttDataId, DateRangeItem } from "types"

class Gantt {
    constructor(option: ConstructorOption = {}){

        setupWrapperElement(this)
        setupRule(this)
        setupData(this)

        if(option.mode){
            this.mode = option.mode
        }
    }

        //node
    htmlElement = {
        $el: HTMLElement = null,           //挂载的元素
        container: HTMLDivElement = null,        //容器
        _rule: HTMLDivElement = null,      //刻度
    }
    mount: Function   //挂载

        //模式
    _mode: Mode = 'day'
    dateRangeMode = DateRangeMode.Auto
    mode: Mode

        //日期范围
    _startDate: string
    _endDate: string
    startDate
    endDate
    calculateDateRange: Function
    setupRule: Function

        //刻度
    _rule :{
        items: DateRangeItem[]
    } = {
        items: []
    }

        //数据
    setData: (t: GanttData | GanttDataArray) => void
    updateData: (t: GanttData | GanttDataArray) => void
    deleteData: (id: GanttDataId | GanttDataId[]) => void
    getRenderData: () => GanttDataArray

        //渲染
    render: Function
}

setupPrototypeMode(Gantt)
setupPrototypeDateRange(Gantt)
setupPrototypeMount(Gantt)
setupPrototypeRender(Gantt)

export default Gantt