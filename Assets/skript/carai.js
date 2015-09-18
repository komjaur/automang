#pragma strict
var speed=10;
var dead:boolean=false;
var v3force:Vector3;
var startpoint:Vector3;
//var kere :Transform;

var dist=0;
function Start()
{
	InvokeRepeating("SlowUpdate",1,1);
	//kere=transform.Find("kere").transform;
	gameObject.SetActive (false);
}
function newstart (carspeed:int) {
	startpoint = transform.position;
	dead=false;
	speed = carspeed;
	transform.rotation = Quaternion.Euler(new Vector3(0f,0f,0f));
	GetComponent.<Rigidbody>().velocity = new Vector3(0f,0f,0f); 
    GetComponent.<Rigidbody>().angularVelocity = new Vector3(0f,0f,0f);
	GetComponent.<Rigidbody>().mass = speed;
	//renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0));
}
function speedup()
{
	
	speed=100;

}

function SlowUpdate()
{
	dist = Vector3.Distance(startpoint, transform.position);
	if (dist>80)
	{
		controll.carsonfield--;
		if (controll.gameover==false)
		{
			controll.score++;
		}
		gameObject.SetActive(false);
	}
}
function FixedUpdate () {
	
	if(dead==false)
	{
		//transform.Translate(Vector3.forward *Time.deltaTime * speed/10;
		//transform.rotation=Quaternion.Euler (tiltAroundX, 0, tiltAroundZ);
		//rigidbody.AddRelativeForce(Vector3.forward * speed*10);
		v3force=(speed*20)*transform.forward*Time.deltaTime;
		GetComponent.<Rigidbody>().velocity =v3force;
		
		
	}
}
function OnCollisionEnter(other: Collision) {
	if (other.gameObject.tag=="car")
	{
		dead=true;
		GetComponent.<Rigidbody>().freezeRotation = false;
		controll.gameover=true;
		
	}
	/*if (other.gameObject.name=="endcollider")
	{
		controll.carsonfield--;
		gameObject.active=false;
	}*/
}