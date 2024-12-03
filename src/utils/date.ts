import dayjs from 'dayjs'

import type { DateSet } from '@/types';

/**
 * 取得日期字符串对应的时间戳
 * @param dateStr 
 * @returns dateTime
 */
export function getDateTime(dateStr: string){
    return new Date(dateStr).getTime()
}

export function formatDate(date, type = 'YYYY-MM-DD'){
    return dayjs(date).format(type)
}

export function getDateSet(dateArg: string | number): DateSet{
    const date = new Date(dateArg);

    return {
        date,
        time: date.getTime(),
        fullYear: date.getFullYear(),
        month: date.getMonth(),
        dateStr: dayjs(date).format('YYYY-MM-DD')
    }
}