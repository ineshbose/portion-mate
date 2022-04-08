#!/bin/bash

git log --no-merges --format="%cd" --date=short | sort -u | while read DATE ; do

DATE_LOGS=$(git log --no-merges --reverse --format="* *%cd* %s ([%h](https://github.com/ineshbose/portion-mate/commit/%H))" --date=format:"%H:%M" --since="${DATE} 00:00:00" --until="${DATE} 23:59:59")

if [ ! -z "$DATE_LOGS" ]
then
    echo -e "\n## $(date -d ${DATE} +"%d %B %Y")\n"
    echo -e "${DATE_LOGS}"
fi

done
