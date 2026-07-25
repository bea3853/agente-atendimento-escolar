export class ChatModel {
  constructor() {
    this.history = [];
  }

  async sendMessage(text) {
    this.history.push({ role: 'user', content: text });

    const response = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: text,
        history: this.history.slice(0, -1)
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao contatar o servidor.');
    }

    const data = await response.json();
    this.history.push({ role: 'assistant', content: data.reply });
    return data.reply;
  }
}
