import { getDateSet, isValidDate } from "@/utils";

import type Gantt from "@/class";
import type { DateRangeItem, DateSet } from "@/types";

function getYears(startDateSet: DateSet, endDateSet: DateSet): DateRangeItem[]{
    const years: DateRangeItem[] = [],
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

const monthText = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ];
function getMonths(yearItem: DateRangeItem, startDateSet: DateSet, endDateSet: DateSet): DateRangeItem[]{
    const months: DateRangeItem[] = [],
        { fullYear: startFullYear, month: startMonth } = startDateSet,
        { fullYear: endFullYear, month: endMonth } = startDateSet;

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

export function setupRule(this: Gantt){
    const { startDate, endDate, mode, _rule } = this;

    if(isValidDate(startDate) && isValidDate(endDate)){
        const startDateSet = getDateSet(startDate),
            endDateSet = getDateSet(endDate);

        const years = getYears(startDateSet, endDateSet);

        years.forEach(year => {
            const months = getMonths(year, startDateSet, endDateSet);

            year.children = months
        })

        _rule.items = years;

        console.log(years)
    }
}