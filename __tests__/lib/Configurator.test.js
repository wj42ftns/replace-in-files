/* eslint-disable global-require */

describe('lib/Configurator.js', () => {
  test('constructor', () => {
    const Configurator = require('../../lib/Configurator.js');
    const options = 'options';

    const validator = new Configurator(options);

    expect(validator.options).toBe(options);
    expect(validator.findFilesOptions).toBeNull();
    expect(validator.loggerOptions).toBeNull();
    expect(validator.replaceOptions).toBeNull();
  });
  test('run', () => {
    const Configurator = require('../../lib/Configurator.js');
    Configurator.prepareFindFilesConfig = fn();
    Configurator.prepareReplaceConfig = fn();
    const options = 'options';
    const mocThis = { options };

    const validator = new Configurator();
    validator.run.call(mocThis);

    expect(Configurator.prepareFindFilesConfig).toHaveBeenCalledTimes(1);
    expect(Configurator.prepareFindFilesConfig).toHaveBeenCalledWith(options);

    expect(Configurator.prepareReplaceConfig).toHaveBeenCalledTimes(1);
    expect(Configurator.prepareReplaceConfig).toHaveBeenCalledWith(options);
  });
});
