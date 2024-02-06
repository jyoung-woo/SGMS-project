import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { XYZ } from 'ol/source';
import olcs from 'olcs/OLCesium';
import HexBin from 'ol-ext/source/HexBin';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import IDW from 'ol-ext/source/IDW';
import {Stroke , Text} from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import geoData from './sd.json';
import testData from './test.json';
import VectorImageLayer from 'ol/layer/VectorImage';
import ImageLayer from 'ol/layer/Image';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';

class TEST {
    #map;
    #view;
    #features;
    olscMap;
    scene;

    constructor() {
        window.onload = () => this.init();
    }

    init() {
        const vworldBaseLayer = new TileLayer({
            title: 'map',
            source: new XYZ({
                url: 'https://api.vworld.kr/req/wmts/1.0.0/A3E72FAE-FF18-3031-853E-D34147FF1460/Satellite/{z}/{y}/{x}.jpeg'
            }),
        });

        this.#view = new View({
            //center: fromLonLat([127.9780, 37.5665]),
            center: [127.9780, 37.5665],
            zoom: 11,
            projection:'EPSG:4326'
        });
        

        this.olscMap = new Map({
            target: 'map',
            layers: [vworldBaseLayer],
            view: this.#view,
        });

        this.#map = new olcs({ map: this.olscMap });
        this.scene = this.#map.getCesiumScene();
        this.#map.setEnabled(false);
        
        this.setSwap2d3d();
        this.setController();
        this.setFeatures();
        this.point2Hexbin();
        this.setIDW();
    }

    setController(){
    var switcher = new LayerSwitcher({
            target:document.getElementById("layerSwitcher")
            // displayInLayerSwitcher: function (l) { return false; },
        });
        
        this.olscMap.addControl(switcher);
    }

    setIDW(){
        const idwSrc = new VectorSource();
        // IDW source
        var idw = new IDW({
            // Source that contains the data
            source: idwSrc,
            // Use val as weight property
            weight: 'val'
        });
        
        const idwLayer = new ImageLayer({
            title: 'IDW',
            source: idw,
            opacity: .25
        });
        this.olscMap.addLayer(idwLayer);

        //'val'값 표시
        this.olscMap.addLayer(new VectorLayer({
            title: 'IDW value',
            source: idw.getSource(),
            style: function(f) {
                return new Style({
                    text: new Text({
                        text: f.get('val').toString(),
                        stroke: new Stroke({ color: [255,255,255,128], width: 1.25 }),
                      })
                })
            }
        }))
        idw.getSource().addFeatures(this.#features);
    }

    setFeatures(){
        this.#features=[];
        for (let index = 0; index < 80; index++) {
            var f = new Feature(new Point([
                (Math.random() * (128.4 - 126.412) + 126.712),
                (Math.random() * (38 - 34.36) + 34.76)
            ]));
            f.set('val', Math.random()*100);
            this.#features.push(f);
        }
        
        // var testP = new Feature({
        //     geometry: new Point([127.87879, 37.1464])
        // });
        // testP.set('spot','어디');

        // const gs = new VectorSource({
        //     features:[testP],
        // });
        // gs.addFeatures(this.#features);

        // const gsLayer = new VectorLayer({
        //     source: gs,
        // });
        // this.olscMap.addLayer(gsLayer);
    }

    setSwap2d3d(){
        const tp = new Cesium.Terrain(Cesium.CesiumTerrainProvider.fromUrl('http://idc2.sodasys.com:1022/tilesets/tiles'));
        const emptyTp = new Cesium.EllipsoidTerrainProvider({});

        this.scene.setTerrain(tp);

        const btn = document.getElementById('2d3d');
        
        btn.addEventListener('click', () => {
            let enable = this.#map.getEnabled();
            if(enable){
                this.scene.terrainProvider = emptyTp;
                this.#view.setRotation(0);
            }else{
                this.scene.setTerrain(tp);
            }
            this.#map.setEnabled(!enable);
        });
    }

    point2Hexbin(){
        const gs = new VectorSource();
        gs.addFeatures(this.#features);
        const hexbin = new HexBin({
            source: gs,		// source of the bin
            size: 0.15
        });
        const hexFeatures = hexbin.getFeatures();

        // Calculate min/ max value
        var min = 0;
        var max = 0;
        for (var i=0, f; f = hexFeatures[i]; i++) {
            var n = f.get('features').length;
            if (n<min) min = n;
            if (n>max) max = n;
        }
        var dl = (max-min);
        min = Math.max(1,Math.round(dl/4));
        max = Math.round(max - dl/3);

        const layer = new VectorLayer({
            title: 'HexLayer',
            source: hexbin, 	  // hexagon size (in map unit)
            style: (f,res)=>{
                var color;
                if (f.get('features').length > max) color = [136, 0, 0, 0.5];
                else if (f.get('features').length > min) color = [255, 165, 0, 0.5];
                else color = [0, 136, 0, 0.5];
                return [ new Style({ fill: new Fill({  color: color }) }) ];
            }
        });
        // Add layer
        this.olscMap.addLayer(layer);

    }
    
    init2(){
        /*
        import TileLayer from 'ol/layer/Tile';
        import Map from 'ol/Map';
        import View from 'ol/View';
        import { XYZ, Vector} from 'ol/source';
        import { fromLonLat } from 'ol/proj';
        import olcs from 'olcs/OLCesium';
        import HexBin from 'ol-ext/source/HexBin';
        import GeoJSON from 'ol/format/GeoJSON';
        import CSSFilter from 'ol-ext/filter/CSS';
        import Hover from 'ol-ext/interaction/Hover';
        import VectorLayer from 'ol/layer/Vector';
        import Style from 'ol/style/Style'
        import Fill from 'ol/style/Fill'
        import VectorImageLayer from 'ol/layer/VectorImage';
        import Feature from 'ol/Feature';
        import { Point } from 'ol/geom';
        import geoData from './sd.json';
        */
        const vworldBaseLayer = new TileLayer({
            source: new XYZ({
                url: 'https://api.vworld.kr/req/wmts/1.0.0/A3E72FAE-FF18-3031-853E-D34147FF1460/Satellite/{z}/{y}/{x}.jpeg'
            }),
        });

        const view = new View({
            center: [127.9780, 37.5665],
            //center: fromLonLat([127.9780, 37.5665]),
            zoom: 11,
            projection:'EPSG:4326'
        });

    

        var testP = new Feature({
            geometry:new Point([127.65766223563071, 37.58654797046178])
        });
        testP.set('spot','강원도어디');
        const gangSource= new Vector({});
        const gs = new Vector({
            features:[testP],
        });
        const gsLayer = new VectorLayer({
            source: gs,
        });


        const olscMap = new Map({
            target: 'map',
            layers: [vworldBaseLayer, gsLayer],
            view: view,
        });

        // const source_hex= new Vector({
        //     features: new GeoJSON().readFeatures(geoData),
        //     format: new GeoJSON(),
        //     projection: 'EPSG:4326'
        // });
        //features = hexbin.getFeatures();
        //source_hex.features = new GeoJSON().readFeatures(geoData);
        // const sdVector= new Vector({
        //     features: new GeoJSON().readFeatures(geoData),
        //     projection: 'EPSG:4326',
        //     format: new GeoJSON()
        // });
        // const hexbin2 = new HexBin({
        //     source: source_hex,		// source of the bin
        //     size: 23000000			  // hexagon size (in map unit)
        // });
        // const layer2 = new VectorImageLayer({ 
        //     title: 'Bin2',
        //     source: hexbin2
        // });

        // // Add layer
        // //olscMap.addLayer(layer2);
        // console.log('test');
        /**
         
         
        const sdVectorUrl= new Vector({
            url: '/resources/json/sd.json',
            format: new GeoJSON()
        });
        const photo = new VectorImageLayer ({ source: sdVectorUrl });

        // Bin source
        const hexbin_ = new HexBin({
            source: sdVector,		// source of the bin
            size: 30000			  // hexagon size (in map unit)
        });
        olscMap.addLayer(photo);

        // Bin layer
        const binLayer = new VectorLayer({ 
            title: 'Bin',
            className: 'bin',
            source: hexbin2,
            style: (feature) => {
                const nb = feature.get('features').length
                // const color = (nb > 5) ? [255,0,0] : nb > 2 ? 'orange' : [0,255,0]
                const color = [0,170,255, (nb/10 + .11)]
                return new Style({
                  fill: new Fill({
                    color: color
                  })
                })
              }
        });
        //binLayer.addFilter(new CSSFilter({ blend: 'multiply' }));
        */
       
        const source= new Vector({});
        var nb = 10000;
        var ssize = 50;		// seed size
        var ext = olscMap.getView().calculateExtent(olscMap.getSize());
        var dx = ext[2]-ext[0];
        var dy = ext[3]-ext[1];
        var dl = Math.min(dx,dy);
        var features=[];
        for (var i=0; i<nb/ssize; ++i){
            var seed = [ext[0]+dx*Math.random(), ext[1]+dy*Math.random()]
            for (var j=0; j<ssize; j++){
                var f = new Feature(new Point([
                    seed[0] + dl/10*Math.random(),
                    seed[1] + dl/10*Math.random()
                ]));
                f.set('id',i*ssize+j);
                features.push(f);
            }
        }
        source.clear(true);
        source.addFeatures(features);
        var layerSource = new Vector({ title: 'Source', source: source})
        var lSource = new VectorLayer({
            title: 'asfd',
            source: layerSource
        });
        olscMap.addLayer(lSource);

        var features;
        const hexbin = new HexBin({
            source: source,		// source of the bin
            size: 0.2			  // hexagon size (in map unit)
        });
        
        const layer = new VectorImageLayer({
            title: 'Bin',
            source: hexbin, 
            opacity: 0.9
        });
        // Add layer
        olscMap.addLayer(layer);

        gangSource.clear(true);
        gangSource.addFeature(testP);
        const gangLayer = new VectorLayer({ 
            title: 'testgang',
            source: gangSource, 
            opacity: .9
        });
        gangLayer.setZIndex(6);
        //olscMap.addLayer(gangLayer);
        //const mvfeature = gangSource.getFeatures()[0];
        const hexFeature1 = features[0];
        view.setCenter(hexFeature1.getGeometry().getCoordinates());

    }
}

export default new TEST();
