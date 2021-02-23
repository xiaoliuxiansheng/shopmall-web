/**
 * @name: config-overrides
 * @author: LIULIU
 * @date: 2020-08-21 11:09
 * @description：config-overrides
 * @update: 2020-08-21 11:09
 */
const { override, fixBabelImports } = require('customize-cra');
module.exports = override(
       fixBabelImports('import', {
             libraryName: 'antd-mobile',
         style: 'css',
       }),
 );
