const prefix = 'homeBy_gantt__'

export enum ClassName {
    $container = `${ prefix }container`,

    $scale = `${ prefix }scale`,
    scaleElementTopmost = `${ prefix }scale_elementTopmost`,
    scaleElement = `${ prefix }scale_element`,
    scaleElementBottommost = `${ prefix }scale_elementBottommost`,
    scaleElementContext = `${ prefix }scale_element__context`,
    scaleElementContextSticky = `${ prefix }scale_element__context_sticky`,
    scaleElementChildrenContent = `${ prefix }scale_element__childrenContent`,

    $row = `${ prefix }row`
}