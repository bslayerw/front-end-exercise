// NOTE: This file is for internal use only and has no relation to the
// development exercise. You should ignore this file.

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const REPO_NAME = 'HealthTeacher/front-end-exercise';

const deleteRepo = () => {
  console.log('> Deleting existing repo');
  return exec(`hub delete -y ${REPO_NAME}`);
};

const createRepo = () => {
  console.log('> Creating new repo');
  return exec(
    'hub create -c' +
      ' -d "GoNoodle engineering front-end exercise."' +
      ' -h "https://www.gonoodle.com"' +
      ` ${REPO_NAME}`
  );
};

const pushSource = () => {
  console.log('> Pushing source');
  return exec(
    `git push --force git@github.com:${REPO_NAME}.git $(git commit-tree HEAD^{tree} -m "[add] Base exercise"):refs/heads/master`
  );
};

deleteRepo()
  .then(createRepo, () => {
    console.log('> Delete failed, attempting to create');
    return createRepo();
  })
  .then(pushSource)
  .then(() => {
    console.log('> Success!');
  });
