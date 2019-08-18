SRCS := $(shell find . -type f -name '*.go')
BUILD_SCRIPT := /home/user/work/src/github.com/jiro4989/tkfm/script/build.sh
DEPLOY_OPT := -v `pwd`:/home/user/work/src/github.com/jiro4989/tkfm \
		-it tkfm_linux

# バイナリ系のタスク

.PHONY: deploy
deploy: $(SRCS)
	docker run $(DEPLOY_OPT) $(BUILD_SCRIPT)

.PHONY: deploy-demos
deploy-demos: $(SRCS)
	for d in `ls internal/demo/`; do \
		docker run $(DEPLOY_OPT) $(BUILD_SCRIPT) internal/demo/$$d ; \
	done

# demoアプリを単体デプロイ
.PHONY: deploy-demo
deploy-demo: $(SRCS)
	if [ -z "$(APP)" ]; then echo Need APP variables; exit 1; fi
	docker run $(DEPLOY_OPT) $(BUILD_SCRIPT) internal/demo/$(APP)

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
