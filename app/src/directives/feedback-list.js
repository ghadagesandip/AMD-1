app.directive('myFeedbackList',function(){
   return {
       restrict:"E",
       templateUrl : './views/templates/my-feedabck-list.html',
       replace:true,
       scope: {
           feeds : "=",
       }

   }
});