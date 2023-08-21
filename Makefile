HUGO ?= hugo
WEBSITE_DIR := $(CURDIR)/alexmerren
POSTS_DIR := $(CURDIR)/alexmerren/posts

## help: Print this message
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## run: Run the hugo server in /alexmerren
.PHONY: run
run:
	cd $(WEBSITE_DIR); $(HUGO) server

## new-post: Create a new post with a given name (make new-post NAME=test)
.PHONY: new-post
new-post:
	@NAME=default-post-name
	@cd $(WEBSITE_DIR); $(HUGO) new --kind post $(POSTS_DIR)/$(NAME).md