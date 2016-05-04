/* ================================================================
 * macaca-test-sample by xdf(xudafeng[at]126.com)
 *
 * first created at : Thu Mar 10 2016 14:21:49 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var _ = require('macaca-utils');

var browserName = process.env.browser || 'safari';
browserName = browserName.toLowerCase();

var iOSSafariOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  browserName: 'Safari'
};

var AndroidChromeOpts = {
  platformName: 'Android',
  browserName: 'Chrome'
};

var wd = require('webdriver-client')(_.merge({}, browserName === 'safari' ? iOSSafariOpts : AndroidChromeOpts));

describe('macaca mobile sample', function() {
  this.timeout(5 * 60 * 1000);

  var driver = wd.initPromiseChain();

  before(function() {
    return driver
      .initDriver();
  });

  after(function() {
    return driver
      .sleep(1000)
      .quit();
  });

  it('#0 should works with macaca', function() {
    return driver
      .get('http://www.baidu.com')
      .elementById('index-kw')
      .sendKeys('macaca')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('macaca');
      })
      .takeScreenshot();
  });

  it('#1 should works with web', function() {
    return driver
      .get('http://www.baidu.com')
      .elementById('index-kw')
      .sendKeys('TesterHome')
      .elementById('index-bn')
      .tap()
      .sleep(5000)
      .source()
      .then(function(html) {
        html.should.containEql('TesterHome');
      })
      .takeScreenshot();
  });

});
