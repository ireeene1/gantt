import { DateRangeMode } from "@/utils";
import {
    setupContainerElements,
    setupMount,
    setupMode,
    setupDateRange,
    setupData,
    setupRender,
    setupStyle
} from "./modules";

import type { ConstructorOption, GanttData, GanttDataArray, Mode, GanttDataId, DateRangeElement } from "types";

export default class Gantt {
    constructor(option ?: ConstructorOption){
        //设置每个容器元素
        setupContainerElements(this)
            //设置挂载
        setupMount(this)

        //设置样式
        setupStyle(this)

        //设置日期
            //展示模式
        setupMode(this)
            //日期范围
        setupDateRange(this)

        //设置数据
        setupData(this)

        //设置渲染
        setupRender(this)
    }

    //元素
    _htmlElement: {
        $el: HTMLElement,
        $container: HTMLDivElement,
        $scale: HTMLDivElement,
        $row: HTMLDivElement
    } = {
        $el: null,           //挂载的元素
        $container: null,        //根容器
        $scale: null,       //刻度根容器
        $row: null          //行数据的根容器
    }
        //挂载
    mount: (el: HTMLElement) => Gantt

    //样式
    style: {
        scaleElementWidth ?: number
    } = {}
    _setScaleElementBottommostLayerWidth: Function      //设置刻度关键元素的长度
    
    //日期
        //模式
    _mode: Mode = 'day'
    mode
        //日期范围
    dateRangeMode = DateRangeMode.Auto      //日期范围计算模式 自动 | 手动
    _startDate: Date
    startDate: Date
    _endDate: Date
    endDate: Date
    calculateDateRange: Function     //计算日期范围
    _setupScaleElements: Function    //设置刻度元素

    //数据
    _renderData: GanttDataArray = []         //当前渲染的数据
    setData: (t: GanttData | GanttDataArray) => void
    updateData: (t: GanttData | GanttDataArray) => void
    deleteData: (id: GanttDataId | GanttDataId[]) => void

    //渲染
    render: Function = () => {}
        //刻度元素
    _renderElements: {
        scale: DateRangeElement[]
    } = {
        scale: []
    }
}