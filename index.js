let scene, camera, renderer;
let birthdayModel = null;

// Target-Daten laden
const loadTargetData = async () => {
  const response = await fetch('./image-targets/target.json');
  return await response.json();
};

const onxrloaded = async () => {
  // XR-Pipeline starten (kommt aus deiner xr-pipeline.js)
  initXrPipeline();

  // Target-Daten laden
  const targetData = await loadTargetData();

  // Image-Tracking konfigurieren
  XR8.XrController.configure({
    imageTargetData: [targetData]
  });

  // Eigene Pipeline für Modell-Handling
  XR8.addCameraPipelineModules([{
    name: 'myimagepipeline',

    onStart: ({canvas, GLctx}) => {
      const {scene: xrScene, camera: xrCamera, renderer: xrRenderer} =
        XR8.Threejs.xrScene();

      scene = xrScene;
      camera = xrCamera;
      renderer = xrRenderer;

      loadModel();
    },

    onUpdate: ({processCpuResult}) => {
      const {imageTargets} = processCpuResult;
      if (!imageTargets) return;

      const target = imageTargets[0];
      if (!target) return;

      if (birthdayModel) {
        birthdayModel.visible = target.isVisible;

        if (target.isVisible) {
          const m = target.modelMatrix;
          birthdayModel.matrix.fromArray(m);
          birthdayModel.matrix.decompose(
            birthdayModel.position,
            birthdayModel.quaternion,
            birthdayModel.scale
          );
        }
      }
    }
  }]);
};

// GLB-Modell laden
const loadModel = () => {
  const loader = new THREE.GLTFLoader();
  loader.load('./birthday.glb', (gltf) => {
    birthdayModel = gltf.scene;
    birthdayModel.visible = false;
    birthdayModel.scale.set(0.5, 0.5, 0.5);
    scene.add(birthdayModel);
  });
};

// XR8 starten
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
