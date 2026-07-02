package com.example.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    //전체 조회
    public List<User> getUsers() {
        return userMapper.findAll();
    }

    //단일 조회
    public User getUser(Long id) {
        User user = userMapper.findById(id);
        if(user == null) throw new RuntimeException("해당 유저를 찾을 수 없습니다.");
        return user;
    }

    //추가
    public User createUser(User user) {
        if(user.getName() == null || user.getName().isEmpty()){
            throw new IllegalArgumentException("유저 이름을 입력해주세요");
        }
        userMapper.insert(user);
        return user;
    }

    //수정
    public User updateUser(User user) {
        userMapper.update(user);
        return user;
    }

    //삭제
    public void deleteUser(Long id) {
        userMapper.deleteById(id);
    }
}
