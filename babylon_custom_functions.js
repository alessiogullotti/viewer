function setup_camera(camera,canvas){
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2;
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerRadiusLimit = 150;
    camera.upperRadiusLimit = 300;
    camera.attachControl(canvas);
}


function load_env(scene, environment_file){
    
        scene.environmentTexture = new BABYLON.CubeTexture(environment_file, scene);

}

function whenReady(newScene){
      // Wait for textures and shaders to be ready
      newScene.executeWhenReady(function () {
        // Attach camera to canvas inputs
        var camera = newScene.activeCamera;
        setup_camera(camera,canvas);
        load_env(newScene,"textures/environment.env");
        newScene.clearColor = BABYLON.Color3.Black();
        
        createLogo("images/Vector_Logo_White.png");
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function() {
          newScene.render();
        });
          
        engine.hideLoadingUI();
      });
    
}

function createScene(babylon_file) {
    if (BABYLON.Engine.isSupported()) {
        var engine = new BABYLON.Engine(canvas, true);
        var progressbar = document.getElementById("progressbar");
        BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
            document.getElementById("loadingDiv").style.display ="flex";
            return;
         }
        BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
            delay(1000).then(() =>document.getElementById("loadingDiv").style.display ="none");
        }

        engine.displayLoadingUI();
         BABYLON.SceneLoader.Load("",babylon_file, engine, function(newScene) {whenReady(newScene)});
    }
    
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function createLogo(url){
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
   
    var image = new BABYLON.GUI.Image("logoviewer",url);
    image.width="150px";
    image.height ="150px";
    image.paddingBottom="1%";
    image.paddingRight="1%";
    image.verticalAlignment=1;
    image.horizontalAlignment=1;
    advancedTexture.addControl(image);
}