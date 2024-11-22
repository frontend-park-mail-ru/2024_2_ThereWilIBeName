export default function formatDate(dateString: string): string {
    return (new Date(dateString)).toLocaleDateString('ru-RU');
}
