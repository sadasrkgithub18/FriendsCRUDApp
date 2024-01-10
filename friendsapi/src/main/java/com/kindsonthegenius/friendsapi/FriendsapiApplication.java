package com.kindsonthegenius.friendsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@SpringBootApplication
@RestController
public class FriendsapiApplication{

    public static void main(String[] args) {
        SpringApplication.run(FriendsapiApplication.class, args);
    }

    @GetMapping("/hello")
    public String getFriends(){

        return  "hello";
    }


}
