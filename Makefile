.DEFAULT_GOAL := help

## Install required npm packages
install:
	npm install

## Build file
build:
	npm run build

## Set version in README.md, package.json and package-lock.json. Option: VERSION=x.y.z
set-version:
ifndef VERSION
	$(error VERSION is not set. Usage: make version VERSION=x.y.z)
endif
	@echo "$(VERSION)" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$$' || \
		(echo "VERSION must be in the format x.y.z" && exit 1)

	@echo "Updating README.md..."
	@sed -i 's|\(/local/week-planner-card.js?version=\)[0-9]\+\.[0-9]\+\.[0-9]\+|\1$(VERSION)|g' README.md

	@echo "Updating package.json and package-lock.json..."
	@npm version $(VERSION) --no-git-tag-version

	@echo "Version is now set to ${VERSION}"

## Show this help message
help:
	@echo "Usage:"
	@echo "  make <target> [options]"
	@echo ""
	@echo "Available targets:"
	@awk '\
		/^## / { desc = substr($$0, 4); next } \
		/^[a-zA-Z0-9_.-]+:/ { \
			if (desc) { \
				line = $$0; \
				sub(/:.*/, "", line); \
				target = line; \
				# dynamically pad to align descriptions \
				printf "  %-25s %s\n", target, desc; \
				desc = "" \
			} \
		}' $(MAKEFILE_LIST)
