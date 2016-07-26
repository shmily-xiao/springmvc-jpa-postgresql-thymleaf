package com.demo.annotation.validator;

import com.demo.annotation.Mobile;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Brief :  电话号码的验证器
 * Author:  liangfei
 * Date  :  2015/12/28
 */
public class MobileValidator implements ConstraintValidator<Mobile, String> {
    private Pattern pattern = Pattern.compile("^0?(13|14|15|17|18)[0-9]{9}$");

    private boolean ignoreIfAbsent;

    @Override
    public void initialize(Mobile mobile) {
        this.ignoreIfAbsent = mobile.ignoreIfAbsent();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        if(ignoreIfAbsent&&(s==null||s.isEmpty())) return true;
        Matcher matcher = pattern.matcher(s);
        return matcher.matches();
    }
}
