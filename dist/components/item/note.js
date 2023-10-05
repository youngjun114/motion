import { BaseComponent } from '../component.js';
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super(`<section class="text__content"><div class="content__left">
          <h2 class="note__title"></h2>
        </div>
        <div class="content__right">
          <p class="note__body"></p>
        </div></section>`);
        const hElement = this.element.querySelector('.note__title');
        hElement.textContent = title;
        const pElement = this.element.querySelector('.note__body');
        pElement.textContent = body;
    }
}
