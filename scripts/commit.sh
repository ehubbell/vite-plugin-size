#!/bin/bash

if [ -z "$1" ]; then
  echo -e " \nplease include a commit message.\n"
  exit
fi

echo -e "\ncommiting changes...\n"

git checkout main & checkout_id=$!
wait $checkout_id
if [ $? -eq 1 ]; then exit; fi

git status & status_pid=$!
wait $status_pid
if [ $? -eq 1 ]; then exit; fi

git add . & add_pid=$!
wait $add_pid
if [ $? -eq 1 ]; then exit; fi

git commit -m "$1" & commit_pid=$!
wait $commit_pid
if [ $? -eq 1 ]; then exit; fi

git push & push_id=$!
wait $push_id
if [ $? -eq 1 ]; then exit; fi

echo -e "\ncommit finished.\n"