// The following from https://stackoverflow.com/questions/53762640/how-to-import-all-images-from-a-folder-in-reactjs
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context('./Assets', false, /\.(png|jpe?g|svg)$/)
);

const cities = [
  'calgary',
  'charlottetown',
  'edmonton',
  'fredericton',
  'halifax',
  'montreal',
  'nunavut',
  'ottawa',
  'quebec city',
  'saskatoon',
  "st. john's",
  'toronto',
  'vancouver',
  'victoria',
  'winnipeg',
  'yellowknife',
  'yukon',
];

const citiesObject = cities.map((city, index) => ({
  name: city,
  url: images[index],
  index: index,
}));

export default citiesObject