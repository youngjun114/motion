/**
 * Child class of BaseComponent
 */
export interface Composable {
  addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
  setOnRemoveListener(listener: OnRemoveListener): void;
}

type OnRemoveListener = () => void;

type SectionContainerConstructor = {
  new (): SectionContainer;
};

import { BaseComponent, Component } from '../component.js';

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private removeListener?: OnRemoveListener;

  constructor() {
    super(
      `<li class="page__item">
          <div class="item__content"></div>
          <button class="item__header-remove"><i class="fas fa-trash"></i></button>
      </li>`
    );
    const removeBtn = this.element.querySelector(
      '.item__header-remove'
    )! as HTMLElement;

    removeBtn.onclick = () => {
      this.removeListener && this.removeListener();
    };
  }

  addChild(child: Component) {
    const content = this.element.querySelector(
      '.item__content'
    )! as HTMLElement;
    child.attachTo(content);
  }

  setOnRemoveListener(listener: OnRemoveListener): void {
    this.removeListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnRemoveListener(() => {
      item.removeFrom(this.element);
    });
  }
}
