#pragma strict

var skinnidekogus=0;
var parsystem:ParticleSystem[];
var particlemeshes:Mesh[];
private var gotpoint=false;
private var speed=10;
private var dead:boolean=false;
private var v3force:Vector3;
private var startpoint:Vector3;
private var controllsystem:gameplay;
private var kere:Transform;
//private var issloweddown:boolean=false;

function Start()
{
    controllsystem=GameObject.Find("Main Camera").GetComponent(gameplay);
    kere=transform.Find("kere");
    parsystem=new ParticleSystem[2];
    parsystem[0]=transform.Find("flameparticle").GetComponent.<ParticleSystem>();
    parsystem[1]=transform.Find("dollarparticle").GetComponent.<ParticleSystem>();
	//InvokeRepeating("SlowUpdate",1,1);
	//kere=transform.Find("kere").transform;
	gameObject.SetActive (false);
}
function newstart (carspeed:float,carlane:String) {
	transform.name="car from "+carlane;
	startpoint = transform.position;
	dead=false;
	gotpoint=false;
	speed = carspeed;

	transform.rotation = Quaternion.Euler(new Vector3(0f,0f,0f));
	GetComponent.<Rigidbody>().velocity = new Vector3(0f,0f,0f); 
    GetComponent.<Rigidbody>().angularVelocity = new Vector3(0f,0f,0f);
	GetComponent.<Rigidbody>().mass = speed;
	//kere.GetComponent.<Renderer>().material = skins[Random.Range(0,skins.length)];
	var randomskin:float=(1f/skinnidekogus)*Random.Range(0,skinnidekogus);
	kere.GetComponent.<Renderer>().material.SetTextureOffset("_MainTex", Vector2(randomskin,0));
	
	//Debug.Log(randomskin);
	//renderer.material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0));
}
function speedup()
{
	
	speed=100;

	parsystem[0].Play();
}

/*function SlowUpdate()
{
	if (dead==false)
	{
		dist = Vector3.Distance(startpoint, transform.position);
		if (dist>80)
		{
			
			if (controll.gameover==false)
			{
				controll.score++;
			}
			controll.carsonfield--;
			dead=true;
			gameObject.SetActive(false);
		}
	}
}*/
function Update()
{
	if (dead==false)
	{
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position,transform.forward , hit,2))
		{
			if (hit.transform.name==transform.name)
			{
			    var othercar=hit.transform.GetComponent(carai);

				if (othercar.speed<speed && speed!=100)
				{
				    
				    speed=othercar.speed;
				  
					
					
					/*Debug(näitab collision pointe autode vahel)
					var cube : GameObject  = GameObject.CreatePrimitive(PrimitiveType.Cube);
					cube.transform.position =hit.point;
					cube.GetComponent.<Collider>().enabled=false;
					*/
				}else if (speed==100)
				{
				    othercar.speedup();
				}

			}
			//Debug.Log(hit.transform);
		}
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
function OnTriggerEnter (other : Collider) {
    if (other.gameObject.tag=="addpointcollider" && gotpoint==false)
    {
        //Debug.Log("1+");
        
        if (gameplay.gameover==false)
        {
        	//parsystem[1].renderMode.mesh = particlemeshes[1];
            gameplay.score++;
           // parsystem[1].ParticleSystemRenderMode.mesh[1];
            parsystem[1].Emit(1);
           
        }
        gotpoint=true;
    }
    if (other.gameObject.tag=="endcollider")
    {

        gameplay.carsonfield--;
        dead=true;
        gameObject.SetActive(false);
    }        
}