import {AfterViewChecked, Component, ElementRef, ViewChild, HostListener} from '@angular/core';
import { AppConfigService } from './services/app-config.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewChecked {

  @ViewChild('headerDiv') headerDiv:ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateView();
  }

  constructor(private elementRef : ElementRef ,  private appConfigService : AppConfigService){
    let dataset = elementRef.nativeElement.dataset ,
        initDataJson = dataset && dataset.initDataJson || "{}",
        initData = initDataJson && JSON.parse( initDataJson )
        ;
    appConfigService.setAppInitData( initData );
    console.log( appConfigService.getAppInitData( initData )  );
  }

  ngAfterViewChecked() {
    this.updateView();
  }

  updateView() {
    let el = this.headerDiv.nativeElement,
        height = $(el).height();
    $('.phantom-el').height(height);
  }

}
