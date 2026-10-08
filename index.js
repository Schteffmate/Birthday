import targetData from './image-targets/target.json';

let scene, camera, renderer;
let birthdayModel = null;

const onxrloaded = () => {
  initXrPipeline();

  XR8.XrController.configure({
    imageTargetData: [targetData]
  });

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

const loadModel = () => {
  const loader = new THREE.GLTFLoader();
  loader.load('./birthday.glb', (gltf) => {
    birthdayModel = gltf.scene;
    birthdayModel.visible = false;
    birthdayModel.scale.set(0.5, 0.5, 0.5);
    scene.add(birthdayModel);
  });
};

window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded);
