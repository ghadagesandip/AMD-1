app.directive('myBadges',function(){
    return {
        restrict : "E",
        templateUrl : 'views/templates/my-badges.html',
        scope : {
            mybadges : "="
        },
        link : function(scope, element, attrs){
            console.log('mybadges')
        }
    }

})