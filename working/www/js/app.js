
angular.module('starter', ['ionic', 'ngCordova', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.controller("mapCtrl", function($scope, $http, uiGmapGoogleMapApi) {
  
  //Data
  
  $http.get('https://fishack.mybluemix.net/get').then(function(data){
    console.log(data);

//Angular App Module and Controller
    
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(43.6532, 79.3832),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = { center: { latitude: 37.09024, longitude: -95.712891 }, zoom: 4 };
    
    
    $scope.markers = [];
    
    
    
    var infoWindow = new google.maps.InfoWindow();
    var createMarker = function (info,id){
      
      var color;
    if(info.val < 650){
      color = "darkgreen";
    }else if(info.val >= 650 && info.val < 900){
      color = "orange";
    }else{
      color = "red";
    }
        var marker = {
            map: $scope.map,
            latitude: info.lat,
            longitude: info.lng,
            title: info.data,
            id: id,
            icon: 'js/GoogleMapsMarkers/'+color+'_MarkerA.png'
        };
        marker.content = '<div class="infoWindowContent">' + color + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
        
        
       /* $scope.onClick = function(marker) {
  $scope.selectedMarker = marker.data;
}*/
    };
    
    
    
    data.data.rows.forEach(function(info){
        createMarker(info.doc,info.id);
    });

    /*$scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }*/
      
      
  });

});