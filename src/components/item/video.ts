/**
 * Child class of BaseComponent
 */

import { BaseComponent } from '../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `<div class="content__left">
            <iframe class="content__video"></iframe>
        </div>
        <div class="content__right">
            <h2 class="content__title"></h2>
        </div>
      `
    );
    const iframe = this.element.querySelector(
      '.content__video'
    )! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url);
    iframe.width = '500px';
    iframe.height = 'auto';

    const titleElement = this.element.querySelector(
      '.content__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // Assuming user will input one of the following formats of url
  //https://www.youtube.com/watch?v=qeWq4nDp2xo
  //https://www.youtube.com/embed/qeWq4nDp2xo
  private convertToEmbeddedURL(url: string): string {
    let id: string | undefined;
    if (url.includes('watch')) {
      id = url.split('watch?v=')[1];
    } else if (url.includes('embed')) {
      id = url.split('embed/')[1];
    } else {
      id = undefined;
    }
    return `https://www.youtube.com/embed/${id}`;
  }
}

//https://www.youtube.com/watch?v=qeWq4nDp2xo
//https://www.youtube.com/embed/qeWq4nDp2xo
