#!/bin/bash
file_name_json="comingUp.json"
website="https://menu.dining.ucla.edu/Menus"
P=$(curl -s $website)
# echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>aurls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii>anames.txt
file_name_json="comingUp.json"
N=$(echo $(cat anames.txt|wc -l))
echo "N $N"
date "+%Y-%m-%d"> date.txt
for i in $(seq 2 1 $N)
do 
    date "+%Y-%m-%d">>date.txt
done

#paste -d "\n" anames.txt aurls.txt > combined
#echo $N
echo "" > $file_name_json;

# curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F`` '"' '{print $4}'>>aurls.txt
curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii >>anames.txt
echo N

moreN=$(expr $(cat anames.txt|wc -l) - $N)
echo "moreN $moreN"

N=$(cat anames.txt|wc -l)
for i in $(seq 1 1 $moreN)
do 
    date -v+2d "+%Y-%m-%d" >> date.txt
done

# for i in {2}
# do
    #NEXT_DATE=$(date +%Y-%m-%d -d "$DATE + $i day")
    NEXT_DATE=$(date -v+2d "+%Y-%m-%d")
    #P=$(curl -s "$website$NEXT_DATE)
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>aurls.txt
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode -f html..ascii>>anames.txt
    moreN=$(expr $(cat anames.txt|wc -l) - $N)
    echo "moreN $moreN"
    N=$(cat anames.txt|wc -l)
    for i in $(seq 1 1 $moreN)
    do 
        echo $NEXT_DATE >> date.txt
    done
# done

# echo "" > cals.txt
# while read q
# do
#     curl -s $q|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed 's/        <p class="nfcal"><span class="nfcaltxt">Calories<\/span>//; s/ <\/p>//'>>cals.txt
# done<aurls.txt

echo "" > $file_name_json
echo "[" >>$file_name_json
paste -d"|" anames.txt date.txt|sort|awk -F"|" '!_[$1]++'| while IFS="|" read -r p q
do
    echo "{">>$file_name_json
    echo "\"itemName\": \"$(echo $p|sed 's/"//g')\"," |sed -E 's/\"itemName\"/\t\"itemName\"/'>>$file_name_json
    echo "\"nextAvailable\": \"$q\""|sed -e 's/\"nextAvailable\"/\t\"nextAvailable\"/' >>$file_name_json
    echo "},">>$file_name_json
done

sed -i '' '$ s/,$//g' $file_name_json
echo "]">>$file_name_json
#rm $file_name_json
#cp nutritionfacts.txt $file_name_json

