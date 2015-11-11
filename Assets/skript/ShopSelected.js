#pragma strict
var Maps:GameObject[];
var selectedMap:GameObject;
var selectedPowers:GameObject[];
private var gamePlay:gameplay2;
function Start () {
	gamePlay=GetComponent(gameplay2);
	selectedPowers = new GameObject[3];
	
}

function Update () {

}

function SelectMap(mapID:int)
{
	MapsWithData
	Debug.Log(mapID);
	
	
}