export class SortValueConverter {
  toView(values, propName, direction = 'asc') {
    let sortedValues = values.sort((a, b) => a[propName] - b[propName]);

    if (direction === 'asc') {
      return sortedValues.reverse();
    }
    return sortedValues;
  }
}
