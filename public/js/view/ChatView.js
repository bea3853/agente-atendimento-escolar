export class ChatView {
  constructor() {
    this.messagesEl = document.getElementById('chat-messages');
    this.formEl = document.getElementById('chat-form');
    this.inputEl = document.getElementById('chat-input');
    this.typingEl = document.getElementById('typing-indicator');
  }

  onSend(handler) {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.inputEl.value.trim();
      if (!text) return;
      handler(text);
      this.inputEl.value = '';
    });
  }

  addMessage(role, text) {
    const bubble = document.createElement('div');
    bubble.className = `message ${role}`;
    bubble.textContent = text;
    this.messagesEl.appendChild(bubble);
    this.scrollToBottom();
  }

  showTyping(show) {
    this.typingEl.hidden = !show;
    if (show) this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  showWelcome() {
    this.addMessage(
      'bot',
      'Olá! 👋 Seja bem-vindo(a) à Escola Técnica Horizonte. Posso te ajudar com informações sobre cursos, matrícula, horários e contato. Como posso ajudar hoje?'
    );
  }
}
