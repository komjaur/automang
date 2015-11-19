#pragma strict
var MapiTrans:Transform;
var CarSpawn:Transform[];
var WalkerSpawn:Transform[];
//var MapCars:GameObjects;

function getData()
{
    Debug.Log("test");
}
function Start () {
    CarSpawn = new CountAndFill("spawnpoint","carspawn");
    WalkerSpawn = new CountAndFill("spawnpoint","walkerspawn");
}

function Update () {

}
function StartSpawningCars()
{
    /*var MapCars=MapsWithData[selectedMap].MapCars;

    var carSpawnPoint=CarSpawn[0,Random.Range(0,CarSpawn.length)].transform;
    var Car = Instantiate(M, transform.position, transform.rotation);*/
 

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