export default function showMessage(messageText: string, messageElement: HTMLElement) {
    messageElement.textContent = messageText;
    messageElement.classList.remove('hidden');
    setTimeout(() => messageElement.classList.remove('hidden-animation'), 100);
    setTimeout(() => {
        messageElement.classList.add('hidden-animation');
        setTimeout (()=> messageElement.classList.add('hidden'), 300);
    }, 2000);
};
