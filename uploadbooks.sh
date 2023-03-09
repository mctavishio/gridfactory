for d in $(ls -d score*/)
do 
	echo "$d"
	cd $d
	for f in $(ls -d film_*/)
	do
		cd $f
		echo $f
		gsutil -m cp -r book.pdf gs://filmfactory/$d$f
		cd ..
	done
	echo "done $d"
	cd ..
done
