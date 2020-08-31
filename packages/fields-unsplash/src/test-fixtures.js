const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
import { getItems } from '@keystonejs/server-side-graphql-client';
import { Text } from '@keystonejs/fields';
import { Unsplash } from './';

// Field configurations
export const name = 'Unsplash';
export const type = Unsplash;
export const supportsUnique = false;
export const skipRequiredTest = false;
export const exampleValue = 'U0tBTn8UR8I';
export const exampleValue2 = 'xrVDYZRGdw4';
export const fieldName = 'heroImage';
export const subfieldName = 'unsplashId';
export const fieldConfig = {
  accessKey: process.env.UNSPLASH_KEY || 'unsplash_key',
  secretKey: process.env.UNSPLASH_SECRET || 'unplash_secret',
};

export const getTestFields = () => ({
  name: { type: Text },
  heroImage: {
    type,
    accessKey: process.env.UNSPLASH_KEY || 'unsplash_key',
    secretKey: process.env.UNSPLASH_SECRET || 'unplash_secret',
  },
});

export const initItems = () => {
  return [
    { name: 'a', heroImage: 'dYEuFB8KQJk' },
    { name: 'b', heroImage: '95YRwf6CNw8' },
    { name: 'c', heroImage: 'U0tBTn8UR8I' },
    { name: 'd', heroImage: 'xrVDYZRGdw4' },
    { name: 'e', heroImage: 'dYEuFB8KQJk' },
    { name: 'f', heroImage: null },
    { name: 'g' },
  ];
};

export const storedValues = () => [
  { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
  { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
  { name: 'c', heroImage: { unsplashId: 'U0tBTn8UR8I' } },
  { name: 'd', heroImage: { unsplashId: 'xrVDYZRGdw4' } },
  { name: 'e', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
  { name: 'f', heroImage: null },
  { name: 'g', heroImage: null },
];

export const supportedFilters = ['null_equality', 'in_empty_null'];

export const filterTests = withKeystone => {
  const match = async (keystone, where, expected, sortBy = 'name_ASC') =>
    expect(
      await getItems({
        keystone,
        listKey: 'Test',
        where,
        returnFields: 'name heroImage { unsplashId }',
        sortBy,
      })
    ).toEqual(expected);

  test(
    'No filter',
    withKeystone(({ keystone }) =>
      match(keystone, undefined, [
        { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
        { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
        { name: 'c', heroImage: null },
        { name: 'd', heroImage: null },
      ])
    )
  );

  test(
    'Empty filter',
    withKeystone(({ keystone }) =>
      match(keystone, {}, [
        { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
        { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
        { name: 'c', heroImage: null },
        { name: 'd', heroImage: null },
      ])
    )
  );

  test(
    'Filter: heroImage_not null',
    withKeystone(({ keystone }) =>
      match(keystone, { heroImage_not: null }, [
        { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
        { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
      ])
    )
  );

  test(
    'Filter: heroImage_not_in null',
    withKeystone(({ keystone }) =>
      match(keystone, { heroImage_not_in: [null] }, [
        { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
        { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
      ])
    )
  );

  test(
    'Filter: heroImage_in (empty list)',
    withKeystone(({ keystone }) => match(keystone, { heroImage_in: [] }, []))
  );

  test(
    'Filter: heroImage_not_in (empty list)',
    withKeystone(({ keystone }) =>
      match(keystone, { heroImage_not_in: [] }, [
        { name: 'a', heroImage: { unsplashId: 'dYEuFB8KQJk' } },
        { name: 'b', heroImage: { unsplashId: '95YRwf6CNw8' } },
        { name: 'c', heroImage: null },
        { name: 'd', heroImage: null },
      ])
    )
  );
};
