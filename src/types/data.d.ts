export type GanttDataId = string | number

export interface GanttData {
    id: GanttDataId
    startDate: string
    endDate: string
}

export type GanttDataArray = GanttData[]