package com.demo.annotation.validator;


import com.demo.annotation.Longitude;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Created by sczly on 2015/6/8.
 */
public class LongitudeValidator implements ConstraintValidator<Longitude,String> {

    @Override
    public void initialize(Longitude longitude){}

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(s == null) return false;
        try {
            Double longitude = Double.parseDouble(s);
            if (longitude < 180 && longitude > -180) {
                return true;
            }
        }catch (NumberFormatException e){
            return false;
        }
        return false;
    }
}
