Package.describe({
  name: 'daveff:clickatell',
  version: '0.0.1',
  summary: 'Provide an API SMS.send similar to Email.send, using the Clickatell legacy API',
  git: 'https://github.com/futurefirst/clickatell-meteor.git',
  documentation: 'README.md',
});

Package.onUse((api) => {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.mainModule('clickatell.js');
  api.export('SMS', 'server');
});

Package.onTest((api) => {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('daveff:clickatell');
  api.mainModule('clickatell-tests.js');
});

Npm.depends({
  'clickatell-node': '0.0.4',
});
