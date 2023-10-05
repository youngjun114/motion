import { BaseComponent } from '../component.js';
export class TodoComponent extends BaseComponent {
    constructor(title, body) {
        super(`<section class="text__content"><div class="content__left">
          <h2 class="todo__title"></h2>
        </div>
        <div class="content__right">
          <p class="todo__body"></p>
        </div></section>`);
        const hElement = this.element.querySelector('.todo__title');
        hElement.textContent = title;
        const pElement = this.element.querySelector('.todo__body');
        pElement.textContent = body;
    }
}
