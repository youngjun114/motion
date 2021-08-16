/**
 * Child class of BaseComponent
 */

import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnRemoveListener = () => void;
type DragState = 'start' | 'stop' | 'enter' | 'leave';
type SectionContainerConstructor = {
  new (): SectionContainer;
};
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnRemoveListener(listener: OnRemoveListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: 'mute' | 'unmute'): void;
  getBoundingRect(): DOMRect;
  onDropped(): void;
}

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private removeListener?: OnRemoveListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;
  constructor() {
    super(
      `<li class="page__item" draggable="true">
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

    this.element.addEventListener('dragstart', (e: DragEvent) => {
      this.onDragStar(e);
    });
    this.element.addEventListener('dragend', (e: DragEvent) => {
      this.onDragEnd(e);
    });
    this.element.addEventListener('dragenter', (e: DragEvent) => {
      this.onDragEnter(e);
    });
    this.element.addEventListener('dragleave', (e: DragEvent) => {
      this.onDragLeave(e);
    });
  }

  onDragStar(_: DragEvent) {
    this.notifyDragObserver('start');
    this.element.classList.add('drag_start');
  }
  onDragEnd(_: DragEvent) {
    this.notifyDragObserver('stop');
    this.element.classList.remove('drag_start');
  }
  onDragEnter(_: DragEvent) {
    this.notifyDragObserver('enter');
    this.element.classList.add('drop_area');
  }
  onDragLeave(_: DragEvent) {
    this.notifyDragObserver('leave');
    this.element.classList.remove('drop_area');
  }

  notifyDragObserver(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
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

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: 'mute' | 'unmute') {
    state === 'mute'
      ? this.element.classList.add('mute-children')
      : this.element.classList.remove('mute-children');
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  onDropped(): void {
    this.element.classList.remove('drop_area');
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<SectionContainer>();
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');

    this.element.addEventListener('dragover', (e: DragEvent) => {
      this.onDragOver(e);
    });
    this.element.addEventListener('drop', (e: DragEvent) => {
      this.onDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    console.log('onDragOver');
  }

  // change order when dropped
  onDrop(e: DragEvent) {
    e.preventDefault();
    //  Nothing to drop
    if (!this.dropTarget) {
      return;
    }
    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = e.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      // remove dragTarget from the page
      this.dragTarget.removeFrom(this.element);
      // move in front of dropTarget
      this.dropTarget.attach(
        this.dragTarget,
        dropY < srcElement.y ? 'beforebegin' : 'afterend'
      );
    }
    this.dropTarget.onDropped();
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnRemoveListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case 'start':
            this.dragTarget = target;
            this.updateSections('mute');
            break;
          case 'stop':
            this.dragTarget = undefined;
            this.updateSections('unmute');
            break;
          case 'enter':
            this.dropTarget = target;
            break;
          case 'leave':
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`unsupported state ${state}`);
        }
      }
    );
  }

  private updateSections(state: 'mute' | 'unmute') {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
