import {
    Viewer,
    createWorldTerrainAsync,
    Cartesian3,
    Math,
} from "cesium";

const viewer = new Viewer('cesiumContainer', {
    terrainProvider: createWorldTerrainAsync(), // 기본 지도를 지형지도로
});
// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
        heading: Math.toRadians(0.0),
        pitch: Math.toRadians(-15.0),
    },
});
