/** Returns the CSS classes assigned to an element as a sorted array. */
export const sortedClassNames = (element: Element): string[] => {
  return element.className.split(' ').sort();
};
