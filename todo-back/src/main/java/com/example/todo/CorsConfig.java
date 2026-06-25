package com.example.todo;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")           // 모든 경로에 적용
                .allowedOrigins("http://localhost:3000")  // React 주소 허용
                .allowedMethods("GET", "POST", "PUT", "DELETE");  // 허용할 메서드
    }
}