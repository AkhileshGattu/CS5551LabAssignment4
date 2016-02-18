/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var registrationvalidationapp = angular.module("Login",[]);

registrationvalidationapp.controller("LoginController", function($scope,$window){
    
    var flag;
    $scope.validateRegistrationData = function (user,pass) {
        
        var RegistrationDetails=localStorage.getItem("Registration_details");
        RegistrationDetails=JSON.parse(RegistrationDetails);
        console.log(RegistrationDetails);
        for(var i =0;i<RegistrationDetails.length;i++) {
            
            var y = JSON.parse(RegistrationDetails[i]);
            console.log(y.EmailId);
            console.log(y.UserName);
            console.log(y.user);
            console.log(y.pass);
            console.log(y.Password);
            if (y.UserName === user && y.Password === pass) {
                flag = true;
                //$state.go("home");

            }
            else{
                flag=false;
            }
        }
            if(flag==true)
            {
                $window.location.href='Location1.html';
            }
            else
            {
                $scope.continueMsg=false;
            }

    };
});