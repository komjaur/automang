#pragma strict
var target:Transform;
function Start () {

}

function Update () {
    transform.position= Vector3(target.position.x+30, 50, target.position.z+30);
}