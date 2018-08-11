SRCS := $(shell find . -type f -name '*.go')

# バイナリ系のタスク

.PHONY: deploy
deploy: $(SRCS)
	docker run \
		-v `pwd`:/home/user/work/src/github.com/jiro4989/tkfm \
		-it tkfm_linux \
		/home/user/work/src/github.com/jiro4989/tkfm/script/build.sh

.PHONY: deploy
deploy-demos: $(SRCS)
	for d in `ls internal/demo/`; do \
		docker run \
			-v `pwd`:/home/user/work/src/github.com/jiro4989/tkfm \
			-it tkfm_linux \
			/home/user/work/src/github.com/jiro4989/tkfm/script/build.sh internal/demo/$$d ; \
	done

.PHONY: run
run:
	./deploy/linux/tkfm

.PHONY: clean
clean:
	-sudo rm -rf deploy/

# dockerコンテナ系のタスク

.PHONY: bc lc
bc: build-container
lc: login-container

.PHONY: build-container
build-container: clean-container
	docker-compose build

.PHONY: login-container
login-container:
	docker run \
		-v `pwd`:/home/user/work/src/github.com/jiro4989/tkfm \
		-it tkfm_linux \
		bash

.PHONY: stop-container
stop-container:
	docker-compose stop

.PHONY: clean-container
clean-container: stop-container
	docker-compose rm -f
	docker volume prune -f
