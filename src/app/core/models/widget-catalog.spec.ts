import { WIDGET_CATALOG, getWidgetDefinition } from './widget-catalog';
import { WidgetType } from './widget-config';

describe('WIDGET_CATALOG', () => {
  const widgetTypes: WidgetType[] = ['notes', 'clock', 'weather'];

  it('should contain exactly one definition per widget type', () => {
    const catalogTypes = WIDGET_CATALOG.map((definition) => definition.type).sort();

    expect(catalogTypes).toEqual([...widgetTypes].sort());
  });

  for (const type of widgetTypes) {
    it(`should expose a definition for "${type}"`, () => {
      expect(getWidgetDefinition(type)).toEqual(
        expect.objectContaining({
          type,
          title: expect.any(String),
          description: expect.any(String),
          size: expect.objectContaining({
            rows: expect.any(Number),
            cols: expect.any(Number),
          }),
        }),
      );
    });
  }
});
