import { Board, Task } from './board.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { default as firebase } from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  //  Create new board
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{ description: 'Hello World!', color: 'purple' }],
    });
  }

  //  Delete board
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  //  Update board tasks
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({ ...tasks });
  }

  // Delete a task
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({ tasks: firebase.firestore.FieldValue.arrayRemove(task) });
  }

  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Board>('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }

  // batch write to update boards priority
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    // get boards doc references
    const refs = boards.map((board) => db.collection('boards').doc(board.id));
    // batch update the boards priority by their index
    refs.forEach((boardRef, index) =>
      batch.update(boardRef, { priority: index })
    );
    return batch.commit();
  }
}
