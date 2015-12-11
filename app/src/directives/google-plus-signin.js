
app.directive('googlePlusSignin', function(){
    return{
        restrict : "E",
        template : "<div class='g-signin2' style='margin-top: 150px' data-theme='dark' data-longtitle='true' data-height='50' data-width='220' data-scope='https://www.googleapis.com/auth/plus.login' data-onsuccess='onSignIn'></div>",
        replace: true,
        link:function(scope, element, attrs){

            // Asynchronously load the G+ SDK.
            (function() {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://apis.google.com/js/platform.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
            })();
        }
    }
})
