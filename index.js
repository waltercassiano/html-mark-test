"use strict;"
var request = require('request');
var assert = require('chai').assert;
var cheerio = require('cheerio');
var argv = require('minimist')(process.argv.slice(2));
var $;
var _body;
var url;
var selector_wrapper = 'body';
var htmlentities = require('html-entities').AllHtmlEntities;
var username;
var password;
var requestObject = {}; 

if (!argv.url) {
  console.log('Plesase insert a URL');
  process.exit(0);
}

requestObject.url = argv.url;

if (argv.wrapper) {
  console.log('Wrapper Class HTML ' + argv.wrapper);
  selector_wrapper = argv.wrapper;
}

if (argv.username && argv.password) {
  username = argv.username;
  password = argv.password;
  requestObject.headers = {
    "Authorization" : "Basic " + new Buffer(username + ":" + password).toString("base64")
  }
}

var test = {
  init: function() {
    var scope = this;
    describe('For a page requested ' + requestObject.url, function(){
      this.timeout(15000);
      it('Should be a valid page', function(done){
        request(requestObject , function (error, response, body) {
          if (!error && response.statusCode == 200) {
            _body = body;
            done();
            //Call Test To the Page
            $ = cheerio.load(_body);
            scope.registerMark();
            scope.tradeMark();
          }
          assert.isDefined(response, 'Can not get URL');
        });
      });
    });
  },
  registerMark: function() {
    var html_code = '&reg;';
    var html_decoded = htmlentities.decode(html_code);
    var regexexp = new RegExp(html_decoded,'g');
    describe('For a Register Marks code ' + html_code + ' -> ' + html_decoded, function() {
      it('If the page have this ' + html_decoded, function(done) {
        assert.isNotNull($(selector_wrapper).text().match(regexexp), 'There are not ' + html_decoded + ' on this page');
        done();
      });
      it('Should it be inside sup tag', function(done) {
        if ($(selector_wrapper).text().match(regexexp)) {
          assert.strictEqual($(selector_wrapper + ' sup').text().match(regexexp).length, $(selector_wrapper).text().match(regexexp).length , 'There are' + html_decoded + 'without sup tag')
        }
        done();
      });
    });
  },
  tradeMark: function() {
    var html_code = '&trade;';
    var html_decoded = htmlentities.decode(html_code);
    var regexexp = new RegExp(html_decoded,'g');
    describe('For a TradeMarks code ' + html_code + ' -> ' + html_decoded, function() {
      it('If the page have this ' + html_decoded, function(done) {
        assert.isNotNull($(selector_wrapper).text().match(regexexp), 'There are not ' + html_decoded + ' on this page');
        done();
      });
      it('Should not be inside a sup tag', function(done) {
        assert.isNotOk($(selector_wrapper + 'sup').text().match(regexexp) ? $(selector_wrapper + 'sup').text().match(regexexp).length : $(selector_wrapper + 'sup').text().match(regexexp),'There are' + html_decoded + 'inside sup tag');
        done();
      });
    });
  }
}

test.init();
