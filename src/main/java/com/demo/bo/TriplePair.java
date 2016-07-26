package com.demo.bo;

/**
 * Created by luyi on 2015-01-28.
 */
public class TriplePair<V,W> {
    private String name;

    private V value;

    private W object;

    public TriplePair() {}

    public TriplePair(String name, V value,W object) {
        this.name = name;
        this.value = value;
        this.object=object;
    }

    public TriplePair(W object){
        this.object = object;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public V getValue() {
        return value;
    }

    public void setValue(V value) {
        this.value = value;
    }

    public W getObject() {
        return object;
    }

    public void setObject(W object) {
        this.object = object;
    }
}
