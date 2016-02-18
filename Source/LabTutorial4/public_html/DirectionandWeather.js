var directionandWeather = angular.module("DirectionandWeather",[]);

directionandWeather.controller('googlemapoutput', function ($scope,$http) {

    var map;
    var mapOptions;
    var end;
    var start;
    var st1;
    var st2;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    $scope.calcRoute = function () {
         end = document.getElementById('endlocation').value;
         start = document.getElementById('startlocation').value;

        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
                console.log(status);
            }

        });
    };
    google.maps.event.addDomListener(window, 'load', $scope.initialize);

    $scope.getWeather = function(start,end) {
        //st1=document.getElementById('state1').value;
        //st2=document.getElementById('state2').value;
        
        var url,url1;
        var loctionarray,str,statename,Locationarray;
	var startindex = start.indexOf(" ");
        var endindex = end.indexOf(" ");
	if(startindex != -1){
            loctionarray = start.split(' ');
            str = loctionarray[1];
            statename = str.split(',');
            url = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + statename[1] + '/' + loctionarray[0] + '%20' + statename[0] + '.json';
	}
	else if(startindex == -1){
            Locationarray = start.split(',');
            url =  'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + Locationarray[1] + '/' + Locationarray[0] + '.json';
	}
        if(endindex != -1){
            loctionarray = end.split(' ');
            str = loctionarray[1];
            statename = str.split(',');
            url1 = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + statename[1] + '/' + loctionarray[0] + '%20' + statename[0] + '.json';
	}
	else if(endindex == -1){
            Locationarray = end.split(',');
            url1 =  'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + Locationarray[1] + '/' + Locationarray[0] + '.json';
	}
        
        $http.get(url).success(function (data) {
            console.log(data);
            temp = data.current_observation.temp_f;
            icon = data.current_observation.icon_url;
            weather = data.current_observation.weather;
            console.log(temp);
            $scope.temp = temp;
            $scope.currentweather = {
                html: "Currently " + temp + " &deg; F and " + weather + ""
            }
            $scope.currentIcon = {
                html: "<img src='" + icon + "'/>"
            }

        })

        $http.get(url1).success(function (data) {
            console.log(data);
            temp1 = data.current_observation.temp_f;
            icon1 = data.current_observation.icon_url;
            weather1 = data.current_observation.weather;
            console.log(temp1);
            $scope.temp1 = temp1;
            $scope.currentweather = {
                html: "Currently " + temp1 + " &deg; F and " + weather1 + ""
            }
            $scope.currentIcon = {
                html: "<img src='" + icon1 + "'/>"
            }

        })
    }



});
