import { faker } from '@faker-js/faker';

export const getProducts = async () => {
  //   try {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //     if (!response.ok) {
  //       throw new Error('System Error!!!');
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }

  const products = [];
  for (let i = 0; i < 100; i++) {
    const rules = Array.from({ length: Math.floor(Math.random() * 3) }, () => ({
      title: faker.commerce.productName(),
      start_date: faker.date.past().toISOString(),
      end_date: faker.date.future().toISOString(),
      buy_from: faker.number.int({ min: 1, max: 100 }),
      buy_to: faker.number.int({ min: 101, max: 200 }),
      discount: faker.number.int({ min: 5, max: 50 }),
    }));
    const status = rules.length > 0 ? 1 : 0;

    products.push({
      id: i + 1,
      image: faker.image.avatar(),
      title: faker.commerce.productName(),
      rules: rules,
      lastUpdate: faker.date.recent().toISOString(),
      status: status,
    });
  }
  return products;
};
