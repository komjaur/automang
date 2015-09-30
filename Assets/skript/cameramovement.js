#pragma strict

@Range (0.5, 100.0)
var speed=5;

//private var direction=0;
private var needtogoback:boolean=false;
private var startingpoint:Vector3;
private var journeyLength:float;
private var startTime:float;
function Awake () {
	startingpoint=transform.position;
}
function Start () {

}
function goback()
{
	//direction=AngleDir(transform.forward, startingpoint-transform.position, transform.up);
	journeyLength = Vector3.Distance(transform.position, startingpoint);
	startTime = Time.time;
	needtogoback=true;
}

/*function AngleDir(fwd: Vector3, targetDir: Vector3, up: Vector3) {
	var perp: Vector3 = Vector3.Cross(fwd, targetDir);
	var dir: float = Vector3.Dot(perp, up);
	
	if (dir > 0.0) {
		return 1.0;
	} else if (dir < 0.0) {
		return -1.0;
	} else {
		return 0.0;
	}
}*/
function FixedUpdate () {
	if (gameplay.gamestage==0)
	{
		transform.RotateAround (Vector3.zero, Vector3.up, speed * Time.deltaTime);

		var fracJourney = ((Time.time - startTime) * 5) / journeyLength;
		if (Vector3.Distance(transform.position,startingpoint) > 0.1 && needtogoback==true)
		{
			//Debug.Log(Vector3.Distance(transform.position,startingpoint));
			//transform.eulerAngles = Vector3.Lerp(transform.rotation.eulerAngles,startingpoint, Time.deltaTime);
			//transform.RotateAround (Vector3.zero, Vector3.up, -direction*10 * Time.deltaTime);
			transform.position = Vector3.Lerp(transform.position,startingpoint, fracJourney);
		}else if (needtogoback==true)
		{
			needtogoback=false;
			gameplay.gamestage=1;
			GetComponent(gameplay).newgame();
		}
		transform.LookAt(Vector3.zero);
	}
}