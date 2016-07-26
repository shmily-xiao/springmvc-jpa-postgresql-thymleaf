/**
 * Created by L on 15/5/7.
 */
var app = angular.module('app',[]);
app.filter('stockArray',function(){
    return function(item,array){
        var stocks = [];
        angular.forEach(array,function(v,i){
            var flag = false;
            angular.forEach(item,function(value,index){
                if(value.day == v.date){
                    stocks.push(value);
                    flag = true;
                }
            })
            if(!flag){
                stocks.push({});
            }
        })
        return stocks;
    }
});