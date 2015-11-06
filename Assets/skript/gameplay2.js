#pragma strict



var interfaceHolders:GameObject[];



var Maps:GameObject[];

var CarSpawn:Transform[];
 var WalkerSpawn:Transform[];
function Start () {

}

function Update () {

}
function selectmap(mapID:int)
{
    var currentscene=GameObject.Find("currentgamescene").transform;
    //Debug.Log(currentscene.childCount);
    for (var i = currentscene.transform.childCount - 1; i >= 0; i--)
    {
        Destroy(currentscene.transform.GetChild(i).gameObject);
    }
    var currentmap = Instantiate(Maps[mapID],Vector3(0,0,0), Quaternion.Euler(Vector3(-90, 0, 0)));
    currentmap.transform.parent = currentscene;
	
    interfacefunctions(1);
    CarSpawn = new CountAndFill("spawnpoint","carspawn");
    WalkerSpawn = new CountAndFill("spawnpoint","walkerspawn");

    
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
	    
	}
	
}