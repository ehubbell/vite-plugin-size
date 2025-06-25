#!/bin/bash

if [ -z "$1" ]; then
  echo -e " \n please include a commit message. \n"
  exit
fi

if [ -z "$2" ]; then
  echo -e " \nplease include a version.\m"
  exit
fi

echo -e "\n deploying updates...\n"

echo -e "\n git checkout main \n"
git checkout main & checkout_id=$!
wait $checkout_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git status \n"
git status & status_pid=$!
wait $status_pid
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git add \n"
git add . & add_pid=$!
wait $add_pid
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git commit \n"
git commit -m "$1" & commit_pid=$!
wait $commit_pid
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git push \n"
git push & push_id=$!
wait $push_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n npm version \n"
npm version $2

echo -e "\n npm build \n"
npm run build & build_id=$!
wait $build_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n npm publish \n"
npm publish & publish_id=$!
wait $publish_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git push tags \n"
git push --tags & push_id=$!
wait $push_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n git push \n"
git push & push_id=$!
wait $push_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\n deploy finished. \n"