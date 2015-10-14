#pragma strict
var speed:float=0.5;
@Range (0.1, 100.0)
var height:float=20;
function Start () {

}

function FixedUpdate () {
	transform.position.y=height;
	var xAxis=Input.GetAxisRaw("Horizontal");
	var yAxis=Input.GetAxisRaw("Vertical");
	if (yAxis!=0)
	{
		transform.Translate(Vector3.forward * speed*yAxis);
		//transform.translate(= transform.position.x+=xAxis*speed;
	}
	if (xAxis!=0)
	{
		transform.Translate(Vector3(xAxis,0,0) * speed);
		//transform.position.z+=yAxis*speed;
	}
	if (Input.GetKey(KeyCode.LeftControl))
	{
		height-=speed;
	} else if (Input.GetKey(KeyCode.Space))
	{
		height+=speed;

	}
}