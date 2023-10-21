import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterContentInit,
  OnDestroy,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit, AfterContentInit, OnDestroy, OnChanges {

  img = '';
  @Input()
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img =>', this.img);
    // additional code
  }

  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.jpg';

  constructor() {
    // before rendering
    // No async -- once time
    console.log('1. constructor(): method called', 'imgValue=>', this.img);
  }

  ngOnChanges(): void {
    // before rendering
    // Changes inputs -- times
    console.log('2. ngOnChanges(): method called', 'imgValue=>', this.img);
  }

  ngOnInit(): void {
    // before rendering
    // async - fetch -- once time
    console.log('3. ngOnInit(): called', 'imgValue=>', this.img);
  }

  ngAfterContentInit(): void {
    // after rendering
    // handler children
    console.log('4. ngAfterContentInit(): called', 'imgValue=>', this.img);
  }

  ngOnDestroy(): void {
    // delete
    console.log('5.ngOnDestroy(): called', 'imgValue=>',);
  }

  imageNotFound() {
    this.img = this.imageDefault;
  }

  imageLoaded() {
    this.loaded.emit(this.img);
    console.log('img loaded in child component');
  }
}
