export function throttleRAF<T>(fn: T): T {
    let can: boolean = true,
        timer: number = null;

    return function(this: any, ...args: any[]): void {
        if(can){
            can = false

            timer = requestAnimationFrame(() => {
                (fn as Function).apply(this, args)
                can = true
            })
        }
    } as T
}