#!/bin/bash

if [ -z "$1" ]; then
  echo -e " \n please include a commit message. \n"
  exit
fi

echo -e "\n commiting changes... \n"

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

echo -e "\n commit finished. \n"