export default function shortenArray(array, pairs) {
  let newArray = array.slice();
  while (newArray.length > pairs) {
    let randIndex = Math.floor(Math.random() * newArray.length);
    newArray.splice(randIndex, 1);
  }
  return newArray;
};
