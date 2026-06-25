package com.example.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //전체 조회
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    //단일 조회
    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("해당 유저를 찾을 수 없습니다."));
    }

    //추가
    public User createUser(User user) {
        if(user.getName() == null || user.getName().isEmpty()){
            throw new IllegalArgumentException("유저 이름을 입력해주세요");
        }
        return userRepository.save(user);
    }

    //수정
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    //삭제
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
