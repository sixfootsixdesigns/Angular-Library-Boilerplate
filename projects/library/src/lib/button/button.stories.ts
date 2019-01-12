import { storiesOf, moduleMetadata } from '@storybook/angular';
import { ButtonComponentModule } from './button.module';

storiesOf('Button', module)
  .addDecorator(
    moduleMetadata({
      imports: [ButtonComponentModule]
    })
  )
  .add('Default', () => ({
    template: `
      <lib-button>Button</lib-button>
      <br><br>
      <lib-button disabled>Disabled Button</lib-button>
      <br><br>
      <lib-button active>Active Button</lib-button>
    `
  }))
  .add('LinK', () => ({
    template: `
      <lib-button kind="link">Button</lib-button>
      <br><br>
      <lib-button kind="link"disabled>Disabled Button</lib-button>
      <br><br>
      <lib-button kind="link" active>Active Button</lib-button>
    `
  }));
