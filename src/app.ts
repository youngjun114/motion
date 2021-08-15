import { ImageComponent } from './components/item/image.js';
import { PageComponent } from './components/page/page.js';

class App {
  private readonly page: PageComponent;
  private readonly image: ImageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.image = new ImageComponent(
      'Random Image',
      'https://picsum.photos/500/282'
    );
    this.page.attachTo(appRoot);
    this.image.attachTo(appRoot, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
