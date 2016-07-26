package com.demo.annotation;

import com.demo.annotation.validator.MobileValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Brief :  手机号码的注解类
 * Author:  liangfei
 * Date  :  2015/12/28
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MobileValidator.class)
public @interface Mobile {
    boolean ignoreIfAbsent() default false;

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
