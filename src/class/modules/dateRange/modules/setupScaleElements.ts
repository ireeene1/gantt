import { isDate, ModeEnum, getDateSet, monthText, oneDayTime, mergeDateStr, getMonthDayNumber } from "@/utils";

import type Gantt from "@/class";
import type { DateRangeElement, DateSet } from "@/types";

function getYears(startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const years: DateRangeElement[] = [],
        startYear = startDateSet.fullYear,
        endYear = endDateSet.fullYear;

    for(let i = 0; i < endYear - startYear + 1; i++){
        const year = startYear + i,
            date = getDateSet(year).Date

        years.push({
            id: String(year),
            context: year,
            key: year,
            dateRange: [ date, date ]
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
        const monthId = `${ yearItem.id }-${ i + 1 }`,
            date = getDateSet(monthId).Date;

        months.push({
            id: monthId,
            context: `${ monthText[ i ] }月`,
            key: i,
            dateRange: [ date, date ]
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
    //周模式下，设置每个天的日期范围
function _setWeekDaysDateRange(months: DateRangeElement[]){
        //取得该日期的结束日期
    function _getSecondRange(day: DateRangeElement, nextDay: DateRangeElement, month: DateRangeElement, nextMonth: DateRangeElement): Date{
            //有下一天，结束范围就是下一天的起始范围
        if(nextDay){
            return getDateSet(nextDay.id).Date
        }

            //有下一个月，结束范围就是下个月的第一天（本月最后一天的结束范围和下月第一天的起始范围是重叠的）
        if(nextMonth){
            return getDateSet(nextMonth.id).Date
        }

            //啥都没有 就是最终最后一天 返回+1天的时间
        return new Date(getDateSet(day.id).time + oneDayTime) 
    }

    months.forEach((month, monthIndex) => {
        const days = month.children;

        days.forEach((day, dayIndex) => {
            day.dateRange = [
                getDateSet(day.id).Date,
                _getSecondRange(day, days[ dayIndex + 1 ], month, months[ monthIndex + 1 ])
            ]
        })
    })
}

function getDayDays(monthItem: DateRangeElement, yearItem: DateRangeElement, startDateSet: DateSet, endDateSet: DateSet): DateRangeElement[]{
    const { fullYear: startFullYear, month: startMonth, date: startDate } = startDateSet,
        { fullYear: endFullYear, month: endMonth , date: endDate } = endDateSet,
        year = yearItem.key, month = monthItem.key;
    
    const firstDay = year === startFullYear && month === startMonth ? startDate : 1,
        lastDay = year === endFullYear && month === endMonth ? endDate : getMonthDayNumber(year, month);
    //取得第一天

    return Array.from({ length: lastDay - firstDay + 1 }, (_, i) => {
        const dayId = mergeDateStr(year, month, firstDay + i),
            date = getDateSet(dayId).Date;

        return {
            id: mergeDateStr(year, month, firstDay + i),
            context: firstDay + i,
            key: firstDay + i,
            dateRange: [ date, date ]
        }
    });
}

    //默认获取刻度数据
function getDefaultScaleDataSet(instance: Gantt): DateRangeElement[]{
    const { startDate, endDate, mode } = instance;

    const startDateSet = getDateSet(startDate),
        endDateSet = getDateSet(endDate);

    const years = getYears(startDateSet, endDateSet);

    if(mode !== ModeEnum.Year){
        years.forEach(year => {
            const months = getMonths(year, startDateSet, endDateSet);
            year.children = months
    
            if(mode === ModeEnum.Day){
                months.forEach(month => month.children = getDayDays(month, year, startDateSet, endDateSet))
            }else if(mode === ModeEnum.Week){
                months.forEach(month => month.children = getWeekDays(month, year, startDateSet, endDateSet))
                _setWeekDaysDateRange(months)
            }
        });
    }

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