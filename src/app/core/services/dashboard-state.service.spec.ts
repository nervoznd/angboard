import { TestBed } from '@angular/core/testing';
import { getWidgetDefinition } from '../models/widget-catalog';
import { WidgetConfig } from '../models/widget-config';
import { DashboardStateService } from './dashboard-state.service';

function createWidget(overrides: Partial<WidgetConfig> = {}): WidgetConfig {
  return {
    id: 'test',
    type: 'notes',
    title: 'Test widget',
    size: { rows: 1, cols: 1 },
    ...overrides,
  };
}

describe('DashboardStateService', () => {
  let service: DashboardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardStateService);
  });

  it('should start with the default widgets', () => {
    expect(service.widgets().length).toBeGreaterThan(0);
  });

  it('should append a widget without mutating the previous array', () => {
    const before = service.widgets();

    service.addWidget(createWidget({ id: 'new' }));

    expect(service.widgets()).not.toBe(before);
    expect(service.widgets().at(-1)?.id).toBe('new');
    expect(before.some((widget) => widget.id === 'new')).toBe(false);
  });

  it('should add a widget using catalog defaults', () => {
    const definition = getWidgetDefinition('clock');

    const widget = service.addWidgetOfType('clock');

    expect(widget).toMatchObject({
      type: 'clock',
      title: definition.title,
      size: definition.size,
    });
    expect(service.widgets().at(-1)).toBe(widget);
  });

  it('should generate unique ids for widgets added by type', () => {
    const first = service.addWidgetOfType('notes');
    const second = service.addWidgetOfType('notes');

    expect(first.id).not.toBe(second.id);
    expect(service.widgets().filter((widget) => widget.id === first.id)).toHaveLength(1);
  });

  it('should not share the size object with the catalog definition', () => {
    const definition = getWidgetDefinition('weather');

    const widget = service.addWidgetOfType('weather');

    expect(widget.size).toEqual(definition.size);
    expect(widget.size).not.toBe(definition.size);
  });

  it('should move a widget to a new index', () => {
    const before = service.widgets();
    const first = before[0];

    service.reorder(0, before.length - 1);

    const after = service.widgets();
    expect(after.at(-1)).toBe(first);
    expect(after).not.toBe(before);
  });

  it('should ignore out-of-range indices', () => {
    const before = service.widgets();

    service.reorder(-1, 999);

    expect(service.widgets()).toBe(before);
  });

  it('should ignore reordering to the same index', () => {
    const before = service.widgets();

    service.reorder(1, 1);

    expect(service.widgets()).toBe(before);
  });
});
