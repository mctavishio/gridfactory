const tools = require("./tools.js");
module.exports = [
{
	id: "1647628171", //date +%s
	title: "hideincenter",
	draw: p => {	
		//console.log(tools.randominteger(0,9) +"**");
		let width = p.width;
		let height = p.height;
		let min = p.min, max = p.max;
		let colors = p.colors;
		let cx = width/2;
		let cy = height/2;
		let layersmill = p.layersmill;
		let nc = 0;
		let layers = layersmill.reduce( (layermatrix, layer, layerj) => {
				let mill = [...Array(layer.nrects).keys()];
				let rects = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let lineWidth = mill.map(n=>0);
					let dash = tools.randominteger(0.05*min,0.4*min);
					let space = tools.randominteger(0.1*min,0.4*min);
					let width=0,height=0;
					matrix.push({x:cx,y:cy,width,height,lineWidth:lineWidth[j],dash,space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1});
					return matrix;
				}, []);
				mill = [...Array(layer.nlines).keys()];
				let lineWidth = mill.map(n=>0);
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (matrix,j) => {
					if(layerj<layersmill.length-2) {
						let color1 = colors[++nc%colors.length];
						let color2 = colors[++nc%colors.length];
						matrix.push({x1:cx,x2:cx,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						matrix.push({x1:cx,x2:cx,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return matrix;
				}, []);
				mill = [...Array(layer.ncircles).keys()];
				lineWidth = mill.map(n=>0);
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				let r = mill.map(n=>1);
				let circles = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let color2 = colors[++nc%colors.length];
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 0 : 1;
					matrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return matrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: rects } );
			}, []);
		return layers;
	}
},
{
	id: "1647628291", //date +%s
	title: "hideupperleft",
	draw: p => {	
		let width = p.width;
		let height = p.height;
		let min = p.min, max = p.max;
		let colors = p.colors;
		let cx = 0;
		let cy = 0;
		let layersmill = p.layersmill;
		let nc = 0;
		let layers = layersmill.reduce( (layermatrix, layer, layerj) => {
				let mill = [...Array(layer.nrects).keys()];
				let rects = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let lineWidth = mill.map(n=>0);
					let dash = tools.randominteger(0.05*min,0.4*min);
					let space = tools.randominteger(0.1*min,0.4*min);
					let width=0,height=0;
					matrix.push({x:cx,y:cy,width,height,lineWidth:lineWidth[j],dash,space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1});
					return matrix;
				}, []);
				mill = [...Array(layer.nlines).keys()];
				let lineWidth = mill.map(n=>0);
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (matrix,j) => {
					if(layerj<layersmill.length-2) {
						let color1 = colors[++nc%colors.length];
						let color2 = colors[++nc%colors.length];
						matrix.push({x1:cx,x2:cx,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						matrix.push({x1:0,x2:0,y1:0,y2:0,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return matrix;
				}, []);
				mill = [...Array(layer.ncircles).keys()];
				lineWidth = mill.map(n=>0);
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				let r = mill.map(n=>1);
				let circles = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let color2 = colors[++nc%colors.length];
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 0 : 1;
					matrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return matrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: rects } );
			}, []);
		return layers;
	}
},
{
	id: "1647628791", //date +%s
	title: "hidelowerright",
	draw: p => {	
		let width = p.width;
		let height = p.height;
		let min = p.min, max = p.max;
		let colors = p.colors;
		let cx = p.width;
		let cy = p.height;
		let layersmill = p.layersmill;
		let nc = 0;
		let layers = layersmill.reduce( (layermatrix, layer, layerj) => {
				let mill = [...Array(layer.nrects).keys()];
				let rects = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let lineWidth = mill.map(n=>0);
					let dash = tools.randominteger(0.05*min,0.4*min);
					let space = tools.randominteger(0.1*min,0.4*min);
					let width=0,height=0;
					matrix.push({x:cx,y:cy,width,height,lineWidth:lineWidth[j],dash,space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1});
					return matrix;
				}, []);
				mill = [...Array(layer.nlines).keys()];
				let lineWidth = mill.map(n=>0);
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (matrix,j) => {
					if(layerj<layersmill.length-2) {
						let color1 = colors[++nc%colors.length];
						let color2 = colors[++nc%colors.length];
						matrix.push({x1:width,x2:width,y1:height,y2:height,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return matrix;
				}, []);
				mill = [...Array(layer.ncircles).keys()];
				lineWidth = mill.map(n=>0);
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				let r = mill.map(n=>1);
				let circles = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let color2 = colors[++nc%colors.length];
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 0 : 1;
					matrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return matrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: rects } );
			}, []);
		return layers;
	}
},
{
	id: "1647875263", //date +%s
	title: "hideintop",
	draw: p => {	
		let width = p.width;
		let height = p.height;
		let min = p.min, max = p.max;
		let colors = p.colors;
		let cx = width/2;
		let cy = 0;
		let layersmill = p.layersmill;
		let nc = 0;
		let layers = layersmill.reduce( (layermatrix, layer, layerj) => {
				let mill = [...Array(layer.nrects).keys()];
				let rects = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let lineWidth = mill.map(n=>0);
					let dash = tools.randominteger(0.05*min,0.4*min);
					let space = tools.randominteger(0.1*min,0.4*min);
					let width=0,height=0;
					matrix.push({x:cx,y:cy,width,height,lineWidth:lineWidth[j],dash,space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1});
					return matrix;
				}, []);
				mill = [...Array(layer.nlines).keys()];
				let lineWidth = mill.map(n=>0);
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (matrix,j) => {
					if(layerj<layersmill.length-2) {
						let color1 = colors[++nc%colors.length];
						let color2 = colors[++nc%colors.length];
						matrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						matrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return matrix;
				}, []);
				mill = [...Array(layer.ncircles).keys()];
				lineWidth = mill.map(n=>0);
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				let r = mill.map(n=>1);
				let circles = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let color2 = colors[++nc%colors.length];
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 0 : 1;
					matrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return matrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: rects } );
			}, []);
		return layers;
	}
},
{
	id: "1647875520", //date +%s
	title: "hideinlow",
	draw: p => {	
		let width = p.width;
		let height = p.height;
		let min = p.min, max = p.max;
		let colors = p.colors;
		let cx = width/2;
		let cy = height;
		let layersmill = p.layersmill;
		let nc = 0;
		let layers = layersmill.reduce( (layermatrix, layer, layerj) => {
				let mill = [...Array(layer.nrects).keys()];
				let rects = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let lineWidth = mill.map(n=>0);
					let dash = tools.randominteger(0.05*min,0.4*min);
					let space = tools.randominteger(0.1*min,0.4*min);
					let width=0,height=0;
					matrix.push({x:cx,y:cy,width,height,lineWidth:lineWidth[j],dash,space,strokeOpacity:0,fillOpacity:1,strokeColor:color1,fillColor:color1});
					return matrix;
				}, []);
				mill = [...Array(layer.nlines).keys()];
				let lineWidth = mill.map(n=>0);
				let dash = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let space = mill.map(n=>tools.randominteger(0.1*min,0.6*min)).sort( (a,b) => b-a );
				let lines = mill.reduce( (matrix,j) => {
					if(layerj<layersmill.length-2) {
						let color1 = colors[++nc%colors.length];
						let color2 = colors[++nc%colors.length];
						matrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:0,strokeColor:color1,fillColor:color2});;
						matrix.push({x1:0,x2:width,y1:cy,y2:cy,lineWidth:lineWidth[j],dash:space[j],space:dash[j],strokeOpacity:1,fillOpacity:0,strokeColor:color2,fillColor:color1});
					}
					return matrix;
				}, []);
				mill = [...Array(layer.ncircles).keys()];
				lineWidth = mill.map(n=>0);
				dash = mill.map(n=>tools.randominteger(0.05*min,0.25*min)).sort( (a,b) => b-a);
				space = mill.map(n=>tools.randominteger(0.05*min,0.8*min));
				let r = mill.map(n=>1);
				let circles = mill.reduce( (matrix,j) => {
					let color1 = colors[++nc%colors.length];
					let color2 = colors[++nc%colors.length];
					let fillOpacity = (layerj<layersmill.length-2 && j === mill.length-2) || (layerj === layersmill.length-1 && j === mill.length-1) ? 0 : 1;
					matrix.push({cx:cx,cy:cy,r:r[j],lineWidth:lineWidth[j],dash:dash[j],space:space[j],strokeOpacity:1,fillOpacity:fillOpacity,strokeColor:color1,fillColor:color2});
					return matrix;
				}, []);
				return layermatrix.concat( { lines, circles, rects: rects } );
			}, []);
		return layers;
	}
},
];
