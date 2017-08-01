/* eslint-disable global-require */

describe('lib/index.js', () => {
  describe('testFile1', () => {
    test('module.exports workflow', () => {
      const wrapper = require('../../lib/index.js');

      jest.mock('../../lib/helpers');
      const helpers = require('../../lib/helpers');
      const callback = 'callback';
      helpers.co = fn(callback);

      const options = 'options';
      const result = wrapper(options);


      expect(helpers.co).toHaveBeenCalledTimes(1);
      expect(helpers.co).toHaveBeenCalledWith(wrapper.init, options);

      expect(result).toBe(callback);
    });
    genTest('module.exports workflow', function* () {
      const wrapper = require('../../lib/index.js');

      jest.mock('../../lib/ReplaceInFiles');
      const ReplaceInFiles = require('../../lib/ReplaceInFiles');
      const paths = 'paths';
      const moc = { run: pFn(paths) };
      ReplaceInFiles.mockImplementation(() => moc);

      const options = 'options';
      const result = yield wrapper.init(options);

      expect(ReplaceInFiles).toHaveBeenCalledTimes(1);
      expect(ReplaceInFiles).toHaveBeenCalledWith(options);

      expect(moc.run).toHaveBeenCalledTimes(1);
      expect(moc.run).toHaveBeenCalledWith();

      expect(result).toBe(paths);
    });
  });
});
