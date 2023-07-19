export const skipFetchQuery = (obj1: any, obj2: any): boolean => {
  const obj_1 = JSON.stringify(obj1);
  const obj_2 = JSON.stringify(obj2);

  if (obj_1 === obj_2) return true;
  else return false;
};
