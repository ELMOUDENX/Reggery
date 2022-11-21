
function fromscreen(x,y){
	return (mouseX-400,300-mouseY)
}
class Vect{
	constructor(x=0,y=0){
		this.x=x
		this.y=y

	}
	neg(){
		return new Vect(-this.x,-this.y)
	}
	add(v){
		return  new Vect(this.x+v.x,this.y+v.y)
	}
	
	min(v){
		return  new Vect(this.x-v.x,this.y-v.y)
	}
	mul(v){
		return new Vect(this.x*v,this.y*v)
	}
	abs(){
		return ((this.x)**2+(this.y)**2)**0.5
	}
	dis(o){
		return ((this.x-o.x)**2+(this.y-o.y)**2)**0.5
	}

    get point(){
        return new Point(this.x,this.y)
    }
}



class Point{
	constructor(x=0,y=0){
		this.p=new Vect(x,y)
		this.fix=false
		this.selected=false
	}
    
	set(v){

		if(!this.fix) this.p = this.p.add(v)	
		
	}

    setp(v){

		if(!this.fix) this.p = v
		
	}
	chng() {

	}
	update(){
		if(!this.fix && !this.selected && grav) this.p = this.p.add(new Vect(0,-1))
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
		this.c=new Vect(x,y)
		this.fix=true
		this.selected=false
		this.r=r
		//this.link=new Rigg()
	}
	chng(){
		if (keyIsDown(88)) {
			this.r=this.c.dis(this.p)
		}
	}
	update(){

		this.p=new Vect(this.c.x+this.r*cos(t),this.c.y+this.r*sin(t))
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
		this.l=this.A.p.dis(this.B.p)

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dis(this.B.p)
		}
		let d=this.B.p.min(this.A.p)
		let v=d.mul(0.8*(1-this.l/d.abs()))
		this.A.set(v)
		this.B.set(v.neg())

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

		this.l = this.A.p.dis(this.B.p)
		this.l2 = this.C.p.dis(this.A.p)
       this.lam=2

	}

	update(){
		if (keyIsDown(88)) {
			this.l=this.A.p.dis(this.B.p)
		}
		let d=this.B.p.min(this.A.p)
		let v=d.mul(0.8*(1-this.l/d.abs()))
		this.A.set(v)
		this.B.set(v.neg())
        this.C.setp(this.A.p.add(this.B.p.min(this.A.p).mul(this.lam)))

	}


	show(){
        stroke(150,200,130)
		strokeWeight(4)
		line(400+this.A.p.x,300-this.A.p.y,400+this.C.p.x,300-this.C.p.y)
        this.C.show()

	}
}