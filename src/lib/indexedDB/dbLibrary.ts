import { Book } from "./classes/books";

const request = indexedDB.open("library");
let db: IDBDatabase;

request.onupgradeneeded = function () {
  // The database did not previously exist, so create object stores and indexes.
  const db = request.result;
  const store = db.createObjectStore("books", { keyPath: "isbn" });
  const titleIndex = store.createIndex("by_title", "title", { unique: true });
  const authorIndex = store.createIndex("by_author", "author");

  // Populate with initial data.
  store.put({ title: "Quarry Memories", author: "Fred", isbn: 123456 } as Book);
  store.put({ title: "Water Buffaloes", author: "Fred", isbn: 234567 } as Book);
  store.put({
    title: "Bedrock Nights",
    author: "Barney",
    isbn: 345678,
  } as Book);
};

request.onsuccess = function () {
  db = request.result;
};

export const readLibrary = (): Book[] => {
  const tx = db.transaction("books", "readonly");
  const store = tx.objectStore("books");
  const res = store.getAll();
  res.onsuccess = () => {
    return res.result as Book;
  };
  return;
};
