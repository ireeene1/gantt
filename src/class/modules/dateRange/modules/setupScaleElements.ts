import { isDate, ModeEnum, getDateSet, monthText, oneDayTime, mergeDateStr, getMonthDayNumber } from "@/utils";

import type Gantt from "@/class";
import type { DateRangeElement, DateSet } from "@/types";

function getYears(startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const years: DateRangeElement[] = [],
        startYear = startDateSet.fullYear,
        endYear = endDateSet.fullYear;

    for(let i = 0; i < endYear - startYear + 1; i++){
        const year = startYear + i;

        years.push({
            id: String(year),
            context: year,
            key: year
        })
    }

    return years
}

function getMonths(yearItem: DateRangeElement, startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const months: DateRangeElement[] = [],
        { fullYear: startFullYear, month: startMonth } = startDateSet,
        { fullYear: endFullYear, month: endMonth } = endDateSet;

    const firstMonth = yearItem.key === startFullYear ? startMonth : 0,
        lastMonth = yearItem.key === endFullYear ? endMonth : 11; //取得第一和最后一个月份;

    for(let i = firstMonth; i <= lastMonth; i++){
        months.push({
            id: `${ yearItem.id }-${ i + 1 }`,
            context: `${ monthText[ i ] }月`,
            key: i
        })
    }

    return months
}

function getWeekDays(monthItem: DateRangeElement, yearItem: DateRangeElement, startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const { fullYear: startFullYear, month: startMonth, date: startDate } = startDateSet,
        { fullYear: endFullYear, month: endMonth , date: endDate } = endDateSet,
        year = yearItem.key, month = monthItem.key;

    const firstDay = year === startFullYear && month === startMonth ? startDate : 1,
        lastDay = year === endFullYear && month === endMonth ? endDate : getMonthDayNumber(year, month);

    const days: DateRangeElement[] = []

    for(let dayTime = new Date(mergeDateStr(year, month, firstDay)).getTime(); dayTime < new Date(mergeDateStr(year, month, lastDay)).getTime(); dayTime += 7 * oneDayTime){
        const date = new Date(dayTime),
            dateMonth = date.getMonth();

            //是还是当月的日期
        if(dateMonth === month){
            const _thisDate = date.getDate()

            days.push({
                id: mergeDateStr(year, month, _thisDate),
                context: _thisDate,
                key: _thisDate
            });  //添加这天的日期
        }
    }

    if(year === endFullYear && month === endMonth){
        days.push({
            id: mergeDateStr(year, month, lastDay),
            context: lastDay,
            key: lastDay
        })
    }

    return days
}

function getDayDays(monthItem: DateRangeElement, yearItem: DateRangeElement, startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const { fullYear: startFullYear, month: startMonth, date: startDate } = startDateSet,
        { fullYear: endFullYear, month: endMonth , date: endDate } = endDateSet,
        year = yearItem.key, month = monthItem.key;
    
    const firstDay = year === startFullYear && month === startMonth ? startDate : 1,
        lastDay = year === endFullYear && month === endMonth ? endDate : getMonthDayNumber(year, month);
    //取得第一天

    return Array.from({ length: lastDay - firstDay + 1 }, (_, i) => ({
        id: mergeDateStr(year, month, firstDay + i),
        context: firstDay + i,
        key: firstDay + i
    }));
}

    //默认获取刻度数据
function getDefaultScaleDataSet(instance: Gantt): DateRangeElement[]{
    const { startDate, endDate, mode } = instance;

    const startDateSet = getDateSet(startDate),
        endDateSet = getDateSet(endDate);

    const years = getYears(startDateSet, endDateSet);

    years.forEach(year => {
        const months = getMonths(year, startDateSet, endDateSet);
        year.children = months

        if(mode === ModeEnum.Day){
            months.forEach(month => month.children = getDayDays(month, year, startDateSet, endDateSet))
        }else if(mode === ModeEnum.Week){
            months.forEach(month => month.children = getWeekDays(month, year, startDateSet, endDateSet))
        }
    });

    return years
}

export function setupScaleElements(this: Gantt){
    const { startDate, endDate, mode, _renderElements } = this;

    if(isDate(startDate) && isDate(endDate)){
        _renderElements.scale = mode === ModeEnum.Custom
                                            ? []
                                            : getDefaultScaleDataSet(this);
    }else{
        _renderElements.scale = []
    }
}