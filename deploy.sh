#!/bin/bash

##### HINT: mandatory to ran this script, is that in your ssh config 
##### HINT: you have the conection setup under the name "bo"

# folders to be ignored during the rsync
EXCLUDES=(
  '--exclude=dev-event-tools/'
# '--exclude=next-folder/'
)

rsync -avz --delete "${EXCLUDES[@]}" ./public/ bo:~/html/