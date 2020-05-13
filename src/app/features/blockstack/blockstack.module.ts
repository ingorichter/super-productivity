import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlockstackCfgComponent} from './blockstack-cfg/blockstack-cfg.component';


@NgModule({
  declarations: [BlockstackCfgComponent],
  exports: [BlockstackCfgComponent],
  imports: [
    CommonModule
  ]
})
export class BlockstackModule {
}
