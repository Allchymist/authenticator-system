const { writeFileSync, readdirSync, readFileSync } = require('fs');

/**
 * @typedef {Object} LogType
 * @prop {?number} position
 * @prop {string} author
 * @prop {?string} target
 * @prop {string} action
 * @prop {string} created_at
 */

module.exports = {
  /** @param {LogType} logs */
  SaveLog: (logs) => {
    try {
      const jsonData = JSON.stringify(logs);

      writeFileSync(`./logs/${uuId()}.log`, jsonData, { encoding: 'utf-8' });

      return console.log('Log saved successfully');
    } catch (err) {
      return console.error(err.message);
    }
  },
  /**
   * @returns {LogType[][]}
   */
  GetLogs: () => {
    const logsArray = [];
    const logs = [];
    let amount = 20;

    const logsFolder = readdirSync('./logs').filter((file) => file.endsWith('.log'))
    if (logsFolder.length < 1) throw new Error('Not found logs');
    
    logsFolder.forEach((logsFiles) => {
      const logsFile = readFileSync(`./logs/${logsFiles}`, { encoding: 'utf-8' });
      const logsJSON = JSON.parse(logsFile);

      logsArray.push(logsJSON);
    });

    for (let num = 0; num < logsArray.length; num += 20) {
      const current = logsArray.slice(num, amount);
      let position = num;
      amount += 20;
  
      const description = current.map((log) => {
        return {
          position: ++position,
          author: log.author,
          target: log.target,
          action: log.action,
          created_at: log.created_at,
        }
      });
  
      logs.push(description);
    };

    return logs;
  }
}

function uuId() {
  const PassCode = () => {
    let pass = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '1234567890';
    for (let i = 1; i < 6; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    return pass;
  };
  
  const MyPass = [];
  for (let i = 0; i < 4; i++) {
    MyPass.push(PassCode())
  }

  return MyPass.join('-');
}