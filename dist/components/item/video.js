import { BaseComponent } from '../component.js';
export class VideoComponent extends BaseComponent {
    constructor(title, url) {
        super(`<section class="media__content"><div class="content__left">
            <iframe class="content__video height="100%" width="100%"></iframe>
        </div>
        <div class="content__right">
            <h2 class="content__title"></h2>
        </div></section>
      `);
        const iframe = this.element.querySelector('.content__video');
        iframe.src = this.convertToEmbeddedURL(url);
        const titleElement = this.element.querySelector('.content__title');
        titleElement.textContent = title;
    }
    convertToEmbeddedURL(url) {
        let id;
        if (url.includes('watch')) {
            id = url.split('watch?v=')[1];
        }
        else if (url.includes('embed')) {
            id = url.split('embed/')[1];
        }
        else {
            id = undefined;
        }
        return `https://www.youtube.com/embed/${id}`;
    }
}
