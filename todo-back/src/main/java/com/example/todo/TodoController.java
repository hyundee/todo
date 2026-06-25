package com.example.todo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    //전체 조회
    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getTodos();
    }

    //단일 조회
    @GetMapping("/{id}")
    public Todo getTodo(@PathVariable Long id) {
        return todoService.getTodo(id);
    }

    //추가
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    //수정
    @PutMapping
    public Todo updateTodo(@RequestBody Todo todo) {
        return todoService.updateTodo(todo);
    }

    //삭제
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
