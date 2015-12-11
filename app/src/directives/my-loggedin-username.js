app.directive('myLoggedinUsername',['loginFact',function(loginFact){
   return {
       restrict:"E",
       replace:true,
       template :"<div>{{name}}</div>",
       link:function(scope,element,attr){
           scope.name = loginFact.getCookie('google_name');
       }
   }
}]);