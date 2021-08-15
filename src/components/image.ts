export class ImageComponent {
  private element: HTMLImageElement;
  constructor() {
    this.element = document.createElement('img');
    this.element.setAttribute('src', 'https://picsum.photos/500/282');
    this.element.setAttribute('class', 'content__img');
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterend') {
    parent.insertAdjacentElement(position, this.element);
  }
}
