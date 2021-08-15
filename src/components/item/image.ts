/**
 * Child class of BaseComponent
 */

import { BaseComponent } from '../component.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `<section class="card">
        <div class="card__image-container">
          <img class="image__thumbnail"/>
        </div>
        <div class="card__desc">
          <h2 class="card__title">Some random image</h2>
        </div>
      </section>`
    );
    const imageElement = this.element.querySelector(
      '.image__thumbnail'
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector(
      '.card__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }
}
