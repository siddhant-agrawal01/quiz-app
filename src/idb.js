// frontend/src/idb.js

const DB_NAME = 'quizDB';
const STORE_NAME = 'attempts';
const DB_VERSION = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'date' });
      }
    };
    request.onsuccess = function(event) {
      resolve(event.target.result);
    };
    request.onerror = function(event) {
      reject('Database error: ' + event.target.errorCode);
    };
  });
}

export async function saveAttempt(attempt) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(attempt);
    request.onsuccess = function() {
      resolve();
    };
    request.onerror = function(e) {
      reject(e);
    };
  });
}

export async function getAttempts() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = function() {
      // Sort attempts by date descending
      const attempts = request.result.sort((a, b) => new Date(b.date) - new Date(a.date));
      resolve(attempts);
    };
    request.onerror = function(e) {
      reject(e);
    };
  });
}
