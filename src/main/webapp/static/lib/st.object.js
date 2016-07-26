Object.prototype.literalEquals = function(obj){
    if(this == obj)
        return true;
    if(typeof(obj)=="undefined"||obj==null||typeof(obj)!="object")
        return false;
    var length = 0; var length1=0;
    for(var ele in this) {
        length++;
    }              
    for(var ele in obj) {
        length1++;
    }              
    if(length!=length1)
        return false;
    if(obj.constructor==this.constructor){
        for(var ele in this){
            if(typeof(this[ele])=="object") {
                if(!this[ele].literalequals(obj[ele]))
                    return false;
            }
            else if(typeof(this[ele])=="function"){
                if(!this[ele].toString().literalequals(obj[ele].toString()))
                    return false;
            }
            else if(this[ele]!=obj[ele])
                return false;
        }
        return true;
    }
    return false;
};
