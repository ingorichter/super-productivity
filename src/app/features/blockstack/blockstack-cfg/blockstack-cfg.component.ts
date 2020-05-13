import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BlockstackService} from '../blockstack.service';

@Component({
  selector: 'blockstack-cfg',
  templateUrl: './blockstack-cfg.component.html',
  styleUrls: ['./blockstack-cfg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockstackCfgComponent {

  constructor(
    private _blockstackService: BlockstackService,
  ) {
  }


  signIn() {
    this._blockstackService.signIn();
  }

}
