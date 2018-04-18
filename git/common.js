const nconf = require('nconf');

const { exec } = require('../utils/child-process');
const { spawn } = require("child_process");

const GIT_COMMAND = 'git';

function getRepository() {
  return nconf.get('REPOSITORY_PATH');
}

function getDirChangeOption() {
  const repository = getRepository();
  return repository ? ` -C ${repository}` : '';
}

function getDirChangeArgs() {
  const repository = getRepository();
  return repository ? ['-C', repository] : [];
}

function execInternal(args) {
  let command = GIT_COMMAND;
  command += getDirChangeOption();
  return exec(`${command} ${args}`)
}

function spawnInternal(args) {
  let command = GIT_COMMAND;
  return spawn(command, [...getDirChangeArgs(), ...args]);
}

module.exports = {
  exec: execInternal,
  spawn: spawnInternal
};