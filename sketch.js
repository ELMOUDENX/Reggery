let overBox=true //,bx=400,by=300
let t=0,world


class World{
    constructor(){
        this.SHOWGRID=true
        this.SHOWMINIGRID=true	
		this.R=[]
		this.play=false
		this.barrs=[]
		this.gravity=false

        this.SHOWAXIS=true
        this.SHOWNUMBERS=[true,true]
        this.ZOOMTOMOUSE=true
        this.GRIDLENGTH=40
        this.Origine=createVector(windowWidth/3,windowHeight/2)
        this.i=createVector(this.GRIDLENGTH,0)
        this.j=createVector(0,-this.GRIDLENGTH)
        this.I=createVector(1,0)
        this.J=createVector(0,1)

        this.points=[]
        this.segs=[]


      //  this.AX=new Axe(this.Origine,1)
        //this.AY=new Axe(this.Origine,0)
        this.pointIsSelected=false
        this.selected=[]
        this.ActiveSelection

    }
}

function setup() {	createCanvas(800, 600);world=new World()}




function draw()
{	
	background(44)

	world.R.forEach(r => {
			r.update()
			r.show()
	});
	world.points.forEach(p => {
		//p.update()
		p.show()
		if(world.play){
			t+=0.005
			p.update()}
		
		if(p.selected) p.p=new p5.Vector(p.p.x,p.p.y)
		p.chng()
	});

	
}


function mousePressed() {
	if( mouseButton === CENTER ){

			world.points.forEach(e => {
				if( e.p.dist(new p5.Vector(mouseX-400,300-mouseY))<12){
					//if(e!==world.barrs[world.barrs.length-1])
					world.barrs.push(e)
				}
			});		
		
		if(world.barrs.length>=2){
			if( world.barrs[world.barrs.length-2]!==world.barrs[world.barrs.length-1] )
			{
				if(keyIsDown(66) )
				{	let a=world.barrs[world.barrs.length-2],b=world.barrs[world.barrs.length-1]
					world.points.push(p5.Vector.add(a.p,p5.Vector.mul(p5.Vector.sub(b.p,a.p),2)).point)
					
					world.R.push(new Barr(a,b ,world.points[world.points.length-1]))
				}
				else
				{world.R.push(new Rig(world.barrs[world.barrs.length-2],world.barrs[world.barrs.length-1] ))}
			}
		}
		return 
	}else{
		world.barrs=[]
	}
	
	if(keyIsDown(CONTROL)){
		world.points.push(new Point(mouseX-400,300-mouseY ))
		return
	}

	if(keyIsDown(82)){
		world.points.push(new Rot(mouseX-400,300-mouseY ))
		return
	}
	world.points.forEach(e => {
		if( e.p.dist(new p5.Vector(mouseX-400,300-mouseY))<12){
			e.selected=true
			xOffset = mouseX-400 - e.p.x;
			yOffset = 300-mouseY - e.p.y;
		}	


	});
	if(keyIsDown(65) ){
		world.points.forEach(e => {
			if(e.selected ) e.fix =!e.fix ;})
		return 
	}


}
  
function mouseDragged() {
	world.points.forEach(e => {
		if (e.selected) {
		e.p.x = mouseX-400 - xOffset;
		e.p.y = 300-mouseY - yOffset;
		}})
}
  
function mouseReleased() {
	world.points.forEach(e => {
	e.selected = false;})
}
  
function keyPressed() {
	if(keyCode==87) world.play=!world.play 
	if(keyCode==71) world.gravity=!world.gravity 
}

  