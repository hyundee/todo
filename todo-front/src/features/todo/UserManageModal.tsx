import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchUsers, createUser, updateUser, deleteUser } from './todoSlice';
import { User } from '../../types';
import styles from './UserManageModal.module.css';

interface Props {
  onClose: () => void;
}

export function UserManageModal({ onClose }: Props) {
  const dispatch = useAppDispatch();
  const users = useAppSelector((s) => s.todo.users);

  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [newForm, setNewForm] = useState({ name: '', email: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const startEdit = (user: User) => {
    setEditId(user.id);
    setEditForm({ name: user.name, email: user.email });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ name: '', email: '' });
  };

  const handleUpdate = async (id: number) => {
    if (!editForm.name.trim() || !editForm.email.trim()) return;
    await dispatch(updateUser({ id, ...editForm }));
    cancelEdit();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('유저를 삭제하시겠습니까?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.email.trim()) return;
    await dispatch(createUser(newForm));
    setNewForm({ name: '', email: '' });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>유저 관리</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {users.length === 0 ? (
            <p className={styles.empty}>등록된 유저가 없습니다</p>
          ) : (
            <ul className={styles.list}>
              {users.map((user) =>
                editId === user.id ? (
                  <li key={user.id} className={styles.row}>
                    <input
                      className={styles.input}
                      value={editForm.name}
                      onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="이름"
                    />
                    <input
                      className={styles.input}
                      value={editForm.email}
                      onChange={(e) => setEditForm((p) => ({ ...p, email: e.target.value }))}
                      placeholder="이메일"
                    />
                    <div className={styles.rowActions}>
                      <button className={styles.saveBtn} onClick={() => handleUpdate(user.id)}>저장</button>
                      <button className={styles.cancelBtn} onClick={cancelEdit}>취소</button>
                    </div>
                  </li>
                ) : (
                  <li key={user.id} className={styles.row}>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user.name}</span>
                      <span className={styles.userEmail}>{user.email}</span>
                    </div>
                    <div className={styles.rowActions}>
                      <button className={styles.editBtn} onClick={() => startEdit(user)}>수정</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(user.id)}>삭제</button>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <form className={styles.createForm} onSubmit={handleCreate}>
          <p className={styles.createTitle}>새 유저 추가</p>
          <div className={styles.createRow}>
            <input
              className={styles.input}
              value={newForm.name}
              onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="이름"
              required
            />
            <input
              className={styles.input}
              type="email"
              value={newForm.email}
              onChange={(e) => setNewForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="이메일"
              required
            />
            <button type="submit" className={styles.addBtn}>추가</button>
          </div>
        </form>
      </div>
    </div>
  );
}
