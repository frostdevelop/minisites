const uiConsole = new spiralConsole(document.body,{t:'Javascript Tester',s:'A program by Frostbyte. Powered by Spiral Console.'});

function consoleCapture(o){
	return function(...args){
		uiConsole.log(args.map(m=>{
			if(typeof m === "object"){ // && !Array.isArray(ret)
				let consoleOut="";
				const props = Object.getOwnPropertyNames(m);
				for(let i=0;i<props.length;i++){consoleOut+=props[i]+": "+m[props[i]]+"\n"}
				return consoleOut;
			}else{
				return m.toString();
			}
		}).join(' '),o)
	}
}

console.log = consoleCapture(0);
console.warn = consoleCapture(1);
console.error = consoleCapture(2);
console.info = consoleCapture(0);
console.debug = consoleCapture(3);
console.dir = consoleCapture(0);
addEventListener('error', e=>{
	uiConsole.log(e.toString()+'\n'+e.stack,2);
});
addEventListener('unhandledrejection', e=>{
    uiConsole.log(e.reason,2);
});
uiConsole.onInput(m=>{
	try{
		console.log(eval(m));
	}catch(e){
		console.error(e.toString()+'\n'+e.stack);
	}
});