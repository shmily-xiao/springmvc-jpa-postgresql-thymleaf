package com.demo.annotation;

import com.demo.annotation.validator.PositiveIntegerValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 用于校验是否为正整数
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PositiveIntegerValidator.class)
public @interface PositiveIntegerPattern {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
