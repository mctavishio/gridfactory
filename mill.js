const PDFDocument = require("pdfkit");
// transitions: ["1647628171", "1647628291", "1647628791"]
// tweens: smooth, stay on first parameter set, more jerky
const fs = require("fs");
const path = require("path");
const millfile = path.basename(__filename);
const tools = require("./tools.js");
const tweens = require("./tweens.js");
const transitions = require("./transitions.js");
const algorithms = require("./algorithms.js");
// const [nodepath,codepath,algorithmid="1645417729",seedid="1647279261"] = process.argv;
const prefix = "film";
const datetime = new Date();
const timestampnow = datetime.getTime();
const datetimestr = datetime.toDateString();
const datetimeISOstr = datetime.toISOString();
const [nodepath,codepath,scoreid="score1648681452",timestamp=timestampnow] = process.argv;
const score = require(`./${scoreid}`)(timestampnow);
let pigments = score.pigments;
let pigmentsets = score.pigmentsets;
let bgcolor = score.bgcolor ? score.bgcolor : pigments.white;
// { id, printrunid, films, tween, changelayer } = score;
let scoredir = score.printrunid;
if (!fs.existsSync(scoredir)){
	fs.mkdirSync(scoredir);
}
let nextsteps = "";
let nextstepsfile = `nextsteps${scoredir}.sh`;
// for each film in score ...
score.films.forEach( (film,f) => {
	// { id, algorithmid, pigmentset, text, nticks } = film; 
	console.log("f="+f);
		//let { id, transitionid, title, draw } = algorithms.filter(x=>x.id===algorithmid)[0];
		let algorithm = algorithms.filter(x=>x.id===film.algorithmid)[0];
		let transitionid = algorithm.transitionid();
		let transition = transitions.filter(x=>x.id===transitionid)[0];
		colorsets = tools.reifyWeightedArray(film.pigmentset);
		let fps=24; // frames per second for ffmpeg
		let nticks = film.nticks; 
		let filmdir = film.id;
		if (!fs.existsSync(scoredir+"/"+filmdir)){
			fs.mkdirSync(scoredir+"/"+filmdir);
		}
		let colors = tools.shufflearray(colorsets);
		let p = {
			width: 1920,
			height: 1080,
			min: 1080,
			max: 1920,
			fsize: 128,
			layersmill: algorithm.layersmill,
			colors: colors
		};
		let count = 0;
//		let numbers = [...Array(10).keys()].map(n=>n.toString());
		[...Array(nticks).keys()].reduce( (oldtick, ntick) => {
			let istween = score.istween(ntick,nticks); 
			let layers = [];
			if(ntick===nticks-1) {
				layers = transition.draw(p);
			}
			else {
				let newlayers = algorithm.draw(p);
				layers = newlayers.map( (newlayer,j) => {
					return score.changelayer(j,newlayers.length,ntick,nticks) ? newlayer : oldtick[j]; 
				});
			};
			let ntween = score.tween(ntick,nticks); 
			[...Array(fps).keys()].forEach( (nframe) => {
				file = count.toString().padStart(6, "0") + ".pdf";
				let info = {id:film.id,timestamp,datetimestr,directory:filmdir,npages:nticks,Author:"mctavish",Subject:"generative drawing series",Keywords: "net.art, webs, networks, generative, algorithmic" };
				++count;
				let filmfile = `${scoredir}/${filmdir}/frame${file}`;
				//console.log("filmfile = "+filmfile);
				let doc = new PDFDocument(
				{ 
					size: [p.width,p.height],
					info: info,
				});
				doc.pipe(fs.createWriteStream(filmfile));
				doc.rect(0, 0, p.width, p.height).fillColor(bgcolor).fill();
				if(!istween) {
					let newlayers = algorithm.draw(p);
					layers = newlayers.map( (newlayer,j) => {
						return (j>newlayers.length/2 || score.changelayer(j,newlayers.length,ntick,nticks)) ? newlayer : oldtick[j]; 
						//return j>newlayers.length/2 ? newlayer : oldtick[j]; 
					});
					oldtick = layers;
				}
				layers.forEach( (layer,l) => {
					let oldlayer = oldtick[l];
					layer.rects.forEach( (rect,j) => {
						let oldrect = oldlayer.rects[j];
						let nextp = tweens[ntween](oldrect,rect,fps,nframe);
						let { x, y, width, height, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = nextp; 
						if(fillOpacity!==0) {
							doc.rect(x, y, width, height).fillColor(fillColor).fill();
						}
						if(strokeOpacity!==0) {
							doc.rect(x, y, width, height).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
						}
					});
					layer.lines.forEach( (line,j) => {
						let oldline = oldlayer.lines[j];
						let nextp = tweens[ntween](oldline,line,fps,nframe);
						let { x1, x2, y1, y2, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = nextp; 
						doc.moveTo(x1,y1).lineTo(x2,y2).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
					});
					layer.circles.forEach( (circ,j) => {
						let oldcirc = oldlayer.circles[j];
						let nextp = tweens[ntween](oldcirc,circ,fps,nframe);
						let { cx, cy, r, lineWidth, dash, space, strokeOpacity, fillOpacity, strokeColor, fillColor } = nextp; 
						if(fillOpacity!==0) {
							doc.circle(cx, cy, r).fillColor(fillColor).fillOpacity(1).fill();	
						}
						if(strokeOpacity!==0) {
							doc.circle(cx, cy, r).fillOpacity(0).strokeColor(strokeColor).dash(dash, {space:space}).lineWidth(lineWidth).stroke();
						}
					});
				});
				if(film.text[0]!=="" || film.text[1]!=="") {
					let opacity=1.0;
					if(count>nticks*fps-10) {
						opacity=0.0+(nticks*fps-count)*0.1;
					}
					else if(count<10) {
						opacity=0.0+count*0.1;
					}
					else {
						opacity=1.0;
					}
					doc.font("Courier-Bold");
					let fsize = p.fsize;
					if(film.text[1]!=="") {
						doc.fontSize(fsize);
						doc.fillOpacity(opacity).strokeOpacity(opacity).fillColor(pigments.red).strokeColor(pigments.red).text(film.text[0],p.width*.0,p.height*.3,{align: 'center', width:p.width,height:p.height});
					}
					if(film.text[1]!=="") {
						doc.fontSize(fsize*.6);
						doc.fillOpacity(opacity).strokeOpacity(opacity).fillColor(pigments.red).strokeColor(pigments.red).text(film.text[1],p.width*.0,p.height*.6,{align: 'center', width:p.width,height:p.height});
					}
				}
				doc.end();
			});
			return layers;
		},transition.draw(p) );

	nextsteps = nextsteps + `
	cd ${filmdir}
	for file in *.pdf; do magick convert $file -resize 1920 $file.png; done;
	for file in *pdf.png; do mv "$file" "$\{file/.pdf.png/.png\}"; done;
	pdfunite film*{24,48,72,96}.pdf book.pdf
	ffmpeg -framerate 24 -i film%06d.png -c:v libx264 -r 24 -pix_fmt yuv420p film.mp4
	rm *.png
	cd ..
	echo "file './${filmdir}/film.mp4'" >> filmfiles.txt 
	`;
});
	nextsteps = nextsteps + `
	cp ${nextstepsfile} ${scoredir}/nextsteps.sh
	cp ${millfile} ${scoredir}/${millfile}
	`;
	//console.log(`gsutil -m cp -r ${scoredir} gs://filmfactory/`);
	//console.log(`cd ${scoredir}`);
	//console.log(`bash ${nextstepsfile}`);
//	fs.writeFileSync(nextstepsfile, nextsteps, (err) => {
//	  if (err)
//		console.log(err);
//	  else {
//		console.log("File written successfully\n");
//	  }
//	});
//});
