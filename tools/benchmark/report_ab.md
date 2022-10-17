### Запускаемая команда

```shell
ab -n30000 -c200 http://localhost/api/v1
```

### Без балансировки

```
Server Software:        nginx/1.23.1
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1
Document Length:        727 bytes

Concurrency Level:      200
Time taken for tests:   2.161 seconds
Complete requests:      30000
Failed requests:        0
Total transferred:      31020000 bytes
HTML transferred:       21810000 bytes
Requests per second:    13880.43 [#/sec] (mean)
Time per request:       14.409 [ms] (mean)
Time per request:       0.072 [ms] (mean, across all concurrent requests)
Transfer rate:          14015.98 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3   1.9      3       8
Processing:     3   11  16.5      9     213
Waiting:        1   10  16.6      8     212
Total:          6   14  16.3     12     215

Percentage of the requests served within a certain time (ms)
  50%     12
  66%     13
  75%     13
  80%     14
  90%     14
  95%     15
  98%     16
  99%     80
 100%    215 (longest request)
```

### С использованием балансировки

```
Server Software:        nginx/1.23.1
Server Hostname:        localhost
Server Port:            80

Document Path:          /api/v1
Document Length:        727 bytes

Concurrency Level:      200
Time taken for tests:   1.855 seconds
Complete requests:      30000
Failed requests:        0
Total transferred:      31020000 bytes
HTML transferred:       21810000 bytes
Requests per second:    16174.61 [#/sec] (mean)
Time per request:       12.365 [ms] (mean)
Time per request:       0.062 [ms] (mean, across all concurrent requests)
Transfer rate:          16332.56 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    3   2.0      4       9
Processing:     0    9   2.2      9      18
Waiting:        0    8   2.8      7      16
Total:          0   12   1.3     12      20

Percentage of the requests served within a certain time (ms)
  50%     12
  66%     12
  75%     13
  80%     13
  90%     14
  95%     15
  98%     16
  99%     17
 100%     20 (longest request)
```