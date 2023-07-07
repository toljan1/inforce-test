import { Product } from "../types/Product";

function read(key: string) {
  const data = window.localStorage.getItem(key);

  try {
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    return null;
  }
}

function write(key: string, data: Product) {
  const someData = {
    ...read(key),
    [data.id]: data,
  }
  window.localStorage.setItem(key, JSON.stringify(someData));
}

function init(key: string, initialData: Product[]) {
  if (!read(key)) {
    for (const someProduct of initialData) {
      write(key, someProduct);
    }
  }
}

// function remove(key: string, id: number) {
//   if (read(key)) {
//     const data = read(key);

//     const newData = {};

//     for (const char in data) {
//       if (typeof(char) === Product) {
//         if (char.id !== id) {
//           newData[char.id] = char;
//         }
//       }
//     }

//     init(key, newData);
//   }

export { read, write, init }
