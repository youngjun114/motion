import { Component } from './components/component.js';
import { ImageComponent } from './components/item/image.js';
import { NoteComponent } from './components/item/note.js';
import { TodoComponent } from './components/item/todo.js';
import { VideoComponent } from './components/item/video.js';
import { Composable, PageComponent } from './components/page/page.js';

class App {
  private readonly page: Component & Composable;

  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      'Random Image',
      'https://picsum.photos/500/282'
    );
    this.page.addChild(image);

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
  }
}

new App(document.querySelector('.document')! as HTMLElement);
