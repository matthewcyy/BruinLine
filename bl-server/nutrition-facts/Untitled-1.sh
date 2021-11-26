curl https://menu.dining.ucla.edu/Menus/DeNeve|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
#echo \n
curl https://menu.dining.ucla.edu/Menus/DeNeve|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>names.txt
dining_hall="deNeve"
N=$(cat names.txt|wc -l)
#paste -d "\n" names.txt urls.txt > combined
#echo $N
echo "" >nutritionfacts.txt;

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

paste -d "|" names.txt urls.txt | while IFS="|" read -r q p
do
    #%printf 'f1: %s\n' "$q"
    #echo $p
    P=$(curl $p)
    #echo $P
    echo "{">>nutritionfacts.txt
    echo -e "\ttiteName: \"$q\"">>nutritionfacts.txt
    echo -e "\tdiningHall: \"$dining_hall\"">>nutritionfacts.txt
    echo "$P"|grep "<p class=\"nfcal\"><span class=\"nfcaltxt\">Calories</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Calories/\tcalories:/g' -e 's/[ ][0-9]*%//g' >> nutritionfacts.txt
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Fat</span>" | sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Fat/\tfat:/g; s/g[ ][0-9]*%//g' >> nutritionfacts.txt
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Total Carbohydrate</span>"|sed -e 's/[<][^>]*[>]//g; s/[ \t]*Total Carbohydrate/\tcarbs:/g; s/g[ ][0-9]*%//g'# >> nutritionfacts.txt
    echo "$P"|grep "<p class=\"nfnutrient\"><span class=\"nfmajornutrient\">Protein</span>" |sed -e 's/[<][^>]*[>]//g; s/[ \t]*Protein/\tprotein:/g; s/g//g'# >> nutritionfacts.txt
    echo "}">>nutritionfacts.txt

   echo "" >> nutritionfacts.txt
done