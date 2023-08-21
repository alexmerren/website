HUGO ?= hugo
WEBSITE_DIR := $(CURDIR)/alexmerren

## help: Print this message
.PHONY: help
help:
	@fgrep -h '##' $(MAKEFILE_LIST) | fgrep -v fgrep | column -t -s ':' | sed -e 's/## //'

## run: Run the hugo server in /alexmerren
.PHONY: run
run:
	cd $(WEBSITE_DIR); $(HUGO) server