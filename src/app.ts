import { Component } from './components/component.js';
import {
  InputDialog,
  MediaData,
  TextData,
} from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );

    // dummy variable
    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/500/300')
    );
    this.page.addChild(
      new VideoComponent(
        'Video Title',
        'https://www.youtube.com/watch?v=CfPxlb8-ZQ0'
      )
    );
    this.page.addChild(new NoteComponent('Note Title', 'Hello World'));

    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/500/300')
    );

    this.page.addChild(new NoteComponent('Note Title', 'Hello World'));

    this.page.addChild(
      new ImageComponent('Image Title', 'https://picsum.photos/500/300')
    );

    const navbarMenu = document.querySelector(
      '.header__navbar'
    )! as HTMLUListElement;
    const navbarButton = document.querySelector(
      '.navbar__toggle-btn'
    )! as HTMLButtonElement;
    navbarButton.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;
    const navbarMenu = document.querySelector(
      '.header__navbar'
    )! as HTMLUListElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);
      navbarMenu.classList.remove('active');

      // When dialog close button is clicked
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      //  When dialog form is submitted
      dialog.setOnSubmitListener(() => {
        // Create and add to page
        const item = makeSection(input);
        this.page.addChild(item);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);

//https://picsum.photos/500/300
