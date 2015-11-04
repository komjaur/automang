#pragma strict



var interfaceHolders:GameObject[];


var carspawn:GameObject[];
var walkersspawn:GameObject[];

function Start () {

}

function Update () {

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