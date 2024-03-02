import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { TaskInterface } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskFirebaseService {

  firestore = inject(Firestore);

  taskCollection = collection(this.firestore, 'tasks');

  getTasks(): Observable<TaskInterface[]> {
    return collectionData(this.taskCollection, {
      idField: 'id'
    }) as Observable<TaskInterface[]>;
  }

  addTask(content: string): Observable<string> {
    const taskToCreate = { content, isCompleted: false };
    const promise = addDoc(this.taskCollection, taskToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  removeTask(taskId: string): Observable<void> {
    const docRef = doc(this.firestore, 'tasks/' + taskId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateTask(
    taskId: string,
    dataToUpdate: { content: string; isCompleted: boolean }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'tasks/' + taskId);
    const promise = setDoc(docRef, dataToUpdate);
    return from(promise);
  }
}
