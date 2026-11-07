# Angboard

A small, learning-oriented dashboard built with Angular 22. It renders a
responsive 12-column grid of widgets that can be reordered with drag & drop.

The project is intentionally kept small so that each Angular concept it uses is
easy to find and study.

## Features

- 12-column CSS Grid dashboard with widget cards of different sizes.
- Drag & drop reordering powered by `@angular/cdk/drag-drop`.
- Widgets are created dynamically from a registry, so new types can be added
  without touching the dashboard template.
- Signal-based state management with immutable updates.
- Zoneless change detection (the project does not depend on `zone.js`).
- Strict TypeScript and strict Angular templates.
- Unit tests with Vitest.

## Tech stack

| Concern     | Choice                                 |
| ----------- | -------------------------------------- |
| Framework   | Angular 22 (standalone components)     |
| State       | Angular signals (`signal`, `computed`) |
| Drag & drop | Angular CDK                            |
| Styling     | SCSS                                   |
| Tests       | Vitest via `@angular/build:unit-test`  |
| Formatting  | Prettier                               |

## Getting started

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The dev server reloads on file changes.

## Scripts

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npm start`            | Run the dev server                     |
| `npm run build`        | Production build into `dist/`          |
| `npm test`             | Run unit tests with Vitest             |
| `npm run format`       | Format the project with Prettier       |
| `npm run format:check` | Check formatting without writing files |

## Project structure

```
src/app/
  app.ts                      Root component (renders <router-outlet>)
  app.routes.ts               Route table; the dashboard is the root screen
  app.config.ts               Application providers
  core/
    directives/
      widget-host.directive.ts  Creates the widget component dynamically
    models/
      widget-config.ts          Widget model and widget type union
      widget-registry.ts        Widget type -> component mapping
    services/
      dashboard-state.service.ts  Single source of truth for the layout
  dashboard/
    dashboard.component.*     Grid, CDK drop list and widget cards
  widgets/
    clock/                    Clock widget
    notes/                    Notes widget
    weather/                  Weather placeholder widget
```

## Architecture

### State

`DashboardStateService` owns the widget list. The underlying signal is private
and exposed as a read-only signal:

```ts
private readonly _widgets = signal<WidgetConfig[]>([]);
readonly widgets = this._widgets.asReadonly();
```

All mutations go through methods (`addWidget`, `updatePosition`, `reorder`) and
produce new arrays/objects. Immutable updates matter because signals detect
changes by reference.

### Dynamic widgets

Each card uses the `appWidgetHost` directive:

```html
<ng-container appWidgetHost [widget]="widget"></ng-container>
```

The directive resolves the component class from `WIDGET_REGISTRY` and creates it
with `ViewContainerRef.createComponent`. `WIDGET_REGISTRY` is typed as
`Record<WidgetType, Type<unknown>>`, so forgetting to register a new widget type
is a compile-time error.

### Adding a widget

1. Add the new type to `WidgetType` in `core/models/widget-config.ts`.
2. Create a standalone component under `src/app/widgets/<name>/`.
3. Register it in `WIDGET_REGISTRY`.
4. Add a `WidgetConfig` entry to the initial state (or via `addWidget`).

### Drag & drop

The grid is a `cdkDropList` and each card is a `cdkDrag` item with a
`cdkDragHandle` in its header. On drop, CDK reports the previous and current
indices; the dashboard passes them to `DashboardStateService.reorder`, and the
array order defines the visual order.

CDK renders the drag preview in an overlay attached to `<body>`. For that
reason, `.cdk-drag-preview`, `.cdk-drag-placeholder` and `.cdk-drag-animating`
live in `src/styles.scss` (global styles), not in a component stylesheet.

## License

This is a personal learning project.
