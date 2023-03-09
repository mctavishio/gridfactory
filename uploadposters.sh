for d in $(ls -d score*/)
do 
	echo "$d"
	cd $d
	gsutil -m cp -r poster*.png gs://filmfactory/$d
	echo "done $d"
	cd ..
done
