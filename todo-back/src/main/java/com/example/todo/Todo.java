package com.example.todo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime dueDate;
    private Status status;
    private Priority priority;


    @ManyToMany
    @JoinTable(
            name = "todo_members",
            joinColumns = @JoinColumn(name = "todo_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

}
