/**
 * Represent the presence of one student
 * on certain time and day
 */
class Presence {
    /**
     * Initialize the Presence object
     * @param {String[]} items Result of a string splitted
     */
    constructor(items) {
        this.student = items[1];
        this.day = parseInt(items[2]);
        this.time = this.getTimeDiff(items[3], items[4]);
        this.room = items[5];
    }

    /**
     * Get diference between two times
     * @param {String} startTime Time in format HH:MM
     * @param {String} endTime Time in format HH:MM
     * @return {Number} Total time
     */
    getTimeDiff(startTime, endTime) {
        const diff = new Date(`2019-01-01T${endTime}:00`) -
            new Date(`2019-01-01T${startTime}:00`);
        return (diff / 1000) / 60;
    }
}

module.exports = Presence;
