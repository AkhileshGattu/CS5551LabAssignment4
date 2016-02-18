var registrationapp = angular.module("ServicesApp",[]);

registrationapp.controller("RegistrationController", function($scope,$window){
    $scope.logins = [];
    $scope.saveRegistrationData = function (first,last,email,user,pass,phone) {
		
        //localStorage.setItem("firstname" , first);
        //localStorage.setItem("lastname" , last);
        //localStorage.setItem("emailid" , email);
        //localStorage.setItem("phonenumber" , phone);
        //localStorage.setItem("username" , user);
        //localStorage.setItem("password" , pass);
        
        var Registration_details = localStorage.Registration_details?JSON.parse(localStorage.Registration_details):[];
            var Registration = JSON.stringify
            ({
                FirstName : first,
                LastName : last,
                EmailId : email,
                Password:pass,
                UserName: user,
                PhoneNumber: phone,

            });
            Registration_details.push(Registration);
            localStorage.setItem("Registration_details", JSON.stringify(Registration_details));
        
		//$scope.logins.push( localStorage.getItem("username") + " was logged in.");
		$window.location.href='RegistrationComplete.html';
    };
});