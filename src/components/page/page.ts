/**
 * Child class of BaseComponent
 */
export interface Composable {
  addChild(child: Component): void;
}

import { BaseComponent, Component } from '../component.js';

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  constructor() {
    super(
      `<li class="page__item">
        <section class="item__body">
          <div class="item__header">
            <h2 class="item__header-category">Heading</h2>
            <button class="item__header-delete"><i class="fas fa-times"></i></button>
          </div>
          <div class="item__content"></div>
        </section>
      </li>`
    );
  }

  addChild(child: Component) {
    const content = this.element.querySelector(
      '.item__content'
    )! as HTMLElement;
    child.attachTo(content);
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
  }
}
