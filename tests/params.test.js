import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import { svgAttributes } from '../src/constants/svg-attributes';
import { fetchLocalIcon, fetchProdIcon } from './lib/fetch-icon';
import { fetchMeta } from './lib/fetch-meta';

const $$params = suite('Query parameters');
const $$compat = suite('Backwards compatibility');

svgAttributes.forEach((param) => {
  $$params(`should use "${param}" from query params`, async () => {
    const params = { [param]: 'xxx' };
    const { props } = await fetchLocalIcon('/feather/4.28.0/activity', params);
    assert.is(props[param], params[param]);
  });

  $$params(`should remove "${param}" when empty`, async () => {
    const params = { [param]: '' };
    const { props } = await fetchLocalIcon('/feather/4.28.0/activity', params);
    assert.is(props[param], undefined);
  });
});

$$compat('Should not remove supported attributes', async () => {
  const { supportedAttributes } = await fetchMeta();
  supportedAttributes.forEach((attr) => {
    assert.is(svgAttributes.includes(attr), true);
  });
});

svgAttributes.forEach((param) => {
  $$compat(
    `${param} param should produce same result as production`,
    async () => {
      const path = '/feather/4.28.0/heart';
      const params = { [param]: 'xxx' };
      const prod = await fetchProdIcon(path, params);
      const local = await fetchLocalIcon(path, params);
      assert.equal(prod.source, local.source);
    }
  );
});

$$params.run();
$$compat.run();
