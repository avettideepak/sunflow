const ParseErrorMessage = error => {
  return `${error.message} at (${error.fileName}:${error.lineNumber})`;
};

export default ParseErrorMessage;
