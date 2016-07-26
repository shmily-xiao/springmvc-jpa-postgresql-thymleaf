package com.demo.annotation;

import com.demo.annotation.validator.SpecialStringValuesValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 用于检验输入只能为指定的输入
 * User: Hawk
 * Date: 2016/4/25 - 11:24
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SpecialStringValuesValidator.class)
public @interface SpecialStringValues {

    /**
     * 每个取值之间使用逗号分隔
     * @return
     */
    String values();

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
