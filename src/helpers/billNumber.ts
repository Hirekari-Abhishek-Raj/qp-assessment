export async function generateNextBillNumber(previousBillNumber: any = "ABC000000") {
  // Extract the prefix and suffix from the previous bill number
  const prefix = previousBillNumber.match(/[A-Za-z]+/)[0];
  const suffix = parseInt(previousBillNumber.match(/\d+/)[0]);

  // Increment the suffix
  const nextSuffix = suffix + 1;

  // Pad the numeric suffix with leading zeros to maintain the same length
  const paddedNextSuffix = nextSuffix
    .toString()
    .padStart(suffix.toString().length + 6, "0");
  // Combine prefix and padded next suffix
  const nextBillNumber = prefix + paddedNextSuffix;

  return nextBillNumber;
}
