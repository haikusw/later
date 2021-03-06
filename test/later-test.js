var recur = require('../lib/recur').recur;
var cron = require('../lib/cron.parser').cronParser;
var text = require('../lib/en.parser').enParser;
var later = require('../lib/later').later;
var should = require('should');

describe('Later', function() {

	describe('getNext', function() {
		
		describe('seconds', function() {

			it('should return null if no valid second is found', function() {
				this.timeout(1);
				var r = recur().on(67).second().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});

			it('should skip forward to the next valid second within the same minute', function() {
				this.timeout(1);
				var r = recur().on(45).second();
				var start = new Date('2012-02-28T23:59:00Z');
				var expected = new Date('2012-02-28T23:59:45Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last second within the same minute', function() {
				this.timeout(1);
				var r = recur().last().second();
				var start = new Date('2012-02-28T23:07:00Z');
				var expected = new Date('2012-02-28T23:07:59Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first second within the next minute', function() {
				this.timeout(1);
				var r = recur().first().second();
				var start = new Date('2012-02-28T23:07:01Z');
				var expected = new Date('2012-02-28T23:08:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
			
			it('should skip forward to the next valid second within the next minute', function() {
				this.timeout(1);
				var r = recur().on(12).second();
				var start = new Date('2012-02-28T22:00:15');
				var expected = new Date('2012-02-28T22:01:12');

				var l = later(1, true).getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid second within the next hour', function() {
				this.timeout(1);
				var r = recur().on(7).second();
				var start = new Date('2012-02-28T22:59:15Z');
				var expected = new Date('2012-02-28T23:00:07Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid second within the next day', function() {
				this.timeout(1);
				var r = recur().on(7).second();
				var start = new Date('2012-02-28T23:59:15Z');
				var expected = new Date('2012-02-29T00:00:07Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid second within the next month', function() {
				this.timeout(1);
				var r = recur().on(5).second();
				var start = new Date('2012-01-31T23:59:15Z');
				var expected = new Date('2012-02-01T00:00:05Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid second within the next year', function() {
				this.timeout(1);
				var r = recur().on(5).second();
				var start = new Date('2012-12-31T23:59:15');
				var expected = new Date('2013-01-01T00:00:05');

				var l = later(1, true).getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid second within the next day on a leap year', function() {
				this.timeout(1);
				var r = recur().on(5).second();
				var start = new Date('2012-02-28T23:59:15Z');
				var expected = new Date('2012-02-29T00:00:05Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('minutes', function() {

			it('should return null if no valid minute is found', function() {
				this.timeout(1);
				var r = recur().on(67).minute().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid minute within the same hour', function() {
				this.timeout(1);
				var r = recur().on(12).minute();
				var start = new Date('2012-02-28T22:07:15Z');
				var expected = new Date('2012-02-28T22:12:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last minute within the same hour', function() {
				this.timeout(1);
				var r = recur().last().minute();
				var start = new Date('2012-02-28T23:07:00Z');
				var expected = new Date('2012-02-28T23:59:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first minute within the next hour', function() {
				this.timeout(1);
				var r = recur().first().minute();
				var start = new Date('2012-02-28T22:07:01Z');
				var expected = new Date('2012-02-28T23:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
						
			it('should skip forward to the next valid minute within the next hour', function() {
				this.timeout(1);
				var r = recur().on(7).minute();
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-02-28T23:07:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid minute within the next day', function() {
				this.timeout(1);
				var r = recur().on(7).minute();
				var start = new Date('2012-02-28T23:28:15Z');
				var expected = new Date('2012-02-29T00:07:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid minute within the next month', function() {
				this.timeout(1);
				var r = recur().on(34).minute();
				var start = new Date('2012-01-31T23:42:15Z');
				var expected = new Date('2012-02-01T00:34:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid minute within the next year', function() {
				this.timeout(1);
				var r = recur().on(52).minute();
				var start = new Date('2012-12-31T23:59:15Z');
				var expected = new Date('2013-01-01T00:52:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid minute within the next day on a leap year', function() {
				this.timeout(1);
				var r = recur().on(5).minute();
				var start = new Date('2012-02-28T23:59:15Z');
				var expected = new Date('2012-02-29T00:05:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('hours', function() {

			it('should return null if no valid hour is found', function() {
				this.timeout(1);
				var r = recur().on(3).hour().on(3).month();
				var start = new Date('2012-02-01T00:00:05Z');
				var end = new Date('2012-02-29T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start, end);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid hour within the same day', function() {
				this.timeout(1);
				var r = recur().on(14).hour();
				var start = new Date('2012-02-28T12:07:15Z');
				var expected = new Date('2012-02-28T14:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last hour within the same day', function() {
				this.timeout(1);
				var r = recur().last().hour();
				var start = new Date('2012-02-28T21:07:00Z');
				var expected = new Date('2012-02-28T23:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first hour within the next day', function() {
				this.timeout(1);
				var r = recur().first().hour();
				var start = new Date('2012-02-28T22:07:01Z');
				var expected = new Date('2012-02-29T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
						
			it('should skip forward to the next valid hour within the next day', function() {
				this.timeout(1);
				var r = recur().on(7).hour();
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-02-29T07:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid hour within the next month', function() {
				this.timeout(1);
				var r = recur().on(7).hour();
				var start = new Date('2012-05-31T17:28:15Z');
				var expected = new Date('2012-06-01T07:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid hour within the next year', function() {
				this.timeout(1);
				var r = recur().on(6).hour();
				var start = new Date('2012-012-31T23:42:15');
				var expected = new Date('2013-01-01T06:00:00');

				var l = later(1,true).getNext(r, start);
				l.should.eql(expected);
			});	
						
			it('should skip forward to the next valid hour within the next day on a leap year', function() {
				this.timeout(1);
				var r = recur().on(22).hour();
				var start = new Date('2012-02-28T23:59:15Z');
				var expected = new Date('2012-02-29T22:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('times', function() {

			it('should return null if no valid time is found', function() {
				this.timeout(1);
				var r = recur().at('08:00:00').on(1).month().on(2012).year();
				var start = new Date('2012-02-29T12:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid time within the same day', function() {
				this.timeout(1);
				var r = recur().at('15:06:30');
				var start = new Date('2012-02-28T12:07:15Z');
				var expected = new Date('2012-02-28T15:06:30Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
						
			it('should skip forward to the next valid time within the next day', function() {
				this.timeout(1);
				var r = recur().at('00:06:11');
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-02-29T00:06:11Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid time within the next month', function() {
				this.timeout(1);
				var r = recur().at('12:12:12')
				var start = new Date('2012-05-31T17:28:15Z');
				var expected = new Date('2012-06-01T12:12:12Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid time within the next year', function() {
				this.timeout(1);
				var r = recur().at('09:14:21')
				var start = new Date('2012-012-31T23:42:15');
				var expected = new Date('2013-01-01T09:14:21');

				var l = later(1, true).getNext(r, start);
				l.should.eql(expected);
			});	
						
			it('should skip forward to the next valid time within the next day on a leap year', function() {
				this.timeout(1);
				var r = recur().at('22:15:00');
				var start = new Date('2012-02-28T23:59:15Z');
				var expected = new Date('2012-02-29T22:15:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('days of week', function() {

			it('should return null if no valid week day is found', function() {
				this.timeout(1);
				var r = recur().on(6).dayOfWeek().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid week day within the same week', function() {
				this.timeout(1);
				var r = recur().on(4).dayOfWeek();
				var start = new Date('2012-02-13T12:07:15Z');
				var expected = new Date('2012-02-15T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last week day within the same week', function() {
				this.timeout(1);
				var r = recur().last().dayOfWeek();
				var start = new Date('2012-02-13T21:07:00Z');
				var expected = new Date('2012-02-18T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first week day within the next week', function() {
				this.timeout(1);
				var r = recur().first().dayOfWeek();
				var start = new Date('2012-02-14T22:07:01Z');
				var expected = new Date('2012-02-19T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
						
			it('should skip forward to the next valid week day within the next month', function() {
				this.timeout(1);
				var r = recur().on(6).dayOfWeek();
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-03-02T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid week day within the next year', function() {
				this.timeout(1);
				var r = recur().on(4).dayOfWeek();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-02T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('day instance count', function() {

			it('should return null if no valid day instance is found', function() {
				this.timeout(1);
				var r = recur().on(1).dayOfWeekCount().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid day instance within the same month', function() {
				this.timeout(1);
				var r = recur().on(3).dayOfWeekCount();
				var start = new Date('2012-02-13T12:07:15Z');
				var expected = new Date('2012-02-15T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last day instance within the same month', function() {
				this.timeout(1);
				var r = recur().last().dayOfWeekCount();
				var start = new Date('2012-02-13T21:07:00Z');
				var expected = new Date('2012-02-23T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first day instance within the next month', function() {
				this.timeout(1);
				var r = recur().first().dayOfWeekCount();
				var start = new Date('2012-02-14T22:07:01Z');
				var expected = new Date('2012-03-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
			
			it('should skip forward to the next valid week day within the next year', function() {
				this.timeout(1);
				var r = recur().on(4).dayOfWeekCount();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-22T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
				
		});

		describe('days of month', function() {

			it('should return null if no valid day is found', function() {
				this.timeout(1);
				var r = recur().on(67).dayOfMonth().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid day within the same month', function() {
				this.timeout(1);
				var r = recur().on(14).dayOfMonth();
				var start = new Date('2012-02-02T12:07:15Z');
				var expected = new Date('2012-02-14T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last day within the same month', function() {
				this.timeout(1);
				var r = recur().last().dayOfMonth();
				var start = new Date('2012-02-07T21:07:00Z');
				var expected = new Date('2012-02-29T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first day within the next month', function() {
				this.timeout(1);
				var r = recur().first().dayOfMonth();
				var start = new Date('2012-02-07T22:07:01Z');
				var expected = new Date('2012-03-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
						
			it('should skip forward to the next valid day within the next month', function() {
				this.timeout(1);
				var r = recur().on(25).dayOfMonth();
				var start = new Date('2012-02-28T22:34:15Z');
				var expected = new Date('2012-03-25T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid day within the next year', function() {
				this.timeout(1);
				var r = recur().on(6).dayOfMonth();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-06T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});

		describe('weeks of month', function() {

			it('should return null if no valid week is found', function() {
				this.timeout(1);
				var r = recur().on(67).weekOfMonth().on(1).month().on(2012).year();
				var start = new Date('2012-02-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
		
			it('should skip forward to the next valid week within the same month', function() {
				this.timeout(1);
				var r = recur().on(2).weekOfMonth();
				var start = new Date('2012-02-02T02:02:00Z');
				var expected = new Date('2012-02-05T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last week within the same month', function() {
				this.timeout(1);
				var r = recur().last().weekOfMonth();
				var start = new Date('2012-02-04T02:02:00Z');
				var expected = new Date('2012-02-26T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first week within the next month', function() {
				this.timeout(1);
				var r = recur().first().weekOfMonth();
				var start = new Date('2012-02-07T22:07:01Z');
				var expected = new Date('2012-03-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});
						
			it('should skip forward to the next valid week within the next month', function() {
				this.timeout(1);
				var r = recur().on(2).weekOfMonth();
				var start = new Date('2012-01-28T11:34:15Z');
				var expected = new Date('2012-02-05T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid week within the next year', function() {
				this.timeout(1);
				var r = recur().on(2).weekOfMonth();
				var start = new Date('2011-12-29T12:14:15Z');
				var expected = new Date('2012-01-08T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});

		describe('months', function() {

			it('should return null if no valid month is found', function() {
				this.timeout(1);
				var r = recur().on(1).month().on(2012).year();
				var start = new Date('2012-04-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid month within the same year', function() {
				this.timeout(1);
				var r = recur().on(11).month();
				var start = new Date('2012-02-02T12:07:15Z');
				var expected = new Date('2012-11-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last month within the same year', function() {
				this.timeout(1);
				var r = recur().last().month();
				var start = new Date('2012-02-07T21:07:00Z');
				var expected = new Date('2012-12-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first month within the next year', function() {
				this.timeout(1);
				var r = recur().first().month();
				var start = new Date('2012-02-07T22:07:01Z');
				var expected = new Date('2013-01-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid month within the next year', function() {
				this.timeout(1);
				var r = recur().on(7).month();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-07-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});

		describe('days of year', function() {

			it('should return null if no valid day is found', function() {
				this.timeout(1);
				var r = recur().on(25).dayOfYear().on(2012).year();
				var start = new Date('2012-04-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid day within the same year', function() {
				this.timeout(1);
				var r = recur().on(65).dayOfYear();
				var start = new Date('2012-02-02T12:07:15Z');
				var expected = new Date('2012-03-05T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last day within the same year', function() {
				this.timeout(1);
				var r = recur().last().dayOfYear();
				var start = new Date('2012-02-07T21:07:00Z');
				var expected = new Date('2012-12-31T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first day within the next year', function() {
				this.timeout(1);
				var r = recur().first().dayOfYear();
				var start = new Date('2012-02-07T22:07:01Z');
				var expected = new Date('2013-01-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward to the next valid day within the next year', function() {
				this.timeout(1);
				var r = recur().on(12).dayOfYear();
				var start = new Date('2012-012-31T23:42:15Z');
				var expected = new Date('2013-01-12T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});

		describe('weeks of year', function() {

			it('should return null if no valid week is found', function() {
				this.timeout(1);
				var r = recur().on(3).weekOfYear().on(2012).year();
				var start = new Date('2012-04-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid week within the same year', function() {
				this.timeout(1);
				var r = recur().on(3).weekOfYear();
				var start = new Date('2012-01-10T23:59:00Z');
				var expected = new Date('2012-01-16T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward to the last week within the same year', function() {
				this.timeout(1);
				var r = recur().last().weekOfYear();
				var start = new Date('2012-04-06T00:05:05Z');
				var expected = new Date('2012-12-24T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});

			it('should skip forward to the first week within the next month', function() {
				this.timeout(1);
				var r = recur().on(6).weekOfYear();
				var start = new Date('2012-01-10T23:59:00Z');
				var expected = new Date('2012-02-06T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
			
			it('should skip forward over a 52 week year to next year', function() {
				this.timeout(1);
				var r = recur().on(4).weekOfYear();
				var start = new Date('2007-02-07T23:59:00Z');
				var expected = new Date('2008-01-21T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	

			it('should skip forward over a 53 week year to next year', function() {
				this.timeout(1);
				var r = recur().on(4).weekOfYear();
				var start = new Date('2005-02-07T23:59:00Z');
				var expected = new Date('2006-01-23T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});

		describe('years', function() {

			it('should return null if no valid year is found', function() {
				this.timeout(1);
				var r = recur().on(67).on(1).month().on(2012).year();
				var start = new Date('2012-04-28T00:00:05Z');
				var expected = null;

				var l = later().getNext(r, start);
				should.not.exist(l);
			});
						
			it('should skip forward to the next valid year', function() {
				this.timeout(1);
				var r = recur().on(2017).year();
				var start = new Date('2012-02-02T12:07:15Z');
				var expected = new Date('2017-01-01T00:00:00Z');

				var l = later().getNext(r, start);
				l.should.eql(expected);
			});	
										
		});
	});

	describe('isValid', function() {
		
		it('should return true if seconds is valid', function() {
			this.timeout(1);
			var r = recur().on(5).second();
			var start = new Date('2012-02-28T00:00:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if minutes is valid', function() {
			this.timeout(1);
			var r = recur().on(5).minute();
			var start = new Date('2012-02-28T00:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if hours is valid', function() {
			this.timeout(1);
			var r = recur().on(5).hour();
			var start = new Date('2012-02-28T05:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if time is valid', function() {
			this.timeout(1);
			var r = recur().at('05:05:05');
			var start = new Date('2012-02-28T05:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if week day is valid', function() {
			this.timeout(1);
			var r = recur().on(2).dayOfWeek();
			var start = new Date('2012-02-13T05:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if week day instance is valid', function() {
			this.timeout(2);
			var r = recur().on(2).dayOfWeekCount();
			var start = new Date('2012-02-13T05:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if day of month is valid', function() {
			this.timeout(1);
			var r = recur().on(5).dayOfMonth();
			var start = new Date('2012-02-05T00:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if week of month is valid', function() {
			this.timeout(1);
			var r = recur().on(2).weekOfMonth();
			var start = new Date('2012-01-11T05:05:00Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});
				
		it('should return true if month is valid', function() {
			this.timeout(1);
			var r = recur().on(5).month();
			var start = new Date('2012-05-05T00:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		it('should return true if day of year is valid', function() {
			this.timeout(1);
			var r = recur().on(5).dayOfYear();
			var start = new Date('2012-01-05T00:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});

		describe('should return true if week of year is valid', function() {
			
			it('test 1', function() {
				this.timeout(1);
				var r = recur().on(53).weekOfYear();
				var start = new Date('2005-01-01T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 2', function() {
				this.timeout(1);
				var r = recur().on(53).weekOfYear();
				var start = new Date('2005-01-02T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 3', function() {
				this.timeout(1);
				var r = recur().on(52).weekOfYear();
				var start = new Date('2005-12-31T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 4', function() {
				this.timeout(1);
				var r = recur().on(1).weekOfYear();
				var start = new Date('2007-01-01T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 5', function() {
				this.timeout(1);
				var r = recur().on(52).weekOfYear();
				var start = new Date('2007-12-30T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 6', function() {
				this.timeout(1);
				var r = recur().on(1).weekOfYear();
				var start = new Date('2007-12-31T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 7', function() {
				this.timeout(1);
				var r = recur().on(1).weekOfYear();
				var start = new Date('2008-01-01T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 8', function() {
				this.timeout(1);
				var r = recur().on(52).weekOfYear();
				var start = new Date('2008-12-28T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 9', function() {
				this.timeout(1);
				var r = recur().on(1).weekOfYear();
				var start = new Date('2008-12-29T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 10', function() {
				this.timeout(1);
				var r = recur().on(53).weekOfYear();
				var start = new Date('2009-12-31T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});

			it('test 11', function() {
				this.timeout(1);
				var r = recur().on(53).weekOfYear();
				var start = new Date('2010-01-03T00:00:00Z');

				var l = later().isValid(r, start);
				l.should.be.true;
			});
		});

		it('should return true if year is valid', function() {
			this.timeout(1);
			var r = recur().on(2012).year();
			var start = new Date('2012-06-05T00:05:05Z');

			var l = later().isValid(r, start);
			l.should.be.true;
		});
	
	});


	describe('local time', function() {
		
		it('should match the hour in local time', function() {
			this.timeout(1);
			var r = recur().on(6).hour();
			var start = new Date('2012-06-05');
			var expected = new Date('2012-06-05T06:00:00');

			var l = later(1, true).getNext(r, start);
			l.should.eql(expected);
		})

	})



	describe('get', function() {
	
		describe('interesting schedules using cron', function() {

			it('should find the next 5 every last day of month at 10am and 10pm', function() {
				this.timeout(1);
				var r = cron().parse('0 10,22 L * ? *');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-31T10:00:00Z'),
					new Date('2012-01-31T22:00:00Z'),
					new Date('2012-02-29T10:00:00Z'),
					new Date('2012-02-29T22:00:00Z'),
					new Date('2012-03-31T10:00:00Z')
				]
				
				var l = later().get(r, 5, start);
				l.should.eql(expected);	
			});

			it('should find the next 5 Friday the 13ths', function() {
				this.timeout(1);
				var r = cron().parse('0 0 13 * 5');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-13T00:00:00Z'),
					new Date('2012-04-13T00:00:00Z'),
					new Date('2012-07-13T00:00:00Z'),
					new Date('2013-09-13T00:00:00Z'),
					new Date('2013-12-13T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});			

			it('should find the next 5 patch tuesdays (2nd tuesday of the month)', function() {
				this.timeout(1);
				var r = cron().parse('0 0 ? * 2#2');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-10T00:00:00Z'),
					new Date('2012-02-14T00:00:00Z'),
					new Date('2012-03-13T00:00:00Z'),
					new Date('2012-04-10T00:00:00Z'),
					new Date('2012-05-08T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the next 5 dates closest to the 15 that falls on a weekday', function() {
				this.timeout(1);
				var r = cron().parse('0 5 15W * ?');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-16T05:00:00Z'),
					new Date('2012-02-15T05:00:00Z'),
					new Date('2012-03-15T05:00:00Z'),
					new Date('2012-04-16T05:00:00Z'),
					new Date('2012-05-15T05:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the last second of every month', function() {
				this.timeout(1);
				var r = cron().parse('L L L L * ?', true);
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-31T23:59:59Z'),
					new Date('2012-02-29T23:59:59Z'),
					new Date('2012-03-31T23:59:59Z'),
					new Date('2012-04-30T23:59:59Z'),
					new Date('2012-05-31T23:59:59Z'),
					new Date('2012-06-30T23:59:59Z'),
					new Date('2012-07-31T23:59:59Z'),
					new Date('2012-08-31T23:59:59Z'),
					new Date('2012-09-30T23:59:59Z'),
					new Date('2012-10-31T23:59:59Z'),
					new Date('2012-11-30T23:59:59Z'),
					new Date('2012-12-31T23:59:59Z')
				];

				var l = later().get(r, 12, start);
				l.should.eql(expected);			
			});
		});
	
		describe('interesting schedules using text', function() {

			it('should find the next 5 every last day of month at 10am and 10pm', function() {
				this.timeout(1);
				var r = text().parse('on the last day of the month at 10:00 am,10:00 pm')
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-31T10:00:00Z'),
					new Date('2012-01-31T22:00:00Z'),
					new Date('2012-02-29T10:00:00Z'),
					new Date('2012-02-29T22:00:00Z'),
					new Date('2012-03-31T10:00:00Z')
				]
				
				var l = later().get(r, 5, start);
				l.should.eql(expected);	
			});

			it('should find the next 5 Friday the 13ths', function() {
				this.timeout(1);
				var r = text().parse('on the 13th day of the month on Fri at 00:00');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-13T00:00:00Z'),
					new Date('2012-04-13T00:00:00Z'),
					new Date('2012-07-13T00:00:00Z'),
					new Date('2013-09-13T00:00:00Z'),
					new Date('2013-12-13T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});			

			it('should find the next 5 patch tuesdays (2nd tuesday of the month)', function() {
				this.timeout(1);
				var r = text().parse('on the 2nd day instance on tues at 00:00')
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-10T00:00:00Z'),
					new Date('2012-02-14T00:00:00Z'),
					new Date('2012-03-13T00:00:00Z'),
					new Date('2012-04-10T00:00:00Z'),
					new Date('2012-05-08T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the next 5 dates closest to the 15 that falls on a weekday', function() {
				this.timeout(1);
				var str = 'every weekday on the 14-16th day of the month at 5:00 am ';
				str += 'except on the 14th day of the month on mon-thu ';
				str += 'also on the 16th day of the month on tue-fri';

				var r = text().parse(str);
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-16T05:00:00Z'),
					new Date('2012-02-15T05:00:00Z'),
					new Date('2012-03-15T05:00:00Z'),
					new Date('2012-04-16T05:00:00Z'),
					new Date('2012-05-15T05:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the last second of every month', function() {
				this.timeout(1);
				var r = text().parse('on the last second on the last minute on the last hour on the last day of the month');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-31T23:59:59Z'),
					new Date('2012-02-29T23:59:59Z'),
					new Date('2012-03-31T23:59:59Z'),
					new Date('2012-04-30T23:59:59Z'),
					new Date('2012-05-31T23:59:59Z'),
					new Date('2012-06-30T23:59:59Z'),
					new Date('2012-07-31T23:59:59Z'),
					new Date('2012-08-31T23:59:59Z'),
					new Date('2012-09-30T23:59:59Z'),
					new Date('2012-10-31T23:59:59Z'),
					new Date('2012-11-30T23:59:59Z'),
					new Date('2012-12-31T23:59:59Z')
				];

				var l = later().get(r, 12, start);
				l.should.eql(expected);			
			});
		});	
			
		describe('interesting schedules using recur', function() {
			
			it('should find the next 5 Friday the 13ths', function() {
				this.timeout(1);
				var r = recur().on(6).dayOfWeek().on(13).dayOfMonth().at('00:00:00');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-13T00:00:00Z'),
					new Date('2012-04-13T00:00:00Z'),
					new Date('2012-07-13T00:00:00Z'),
					new Date('2013-09-13T00:00:00Z'),
					new Date('2013-12-13T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the next 5 patch tuesdays (2nd tuesday of the month)', function() {
				this.timeout(1);
				var r = recur().on(3).dayOfWeek().on(2).dayOfWeekCount().at('00:00:00');
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-10T00:00:00Z'),
					new Date('2012-02-14T00:00:00Z'),
					new Date('2012-03-13T00:00:00Z'),
					new Date('2012-04-10T00:00:00Z'),
					new Date('2012-05-08T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should find the next 5 dates closest to the 15 that falls on a weekday', function() {
				this.timeout(1);
				var r = recur().at('00:00:00').on(15).dayOfMonth().onWeekday();
					r.and().at('00:00:00').on(14).dayOfMonth().on(6).dayOfWeek();
					r.and().at('00:00:00').on(16).dayOfMonth().on(2).dayOfWeek();
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-16T00:00:00Z'),
					new Date('2012-02-15T00:00:00Z'),
					new Date('2012-03-15T00:00:00Z'),
					new Date('2012-04-16T00:00:00Z'),
					new Date('2012-05-15T00:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should recur everyday except on weekends', function() {
				this.timeout(1);
				var r = recur().at('08:00:00').except().on(1,7).dayOfWeek();
				var start = new Date('2012-01-05T00:00:00Z');
				var expected = [
					new Date('2012-01-05T08:00:00Z'),
					new Date('2012-01-06T08:00:00Z'),
					new Date('2012-01-09T08:00:00Z'),
					new Date('2012-01-10T08:00:00Z'),
					new Date('2012-01-11T08:00:00Z')
				];

				var l = later().get(r, 5, start);
				l.should.eql(expected);			
			});

			it('should recur Wednesday every 4 weeks at 8am starting on the 5th week', function() {
				this.timeout(1);
				var r = recur().every(4).weekOfYear().startingOn(5).on(4).dayOfWeek().at('08:00:00');
				var start = new Date('2012-01-01T23:59:15Z');
				var expected = [
					new Date('2012-02-01T08:00:00Z'),
		  			new Date('2012-02-29T08:00:00Z'),
		  		    new Date('2012-03-28T08:00:00Z'),
		  		    new Date('2012-04-25T08:00:00Z'),
		  		    new Date('2012-05-23T08:00:00Z'),
		  		    new Date('2012-06-20T08:00:00Z')
				];

				var l = later().get(r, 6, start);
				l.should.eql(expected);			
			});

			it('should find the first second of every month', function() {
				this.timeout(1);
				var r = recur().first().dayOfMonth().first().hour().first().minute().first().second();
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-01T00:00:00Z'),
					new Date('2012-02-01T00:00:00Z'),
					new Date('2012-03-01T00:00:00Z'),
					new Date('2012-04-01T00:00:00Z'),
					new Date('2012-05-01T00:00:00Z'),
					new Date('2012-06-01T00:00:00Z'),
					new Date('2012-07-01T00:00:00Z'),
					new Date('2012-08-01T00:00:00Z'),
					new Date('2012-09-01T00:00:00Z'),
					new Date('2012-10-01T00:00:00Z'),
					new Date('2012-11-01T00:00:00Z'),
					new Date('2012-12-01T00:00:00Z')
				];

				var l = later().get(r, 12, start);
				l.should.eql(expected);			
			});

			it('should find the last second of every month', function() {
				this.timeout(1);
				var r = recur().last().dayOfMonth().last().hour().last().minute().last().second();
				var start = new Date('2012-01-01T00:00:00Z');
				var expected = [
					new Date('2012-01-31T23:59:59Z'),
					new Date('2012-02-29T23:59:59Z'),
					new Date('2012-03-31T23:59:59Z'),
					new Date('2012-04-30T23:59:59Z'),
					new Date('2012-05-31T23:59:59Z'),
					new Date('2012-06-30T23:59:59Z'),
					new Date('2012-07-31T23:59:59Z'),
					new Date('2012-08-31T23:59:59Z'),
					new Date('2012-09-30T23:59:59Z'),
					new Date('2012-10-31T23:59:59Z'),
					new Date('2012-11-30T23:59:59Z'),
					new Date('2012-12-31T23:59:59Z')
				];

				var l = later().get(r, 12, start);
				l.should.eql(expected);			
			});

		});


	});
});