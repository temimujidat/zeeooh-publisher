import _ from 'lodash';

export const getBilboardCategories = (allBillboards) =>
  _.sortBy(_.uniq(allBillboards.map((billboard) => billboard.category)));
