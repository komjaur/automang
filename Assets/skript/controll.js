#pragma strict
static var gameover=false;
static var carslist:Transform[];
static var carsonfield=0;
static var score=0;

var cars:GameObject[];
var spawnpoints:Transform[];
var trafficspeed:float=40;

private var clock=0;
private var maxcarsonfield=5;
private var massspawning=false;

var scoretext:UI.Text;
var interFace:GameObject[];
var interfaceHolders:GameObject[];

//private var spawnready=true;
function Awake () {// laeme asjad sisse
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
	//Time.timeScale =0.5;
	LaneSpeedChange();
	InvokeRepeating("LaneSpeedChange", 5, 5);
	InvokeRepeating("ticktock", 1, 1);
}
function interfacefunctions(whereto:int)
{
	if (whereto==0)
	{
		interfaceHolders[0].gameObject.SetActive(false);//startmenu läheb nähtamatuks
		interfaceHolders[1].gameObject.SetActive(true);//ingame läheb nähtavaks
		newgame();
	}
}

function ticktock()
{
	if (gameover==false)
	{
		clock++;
		trafficspeed=20+(clock/2);
		maxcarsonfield=5+(clock/4);
		//Debug.Log(trafficspeed);
	}
	
}
function LaneSpeedChange()
{
	//Debug.Log(gameover);
	for (var i = 0; i < spawnpoints.Length; i++) 
	{
		var randomspeed=Random.Range(trafficspeed-10,trafficspeed+20);
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
		    if (carslist[i].gameObject.activeInHierarchy==false && carsonfield<maxcarsonfield) 
			{

				carslist[i].gameObject.SetActive(true);
				carsonfield++;
				Debug.Log(carsonfield+"SHOOT");
				carslist[i].transform.position=chosenspawn.transform.position;
				var carspeed=parseFloat(chosenspawn.name);
				carslist[i].transform.GetComponent(carai).newstart(carspeed);
				carslist[i].transform.rotation=chosenspawn.transform.rotation;
				chosenspawn.SetActive (false);
				
				yield WaitForSeconds(1);
				chosenspawn.SetActive (true);
				// spawnready=true;
				break;
			}
		}
	}
		 
	
	//activecars[carsonfield].
	
	
}
function endgame()
{
	gameover=true;
	interFace[0].gameObject.SetActive(true);//teeme restart buttoni nähtavaks
}
function newgame()//resetime mängu
{
	 for(var i = 0; i < carslist.Length; i++)
	 {
	 	carslist[i].gameObject.SetActive(false);
	 	
	 }
	 interFace[0].gameObject.SetActive(false);//teeme restart buttoni nähtamatuks
	 gameover=false;
	 score=0;
	 clock=0;
	 carsonfield=0;
	 manualspawning();
}
function manualspawning()
{
	massspawning=false;
	for (var x=0;x<4;x++)
	{
		releasecar();
		//Debug.Log(x);
		yield WaitForSeconds(0.5);
	}
	massspawning=true;
}
function Update () {
	scoretext.text=score+"";
	//Debug.Log(carsonfield);
	if (carsonfield<maxcarsonfield && massspawning==true)
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
		}
	}
	if ( Input.GetMouseButtonDown(1))
	{
		if (carsonfield<maxcarsonfield)
		{
			releasecar();

		}
	}
	if (Input.GetKeyDown(KeyCode.Escape)) //sulgeme mängu
	{
    	Application.Quit(); 
    }
}



