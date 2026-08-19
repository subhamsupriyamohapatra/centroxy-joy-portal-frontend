import * as migration_20260813_071459 from './20260813_071459';
import * as migration_20260814_114151 from './20260814_114151';

export const migrations = [
  {
    up: migration_20260813_071459.up,
    down: migration_20260813_071459.down,
    name: '20260813_071459',
  },
  {
    up: migration_20260814_114151.up,
    down: migration_20260814_114151.down,
    name: '20260814_114151'
  },
];
