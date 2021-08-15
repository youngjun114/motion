export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) {
    const template = document.createElement('template');
    template.innerHTML = `<section class="card"><div class="card__image-container"><img class="image__thumbnail"/>
    </div>
    <div class="card__desc">
      <h2 class="card__title">Some random image</h2>
    </div>
  </section>`;
    this.element = template.content.firstElementChild! as HTMLElement;
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

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
