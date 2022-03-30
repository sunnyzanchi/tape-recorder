declare global {
  const process: Process

  interface Process {
    env: {
      NODE_ENV: 'development' | 'production'
    }
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// https://stackoverflow.com/a/53981706
export {}
