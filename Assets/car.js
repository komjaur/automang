//CarController1.js

 
var enginePower=150.0;

var maxSpeed=50;
var power=0.0;
var brake:float=0;
var steer:float=0;
var maxSteer=25.0;
private var currentSpeed:float=0;
private var rb:Rigidbody;
function Start(){
	rb=GetComponent.<Rigidbody>();
    rb.centerOfMass=Vector3(0,-0.5,0.3);
}
 
function Update () {
	power=Input.GetAxis("Vertical") * enginePower * Time.deltaTime * 50.0;
	steer=Input.GetAxis("Horizontal") * maxSteer;
	brake=Input.GetKey("space") ? GetComponent.<Rigidbody>().mass * 0.1: 0.0;
	if (power!=0)
	{	
		currentSpeed = rb.velocity.magnitude;

		if (currentSpeed>maxSpeed)
		{
			rb.velocity = rb.velocity.normalized *maxSpeed ;
		}else
		{
			
			rb.AddRelativeForce (Vector3.forward * power);
			
			
		}
	}

	if (steer!=0)
	{
		transform.Rotate(Vector3.up * Time.deltaTime *steer*5);
	}
}
