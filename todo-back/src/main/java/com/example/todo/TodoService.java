package com.example.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    //전체 조회
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    //단건 조회
    public Todo getTodo(Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("해당 업무를 찾을 수 없습니다."));
    }

    //추가
    public Todo createTodo(Todo todo) {
        if(todo.getTitle() == null || todo.getTitle().isEmpty()) {
            throw new IllegalArgumentException("제목을 입력해주세요.");
        }
        return todoRepository.save(todo);
    }

    //수정
    public Todo updateTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    //삭제
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
