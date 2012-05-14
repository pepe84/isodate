/**
 * ISO 8601 date
 * @author https://github.com/pepe84
 * @see http://webcloud.se/log/JavaScript-and-ISO-8601/
 * @example "2008-07-09T16:13:30+12:00"
 */

/**
 * Constructor
 * @param date Date
 */
function IsoDate(date) {
  // Date composition
  this.date = date || new Date();
}

// Public methods

/**
 * Set date parsing ISO 8601 format
 * 
 * @param iso String
 */
IsoDate.prototype.parse = function iso_date_parse(iso) {
  this.date = IsoDate.parse(iso);
};

/**
 * Exports to ISO 8601 format
 * 
 * @return String
 */
IsoDate.prototype.toIsoString = function iso_date_to_iso_string() {
  return IsoDate.toIsoString(this.date);
};

/**
 * Exports to date format
 * 
 * @return String
 */
IsoDate.prototype.toString = function iso_date_to_string() {
  return this.date.toString();
}

/**
 * Get week number of the year
 * @see http://javascript.about.com/library/blweekyear.htm
 */
IsoDate.prototype.getWeek = function iso_date_get_week() {
  var d = new Date(this.date.getFullYear(), 0, 1);
  return Math.ceil((((this.date - d) / 86400000) + d.getDay()+1)/7);
}

/**
 * Today?
 * @return Boolean
 */
IsoDate.prototype.isToday = function iso_date_is_today() {
  return this.sameDate(new Date());
}

/**
 * Tomorrow?
 * @return Boolean
 */
IsoDate.prototype.isTomorrow = function iso_date_is_tomorrow() {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return this.sameDate(tomorrow);
}

/**
 * Same date (day, month, year)?
 * @return Boolean
 */
IsoDate.prototype.sameDate = function iso_date_same_date(date) {
  return this.date.getDate() === date.getDate() &&
    this.date.getMonth() === date.getMonth() && 
    this.date.getYear() === date.getYear();
}

/**
 * Same time (hour, minutes, milliseconds)?
 * @return Boolean
 */
IsoDate.prototype.sameTime = function iso_date_same_time(date) {
  return this.date.getHours() === date.getHours() &&
    this.date.getMinutes() === date.getMinutes() && 
    this.date.getMilliseconds() === date.getMilliseconds();
}

// Static methods

/**
 * Factory method
 * 
 * @param iso String
 * @return Date
 */
IsoDate.parse = function iso_date_parse(iso) {
  
  if (!iso instanceof String) {
    return null;
  }
  
  var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
    "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
    "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
  var d = iso.match(new RegExp(regexp));
  
  var offset = 0;
  var date = new Date(d[1], 0, 1);
  
  if (d[3]) { 
    date.setMonth(d[3] - 1); 
  }
  if (d[5]) { 
    date.setDate(d[5]); 
  }
  if (d[7]) { 
    date.setHours(d[7]); 
  }
  if (d[8]) { 
    date.setMinutes(d[8]); 
  }
  if (d[10]) { 
    date.setSeconds(d[10]); 
  }
  if (d[12]) { 
    date.setMilliseconds(Number("0." + d[12]) * 1000); 
  }
  if (d[14]) {
    offset = (Number(d[16]) * 60) + Number(d[17]);
    offset *= ((d[15] == '-') ? 1 : -1);
  }
  
  offset -= date.getTimezoneOffset();
  var time = (Number(date) + (offset * 60 * 1000));
  date.setTime(Number(time));
  
  return new IsoDate(date);
};

/**
 * Exports to ISO 8601 format
 * 
 * @param date Date
 * @return String
 */
IsoDate.toIsoString = function iso_date_to_iso_string(date) {
  
  if (!date instanceof Date) {
    return null;
  }
  
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  function offset(n) {
    return n < 0 ? '-' + pad(n * -1) : '+' + pad(n);
  }
  
  return date.getUTCFullYear() + '-'
    + pad(date.getUTCMonth()+1) + '-'
    + pad(date.getUTCDate()) + 'T'
    + pad(date.getUTCHours()) + ':'
    + pad(date.getUTCMinutes()) + ':'
    + pad(date.getUTCSeconds())
    + offset(date.getTimezoneOffset()/60) + ':00';
};

/**
 * Exports to ISO 8601 format without time zone
 * 
 * @param date Date
 * @return String
 */
IsoDate.toLocalIsoString = function iso_date_to_local_iso_string(date) {
  
  if (!date instanceof Date) {
    return null;
  }
  
  function pad(n) {
    return n < 10 ? '0' + n : n
  }
  function offset(n) {
    return n < 0 ? '-' + pad(n * -1) : '+' + pad(n);
  }
  
  return date.getFullYear() + '-'
    + pad(date.getMonth()+1) + '-'
    + pad(date.getDate()) + 'T'
    + pad(date.getHours()) + ':'
    + pad(date.getMinutes()) + ':'
    + pad(date.getSeconds()) + 'Z';
};
