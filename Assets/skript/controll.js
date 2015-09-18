#pragma strict
static var gameover=false;
static var carslist:Transform[];
static var carsonfield=0;
static var score=0;

var cars:GameObject[];
var spawnpoints:Transform[];
var trafficspeed:int=40;

private var canspawn:float=3;
private var maxcarsonfield=6;

//ui
var scoretext:UI.Text;




//private var spawnready=true;
function Awake () {
	Application.targetFrameRate = 30; //30fps lock ning hojab akut kokku 
	var index=0;

	carslist = new Transform[10];
	
	for(var i=0;i<carslist.Length;i++)//genereerime objektid ainult ühe korra sest Instantiate ja destroy on suht mahukad funktsioonid
	{
		var car = Instantiate(cars[index],Vector3(0,0,0),Quaternion.Euler(0, 0, 0));
		carslist[i]=car.transform;
		
		
		
		index++;
		if (index>=cars.Length)
		{
			index=0;
		}
		
	}
	LaneSpeedChange();
	
}
function Start()
{
	InvokeRepeating("LaneSpeedChange", 5, 5);
}
function LaneSpeedChange()
{

	for (var i = 0; i < spawnpoints.Length; i++) 
	{
		var randomspeed=Random.Range(trafficspeed-20,trafficspeed+30);
    	spawnpoints[i].name=randomspeed+"";
	}
}

function releasecar()// kasutame autosid uuesti mitte ei tee uusi koguaeg
{
	//yield WaitForSeconds(wait);
	var activespawns = new ArrayList();
	//Debug.Log(wait);
	for (var y = 0; y < spawnpoints.Length; y++) 
	{
	    if (spawnpoints[y].gameObject.activeInHierarchy==true) 
		{
			activespawns.Add(spawnpoints[y].gameObject);
			//Debug.Log(spawnpoints[y]);
		}
	}
	//Debug.Log(activespawns.Count);
	if (activespawns.Count!=0)
	{
		
		var randomspawn=Random.Range(0,activespawns.Count);
		var chosenspawn:GameObject=activespawns[randomspawn] as GameObject;
		//Debug.Log(activespawns.Count);
		//Debug.Log(inactivecars+"/"+activespawns);
		for (var i = Random.Range(0,carslist.Length); i < carslist.Length; i++) 
		{
		    if (carslist[i].gameObject.activeInHierarchy==false) 
			{

				
				
				
				carslist[i].gameObject.SetActive(true);

				carslist[i].transform.position=chosenspawn.transform.position;
				var carspeed=parseInt(chosenspawn.name);
				carslist[i].transform.GetComponent(carai).newstart(carspeed);
				carslist[i].transform.rotation=chosenspawn.transform.rotation;
				chosenspawn.SetActive (false);
				carsonfield++;
				yield WaitForSeconds(1);
				chosenspawn.SetActive (true);
				// spawnready=true;
				break; //this "quits" the for loop, you don't need to check the rest of the items if you already found one that's not active
			}
		}
	}
		 
	
	//activecars[carsonfield].
	
	
}
function newgame()//resetime mängu
{
	 score=0;
	 for(var i = 0; i < carslist.Length; i++)
	 {
	 	carslist[i].gameObject.SetActive(false);
	 	
	 }
	 carsonfield=0;
	 gameover=false;
}
function Update () {
	scoretext.text=score+"";
	
	if (carsonfield<=maxcarsonfield)
	{
		releasecar();
		
		//spawnready=false;
	}
	
	if ( Input.GetMouseButtonDown(0))//tuvastame kas vajutasime autole peale
	{
		if (gameover==false)
			{
			var hit : RaycastHit;
			var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			
			if (Physics.Raycast (ray, hit, 100.0))
			{
				//Debug.Log(hit.transform.tag);
				if (hit.transform.tag=="car")
				{
					hit.transform.GetComponent(carai).speedup();
					//Debug.Log(hit.transform.parent);
				}
			}
		}else
		{
			newgame();
		}
	}
	if (Input.GetKeyDown(KeyCode.Escape)) //sulgeme mängu
	{
    	Application.Quit(); 
    }
}



