import { BaseComponent } from '../component.js';
export class InputDialog extends BaseComponent {
    constructor() {
        super(`<dialog class="dialog">
          <div class="dialog__container">
            <button class="dialog__close-btn"><i class="fas fa-times"></i></button>
            <div class="dialog__body""></div>
            <button class="dialog__submit-btn">Add</button>
            </div>
        </dialog>`);
        const closeBtn = this.element.querySelector('.dialog__close-btn');
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        const submitBtn = this.element.querySelector('.dialog__submit-btn');
        submitBtn.onclick = () => {
            this.submitListener && this.submitListener();
        };
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
    addChild(child) {
        const body = this.element.querySelector('.dialog__body');
        child.attachTo(body);
    }
}
