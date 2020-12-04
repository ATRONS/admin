export const extractSellsData = (data) => {
  const labels = Array(data.length);
  const values = Array(data.length);

  let currentRow;
  for (let i = 0; i < data.length; i++) {
    currentRow = data[i];
    labels[i] = `${currentRow._id.day} - ${currentRow._id.month}`;
    values[i] = currentRow.total_amount;
  }
  console.log(values);
  return { labels, values };
};
