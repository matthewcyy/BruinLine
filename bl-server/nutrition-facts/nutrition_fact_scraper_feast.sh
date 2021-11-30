website="https://menu.dining.ucla.edu/Menus/FeastAtRieber"
P=$(curl -s $website)
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>names.txt
dining_hall="Feast"
file_name_json="feast_nutrient.json"

#paste -d "\n" names.txt urls.txt > combined
#echo $N
echo "" > $file_name_json;

curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
curl -s "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>>names.txt

for i in {2..8}
do
    #NEXT_DATE=$(date +%Y-%m-%d -d "$DATE + $i day")
    NEXT_DATE=$(date -v+"$i"d "+%Y-%m-%d")
    echo "$NEXT_DATE">>nextday.txt
    #P=$(curl -s "$website$NEXT_DATE)
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
    curl -s "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>>names.txt

done

N=$(cat names.txt|wc -l)

# done 3<./names.txt 4<./urls.txt
# while read p < $4 && while read q < $3;
# do
#   echo $combined
#   #>> nutritionfacts.txt
#   echo $p
#   curl -s $p| grep "nfserv" >> nutritionfacts.txt
#   curl -s $p| grep "nfcal" >> nutritionfacts.txt
#   curl -s $p| grep "nfnutrient" >> nutritionqfacts.txt
#   echo "" >> nutritionfacts.txt
# done 3<./names.txt 4<./urls.txt

paste -d"|" names.txt urls.txt | sort | uniq >combined.txt
i=0
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
#    if [ i -eq $N-1 ];
#    then
#        echo "}">>$file_name_json
#    else
#        echo "},">>$file_name_json
#    fi
    ((i++))
done
sed -i '' '$ s/,$//g' $file_name_json
echo "]">>$file_name_json
#rm $file_name_json
#cp nutritionfacts.txt $file_name_json
