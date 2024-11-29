import type { Mode } from "../types";

    //合法模式列表
export const ModeList: Mode[] = [ 'day', 'month', 'week', 'custom' ];

export enum DateRangeMode {
    Auto = 'auto',
    Hand = 'hand'
}