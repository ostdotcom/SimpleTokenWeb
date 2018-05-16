import { Component, ElementRef  } from '@angular/core';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private elementRef : ElementRef ,  private appConfigService : AppConfigService){
    let dataset = elementRef.nativeElement.dataset ,
        initDataJson = dataset && dataset.initDataJson || "{}",
        initData = initDataJson && JSON.parse( initDataJson )
        ;
    appConfigService.setAppInitData( initData );
    console.log( appConfigService.getAppInitData( initData )  );
  }

}
