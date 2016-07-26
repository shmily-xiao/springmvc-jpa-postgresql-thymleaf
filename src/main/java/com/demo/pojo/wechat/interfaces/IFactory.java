package com.demo.pojo.wechat.interfaces;

/**
 * Created by liyin on 2015/12/5.
 * Factory interface for producing instances
 */
public interface IFactory<K, V> {
    V getInstance(K key);
}
