export default async function getCurrency() {
  const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await requestAPI.json();
  return data;
}
