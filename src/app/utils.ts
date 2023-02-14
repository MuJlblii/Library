import { IBook, IBooksState, ICategories } from '../interface/interface';

export const createBooksState = (categories: ICategories[], books: IBook[]) => {
  const readyBookStateArray: IBooksState[] = categories.map((el) => ({ ...el, list: null }));

  if (books) {
    for (let i = 0; i < readyBookStateArray.length; i++) {
      for (let j = 0; j < books.length; j++) {
        if (books[j].categories.includes(readyBookStateArray[i].name)) {
          if (readyBookStateArray[i].list == null) {
            readyBookStateArray[i].list = [books[j]];
          } else readyBookStateArray[i].list = [...(readyBookStateArray[i].list as IBook[]), books[j]];
        }
      }
    }
  }

  return readyBookStateArray;
};
