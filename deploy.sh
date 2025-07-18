#!/bin/bash

##### mandatory to ran this script, is that in your ssh config you have the conection setup under the name "bo"
rsync -avz --delete ./public/ bo:~/html/