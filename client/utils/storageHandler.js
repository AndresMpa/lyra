/* Modify the content of an item inside the localStorage
 * @function
 * @param {string} key - The specific key to use to find an element inside the localStorage
 * @param {array} data - Data to save
 */
const saveItemToStorage = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data));

/* Modify the content of an array inside the localStorage to add some data
 * @function
 * @param {string} key - The specific key to use to find an element inside the localStorage
 * @param {number} index - An index to refer what to get
 * @param {array} data - Data to save in the array
 */
const saveArrayToStorage = (key, index, data) => {
  const chats = JSON.parse(localStorage.getItem(key));
  chats[index].push(data);

  localStorage.setItem(key, JSON.stringify(chats));
};

/* Returns a specific item from localStorage
 * @function
 * @param {string} key - The key of the object to bring from localStorage
 * @return {object} Result of the operation
 */
const getItemFromStorage = (key) => JSON.parse(localStorage.getItem(key));

/* Deletes an item from the array for items storage on localStorage
 * @function
 * @param {string} key - The key of the object to bring from localStorage
 * @param {number} target - This is a number that refers the index to remove
 */
const deleteArrayItemFromStorage = (key, target) => {
  const chats = JSON.parse(localStorage.getItem(key));
  chats.splice(target, 1);

  localStorage.setItem(key, JSON.stringify(chats));
};

export {
  saveItemToStorage,
  saveArrayToStorage,
  getItemFromStorage,
  deleteArrayItemFromStorage,
};
