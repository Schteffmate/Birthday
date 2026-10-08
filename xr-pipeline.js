// XR8 Pipeline korrekt initialisieren
const initXrPipeline = () => {
  XR8.addCameraPipelineModules([
    // Kamerabild auf das Canvas rendern
    XR8.GlTextureRenderer.pipelineModule(),

    // Three.js mit XR8 verbinden
    XR8.Threejs.pipelineModule(),

    // Kamera starten
    XR8.Camera.pipelineModule(),

    // Image-Target Tracking aktivieren
    XR8.ImageTarget.pipelineModule(),

    // XR8 Controller starten
    XR8.XrController.pipelineModule(),
  ]);
};
