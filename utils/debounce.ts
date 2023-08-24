export function debounce(callback: () => any, delay = 300) {
    let timeoutId: any;

    return function() {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            callback();
        }, delay)
    }
}