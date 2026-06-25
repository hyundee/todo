import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers } from './todoSlice';
import { Todo, TodoFormData, Status, Priority, User } from '../../types';
import styles from './TodoForm.module.css';

interface Props {
  initial?: Todo;
  onSubmit: (data: TodoFormData) => void;
  onClose: () => void;
}

const statusOptions: { value: Status; label: string }[] = [
  { value: 'TODO', label: '예정' },
  { value: 'IN_PROGRESS', label: '진행중' },
  { value: 'DONE', label: '완료' },
  { value: 'ON_HOLD', label: '보류' },
];

const priorityOptions: { value: Priority; label: string }[] = [
  { value: 'HIGH', label: '높음' },
  { value: 'MEDIUM', label: '중간' },
  { value: 'LOW', label: '낮음' },
];

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return '';
  return iso.slice(0, 16);
}

export function TodoForm({ initial, onSubmit, onClose }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.todo.users);

  const [form, setForm] = useState<TodoFormData>({
    title: '',
    content: '',
    dueDate: '',
    status: 'TODO',
    priority: 'MEDIUM',
    members: [],
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      setForm({
        id: initial.id,
        title: initial.title,
        content: initial.content ?? '',
        dueDate: toDatetimeLocal(initial.dueDate),
        status: initial.status,
        priority: initial.priority,
        members: initial.members ?? [],
      });
    }
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleMember = (user: User) => {
    setForm((prev) => {
      const exists = prev.members.some((m) => m.id === user.id);
      return {
        ...prev,
        members: exists
          ? prev.members.filter((m) => m.id !== user.id)
          : [...prev.members, user],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{initial ? '할 일 수정' : '새 할 일'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            제목 <span className={styles.required}>*</span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              required
            />
          </label>
          <label>
            내용
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용을 입력하세요"
              rows={3}
            />
          </label>
          <div className={styles.row}>
            <label>
              상태
              <select name="status" value={form.status} onChange={handleChange}>
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label>
              우선순위
              <select name="priority" value={form.priority} onChange={handleChange}>
                {priorityOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            마감일
            <input
              type="datetime-local"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </label>
          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>담당자</span>
            {users.length === 0 ? (
              <p className={styles.noUsers}>등록된 유저가 없습니다</p>
            ) : (
              <div className={styles.memberList}>
                {users.map((user) => {
                  const checked = form.members.some((m) => m.id === user.id);
                  return (
                    <label key={user.id} className={styles.memberItem}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMember(user)}
                      />
                      <span className={styles.memberName}>{user.name}</span>
                      <span className={styles.memberEmail}>{user.email}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>취소</button>
            <button type="submit" className={styles.submitBtn}>
              {initial ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
