export const formatDuration = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num: number) => num.toString().padStart(2, "0");

    if (hours > 0) {
        return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${minutes}:${pad(seconds)}`;
};