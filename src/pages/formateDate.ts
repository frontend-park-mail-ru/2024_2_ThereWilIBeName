export default function formatDate(dateString: string): string {
    const date = new Date(dateString).toLocaleDateString('ru-RU');
    // const day = String(date.getDate()).padStart(2, '0');       // Получаем день, добавляем 0 при необходимости
    // const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц, добавляем 0 при необходимости
    // const year = date.getFullYear();                           // Получаем год

    return date;
}
