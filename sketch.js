let pnts=[],R=[],overBox=true //,bx=400,by=300
let t=0,play=false,grav=false
let toL=[]
function setup() {	createCanvas(800, 600);}




function draw()
{	
	background(44)

	R.forEach(r => {
			r.update()
			r.show()
	});
	pnts.forEach(p => {
		//p.update()
		p.show()
		if(play){
			t+=0.005
			p.update()}
		
		if(p.selected) p.p=new Vect(p.p.x,p.p.y)
		p.chng()
	});

	
}


function mousePressed() {
	if( mouseButton === CENTER ){

			pnts.forEach(e => {
				if( e.p.dis(new Vect(mouseX-400,300-mouseY))<12){
					//if(e!==toL[toL.length-1])
					toL.push(e)
				}
			});		
		
		if(toL.length>=2){
			if( toL[toL.length-2]!==toL[toL.length-1] )
			{
				if(keyIsDown(66) )
				{	let a=toL[toL.length-2],b=toL[toL.length-1]
					pnts.push(a.p.add(b.p.min(a.p).mul(2)).point)
					
					R.push(new Barr(a,b ,pnts[pnts.length-1]))
				}
				else
				{R.push(new Rig(toL[toL.length-2],toL[toL.length-1] ))}
			}
		}
		return 
	}else{
		toL=[]
	}
	
	if(keyIsDown(CONTROL)){
		pnts.push(new Point(mouseX-400,300-mouseY ))
		return
	}

	if(keyIsDown(82)){
		pnts.push(new Rot(mouseX-400,300-mouseY ))
		return
	}
	pnts.forEach(e => {
		if( e.p.dis(new Vect(mouseX-400,300-mouseY))<12){
			e.selected=true
			xOffset = mouseX-400 - e.p.x;
			yOffset = 300-mouseY - e.p.y;
		}	


	});
	if(keyIsDown(65) ){
		pnts.forEach(e => {
			if(e.selected ) e.fix =!e.fix ;})
		return 
	}


}
  
function mouseDragged() {
	pnts.forEach(e => {
		if (e.selected) {
		e.p.x = mouseX-400 - xOffset;
		e.p.y = 300-mouseY - yOffset;
		}})
}
  
function mouseReleased() {
	pnts.forEach(e => {
	e.selected = false;})
}
  
function keyPressed() {
	if(keyCode==87) play=!play 
	if(keyCode==71) grav=!grav 
}

  