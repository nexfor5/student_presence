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
        expect(entities[1].name).toBe('David');
        expect(entities[2].name).toBe('Fran');
        expect(entities[3].student).toBe('Marco');
        expect(entities[3].day).toBe(1);
        expect(entities[3].time).toBe(75);
        expect(entities[3].room).toBe('R100');
        expect(entities[4].student).toBe('Marco');
        expect(entities[4].day).toBe(3);
        expect(entities[4].time).toBe(67);
        expect(entities[4].room).toBe('R205');
        expect(entities[5].student).toBe('David');
        expect(entities[5].day).toBe(5);
        expect(entities[5].time).toBe(104);
        expect(entities[5].room).toBe('F505');
    });
});

describe('Models', () => {
    test('Presence - check for diff calculator', () => {
        const presence = new Presence(
            'Presence Marco 1 09:02 10:17 R100'.split(' '),
        );

        expect(presence.getTimeDiff('09:00', '10:00')).toBe(60);
        expect(presence.getTimeDiff('09:02', '10:17')).toBe(75);
        expect(presence.getTimeDiff('10:58', '12:05')).toBe(67);
        expect(presence.getTimeDiff('14:02', '15:46')).toBe(104);
    });

    test('Student - check for presences items', () => {
        const student = new Student(['Student', 'David']);
        const presences = [
            {student: 'Marco', day: 5, time: 75, room: 'R100'},
            {student: 'David', day: 5, time: 104, room: 'F505'},
            {student: 'David', day: 5, time: 80, room: 'F505'},
        ];

        student.setPresences(presences);

        expect(student.totalDays).toBe(1);
        expect(student.totalTime).toBe(184);
    });
});
