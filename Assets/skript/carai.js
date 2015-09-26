#pragma strict

var skinnidekogus=0;
var parsystem:ParticleSystem;

private var dist=0;
private var speed=10;
private var dead:boolean=false;
private var v3force:Vector3;
private var startpoint:Vector3;
private var controllsystem:controll;
private var kere:Transform;


function Start()
{
	controllsystem=GameObject.Find("Main Camera").GetComponent(controll);
	kere=transform.Find("kere");
	parsystem=transform.Find("particlesystem").GetComponent.<ParticleSystem>();
	InvokeRepeating("SlowUpdate",1,1);
	//kere=transform.Find("kere").transform;
	gameObject.SetActive (false);
}
function newstart (carspeed:float) {
	startpoint = transform.position;
	dead=false;
	speed = carspeed;
	transform.rotation = Quaternion.Euler(new Vector3(0f,0f,0f));
	GetComponent.<Rigidbody>().velocity = new Vector3(0f,0f,0f); 
    GetComponent.<Rigidbody>().angularVelocity = new Vector3(0f,0f,0f);
	GetComponent.<Rigidbody>().mass = speed;
	//kere.GetComponent.<Renderer>().material = skins[Random.Range(0,skins.length)];
	var randomskin:float=(1f/skinnidekogus)*Random.Range(0,skinnidekogus);
	kere.GetComponent.<Renderer>().material.SetTextureOffset("_MainTex", Vector2(randomskin,0));
	Debug.Log(randomskin);
	//renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0));
}
function speedup()
{
	
	speed=100;
	parsystem.Play();
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
		if (controllsystem.gameover==false)
		{
			controllsystem.endgame();
		}

		
	}
	/*if (other.gameObject.name=="endcollider")
	{
		controll.carsonfield--;
		gameObject.active=false;
	}*/
}