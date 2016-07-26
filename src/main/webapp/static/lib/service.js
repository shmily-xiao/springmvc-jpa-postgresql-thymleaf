/**
 * Created by L on 15/5/7.
 */
app.service('dateFormat',function(){
   this.date = function(d){
       var m = d.getMonth()<9?'0'+ (d.getMonth()+1):d.getMonth()+1;
       var day = d.getDate()<10?'0'+d.getDate():d.getDate();
       return d.getFullYear()+'-'+ m +'-'+ day ;
   };
    this.time = function(d){
        return d.getTime();
    }
});