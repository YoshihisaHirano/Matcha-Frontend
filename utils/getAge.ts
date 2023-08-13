export function getAge(birthdayTimestamp: number) {
  const birthday = new Date(birthdayTimestamp);
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();

  // Check if the user's birthday has occurred this year
  const hasBirthdayPassed =
    today.getMonth() > birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() &&
      today.getDate() >= birthday.getDate());

  if (!hasBirthdayPassed) {
    age--; // Reduce the age by 1 if the birthday hasn't occurred yet this year
  }

  return age;
}

export function minus18Years() {
  const currentDate = new Date();
  const newDate = new Date(currentDate);

  newDate.setFullYear(currentDate.getFullYear() - 18);

  return newDate;
}
