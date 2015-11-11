#pragma strict
static var raha=30000;
//var shopScript:ShopSelected;
var rahatext:UI.Text;



var interfaceHolders:GameObject[];




public var MapsWithData : CustomClass.mapData[];
public var PowersWithData : CustomClass.powerData[];
var uiObject:GameObject[];
var CarSpawn:Transform[];
var WalkerSpawn:Transform[];

private var firstTime:boolean=true;
//private var map : Map;
function Start () {
	
	
}

function Update () {
	rahatext.text=raha+"";
	
	
}
function SpawnMap()
{
	
   /* var currentscene=GameObject.Find("currentgamescene").transform;
    //Debug.Log(currentscene.childCount);
    for (var i = currentscene.transform.childCount - 1; i >= 0; i--)
    {
        Destroy(currentscene.transform.GetChild(i).gameObject);
    }
    var currentmap = Instantiate(Maps[mapID],Vector3(0,0,0), Quaternion.Euler(Vector3(-90, 0, 0)));
    currentmap.transform.parent = currentscene;
	
    interfacefunctions(1);
    CarSpawn = new CountAndFill("spawnpoint","carspawn");
    WalkerSpawn = new CountAndFill("spawnpoint","walkerspawn");*/

    
}

function CountAndFill(tagName : String ,objectName : String)
{
    var objects = GameObject.FindGameObjectsWithTag(tagName);
    var array :Transform[];
    for (var x=0;x<3;x++)
    {
        var counter = 0;
        for(var object in objects)
        {
            if (object.name == objectName)
            {

                if (x == 1)
                {
                    array[counter] = object.gameObject.transform;
                }
                counter++;
            }
    
        }
        if (x == 0)
        {
            array = new Transform[counter];
        }
    }
    return array;
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
	    
	}else if (whereto==4)
	{
	}else if (whereto==5)
	{
		var powerParent = interfaceHolders[5].gameObject.Find("powershop").transform;
		for (var px=0;px<PowersWithData.length;px++)
		{
			var powerholder = Instantiate(uiObject[1].transform,Vector2(0,-(px*150)),powerParent.rotation);
			powerholder.SetParent(powerParent, false);
			powerholder.name="power ID="+px;
			powerholder.transform.FindChild("powername").GetComponent(UI.Text).text = PowersWithData[px].powerName;
			var powerimage = powerholder.transform.FindChild("powerimage");
			powerimage.GetComponent(UI.Image).sprite = PowersWithData[px].powerIcon;
			powerimage.transform.FindChild("powerprice").GetComponent(UI.Text).text = PowersWithData[px].powerPrice +"$";
		}
	}else if (whereto==6)
	{
		var mapParent = interfaceHolders[6].gameObject.Find("mapshop").transform;
		
		for (var mx=0;mx<MapsWithData.length;mx++)
		{
			if(firstTime==true)
			{
				var mapholder = Instantiate(uiObject[0].transform,Vector2((mx*300)+150,0),mapParent.rotation);
				mapholder.SetParent(mapParent, false);
				mapholder.name="map ID="+mx;
				
			}
			mapUIupdate(mx);
	
			
		}
		firstTime=false;
	}
	
}
function mapUIupdate(mapID:int)
{
	var mapholder = gameObject.Find("map ID="+mapID);
	var mapScore = mapholder.transform.FindChild("bestScore").GetComponent(UI.Text);
	var mapButton = mapholder.transform.FindChild("mapButton");
	
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
	}
	
	//if (map.mapPrice>=raha)
	
	
	
	
}
function Adapt(callback : function(int), value : int) : function()
 {
     return function () { callback (value); };
 }