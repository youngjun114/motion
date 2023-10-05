import { InputDialog, } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { PageComponent, PageItemComponent, } from './components/page/page.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);
        this.bindElementToDialog('#new-image', MediaSectionInput, (input) => new ImageComponent(input.title, input.url));
        this.bindElementToDialog('#new-video', MediaSectionInput, (input) => new VideoComponent(input.title, input.url));
        this.bindElementToDialog('#new-note', TextSectionInput, (input) => new NoteComponent(input.title, input.body));
        this.bindElementToDialog('#new-todo', TextSectionInput, (input) => new TodoComponent(input.title, input.body));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/500/300'));
        this.page.addChild(new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=CfPxlb8-ZQ0'));
        this.page.addChild(new NoteComponent('Note Title', 'Hello World'));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/500/300'));
        this.page.addChild(new NoteComponent('Note Title', 'Hello World'));
        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/500/300'));
        const navbarMenu = document.querySelector('.header__navbar');
        const navbarButton = document.querySelector('.navbar__toggle-btn');
        navbarButton.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }
    bindElementToDialog(selector, InputComponent, makeSection) {
        const element = document.querySelector(selector);
        const navbarMenu = document.querySelector('.header__navbar');
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            navbarMenu.classList.remove('active');
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });
            dialog.setOnSubmitListener(() => {
                const item = makeSection(input);
                this.page.addChild(item);
                dialog.removeFrom(this.dialogRoot);
            });
        });
    }
}
new App(document.querySelector('.document'), document.body);
