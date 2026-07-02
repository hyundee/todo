package com.example.todo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {
    private final TodoMapper todoMapper;

    public TodoService(TodoMapper todoMapper) {
        this.todoMapper = todoMapper;
    }

    //전체 조회
    public List<Todo> getTodos() {
        return todoMapper.findAll();
    }

    //단건 조회
    public Todo getTodo(Long id) {
        Todo todo = todoMapper.findById(id);
        if(todo == null) {
            throw new RuntimeException("해당 업무를 찾을 수 없습니다.");
        }
        return todo;
    }

    //추가
    public Todo createTodo(Todo todo) {
        if(todo.getTitle() == null || todo.getTitle().isEmpty()) {
            throw new IllegalArgumentException("제목을 입력해주세요.");
        }
        todoMapper.insert(todo);
        return todo;
    }

    //수정
    public Todo updateTodo(Todo todo) {
        todoMapper.update(todo);
        return todo;
    }

    //삭제
    public void deleteTodo(Long id) {
        todoMapper.deleteById(id);
    }
}
