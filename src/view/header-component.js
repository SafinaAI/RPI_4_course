import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
  return ` <div class=" header_title">
          <h1 class="title">Список задач</h1>
        </div>`;
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
