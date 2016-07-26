package com.demo.enums;

/**
 * Created by igotti on 14-11-4.
 */
public class Option extends NameValuePair<String> {

    private boolean selected;

    public Option(){

    }

    public Option(String name, String value) {
        super(name, value);
    }

    public Option(String name, String value, boolean selected){
        super(name,value);
        this.selected = selected;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }

    @Override
    public String toString() {
        return "Option{name='" + super.getName() + "', value='" + super.getValue() + "', selected=" + selected +'}';
    }
}
