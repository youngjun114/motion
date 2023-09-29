/**
 * Child class of BaseComponent
 */

import { BaseComponent } from '../component';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(
      `<section class="text__content"><div class="content__left">
          <h2 class="todo__title"></h2>
        </div>
        <div class="content__right">
          <p class="todo__body"></p>
        </div></section>`
    );
    const hElement = this.element.querySelector(
      '.todo__title'
    )! as HTMLHeadingElement;
    hElement.textContent = title;

    const pElement = this.element.querySelector(
      '.todo__body'
    )! as HTMLParagraphElement;
    pElement.textContent = body;
  }
}
