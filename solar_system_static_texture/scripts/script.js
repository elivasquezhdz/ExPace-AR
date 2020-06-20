var Scene= require("Scene")
var TouchGestures= require("TouchGestures")
var Time= require("Time")
var Diag= require("Diagnostics")
const Patches = require('Patches');

var solarSystem= Scene.root.find("solarSystem")
var solarSystemWrapper= Scene.root.find("solarSystemWrapper")

var solarSystemWrapperTransform= solarSystemWrapper.transform

/*
//on pan
TouchGestures.onPan().subscribe((gesture)=>{
    planeTracker.trackPoint(gesture.location, gesture.state)
})

//on pinch

TouchGestures.onPinch().subscribeWithSnapshot({
    'lastScaleX': solarSystemTransform.scaleX,//.pinLastValue(),
    'lastScaleY': solarSystemTransform.scaleY,//.pinLastValue(),
    'lastScaleZ': solarSystemTransform.scaleZ,//.pinLastValue()
}, (gesture,snapshot)=>{
    var newScaleX= gesture.scale.mul(snapshot.lastScaleX)
    var newScaleY= gesture.scale.mul(snapshot.lastScaleY)
    var newScaleZ= gesture.scale.mul(snapshot.lastScaleZ)
    
        solarSystemTransform.scaleX= newScaleX
        solarSystemTransform.scaleY= newScaleY
        solarSystemTransform.scaleZ= newScaleZ
    
    
})
*/

Diag.log("Hello from here")

var planets= ["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"]

//rotate
TouchGestures.onRotate(solarSystemWrapper).subscribe((gesture)=>{
    const lastRotationZ= solarSystemWrapperTransform.rotationZ.pinLastValue()

    solarSystemWrapperTransform.rotationZ= gesture.rotation.mul(-1).add(lastRotationZ)
})

var planetsData={
    "mercury":{
        "revolving":true,
        "data":{
            "mass": 0.330,
            "diameter": 4897,
            "dfs": 57.9,
            "lfd": 4222.6,
            "lfy": 88,
            "mean_temp": 167,
            "no_moons": 0
        }
    },

    "venus":{
        "revolving":true,
        "data":{
            "mass": 4.87,
            "diameter": "12,104",
            "dfs": 108.2,
            "lfd": 2802,
            "lfy": 224.7,
            "mean_temp": 464,
            "no_moons": 0
        }
    },

    "earth":{
        "revolving":true,
        "data":{
            "mass": 5.97,
            "diameter": "12,756",
            "dfs": 149.6,
            "lfd": 24,
            "lfy": 365.2,
            "mean_temp": 15,
            "no_moons": 1
        }
    },

    "mars":{
        "revolving":true,
        "data":{
            "mass": 0.642,
            "diameter": 6792,
            "dfs": 227.9,
            "lfd": 24.7,
            "lfy": 687,
            "mean_temp": -65,
            "no_moons": 2
        }
    },

    "jupiter":{
        "revolving":true,
        "data":{
            "mass": 1898,
            "diameter": "142,984",
            "dfs": 778.6,
            "lfd": 9.9,
            "lfy": 4331,
            "mean_temp": -110,
            "no_moons": 79
        }
    },

    "saturn":{
        "revolving":true,
        "data":{
            "mass": 568,
            "diameter": "120,536",
            "dfs": 1433.5,
            "lfd": 10.7,
            "lfy": "10,747",
            "mean_temp": -140,
            "no_moons": 82
        }
    },

    "uranus":{
        "revolving":true,
        "data":{
            "mass": 86.8,
            "diameter": "51,118",
            "dfs": 2872.5,
            "lfd": 17.2,
            "lfy": "30,589",
            "mean_temp": -195,
            "no_moons": 27
        }
    },

    "neptune":{
        "revolving":true,
        "data":{
            "mass": 102,
            "diameter": "49,528",
            "dfs": 4495.1,
            "lfd": 16.1,
            "lfy": "59,800",
            "mean_temp": -200,
            "no_moons": 14
        }
    }

}

//take all text fields
var planetInfo= Scene.root.find("planetInfo")

var nameText= Scene.root.find("planetNameText")
var massText= Scene.root.find("planetMassText")
var diaText= Scene.root.find("planetDiaText")
var dfsText= Scene.root.find("planetDfsText")
var lfdText= Scene.root.find("planetLfdText")
var lfyText= Scene.root.find("planetLfyText")
var tempText= Scene.root.find("planetTempText")
var moonText= Scene.root.find("planetMoonText")

var nameTimer,massTimer,diaTimer,dfsTimer,lfdTimer,lfyTimer,tempTimer,moonTimer
var nameCount,massCount,diaCount,dfsCount,lfdCount,lfyCount,tempCount,moonCount
var nameWriteTime= 70
var otherInfoWriteTime=20

//add onTap to all the planets
planets.forEach(
    (planet)=>{
        var tmp= Scene.root.find(planet)
        Patches.setBooleanValue(planet+"Rot", planetsData[planet].revolving)

        TouchGestures.onTap(tmp).subscribe((gesture)=>{
            //set revolution
            //planetsData[planet].revolving=!planetsData[planet].revolving
            //Patches.setBooleanValue(planet+"Rot", planetsData[planet].revolving)
            
            clearPlanetInfo()
            
            
            var nameInfo= planet.toUpperCase()
            var massInfo= "Mass: "+planetsData[planet].data.mass+"x10^24 kg"
            var diaInfo= "Diameter: "+planetsData[planet].data.diameter+" km"
            var dfsInfo= "Distance from Sun: "+planetsData[planet].data.dfs+"x10^6 km"
            var lfdInfo= "Length of Day: "+planetsData[planet].data.lfd+" hours"
            var lfyInfo= "Length of Year: "+planetsData[planet].data.lfy+" days"
            var tempInfo= "Mean Temperature: "+planetsData[planet].data.mean_temp+" C"
            var moonInfo= "No. of Moons: "+planetsData[planet].data.no_moons

            /**
             */
        
            
            nameCount=0
            nameTimer= Time.setInterval(() => {
                
                typingAnimationWrapper("name", nameInfo)
            }, nameWriteTime);
            
            /*
            massCount=0
            massTimer= Time.setInterval(() => {
                
                typingAnimationWrapper("mass", massInfo)
            }, massInfo.length*3);

            
            diaCount=0
            diaTimer= Time.setInterval(() => {
                
                typingAnimationWrapper("dia", diaInfo)
            }, otherInfoWriteTime);

            dfsCount=0
            dfsTimer= Time.setInterval(() => {
                
                typingAnimationWrapper("dfs", dfsInfo)
            }, otherInfoWriteTime);
            
            
            lfdCount=0
            lfdTimer= Time.setInterval(() => {
                
                typingAnimationWrapper("lfd", lfdInfo)
            }, otherInfoWriteTime);

            lfyCount=0
            lfyTimer= Time.setInterval(() => {
                typingAnimationWrapper("lfy", lfyInfo)
            }, otherInfoWriteTime);

            tempCount=0
            tempTimer= Time.setInterval(() => {
                typingAnimationWrapper("temp", tempInfo)
            }, otherInfoWriteTime);

            moonCount=0
            moonTimer= Time.setInterval(() => {
                typingAnimationWrapper("moon", moonInfo)
            }, otherInfoWriteTime);
            */

    })
})

//onTap on `planetInfo` will delete the inner texts of planet info
TouchGestures.onTap(planetInfo).subscribe((gesture)=>{
    clearPlanetInfo()
})

var clearPlanetInfo=()=>{
    nameText.text=""
    massText.text=""
    diaText.text=""
    dfsText.text=""
    lfdText.text=""
    lfyText.text=""
    tempText.text=""
    moonText.text=""
}


var typingAnimationWrapper= (dataName, dataText)=>{
    /*
    Parameters:
    ==========
    inst: instance to add text on
    text: text to be added
    */
    switch(dataName){
        case "name":
            if(nameCount<dataText.length){
                //Diag.log("name length "+dataText.length)
                //Diag.log("name count "+nameCount)
                //Diag.log(nameText.text.pinLastValue()+dataText.charAt(nameCount))
                let lastText= nameText.text.pinLastValue()
                nameText.text= lastText+dataText.charAt(nameCount)
                nameCount++
            }
            else{
                Time.clearInterval(nameTimer)
            }
            break
        case "mass":
            if(massCount<dataText.length){
                //Diag.log("mass length "+dataText.length)
                //Diag.log("mass Count "+massCount)
                //Diag.log(massText.text.pinLastValue()+dataText.charAt(massCount))
                let lastText= massText.text.pinLastValue()
                massText.text= lastText+dataText.charAt(massCount)
                massCount++
            }
            else{
                Time.clearInterval(massTimer)
            }
            break
        case "dia":
            if(diaCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= diaText.text.pinLastValue()
                diaText.text= lastText+dataText.charAt(diaCount)
                diaCount++
            }
            else{
                Time.clearInterval(diaTimer)
            }
           break
        case "dfs":
            if(dfsCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= dfsText.text.pinLastValue()
                dfsText.text= lastText+dataText.charAt(dfsCount)
                dfsCount++
            }
            else{
                Time.clearInterval(dfsTimer)
            }
            break
        case "lfd":
            if(lfdCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= lfdText.text.pinLastValue()
                lfdText.text= lastText+dataText.charAt(lfdCount)
                lfdCount++
            }
            else{
                Time.clearInterval(lfdTimer)
            }
            break
        case "lfy":
            if(lfyCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= lfyText.text.pinLastValue()
                lfyText.text= lastText+dataText.charAt(lfyCount)
                lfyCount++
            }
            else{
                Time.clearInterval(lfyTimer)
            }
            break
        case "temp":
            if(tempCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= tempText.text.pinLastValue()
                tempText.text= lastText+dataText.charAt(tempCount)
                tempCount++
            }
            else{
                Time.clearInterval(tempTimer)
            }
            break
        case "moon":
            if(moonCount<dataText.length){
                //Diag.log("From inside ")
                let lastText= moonText.text.pinLastValue()
                moonText.text= lastText+dataText.charAt(moonCount)
                moonCount++
            }
            else{
                Time.clearInterval(moonTimer)
            }
            break
    }
    //else{
    //    Time.clearInterval(interval)
    //    Diag.log("Cleared interval")
   // }

    //Diag.log("Been called... "+textLenCount)
}