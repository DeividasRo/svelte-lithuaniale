
export const isStateUpdateRequired = (savedDate: Date, startDate: Date) => {
    const savedIndex = Math.floor(
        Math.abs((savedDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    );
    const currentIndex = Math.floor(
        Math.abs((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24))
    );
    return savedIndex !== currentIndex;
};

export const getTheCityIndexForToday = (startDate: Date, options: string[]) => {
    const timeDiff = new Date().getTime() - startDate.getTime();
    return Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24))) % options.length;
};