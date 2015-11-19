#pragma strict
static var raha=3000000;
//var shopScript:ShopSelected;
var rahatext:UI.Text;



var interfaceHolders:GameObject[];
var selectedPowers:int[];
var selectedMap:int;



public var MapsWithData : CustomClass.mapData[];
public var PowersWithData : CustomClass.powerData[];
var uiObject:GameObject[];


private var firstTimeMap:boolean=true;
private var firstTimePower:boolean=true;
//private var map : Map;
function Start () {
	selectedPowers = new int[3];
	for (var x=0;x<selectedPowers.length;x++)
	{
		selectedPowers[x]=-1;
	}
}

function Update () {
	rahatext.text=raha+"";
	
	
}
function SpawnMap()
{
    var currentScene: GameObject = GameObject.Find("Scene");
    if (currentScene==null)
    {
        Destroy(currentScene.transform);
    }else
    {
        currentScene = new GameObject("Scene");
        currentScene.AddComponent.<"game">();
        var sceneBrain = currentScene.GetComponent(game);
        sceneBrain.MapiTrans = MapsWithData[selectedMap].mapTransform.transform;
    }

    //var currentscene=GameObject.Find("Game Scene").transform;
    

    //Debug.Log(currentscene.childCount);
    
    /*var currentmap = Instantiate(MapsWithData[selectedMap].mapTransform.transform,Vector3(0,0,0), Quaternion.Euler(Vector3(-90, 0, 0)));
    currentmap.transform.parent = currentscene;*/
	
    interfacefunctions(1);
 

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

		
		
	}else if (whereto==2)
	{
		
	}else if (whereto==3)
	{
	    
	}else if (whereto==4)
	{
	}else if (whereto==5)
	{
		var powerParent = interfaceHolders[5].gameObject.Find("powershop").transform;
		var SPLlist = interfaceHolders[5].transform.FindChild("SPLlist");
		var counter=0;
		for(var slots:Transform in SPLlist)
		{
			if (selectedPowers[counter]!=-1)
			{
				slots.GetComponent(UI.Image).sprite=PowersWithData[selectedPowers[counter]].powerIcon;
			}else
			{
				slots.GetComponent(UI.Image).sprite=null;
			}
			counter++;
			
		}
		for (var px=0;px<PowersWithData.length;px++)
		{
			var powerholder:Transform;
			if (firstTimePower==true)
			{
				powerholder = Instantiate(uiObject[1].transform,Vector2(0,-(px*150)),powerParent.rotation);
				powerholder.SetParent(powerParent, false);
				powerholder.name="power ID="+px;
			}else
			{
				powerholder = gameObject.Find("power ID="+px).transform;
			}
			powerholder.transform.FindChild("powername").GetComponent(UI.Text).text = PowersWithData[px].powerName;
			powerholder.transform.FindChild("powerslider").GetComponent(UnityEngine.UI.Slider).value=PowersWithData[px].powerCurrentlevel;
			var powerimage = powerholder.transform.FindChild("powerimage");
			powerimage.GetComponent(UI.Image).sprite = PowersWithData[px].powerIcon;
			powerimage.transform.FindChild("powerprice").GetComponent(UI.Text).text = PowersWithData[px].powerPrice +"$";
			
			
			
			var powerbutton = powerholder.transform.FindChild("powerinfo");
			powerbutton.GetComponent(UI.Button).onClick.RemoveAllListeners();
			powerbutton.GetComponent(UI.Button).onClick.AddListener(Adapt(OpenInfo,px));
		}
		firstTimePower=false;
	}else if (whereto==6)
	{
		var mapParent = interfaceHolders[6].gameObject.Find("mapshop").transform;
		
		for (var mx=0;mx<MapsWithData.length;mx++)
		{
			if(firstTimeMap==true)
			{
				var mapholder = Instantiate(uiObject[0].transform,Vector2((mx*300)+150,0),mapParent.rotation);
				mapholder.SetParent(mapParent, false);
				mapholder.name="map ID="+mx;
				
			}
			mapUIupdate(mx);
			
			
		}
		firstTimeMap=false;
	}
	
}
function UpgradePower(ID:int)
{
	if(raha>=PowersWithData[ID].powerPrice && PowersWithData[ID].powerCurrentlevel<PowersWithData[ID].powerMaxlevel)
	{
		if (PowersWithData[ID].isLocked==true)
		{
			PowersWithData[ID].isLocked=false;
		}
		PowersWithData[ID].powerCurrentlevel++;
		raha-=PowersWithData[ID].powerPrice;
		PowersWithData[ID].powerPrice+=(Mathf.Round(PowersWithData[ID].powerPrice * (PowersWithData[ID].powerCurrentlevel + Random.Range(1.2,2.1))))/10;
	}
	OpenInfo(ID);
	Debug.Log("UpgradePower");
	
}
function SelectPower(ID:int,trans:Transform)
{

	
	for (var x=0;x<selectedPowers.length;x++)
	{
		if (selectedPowers[x]==ID)
		{
			selectedPowers[x]=-1;
			trans.transform.parent.FindChild(x.ToString()).GetComponent(UI.Image).sprite = null;

		}
	}
	trans.GetComponent(UI.Image).sprite=PowersWithData[ID].powerIcon;
	selectedPowers[parseInt(trans.name)]=ID;
	Debug.Log("SelectPower");
}
function OpenInfo(ID:int)
{
	var panel = uiObject[2].transform;
	var slotpanel =uiObject[3].gameObject;
	slotpanel.SetActive(slotpanel.activeInHierarchy);
	panel.gameObject.SetActive(true);
	panel.transform.FindChild("pealkiri").GetComponent(UI.Text).text=PowersWithData[ID].powerName;
	panel.transform.FindChild("kirjeldus").GetComponent(UI.Text).text=PowersWithData[ID].powerInfo;
	panel.transform.FindChild("icon").GetComponent(UI.Image).sprite=PowersWithData[ID].powerIcon;
	panel.transform.FindChild("level").GetComponent(UI.Text).text="Level \n "+PowersWithData[ID].powerCurrentlevel+"/"+PowersWithData[ID].powerMaxlevel;
	panel.transform.FindChild("price").GetComponent(UI.Text).text=PowersWithData[ID].powerPrice+"$";
	
	var Upgrade = panel.transform.FindChild("buy");
	if (PowersWithData[ID].powerCurrentlevel<=PowersWithData[ID].powerMaxlevel-1)
	{
		Upgrade.gameObject.SetActive(true);
		Upgrade.GetComponent(UI.Button).onClick.RemoveAllListeners();
		Upgrade.GetComponent(UI.Button).onClick.AddListener(Adapt(UpgradePower,ID));
	}else
	{
		Upgrade.gameObject.SetActive(false);
	}
	var selectButton = panel.transform.FindChild("infoselect");
	if (PowersWithData[ID].isLocked==true)
	{
		selectButton.gameObject.SetActive(false);
	}else
	{
		
		selectButton.gameObject.SetActive(true);
		
		selectButton.GetComponent(UI.Button).onClick.RemoveAllListeners();
		selectButton.GetComponent(UI.Button).onClick.AddListener(
			function() {
				var powerslotsall=uiObject[3].transform;
				powerslotsall.gameObject.SetActive(true);
				var powerslot=powerslotsall.transform.FindChild("slots");
				var counter=0;
				for(var slots:Transform in powerslot)
				{
					var slotimage=slots.GetComponent(UI.Image);
					
					if (selectedPowers[counter]!=-1)
					{
						slotimage.sprite=PowersWithData[selectedPowers[counter]].powerIcon;
					}
					slots.GetComponent(UI.Button).onClick.RemoveAllListeners();
					slots.GetComponent(UI.Button).onClick.AddListener(Adapt2(SelectPower,ID,slotimage.transform));
					counter++;
				}
				//Debug.Log("uiObject[3].transform.gameObject.SetActive(true)");
			} 
		);
		
	}
	Debug.Log("OpenInfo");
	
}
function CloseInfo()
{	
	uiObject[2].gameObject.SetActive(false);
	interfacefunctions(5);
	Debug.Log("CloseInfo");
}
function mapUIupdate(mapID:int)
{
	var mapholder = gameObject.Find("map ID="+mapID);
	var mapScore = mapholder.transform.FindChild("bestScore").GetComponent(UI.Text);
	var mapButton = mapholder.transform.FindChild("mapButton");
	mapButton.GetComponent(UI.Button).onClick.RemoveAllListeners();
	mapButton.GetComponent(UI.Button).onClick.AddListener(Adapt(SelectMap, mapID));
	
	if (MapsWithData[mapID].isLocked == true)
	{
		mapScore.text = "Locked\n"+MapsWithData[mapID].mapPrice+" $";
		
		if (raha>=MapsWithData[mapID].mapPrice)
		{
			mapButton.FindChild("Text").GetComponent(UI.Text).text = "UnLock";
			mapButton.GetComponent(UI.Image).color = Color32(255,255,130,255);
		}else
		{
			
			mapButton.FindChild("Text").GetComponent(UI.Text).text = "Not enuf money";
			mapButton.GetComponent(UI.Image).color = Color32(112, 112,112,255);
		}
		
	}else
	{
		mapButton.GetComponent(UI.Image).color = Color32(255,255,255,255);
		mapScore.text = "Best Score\n"+MapsWithData[mapID].bestScore+"";
		mapButton.FindChild("Text").GetComponent(UI.Text).text = "Select";
	}
	
	mapholder.transform.FindChild("mapIcon").GetComponent(UI.Image).sprite = MapsWithData[mapID].mapIcon;
	mapholder.transform.FindChild("mapName").GetComponent(UI.Text).text = MapsWithData[mapID].levelName;
	Debug.Log("mapUIupdate "+mapID);
}
function SelectMap(mapID:int)
{
	var map = MapsWithData[mapID];
	Debug.Log(map.isLocked+"/"+map.mapPrice);
	if (map.isLocked==true)
	{
		if (map.mapPrice<=raha)
		{
			map.isLocked=false;
			raha-=map.mapPrice;
			mapUIupdate(mapID);
		}
	}else
	{
		interfacefunctions(5);
		selectedMap=mapID;
	}
	
	//if (map.mapPrice>=raha)
	
	
	
	
}

//mul pole endal aimugi mis ma siin tegin.Leiutasin või midagi.
function Adapt2(callback : function(int,Transform), value : int, trans : Transform) : function()
 {
     return function () { callback (value,trans); };
 }
function Adapt(callback : function(int), value : int) : function()
 {
     return function () { callback (value); };
 }