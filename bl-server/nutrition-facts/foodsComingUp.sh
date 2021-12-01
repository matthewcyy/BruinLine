#!/bin/bash

website="https://menu.dining.ucla.edu/Menus"
P=$(curl -s $website)
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>aurls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode html..ascii>anames.txt
file_name_json="comingUp.json"
echo "$P"|grep '<a class=\"recipelink\" href='|sed
N=$(cat anames.txt|wc -l)
for i in {1..$N}
do 
    date > date.txt
done

#paste -d "\n" anames.txt aurls.txt > combined
#echo $N
echo "" > $file_name_json;

curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F`` '"' '{print $4}'>>aurls.txt
curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode html..ascii>>anames.txt
moreN = $(expr $(cat anames.txt|wc -l) - N)
N=$(cat anames.txt|wc -l)
for i in {1..$moreN}
do 
    date -v+2d "+%Y-%m-%d" >> date.txt
done


while aurls.txt read q
do
    curl $q|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed 's/        <p class="nfcal"><span class="nfcaltxt">Calories<\/span>//; s/ <\/p>//'
done



paste -d"|" anames.txt aurls.txt date.txt|sort|uniq
#rm $file_name_json
#cp nutritionfacts.txt $file_name_json

