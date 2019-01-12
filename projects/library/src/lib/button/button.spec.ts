import { ButtonKinds, ButtonTypes, ButtonComponent } from './button.component';
import { async as ngAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ButtonComponentModule } from './button.module';

@Component({
  template: `
    <lib-button
      [disabled]="isDisabled"
      [kind]="buttonKind"
      [title]="buttonTitle"
      (click)="increment()"
      [type]="buttonType"
      >GO</lib-button
    >
  `
})
class TestComponent {
  clickCount = 0;
  isDisabled = false;
  buttonKind: ButtonKinds;
  buttonTitle = '';
  buttonType: ButtonTypes;
  increment() {
    this.clickCount += 1;
  }
}

describe('button', () => {
  let fixture: ComponentFixture<any>;
  let testComponent: any;

  beforeEach(
    ngAsync(() => {
      TestBed.configureTestingModule({
        imports: [ButtonComponentModule],
        declarations: [TestComponent]
      });
      TestBed.compileComponents();
    })
  );

  describe('basic component', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      testComponent = fixture.debugElement.componentInstance;
      fixture.detectChanges();
    });

    describe('classes', () => {
      it('has the correct base class name', () => {
        const button = fixture.nativeElement.querySelector('button');

        expect(button.className.includes('Button')).toBe(true);
      });

      describe('when kind is', () => {
        describe('not passed', () => {
          it('has the correct default class name', () => {
            const button = fixture.nativeElement.querySelector('button');

            expect(button.className.includes('Button--primary')).toBe(true);
          });
        });

        describe('primary', () => {
          beforeEach(() => {
            testComponent.buttonKind = ButtonKinds.Primary;
            fixture.detectChanges();
          });

          it('has the correct class name', () => {
            const button = fixture.nativeElement.querySelector('button');

            expect(button.className.includes('Button--primary')).toBe(true);
          });
        });
      });

      describe('when type is', () => {
        describe('not passed', () => {
          it('has the correct default class name', () => {
            const button = fixture.nativeElement.querySelector('button');

            expect(button.className.includes('Button--button')).toBe(true);
          });
        });

        describe('button', () => {
          beforeEach(() => {
            testComponent.buttonType = ButtonTypes.Button;
            fixture.detectChanges();
          });

          it('has the correct class name', () => {
            const button = fixture.nativeElement.querySelector('button');

            expect(button.className.includes('Button--button')).toBe(true);
          });
        });

        describe('link', () => {
          beforeEach(() => {
            testComponent.buttonType = ButtonTypes.Link;
            fixture.detectChanges();
          });

          it('has the correct class name', () => {
            const button = fixture.nativeElement.querySelector('button');
            expect(button.className.includes('Button--link')).toBe(true);
          });
        });
      });
    });

    describe('text', () => {
      it('has the text it is passed', () => {
        const button = fixture.nativeElement.querySelector('button');
        expect(button.innerText).toContain('GO');
      });
    });

    describe('disabled', () => {
      describe('when disabled not passed', () => {
        it('disabled is false', () => {
          const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

          expect(button.disabled).toBe(false);
        });
      });

      describe('when not disabled', () => {
        beforeEach(() => {
          testComponent.isDisabled = false;
          fixture.detectChanges();
        });

        it('disabled is false', () => {
          const button = fixture.nativeElement.querySelector('button');

          expect(button.disabled).toBe(false);
          expect(button.getAttribute('aria-disabled')).toBe(null);
        });
      });

      describe('when disabled', () => {
        beforeEach(() => {
          testComponent.isDisabled = true;
          fixture.detectChanges();
        });

        it('disabled is true', () => {
          const button = fixture.nativeElement.querySelector('button');

          expect(button.disabled).toBe(true);
          expect(button.getAttribute('aria-disabled')).toBe('true');
        });
      });
    });

    describe('title', () => {
      describe('when there is a title', () => {
        const mockText = '💩';

        beforeEach(() => {
          testComponent.buttonTitle = mockText;
          fixture.detectChanges();
        });

        it('has an aria-label that is equivalent to the title', () => {
          const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

          expect(button.getAttribute('aria-label')).toContain(mockText);
        });
      });

      describe('when there is not a title', () => {
        it('has an aria-label that is equivalent to the title', () => {
          const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

          expect(button.getAttribute('aria-label')).toBeNull();
        });
      });
    });

    describe('Click Event', () => {
      it('Should emit click if active', () => {
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        button.click();
        expect(testComponent.clickCount).toBe(1);
      });

      it('Should not emit click if disabled', () => {
        testComponent.isDisabled = true;
        fixture.detectChanges();
        const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
        button.click();
        expect(testComponent.clickCount).toBe(0);
      });
    });
  });
});
