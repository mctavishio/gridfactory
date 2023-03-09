const tools = require("./tools");
module.exports = [
	//smooth linear tween
	(p1,p2,nsteps,t) => {
		let m = t/nsteps;
//		console.log("p1="+JSON.stringify(p1));
		let pt = Object.keys(p1).reduce( (ptacc,key) => {
			if(isNaN(p1[key])) {
				ptacc[key] = t>nsteps-3 ? [p1[key],p2[key]][Math.floor(Math.random() * 2)] : p1[key];
			}
			else {
				ptacc[key] = p1[key] + (p2[key] - p1[key])*m;
			}
			//console.log(`pt[${key}] = ${ptacc[key]}`);
			return ptacc;
		}, {});
		return pt;
	},
	// stay on first parameter set
	(p1,p2,nsteps,t) => {
		let m = t/nsteps;
		let pt = Object.keys(p1).reduce( (ptacc,key) => {
			//console.log("p1[key]"+key+" " + p1[key]);
				ptacc[key] = p1[key]; 
			return ptacc;
		}, {});
		return pt;
	},
	// more jerky tween 
	(p1,p2,nsteps,t) => {
		let m = 4*Math.floor(t/4)/nsteps;
		let pt = Object.keys(p1).reduce( (ptacc,key) => {
			//console.log("p1[key]"+key+" " + p1[key]);
			if(isNaN(p1[key])) {
				ptacc[key] = t>nsteps-3 ? [p1[key],p2[key]][Math.floor(Math.random() * 2)] : p1[key];
			}
			else {
				ptacc[key] = p1[key] + (p2[key] - p1[key])*m;
			}
			return ptacc;
		}, {});
		return pt;
	}
];
