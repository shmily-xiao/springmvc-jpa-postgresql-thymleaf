package com.demo.annotation.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.List;

/**
 * Brief : @Enum的校验器
 * Author: Hawk
 * Date  : 2015/12/4
 */
public class EnumValidator implements ConstraintValidator<com.demo.annotation.Enum,String> {

    private List<Enum<?>> constants;

    @Override
    public void initialize(com.demo.annotation.Enum enumConstants) {
        Class<?> enumClass = enumConstants.type();
        if(!enumClass.isEnum()) throw new IllegalArgumentException("not a valid enum class");
        this.constants = Arrays.asList((Enum<?>[])enumClass.getEnumConstants());
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if (s==null) return true;
        return constants.stream().anyMatch(e -> e.name().equals(s));
    }
}
