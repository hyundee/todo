package com.example.todo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //전체 조회
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    //단일 조회
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    //추가
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    //수정
    @PutMapping
    public User upadeteUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    //삭제
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
