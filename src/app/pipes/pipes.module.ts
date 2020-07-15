import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Pipes */
import { TransformHtmlPipe } from './transform-html/transform-html.pipe';
import { NumPagesPipe } from './num-pages/num-pages.pipe';
import { DefaultTextPipe } from './default-text/default-text.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [TransformHtmlPipe, NumPagesPipe, DefaultTextPipe],
  declarations: [TransformHtmlPipe, NumPagesPipe, DefaultTextPipe]
})
export class PipesModule { }
