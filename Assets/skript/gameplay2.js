#pragma strict



var interfaceHolders:GameObject[];


var carspawn:GameObject[];
var walkersspawn:GameObject[];
var Maps:GameObject[];
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
	/*
	switch (mapid)
    {
	    case 1:
	        
	        break;
	    case 2:
	        print ("Hello and good day!");
	        break;
	    case 3:
	        print ("Whadya want?");
	        break;
	    case 4:
	        print ("Grog SMASH!");
	        break;
	    case 5:
	        print ("Ulg, glib, Pblblblblb");
	        break;
	    default:
	        print ("ei ole sellist mapi");
	        break;
    }
    */
    
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