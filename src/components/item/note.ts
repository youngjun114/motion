/**
 * Child class of BaseComponent
 */

import { BaseComponent } from '../component.js';

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(
      `<div class="content__left">
          <h2 class="note__title"></h2>
        </div>
        <div class="content__right">
          <p class="note__body"></p>
        </div>`
    );

    const hElement = this.element.querySelector(
      '.note__title'
    )! as HTMLHeadingElement;
    hElement.textContent = title;

    const pElement = this.element.querySelector(
      '.note__body'
    )! as HTMLParagraphElement;
    pElement.textContent = body;
  }
}
