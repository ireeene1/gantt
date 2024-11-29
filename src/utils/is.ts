export const isObject = (target): target is object => typeof target === 'object' && target !== null,
    isArray = Array.isArray,
    isFunction = (target): target is Function => typeof target === 'function',
    isNumber = (target): target is number => typeof target === 'number',
    isString = (target): target is string => typeof target === 'string',
    isHtml = (target): target is HTMLElement => (HTMLElement && typeof HTMLElement === 'object')
                                                    ? target instanceof HTMLElement
                                                    : (target
                                                        && typeof target === 'object'
                                                        && (target.nodeType === 1
                                                            || target.nodeType === 9)
                                                        && typeof target.nodeName === 'string'
                                                    );