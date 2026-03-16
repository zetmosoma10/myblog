const getInitials = (name: string) => {
  const split = name.split(" ");
  const firstName = split[0];
  const lastName = split[1];

  return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
};

export default getInitials;
