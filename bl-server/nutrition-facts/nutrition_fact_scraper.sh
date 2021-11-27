website="https://menu.dining.ucla.edu/Menus/DeNeve"
P=$(curl $website)
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
#echo \n
echo "$P"|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>names.txt
dining_hall="DeNeve"

#paste -d "\n" names.txt urls.txt > combined
#echo $N
echo "" > nutritionfacts.json;

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
echo "[" >>nutritionfacts.json
paste -d "|" names.txt urls.txt |sort|uniq| while IFS="|" read -r q p
do
    #%printf 'f1: %s\n' "$q"ss
    #echo $p
    P=$(curl $p)
    #echo $P
    echo "{">>nutritionfacts.json
    echo -e "\t\"itemName\": \"$q\"," |sed -e 's/[\t][\t]*",$/",/'>>nutritionfacts.json
    echo -e "\t\"diningHall\": \"$dining_hall\"," >>nutritionfacts.json
    echo "$P"|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Calories/\t"calories":/g'|sed 's/.$/,/' >> nutritionfacts.json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Fat</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Fat/\t"fat":/g; s/g[ ][0-9]*%/,/g' >> nutritionfacts.json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Carbohydrate</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Carbohydrate/\t"carbs":/g; s/g[ ][0-9]*%/,/g'| >> nutritionfacts.json
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Protein</span>" |sed -e 's/[<][^>]*[>]//g; s/[ \t]*Protein/\t"protein":/g; s/g//g' >> nutritionfacts.json
    if echo "$P"|grep "<span class=\"nfcaltxt\">Calories"
    then 
        echo
    else  
        echo -e "\t\"calories\": \"N/A\",">> nutritionfacts.json
        echo -e  "\t\"fat\": \"N/A\",">> nutritionfacts.json
        echo -e "\t\"carbs\": \"N/A\",">> nutritionfacts.json
        echo -e "\t\"protein\": \"N/A\"">> nutritionfacts.json
    fi
    if [ i -eq $N-1 ];
    then
        echo "}">>nutritionfacts.json
    else
        echo "},">>nutritionfacts.json
    fi
    ((i++))
done
sed -i '$ s/,$//g' nutritionfacts.json
echo "]">>nutritionfacts.json
#rm nutritionfacts.json
#cp nutritionfacts.txt nutritionfacts.json