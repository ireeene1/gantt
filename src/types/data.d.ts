export type GanttDataId = string | number
type GanttDataDate = string | number | Date

export interface GanttData {
    id: GanttDataId
    name: string
    startDate: GanttDataDate
    endDate: GanttDataDate
}

export type GanttDataArray = GanttData[]