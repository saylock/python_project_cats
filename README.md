## TODO:
- [ ] finish readme

### start
`docker-compose up --build`

### stop/reboot
`docker-compose down -v`

### test api
```
curl -X POST http://localhost:5000/api/memes \
>>   -H "Content-Type: application/json" \
>>   -d '{"image_url":"https://example.com/cat.jpg","text":"Funny cat"}'
```
