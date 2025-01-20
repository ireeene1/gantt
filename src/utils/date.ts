import dayjs from 'dayjs'
import { isDate, isNumber } from './is';

//@ts-ignore
window.d = dayjs

import type { DateSet } from '@/types';

export function getDateSet(t: string | number | Date): DateSet{
        //@ts-ignore
    const date = isDate(t) ? t : new Date(dayjs(t));

    return {
        Date: date,
        time: date.getTime(),
        fullYear: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        dateStr: dayjs(date).format('YYYY-MM-DD')
    }
}

/**
 * 取得日期字符串对应的时间戳
 * @param dateStr 
 * @returns dateTime
 */
export function getDateTime(t: string | number | Date){
    if(isNumber(t)){
        return t
    }

        //@ts-ignore
    return new Date(dayjs(t)).getTime()
}

export function formatDate(date, type = 'YYYY-MM-DD'){
    return dayjs(date).format(type)
}

export const monthText = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ];
const monthDays = [ 31 , 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 判断是否是瑞年
 */
export function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * 取得指定年 月 下的天数
 */
export function getMonthDayNumber(year, month){
    return month === 1 && isLeapYear(year)
        ? 29
        : monthDays[ month ]
}

export const oneDayTime = 1000 * 60 * 60 * 24;

/**
 * 将 年 月 日 合并为一个日期的字符串
 */
export function mergeDateStr(year, month, date){
    return `${ year }-${ String(month + 1).padStart(2, '0') }-${ String(date).padStart(2, '0') }`
}

/**
 * 自动补全这个日期至开始日期
 * @param date
 * @returns dateTime
 */
export function getStartDate(){

}