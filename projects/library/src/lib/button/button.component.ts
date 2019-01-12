import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { coerceBooleanProperty } from '../utils';

export enum ButtonKinds {
  Primary = 'primary'
}

export enum ButtonTypes {
  Button = 'button',
  Link = 'link'
}

@Component({
  selector: 'lib-button',
  templateUrl: 'button.html',
  styleUrls: ['./button.scss'],
  host: {
    '[attr.disabled]': 'null',
    '[attr.active]': 'null',
    '[attr.kind]': 'null',
    '[attr.type]': 'null',
    '[attr.title]': 'null'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  private _disabled = false;
  private _active = false;

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (value !== this.disabled) {
      this._disabled = coerceBooleanProperty(value);
      this._changeDetectorRef.markForCheck();
    }
  }
  @Input()
  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    if (value !== this.active) {
      this._active = coerceBooleanProperty(value);
      this._changeDetectorRef.markForCheck();
    }
  }
  @Input() public kind: ButtonKinds = ButtonKinds.Primary;
  @Input() public title: string | null = null;
  @Input() public type: ButtonTypes = ButtonTypes.Button;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  public _clickHandler(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  public classes(): string {
    const classes = [
      `Button Button--${this.type || ButtonTypes.Button}`,
      `Button--${this.kind || ButtonKinds.Primary}`
    ];
    if (this._active) {
      classes.push('Button--active');
    }
    if (this._disabled) {
      classes.push('Button--disabled');
    }
    return classes.join(' ');
  }
}
