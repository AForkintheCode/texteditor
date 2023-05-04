import { openDB } from 'idb';

const initdb = async () =>
  openDB('notepad', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('notepad')) {
        console.log('notepad database already exists');
        return;
      }
      db.createObjectStore('notepad', { keyPath: 'id', autoIncrement: true });
      console.log('notepad database created');
    },
  });

// writes to db
export const putDb = async (content) => {
  console.log('PUT from the database');
  const textDb = await openDB('notepad', 1);
  const tx = textDb.transaction('notepad', 'readwrite');
  const store = tx.objectStore('notepad');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved!', result.value); 
};

//get from db
export const getDb = async () => {
  console.log('GET from the database');
  const textDb = await openDB('notepad', 1);
  const tx = textDb.transaction('notepad', 'readonly');
  const store = tx.objectStore('notepad');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('Data retrieved!', result.value)
    : console.log('Data not found');
  return result?.value;
};
 

initdb();
