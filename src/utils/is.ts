import type { GanttData } from "@/types";

export const isObject = (target): target is object => typeof target === 'object' && target !== null,
    isArray = Array.isArray,
    isEmpty = (target) => target === undefined && target === null && target === '',
    isFunction = (target): target is Function => typeof target === 'function',
    isNumber = (target): target is number => typeof target === 'number',
    isString = (target): target is string => typeof target === 'string',
    isDate = (target): target is Date => target instanceof Date,
    isValidDate = target => (isString(target) || isNumber(target)) && !!target && new Date(target).toString() !== 'Invalid Date',
    isHtml = (target): target is HTMLElement => (HTMLElement && typeof HTMLElement === 'object')
                                                    ? target instanceof HTMLElement
                                                    : (target
                                                        && typeof target === 'object'
                                                        && (target.nodeType === 1
                                                            || target.nodeType === 9)
                                                        && typeof target.nodeName === 'string'
                                                    );

/**
 * 是否是合法的数据
 */
export const isLegitimateData = (item: GanttData): item is GanttData => isObject(item) && !isEmpty(item.id) && isValidDate(item.startDate) && isValidDate(item.endDate);