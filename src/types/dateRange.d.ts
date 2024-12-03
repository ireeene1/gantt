export interface DateRangeItem {
    id: string
    context: string | number
    children ?: DateRangeItem[]
    key ?: any
}