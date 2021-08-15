import { Component } from './components/component.js';
import { InputDialog } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const note = new NoteComponent('TypeScript', 'TypeScript is fun but hard');
    this.page.addChild(note);

    const todo = new TodoComponent(
      'Learn TypeScript',
      'I have to learn TypeScript'
    );
    this.page.addChild(todo);

    const video = new VideoComponent(
      'Random Video',
      'https://www.youtube.com/watch?v=qeWq4nDp2xo'
    );
    this.page.addChild(video);

    // const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;

    // imageBtn.addEventListener('click', () => {
    //   const dialog = new InputDialog();
    //   const inputSection = new MediaSectionInput();
    //   dialog.addChild(inputSection);
    //   dialog.attachTo(dialogRoot);

    //   // When dialog close button is clicked
    //   dialog.setOnCloseListener(() => {
    //     dialog.removeFrom(dialogRoot);
    //   });

    //   //  When dialog form is submitted
    //   dialog.setOnSubmitListener(() => {
    //     // Create and add to page
    //     const image = new ImageComponent(inputSection.title, inputSection.url);
    //     this.page.addChild(image);
    //     dialog.removeFrom(dialogRoot);
    //   });
    // });

    const navbar = document.querySelector(
      '.header__navbar'
    )! as HTMLUListElement;
    navbar.addEventListener('click', (e) => {
      console.log(e.target);
    });
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);

//https://picsum.photos/500/300
