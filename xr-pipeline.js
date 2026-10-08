const initXrPipeline = () => {
  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(),
    XR8.Threejs.pipelineModule(),
    XR8.Camera.pipelineModule(),
    XR8.ImageTarget.pipelineModule(),
    XR8.XrController.pipelineModule(),
  ]);
};
