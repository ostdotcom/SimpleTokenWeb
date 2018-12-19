import {AfterViewChecked, Component, ElementRef, ViewChild, HostListener} from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { AppConfigService } from './services/app-config.service';
import { UtilitiesService } from "./services/utilities.service";
import {ScrollTopService} from "./services/scroll-top.service";

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

  navElHeight: number;

  constructor(private elementRef : ElementRef ,  private appConfigService : AppConfigService,
              private utilities: UtilitiesService, private router : Router, private location: Location,
              private scrollTop: ScrollTopService){
    let dataset = elementRef.nativeElement.dataset ,
        initDataJson = dataset && dataset.initDataJson || "{}",
        initData = initDataJson && JSON.parse( initDataJson )
        ;
    appConfigService.setAppInitData( initData );
    console.log( appConfigService.getAppInitData( initData )  );
    this.detectURLChange();
  }

  ngAfterViewChecked() {
    let el = this.headerDiv.nativeElement;
    this.navElHeight = $(el).height();
    this.updateView();
  }

  updateView() {
    $('.phantom-el').height(this.navElHeight);
  }

  //Used to detect path changes
  detectURLChange() {
    this.router.events.subscribe((val) => {
      if(this.location.path() != ''){
        this.handleURLChange();
      }
    });
  }

  handleURLChange() {
    this.setSettingsPageScroll();
  }

  setSettingsPageScroll() {
    let mobileSettingsMenu = $('.mobile-list'),
        isMobileView = mobileSettingsMenu && mobileSettingsMenu.css('display') == "block"
    ;
    if( this.utilities.isSettingPage() ){
      this.disableBodyScroll();
      if(!isMobileView) {
        this.scrollTop.scrollTop();
      }
      this.scrollTop.scrollTop($('.rightSection')[0]);
    } else{
      this.enableBodyScroll();
    }
  }

  disableBodyScroll() {
    let maxHeight = 'calc( 100vh - '+ this.navElHeight + 'px)';
    $('body').addClass('settings-page');
    $('.rightSection').css('max-height', maxHeight);
    $('.leftMenuDesktop').css('max-height', maxHeight);
    $('body > .container-footer').hide();
  }

  enableBodyScroll() {
    $('body').removeClass('settings-page');
    $('body > .container-footer').show();
  }

}
