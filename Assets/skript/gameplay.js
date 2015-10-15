#pragma strict



static var gameover=false;
static var carslist:Transform[];
static var carsonfield=0;
static var score=0;
static var gamestage=0;


var maxscore=0;
var maxlives=20;
var lives=20;
var newliveclock:int=300;



var anim:Animator[];
var cars:GameObject[];
var spawnpoints:Transform[];
var trafficspeed:float=40;

////Debug var
var unlimitedlives:boolean=false;
////
private var insideclock=0;
private var maxcarsonfield=5;
private var massspawning=false;

/////
var interFace:GameObject[];
var texts:UI.Text[];
var interfaceHolders:GameObject[];

//private var spawnready=true;
function Awake () {// laeme asjad sisse
	Application.targetFrameRate = 45; //45fps lock ning hojab akut kokku 
	var index=0;
	carslist = new Transform[20];
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
	var welcomebackmessage:String;
	//laeme andmed sisse kui nad on olemas
	if (PlayerPrefs.HasKey("lives"))
	{
		unlimitedlives=PlayerPrefs.GetInt("unlimitedlives")==1?true:false;
		maxscore=PlayerPrefs.GetInt("maxscore");
		
		if (unlimitedlives==false)
		{
			var timepassed:int=(System.DateTime.UtcNow - new System.DateTime(1970, 1, 1, 8, 0, 0, System.DateTimeKind.Utc)).TotalSeconds - PlayerPrefs.GetInt("leavedate");
			lives=PlayerPrefs.GetInt("lives");
			if (timepassed>0)
			{
				var newlivesamount:int=timepassed/300;
				newliveclock=(PlayerPrefs.GetInt("newliveclock")-timepassed)+(newlivesamount*300);
				
				lives+=newlivesamount;
				
				if (lives>=maxlives)
				{
					lives=maxlives;
					welcomebackmessage="maxed lifes and your were away "+ConvertSecToDate(timepassed);

				}else if (timepassed>300)
				{
					welcomebackmessage="Welcome back you were away "+ConvertSecToDate(timepassed)+" and earned "+newlivesamount+" lives";
					
				}
			}else//siis kui kasutaja muudab telefonis aega tagasi
			{
				welcomebackmessage=null;
				newliveclock=300;
			}
		}else
		{
			welcomebackmessage="Welcome back our favorite player.";
		}
	}else
	{
		welcomebackmessage=null;
	}
	if (welcomebackmessage!=null)
	{
		texts[1].text=welcomebackmessage;
		interfacefunctions(2);//näita welcomebackmessaged
	}else
	{
		interfacefunctions(0);//otse startmenüüse
	}

	
	LaneSpeedChange();
	InvokeRepeating("LaneSpeedChange", 5, 5);
	InvokeRepeating("ticktock", 1, 1);
}
function ConvertSecToDate(secound:int)
{
	var returnmessage:String;
	var min:int=0;
	var hour:int=0;
	if (secound<60)
	{
		returnmessage=secound+" secounds";
	}else if (secound>60 && secound<3600)
	{
		min=secound/60;
		secound=secound-(min*60);
		//returnmessage=min+" minutes and "+secound+" secounds";
		if (min<=1)
		{
			returnmessage+=min+" Minut and ";
		}else 
		{
			returnmessage+=min+" Minutes and ";
		}
		if (secound<=1)
		{
			returnmessage+=secound+" Secound";
		}else
		{
			returnmessage+=secound+" Secounds";
		}
		
	}else if (secound>3600 && secound<86400)
	{
		hour=secound/3600;
		min=(secound-(hour*3600))/60;
		if (hour<=1)
		{
			returnmessage+=hour+"Hour and ";
		}else
		{
			returnmessage+=hour+"Hours and ";
		}
		if (min<=1)
		{
			returnmessage+=min+" Minut";
		}else 
		{
			returnmessage+=min+" Minutes";
		}
	}
	return returnmessage;
}
function interfacefunctions(whereto:int)
{
	
	for (var i=0;i<interfaceHolders.length;i++)
	{
		if (i==whereto)
		{
			
			interfaceHolders[i].gameObject.SetActive(true);
		}else
		{
			//Debug.Log(interfaceHolders[whereto].gameObject);
			interfaceHolders[i].gameObject.SetActive(false);
		}
		
	}
	if (whereto==0)//mängu
	{
		
	}else if (whereto==1)
	{
		GetComponent(cameramovement).goback();
		
		
	}else if (whereto==2)
	{
		
	}else if (whereto==3)
	{
	    
	}
	
}

function ticktock()//lisab aega ja kiirendab mängu protsessi
{
	//Debug.Log(unlimitedlives);
	if (gameover==false)
	{
		insideclock++;
		trafficspeed=20+(insideclock/2);
		maxcarsonfield=5+(insideclock/6);
		//Debug.Log(trafficspeed);
	}
	if (unlimitedlives==false)
	{
		if (lives<maxlives)
		{
			
			
			newliveclock--;
			if (newliveclock<=0)
			{
				lives++;
				newliveclock=300;
			}
			texts[2].text=lives+"/"+maxlives;
			texts[3].text=newliveclock+"";
			
		}
	}else
	{
		texts[2].text="∞/∞";
		texts[3].text="∞";
	}
	
		
	
}
function LaneSpeedChange()
{
	//Debug.Log(gameover);
	for (var i = 0; i < spawnpoints.Length; i++) 
	{
		var randomspeed=Random.Range(trafficspeed-10,trafficspeed+20);
    	spawnpoints[i].name="lane"+i+":"+randomspeed;
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
				//.Log(carsonfield+"SHOOT");
				carslist[i].transform.position=chosenspawn.transform.position;
				var cardata=chosenspawn.name.Split(':'[0]);

				carslist[i].transform.GetComponent(carai).newstart(parseFloat(cardata[1]),cardata[0]);
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
	Debug.Log("end");
	interFace[0].gameObject.SetActive(true);//teeme restart buttoni nähtavaks
	
	if (score>maxscore)
	{
		maxscore=score;
	}
	ChangeData(0);
	yield WaitForSeconds(2);
	if (gameover==true)
	{
		interfacefunctions(3);
	}
}
function newgame()//resetime mängu
{
	
	if (lives>0 || unlimitedlives==true)
	{
		for(var i = 0; i < carslist.Length; i++)
		{
			carslist[i].gameObject.SetActive(false);
		}
		interFace[0].gameObject.SetActive(false);//teeme restart buttoni nähtamatuks
		gameover=false;
		score=0;
		insideclock=0;
		carsonfield=0;
		manualspawning();
		LaneSpeedChange();
		lives--;
		interfacefunctions(1);
	}
	ChangeData(0);
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
	texts[0].text=score+"";
	//+"/"+maxscore
	//Debug.Log(carsonfield);
	if (carsonfield<maxcarsonfield && massspawning==true)
	{
		releasecar();
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
					//Debug.Log("number one");
				}else//teeb autodele clickamise lihtsamaks
				{
					 
				     var gos = GameObject.FindGameObjectsWithTag("car"); 
				     var closest : GameObject; 
				     var distance = Mathf.Infinity; 
				     var position = transform.position; 
				     // Iterate through them and find the closest one
				     for (var go : GameObject in gos)  { 
				         var diff = (go.transform.position - hit.point);
				         var curDistance = diff.sqrMagnitude; 
				         if (curDistance < distance) { 
				             
				             closest=go;
				             distance = curDistance; 
				         } 
				     } 
				     if (distance<20)
				     {
				     	closest.transform.GetComponent(carai).speedup();
				     	//Debug.Log("number two");
				     }
				}
			}
		}
	}

	if (Input.GetKeyDown(KeyCode.Escape)) //sulgeme mängu
	{
		ChangeData(0);
    	Application.Quit(); 
    }
}

function ChangeData(option:int)
{
	if (option==0)//savedata
	{

		PlayerPrefs.SetInt("leavedate",(System.DateTime.UtcNow - new System.DateTime(1970, 1, 1, 8, 0, 0, System.DateTimeKind.Utc)).TotalSeconds);
		PlayerPrefs.SetInt("lives",lives);
		PlayerPrefs.SetInt("unlimitedlives",unlimitedlives?1:0);
		PlayerPrefs.SetInt("newliveclock",newliveclock);
		PlayerPrefs.SetInt("maxscore",maxscore);
	}else if (option==1)//deletedata
	{
		PlayerPrefs.DeleteAll();
		ChangeData(0);
	}else if (option==2)//muuda framerate DEBUG
	{
		Application.targetFrameRate = parseInt(GameObject.Find('maxfpsget').GetComponent(UI.Text).text);
	}else if (option==3)//muuda framerate DEBUG
	{
		unlimitedlives=unlimitedlives ? false : true;
		if (unlimitedlives==false)
		{
			lives=30;
		}
	}
	
}

