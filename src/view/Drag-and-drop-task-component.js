import { AbstractComponent } from "../framework/view/abstract-component.js";

function createDragAndDropTaskComponentTemplate() {
  // return `<li class="task-element drag-and-drop">Перетащите карточку</li>`;
  return `<p class="list-shell-header- drag-and-drop">Перетащите карточку</p>`;
}

export default class DragAndDropTaskComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createDragAndDropTaskComponentTemplate();
  }
}
