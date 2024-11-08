/**
 * 取得日期字符串对应的时间戳
 * @param dateStr 
 * @returns dateTime
 */
export function getDateTime(dateStr: string){
    return new Date(dateStr).getTime()
}