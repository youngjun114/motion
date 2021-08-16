/**
 * Child class of BaseComponent
 */

import { BaseComponent } from '../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `<section class="media__content"><div class="content__left">
          <img class="content__image"/>
      </div>
      <div class="content__right">
        <h2 class="content__title"></h2>
      </div></section>`
    );

    const imageElement = this.element.querySelector(
      '.content__image'
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      '.content__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}
