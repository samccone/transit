Transit
==========
A realtime webserver feed api of bostons buses

## End points

* `/api/feed`
* `/api/route/:route_id`
* `/api/feed/near?latitude=<>&longitude=<>[&radius=<in meters>]`
* `/api/alerts`
* `/api/passages`
* `/api/passages/:route_id`

> All end points support an optional callback=<name> param for `JSONP`.

## Developing

* install docker
* install boot2docker

* `docker build --tag=transit --rm=true .`
* `boot2docker ssh -L 8888:localhost:8888`
* `docker run -it -p 8888:8888 transit`

## Get your developer key from

realtime.mbta.com/Portal/Account/Login
