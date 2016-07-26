package com.demo.pojo.wechat.interfaces;

/**
 * Created by liyin on 2015/12/5.
 */
public interface IKeyValue<K, V> {
    String getKey();

    V getValue();
}
