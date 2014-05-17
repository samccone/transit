Transit
==========
A realtime webserver feed api of bostons buses

## End points

* `/api/feed`
* `/api/route/:route_id`
* `/api/feed/near?latitude=<>&longitude=<>[&radius=<in meters>]`
* `/api/alerts`

> All end points support an optional callback=<name> param for `JSONP`.

## Developing

* `$ npm install`
* `$ MBTA_KEY=XXXX npm start`


## Get your developer key from

realtime.mbta.com/Portal/Account/Login
