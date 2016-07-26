package com.demo.annotation.validator;


import com.demo.annotation.Latitude;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by sczly on 2015/6/8.
 */
public class LatitudeValidator implements ConstraintValidator<Latitude,String> {

    @Override
    public void initialize(Latitude latitude){}

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(s == null) return false;
        try {
            Double latitude=Double.parseDouble(s);
            if (latitude < 90 && latitude > -90) {
                return true;
            }
        }catch (NumberFormatException e){
            return false;
        }
        return false;
    }
}
