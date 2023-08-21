HUGO ?= hugo
WEBSITE_DIR := $(CURDIR)
POSTS_DIR := $(WEBSITE_DIR)/posts

## help: Print this message
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## run: Run the hugo server in /alexmerren
.PHONY: run
run:
	$(HUGO) server -D

## new-post: Create a new post with a given name (make new-post NAME=test)
.PHONY: new-post
new-post:
	@NAME=default-post-name
	$(HUGO) new --kind post $(POSTS_DIR)/$(NAME).md
