package com.example.todo;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class Todo {
    private Long id;

    public enum Status {
        TODO,
        IN_PROGRESS,
        DONE,
        ON_HOLD,
    }

    public enum Priority {
        LOW,
        MEDIUM,
        HIGH,
    }

    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
    private Status status;
    private Priority priority;
    private List<User> members;
}
