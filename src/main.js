const Utils = require('./utils');
const Student = require('./models/student');

/**
 * Initial class to start the process.
 */
class Main {
    /**
     * Initial function to start the process.
     */
    static async init() {
        const entities = Utils.parseEntities(await Utils.readData());
        const students = [];
        const presences = [];

        for (const entity of entities) {
            if (entity instanceof Student) {
                students.push(entity);
            } else {
                if (entity.time >= 5) {
                    presences.push(entity);
                }
            }
        }

        for (const student of students) {
            student.setPresences(presences);
        }

        students.sort((a, b) => b.totalTime - a.totalTime);

        for (const student of students) {
            console.log(
                `${student.name}: ${student.totalTime} minutes` +
                (
                    student.totalTime > 0 ?
                        ` in ${student.totalDays} ` +
                        `day${student.totalDays > 1 ? 's' : ''}` :
                        ''
                ),
            );
        }
    }
}

module.exports = Main;
