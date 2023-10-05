import { BaseComponent } from '../component.js';
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`<li class="page__item" draggable="true">
          <div class="item__content"></div>
          <button class="item__header-remove"><i class="fas fa-trash"></i></button>
      </li>`);
        const removeBtn = this.element.querySelector('.item__header-remove');
        removeBtn.onclick = () => {
            this.removeListener && this.removeListener();
        };
        this.element.addEventListener('dragstart', (e) => {
            this.onDragStar(e);
        });
        this.element.addEventListener('dragend', (e) => {
            this.onDragEnd(e);
        });
        this.element.addEventListener('dragenter', (e) => {
            this.onDragEnter(e);
        });
        this.element.addEventListener('dragleave', (e) => {
            this.onDragLeave(e);
        });
    }
    onDragStar(_) {
        this.notifyDragObserver('start');
        this.element.classList.add('drag_start');
    }
    onDragEnd(_) {
        this.notifyDragObserver('stop');
        this.element.classList.remove('drag_start');
    }
    onDragEnter(_) {
        this.notifyDragObserver('enter');
        this.element.classList.add('drop_area');
    }
    onDragLeave(_) {
        this.notifyDragObserver('leave');
        this.element.classList.remove('drop_area');
    }
    notifyDragObserver(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    addChild(child) {
        const content = this.element.querySelector('.item__content');
        child.attachTo(content);
    }
    setOnRemoveListener(listener) {
        this.removeListener = listener;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    muteChildren(state) {
        state === 'mute'
            ? this.element.classList.add('mute-children')
            : this.element.classList.remove('mute-children');
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
    onDropped() {
        this.element.classList.remove('drop_area');
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super('<ul class="page"></ul>');
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.element.addEventListener('dragover', (e) => {
            this.onDragOver(e);
        });
        this.element.addEventListener('drop', (e) => {
            this.onDrop(e);
        });
    }
    onDragOver(e) {
        e.preventDefault();
        console.log('onDragOver');
    }
    onDrop(e) {
        e.preventDefault();
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const dropY = e.clientY;
            const srcElement = this.dragTarget.getBoundingRect();
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    }
    addChild(section) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnRemoveListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
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
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
}
