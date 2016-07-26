package com.demo.annotation.validator;

/**
 * Created by simpletour_java on 2015/8/10.
 */
public class IDTypeValidator {

    private static final String ID_NO_PATTERN = "(^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$)|(^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])((\\d{4})|\\d{3}[Xx])$)";
    private static final String HKM_TRAVEL_PERMIT ="(^[HM][0-9]{10}$)";
    private static final String PASSPORT = "^(P\\d{7}|G\\d{8}|S\\d{7,8}|D\\d+|1[4,5]\\d{7})$";
    private static final String TW_TRAVEL_PERMIT="^[0-9]{10}$";
//    private boolean ignoreIfEmpty;

    public static boolean idNoValidator(String idType,String idNo){
        //不想用switch语句
        //台胞证的情况
        if(idType.equals("tw_travel_permit")){
            return !(idNo == null || idNo.isEmpty());
        //护照的情况
        }else if (idType.equals("passport")){
            return !(idNo == null || idNo.isEmpty());
        //回乡证的情况
        }else if (idType.equals("hkm_travel_permit")){
            return !(idNo == null || idNo.isEmpty());
        //其他情况，身份证的情况，还有idType为空的情况
        }else{
            if ((idNo == null || idNo.isEmpty())) {
                return false;
            }
            if (!idNo.matches(ID_NO_PATTERN)) {
                return false;
            } else {
                if (idNo.length() != 18) {
                    return false;
                }
                int[] idCardWi = new int[]{7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2}; //将前17位加权因子保存在数组里
                int[] idCardY = new int[]{1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2}; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                int idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (int i = 0; i < 17; i++) {
                    idCardWiSum += Integer.valueOf(idNo.substring(i, i + 1)) * idCardWi[i];
                }
                int idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                String idCardLast = idNo.substring(17);//得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast.equalsIgnoreCase("x")) {
                    } else {
                        return false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    try {
                        if (Integer.valueOf(idCardLast) == idCardY[idCardMod]) {
                        } else {
                            return false;
                        }
                    }catch (NumberFormatException n){
                        return false;
                    }
                }
            }
            return true;
        }
    }

}