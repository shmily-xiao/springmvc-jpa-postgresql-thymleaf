package com.demo.annotation.validator;

import com.demo.annotation.SpecialStringValues;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

/**
 * 用于检验输入是否为指定的输入
 * User: Hawk
 * Date: 2016/4/25 - 11:37
 */
public class SpecialStringValuesValidator implements ConstraintValidator<SpecialStringValues, String> {

    private String values;

    @Override
    public void initialize(SpecialStringValues constraintAnnotation) {
        this.values = constraintAnnotation.values();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (values == null || values.isEmpty()) {
            return Boolean.FALSE;
        }
        return Arrays.asList(values.split(",")).stream().anyMatch(str -> str.trim().equals(value));
    }
}
