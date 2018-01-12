import * as esprima from 'esprima';

const esprimaParser = (code: string) => {
  try {
    const parsed = esprima.parseScript(code);
    return parsed.body;
  } catch (e) {
    return {
      error: String(e),
    };
  }
};

const lib: { [key: string]: any } = {
  esprimaParser,
};

export default lib;