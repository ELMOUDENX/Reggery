
function fromscreen(x,y){
	return (mouseX-400,300-mouseY)
}

class Point{
	constructor(x=0,y=0){
		this.p=new p5.Vector(x,y)
		this.fix=false
		this.selected=false
	}
    
	set(v){

		if(!this.fix) this.p.add(v)	
		
	}
	dist(){

	}
    setp(v){

		if(!this.fix) this.p = v
		
	}
	chng() {

	}
	update(){
		if(!this.fix && !this.selected && world.gravity) this.p.add(new p5.Vector(0,-1))
	}
	show(){
		fill(256)
		if(this.fix==true) fill(50,20,250)
		if(this.selected==true) fill(200,250,19)

		strokeWeight(0)
		ellipse(400+this.p.x,300-this.p.y,10)
	}
}
class Rot extends Point{
	constructor(x=0,y=0,r=36){
		super(x+r,y)
		this.c=new p5.Vector(x,y)
		this.fix=true
		this.selected=false
		this.r=r
		//this.link=new Rigg()
	}
	chng(){
		if (keyIsDown(88)) {
			this.r=this.c.dist(this.p)
		}
	}
	update(){

		this.p=new p5.Vector(this.c.x+this.r*cos(t),this.c.y+this.r*sin(t))
	}
	show(){
		
		if(this.fix==true) fill(50,20,250)
		if(this.selected==true) fill(200,250,19)
			fill(256,20,20)
		strokeWeight(0)
		ellipse(400+this.p.x,300-this.p.y,10)
		ellipse(400+this.c.x,300-this.c.y,9)
		line(400+this.p.x,300-this.p.y,400+this.c.x,300-this.c.y)

	}
}
class Rig{
	constructor(a=new Point(),b=new Point()){
		this.A=a
		this.B=b
		this.l=this.A.p.dist(this.B.p)

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dist(this.B.p)
		}
		let d=p5.Vector.sub(this.B.p,this.A.p)
		let v=p5.Vector.mult(d,0.8*(1-this.l/d.mag()))
		this.A.set(v)
		v.mult(-1)
		this.B.set(v)

	}


	show(){
        stroke(0)
		strokeWeight(4)
		line(400+this.A.p.x,300-this.A.p.y,400+this.B.p.x,300-this.B.p.y)

	}
}

class Barr extends Rig{
    constructor(a=new Point(),b=new Point(),c){
        super()
		this.A=a
		this.B=b
        this.C=c

		this.l = this.A.p.dist(this.B.p)
		this.l2 = this.C.p.dist(this.A.p)
       this.lam=2

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dist(this.B.p)
		}
		let d=p5.Vector.add(this.B.p,-this.A.p)
		let v=p5.Vector.mult(d,0.8*(1-this.l/d.mag()))
		this.A.set(v)
		v.mult(-1)
		this.B.set(v)


        this.C.setp(p5.Vector.add(this.A.p,p5.Vector.mult(p5.Vector.add(this.B.p,-this.A.p),this.lam)))

	}


	show(){
        stroke(150,200,130)
		strokeWeight(4)
		line(400+this.A.p.x,300-this.A.p.y,400+this.C.p.x,300-this.C.p.y)
        this.C.show()

	}
}