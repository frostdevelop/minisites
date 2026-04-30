class spiralConsole {
	constructor(p=document.body,options){
		const htmlValue = "<div class='swirlConsoleCont'><header class='swirlConsoleHeader'><h1>"+(options.t||'Swirl Console')+"</h1><span>"+(options.s||'Type in the bottom field!')+"</span></header><main class='swirlConsoleMain'><div class='swirlMsgCont'></div><div class='swirlConsoleInputCont'><input class='swirlConsoleInput'></input></div></main></div>";
		p.insertAdjacentHTML('beforeend',htmlValue);
		this.eventInputs = [];
		this.echoPrompt = options.e ?? true;
		this.consoleElm = p.children[p.children.length-1];
		this.titleElm = this.consoleElm.getElementsByTagName('h1')[0];
		this.subtitleElm = this.consoleElm.getElementsByTagName('span')[0];
		this.promptElm = this.consoleElm.getElementsByClassName('swirlConsoleInput')[0];
		this.contElm = this.consoleElm.getElementsByClassName('swirlMsgCont')[0];
		this.promptElm.addEventListener('keydown',e=>{
			if(e.key==='Enter'&&!e.shiftKey){
				e.preventDefault();
				const t = this.promptElm.value;
				this.echoPrompt && this.log(t,3);
				for(let i=0;i<this.eventInputs.length;i++){
					this.eventInputs[i](t);
				}
				this.promptElm.value='';
			}
		});
	}
	onInput(f){this.eventInputs.push(f)}
	offInput(f){this.eventInputs.splice(this.eventInputs.indexOf(f),1)}
	get title(){return this.titleElm.innerText;}
	set title(t){this.titleElm.innerText=t;}
	get subtitle(){return this.subtitleElm.innerText;}
	set subtitle(t){this.subtitleElm.innerText=t;}
	log(m,o=0){
		const me = document.createElement('div');
		me.className='swirlConsole-msg';
		me.innerText=m;
		switch(o){
		case 1:
			me.classList.add('swirlWarn');
			break;
		case 2:
			me.classList.add('swirlError');
			break;
		case 3:
			me.classList.add('swirlUser');
		}
		this.contElm.appendChild(me);
		this.promptElm.scrollIntoView();
	}
}