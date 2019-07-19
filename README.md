# Clickatell for Meteor

Provides an API `SMS.send` similar to `Email.send`, using the [Clickatell](https://www.clickatell.com/) legacy API.

## Installation

You will need a legacy "Developer Central" account with Clickatell. A HTTP API connection, and any sender IDs you want to use, must already be set up in your account.

```sh
$ meteor add daveff:clickatell
```

And add a section to your `settings.json` like:

```json
"clickatell": {
  "username": "YOUR_CLICKATELL_USERNAME_HERE",
  "password": "YOUR_CLICKATELL_PASSWORD_HERE",
  "api_id": "YOUR_CLICKATELL_HTTP_API_ID_HERE"
}
```

If you do not set up credentials in `settings.json`, messages (with options) will be output to the console for testing purposes instead of actually being sent to Clickatell.

## Usage

The global object `SMS` is provided, with functions `send` and `balance`. No receive or callback functionality is provided as standard.

### SMS.send

Nothing is returned on success. If no credentials are configured, the message will be output to the console. If Clickatell returns an error, it is output to the console, and a `Meteor.Error` is thrown with the code and error message.

```javascript
SMS.send({
  // to, cc and bcc act exactly the same here.
  // Each may be an array of phone numbers, a single phone number as a string,
  // or omitted. Phone numbers should be specified with the international
  // dialling code but without the +, as Clickatell's API docs prefer.
  to: ['447712345678', '447787654321'],
  cc: '447700111222',
  bcc: '447700333444',
  // Optional, if you have a sender ID set up and want to use it
  from: '447700555666',
  // Optional, if you want to specify a unique client message ID for callbacks
  messageId: 'my-msg-id-001',
  // Optional, any more settings to pass through to Clickatell (see API docs)
  headers: {},
  // Your text message (max 3 concatenated SMS by default)
  text: "Hello, this is a test message",
});
```

### SMS.balance

Returns the account balance as a number of credits. If no credentials are configured, `0` will be returned. A `Meteor.Error` may be thrown if there is a problem communicating with Clickatell.

```javascript
const bal = SMS.balance();
```
