#!/bin/bash

# website="https://menu.dining.ucla.edu/Menus"
# P=$(curl -s $website)
# echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>aurls.txt
# #echo \n
# echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii>anames.txt
# file_name_json="comingUp.json"
# N=$(cat anames.txt|wc -l)
# echo "moreN $moreN"
# for i in $(seq 1 1 $N)
# do 
#     date "+%Y-%m-%d"> date.txt
# done

# #paste -d "\n" anames.txt aurls.txt > combined
# #echo $N
# echo "" > $file_name_json;

# curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F`` '"' '{print $4}'>>aurls.txt
# curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii >>anames.txt
# echo N

# moreN=$(expr $(cat anames.txt|wc -l) - $N)
# echo "moreN $moreN"

# N=$(cat anames.txt|wc -l)
# for i in $(seq 1 1 $moreN)
# do 
#     date -v+2d "+%Y-%m-%d" >> date.txt
# done

# for i in {2..4}
# do
#     #NEXT_DATE=$(date +%Y-%m-%d -d "$DATE + $i day")
#     NEXT_DATE=$(date -v+"$i"d "+%Y-%m-%d")
#     #P=$(curl -s "$website$NEXT_DATE)
#     curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>aurls.txt
#     curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii>>anames.txt
#     moreN=$(expr $(cat anames.txt|wc -l) - $N)
#     echo "moreN $moreN"
#     N=$(cat anames.txt|wc -l)
#     for i in $(seq 1 1 $moreN)
#     do 
#         echo $NEXT_DATE >> date.txt
#     done
# done

# echo "" > cals.txt
# while read q
# do
#     curl -s $q|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed 's/        <p class="nfcal"><span class="nfcaltxt">Calories<\/span>//; s/ <\/p>//'>>cals.txt
# done<aurls.txt



paste -d"|" anames.txt cals.txt date.txt|sort |awk -F"|" '!_[$1]++'>comingUp.txt
#rm $file_name_jsonq
#cp nutritionfacts.txt $file_name_json

