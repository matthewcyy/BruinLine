website="https://menu.dining.ucla.edu/Menus/Epicuria"
P=$(curl $website)
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>names.txt
dining_hall="Epicuria"
file_name_json="epicuria_nutrient.json"

#paste -d "\n" names.txt urls.txt > combined
#echo $N
echo "" > $file_name_json;

curl "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
curl "$website/Tomorrow"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>>names.txt

for i in {2..8}
do
    NEXT_DATE=$(date +%Y-%m-%d -d "$DATE + $i day")
    echo "$NEXT_DATE"
    #P=$(curl "$website$NEXT_DATE)
    curl "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>>urls.txt
    curl "$website/$NEXT_DATE"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>>names.txt

done

N=$(cat names.txt|wc -l)

# done 3<./names.txt 4<./urls.txt
# while read p < $4 && while read q < $3;
# do
#   echo $combined
#   #>> nutritionfacts.txt
#   echo $p
#   curl $p| grep "nfserv" >> nutritionfacts.txt
#   curl $p| grep "nfcal" >> nutritionfacts.txt
#   curl $p| grep "nfnutrient" >> nutritionqfacts.txt
#   echo "" >> nutritionfacts.txt
# done 3<./names.txt 4<./urls.txt

paste -d"|" names.txt urls.txt | sort | uniq >combined.txt
i=0
echo "[" >>$file_name_json
paste -d "|" names.txt urls.txt |sort|uniq| while IFS="|" read -r q p
do
    #%printf 'f1: %s\n' "$q"ss
    #echo $p
    P=$(curl $p)
    #echo $P
    echo "{">>$file_name_json
    echo -e "\t\"itemName\": \"$q\"," |sed -e 's/[\t][\t]*",$/",/'>>$file_name_json
    echo -e "\t\"diningHall\": \"$dining_hall\"," >>$file_name_json
    echo "$P"|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Calories/\t"calories":/g'|sed 's/.$/,/' >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Fat</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Fat/\t"fat":/g; s/g[ ][0-9]*%/,/g' >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Carbohydrate</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Carbohydrate/\t"carbs":/g; s/g[ ][0-9]*%/,/g'| >> $file_name_json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Protein</span>" |sed -e 's/[<][^>]*[>]//g; s/[ \t]*Protein/\t"protein":/g; s/g//g' >> $file_name_json
    if echo "$P"|grep "<span class=\"nfcaltxt\">Calories"
    then 
        echo
    else  
        echo -e "\t\"calories\": \"N/A\",">> $file_name_json
        echo -e  "\t\"fat\": \"N/A\",">> $file_name_json
        echo -e "\t\"carbs\": \"N/A\",">> $file_name_json
        echo -e "\t\"protein\": \"N/A\"">> $file_name_json
    fi
    if [ i -eq $N-1 ];
    then
        echo "}">>$file_name_json
    else
        echo "},">>$file_name_json
    fi
    ((i++))
done
sed -i '$ s/,$//g' $file_name_json
echo "]">>$file_name_json
#rm $file_name_json
#cp nutritionfacts.txt $file_name_json