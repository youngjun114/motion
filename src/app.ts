import { ImageComponent } from './components/image.js';
import { PageComponent } from './components/page.js';

class App {
  private readonly page: PageComponent;
  private readonly image: ImageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.image = new ImageComponent();
    this.page.attachTo(appRoot);
    this.image.attachTo(appRoot);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
