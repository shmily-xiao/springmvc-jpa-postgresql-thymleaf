package com.demo.annotation;

import com.demo.annotation.validator.EnumValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by igotti on 15-1-16.
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EnumValidator.class)
public @interface Enum {

    Class<?> type();

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}
