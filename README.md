isodate
=======

ISO 8601 date methods

Prototype methods:

* parse(str): creates instance date using iso format string
* toIsoString(): converts instance date to iso format string
* toString(): core date prototype toString method (inheritance issues)
* getWeek(): returns instance date week number
* isToday(): returns true if instance date is today
* isTomorrow(): returns true if instance date is tomorrow
* sameDate(date): returns true if instance date is the same day (y,m,d)
* sameTime(date): returns true if instance date is the same day (hour, min, ms)

Static methods:

* parse(str): creates new iso date instance using iso format string 
* toIsoString(date): converts date to iso format string (2008-07-09T16:13:30+12:00)
* toLocalIsoString(date): converts date to local iso format string (2008-07-09T16:13:30Z)