import dayjs from 'dayjs'

/**
 * 取得日期字符串对应的时间戳
 * @param dateStr 
 * @returns dateTime
 */
export function getDateTime(dateStr: string){
    return new Date(dateStr).getTime()
}

export function getTimeSet(dateArg: string | number){
    const date = new Date(dateArg);

    return {
        date,
        time: date.getTime(),
        dateStr: dayjs(date).format('YYYY-MM-DD')
    }
}