const Utils = require('./utils');

/**
 * Main
 */
class Main {
  /**
   * asds
   */
  static async init() {
    const data = await Utils.readData();
    console.log(data);
  }
}

module.exports = Main;
