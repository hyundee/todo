import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  setFilterStatus,
} from './todoSlice';
import { Todo, TodoFormData, Status } from '../../types';
import { TodoForm } from './TodoForm';
import { UserManageModal } from './UserManageModal';
import styles from './TodoList.module.css';

const STATUS_LABELS: Record<Status | 'ALL', string> = {
  ALL: '전체',
  TODO: '예정',
  IN_PROGRESS: '진행중',
  DONE: '완료',
  ON_HOLD: '보류',
};

const STATUS_COLORS: Record<Status, string> = {
  TODO: '#6b7280',
  IN_PROGRESS: '#3b82f6',
  DONE: '#10b981',
  ON_HOLD: '#f59e0b',
};

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: '#ef4444',
  MEDIUM: '#f59e0b',
  LOW: '#10b981',
};

const PRIORITY_LABELS: Record<string, string> = {
  HIGH: '높음',
  MEDIUM: '중간',
  LOW: '낮음',
};

function formatDate(iso: string | null): string {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TodoList() {
  const dispatch = useAppDispatch();
  const { items, loading, error, filterStatus } = useAppSelector((s) => s.todo);

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<Todo | undefined>(undefined);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filtered =
    filterStatus === 'ALL' ? items : items.filter((t) => t.status === filterStatus);

  const handleSubmit = async (data: TodoFormData) => {
    if (data.id) {
      await dispatch(updateTodo(data));
    } else {
      await dispatch(createTodo(data));
    }
    setShowForm(false);
    setEditTarget(undefined);
  };

  const handleEdit = (todo: Todo) => {
    setEditTarget(todo);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(deleteTodo(id));
    }
  };

  const handleStatusChange = (todo: Todo, status: Status) => {
    dispatch(updateTodo({
      id: todo.id,
      title: todo.title,
      content: todo.content,
      dueDate: todo.dueDate ? todo.dueDate.slice(0, 16) : '',
      status,
      priority: todo.priority,
      members: todo.members,
    }));
  };

  const openCreate = () => {
    setEditTarget(undefined);
    setShowForm(true);
  };

  const counts = (['TODO', 'IN_PROGRESS', 'DONE', 'ON_HOLD'] as Status[]).reduce(
    (acc, s) => ({ ...acc, [s]: items.filter((t) => t.status === s).length }),
    {} as Record<Status, number>
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Todo List</h1>
          <p className={styles.subtitle}>총 {items.length}개의 할 일</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.userBtn} onClick={() => setShowUserForm(true)}>
            유저 관리
          </button>
          <button className={styles.addBtn} onClick={openCreate}>
            + 새 할 일
          </button>
        </div>
      </header>

      <div className={styles.filterBar}>
        {(['ALL', 'TODO', 'IN_PROGRESS', 'DONE', 'ON_HOLD'] as const).map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filterStatus === s ? styles.filterActive : ''}`}
            onClick={() => dispatch(setFilterStatus(s))}
          >
            {STATUS_LABELS[s]}
            {s !== 'ALL' && (
              <span className={styles.filterCount}>{counts[s as Status]}</span>
            )}
          </button>
        ))}
      </div>

      {loading && <div className={styles.state}>불러오는 중...</div>}
      {error && <div className={styles.stateError}>오류: {error}</div>}

      {!loading && filtered.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <p>할 일이 없습니다</p>
          <button className={styles.addBtn} onClick={openCreate}>
            + 새 할 일 추가
          </button>
        </div>
      )}

      <div className={styles.grid}>
        {filtered.map((todo) => (
          <div
            key={todo.id}
            className={styles.card}
            style={{ borderLeftColor: PRIORITY_COLORS[todo.priority] }}
          >
            <div className={styles.cardTop}>
              <div
                className={styles.statusWrapper}
                style={{ '--status-color': STATUS_COLORS[todo.status] } as React.CSSProperties}
              >
                <select
                  className={styles.statusSelect}
                  value={todo.status}
                  style={{
                    backgroundColor: STATUS_COLORS[todo.status] + '20',
                    color: STATUS_COLORS[todo.status],
                    borderColor: STATUS_COLORS[todo.status] + '60',
                  }}
                  onChange={(e) => handleStatusChange(todo, e.target.value as Status)}
                >
                  {(['TODO', 'IN_PROGRESS', 'DONE', 'ON_HOLD'] as Status[]).map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>
              <span
                className={styles.priorityBadge}
                style={{ color: PRIORITY_COLORS[todo.priority] }}
              >
                {PRIORITY_LABELS[todo.priority]}
              </span>
            </div>

            <h3 className={styles.cardTitle}>{todo.title}</h3>

            {todo.content && (
              <p className={styles.cardContent}>{todo.content}</p>
            )}

            <div className={styles.cardMeta}>
              <span className={styles.metaItem}>
                📅 {formatDate(todo.dueDate)}
              </span>
              {todo.members && todo.members.length > 0 && (
                <span className={styles.metaItem}>
                  👥 {todo.members.map((m) => m.name).join(', ')}
                </span>
              )}
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.createdAt}>
                생성: {formatDate(todo.createdAt)}
              </span>
              <div className={styles.cardActions}>
                <button
                  className={styles.editBtn}
                  onClick={() => handleEdit(todo)}
                >
                  수정
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(todo.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <TodoForm
          initial={editTarget}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditTarget(undefined);
          }}
        />
      )}
      {showUserForm && <UserManageModal onClose={() => setShowUserForm(false)} />}
    </div>
  );
}
