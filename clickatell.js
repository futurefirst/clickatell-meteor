// Write your package code here!
import clickatell from 'clickatell-node';

let count = 0;

const config = Meteor.settings.clickatell || {
  username: null,
  password: null,
  api_id: null,
};
const clhttp = clickatell.http(config.username, config.password, config.api_id);
const clsend = Meteor.wrapAsync(clhttp.sendMessage, clhttp);
const clbal = Meteor.wrapAsync(clhttp.getBalance, clhttp);

const sendOrFake = (to, message, extra) => {
  if (config.api_id) {
    clsend(to, message, extra).forEach(result => {
      if (result.error) {
        console.error('Error sending SMS:', result);
        throw new Meteor.Error(result.code, result.error);
      }
    });
  } else {
    console.log(`====== BEGIN SMS #${count} ======`);
    console.log('(SMS not sent; to enable sending, configure the ' +
      '\'clickatell\' section in settings.json.)');
    console.log('To:', to);
    console.log('Extra:', extra, '\n');
    console.log(message);
    console.log(`====== END SMS #${count} ======`);
  }
};

SMS = {
  send: (options) => {
    let to = [];
    [options.to, options.cc, options.bcc].forEach(param => {
      if (Array.isArray(param)) {
        to = to.concat(param);
      } else if (param) {
        to.push(param);
      }
    });

    const extra = {
      callback: 0,
      concat: 3,
    };
    if (options.from) {
      extra.from = options.from;
      extra.mo = 1;
    }
    if (options.messageId) {
      extra.cliMsgId = options.messageId;
    }
    if (options.headers) {
      Object.assign(extra, options.headers);
    }

    sendOrFake(to, options.text, extra);
    count++;
  },

  balance: () => (config.api_id ? clbal().balance : 0),
};

// Variables exported by this module can be imported by other packages and
// applications. See clickatell-tests.js for an example of importing.
export const name = 'clickatell';
