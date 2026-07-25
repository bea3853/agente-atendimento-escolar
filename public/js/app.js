import { ChatModel } from './model/ChatModel.js';
import { ChatView } from './view/ChatView.js';
import { ChatController } from './controller/ChatController.js';

const model = new ChatModel();
const view = new ChatView();
const controller = new ChatController(model, view);

controller.init();
