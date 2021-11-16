curl https://menu.dining.ucla.edu/Menus/DeNeve|grep '<a class=\"recipelink\" href='|awk -F '"' '{print $4}'>urls.txt
echo \n
curl https://menu.dining.ucla.edu/Menus/DeNeve|grep '<a class=\"recipelink\" href='|awk -F '[<>]' '{print $3}'>names.txt
N=$(cat names.txt|wc -l)
paste -d "\n" names.txt urls.txt > combined
echo $N
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
    printf 'f1: %s\n' "$q"
    echo $p
    curl $p|grep "nfserv" >> nutritionfacts.txt
    curl $p|grep "nfcal" >> nutritionfacts.txt
    curl $p|grep "nfnutrient" >> nutritionfacts.txt
   echo "" >> nutritionfacts.txt
done