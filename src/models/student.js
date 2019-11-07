/**
 * Represent one student
 */
class Student {
    /**
     * Initialize the Student object
     * @param {String[]} items Result of a string splitted
     */
    constructor(items) {
        this.name = items[1];
        this.presences = [];
        this.totalTime = 0;
        this.totalDays = 0;
    }

    /**
     * Set the presences of a student, calculate the total time
     * in minutes and days (No duplicates).
     * @param {Presence[]} presences List of presences
     */
    setPresences(presences) {
        this.presences = presences.filter(
            (presence) => presence.student === this.name,
        );
        this.totalTime = this.presences.reduce(
            (total, actual) => total + actual.time,
            0,
        );

        const days = this.presences.map((presence) => presence.day);
        this.totalDays = [...new Set(days)].length;
    }
}

module.exports = Student;
