package com.demo.enums;

import java.util.List;

/**
 * Created by igotti on 14-11-4.
 */
public interface Options<T> {

    /**
     *
     * @return
     */
    String getName();

    /**
     *
     * @return
     */
    String getValue();

    /**
     *
     * @return
     */
    List<Option> as();

}
