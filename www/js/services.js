angular.module('starter.services', [])
.factory('Options', function() {
    return {
        getOpt: function(){
            return (JSON.parse(localStorage.getItem('opt')) || false);
        },
        setOpt: function(obj){
            localStorage.setItem('opt',JSON.stringify(obj));
        }
    };
});
