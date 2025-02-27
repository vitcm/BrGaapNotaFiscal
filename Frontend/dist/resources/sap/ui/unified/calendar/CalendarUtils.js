/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/date/UniversalDate","./CalendarDate","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/thirdparty/jquery"],function(e,t,a,n,jQuery){"use strict";var r={};r.MAX_MILLISECONDS=864e13;r.HOURS24=1e3*3600*24;r._createLocalDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate());if(r.getFullYear()<1e3){n.setFullYear(r.getFullYear())}if(a){n.setHours(r.getUTCHours());n.setMinutes(r.getUTCMinutes());n.setSeconds(r.getUTCSeconds());n.setMilliseconds(r.getUTCMilliseconds())}}return n};r._createUTCDate=function(t,a){var n;if(t){var r;if(t instanceof e){r=t.getJSDate()}else{r=t}n=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate()));if(r.getFullYear()<1e3){n.setUTCFullYear(r.getFullYear())}if(a){n.setUTCHours(r.getHours());n.setUTCMinutes(r.getMinutes());n.setUTCSeconds(r.getSeconds());n.setUTCMilliseconds(r.getMilliseconds())}}return n};r._createUniversalUTCDate=function(t,a,n){var r;if(a){r=e.getInstance(this._createUTCDate(t,n),a)}else{r=new e(this._createUTCDate(t,n).getTime())}return r};r.calculateWeekNumber=function(t,n,r,i){var s=0;var g=0;var u=i.getFirstDayOfWeek();var l=new a(r);if(l&&l.getLanguage()==="en"&&(l.getRegion()==="US"||!l.getRegion())){var o=new e(t.getTime());o.setUTCFullYear(n,0,1);g=o.getUTCDay();var C=new e(t.getTime());C.setUTCDate(C.getUTCDate()-C.getUTCDay()+g);s=Math.round((C.getTime()-o.getTime())/864e5/7)+1}else{var T=new e(t.getTime());T.setUTCDate(T.getUTCDate()-u);g=T.getUTCDay();T.setUTCDate(T.getUTCDate()-g+4);var c=new e(T.getTime());c.setUTCMonth(0,1);g=c.getUTCDay();var D=0;if(g>4){D=7}var U=new e(c.getTime());U.setUTCDate(1-g+4+D);s=Math.round((T.getTime()-U.getTime())/864e5/7)+1}return s};r.getFirstDateOfWeek=function(t){var a=new e(t.getTime()),r,i,s=n.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),g=s.getFirstDayOfWeek(),u;u=e.getWeekByDate(a.getCalendarType(),a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());r=e.getFirstDateOfWeek(a.getCalendarType(),u.year,u.week);i=new e(e.UTC(r.year,r.month,r.day));while(i.getUTCDay()!==g){i.setUTCDate(i.getUTCDate()-1)}return new e(e.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds())).getJSDate()};r.getFirstDateOfMonth=function(t){var a=new e(t.getTime());a.setUTCDate(1);return a};r._getNumberOfWeeksForYear=function(e){var t=sap.ui.getCore().getConfiguration().getFormatLocale(),r=n.getInstance(new a(t)),i=new Date(Date.UTC(e,0,1)),s=i.getUTCDay(),g=52;if(r.getFirstDayOfWeek()===0){if(s===5||s===6){g=53}}else{if(s===3||s===4){g=53}}return g};r.monthsDiffer=function(e,t){return e.getMonth()!==t.getMonth()||e.getFullYear()!==t.getFullYear()};r.isDateLastInMonth=function(e){var t=new Date(e.getTime()+24*60*60*1e3);return t.getUTCDate()<e.getUTCDate()};r._updateUTCDate=function(e,t,a,n,r,i,s,g){if(t!=null){e.setUTCFullYear(t)}if(a!=null){e.setUTCMonth(a)}if(n!=null){e.setUTCDate(n)}if(r!=null){e.setUTCHours(r)}if(i!=null){e.setUTCMinutes(i)}if(s!=null){e.setUTCSeconds(s)}if(g!=null){e.setUTCMilliseconds(g)}};r._checkJSDateObject=function(e){if(!e||Object.prototype.toString.call(e)!=="[object Date]"||isNaN(e)){throw new Error("Date must be a JavaScript date object.")}};r._checkYearInValidRange=function(e){if(typeof e!=="number"||e<1||e>9999){throw new Error("Year must be in valid range (between year 0001 and year 9999).")}};r._isNextMonth=function(e,t){return e.getMonth()>t.getMonth()&&e.getFullYear()===t.getFullYear()||e.getFullYear()>t.getFullYear()};r._minutesBetween=function(e,t){var a=(t.getTime()-e.getTime())/1e3;a=a/60;return Math.abs(Math.round(a))};r._areCurrentMinutesLessThan=function(e){var t=(new Date).getMinutes();return e>=t};r._areCurrentMinutesMoreThan=function(e){var t=(new Date).getMinutes();return e<=t};r._monthsBetween=function(e,t,a){var n=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate())),r=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate())),i;n.setUTCFullYear(e.getUTCFullYear());r.setUTCFullYear(t.getUTCFullYear());i=r.getUTCFullYear()*12+r.getUTCMonth()-(n.getUTCFullYear()*12+n.getUTCMonth());if(!a){i=Math.abs(i)}return i};r._hoursBetween=function(e,t){var a=new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours()));var n=new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours()));a.setUTCFullYear(e.getUTCFullYear());n.setUTCFullYear(t.getUTCFullYear());return Math.abs((a.getTime()-n.getTime())/(1e3*60*60))};r._isMidnight=function(e){return e.getHours()===0&&e.getMinutes()===0&&e.getSeconds()===0&&e.getMilliseconds()===0};r._daysInMonth=function(e){this._checkCalendarDate(e);e=new t(e);e.setDate(1);e.setMonth(e.getMonth()+1);e.setDate(0);return e.getDate()};r._isLastDateInMonth=function(e){return e.getDate()===r._daysInMonth(e)};r._getFirstDateOfWeek=function(e){this._checkCalendarDate(e);var a=r.getFirstDateOfWeek(e.toUTCJSDate());a.setFullYear(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());return t.fromLocalJSDate(a,e.getCalendarType())};r._getFirstDateOfMonth=function(e){this._checkCalendarDate(e);var a=r.getFirstDateOfMonth(e.toUTCJSDate()).getJSDate();a.setFullYear(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate());return t.fromLocalJSDate(a,e.getCalendarType())};r._minDate=function(e){var a=new t(1,0,1,e);a.setYear(1);a.setMonth(0);a.setDate(1);return a};r._maxDate=function(e){var a=new t(9999,11,1,e);a.setYear(9999);a.setMonth(11);a.setDate(this._daysInMonth(a));return new t(a)};r._isBetween=function(e,t,a,n){this._checkCalendarDate(e);this._checkCalendarDate(t);this._checkCalendarDate(a);if(n){return e.isSameOrAfter(t)&&e.isSameOrBefore(a)}else{return e.isAfter(t)&&e.isBefore(a)}};r._daysBetween=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return Math.ceil((e.valueOf()-t.valueOf())/this.HOURS24)};r._isOutside=function(e,t,a){return!this._isBetween(e,t,a,true)};r._isSameMonthAndYear=function(e,t){this._checkCalendarDate(e);this._checkCalendarDate(t);return e.getEra()===t.getEra()&&e.getYear()===t.getYear()&&e.getMonth()===t.getMonth()};r._checkCalendarDate=function(e){if(!e||!(e instanceof t)){throw"Invalid calendar date: ["+e+"]. Expected: sap.ui.unified.calendar.CalendarDate"}};r._getWeek=function(t){this._checkCalendarDate(t);return e.getWeekByDate(t.getCalendarType(),t.getYear(),t.getMonth(),t.getDate())};r._isWeekend=function(e,t){var a=e.getDay();return a===t.getWeekendStart()||a===t.getWeekendEnd()};return r},true);
//# sourceMappingURL=CalendarUtils.js.map