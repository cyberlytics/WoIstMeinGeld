export function formatTime(time: string): string {
    return new Date(time).toLocaleDateString();
}
