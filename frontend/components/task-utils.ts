export function getPriorityInfo(priority: number) {
  if (priority >= 9) {
    return {
      label: 'Critical',
      className: 'bg-red-100 text-red-700 border-red-200',
    };
  }

  if (priority >= 7) {
    return {
      label: 'High',
      className: 'bg-orange-100 text-orange-700 border-orange-200',
    };
  }

  if (priority >= 4) {
    return {
      label: 'Medium',
      className: 'bg-blue-100 text-blue-700 border-blue-200',
    };
  }

  return {
    label: 'Low',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  };
}
