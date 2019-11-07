const Utils = require('./src/utils');
const Student = require('./src/models/student');
const Presence = require('./src/models/presence');

describe('Utils', () => {
  const lines = [
    'Student Marco',
    'Student David',
    'Student Fran',
    'Presence Marco 1 09:02 10:17 R100',
    'Presence Marco 3 10:58 12:05 R205',
    'Presence David 5 14:02 15:46 F505',
  ];

  test('check for parsing entities', () => {
    const entities = Utils.parseEntities(lines);
    expect(entities.length).toBe(6);
    expect(entities[0] instanceof Student).toBeTruthy();
    expect(entities[1] instanceof Student).toBeTruthy();
    expect(entities[2] instanceof Student).toBeTruthy();
    expect(entities[3] instanceof Presence).toBeTruthy();
    expect(entities[4] instanceof Presence).toBeTruthy();
    expect(entities[5] instanceof Presence).toBeTruthy();

    expect(entities[0].name).toBe('Marco');
  });

  test('check for diff calculator', () => {
    expect(Utils.getTimeDiff('09:00', '10:00')).toBe(60);
    expect(Utils.getTimeDiff('09:02', '10:17')).toBe(75);
    expect(Utils.getTimeDiff('10:58', '12:05')).toBe(67);
    expect(Utils.getTimeDiff('14:02', '15:46')).toBe(104);
  });
});
