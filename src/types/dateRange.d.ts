export interface DateRangeElement {
    id: string
    context: string | number
    children ?: DateRangeElement[]
    key ?: any,
    dateRange ?: [ Date, Date ]
    htmlNode ?: HTMLDivElement
}