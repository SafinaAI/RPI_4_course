import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createCleanUpButton() {
  return `
        <button class="clear_button" type="submit">X Очистить</button>
        `;
}

export default class CleanUpButtonComponent extends AbstractComponent {
  get template() {
    return createCleanUpButton();
  }
}
