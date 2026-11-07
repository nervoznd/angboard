import { WidgetType } from './widget-config';
import { WIDGET_REGISTRY } from './widget-registry';

describe('WIDGET_REGISTRY', () => {
  const widgetTypes: WidgetType[] = ['notes', 'clock', 'weather'];

  for (const type of widgetTypes) {
    it(`should register a component for "${type}"`, () => {
      expect(WIDGET_REGISTRY[type]).toBeTruthy();
    });
  }
});
