package com.demo.annotation.validator;

import com.demo.annotation.PositiveFloatPattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 用于校验是否为正浮点数
 * User: Hawk
 * Date: 2016/4/25 - 11:20
 */
public class PositiveFloatValidator implements ConstraintValidator<PositiveFloatPattern, String> {

    private final static Pattern pattern = Pattern.compile("^[0-9]+[0-9|\\.]*$");

    @Override
    public void initialize(PositiveFloatPattern constraintAnnotation) {
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return Boolean.FALSE;
        }
        Matcher matcher = pattern.matcher(value);
        return matcher.matches();
    }
}
