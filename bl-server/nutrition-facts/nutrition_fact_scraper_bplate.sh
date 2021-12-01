#!/bin/bash
website="https://menu.dining.ucla.edu/Menus/BruinPlate"
P=$(curl -s $website)
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode html/.. >names.txt
dining_hall="BPlate"
file_name_json="bplate_nutrient.json"
#echo names.txt| perl -Mopen=locale -pe 's/&#x([\da-f]+);/chr hex $1/gie'>names.txt

#paste -d "\n" names.txt urls.txt > combined
#echo $N
echo "" > $file_name_json;

curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode html/.. >>names.txt
DATE=$(date)
for i in {2..3}
do
    #NEXT_DATE=$(date +%Y-%m-%d -d "$DATE + $i day")
    NEXT_DATE=$(date -v+"$i"d "+%Y-%m-%d")
    echo "$NEXT_DATE">>nextday.txt
    #P=$(curl -s "$website$NEXT_DATE)
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'|recode html/..>>names.txt

done

N=$(cat names.txt|wc -l)

#paste -d"|" names.txt urls.txt | sort | uniq >combined.txt

echo "[" >>$file_name_json
paste -d "|" names.txt urls.txt |sort|uniq| while IFS="|" read -r q p
do
    #%printf 'f1: %s\n' "$q"ss
    #echo $p
    P=$(curl -s $p)
    #echo $P
    echo "{">>$file_name_json
    echo "\"itemName\": \"$(echo $q|sed 's/"//g')\"," |sed -E 's/\"itemName\"/\t\"itemName\"/'>>$file_name_json
    echo "\"diningHall\": \"$dining_hall\","|sed -e 's/\"diningHall\"/\t\"diningHall\"/' >>$file_name_json
    echo "$P"|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed -E 's/[<][^>]*[>]//g; s/[ \t]*Calories/\t"calories":/g'|sed 's/.$/,/' >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Fat</span>" | sed -E 's/[<][^>]*[>]//g; s/[ \t]*Total Fat/"fat":/g; s/g[ ][0-9]*%/,/g' >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Carbohydrate</span>" | sed -E 's/[<][^>]*[>]//g; s/[ \t]*Total Carbohydrate/"carbs":/g; s/g[ ][0-9]*%/,/g' >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Protein</span>" |sed -E 's/[<][^>]*[>]//g; s/[ \t]*Protein/"protein":/g; s/g//g' >> $file_name_json
    if echo "$P"|grep "<span class=\"nfcaltxt\">Calories"
    then 
        echo
    else  
        echo  "\"calories\": \"N/A\"," |sed -E 's/\"calories\"/\t\"calories\"/'>> $file_name_json
        echo  "\"fat\": \"N/A\"," |sed -E 's/\"fat\"/\t\"fat\"/'>> $file_name_json
        echo "\"carbs\": \"N/A\"," |sed -E 's/\"carbs\"/\t\"carbs\"/'>> $file_name_json
        echo "\"protein\": \"N/A\"" |sed -E 's/\"protein\"/\t\"protein\"/'>> $file_name_json
    fi
    echo "},">>$file_name_json

done
sed -i '' '$ s/,$//g' $file_name_json
echo "]">>$file_name_json
#rm $file_name_json
#cp nutritionfacts.txt $file_name_json