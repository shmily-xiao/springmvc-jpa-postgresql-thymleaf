package com.demo.annotation;

import com.demo.annotation.validator.PositiveFloatValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 用于校验是否为浮点数
 * User: Hawk
 * Date: 2016/4/25 - 11:24
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PositiveFloatValidator.class)
public @interface PositiveFloatPattern {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
