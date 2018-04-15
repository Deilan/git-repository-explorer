function rejectWithFirstItem(arr) {
  return Promise.reject(arr[0]);
}

module.exports = {
  rejectWithFirstItem
};