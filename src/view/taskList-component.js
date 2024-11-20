//Ul
import { createElement } from "../framework/render.js";
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTasksListComponentTemplate(status) {
  const { status_title, label } = status;
  return ` <div class="list-shell-header-${status_title}">
              <label class="list-title title-${status_title}">${label}</label>
              </div>`;
}

// export default class TasksListComponent extends AbstractComponent {
//   constructor({ task_status }) {
//     super();
//     this.status = task_status;
//   }
//   get template() {
//     return createTasksListComponentTemplate(this.status);
//   }
// }


export default class TaskListComponent extends AbstractComponent{
  
  constructor({task_status, label, onTaskDrop}){
    super();
    this.status=task_status;
    this.label=label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    //console.log(`heat waves: ${this.status.status_title}`);
    return createTasksListComponentTemplate(this.status);
  }

  #setDropHandler(onTaskDrop){
    const container=this.element;
    container.addEventListener('dragover',(event)=>{
      event.preventDefault();
    })
    container.addEventListener('drop',(event)=>{
      event.preventDefault();
      const taskId=event.dataTransfer.getData('text/plain');
      onTaskDrop(taskId, this.status)
    })
  }


  // get element() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }


  //   return this.element;
  // }


  removeElement() {
    this.element = null;
  }
}