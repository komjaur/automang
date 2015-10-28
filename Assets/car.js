#pragma strict
var redlineRPM:float = 6150;
var maxRPM:float = 7000;

var finalDrive:float;
var gearRatios:float[];

//public bool hasAutoTransmission = true;
     

var damagePerc:float; //??
     

private var currentRPM:float;
private var currentDamage:float;
private var currentSpeed:float;
var currentGear:int;
private var reverse:boolean;
private var maxDamage:float = 100;

function Awake()
{
    //tireCircumference = tireDimensions.Circumference / 12;
}
  
function Update()
{
    var changeUp:boolean = Input.GetKeyDown(KeyCode.Q);
    var changeDown:boolean = Input.GetKeyDown(KeyCode.A);
    if (changeUp || changeDown)
    {
        ChangeGear(changeUp);
    }
         
    reverse = Input.GetKey(KeyCode.DownArrow);
    if(Input.GetKey(KeyCode.UpArrow))
    {
        if(currentRPM < maxRPM)
        {
            currentRPM += 10;
        }
    }
    else
    {
        currentRPM -= reverse ? 15 : 5;
    }    
    if (currentRPM < 0) 
    {
        currentRPM = 0;
    }
         
 
    currentSpeed = ((currentRPM * 0.2) / (gearRatios[currentGear] * finalDrive * 88));// * 0.44704f;    // 1 mph = 0.44704 m/s
  
    Debug.Log(currentSpeed);
         
    // move the object
    transform.Translate(Vector3.forward * ( Time.deltaTime) / 2);
}
     
function ChangeGear(changeUp:boolean)
{
    Debug.Log(changeUp);     
    if ((changeUp && currentGear < gearRatios.Length-1) || (!changeUp && currentGear > 0))
    {
        currentGear += (changeUp ? 1 : -1);
        //currentRPM *= (changeUp ? 0.5f : 2);
    }
}
     

/*var maxSpeed:float;
var maxDamage:int;
var maxGear:int;
var maxRPM:int;
var manualGearing:boolean;
var currSpeed:float;
private var currDamage:int;
var currRPM:int;
private var redRPM:int;
private var gear:int;


var rb: Rigidbody;
function Start () {
    rb = GetComponent.<Rigidbody>();

}
function GearUp()
{


}
function Update () {
    
    
    //currentSpeed = ((currentRPM * tireCircumference) / (gearRatios[currentGear] * finalDrive * 88))
    currSpeed = (currRPM / 2 );
    if (Input.GetKey ("space"))
    {
        
        if(currRPM < maxRPM)
        {
            currRPM += 10;
        }
        rb.AddForce(transform.forward * Time.deltaTime*currSpeed);
        //transform.Translate(Vector3.forward * Time.deltaTime*currSpeed);
    }else
    {
        currRPM -=10;
    }
    if (currRPM < 0) 
    {
        currRPM = 0;  
    }
}*/
