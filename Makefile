build: clean
	docker-compose build

login:
	docker run -v `pwd`:/home/user/work/src/github.com/jiro4989/tkfm -it tkfm_linux bash

stop:
	docker-compose stop

clean: stop
	docker-compose rm -f
	docker volume prune -f
