#pragma strict

public class CustomClass extends MonoBehaviour
{
    public class mapData
    {
        public var levelName : String;
        public var bestScore : int;
        public var mapPrice : int;
        public var mapTransform : GameObject;
		public var mapInfo : String;
        public var mapIcon : Sprite;
        public var isLocked : boolean;
        public var MapCars:car[];
  
    }
	 public class powerData
    {
        public var powerName : String;
        public var powerDuration:float;
        public var powerPrice : int;
        public var powerCurrentlevel : int=0;
        public var powerMaxlevel : int;
        public var powerIcon : Sprite;
        public var powerInfo : String;
        public var isUpgradeble : boolean;
        public var isSelectible: boolean;
        public var isLocked : boolean;
              
  
    }
    public class car
    {
        public var CarName:String;
        public var CarLevel:int;
        public var CarModel:GameObject;
    }
    
    function Start ()
    {
	
    }
}