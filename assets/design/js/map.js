import { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } from './lib/ymaps.js';
    
var mapEl = document.getElementById('map');
var coords = mapEl.dataset.coords;

var removeMap = function() {
    mapEl.innerHTML == '';
}

window.addEventListener('scroll', function() {
    if (!mapEl.classList.contains('active')) {
        
        buildMap(coords);
        
        mapEl.classList.add('active');
    }
});

function buildMap(coords) {
    
    if (coords) {
        mapEl.style.opacity = .1;
        
        setTimeout(function() {
            mapEl.style.opacity = 1;
        }, 900);
        
        var centerCoords = coords.split(',').map(function(item){return parseFloat(item)});

        var map = new YMap(mapEl, {
            location: {
                center: centerCoords,
                zoom: 15
            }
        });
        
        map.addChild(new YMapDefaultSchemeLayer({}));
        
        map.addChild(new YMapDefaultFeaturesLayer({}));
        
        var markerElement = document.createElement('div');
        
        markerElement.classList.add('map-marker');
        markerElement.classList.add('with-icon');
                
        var iconElement = document.createElement('img');
        iconElement.src = 'assets/design/images/icons/marker-green.svg';
        markerElement.appendChild(iconElement);
        
        var marker = new YMapMarker(
            {
                coordinates: centerCoords,
                draggable: false,
                mapFollowsOnDrag: true
            },
            markerElement
        );
            
        map.addChild(marker);
        
    }
    
    removeMap = function() {
        map.destroy();
        mapEl.innerHTML == '';
    }
}










































    
     
