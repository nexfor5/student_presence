const readLine = require('readline');
const Student = require('./models/student');
const Presence = require('./models/presence');

/**
 * Statics functions that can be used anywhere.
 */
class Utils {
    /**
     * Parse entities from a list of string.
     * @param {String[]} lines List of lines to be parsed
     * @return {*[]} List of entities, can be Student or Presence
     */
    static parseEntities(lines) {
        return lines.map((line) => {
            const items = line.split(' ');
            return items[0] === 'Student' ?
                new Student(items) :
                new Presence(items);
        });
    }

    /**
     * Get the data from the stdIn and parse it
     * to an array.
     * @return {Promise<String[]>} List of string from the STDIN
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
