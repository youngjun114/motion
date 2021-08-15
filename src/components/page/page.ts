/**
 * Child class of BaseComponent
 */
export interface Composable {
  addChild(child: Component): void;
}

type OnRemoveListener = () => void;

import { BaseComponent, Component } from '../component.js';

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private removeListener?: OnRemoveListener;

  constructor() {
    super(
      `<li class="page__item">
          <div class="item__header">
            <h2 class="item__header-category">Heading</h2>
            <button class="item__header-remove"><i class="fas fa-trash"></i></button>
          </div>
          <div class="item__content"></div>
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
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnRemoveListener(() => {
      item.removeFrom(this.element);
    });
  }
}
