package com.demo.utils.transport;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;
import java.util.Date;

/**
 * Created by simpletour_java on 2015/7/11.
 */
public class TimeFormatUtil {
    public static String second2Hour(int second) {
        int hour = ((int) (second / 3600));
        int min = ((int) ((second % 3600) / 60));
        String h = String.valueOf(hour);
        String m = String.valueOf(min);
        if (hour < 10) {
            h = "0" + h;
        }
        if (min < 10) {
            m = "0" + m;
        }
        return h + ":" + m;
    }

    /**
     * @param bindingDeadline unit is second
     * @return
     */
    public static long getExchangeDeadline(long bindingDeadline, int validity) {
        LocalDateTime time = LocalDateTime.ofEpochSecond(bindingDeadline, 0, ZoneOffset.ofHours(8));
        return new Date(bindingDeadline * 1000L).toInstant().plus(validity, ChronoUnit.DAYS).plusSeconds(24 * 60 * 60 - 1 - ((time.getHour() * 60 *
                60) + (time.getMinute() * 60) + time.getSecond())).toEpochMilli();
    }
}
