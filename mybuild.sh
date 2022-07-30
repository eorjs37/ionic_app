#!/bin/bash
if [ "$CI_GIT_REF" = "master" ]; then
    npx ionic build --prod
else
    npx ionic build
fi