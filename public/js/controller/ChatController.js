export class ChatController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.onSend((text) => this.handleSend(text));
  }

  async handleSend(text) {
    this.view.addMessage('user', text);
    this.view.showTyping(true);

    try {
      const reply = await this.model.sendMessage(text);
      this.view.showTyping(false);
      this.view.addMessage('bot', reply);
    } catch (err) {
      this.view.showTyping(false);
      this.view.addMessage(
        'bot',
        'Desculpe, tive um problema para responder agora. Tente novamente em instantes.'
      );
      console.error(err);
    }
  }

  init() {
    this.view.showWelcome();
  }
}
