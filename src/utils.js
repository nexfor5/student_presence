const readLine = require('readline');
const Student = require('./models/student');
const Presence = require('./models/presence');

/**
 * Main
 */
class Utils {
  /**
   * Get diference
   * @param {String} startTime Time in format HH:MM
   * @param {String} endTime Time in format HH:MM
   * @return {Number}
   */
  static getTimeDiff(startTime, endTime) {
    const diff = new Date(`2019-01-01T${endTime}:00`) -
      new Date(`2019-01-01T${startTime}:00`);
    return (diff / 1000) / 60;
  }

  /**
   *
   * @param {String[]} lines
   * @return {*[]}
   */
  static parseEntities(lines) {
    return lines.map((line) => {
      const items = line.split(' ');
      return items[0] === 'Student' ? new Student(items) : new Presence(items);
    });
  }

  /**
   * Get the data from the stdIn and parse it
   * to an array.
   * @return {Promise<String[]>}
   */
  static readData() {
    return new Promise((resolve, reject) => {
      const stdin = process.openStdin();
      const rl = readLine.createInterface({
        input: stdin,
        crlfDelay: Infinity,
      });
      const lines = [];

      rl.on('line', (line) => {
        lines.push(line);
      });

      rl.on('error', (err) => {
        reject(err);
      });

      rl.on('close', () => {
        resolve(lines);
      });
    });
  }
}

module.exports = Utils;
