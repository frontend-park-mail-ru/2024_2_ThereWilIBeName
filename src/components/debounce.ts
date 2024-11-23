export default <T extends (...args: any[]) => any>(func: T, delay: number) => {
    let timer: number | undefined;
    return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => func(...args), delay);
    };
};
