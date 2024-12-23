import type { Mode } from "../types";

    //合法模式列表
export enum ModeEnum {
    Day = 'day',
    Month = 'month',
    Week = 'week',
    Custom = 'custom'
}
export const ModeList: Mode[] = Object.values(ModeEnum);

export enum DateRangeMode {
    Auto = 'auto',
    Hand = 'hand'
}